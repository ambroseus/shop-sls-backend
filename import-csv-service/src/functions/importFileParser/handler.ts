import { S3Event } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../utils'
import { copyObject, deleteObject, getObject } from '../../libs/s3'
import { parseCsvStream } from '../../libs/csv'

const { ERROR, LOG } = loggers('importFileParser')

const { UPLOADED_FOLDER, PARSED_FOLDER } = process.env

const importFileParser = async (event: S3Event) => {
  try {
    for (const record of event.Records) {
      const { object, bucket } = record.s3
      const input = {
        Bucket: bucket.name,
        Key: object.key,
      }

      LOG(`Parsing csv stream`)

      const { Body: csvStream } = await getObject(input)
      const records = await parseCsvStream(csvStream)

      LOG(`Parsed records: ${JSON.stringify(records, null, 2)}`)

      LOG(`Moving file from '${UPLOADED_FOLDER}' to '${PARSED_FOLDER}'`)

      await copyObject({
        ...input,
        CopySource: `${bucket.name}/${object.key}`,
        Key: object.key.replace(UPLOADED_FOLDER, PARSED_FOLDER),
      })
      await deleteObject(input)

      LOG(`File moved from '${UPLOADED_FOLDER}' to '${PARSED_FOLDER}'`)
    }
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(importFileParser)

import { S3Event } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../utils'
import { copyObject, deleteObject, getObject } from '../../libs/s3'
import { parseCsvStream } from '../../libs/csv'

const { ERROR, LOG } = loggers('importFileParser')

const { IMPORTED_FOLDER, PARSED_FOLDER } = process.env

const importFileParser = async (event: S3Event) => {
  try {
    for (const record of event.Records) {
      const { object, bucket } = record.s3
      const input = {
        Bucket: bucket.name,
        Key: object.key,
      }

      const { Body: csvStream } = await getObject(input)
      const records = await parseCsvStream(csvStream)

      LOG(`Parsed records: ${JSON.stringify(records, null, 2)}`)

      await copyObject({
        ...input,
        CopySource: `${bucket.name}/${object.key}`,
        Key: object.key.replace(IMPORTED_FOLDER, PARSED_FOLDER),
      })
      await deleteObject(input)
    }
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(importFileParser)

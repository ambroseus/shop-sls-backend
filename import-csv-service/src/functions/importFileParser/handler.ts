import { S3Event } from 'aws-lambda'
import { loggers, errorMessage } from '../../utils'
import { copyObject, deleteObject, getObject } from '../../libs/s3'
import SQS, { SendMessageRequest } from 'aws-sdk/clients/sqs'
import { parseCsvStream } from '../../libs/csv'

const { ERROR, LOG } = loggers('importFileParser')
const { REGION = '', UPLOADED_FOLDER = '', PARSED_FOLDER = '', CATALOG_ITEMS_QUEUE_URL = '' } = process.env
const sqs = new SQS({ region: REGION })

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

      LOG(`Queue products creation via ${CATALOG_ITEMS_QUEUE_URL}`)

      for (const record of records) {
        const sqsRequest: SendMessageRequest = {
          QueueUrl: CATALOG_ITEMS_QUEUE_URL,
          MessageBody: JSON.stringify(record),
        }
        await sqs.sendMessage(sqsRequest).promise()
      }

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
  }
}

export const main = importFileParser

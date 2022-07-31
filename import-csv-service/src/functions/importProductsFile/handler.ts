import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../utils'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../../libs/s3'

const { ERROR, LOG } = loggers('importProductsFile')

const { IMPORTED_FOLDER, BUCKET_NAME } = process.env

const importProductsFile = async (event: APIGatewayEvent) => {
  try {
    const {
      queryStringParameters: { name: filename },
    } = event

    if (!filename) {
      ERROR('Missing name query parameter')
      return formatJSONResponse(400, { message: 'Missing name query parameter' })
    }
    const importFile = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${IMPORTED_FOLDER}/${filename}`,
    })
    const signedUrl = await getSignedUrl(s3Client, importFile, {
      expiresIn: 60, // 1 minute
    })

    LOG(`Created signed url: ${signedUrl}`)
    return formatJSONResponse(200, signedUrl)
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(importProductsFile)

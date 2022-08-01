import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../utils'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '../../libs/s3'

const { ERROR, LOG } = loggers('importProductsFile')

const { UPLOADED_FOLDER, BUCKET_NAME } = process.env

const importProductsFile = async (event: APIGatewayEvent) => {
  try {
    const {
      queryStringParameters: { name: filename },
    } = event

    if (!filename) {
      const message = 'Missing name query parameter'
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    LOG(`Creating signed url`)

    const importFile = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${UPLOADED_FOLDER}/${filename}`,
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

import { ValidationError } from 'joi'
import type { Handler, SQSEvent } from 'aws-lambda'
import SNS, { PublishInput } from 'aws-sdk/clients/sns'
import { loggers, formatJSONResponse, errorMessage } from '../../utils'
import { ProductSchema, CreateProductPayload } from '../../models/Product'
import { createProduct } from '../../services/products'

const { ERROR, WARN, LOG } = loggers('catalog_batch_process')
const { REGION = '', TOPIC_ARN = '' } = process.env
const sns = new SNS({ region: REGION })

export const catalog_batch_process: Handler = async (event: SQSEvent) => {
  try {
    let haveZeroCount = 0
    const importedProducts = []

    for (const item of event.Records) {
      const payload: CreateProductPayload = JSON.parse(item.body)

      await ProductSchema.validateAsync(payload)
      const createdProduct = await createProduct(payload)

      if (!createdProduct) {
        throw new Error(`Unable to create product with payload: ${JSON.stringify(payload, null, 2)}`)
      }

      LOG(`Created product: ${JSON.stringify(createdProduct, null, 2)}`)

      importedProducts.push(createdProduct)

      if (createdProduct.count === 0) {
        WARN(`Product has zero count`)
        haveZeroCount = 1
      }
    }

    const publishMessage: PublishInput = {
      TopicArn: TOPIC_ARN,
      Subject: `Ambroseus Store: imported products ${haveZeroCount ? '(have zero count)' : ''}`,
      Message: JSON.stringify(importedProducts, null, 2),
      MessageAttributes: {
        haveZeroCount: {
          DataType: 'Number',
          StringValue: haveZeroCount.toString(),
        },
      },
    }

    await sns.publish(publishMessage).promise()
  } catch (e) {
    console.log(e)
    const message = errorMessage(e)
    ERROR(message)
    const statusCode = e instanceof ValidationError ? 400 : 500
    return formatJSONResponse(statusCode, { message })
  }
}

export const main = catalog_batch_process

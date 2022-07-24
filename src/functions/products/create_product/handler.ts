import { Product, CreateProductPayload } from '../../../models/Product'
import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { createProduct } from '../../../services/products'

const { ERROR } = loggers('create_product')

export const create_product = async (event: Pick<APIGatewayEvent, 'body'>) => {
  try {
    // event.body parsed by middy bodyParser
    const payload = event.body as unknown as CreateProductPayload
    let createdProduct: Product
    try {
      createdProduct = await createProduct(payload)
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    return formatJSONResponse(200, createdProduct)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(create_product)

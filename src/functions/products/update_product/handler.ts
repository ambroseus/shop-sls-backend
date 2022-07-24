import { Product } from '../../../models/Product'
import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { updateProduct } from '../../../services/products'

const { ERROR } = loggers('update_product')

export const update_product = async (event: Pick<APIGatewayEvent, 'body'>) => {
  try {
    // event.body parsed by middy bodyParser
    const payload = event.body as unknown as Product
    let updatedProduct: Product
    try {
      updatedProduct = await updateProduct(payload)
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    return formatJSONResponse(200, updatedProduct)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(update_product)

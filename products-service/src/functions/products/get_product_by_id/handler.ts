import { APIGatewayEvent } from 'aws-lambda'
import { Product } from '../../../models/Product'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { getProductById } from '../../../services/products'

const { ERROR, LOG } = loggers('get_product_by_id')

export const get_product_by_id = async (event: Pick<APIGatewayEvent, 'pathParameters'>) => {
  try {
    const { productId } = event.pathParameters
    LOG(`Getting product ${productId}`)

    let product: Product
    try {
      product = await getProductById(String(productId))
      if (!product) {
        return formatJSONResponse(404, {
          message: `Product with ID '${productId}' not found`,
        })
      }
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    LOG(`Got product ${JSON.stringify(product, null, 2)}`)
    return formatJSONResponse(200, product)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(get_product_by_id)

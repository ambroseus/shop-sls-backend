import { Product } from '../../../models/Product'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { getProductById } from '../../../services/products'

const { ERROR } = loggers('get_product_by_id')

type Event = {
  pathParameters: {
    productId: unknown
  }
}

export const get_product_by_id = async (event: Event) => {
  try {
    const { productId } = event.pathParameters

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

    return formatJSONResponse(200, product)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(get_product_by_id)

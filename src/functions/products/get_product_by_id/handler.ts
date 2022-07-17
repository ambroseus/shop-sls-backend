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

    const product = await getProductById(String(productId))
    if (!product) return { statusCode: 404 }

    return formatJSONResponse(product)
    //
  } catch (e) {
    ERROR(errorMessage(e))
    return { statusCode: 500 }
  }
}

export const main = middyfy(get_product_by_id)

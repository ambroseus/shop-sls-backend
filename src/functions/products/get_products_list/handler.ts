import { Products } from '../../../models/Product'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { getProductsList } from '../../../services/products'

const { ERROR, LOG } = loggers('get_products_list')

export const get_products_list = async () => {
  try {
    LOG('Getting list of products')

    let products: Products
    try {
      products = await getProductsList()

      LOG(`Got list of products ${JSON.stringify(products, null, 2)}`)
      return formatJSONResponse(200, products)
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(get_products_list)

import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { getProductsList } from '../../../services/products'

const { ERROR } = loggers('get_products_list')

export const get_products_list = async () => {
  try {
    const products = await getProductsList()
    return formatJSONResponse(products)
    //
  } catch (e) {
    ERROR(errorMessage(e))
    return { statusCode: 500 }
  }
}

export const main = middyfy(get_products_list)

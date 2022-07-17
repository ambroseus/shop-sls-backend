import { middyfy, formatJSONResponse } from '../../../utils/lambda'
import { loggers, errorMessage } from '../../../utils/logger'

import { getProductsList } from '../../../services/products/getProductsList'

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

export const handler = middyfy(get_products_list)

import { middyfy } from '../../../utils/lambda'
import { loggers, errorMessage } from '../../../utils/logger'

const { ERROR } = loggers('get_products_list')

const get_products_list = async () => {
  try {
    // await checkServiceState()
    return { statusCode: 200, body: 'OK' }
  } catch (e) {
    ERROR(errorMessage(e))
    return { statusCode: 500 }
  }
}

export const handler = middyfy(get_products_list)

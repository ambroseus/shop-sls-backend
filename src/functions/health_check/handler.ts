import { middyfy, loggers, formatJSONResponse, errorMessage } from '../../utils'
import { getProductsList } from '../../services/products'

const { ERROR } = loggers('health_check')

export const health_check = async () => {
  try {
    let DB_STATUS = 'OK'
    try {
      await getProductsList(1)
    } catch (e) {
      DB_STATUS = 'FAIL'
    }
    return formatJSONResponse(200, { DB_STATUS })
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(health_check)

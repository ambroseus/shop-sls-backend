import { middyfy } from '../../utils/lambda'
import { loggers, errorMessage } from '../../utils/logger'

const { ERROR } = loggers('health_check')

export const health_check = () => {
  try {
    // await checkServiceState()
    return { statusCode: 200, body: 'OK' }
  } catch (e) {
    ERROR(errorMessage(e))
    return { statusCode: 500 }
  }
}

export const handler = middyfy(health_check)

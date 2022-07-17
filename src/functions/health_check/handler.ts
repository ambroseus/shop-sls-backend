import { middyfy } from '@libs/lambda'
import { loggers, errorMessage } from '@libs/logger'

const { ERROR } = loggers('healthCheck')

const healthCheck = async () => {
  try {
    // await checkServiceState()
    return { statusCode: 200, body: 'OK' }
  } catch (e) {
    ERROR(errorMessage(e))
    return { statusCode: 500 }
  }
}

export const main = middyfy(healthCheck)

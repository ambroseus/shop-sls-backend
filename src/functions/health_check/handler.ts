import { middyfy, loggers, errorMessage } from '../../utils'

const { ERROR } = loggers('health_check')

export const health_check = () => {
  try {
    // await checkServiceState()
    return { statusCode: 200, body: 'OK' }
    //
  } catch (e) {
    ERROR(errorMessage(e))
    return { statusCode: 500 }
  }
}

export const main = middyfy(health_check)

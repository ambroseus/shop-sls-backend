import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'
import cors from '@middy/http-cors'

export const middyfy = (handler: any) => {
  return middy(handler)
    .use(cors({ origin: '*', methods: '*', requestMethods: '*' }))
    .use(bodyParser())
}

export const formatJSONResponse = (statusCode: number, response: unknown) => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      'Content-type': 'application/json',
    },
  }
}

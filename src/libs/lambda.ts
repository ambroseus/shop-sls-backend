import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'
import cors from '@middy/http-cors'

export const middyfy = (handler: any) => {
  return middy(handler).use(cors()).use(bodyParser())
}

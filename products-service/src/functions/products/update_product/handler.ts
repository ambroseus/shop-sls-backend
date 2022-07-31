import { Product } from '../../../models/Product'
import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { updateProduct } from '../../../services/products'

const { ERROR, LOG } = loggers('update_product')

export const update_product = async (event: Pick<APIGatewayEvent, 'body'>) => {
  try {
    // event.body parsed by middy bodyParser
    const payload = event.body as unknown as Product
    LOG(`Updating product ${JSON.stringify(payload, null, 2)}`)

    let updatedProduct: Product
    try {
      updatedProduct = await updateProduct(payload)
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    LOG(`Updated product ${JSON.stringify(updatedProduct, null, 2)}`)
    return formatJSONResponse(200, updatedProduct)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(update_product)

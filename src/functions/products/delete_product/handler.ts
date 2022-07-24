import { ProductId } from '../../../models/Product'
import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { deleteProduct } from '../../../services/products'

const { ERROR } = loggers('delete_product')

export const delete_product = async (event: Pick<APIGatewayEvent, 'pathParameters'>) => {
  try {
    const { productId } = event.pathParameters
    let deletedProduct: { id: ProductId }
    try {
      deletedProduct = await deleteProduct(productId)
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    return formatJSONResponse(200, deletedProduct)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(delete_product)

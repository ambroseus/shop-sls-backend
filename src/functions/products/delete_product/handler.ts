import { ProductId } from '../../../models/Product'
import { APIGatewayEvent } from 'aws-lambda'
import { middyfy, loggers, errorMessage, formatJSONResponse } from '../../../utils'
import { deleteProduct } from '../../../services/products'

const { ERROR, LOG } = loggers('delete_product')

export const delete_product = async (event: Pick<APIGatewayEvent, 'pathParameters'>) => {
  try {
    const { productId } = event.pathParameters
    LOG(`Deleting product ${productId}`)

    let deletedProduct: { id: ProductId }
    try {
      deletedProduct = await deleteProduct(productId)
    } catch (e) {
      const message = errorMessage(e)
      ERROR(message)
      return formatJSONResponse(400, { message })
    }

    LOG(`Deleted product ${productId}`)
    return formatJSONResponse(200, deletedProduct)
    //
  } catch (e) {
    const message = errorMessage(e)
    ERROR(message)
    return formatJSONResponse(500, { message })
  }
}

export const main = middyfy(delete_product)

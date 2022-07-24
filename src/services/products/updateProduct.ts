import { Product } from '../../models/Product'
import { getProductById } from './getProductById'
import { dbTransaction } from '../../libs/db'

const queryUpdateProduct = 'update products set title=$2,description=$3,price=$4 where id=$1'
const queryUpdateStock = 'update stocks set count=$2 where product_id=$1'

export const updateProduct = async (payload: Product): Promise<Product> => {
  await dbTransaction(async (client) => {
    const { id, title, description, price, count } = payload

    await client.query(queryUpdateProduct, [id, title, description, price])
    await client.query(queryUpdateStock, [id, count])

    return id
  })

  return await getProductById(payload.id)
}

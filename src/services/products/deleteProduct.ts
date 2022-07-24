import { ProductId } from '../../models/Product'
import { dbTransaction } from '../../libs/db'

const queryDeleteProduct = 'delete from products where id=$1'
const queryDeleteStock = 'delete from stocks where product_id=$1'

export const deleteProduct = async (id: ProductId): Promise<{ id: ProductId }> => {
  await dbTransaction(async (client) => {
    await client.query(queryDeleteStock, [id])
    await client.query(queryDeleteProduct, [id])

    return id
  })

  return { id }
}

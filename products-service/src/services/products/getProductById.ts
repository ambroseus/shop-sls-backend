import { Product } from '../../models/Product'
import { dbQuery } from '../../libs/db'

const query = 'select id,title,description,price,count from products join stocks on id=product_id where id=$1'

export const getProductById = async (productId: string): Promise<Product | undefined> => {
  const { rows } = await dbQuery<Product>(query, [productId])
  return rows.length > 0 ? rows[0] : undefined
}

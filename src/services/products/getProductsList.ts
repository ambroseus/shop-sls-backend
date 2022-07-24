import { Product } from '../../models/Product'
import { dbQuery } from '../../libs/db'

const query = 'select id,title,description,price,count from products join stocks on id=product_id order by id'

export const getProductsList = async (limit?: number) => {
  const withLimit = limit ? ` limit ${limit}` : ''
  const { rows } = await dbQuery<Product>(`${query}${withLimit}`)
  return rows
}

import { CreateProduct, Product } from '../../models/Product'
import { getProductById } from './getProductById'
import { dbTransaction } from '../../libs/db'

const queryInsertIntoProducts = 'insert into products(title,description,price) values ($1,$2,$3) returning id'
const queryInsertIntoStocks = 'insert into stocks(product_id,count) values ($1,$2)'

export const createProduct = async (payload: CreateProduct): Promise<Product> => {
  const createdId = await dbTransaction(async (client) => {
    const { title, description, price, count } = payload

    const { rows } = await client.query<{ id: string }>(queryInsertIntoProducts, [title, description, price])

    const { id } = rows[0]
    await client.query(queryInsertIntoStocks, [id, count])

    return id
  })

  return await getProductById(createdId)
}

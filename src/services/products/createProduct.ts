import { CreateProductPayload, Product } from '../../models/Product'
import { getProductById } from './getProductById'
import { dbTransaction } from '../../libs/db'

export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
  const createdId = await dbTransaction(async (client) => {
    const { title, description, price, count } = payload

    const { rows } = await client.query<{ id: string }>(
      'insert into products(title,description,price) values ($1,$2,$3) returning id',
      [title, description, price]
    )

    const { id } = rows[0]
    await client.query('insert into stocks(product_id,count) values ($1,$2)', [id, count])

    return id
  })

  return await getProductById(createdId)
}

import { Products } from '../../models/Product'
import { productsList } from '../../mocks/productsList'

export const getProductsList = async (): Promise<Products> => {
  return productsList
}

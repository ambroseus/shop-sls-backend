import { Product } from '../../models/Product'
import { productsList } from '../../mocks/productsList'

export const getProductsList = async (): Promise<Product[]> => {
  return productsList
}

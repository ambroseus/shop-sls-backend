import { Product } from '../../models/Product'
import { productsList } from '../../mocks/productsList'

export const getProductById = async (productId: string): Promise<Product | undefined> => {
  return productsList.find((product) => product.id === productId)
}

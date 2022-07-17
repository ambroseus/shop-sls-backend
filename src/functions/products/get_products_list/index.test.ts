import { get_products_list } from './handler'
import * as svcProducts from '../../../services/products/getProductsList'
import { productsList } from '../../../mocks/productsList'

describe('get_products_list handler', () => {
  it('should return successful response', async () => {
    jest.spyOn(svcProducts, 'getProductsList').mockResolvedValue(productsList)

    const result: any = await get_products_list()

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual(productsList)
  })
})

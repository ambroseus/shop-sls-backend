import { get_product_by_id } from './handler'
import * as svcProduct from '../../../services/products/getProductById'
import { productsList } from '../../../mocks/productsList'

describe('get_product_by_id handler', () => {
  it('should return successful response', async () => {
    jest.spyOn(svcProduct, 'getProductById').mockResolvedValue(productsList[0])

    const result: any = await get_product_by_id({ pathParameters: { productId: 'id1' } })

    expect(result.statusCode).toEqual(200)
    expect(JSON.parse(result.body)).toEqual(productsList[0])
  })
  it('should return 404 not found response', async () => {
    jest.spyOn(svcProduct, 'getProductById').mockResolvedValue(undefined)

    const result: any = await get_product_by_id({ pathParameters: { productId: 'unknown' } })

    expect(result.statusCode).toEqual(404)
  })
})

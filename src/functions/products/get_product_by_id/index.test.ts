import { get_product_by_id } from './handler'

describe('get_product_by_id handler', () => {
  it('should return successful response', async () => {
    const result: any = await get_product_by_id()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual('OK')
  })
})

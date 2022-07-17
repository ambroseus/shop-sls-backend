import { get_products_list } from './handler'

describe('get_products_list handler', () => {
  it('should return successful response', async () => {
    const result: any = await get_products_list()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual('OK')
  })
})

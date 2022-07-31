import { health_check } from './handler'

describe('health_check handler', () => {
  it('should return successful response', async () => {
    const result: any = await health_check()

    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual('OK')
  })
})

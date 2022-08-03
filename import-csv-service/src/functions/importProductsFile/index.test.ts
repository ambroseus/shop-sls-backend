jest.mock('@aws-sdk/client-s3')
jest.mock('@aws-sdk/s3-request-presigner')

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { importProductsFile } from './handler'
;(global.console as any) = { error: jest.fn(), log: jest.fn() }

describe('importProductsFile handler', () => {
  it('should return error if no name in query params', async () => {
    const result: any = await importProductsFile({ queryStringParameters: {} })

    expect(result.statusCode).toEqual(400)
  })

  it('should return signed url', async () => {
    const getSignedUrlMock: jest.Mock = getSignedUrl as any

    const testUrl = 'testUrl'
    getSignedUrlMock.mockResolvedValue(testUrl)

    const result: any = await importProductsFile({ queryStringParameters: { name: 'name' } })

    expect(result).toEqual({
      statusCode: 200,
      headers: {
        'Content-type': 'application/json',
      },
      body: `"${testUrl}"`,
    })
  })
})

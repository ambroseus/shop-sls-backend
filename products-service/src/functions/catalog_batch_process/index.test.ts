import * as service from '../../services/products/createProduct'
import { CreateProductPayload } from '../../models/Product'
import { catalog_batch_process } from './handler'

const snsPublishMock = jest.fn().mockReturnValue({ promise: () => Promise.resolve(true) })

jest.mock('aws-sdk/clients/sns', () => {
  return function () {
    return {
      publish: (...args) => snsPublishMock(...args),
    }
  }
})

describe('catalog_batch_process', () => {
  it('should create products and publish message', async () => {
    const product: CreateProductPayload = {
      price: 100,
      count: 0,
      title: 'Product',
      description: 'description',
    }
    const event = {
      Records: [{ body: JSON.stringify(product) }, { body: JSON.stringify(product) }],
    }

    jest.spyOn(service, 'createProduct').mockResolvedValue({ id: 'ID', ...product })

    await catalog_batch_process(event, null, null)

    expect(service.createProduct).toBeCalledTimes(2)
    expect(service.createProduct).toHaveBeenNthCalledWith(1, product)
    expect(service.createProduct).toHaveBeenNthCalledWith(2, product)
    expect(snsPublishMock).toBeCalledTimes(1)
    expect(snsPublishMock).toBeCalledWith({
      TopicArn: '',
      Subject: 'Ambroseus Store: imported products (have zero count)',
      Message:
        '[\n' +
        '  {\n' +
        '    "id": "ID",\n' +
        '    "price": 100,\n' +
        '    "count": 0,\n' +
        '    "title": "Product",\n' +
        '    "description": "description"\n' +
        '  },\n' +
        '  {\n' +
        '    "id": "ID",\n' +
        '    "price": 100,\n' +
        '    "count": 0,\n' +
        '    "title": "Product",\n' +
        '    "description": "description"\n' +
        '  }\n' +
        ']',
      MessageAttributes: { haveZeroCount: { DataType: 'Number', StringValue: '1' } },
    })
  })
})

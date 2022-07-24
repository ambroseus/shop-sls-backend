export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'POST',
        path: 'products',
        summary: 'Create product',
        swaggerTags: ['Products service'],
        bodyType: 'CreateProductPayloadSwagger',
        responseData: {
          200: {
            description: 'Created product',
            bodyType: 'Product',
          },
          400: 'Service error',
          500: 'Server error',
        },
      },
    },
  ],
}

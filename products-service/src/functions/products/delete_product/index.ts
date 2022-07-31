export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'DELETE',
        path: 'products/{productId}',
        summary: 'Delete product',
        swaggerTags: ['Products service'],
        responseData: {
          200: {
            description: 'Deleted product Id',
            bodyType: 'ProductId',
          },
          400: 'Service error',
          500: 'Server error',
        },
      },
    },
  ],
}

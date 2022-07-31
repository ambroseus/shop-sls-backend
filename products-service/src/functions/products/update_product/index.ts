export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'PUT',
        path: 'products',
        summary: 'Update product',
        swaggerTags: ['Products service'],
        bodyType: 'Product',
        responseData: {
          200: {
            description: 'Updated product',
            bodyType: 'Product',
          },
          400: 'Service error',
          500: 'Server error',
        },
      },
    },
  ],
}

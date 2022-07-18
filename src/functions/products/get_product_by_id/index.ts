export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'products/{productId}',
        summary: 'Get product by ID',
        swaggerTags: ['Products service'],
        responseData: {
          200: {
            description: 'Product with provided ID',
            bodyType: 'Product',
          },
          500: 'server error',
        },
      },
    },
  ],
}

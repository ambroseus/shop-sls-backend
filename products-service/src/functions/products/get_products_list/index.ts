export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'products',
        summary: 'Get products list',
        swaggerTags: ['Products service'],
        responseData: {
          200: {
            description: 'list of products',
            bodyType: 'Products',
          },
          400: 'Service error',
          500: 'Server error',
        },
      },
    },
  ],
}

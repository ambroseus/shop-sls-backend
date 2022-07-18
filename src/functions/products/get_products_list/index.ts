export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.handler`,
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
          500: 'server error',
        },
      },
    },
  ],
}

export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'health-check',
        summary: 'Check service health',
        responseData: {
          200: 'OK',
          500: 'Server error',
        },
      },
    },
  ],
}

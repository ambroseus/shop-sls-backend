export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.handler`,
  events: [
    {
      http: {
        method: 'GET',
        path: 'products',
      },
    },
  ],
}

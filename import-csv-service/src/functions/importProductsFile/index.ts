import { handler } from '../../utils'

export default {
  handler: handler(__dirname),
  role: 'ImportFilesRole',
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
      },
    },
  ],
}

import { handler } from '../../utils'

export default {
  handler: handler(__dirname),
  role: 'ParseFilesRole',
  events: [
    {
      s3: {
        bucket: '${env:BUCKET_NAME}',
        event: 's3:ObjectCreated:*',
        rules: [
          {
            prefix: 'uploaded/',
          },
        ],
        existing: true,
      },
    },
  ],
}

import { handlerPath } from '../../utils'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
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

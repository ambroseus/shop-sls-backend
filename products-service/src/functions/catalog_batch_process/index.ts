import { handler } from '../../utils'

export default {
  handler: handler(__dirname),
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          'Fn::GetAtt': ['SQSQueue', 'Arn'],
        },
      },
    },
  ],
}

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
        authorizer: {
          arn: {
            'Fn::Sub':
              'arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:authorization-service-dev-basicAuthorizer',
          },
          name: 'basicAuthorizer',
          type: 'TOKEN',
          identitySource: 'method.request.header.Authorization',
        },
      },
    },
  ],
}

import type { AWS } from '@serverless/typescript'

import { health_check } from './src/functions'

const serverlessConfiguration: AWS = {
  service: 'aws-practitioner-backend',
  frameworkVersion: '3',
  useDotenv: true,
  custom: {
    bundle: {
      sourcemaps: false,
      linting: false,
      externals: ['@middy/core', '@middy/http-cors', '@middy/http-json-body-parser', 'axios'],
    },
    'serverless-offline': {
      useChildProcesses: true,
    },
  },
  plugins: ['serverless-bundle', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'aws-practitioner',
    region: 'us-east-1',
    stage: '${opt:stage, "dev"}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['logs:*'],
            Resource: { 'Fn::Sub': 'arn:aws:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/*:*:*' },
          },
          // {
          //   Effect: 'Allow',
          //   Action: ['ses:*'],
          //   Resource: '*',
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['sqs:*'],
          //   Resource: 'arn:aws:sqs:#{AWS::Region}:#{AWS::AccountId}:${self:service}-*',
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['sns:*'],
          //   Resource: 'arn:aws:sns:#{AWS::Region}:#{AWS::AccountId}:${self:service}-*',
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['dynamodb:*'],
          //   Resource: 'arn:aws:dynamodb:#{AWS::Region}:#{AWS::AccountId}:table/${self:service}-*',
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['ssm:GetParameter'],
          //   Resource: 'arn:aws:ssm:#{AWS::Region}:#{AWS::AccountId}:parameter/*',
          // },
        ],
      },
    },
  },
  functions: {
    health_check,
  },
}

module.exports = serverlessConfiguration

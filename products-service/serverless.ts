import type { AWS } from '@serverless/typescript'

import * as functions from './src/functions'

const serverlessConfiguration: AWS = {
  service: 'aws-practitioner-backend',
  frameworkVersion: '3',
  configValidationMode: 'error',
  useDotenv: true,
  custom: {
    bundle: {
      sourcemaps: false,
      linting: false,
      externals: ['@middy/core', '@middy/http-cors', '@middy/http-json-body-parser', 'axios', 'pg'],
    },
    autoswagger: {
      title: 'Ambroseus Store API',
      typefiles: ['./src/models/Product.ts'],
    },
    'serverless-offline': {
      useChildProcesses: true,
    },
  },
  plugins: ['serverless-auto-swagger', 'serverless-bundle', 'serverless-offline'],
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
      DB_HOST: '${env:DB_HOST}',
      DB_PORT: '${env:DB_PORT}',
      DB_USERNAME: '${env:DB_USERNAME}',
      DB_PASSWORD: '${env:DB_PASSWORD}',
      DB_DATABASE: '${env:DB_DATABASE}',
      REGION: '${self:provider.region}',
      TOPIC_ARN: { Ref: 'SNSTopic' },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['logs:*'],
            Resource: { 'Fn::Sub': 'arn:aws:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/*:*:*' },
          },
          {
            Effect: 'Allow',
            Action: 'sqs:*',
            Resource: [{ 'Fn::GetAtt': ['SQSQueue', 'Arn'] }],
          },
          {
            Effect: 'Allow',
            Action: 'sns:*',
            Resource: [{ Ref: 'SNSTopic' }],
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: { QueueName: 'catalogItemsQueue' },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: { TopicName: 'createProductTopic' },
      },
      SNSSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'yevhenii_samonenko@epam.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
        },
      },
      SNSSubscriptionHaveZeroCount: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'ambroseus@gmail.com',
          Protocol: 'email',
          TopicArn: { Ref: 'SNSTopic' },
          FilterPolicy: {
            haveZeroCount: [{ numeric: ['=', 1] }],
          },
        },
      },
    },
  },
  functions,
}

module.exports = serverlessConfiguration

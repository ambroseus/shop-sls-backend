import type { AWS } from '@serverless/typescript'

import * as functions from './src/functions'

const serverlessConfiguration: AWS = {
  functions,
  service: 'aws-practitioner-import-csv-service',
  frameworkVersion: '3',
  configValidationMode: 'error',
  useDotenv: true,
  custom: {
    BucketName: '${env:BUCKET_NAME}',
    bundle: {
      sourcemaps: false,
      linting: false,
      externals: ['@middy/core', '@middy/http-cors', '@middy/http-json-body-parser'],
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
      BUCKET_NAME: '${env:BUCKET_NAME}',
      UPLOADED_FOLDER: '${env:UPLOADED_FOLDER}',
      PARSED_FOLDER: '${env:PARSED_FOLDER}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['logs:*'],
            Resource: { 'Fn::Sub': 'arn:aws:logs:${AWS::Region}:${AWS::AccountId}:log-group:/aws/lambda/*:*:*' },
          },
        ],
      },
    },
  },
  resources: {
    Resources: {
      ParseFilesRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: {
              Effect: 'Allow',
              Principal: {
                Service: 'lambda.amazonaws.com',
              },
              Action: ['sts:AssumeRole'],
            },
          },
          Policies: [
            {
              PolicyName: 'ParseFilesPolicy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: ['s3:ListBucket'],
                    Resource: ['arn:aws:s3:::${self:custom.BucketName}'],
                  },
                  {
                    Effect: 'Allow',
                    Action: ['s3:*'],
                    Resource: ['arn:aws:s3:::${self:custom.BucketName}/*'],
                  },
                  {
                    Effect: 'Allow',
                    Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                    Resource: 'arn:aws:logs:*:*:log-group:/aws/lambda/*:*:*',
                  },
                ],
              },
            },
          ],
        },
      },
      ImportFilesRole: {
        Type: 'AWS::IAM::Role',
        Properties: {
          AssumeRolePolicyDocument: {
            Version: '2012-10-17',
            Statement: {
              Effect: 'Allow',
              Principal: {
                Service: 'lambda.amazonaws.com',
              },
              Action: ['sts:AssumeRole'],
            },
          },
          Policies: [
            {
              PolicyName: 'import-files-policy',
              PolicyDocument: {
                Version: '2012-10-17',
                Statement: [
                  {
                    Effect: 'Allow',
                    Action: ['s3:PutObject', 's3:PutObjectAcl'],
                    Resource: ['arn:aws:s3:::${self:custom.BucketName}/*'],
                  },
                  {
                    Effect: 'Allow',
                    Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
                    Resource: 'arn:aws:logs:*:*:log-group:/aws/lambda/*:*:*',
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
}

module.exports = serverlessConfiguration

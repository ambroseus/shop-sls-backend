import type { AWS } from '@serverless/typescript'

import { health_check, get_product_by_id, get_products_list } from './src/functions'

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
    autoswagger: {
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
  functions: {
    health_check,
    get_product_by_id,
    get_products_list,
  },
}

module.exports = serverlessConfiguration

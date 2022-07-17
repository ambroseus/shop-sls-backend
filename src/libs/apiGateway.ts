import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from 'aws-lambda'

export type SimpleAPIGatewayProxyEvent = Handler<APIGatewayProxyEvent, APIGatewayProxyResult>

export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Content-type': 'application/json',
    },
  }
}

export const formatHTMLResponse = (response: Record<string, string>) => {
  const { body } = response
  return {
    statusCode: 200,
    body: `<!DOCTYPE html><html><body>${body}</body></html>`,
    headers: {
      'Content-type': 'text/html',
    },
  }
}

export const responseWithEmptyBodyAndCode = (code: number) => {
  return {
    statusCode: code,
  }
}

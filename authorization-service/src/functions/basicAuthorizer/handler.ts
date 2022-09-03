import { middyfy } from "../../libs/lambda";
import { APIGatewayTokenAuthorizerHandler } from "aws-lambda";
import { EffectsEnum } from "../../common/constants";
import { generatePolicy } from "../../libs/api-gateway";
import {
  calculatePolicyEffect,
  getUserCredentialsFromToken,
} from "../../common/utils";

export const basicAuthorizerHandler: APIGatewayTokenAuthorizerHandler = async ({
  type,
  authorizationToken,
  methodArn,
}) => {
  try {
    if (type !== "TOKEN") {
      return generatePolicy(authorizationToken, methodArn, EffectsEnum.DENY);
    }

    const credentials = getUserCredentialsFromToken(authorizationToken);
    const effect = calculatePolicyEffect(credentials);

    return generatePolicy(authorizationToken, methodArn, effect);
  } catch (e) {
    return generatePolicy(authorizationToken, methodArn, EffectsEnum.DENY);
  }
};

export const main = middyfy(basicAuthorizerHandler);

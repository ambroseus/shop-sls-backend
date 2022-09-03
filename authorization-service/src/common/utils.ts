import { EffectsEnum } from "./constants";

export const getUserCredentialsFromToken = (token: string) => {
  const encodedCreds = token.split(" ")[1];
  const buff = Buffer.from(encodedCreds, "base64");
  const creds = buff.toString("utf-8").split(":");

  return {
    username: creds[0],
    password: creds[1],
  };
};

export const calculatePolicyEffect = ({ username, password }) => {
  const passwordFromEnv = process.env[username];

  if (passwordFromEnv && passwordFromEnv === password) {
    return EffectsEnum.ALLOW;
  }

  return EffectsEnum.DENY;
};

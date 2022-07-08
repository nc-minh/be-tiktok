import JWT from 'jsonwebtoken';
import configs from 'configs';
import { EXPIRESIN_ACCESS_TOKEN, EXPIRESIN_REFRESH_TOKEN } from 'utils/constants/auth';

export const signAccessToken = async (userID: string, role: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userID,
      role,
    };

    const secret = configs.jwt.accessTokenSecret;

    const options = {
      expiresIn: EXPIRESIN_ACCESS_TOKEN,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      return resolve(token);
    });
  });
};

export const signRefreshToken = async (userID: string, role: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userID,
      role,
    };

    const secret = configs.jwt.refreshTokenSecret;

    const options = {
      expiresIn: EXPIRESIN_REFRESH_TOKEN,
    };

    JWT.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      return resolve(token);
    });
  });
};

export const verifyRefreshToken = (refreshToken: string) => {
  return new Promise((resolve, reject) => {
    const secret = configs.jwt.refreshTokenSecret;
    JWT.verify(refreshToken, secret, (err, payload) => {
      if (err) reject(err);
      return resolve(payload);
    });
  });
};
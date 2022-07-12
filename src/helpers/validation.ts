import Joi from 'joi';
import { Request } from 'express';

export const usersValidate = (body: Request) => {
  const userSchema = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().min(5).max(128).required(),
    password: Joi.string().min(5).max(128).required(),
    avatar: Joi.string(),
    bio: Joi.string(),
    is_enabled: Joi.boolean(),
    is_deleted: Joi.boolean(),
    tick: Joi.boolean(),
    followings_count: Joi.number(),
    followers_count: Joi.number(),
    likes_count: Joi.number(),
    website_url: Joi.string(),
    social_network: Joi.array(),
    role: Joi.string(),
  });

  return userSchema.validate(body);
};

export const userUpdateValidate = (body: Request) => {
  const userUpdateSchema = Joi.object({
    fullname: Joi.string(),
    username: Joi.string().min(5).max(128),
    password: Joi.string().min(5).max(128),
    avatar: Joi.string(),
    bio: Joi.string(),
    is_enabled: Joi.boolean(),
    is_deleted: Joi.boolean(),
    tick: Joi.boolean(),
    followings_count: Joi.number(),
    followers_count: Joi.number(),
    likes_count: Joi.number(),
    website_url: Joi.string(),
    social_network: Joi.array(),
    role: Joi.string(),
  });

  return userUpdateSchema.validate(body);
};

export const loginValidate = (body: Request) => {
  const loginSchema = Joi.object({
    username: Joi.string().min(5).max(128).required(),
    password: Joi.string().min(5).max(128).required(),
  });

  return loginSchema.validate(body);
};

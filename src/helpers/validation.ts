import Joi from 'joi';
import { Request } from 'express';

export const usersValidate = (body: Request) => {
  const schema = Joi.object({
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

  return schema.validate(body);
};

export const userUpdateValidate = (body: Request) => {
  const schema = Joi.object({
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

  return schema.validate(body);
};

export const loginValidate = (body: Request) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(128).required(),
    password: Joi.string().min(5).max(128).required(),
  });

  return schema.validate(body);
};

export const postValidate = (body: Request) => {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    contents: Joi.string().required(),
    media_url: Joi.string().default(''),
    category_id: Joi.array(),
    reaction_count: Joi.number().default(0),
    view_count: Joi.number().default(0),
    is_deleted: Joi.boolean(),
  });

  return schema.validate(body);
};

export const categoryValidate = (body: Request) => {
  const schema = Joi.object({
    category_name: Joi.string().required(),
  });

  return schema.validate(body);
};
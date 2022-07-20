import cloudinary from 'cloudinary';

import configs from 'configs';

const cloudinary_v2 = cloudinary.v2;

const key = {
  cloud_name: configs.cloudinary.cloud_name,
  api_key: configs.cloudinary.api_key,
  api_secret: configs.cloudinary.api_secret,
  secure: true,
};

const connect = cloudinary_v2.config(key);

export { connect, cloudinary_v2 };

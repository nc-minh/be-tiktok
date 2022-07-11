import { Document } from 'mongoose';

interface SocialNetwork {
  name: string;
  url: string;
}

export default interface User extends Document {
  avatar?: string;
  bio?: string;
  fullname: string;
  username: string;
  password: string;
  is_enabled?: boolean;
  is_deleted?: boolean;
  tick?: boolean;
  followings_count?: number;
  followers_count?: number;
  likes_count?: number;
  website_url?: number;
  social_network?: SocialNetwork[];
  role: string;
}

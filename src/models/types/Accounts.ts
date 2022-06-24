import { Document, Types } from 'mongoose';

interface SocialNetwork {
  name: string;
  url: string;
}

export default interface Accounts extends Document {
  id: number;
  full_name: string;
  nickname: string;
  avatar?: string;
  bio?: string;
  tick?: boolean;
  followings_count?: number;
  followers_count?: number;
  likes_count?: number;
  website_url?: number;
  social_network?: Types.DocumentArray<SocialNetwork>;
}

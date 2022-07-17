import { Document } from 'mongoose';

import User from './User';
import Post from './Post';

export default interface PostReaction extends Document {
  user_id: User;
  post_id: Post;
  type: string;
}

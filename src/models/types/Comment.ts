import { Document } from 'mongoose';

import User from './User';
import Post from './Post';

export default interface Comment extends Document {
  user_id: User;
  post_id: Post;
  contents: string;
  media_url?: string;
}

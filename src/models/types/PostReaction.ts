import { Document } from 'mongoose';

import User from './User';
import Post from './Post';
import { ReactionTypes } from './ReactionTypes';

export default interface PostReaction extends Document {
  user_id: User;
  post_id: Post;
  type: ReactionTypes;
}

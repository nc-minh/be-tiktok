import { Document } from 'mongoose';

import User from './User';
import Comment from './Comment';

export default interface CommentReaction extends Document {
  user_id: User;
  comment_id: Comment;
  type: String;
}

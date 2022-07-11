import { Document } from 'mongoose';

import User from './User';
import Comment from './Comment';
import { ReactionTypes } from './ReactionTypes';

export default interface CommentReaction extends Document {
  user_id: User;
  comment_id: Comment;
  type: ReactionTypes;
}

import { model, Model, Schema } from 'mongoose';

import { ReactionTypes } from 'models/types/ReactionTypes';
import { MODELS } from 'utils/constants/models';
import CommentReaction from '../types/CommentReaction';

export const CommentReactionSchema = new Schema<CommentReaction>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
    comment_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.comment },
    type: { type: String, required: true, enum: [...ReactionTypes] },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

CommentReactionSchema.index({ user_id: 1, comment_id: 1 });

const CommentReactionModel: Model<CommentReaction> = model<CommentReaction>(
  MODELS.comment_reaction,
  CommentReactionSchema,
  MODELS.comment_reaction
);
export default CommentReactionModel;

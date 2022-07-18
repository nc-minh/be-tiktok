import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import PostReaction from '../types/PostReaction';
import { ReactionTypes } from 'models/types/ReactionTypes';

const PostReactionSchema = new Schema<PostReaction>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
    post_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.post },
    type: { type: String, required: true, enum: [...ReactionTypes] },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

PostReactionSchema.index({ user_id: 1, post_id: 1 });

const PostReactionModel: Model<PostReaction> = model<PostReaction>(
  MODELS.post_reaction,
  PostReactionSchema,
  MODELS.post_reaction
);
export default PostReactionModel;

import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Following from '../types/Following';

const FollowingSchema = new Schema<Following>(
  {
    following_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

FollowingSchema.index({ following_id: 1, user_id: 1 });

const FollowingModel: Model<Following> = model<Following>(MODELS.following, FollowingSchema, MODELS.following);
export default FollowingModel;

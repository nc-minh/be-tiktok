import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Follow from '../types/Follow';

const FollowSchema = new Schema<Follow>(
  {
    follow_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user }, // As A
    user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user }, // As B => B is following A
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

FollowSchema.index({ follow_id: 1, user_id: 1 });

const FollowModel: Model<Follow> = model<Follow>(MODELS.follow, FollowSchema, MODELS.follow);
export default FollowModel;

import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Follower from '../types/Follower';

export const FollowerSchema = new Schema<Follower>(
	{
		follower_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
		user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

FollowerSchema.index({ follower_id: 1, user_id: 1 });

const FollowerModel: Model<Follower> = model<Follower>(MODELS.follower, FollowerSchema, MODELS.follower);
export default FollowerModel;

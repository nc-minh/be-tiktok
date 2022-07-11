import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import PostReaction from '../types/PostReaction';

export const PostReactionSchema = new Schema<PostReaction>(
	{
		user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.post },
		post_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.post },
		type: { type: String, required: true },
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

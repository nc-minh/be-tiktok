import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Comment from '../types/Comment';

export const CommentSchema = new Schema<Comment>(
	{
		user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
		post_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.post },
		contents: { type: String, required: true },
		media_url: { type: String },
	},
	{
		timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
	}
);

CommentSchema.index({ user_id: 1, post_id: 1 });

const CommentModel: Model<Comment> = model<Comment>(MODELS.comment, CommentSchema, MODELS.comment);
export default CommentModel;

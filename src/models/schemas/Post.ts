import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Post from '../types/Post';

const PostSchema = new Schema<Post>(
  {
    user_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.user },
    contents: { type: String, required: true },
    media_url: { type: String, default: '' },
    category_id: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: MODELS.category,
        },
      },
    ],
    reaction_count: { type: Number, default: 0 },
    view_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    is_deleted: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

PostSchema.index({ user_id: 1, contents: 'text' });

const PostModel: Model<Post> = model<Post>(MODELS.post, PostSchema, MODELS.post);
export default PostModel;

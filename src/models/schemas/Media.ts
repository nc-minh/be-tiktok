import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Media from '../types/Media';

export const MediaSchema = new Schema<Media>(
  {
    post_id: { type: Schema.Types.ObjectId, required: true, ref: MODELS.post },
    url: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

MediaSchema.index({ post_id: 1 });

const MediaModel: Model<Media> = model<Media>(MODELS.media, MediaSchema, MODELS.media);
export default MediaModel;

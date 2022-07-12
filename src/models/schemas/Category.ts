import { model, Model, Schema } from 'mongoose';

import { MODELS } from 'utils/constants/models';
import Category from '../types/Category';

export const CategorySchema = new Schema<Category>(
  {
    category_name: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

CategorySchema.index({ category_name: 'text' });

const CategoryModel: Model<Category> = model<Category>(MODELS.category, CategorySchema, MODELS.category);
export default CategoryModel;

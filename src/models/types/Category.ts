import { Document } from 'mongoose';

export default interface Category extends Document {
  category_name: string;
}

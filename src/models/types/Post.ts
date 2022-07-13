import { Document } from 'mongoose';

import User from './User';
import Category from './Category';

export default interface Post extends Document {
  user_id: User;
  contents: string;
  media_url: string;
  category_id: Category[];
  reaction_count: number;
  view_count: number;
  is_deleted: boolean;
}

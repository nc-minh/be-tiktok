import { Document } from 'mongoose';

import Post from './Post';

export default interface Media extends Document {
  post_id: Post;
  url?: string;
}

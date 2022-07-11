import { Document } from 'mongoose';
import User from './User';

export default interface Following extends Document {
  following_id: User;
  user_id: User;
}

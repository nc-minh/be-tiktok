import { Document } from 'mongoose';
import User from './User';

export default interface Follower extends Document {
  follower_id: User;
  user_id: User;
}

import { Document } from 'mongoose';
import User from './User';

export default interface Follower extends Document {
  follow_id: User;
  user_id: User;
}

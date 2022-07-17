import { model, Model, Schema } from 'mongoose';
import bcypt from 'bcrypt';

import { MODELS } from 'utils/constants/models';
import User from '../types/User';

const UserSchema = new Schema<User>(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    is_enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    tick: { type: Boolean, default: false },
    followings_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    likes_count: { type: Number, default: 0 },
    website_url: { type: String, default: '' },
    social_network: [{ name: String, url: String }],
    role: { type: String, default: 'user' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

UserSchema.index({ fullname: 'text', username: 'text' });

UserSchema.pre('save', async function (this: User, next: (err?: Error | undefined) => void) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcypt.genSalt(10);
  const hashPassword = await bcypt.hash(this.password, salt);
  this.password = hashPassword;
  next();
});

UserSchema.method('isCheckPassword', async function (password: string, user: User) {
  try {
    return await bcypt.compare(password, user.password);
  } catch (error) {
    return false;
  }
});

const UserModel: Model<User> = model<User>(MODELS.user, UserSchema, MODELS.user);
export default UserModel;

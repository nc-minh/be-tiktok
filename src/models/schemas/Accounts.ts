import { model, Model, Schema } from 'mongoose';
import bcypt from 'bcrypt';

import { MODELS } from 'utils/constants/models';
import Accounts from '../types/Accounts';

export const AccountsSchema = new Schema<Accounts>(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    is_enabled: { type: Boolean, default: true },
    is_deleted: { type: Boolean, default: false },
    tick: { type: Boolean, default: false },
    followings_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    likes_count: { type: Number, default: 0 },
    website_url: { type: String },
    social_network: [{ name: String, url: String }],
    role: { type: String, default: 'user' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

AccountsSchema.index({ fullname: 'text', username: 'text' });

AccountsSchema.pre('save', async function (this: Accounts, next: (err?: Error | undefined) => void) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcypt.genSalt(10);
  const hashPassword = await bcypt.hash(this.password, salt);
  this.password = hashPassword;
  next();
});

AccountsSchema.methods.isCheckPassword = async function (this: Accounts, password: string) {
  try {
    return await bcypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
};

const AccountsModel: Model<Accounts> = model<Accounts>(MODELS.accounts, AccountsSchema);
export default AccountsModel;

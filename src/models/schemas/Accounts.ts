import { model, Model, Schema } from 'mongoose';
import { MODELS } from 'utils/constants/models';
import Accounts from '../types/Accounts';

export const accountsSchema = new Schema<Accounts>(
  {
    fullname: { type: String, required: true },
    nickname: { type: String, required: true },
    username: { type: String, required: true },
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

accountsSchema.index({ nickname: 1, fullname: 1 });

const AccountsModel: Model<Accounts> = model<Accounts>(MODELS.accounts, accountsSchema);

export default AccountsModel;

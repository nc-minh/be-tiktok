import { model, Model, Schema } from 'mongoose';
import { MODELS } from 'utils/constants/models';
import Accounts from '../types/Accounts';

export const accountsSchema = new Schema<Accounts>(
  {
    id: { type: Number, required: true, index: true },
    full_name: { type: String, required: true },
    nickname: { type: String, required: true },
    avatar: { type: String },
    bio: { type: String },
    tick: { type: Boolean, required: true, default: false },
    followings_count: { type: Number },
    followers_count: { type: Number },
    likes_count: { type: Number },
    website_url: { type: String },
    social_cetwork: [{ name: String, url: String }],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

accountsSchema.index({ customerId: 1, vertical: 1 });

const AccountsModel: Model<Accounts> = model<Accounts>(MODELS.accounts, accountsSchema);

export default AccountsModel;

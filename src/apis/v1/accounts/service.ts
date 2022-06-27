import { AccountsModel } from 'models';

const createAccount = async () => {
  const result = AccountsModel.create({
    id: 0,
    full_name: 'NguyenCongMinh',
    nickname: 'Mars',
    avatar: '',
  });
  return result;
};

export { createAccount };

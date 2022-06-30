import { Request, NextFunction } from 'express';

import { usersValidate } from 'Helpers/validation';
import { AccountsModel } from 'models';
import { HttpException, StatusCode } from 'exceptions';

const getAllUsers = async (next: NextFunction) => {
  try {
    const result = await AccountsModel.find().select('-password -is_deleted -created_at -updated_at');

    return result;
  } catch (error) {
    next(error);
  }
};

const searchAllUsers = async (req: Request, next: NextFunction) => {
  const { q, type } = req.query;
  try {
    if (type === 'less') {
      const result = await AccountsModel.find({
        $text: {
          $search: String(q),
        },
      }).limit(5);

      return result;
    } else {
      return [];
    }
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, searchAllUsers };

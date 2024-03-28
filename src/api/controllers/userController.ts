import {Request, Response, NextFunction} from 'express';
import {User} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';

const userListGet = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const userGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      throw new CustomError('No species found', 404);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const userPost = async (
  req: Request<{}, {}, Omit<User, 'user_id'>>,
  res: Response<MessageResponse & {data: User}>,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    const response = {
      message: 'User added',
      data: user,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const userPut = async (
  req: Request<{id: string}, {}, Omit<User, 'user_id'>>,
  res: Response<MessageResponse & {data: User}>,
  next: NextFunction
) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      throw new CustomError('No user found', 404);
    }
    const response = {
      message: 'User updated',
      data: user,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const userDelete = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new CustomError('No user found', 404);
    }
    res.json({message: 'User deleted'});
  } catch (error) {
    next(error);
  }
};

export {userListGet, userGet, userPost, userPut, userDelete};

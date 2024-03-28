import {Request, Response, NextFunction} from 'express';
import {User} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import userModel from '../models/userModel';
import CustomError from '../../classes/CustomError';

const login = async (
  req: Request<{}, {}, {username: string; password: string}>,
  res: Response<MessageResponse & {token: string; user: User}>,
  next: NextFunction
) => {
  try {
    const {username, password} = req.body;
    const user = await userModel.findOne({email: username});
    if (!user) {
      throw new CustomError('Username or password incorrect', 404);
    }
    if (user.password !== password) {
      throw new CustomError('Username or password incorrect', 404);
    }
    const token = '1234567890';
    res.json({message: 'Login successful', token, user});
  } catch (error) {
    next(error);
  }
};

export {login};

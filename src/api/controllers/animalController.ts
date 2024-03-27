import {Request, Response, NextFunction} from 'express';
import {Animal} from '../../types/DBTypes';
import animalModel from '../models/animalModel';
import {MessageResponse} from '../../types/MessageTypes';

const animalListGet = async (
  req: Request,
  res: Response<Animal[]>,
  next: NextFunction
) => {
  try {
    const animals = await animalModel.find();
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

const animalGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Animal>,
  next: NextFunction
) => {
  try {
    const animal = await animalModel.findById(req.params.id);
    if (!animal) {
      throw new Error('No animals found');
    }
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

const animalPost = async (
  req: Request<{}, {}, Omit<Animal, 'animal_id'>>,
  res: Response<MessageResponse & {data: Animal}>,
  next: NextFunction
) => {
  try {
    const animal = await animalModel.create(req.body);
    const response = {
      message: 'Animal added',
      data: animal,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const animalPut = async (
  req: Request<{id: string}, {}, Omit<Animal, 'animal_id'>>,
  res: Response<MessageResponse & {data: Animal}>,
  next: NextFunction
) => {
  try {
    const animal = await animalModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    if (!animal) {
      throw new Error('No animals found');
    }
    const response = {
      message: 'Animal updated',
      data: animal,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const animalDelete = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<MessageResponse & {data: Animal}>,
  next: NextFunction
) => {
  try {
    const animal = await animalModel.findByIdAndDelete(req.params.id);
    if (!animal) {
      throw new Error('No animals found');
    }
    const response = {
      message: 'Animal deleted',
      data: animal,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export {animalListGet, animalGet, animalPost, animalPut, animalDelete};

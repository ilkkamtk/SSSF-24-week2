import {Request, Response, NextFunction} from 'express';
import {Species} from '../../types/DBTypes';
import {MessageResponse} from '../../types/MessageTypes';
import speciesModel from '../models/speciesModel';
import CustomError from '../../classes/CustomError';

const speciesListGet = async (
  req: Request,
  res: Response<Species[]>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.find();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesGet = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<Species>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.findById(req.params.id);
    if (!species) {
      throw new CustomError('No species found', 404);
    }
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesPost = async (
  req: Request<{}, {}, Omit<Species, 'species_id'>>,
  res: Response<MessageResponse & {data: Species}>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.create(req.body);
    const response = {
      message: 'Species added',
      data: species,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const speciesPut = async (
  req: Request<{id: string}, {}, Omit<Species, 'species_id'>>,
  res: Response<MessageResponse & {data: Species}>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    if (!species) {
      throw new CustomError('No species found', 404);
    }
    const response = {
      message: 'Species updated',
      data: species,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const speciesDelete = async (
  req: Request<{id: string}, {}, {}>,
  res: Response<MessageResponse & {data: Species}>,
  next: NextFunction
) => {
  try {
    const species = await speciesModel.findByIdAndDelete(req.params.id);
    if (!species) {
      throw new CustomError('No species found', 404);
    }
    const response = {
      message: 'Species deleted',
      data: species,
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export {speciesListGet, speciesGet, speciesPost, speciesPut, speciesDelete};

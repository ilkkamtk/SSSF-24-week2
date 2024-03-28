import express from 'express';
import {
  animalDelete,
  animalGet,
  animalListGet,
  animalPost,
  animalPut,
} from '../controllers/animalController';
import {body, param} from 'express-validator';

const router = express.Router();

router
  .route('/')
  .get(animalListGet)
  .post(
    body('animal_name').isString().escape(),
    body('birthdate').isDate(),
    body('species').isMongoId().notEmpty(),
    animalPost
  );

router
  .route('/:id')
  .get(param('id').isMongoId().notEmpty(), animalGet)
  .put(
    param('id').isMongoId().notEmpty(),
    body('animal_name').isString().escape().optional(),
    body('birthdate').isDate().optional(),
    body('species').isMongoId().notEmpty().optional(),
    animalPut
  )
  .delete(param('id').isMongoId().notEmpty(), animalDelete);

export default router;

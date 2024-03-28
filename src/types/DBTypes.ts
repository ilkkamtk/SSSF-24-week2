import {Point} from 'geojson';
import mongoose, {Document} from 'mongoose';

type Category = {
  _id: mongoose.Types.ObjectId;
  category_name: string;
};

type Species = Partial<Document> & {
  species_name: string;
  category: mongoose.Types.ObjectId;
  image: string;
  location: Point;
};

type Animal = Partial<Document> & {
  animal_name: string;
  species: mongoose.Types.ObjectId;
  birthdate: Date;
  gender: 'male' | 'female';
};

type User = Partial<Document> & {
  user_name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
};

export {Category, Species, Animal, User};

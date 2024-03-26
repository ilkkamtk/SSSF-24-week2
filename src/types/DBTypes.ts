import mongoose, {Document} from 'mongoose';

type Category = {
  _id: mongoose.Types.ObjectId;
  category_name: string;
};

type Species = Partial<Document> & {
  species_name: string;
  category: mongoose.Types.ObjectId;
  image: string;
};

type Animal = {
  animal_id: number;
  animal_name: string;
  species: number;
  birthdate: Date;
};

export {Category, Species, Animal};

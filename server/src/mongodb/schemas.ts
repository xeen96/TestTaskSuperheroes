import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const SuperHeroSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  real_name: {
    type: String,
    default: '',
    trim: true,
  },

  origin_description: {
    type: String,
    default: '',
    trim: true,
  },
  superpowers: {
    type: [String],
    default: [],
    set: (arr: string[]) =>
      arr.map((str: string) => str.trim()).filter((str) => str.length > 0), //delete empty strings
  },

  catch_phrase: {
    type: String,
    default: '',
    trim: true,
  },

  images: {
    type: [String],
    default: [],
  },
});

export const SuperheroModel = mongoose.model('Superhero', SuperHeroSchema);

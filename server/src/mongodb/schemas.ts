import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;


const SuperHeroSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },

  real_name: {
    type: String,
    default: ''
  },

  origin_description: {
    type: String,
    default: ''
  },
  superpowers: {
    type: [String],
    default: []
  },

  catch_phrase: {
    type: String,
    default: '',
  },
  
  images: {
    type: [String],
    default: []
  }
})

export const SuperHero = mongoose.model('SuperHero', SuperHeroSchema);

import mongoose from 'mongoose';
import config from '../config/config';
import { SuperheroModel } from './schemas';
import { Superhero } from '../definitions/definitions';

async function connectToDb() {
  try {
    await mongoose.connect(config.DB_URL);
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    console.error(err);
    throw Error('Failed to connect to MongoDB');
  }
}

async function getAllSuperheroes() {
  try {
    const superheroes = await SuperheroModel.find({});
    return superheroes;
  } catch (err) {
    throw err;
  }
}

async function getSuperheroByNickname(nickname: string) {
  try {
    const superhero = await SuperheroModel.findOne({ nickname });
    return superhero;
  } catch (err) {
    throw err;
  }
}

async function updateSuperhero(superhero: Superhero) {
  try {
    const { nickname, ...newData } = superhero;
    const updateSuperhero = await SuperheroModel.findOneAndUpdate(
      { nickname },
      newData,
      { new: true }
    );
    return updateSuperhero;
  } catch (err) {
    throw err;
  }
}

async function deleteSuperheroByNickname(nickname: string) {
  try {
    const result = await SuperheroModel.findOneAndDelete({ nickname });
    return result;
  } catch (err) {
    throw err;
  }
}
async function createSuperhero(superhero: Superhero) {
  try {
    const exists = await getSuperheroByNickname(superhero.nickname);
    if (exists) {
      throw new Error('superhero already exist');
    }
    const newSuperhero = new SuperheroModel(superhero);
    await newSuperhero.save();
    return newSuperhero;
  } catch (err) {
    throw err;
  }
}

const db = {
  connectToDb,
  getAllSuperheroes,
  getSuperheroByNickname,
  updateSuperhero,
  deleteSuperheroByNickname,
  createSuperhero,
};
export default db;

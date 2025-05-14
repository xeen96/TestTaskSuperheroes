import mongoose, { Model } from 'mongoose';
import config from '../config/config';
import { SuperHero } from './schemas';

async function connectToDb() {
  try {
    await mongoose.connect(config.DB_URL);
    console.log("Connected to MongoDB");
    return true;
  } catch (err) {
    throw Error("Failed to connect to MongoDB");
  }
}

async function getAllSuperHeroes() {
  try {
    const superheroes = await SuperHero.find({});
    return superheroes;
  } catch (err) {
    throw err;
  }
}

const db = {
  connectToDb,
  getAllSuperHeroes
}
export default db;
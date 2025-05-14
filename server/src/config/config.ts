import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  DB_URL: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3001,
  DB_URL: process.env.DB_URL || 'mongodb+srv://'
};

export default config;

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import cors from 'cors';
import path from 'path';
import db from './mongodb/mongodb';
import { SeedSuperHeroes } from './mongodb/seed_db';
import setupRoutes from './routes/api';

const app: Application = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

setupRoutes(router);
app.use('/api/v1', router);

app.listen(config.PORT, async () => {
  await db.connectToDb();
  // uncomment to seed db with 10 fake models
  // await SeedSuperHeroes();

  console.log(`Listening at http://localhost:${config.PORT}`);
});

export default app;

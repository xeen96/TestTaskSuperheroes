import express, { Application, Request, Response, NextFunction } from 'express';

import bodyParser from 'body-parser';
import config from './config/config';
import db from './mongodb/mongodb'

import setupRoutes from "./routes/api";
import { SeedSuperHeroes } from './mongodb/seed_db';

import enableCORS from './middlwares/enable_cors'; 
const router = express.Router();
const app: Application = express();
setupRoutes(router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', enableCORS, router); // allow cors for front-end server

app.listen(config.PORT, async () => {
  try {
  if ( config.DB_URL ) {
    await db.connectToDb();
    // await SeedSuperHeroes();     //if needed: seed db with placeholder values
  }
} catch (err){
  console.error(err)
} finally {
  console.log("Listening at https://localhost:".concat(String(config.PORT)));
}
});
export default app;
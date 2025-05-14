import config from '../config/config'
import { Request, Response, NextFunction } from "express";
import cors from 'cors';

const enableCORS = (req: Request, res: Response, next: NextFunction) =>{
  if (!process.env.DISABLE_XORIGIN) {
    const allowedOrigin: string = `localhost:${config.PORT}`;
    const origin: string = req.headers.origin as string;
    if (allowedOrigin) {
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      });
    }
  }
  next();
};

export default enableCORS
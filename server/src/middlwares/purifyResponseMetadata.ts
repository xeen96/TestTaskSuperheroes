import { Request, Response, NextFunction } from 'express';
import { Document, Types } from 'mongoose';
import { Superhero } from 'src/definitions/definitions';

interface SuperheroDocument extends Superhero, Document {
  _id: Types.ObjectId;
  __v?: number;
}

export const purifyResponseMetadata = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json.bind(res);
  res.json = function (data: SuperheroDocument | SuperheroDocument[] | null) {
    if (
      data instanceof Document ||
      (Array.isArray(data) && data.every((item) => item instanceof Document))
    ) {
      const metadataFields = ['_id', '__v'];

      const purifyObject = (obj: SuperheroDocument) => {
        const cleanedObj = obj.toObject();
        metadataFields.forEach((field) => delete cleanedObj[field]);
        return cleanedObj;
      };

      let cleanedData;
      if (Array.isArray(data)) {
        cleanedData = data.map((obj) => purifyObject(obj));
      } else {
        cleanedData = purifyObject(data);
      }
      return originalJson(cleanedData);
    }
    return originalJson(data);
  };
  next();
};

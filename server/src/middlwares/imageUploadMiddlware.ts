import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import config from '../config/config';

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  }
  cb(new Error('Only images allowed'));
};

export const uploadImages = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array('heroImages', 5);

export const processSuperheroImages = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // console.log('Middleware processSuperheroImages started');
    // console.log('Request body before:', req.body);
    // console.log('Files:', req.files);

    if (typeof req.body.superheroData === 'string') {
      try {
        // console.log('Parsing superheroData JSON');
        const parsedData = JSON.parse(req.body.superheroData);
        req.body = parsedData;
        // console.log('Parsed superheroData:', parsedData);
      } catch (parseError) {
        console.error('Error parsing superheroData:', parseError);
        res.status(400).json({ error: 'Invalid superheroData JSON format' });
        return;
      }
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const files = req.files as Express.Multer.File[];

      const imageUrls = files.map(
        (file) => `http://localhost:${config.PORT}/uploads/${file.filename}`
      );

      // console.log('Generated image URLs:', imageUrls);
      if (req.body.images && Array.isArray(req.body.images)) {
        req.body.images = [...req.body.images, ...imageUrls];
      } else {
        req.body.images = imageUrls;
      }
    } else {
      if (!req.body.images) {
        req.body.images = [];
      }
    }

    // console.log('Request body after processing:', req.body);
    next();
  } catch (error) {
    console.error('Error porcessing image:', error);
    res.status(500).json({ error: 'Error porcessing image:' });
  }
};

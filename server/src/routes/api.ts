import { Router, Request, Response } from 'express';
import db from '../mongodb/mongodb';
import { Superhero } from 'src/definitions/definitions';
import {
  uploadImages,
  processSuperheroImages,
} from '../middlwares/imageUploadMiddlware';
import { purifyResponseMetadata } from '../middlwares/purifyResponseMetadata';

export default function (app: Router) {
  app.route('/hello').get(async (req: Request, res: Response) => {
    res.json({ hello: 'hello JSN!' });
  });

  app
    .route('/superheroes')
    .get(purifyResponseMetadata, async (req: Request, res: Response) => {
      try {
        const superheroes = await db.getAllSuperheroes();
        res.json(superheroes);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error getting superheroes' });
      }
    });

  app
    .route('/superheroes/create')
    .post(
      uploadImages,
      processSuperheroImages,
      purifyResponseMetadata,
      async (req: Request, res: Response) => {
        try {
          const data: Superhero = req.body;
          // console.log('creating:', data);
          const newSuperhero = await db.createSuperhero(data);
          // console.log('Succssesfully created', newSuperhero);
          res.json(newSuperhero);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'error creating superhero' });
        }
      }
    );

  app
    .route('/superheroes/:nickname')
    .get(purifyResponseMetadata, async (req: Request, res: Response) => {
      try {
        const { nickname } = req.params;
        const superhero = await db.getSuperheroByNickname(nickname);
        if (!superhero) {
          res.status(404).json({ error: 'superhero not found' });
          return;
        }
        res.json(superhero);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error getting superhero' });
      }
    })
    .put(
      uploadImages,
      processSuperheroImages,
      purifyResponseMetadata,
      async (req: Request, res: Response) => {
        try {
          const { nickname } = req.params;
          const data: Superhero = req.body;
          if (!data.nickname) {
            data.nickname = nickname;
          } else if (data.nickname !== nickname) {
            res.status(400).json({
              error: 'nickname mismatch between URL and body data',
            });
            return;
          }

          // console.log('Updating superhero', data);
          const existingHero = await db.getSuperheroByNickname(nickname);

          if (!existingHero) {
            res.status(404).json({ error: 'superhero not found' });
            return;
          }

          const updateSuperhero = await db.updateSuperhero(data);
          if (!updateSuperhero) {
            res.status(400).json({ error: 'failed to update superhero' });
            return;
          }
          res.json(updateSuperhero);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'error updating superhero' });
        }
      }
    )
    .delete(async (req: Request, res: Response) => {
      try {
        const { nickname } = req.params;
        const deletedSuperhero = await db.deleteSuperheroByNickname(nickname);
        if (!deletedSuperhero) {
          res.status(404).json({ error: 'superhero not found' });
          return;
        }
        res.status(204).json({ message: 'superhero deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'error deleting superhero' });
      }
    });
}

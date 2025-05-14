import { Router, Request, Response } from "express";
import db from '../mongodb/mongodb'

export default  function (app: Router) {

  app
    .route('/hello')
    .get( async (req: Request, res: Response) => {
      res.json({hello: "hello JSN!"});
    });
  
  app
    .route('/superheroes')
    .get(async (req: Request, res: Response) => { // Get All Superheroes
      try {
        const superheroes = await db.getAllSuperHeroes();
        res.json(superheroes)
      } catch (err) {
        res.json({error: "no superheroes found"});
      }
    })

  app
    .route('/api/:nickname') // Get Superhero by nickname
    .get(async (req: Request, res: Response) => {
      
  });
  

  // app.put('/api/:nickname', async (req: Request, res: Response) => {  // Edit Superhero by nickname

  // })

  // app.delete('/api/:nickname', async (req: Request, res: Response) => { // Delete Superhero by nickname

  // })

}

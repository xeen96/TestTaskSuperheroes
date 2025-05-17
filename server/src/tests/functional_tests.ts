import chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import server from '../server';
import mongoose from 'mongoose';
import { SuperheroModel } from '../mongodb/schemas';
import { Superhero } from '../definitions/definitions';
import { SeedSuperHeroes } from '../mongodb/seed_db';
import config from '../config/config';
import { ok } from 'assert';

const { expect } = chai;
chai.use(chaiHttp);

describe('API Tests', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(config.DB_URL);
    }
    await SeedSuperHeroes();
  });

  after(async () => {
    await SuperheroModel.deleteMany({});
    await mongoose.disconnect();
  });

  describe('Welcome Message', () => {
    describe('GET /api/v1/hello', () => {
      it('should return hello JSN!', async () => {
        const res = await supertest(server).get('/api/v1/hello').expect(200);
        expect(res.body.hello).to.be.eq('hello JSN!');
      });
    });
  });

  describe('Superheroes API', () => {
    describe('GET', () => {
      describe('GET /api/v1/superheroes', () => {
        it("should return all superheroes, with all fields present, nickname shouldn't be empty", async () => {
          const res = await supertest(server)
            .get('/api/v1/superheroes')
            .expect(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(10);
          res.body.forEach((hero: Superhero) => {
            expect(hero).to.have.keys([
              'nickname',
              'real_name',
              'origin_description',
              'superpowers',
              'catch_phrase',
              'images',
            ]);
            expect(hero.nickname).length.gt(0);
          });
        });
      });
      describe('GET /api/v1/superheroes:nickname', () => {
        it('should return exsiting superhero', async () => {
          const exstHero = 'The Arachnid';
          const res = await supertest(server)
            .get(`/api/v1/superheroes/${exstHero}`)
            .expect(200);
          expect(res.body).haveOwnProperty('nickname').eq('The Arachnid');
        });

        it('should return error for non-existing superhero', async () => {
          const res = await supertest(server)
            .get('/api/v1/superheroes/NonExistingHero')
            .expect(404);
          expect(res.body.error).to.be.eq('superhero not found');
        });
      });
    });
    describe('POST', () => {
      describe('POST /api/v1/superheroes/create', () => {
        it('should create new superhero', async () => {
          const newHero = {
            nickname: 'Definitely Non Existent Superhero',
            origin_description: 'test description',
            superpowers: ['Power 1, Power 2'],
          };
          const res = await supertest(server)
            .post('/api/v1/superheroes/create')
            .set('Content-Type', 'application/json')
            .send(newHero);
          expect(res.body).to.have.keys([
            'nickname',
            'real_name',
            'origin_description',
            'superpowers',
            'catch_phrase',
            'images',
          ]);
          expect(res.body)
            .haveOwnProperty('origin_description')
            .eq('test description');
          expect(res.body)
            .haveOwnProperty('superpowers')
            .deep.eq(['Power 1, Power 2']);
        });
      });
    });
  });

  describe('PUT', () => {
    describe('PUT /api/v1/superheroes/:nickname', () => {
      it('should update existen superhero', async () => {
        const heroToUpdate = 'Metal Man';
        const res = await supertest(server)
          .put(`/api/v1/superheroes/${heroToUpdate}`)
          .send({
            real_name: 'Test',
            origin_description: 'Test',
          });
        expect(res.body).to.have.keys([
          'nickname',
          'real_name',
          'origin_description',
          'superpowers',
          'catch_phrase',
          'images',
        ]);
        expect(res.body).ownProperty('real_name').eq('Test');
        expect(res.body).ownProperty('origin_description').eq('Test');
      });

      it('should return error if trying to change nickname', async () => {
        const heroToUpdate = 'Metal Man';
        const mismatchNickname = 'The Arachnid';
        const res = await supertest(server)
          .put(`/api/v1/superheroes/${heroToUpdate}`)
          .send({
            nickname: mismatchNickname,
            real_name: 'Peter Parker',
          });
        expect(res.body)
          .haveOwnProperty('error')
          .eq('nickname mismatch between URL and body data');
      });

      it('should return error if hero not exists', async () => {
        const heroToUpdate = 'Non Existen';
        const res = await supertest(server)
          .put(`/api/v1/superheroes/${heroToUpdate}`)
          .send({
            real_name: 'Non Existen Name',
          });
        expect(res.body).haveOwnProperty('error').eq('superhero not found');
      });
    });
  });

  describe('DELETE', () => {
    describe('DELETE /api/v1/superheroes/:nickname', () => {
      it('should delete superhero in :param', async () => {
        const heroToDelete = 'Dark Knight';
        await supertest(server)
          .delete(`/api/v1/superheroes/${heroToDelete}`)
          .expect(ok);
      });

      it('should return error if  superhero not exists', async () => {
        const heroToDelete = 'Non existen superhero';
        const res = await supertest(server)
          .delete(`/api/v1/superheroes/${heroToDelete}`)
          .expect(404);
        expect(res.body).haveOwnProperty('error').eq('superhero not found');
      });
    });
  });
});

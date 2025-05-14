import chai from 'chai';
import chaiHttp from 'chai-http';
import { Application } from 'express';
import supertest from 'supertest';
import server from '../server' 

const { expect } = chai;
chai.use(chaiHttp);

describe('Welcome Message', () => {
  describe('GET /api/hello', () => {
    it('should return helloWorld' , async () => {
      const res = await supertest(server)
        .get('/api/hello')
        .expect(200);
      expect(res.body.hello).to.be.eq('hello JSN!');
    });
  });

});

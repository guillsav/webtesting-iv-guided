const request = require('supertest');
const server = require('./server');

describe('server', () => {
  it('set the environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('GET / using .expect from the supertest library', () => {
    it('should return 200 OK', () => {
      return request(server)
        .get('/')
        .expect(200);
    });
  });

  it('GET / using async await', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });

  it('content type should return JSON using done', done => {
    request(server)
      .get('/')
      .then(res => {
        expect(res.type).toBe('application/json');
        done();
      });
  });

  it('should return {api: "up"}', async () => {
    const res = await request(server).get('/');
    expect(res.body).toEqual({api: 'up'});
  });
});

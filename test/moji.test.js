const request = require('supertest');
const chai = require('chai');
const { app, server } = require('../index');
const { after, describe, it } = require('mocha');
const expect = chai.expect;

describe('Moji the Decoder', () => {
  after(() => {
    server.close();
  });

  it('Server should be running', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).to.equal(200);
  });

  it('POST /decode should return name and hexcode for a known emoji', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '😀' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('name', 'grinning');
    expect(res.body).to.have.property('hexcode', 'U+1F600');
  });

  it('POST /decode should return (unknown) and hexcode for an unknown emoji', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '🧑‍🚀' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('name', '(unknown)');
    expect(res.body).to.have.property('hexcode', 'U+1F9D1 200D 1F680');
  });

  it('POST /decode should return an error message if no emoji is sent', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('error', 'No emoji provided');
  });
});


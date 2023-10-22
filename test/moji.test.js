const request = require('supertest');
const chai = require('chai');
const { app, server } = require('../moji');
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

  it('POST /decode should return name and codepoint for a known emoji', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '😀' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('name', 'grinning');
    expect(res.body).to.have.property('codepoint', 'U+1F600');
  });

  it('POST /decode should correctly split ZWJ characters and retrieve their information', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '👁️‍🗨️' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.lengthOf(2);
    expect(res.body[0]).to.have.property('name', 'eye');
    expect(res.body[0]).to.have.property('codepoint', 'U+1F441 U+FE0F');
    expect(res.body[1]).to.have.property('name', 'left speech bubble');
    expect(res.body[1]).to.have.property('codepoint', 'U+1F5E8 U+FE0F');
  });

  it('POST /decode should return the correct information for each component of the emoji', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '👨‍👩‍👧‍👦' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.lengthOf(4);
    expect(res.body[0]).to.have.property('name', 'man');
    expect(res.body[0]).to.have.property('codepoint', 'U+1F468');
    expect(res.body[1]).to.have.property('name', 'woman');
    expect(res.body[1]).to.have.property('codepoint', 'U+1F469');
    expect(res.body[2]).to.have.property('name', 'girl');
    expect(res.body[2]).to.have.property('codepoint', 'U+1F467');
    expect(res.body[3]).to.have.property('name', 'boy');
    expect(res.body[3]).to.have.property('codepoint', 'U+1F466');
  });
});

  it('POST /decode should return (unknown) and hexcode for an unknown emoji', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '🧑‍🚀' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('name', '(unknown)');
    expect(res.body).to.have.property('codepoint', 'U+1F9D1 200D 1F680');
  });

  it('POST /decode should return an error message if no emoji is sent', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '' });

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('error', 'No emoji provided');
  });
});


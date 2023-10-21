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

  it('Clicking "Decode" button should update the text field and URL', async () => {
    // Simulate a click event on the "Decode" button
    const res = await request(app)
      .post('/decode')
      .send({ emoji: '😀' });

    // Check that the text field is updated correctly
    expect(res.body).to.have.property('name', 'grinning');
    expect(res.body).to.have.property('codepoint', 'U+1F600');

    // Check that the URL is updated correctly
    expect(window.location.href).to.include(`?emoji=${encodeURIComponent('😀')}`);
  });

  it('POST /decode should return an error message if an invalid emoji is sent', async () => {
    const res = await request(app)
      .post('/decode')
      .send({ emoji: 'invalid emoji' });

    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property('error', 'Invalid emoji');
  });
});


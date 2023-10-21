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

  // New business logic tests
  describe('New Business Logic', () => {
    it('should handle empty inputs', async () => {
      // Test code here
    });

    it('should handle null inputs', async () => {
      // Test code here
    });

    it('should handle undefined inputs', async () => {
      // Test code here
    });

    it('should handle inputs of the wrong type', async () => {
      const res = await request(app)
        .post('/decode')
        .send({ emoji: 123 });
    
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.have.property('error', 'Invalid emoji provided');
    });

    it('should handle inputs with extreme values', async () => {
      const res = await request(app)
        .post('/decode')
        .send({ emoji: '😀'.repeat(1000) });
    
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.have.property('error', 'Emoji is too long');
    });

    it('should handle typical inputs', async () => {
      const res = await request(app)
        .post('/decode')
        .send({ emoji: '😀' });
    
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('name', 'grinning');
      expect(res.body).to.have.property('codepoint', 'U+1F600');
    });
  });
});


// test.js
const chai = require('chai');
const request = require('chai-http');
const app = require('./app');

chai.use(request);
const expect = chai.expect;

describe('Pi Status App', () => {
  it('should return system stats on root route', async () => {
    const res = await chai.request(app).get('/');
    expect(res).to.have.status(200);
    expect(res.text).to.include('Hostname:');
    expect(res.text).to.include('CPU:');
    expect(res.text).to.include('Memory:');
    expect(res.text).to.include('Disk');
  });
});
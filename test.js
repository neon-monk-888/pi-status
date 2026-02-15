const assert = require('assert');
const http = require('http');

// Simple test that makes a basic HTTP request
describe('Pi Status App', () => {
  let server;
  
  before((done) => {
    const app = require('./app');
    server = app.listen(0, () => done()); // use random port
  });
  
  after((done) => {
    server.close(done);
  });
  
  it('should return system stats on root route', (done) => {
    const port = server.address().port;
    const options = {
      hostname: 'localhost',
      port: port,
      path: '/',
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        assert.strictEqual(res.statusCode, 200);
        assert(data.includes('Hostname:'), 'Response should include hostname');
        assert(data.includes('CPU:'), 'Response should include CPU info');
        assert(data.includes('Memory:'), 'Response should include memory info');
        assert(data.includes('Disk'), 'Response should include disk info');
        done();
      });
    });
    
    req.on('error', done);
    req.end();
  });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); 
const server = app.listen();   
chai.use(chaiHttp);
const { expect } = chai;

after(() => {
    server.close(); 
});

describe('API Tests', function() {
    it('GET / should return status 200', function(done) {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('POST /tasks should create a new task', function(done) {
        chai.request(app)
            .post('/tasks')
            .send({ title: 'test task' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                done();
            });
    });
});
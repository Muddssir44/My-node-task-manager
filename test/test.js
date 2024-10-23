const chai = require('chai');
const chaiHttp = require('chai-http');  // Ensure chai-http is imported this way
const app = require('../index.js');  // Adjust this path to your Express app

chai.use(chaiHttp);  // Use chaiHttp middleware with chai

describe('API Tests', function() {
    it('GET / should return status 200', function(done) {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                done();
            });
    });

    it('POST /tasks should create a new task', function(done) {
        chai.request(app)
            .post('/tasks')
            .send({ title: 'test task' })
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
                done();
            });
    });
});

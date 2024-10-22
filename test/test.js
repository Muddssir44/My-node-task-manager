const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Task Manager API', () => {
    it('should GET all tasks', (done) => {
        chai.request(app)
            .get('/tasks')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should POST a new task', (done) => {
        const newTask = { title: 'Test Task' };
        chai.request(app)
            .post('/tasks')
            .send(newTask)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('title', 'Test Task');
                done();
            });
    });
});

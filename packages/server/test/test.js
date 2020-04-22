//During the test the env variable is set to test
process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
require("chai").should();
chai.use(chaiHttp);

describe("User name", () => {
  describe("/POST user", () => {
    it("it should GET 200 response", (done) => {
      chai
        .request("http://localhost:3002")
        .post("/user")
        .send({
          firstName: "Dhiti",
          lastName: "Painter",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("data");
          res.body.data.should.contain("Hello Dhiti Painter!");
          done();
        });
    });
  });
  describe("/GET error", () => {
    it("it should GET 500 response", (done) => {
      chai
        .request(server)
        .get("/error")
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property("data");
          done();
        });
    });
  });
});

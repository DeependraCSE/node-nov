const { request } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();

chai.use(chaiHttp);

describe("Friends API", function(){
	// Test GET
	describe("GET /friends", function(){
		it("should get all the friends", function(done){
			chai.request(server).get('/friends')
			.end(function(err, response){
				response.should.have.status(200);
				response.body.should.be.a('array');
				// response.body.length.should.be.eq(3);
				done();
			})
		})
	});

	describe("GET /friends/edit/:id", function(){
		it("should get the friend by id", function(done){
			const friendID = "675f1816057321a4d9749136";
			chai.request(server)
			.get('/friends/edit/'+friendID)
			.end(function(err, response){
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('_id');
				response.body.should.have.property('name');
				response.body.should.have.property('email');
				response.body.should.have.property('city');
				response.body.should.have.property('name').eq('Batman')
				done();
			})
		})
	});
	// Test POST
	describe("POST /friends", function(){
		it("should post a new friend", function(done){
			const friend = {
								name: 'Kit',
								email: 'kit@walker.com',
								city: 'Bhangala'
							};
			chai.request(server)
			.post('/friends')
			.send(friend)
			.end(function(err, response){
				response.should.have.status(200);
				response.body.should.be.a('object');
				response.body.should.have.property('added').eq('new friend added');
				response.body.should.have.property('email').eq('kit@walker.com');
				response.body.should.have.property('city').eq('Bhangala');
				done();
			})
		}) 
	});
	// Test DELETE
	// once you run the delete the ObjectId will be deleted too... 
	describe("DELETE /friends/delete/:id", function(){
		it("should delete a friend with id", function(done){
			const friendID = "675f1816057321a4d9749136";
			chai.request(server)
			.delete('/friends/delete/'+friendID)
			.end(function(err, response){
				response.should.have.status(200);
				response.body.should.be.a('object');
				done();
			})
		})
	}); 
})
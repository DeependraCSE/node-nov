const { expect } = require("chai");
let idx = require("../step1");
describe("testing for user", function(){
    let app = null;
    this.beforeAll(function(){
        app = idx;
    });
    it("should check for user to be vijay",function(){
        expect(app.user).to.equal("vijay");
    })
    it("should check for user's length must be 5",function(){
        expect(app.user.length).to.equals(5);
    })   
    this.afterAll(function(){
        app = null;
    })
}); 



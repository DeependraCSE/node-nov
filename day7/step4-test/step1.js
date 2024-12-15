let assert = require("node:assert");
const { describe, it } = require("node:test");

describe("enter the project name to test", function(){
    describe("enter the property to test",function(){
        it("enter the objective of the test",function(){
            // testing code
            assert.equal(1,2,"first error message to display")
        })
    //})
    //describe("enter the function to test",function(){
        it("enter the objective of the test",function(){
            assert.equal(1,1,"second error message to display")
        })
    //})
    //describe("enter the object to test",function(){
        it("enter the objective of the test",function(){
            assert.deepEqual({ title : "ironman" },{ title : "ironman" },"third error message to display")
        })
    //  it("this is a pending test")
    })
})
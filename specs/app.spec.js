const fs = require("fs");
const path = require("path");
const chai = require("chai");
const expect = chai.expect;

var assert = require("assert");
var http = require("http");
var server = require("../src/app");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const wget = require("wget-improved");
const src = "http://localhost:5050/create";
const output = "./src/create.html";

let download = wget.download(src, output);

const readData = path => {
  return new Promise((res, rej) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        rej("Error in reading");
      } else {
        res(data);
      }
    });
  });
};

describe("HTTP Testcases-1 #start_test", function() {
  it("should display the home page", function(done) {
    http.get("http://localhost:5050", function(res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it("should display the create page", function(done) {
    http.get("http://localhost:5050/create", function(res) {
      assert.equal(200, res.statusCode);
      server.close();
      done();
    });
  });
});

readData("./src/create.html").then(res => {
  const create_data = res;
  console.log(create_data);
  const dom = new JSDOM(create_data);
  const td = dom.window.document.getElementsByTagName("td");
  const input = dom.window.document.getElementsByTagName("input").length;
  console.log(input);
  console.log(td);
  describe("HTTP Testcases-2", function() {
    it("should check content", done => {
      expect(
        dom.window.document.getElementsByTagName("td")[0].textContent
      ).to.include("Product");
      done();
    });
    it("should check content", done => {
      expect(
        dom.window.document.getElementsByTagName("td")[2].textContent
      ).to.include("Product");
      done();
    });
    it("should check content #end_test", done => {
      expect(dom.window.document.getElementsByTagName("input").length).to.equal(
        3
      );
      done();
    });
  });
});
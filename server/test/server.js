var expect  = require("chai").expect;
var request = require("request");

// describe("Color Code Converter API", function() {
//
//     describe("RGB to Hex conversion", function() {
//
//         var url = "https://localhost:3010/api/rgbToHex?red=255&green=255&blue=255";
//
//         it("returns status 200", function(done) {
//             request(url, function(error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//
//         it("returns the color in hex", function(done) {
//             request(url, function(error, response, body) {
//                 expect(body).to.equal("ffffff");
//                 done();
//             });
//         });
//
//     });
//
//
//     describe("Hex to RGB conversion", function() {
//
//         var url = "https://localhost:3010/api/hexToRgb?hex=00ff00";
//
//         it("returns status 200", function(done) {
//             request(url, function(error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//
//         it("returns the color in RGB", function(done) {
//             request(url, function(error, response, body) {
//                 expect(body).to.equal("[0,255,0]");
//                 done();
//             });
//         });
//
//     });
//
// });
//
// describe("NASA API", function () {
//
//     describe("Picture of the day api call", function() {
//
//         var url = "https://localhost:3010/api/picOfTheDaySvc";
//
//         it("returns status 200", function(done) {
//             request(url, function(error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//
//         it("description body should not be empty", function(done) {
//             request(url, function(error, response, body) {
//                 let overall = JSON.parse(body);
//                 let output = JSON.parse(overall.data);
//                 expect(output).to.have.deep.property('copyright');
//                 expect(output).to.have.deep.property('date');
//                 expect(output).to.have.deep.property('desc');
//                 expect(output).to.have.deep.property('title');
//                 expect(output).to.have.deep.property('isPicAvail');
//                 done();
//             });
//         });
//     });
// });

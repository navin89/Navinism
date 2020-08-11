"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var neo_service_1 = require("./neo.service");
describe('NeoService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(neo_service_1.NeoService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

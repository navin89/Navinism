"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var base_context_service_1 = require("./base-context.service");
describe('BaseContextService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(base_context_service_1.BaseContextService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

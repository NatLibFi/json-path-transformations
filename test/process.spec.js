if  (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['expect.js', 'loglevel', '../lib/main'], function(expect, log, json_path_transformer) {

    'use strict';

    log.disableAll();

    describe('#process()', function() {

	it('Should throw exception because of invalid transformation specification data', function() {

	    var data = {};
	    var spec = "test";

	    expect(json_path_transformer.process).withArgs(data, spec).to.throwException();

	});

	it("Should throw exception because transformation specification doesn't validate against schema", function() {

	    var data = {};
	    var spec = {};

	    expect(json_path_transformer.process).withArgs(data, spec).to.throwException();

	});

	it("Should succeed because transformation specification is valid against the schema", function() {

	    var data = {};
	    var spec = {
		transformations: []
	    };

	    expect(json_path_transformer.process).withArgs(data, spec).to.not.throwException();

	});

	it('Should have the values added as expected');
	it('Should have the data copied as expected');
	it('Should have data modified as expected');
	it('Should have values removed as expected');
	it('Should have values set as expected');

    });

});
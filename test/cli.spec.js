(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['expect.js', 'loglevel', 'fs', '../lib/cli'], function(expect, log, fs, cli) {

	log.disableAll();

	describe('cli', function() {

	    it('Should return 1 without proper number of arguments', function() {

		var stdout = {
		    write: function(){}
		};
		var stderr = {
		    write: function(){}
		};

		expect(cli([], stdout, stderr)).to.be(1);

	    });

	    it('Should return 255 because of invalid file as input', function() {

		var stdout = {
		    write: function(){}
		};
		var stderr = {
		    write: function(){}
		};

		expect(cli(['foo', ''], stdout, stderr)).to.be(255);

	    });

	    it('Should return 255 because of invalid JSON as input', function() {

		var stdout = {
		    write: function(){}
		};
		var stderr = {
		    write: function(){}
		};

		expect(cli(['{}', ''], stdout, stderr)).to.be(255);

	    });

	    it('Should return 0 and return valid data', function() {

		var file_spec = 'test/files/spec.json';
		var file_input = 'test/files/input.json';
		var file_output = 'test/files/output.json';
		var result = '';
		var stdout = {
		    write: function(chunk){
			result += chunk;
		    }
		};
		var stderr = {
		    write: function(){}
		};

		expect(cli([file_input, file_spec], stdout, stderr)).to.be(0);
		expect(result).to.be(
		    fs.readFileSync(file_output, {encoding: 'utf8'})
		);

	    });

	});

    });

})();


/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Apply transformations to JSON objects using JSONPath
 *
 * Copyright (c) 2015 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of json-path-transformations 
 *
 * json-path-transformations is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 **/

/* istanbul ignore next */
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['chai', 'fs', '../lib/cli'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('chai'), require('fs'), require('../lib/cli'));
    }

}(this, factory));

function factory(chai, fs, cli)
{

    'use strict';

    var expect = chai.expect;

    describe('cli', function() {

	it('Should return 1 without proper number of arguments', function() {

	    var stdout = {
		write: function(){}
	    };
	    var stderr = {
		write: function(){}
	    };

	    expect(cli([], stdout, stderr)).to.eql(1);

	});

	it('Should return 255 because of invalid file as input', function() {

	    var stdout = {
		write: function(){}
	    };
	    var stderr = {
		write: function(){}
	    };

	    expect(cli(['foo', ''], stdout, stderr)).to.eql(255);

	});

	it('Should return 255 because of invalid JSON as input', function() {

	    var stdout = {
		write: function(){}
	    };
	    var stderr = {
		write: function(){}
	    };

	    expect(cli(['{}', ''], stdout, stderr)).to.eql(255);

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

	    expect(cli([file_input, file_spec], stdout, stderr)).to.eql(0);
	    expect(result.trim()).to.eql(
		fs.readFileSync(file_output, {encoding: 'utf8'})
	    );

	});

    });

}
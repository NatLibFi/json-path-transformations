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
        define(['chai', '../lib/main'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('chai'), require('../lib/main'));
    }

}(this, factory));

function factory(chai, json_path_transformer)
{

    'use strict';

    var expect = chai.expect;

    describe('#process()', function() {

	it('Should throw exception because of invalid transformation specification data', function() {

	    var data = {};
	    var spec = "test";

	    expect(function() {
		json_path_transformer.process(data, spec);
	    }).to.throw();

	});

	it("Should throw exception because transformation specification doesn't validate against schema", function() {

	    var data = {};
	    var spec = {};

	    expect(function() {
		json_path_transformer.process(data, spec);
	    }).to.throw();

	});

	it("Should succeed because transformation specification is valid against the schema", function() {

	    var data = {};
	    var spec = {
		transformations: []
	    };

	    expect(function() {
		json_path_transformer.process(data, spec);
	    }).to.not.throw();

	});

	it('Should have the values added as expected');
	it('Should have the data copied as expected');
	it('Should have data modified as expected');
	it('Should have values removed as expected');
	it('Should have values set as expected');

    });

}
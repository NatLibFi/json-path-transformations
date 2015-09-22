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

    describe('#remove()', function() {

	it('Should remove the property from object', function() {
	    
	    var data = {
		
		'props': {
		    'test1': 0,
		    'test2': 1,
		    'test3': 2
		}
		
	    };
	    var path = "$.props.test2";
	    
	    json_path_transformer.remove(data, path);
	    
	    expect(data.props).to.not.have.property('test2');
	    expect(Object.keys(data.props)).to.have.length(2);
	    
	});

	it('Should remove an element from the array', function() {
	    
	    var data = {
		
		'list': [
		    0,
		    1,
		    2
		]
		
	    };
	    var path = "$.list[1]";
 	    
	    json_path_transformer.remove(data, path);
	    
	    expect(data.list).to.not.contain(1);
	    expect(data.list).to.have.length(2);
	    
	});

	it('Should remove matching properties', function() {
	    
	    var data = {
		
		'list': [
		    {
			'index': 0,
			'name': 'test0'
		    },
		    {
			'index': 1,
			'name': 'test1'
		    },
		    {
			'index': 2,
			'name': 'test2'
		    }
		]
		
	    };
	    var path = "$.list[?(@.name.match(/^test[12]$/))]";
	    
	    json_path_transformer.remove(data, path);
	    
	    expect(data.list).to.have.length(1);
	    expect(data.list[0]).to.have.property('name');
	    expect(data.list[0].name).to.eql('test0');
	    
	});

    });

}
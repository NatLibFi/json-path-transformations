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

    describe('#set()', function() {

	it('Should replace the object content', function() {
	    
	    var data = {
		props: {
		    value: 0
		}		
	    };
	    var path = "$.props";
	    var content = {
		test: 123
	    };
	    
	    json_path_transformer.set(data, path, content);

	    expect(Object.keys(data.props)).to.have.length(1);
	    expect(data.props).to.have.all.keys(['test']);
	    expect(data.props.test).to.eql(123);
	    
	});

	it('Should create new properties based on path existing parent', function() {
	    
	    var data = {
		group: {
		    leader: {}
		}
		
	    };
	    var path = '$.group.leader.servants';
	    var content = {
		name: 'test',
		role: 'soldier'
	    };
	    
	    json_path_transformer.set(data, path, content);
	    
	    expect(data.group.leader).to.have.property('servants', content);
	    
	});


	it('Should do nothing because attempting to add a property of a element that does not exist', function() {

	    var data = {
		'list': [
		    {
			index: 0,
			value: 'a'
		    },
		    {
			index: 1,
			value: 'b'
		    }
		]
		
	    };
	    var path = "$.list[?(@.index == 2)].value";
	    var content = 'c';
	    
	    json_path_transformer.set(data, path, content);
	    
	    expect(data.list.length).to.eql(2);
	    
	});

	it('Should replace an array with an object', function() {
	    
	    var data = {
		'list': [
		    {
			index: 0,
			value: 'a'
		    },
		    {
			index: 1,
			value: 'b'
		    }
		]
		
	    };
	    var path = "$.list";
	    var content = {value: 'abc'};
	    
	    json_path_transformer.set(data, path, content);
	    
	    expect(data.list).to.be.an('object');
	    expect(data.list).to.have.property('value', 'abc');

	});

	it('Should do nothing because attempting to add a property of a element that does not exist', function() {

	    var data = {
		'list': [
		    {
			index: 0,
			value: 'a'
		    },
		    {
			index: 1,
			value: 'b'
		    }
		]
		
	    };
	    var path = "$.list[?(@.index == 2)].value";
	    var content = 'c';
	    
	    json_path_transformer.set(data, path, content);
	    
	    expect(data.list.length).to.eql(2);
	    
	});


	it('Should create new properties based on the path of the existing parent', function() {
	    
	    var data = {
		group: {
		    leader: {}
		}
	    };
	    var path = '$.group.leader.servants';
	    var content = {
		name: 'test',
		role: 'soldier'
	    };
	    
	    json_path_transformer.set(data, path, content);
	    
	    expect(data.group.leader).to.have.property('servants', content);
	    
	});

    });

}
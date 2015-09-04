(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['expect.js', 'loglevel', '../lib/main'], function(expect, log, json_path_transformer) {

	log.disableAll();

	describe('#set()', function() {

	    it('Should replace the object content', function() {
		
		var data = {
		    
		    'props': {
			'value': 0
		    }
		    
		};
		var path = "$.props";
		var content = {
		    "test": 123
		};
		
		json_path_transformer.set(data, path, content);

		expect(Object.keys(data.props)).to.have.length(1);
		expect(data.props).to.only.have.property('test');
		expect(data.props.test).to.be(123);
		
	    });

	    it('Should create new properties based on path existing parent', function() {
		
		var data = {
		    
		    'group': {

			'leader': {}

		    }
		    
		};
		var path = '$.group.leader.servants';
		var content = {
		    'name': 'test',
		    'role': 'soldier'
		};
		
		json_path_transformer.set(data, path, content);
		
		expect(data.group.leader).to.have.property('servants', content);
		
	    });


	    it('Should do nothing because attempting to add a property of a element that does not exist', function() {

		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 'b'
			}
		    ]
		    
		};
		var path = "$.list[?(@.index == 2)].value";
		var content = 'c';
		
		json_path_transformer.set(data, path, content);
		
		expect(data.list.length).to.be(2);
		
	    });

	    it('Should replace an array with an object', function() {
		
		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 'b'
			}
		    ]
		    
		};
		var path = "$.list";
		var content = {'value': 'abc'};
		
		json_path_transformer.set(data, path, content);
		
		expect(data.list).to.be.an('object');
		expect(data.list).to.have.property('value', 'abc');

	    });

	    it('Should do nothing because attempting to add a property of a element that does not exist', function() {

		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 'b'
			}
		    ]
		    
		};
		var path = "$.list[?(@.index == 2)].value";
		var content = 'c';
		
		json_path_transformer.set(data, path, content);
		
		expect(data.list.length).to.be(2);
		
	    });


	    it('Should create new properties based on the path of the existing parent', function() {
		
		var data = {
		    
		    'group': {

			'leader': {}

		    }
		    
		};
		var path = '$.group.leader.servants';
		var content = {
		    'name': 'test',
		    'role': 'soldier'
		};
		
		json_path_transformer.set(data, path, content);
		
		expect(data.group.leader).to.have.property('servants', content);
		
	    });

	});

    });

})();
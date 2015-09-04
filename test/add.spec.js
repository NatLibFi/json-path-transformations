(function() {

    'use strict';

    var define;

    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }

    define(['expect.js', 'loglevel', '../lib/main'], function(expect, log, json_path_transformer) {

	log.disableAll();

	describe('#add()', function() {

	    it('Should add a new property to an object', function() {
		
		var data = {
		    
		    'props': {
			'value': 0
		    }
		    
		};
		var path = "$.props";
		var content = {
		    "test": 123
		};
		
		json_path_transformer.add(data, path, content);

		expect(Object.keys(data.props)).to.have.length(2);
		expect(data.props).to.have.property('test');
		expect(data.props.test).to.be(123);
		
	    });

	    it('Should have the content added to the end of the array', function() {
		
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
		var path = '$.list';
		var content = {
		    'index': 2,
		    'value': 'c'
		};

		json_path_transformer.add(data, path, content);

		expect(data.list).to.have.length(3);
		expect(data.list[2].value).to.be('c');
		
	    });

	    it('Should do nothing because the path does not exist', function() {
		
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
		
		json_path_transformer.add(data, path, content);
		
		expect(data.group.leader).to.be.empty();
		
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
		
		json_path_transformer.add(data, path, content);
		
		expect(data.list.length).to.be(2);
		
	    });

	    it('Should overwrite the existing property', function() {
		
		var data = {
		    
		    'test0': 0,
		    'test1': 1
		    
		};
		var path = '$';
		var content = {
		    'test1': 2
		};
		
		json_path_transformer.add(data, path, content);
		
		expect(data).to.only.have.keys('test0', 'test1');
		expect(data.test1).to.be(2);
		
	    });

	    it('Should concatenate two strings', function() {
		
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
		var path = "$.list[?(@.index == 1)].value";
		var content = 'abc';

		json_path_transformer.add(data, path, content);
		
		expect(data.list.length).to.be(2);
		expect(data.list[1]).to.have.property('value', 'babc');
		
	    });

	    it('Should add two numbers', function() {

		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 123
			}
		    ]
		    
		};
		var path = "$.list[?(@.index == 1)].value";
		var content = 345;
		
		json_path_transformer.add(data, path, content);
		
		expect(data.list.length).to.be(2);
		expect(data.list[1]).to.have.property('value', 468);
		
	    });

	    it('Should add two booleans', function() {

		var data = {
		    value: false		    
		};
		var path = "$.value";
		var content = true;
		
		json_path_transformer.add(data, path, content);
		
		expect(data).to.have.property('value');
		expect(data.value).to.be(false);
		
	    });

	    it('Should add a boolean and a string', function() {

		var data = {
		    value: true		    
		};
		var path = '$.value';
		var content = 'test';
		
		json_path_transformer.add(data, path, content);
		
		expect(data).to.have.property('value');
		expect(data.value).to.be(true);
		
	    });

	    it('Should concatenate two arrays', function() {
		
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
		var content = [
		    {
			'index': 0,
			'value': 'c'
		    },
		    123
		];
		
		json_path_transformer.add(data, path, content);
		
		expect(data.list).to.be.an('array');
		expect(data.list).to.have.length(4);
		expect(data.list[2]).to.have.property('value', 'c');
		expect(data.list[3]).to.be(123);
		
	    });

	    it('Should fail trying to concatenate a string and an object', function() {

		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 123
			}
		    ]
		    
		};
		var path = "$.list[?(@.index == 1)].value";
		var content = {};
		
		expect(json_path_transformer.add)
		    .withArgs(data, path, content)
		    .to.throwException(/^Invalid append value type: object$/);
		
	    });

	    it('Should fail trying to concatenate an object and an array', function() {

		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 123
			}
		    ]
		    
		};
		var path = "$.list[?(@.index == 1)]";
		var content = [];
		
		expect(json_path_transformer.add)
		    .withArgs(data, path, content)
		    .to.throwException(/^Invalid append value type: array$/);
		
	    });

	    it('Should fail trying to concatenate an object and a number', function() {

		var data = {
		    'list': [
			{
			    'index': 0,
			    'value': 'a'
			},
			{
			    'index': 1,
			    'value': 123
			}
		    ]
		    
		};
		var path = "$.list[?(@.index == 1)]";
		var content = 123;
		
		expect(json_path_transformer.add)
		    .withArgs(data, path, content)
		    .to.throwException(/^Invalid append value type: number$/);
		
	    });

	});

    });

})();
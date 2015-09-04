if  (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['expect.js', 'loglevel', '../lib/main'], function(expect, log, json_path_transformer) {

    'use strict';

    log.disableAll();

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
	    expect(data.list[0].name).to.be('test0');
	    
	});

    });
    
});
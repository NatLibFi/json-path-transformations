if  (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['expect.js', 'loglevel', '../lib/main'], function(expect, log, json_path_transformer) {
    
    'use strict';
    
    log.disableAll();

    describe('#copy()', function() {

	it('Should copy string to an existing property', function() {
	    
	    var data = {
		'props': {

		    'value': 'abc'

		},
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
	    var source_path = "$.props.value";
	    var target_path = "$.list[?(@.index == 1)].value";
	    
	    json_path_transformer.copy(data, source_path, target_path);
	    
	    expect(data.list.length).to.be(2);
	    expect(data.list[1]).to.have.property('value');
	    expect(data.list[1].value).to.be('abc');
	    
	});
	
	it('Should do nothing because attempting copying from a non-existant path', function() {

	    var data = {
		'props': {},
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
	    var source_path = "$.props.value";
	    var target_path = "$.list[?(@.index == 1)].value";
	    
	    json_path_transformer.copy(data, source_path, target_path);
	    
	    expect(data.list.length).to.be(2);
	    expect(data.list[1]).to.have.property('value');
	    expect(data.list[1].value).to.be('b');
	    	    
	});

    });

});
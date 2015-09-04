if  (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['expect.js', 'loglevel', '../lib/main'], function(expect, log, json_path_transformer) {

    'use strict';

    log.disableAll();

    describe('#modify()', function() {

	it('Should modify a string', function() {
	    
	    var data = {
		'value': 'abc'
	    };
	    var path = '$.value';
	    var pattern = 'b';
	    var replacement = 'a';
	    
	    json_path_transformer.modify(data, path, pattern, replacement);
	    
	    expect(data.value).to.be('aac');
	    
	});

	it('Should modify a number', function() {

	    var data = {
		'value': 123
	    };
	    var path = '$.value';
	    var pattern = '2';
	    var replacement = '1';
	    
	    json_path_transformer.modify(data, path, pattern, replacement);
	    
	    expect(data.value).to.be(113);
	    
	});

	it('Should not modify a string because of no match', function() {
	    
	    var data = {
		'value': 'test'
	    };
	    var path = '$.value';
	    var pattern = 'abc';
	    var replacement = 'def';
	    
	    json_path_transformer.modify(data, path, pattern, replacement);
	    
	    expect(data.value).to.be('test');
	    
	});

	it('Should modify a number to a string', function() {

	    var data = {
		'value': 123
	    };
	    var path = '$.value';
	    var pattern = '2';
	    var replacement = 'test';
	    
	    json_path_transformer.modify(data, path, pattern, replacement, 1);
	    
	    expect(data.value).to.be('1test3');
	    
	});

	it('Should modify a string to a number', function() {

	    var data = {
		'value': 'test3'
	    };
	    var path = '$.value';
	    var pattern = 'test';
	    var replacement = '12';
	    
	    json_path_transformer.modify(data, path, pattern, replacement, 1);
	    
	    expect(data.value).to.be(123);
	    
	});

	it('Should modify a string to contain number but retain the string type', function() {

	    var data = {
		'value': 'test3'
	    };
	    var path = '$.value';
	    var pattern = 'test';
	    var replacement = '12';
	    
	    json_path_transformer.modify(data, path, pattern, replacement);
	    
	    expect(data.value).to.be('123');
	    
	});

	it('Should fail because conversion of a number to a string was not requested', function() {

	    var data = {
		'value': 123
	    };
	    var path = '$.value';
	    var pattern = '2';
	    var replacement = 'test';
	    
	    expect(json_path_transformer.modify)
		.withArgs(data, path, pattern, replacement)
		.to.throwException(/^Replaced node value is not a number$/);
	    
	});

	it('Should fail because target node is an object', function() {

	    var data = {
		'value': {}
	    };
	    var path = '$.value';
	    var pattern = '2';
	    var replacement = 'test';
	    
	    expect(json_path_transformer.modify)
		.withArgs(data, path, pattern, replacement)
		.to.throwException(/^Invalid node type: object$/);	    
	    
	});

	it('Should fail because target node is an array', function() {
	    
	    var data = {
		'value': []
	    };
	    var path = '$.value';
	    var pattern = '2';
	    var replacement = 'test';
	    
	    expect(json_path_transformer.modify)
		.withArgs(data, path, pattern, replacement)
		.to.throwException(/^Invalid node type: object$/);

	});

    });
});
(function() { 
    
    'use strict';
    
    var define;
    
    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }
    
    define(['jsonpath', 'loglevel', 'json-schema-config', '../resources/transformations-schema.json'], function(jsonpath, log, jsonSchemaConfig, transformations_schema) {

	var proto = {};

	/**
	 * @param parent [number] Get parent instead of the last element
	 */
	function getPathTail(context, path, parent)
	{
	    
	    parent = parent === undefined ? 0 : parent;

	    return path.slice(1).reduce(function(carry, current, index, array) {

		if (index === (array.length - 1) && parent) {
		    return carry;
		} else {
		    return carry[current];
		}
		
	    }, context);
	}

	function appendValue(base_value, append_value)
	{
	    switch (typeof base_value) {
	    case 'string':
	    case 'number':

		if (typeof append_value === 'object') {
		    throw new Error('Invalid append value type: ' + typeof append_value);
		}

		return base_value += append_value;

	    case 'boolean':

		append_value = typeof append_value === 'boolean'
		    ? append_value
		    : Boolean(append_value);

		return base_value && append_value;

	    case 'object':
		if (Array.isArray(base_value)) {
		    return base_value.concat(append_value);
		} else {
		    if (Array.isArray(append_value)) {
			throw new Error('Invalid append value type: array');
		    } else if (typeof append_value !== 'object') {
			throw new Error('Invalid append value type: ' + typeof append_value);
		    } else {
			return Object.assign(base_value, JSON.parse(JSON.stringify(append_value)));
		    }
		}
	    }	
	}

	proto.set = function(obj, path, content)
	{
	    try {
		jsonpath.value(obj, path, content);
	    } catch (excp) {
		log.error('Set failed');
		throw excp;
	    }
	};

	proto.add = function(obj, path, content)
	{
	    try {
		/**
		 * @internal Set the value as new if the path does not exist
		 */
		if (jsonpath.query(obj, path).length == 0) {
		    proto.set(obj, path, content);
		} else {
		    jsonpath.paths(obj, path).forEach(function(found_path) {

			var tail, parent;
			
			tail = getPathTail(obj, found_path);
			parent = getPathTail(obj, found_path, 1);

			if (parent === tail) {
			    parent = appendValue(tail, content);
			} else {
			    parent[found_path[found_path.length - 1]] = appendValue(tail, content);
			}			

		    });
		}
	    } catch (excp) {
		log.error('Add failed');
		throw excp;
	    }
	};

	proto.remove = function(obj, path)
	{

	    var removables = [];

	    try {
		
		jsonpath.paths(obj, path).forEach(function(found_path) {
		    
		    var parent = getPathTail(obj, found_path, 1);
		    var child = found_path[found_path.length - 1];

		    if (!removables.some(function(element) {
			if (element.parent === parent) {
			    element.children.push(child);
			    return 1;
			}
		    })) {
			removables.push({
			    'parent': parent,
			    'children': [child],
			    'isArray': Array.isArray(parent)
			});
		    }

		});

		removables.forEach(function(removable) {

		    if (removable.isArray) {

			removable.children
			    .sort()
			    .reverse()
			    .forEach(function(index) {
				removable.parent.splice(index,1);
			    });

		    } else {
			removable.children.forEach(function(key) {
			    delete removable.parent[key];
			});
		    }

		});

	    } catch (excp) {
		log.error('Remove failed');
		throw excp;
	    }
	};

	/**
	 * No-op if source path does not exist
	 */
	proto.copy = function(obj, source_path, target_path, append)
	{
	    if (jsonpath.query(obj, source_path).length > 0) {
		if (append) {
		    proto.add(obj, target_path, jsonpath.value(obj, source_path));
		} else {
		    proto.set(obj, target_path, jsonpath.value(obj, source_path));
		}
	    }
	};

	proto.modify = function(obj, path, pattern, replacement, convert)
	{
	    try {

		pattern = new RegExp(pattern);

		jsonpath.paths(obj, path).forEach(function(found_path) {

		    var parent = getPathTail(obj, found_path, 1);
		    var tail_value = getPathTail(obj, found_path);

		    if (typeof tail_value === 'string') {

			tail_value = tail_value.replace(pattern, replacement);

			if (!isNaN(Number(tail_value)) && convert) {
			    parent[found_path[found_path.length - 1]] = Number(tail_value);
			} else {
			    parent[found_path[found_path.length - 1]] = tail_value;
			}

		    } else if ( typeof tail_value === 'number') {
			
			tail_value = tail_value.toString().replace(pattern, replacement);
			
			if (!convert) {
			    if (isNaN(Number(tail_value))) {
				throw new Error('Replaced node value is not a number');
			    } else {
				parent[found_path[found_path.length - 1]] = Number(tail_value);
			    }
			} else {
			    parent[found_path[found_path.length - 1]] = tail_value;
			}
			
		    } else {
			throw new Error('Invalid node type: ' + typeof tail_value);
		    }

		});

	    } catch (excp) {
		log.error('Modify failed');
		throw excp;
	    }
	};		    

	proto.process =  function(obj, spec)
	{	    
	    try {

		spec = jsonSchemaConfig(spec, transformations_schema);

		spec.transformations.forEach(function(transformation) {
		    switch (transformation.action) {
		    case 'add':
			proto.add(obj, transformation.path, transformation.content);
			break;
		    case 'copy':
			proto.copy(obj, transformation.sourcePath, transformation.targetPath, transformation.append);
			break;
		    case 'modify':
			proto.modify(obj, transformation.path, transformation.content, transformation.replacement);
			break;
		    case 'remove':
			proto.remove(obj, transformation.path);
			break;
		    case 'set':
			proto.set(obj, transformation.path, transformation.content);
			break;		    
		    }				
		});

	    } catch (excp) {
		throw excp;
	    }
	    
	};
	
	return proto;
	
    });
    
})();

(function() { 
    
    'use strict';
    
    var define;
    
    if  (typeof define !== 'function') {
	define = require('amdefine')(module);
    }
    
    define(['../lib/main', 'fs'], function(json_path_transformer, fs) {
	
	return function(argv, stdout, stderr)
	{

	    var usage = 'json-path-transformer <DATA> <SPEC>';

	    argv = argv === undefined ? process.argv.slice(2) : argv;
	    stdout = stdout === undefined ? process.stdout : stdout;
	    stderr = stderr === undefined ? process.stderr : stderr;
	    
	    function getJsonObject(str)
	    {
		if (fs.existsSync(str)) {
		    return JSON.parse(fs.readFileSync(
			str, {encoding: 'utf8'}
		    ));
		} else {
		    return JSON.parse(str);
		}
	    }

	    if (argv.length < 2) {
		stderr.write(usage + '\n');
		return 1;
	    } else {
		try {

		    var data = getJsonObject(argv[0]);
		    var spec = getJsonObject(argv[1]);

		    json_path_transformer.process(data, spec);

		    stdout.write(JSON.stringify(data) + '\n');
		    return 0;

		} catch (excp) {
		    if ('message' in excp) {
			stderr.write('Failed: ' + excp.message + '\n');
		    } else {
			stderr.write(JSON.stringify(excp, undefined, '\t') + '\n');
		    }
		    return 255;
		}
	    }

	};

    });

})();
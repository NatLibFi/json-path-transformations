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
        define(['fs', './main'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('fs'), require('./main'));
    }

}(this, factory));

function factory(fs, json_path_transformer)
{

    'use strict';

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

}
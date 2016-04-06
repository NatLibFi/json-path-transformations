/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * Apply transformations to JSON objects using JSONPath
 *
 * Copyright (c) 2015-2016 University Of Helsinki (The National Library Of Finland)
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
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
    define(['chai/chai', '../lib/main'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('chai'), require('../lib/main'));
  }

}(this, factory));

function factory(chai, json_path_transformer)
{

  'use strict';

  var expect = chai.expect;

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
      
      expect(data.list.length).to.eql(2);
      expect(data.list[1]).to.have.property('value');
      expect(data.list[1].value).to.eql('abc');
      
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
      
      expect(data.list.length).to.eql(2);
      expect(data.list[1]).to.have.property('value');
      expect(data.list[1].value).to.eql('b');
      
    });

  });

}

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

  describe('#modify()', function() {

    it('Should modify a string', function() {
      
      var data = {
        'value': 'abc'
      };
      var path = '$.value';
      var pattern = 'b';
      var replacement = 'a';
      
      json_path_transformer.modify(data, path, pattern, replacement);
      
      expect(data.value).to.eql('aac');
      
    });

    it('Should modify a number', function() {

      var data = {
        'value': 123
      };
      var path = '$.value';
      var pattern = '2';
      var replacement = '1';
      
      json_path_transformer.modify(data, path, pattern, replacement);
      
      expect(data.value).to.eql(113);
      
    });

    it('Should not modify a string because of no match', function() {
      
      var data = {
        'value': 'test'
      };
      var path = '$.value';
      var pattern = 'abc';
      var replacement = 'def';
      
      json_path_transformer.modify(data, path, pattern, replacement);
      
      expect(data.value).to.eql('test');
      
    });

    it('Should modify a number to a string', function() {

      var data = {
        'value': 123
      };
      var path = '$.value';
      var pattern = '2';
      var replacement = 'test';
      
      json_path_transformer.modify(data, path, pattern, replacement, 1);
      
      expect(data.value).to.eql('1test3');
      
    });

    it('Should modify a string to a number', function() {

      var data = {
        'value': 'test3'
      };
      var path = '$.value';
      var pattern = 'test';
      var replacement = '12';
      
      json_path_transformer.modify(data, path, pattern, replacement, 1);
      
      expect(data.value).to.eql(123);
      
    });

    it('Should modify a string to contain number but retain the string type', function() {

      var data = {
        'value': 'test3'
      };
      var path = '$.value';
      var pattern = 'test';
      var replacement = '12';
      
      json_path_transformer.modify(data, path, pattern, replacement);
      
      expect(data.value).to.eql('123');
      
    });

    it('Should fail because conversion of a number to a string was not requested', function() {

      var data = {
        'value': 123
      };
      var path = '$.value';
      var pattern = '2';
      var replacement = 'test';
      
      expect(function() {
        json_path_transformer.modify(data, path, pattern, replacement);
      }).to.throw(/^Replaced node value is not a number$/);
      
    });

    it('Should fail because target node is an object', function() {

      var data = {
        'value': {}
      };
      var path = '$.value';
      var pattern = '2';
      var replacement = 'test';
      
      expect(function() {
        json_path_transformer.modify(data, path, pattern, replacement);
      }).to.throw(/^Invalid node type: object$/);     
      
    });

    it('Should fail because target node is an array', function() {
      
      var data = {
        'value': []
      };
      var path = '$.value';
      var pattern = '2';
      var replacement = 'test';
      
      expect(function() {
        json_path_transformer.modify(data, path, pattern, replacement);
      }).to.throw(/^Invalid node type: object$/);

    });

  });

}

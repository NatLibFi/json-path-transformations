# JSONPath Transformations

Apply transformations to JSON objects using [JSONPath](http://goessner.net/articles/JsonPath/).

This program uses JSONPath implementation from [dchester/jsonpath](https://github.com/dchester/jsonpath).
     
## What about JSON Patch?

[JSON Patch](http://jsonpatch.com/) is a specification which defines a syntax to patch JSON documents using [JSON Pointer](https://tools.ietf.org/html/rfc6901) instead of JSONPath. JSON Pointer doesn't support script expressions or regular expressions (Regular expressions can be used in JSONPath with script expressions).

Then again, script expressions aren't entirely a good thing since implementations in languages other than Javascript must evaluate non-natively. Using alternative specifications like [JMESPath](http://jmespath.org/) might be more feasible.

## Usage

The module returns an object which has the following methods:

* **add** (*target_object*, *path*, *content*): Add *content* to *path* on *target_object*. Nonexistent properties leading up to the target property will be created. If the target property exists, *content* will be appended. 
* **set** (*target_object*, *path*, *content*): Set *path* to *content* at *target_object*.
* **copy** (*target_object*, *source_path*, *target_path*, *append*): Copy *source_path* at *target_object* to *target_path*. If *append* is defined, *content* will be appended instead of replacing possibly existing data.
* **modify** (*target_object*, *path*, *pattern*, *replacement*, *convert*): Modify *path* at *target_object* with regular expression replacement. Works only on strings and numbers. Modified property becomes string by default unless *convert* is defined.
* **remove** (*target_object*, *path*): Removes data at *path* from *target_object*.
* **process** (*target_object*, *spec*): Processes *target_object* as defined in *spec*. See [Transforming objects with transformation specifications](#Transforming objects with transformation specifications).

### AMD

```javascript
define(['json-path-transformations'], function(json_path_transformer) {
  json_path_transformer.process(o1, spec);
});
```

### Node.js

```javascript
var json_path_transformer = require('json-path-transformations');

json_path_transformer.process(o1, spec);

```

## Transforming objects with transformation specifications

**SEE resources/transformations-schema.json FOR reference**

Transformations specification is an object with a single property **transformations** which is an array. The property can contain any number of transformation actions to be performed on the target object.

### Examples

*TODO*

## License and copyright

Copyright (c) 2015 University Of Helsinki (The National Library Of Finland)

This project's source code is licensed under the terms of **GNU General Public License Version 3**.
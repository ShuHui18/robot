
'use strict';

let path = require('path');
let executeInput = require('./build/robot').default;
let fileName = process.argv[2];
let filePath = path.resolve(fileName);

executeInput(filePath)
  .catch(err => console.error(err.stack));

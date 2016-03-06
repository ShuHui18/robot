
import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';

export function parseInput (filePath) {
  return readInput(filePath)
    .then(data => parseToCommands(data));
}

export function readInput (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) { return reject(new Error(`parse input error: ${err.message}`)); }
      resolve(data);
    });
  });
}

export function parseToCommands (inputStr = '') {
  return _.map(splitToCommands(inputStr), str => {
    if (_.startsWith(str, 'PLACE')) { return parsePlace(str); }
    if (_.startsWith(str, 'MOVE')) { return parseMove(str); }
    if (_.startsWith(str, 'LEFT')) { return parseLeft(str); }
    if (_.startsWith(str, 'MOVE')) { return parseRight(str); }
    if (_.startsWith(str, 'REPORT')) { return parseReport(str); }
  });
}

export function splitToCommands (str) {
  return _.chain(str.split('\n'))
    .filter(command => !!command)
    .map(command => command.trim().toUpperCase())
    .value();
}

export function parsePlace (str) {
  let values = str.split(' ')[1].split(',');
  return { command: 'PLACE', x: values[0], y: values[1], f: values[2] };
}

export function parseMove (str) {
  return { command: 'MOVE' };
}

export function parseLeft (str) {
  return { command: 'LEFT' };
}

export function parseRight (str) {
  return { command: 'RIGHT' };
}

export function parseReport (str) {
  return { command: 'REPORT' };
}

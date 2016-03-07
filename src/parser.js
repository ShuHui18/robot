
import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import ACTION_TYPES from './actionTypes';
import CONFIG from './config';

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
    if (_.startsWith(str, ACTION_TYPES.PLACE)) { return parsePlace(str); }
    if (_.startsWith(str, ACTION_TYPES.MOVE)) { return parseMove(str); }
    if (_.startsWith(str, ACTION_TYPES.LEFT)) { return parseLeft(str); }
    if (_.startsWith(str, ACTION_TYPES.MOVE)) { return parseRight(str); }
    if (_.startsWith(str, ACTION_TYPES.REPORT)) { return parseReport(str); }
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
  return { type: ACTION_TYPES.PLACE, x: parseInt(values[0]), y: parseInt(values[1]), face: values[2] };
}

export function parseMove (str) {
  return { type: ACTION_TYPES.MOVE };
}

export function parseLeft (str) {
  return { type: ACTION_TYPES.LEFT };
}

export function parseRight (str) {
  return { type: ACTION_TYPES.RIGHT };
}

export function parseReport (str) {
  return { type: ACTION_TYPES.REPORT };
}

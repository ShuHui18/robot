
import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import ACTION_TYPES from './actionTypes';
import CONFIG from './config';

export function parseInput (filePath) {
  return readInput(filePath)
    .then(data => parseToActions(data));
}

export function readInput (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) { return reject(new Error(`parse input error: ${err.message}`)); }
      resolve(data);
    });
  });
}

export function parseToActions (inputStr = '') {
  return _.map(splitToLines(inputStr), str => {
    if (_.startsWith(str, ACTION_TYPES.PLACE)) { return parsePlaceAction(str); }
    if (_.startsWith(str, ACTION_TYPES.MOVE)) { return parseMoveAction(str); }
    if (_.startsWith(str, ACTION_TYPES.LEFT)) { return parseLeftAction(str); }
    if (_.startsWith(str, ACTION_TYPES.MOVE)) { return parseRightAction(str); }
    if (_.startsWith(str, ACTION_TYPES.REPORT)) { return parseReportAction(str); }
  });
}

export function splitToLines (str) {
  return _.chain(str.split(/\r?\n/))
    .filter(line => !!line)
    .map(line => line.trim().toUpperCase())
    .value();
}

export function parsePlaceAction (str) {
  let values = str.split(' ')[1].split(',');
  return { type: ACTION_TYPES.PLACE, x: parseInt(values[0]), y: parseInt(values[1]), face: values[2] };
}

export function parseMoveAction (str) {
  return { type: ACTION_TYPES.MOVE };
}

export function parseLeftAction (str) {
  return { type: ACTION_TYPES.LEFT };
}

export function parseRightAction (str) {
  return { type: ACTION_TYPES.RIGHT };
}

export function parseReportAction (str) {
  return { type: ACTION_TYPES.REPORT };
}

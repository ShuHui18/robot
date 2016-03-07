
import _ from 'lodash';
import path from 'path';
import { expect } from 'chai';

import parseInput, {
  parsePlaceAction,
  parseMoveAction,
  parseLeftAction,
  parseRightAction,
  parseReportAction,
  splitToLines
} from '../../src/parser';

describe('parser', () => {

  describe('parseInput', () => {

    it('should pass example a', () => {
      const EXAMPLE_A = path.resolve('test/cases/example-a');
      const EXPECTED_ACTIONS = [
        { type: 'PLACE', x: 0, y: 0, face: 'NORTH' },
        { type: 'MOVE' },
        { type: 'REPORT' }
      ];
      return parseInput(EXAMPLE_A)
        .then(result => expect(result).to.eql(EXPECTED_ACTIONS));
    });

    it('should pass example b', () => {
      const EXAMPLE_B = path.resolve('test/cases/example-b');
      const EXPECTED_ACTIONS = [
        { type: 'PLACE', x: 0, y: 0, face: 'NORTH' },
        { type: 'LEFT' },
        { type: 'REPORT' }
      ];
      return parseInput(EXAMPLE_B)
        .then(result => expect(result).to.eql(EXPECTED_ACTIONS));
    });

    it('should pass example c', () => {
      const EXAMPLE_C = path.resolve('test/cases/example-c');
      const EXPECTED_ACTIONS = [
        { type: 'PLACE', x: 1, y: 2, face: 'EAST' },
        { type: 'MOVE' },
        { type: 'MOVE' },
        { type: 'LEFT' },
        { type: 'MOVE' },
        { type: 'REPORT' }
      ];
      return parseInput(EXAMPLE_C)
        .then(result => expect(result).to.eql(EXPECTED_ACTIONS));
    });

    it('should pass all possiable inputs', () => {
      const INPUTS = path.resolve('test/cases/inputs');
      const EXPECTED_ACTIONS = require(path.resolve('test/actions.json'));
      return parseInput(INPUTS)
        .then(actions => {
          _.forEach(actions, (action, index) => {
            expect(action).to.eql(EXPECTED_ACTIONS[index]);
          });
        });
    });
  });

  describe('parsePlaceAction', () => {

    it('should parse place str to place action', () => {
      const TEST_STR = 'PLACE 0,0,NORTH';
      const EXPECTED_ACTION = { type: 'PLACE', x: 0, y: 0, face: 'NORTH' };
      let result = parsePlaceAction(TEST_STR);
      expect(result).to.eql(EXPECTED_ACTION);
    });
  });

  describe('parseMoveAction', () => {

    it('should parse move str to place action', () => {
      const TEST_STR = 'MOVE';
      const EXPECTED_ACTION = { type: 'MOVE' };
      let result = parseMoveAction(TEST_STR);
      expect(result).to.eql(EXPECTED_ACTION);
    });
  });

  describe('parseLeftAction', () => {

    it('should parse left str to place action', () => {
      const TEST_STR = 'LEFT';
      const EXPECTED_ACTION = { type: 'LEFT' };
      let result = parseLeftAction(TEST_STR);
      expect(result).to.eql(EXPECTED_ACTION);
    });
  });

  describe('parseRightAction', () => {

    it('should parse right str to place action', () => {
      const TEST_STR = 'RIGHT';
      const EXPECTED_ACTION = { type: 'RIGHT' };
      let result = parseRightAction(TEST_STR);
      expect(result).to.eql(EXPECTED_ACTION);
    });
  });

  describe('parseReportAction', () => {

    it('should parse report str to place action', () => {
      const TEST_STR = 'REPORT';
      const EXPECTED_ACTION = { type: 'REPORT' };
      let result = parseReportAction(TEST_STR);
      expect(result).to.eql(EXPECTED_ACTION);
    });
  });

  describe('splitToLines', () => {

    it('should split str to lines', () => {
      const TEST_STR = 'A\r\nB\nC';
      const EXPECTED = [ 'A', 'B', 'C' ];
      let results = splitToLines(TEST_STR);
      expect(results).to.eql(EXPECTED);
    });
  });
})

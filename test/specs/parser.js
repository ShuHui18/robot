
import path from 'path';
import { expect } from 'chai';

import {
  parsePlaceAction,
  parseMoveAction,
  parseLeftAction,
  parseRightAction,
  parseReportAction,
  splitToLines
} from '../../src/parser';

describe('Parser', () => {

  describe('parseInput', () => {

    // const TEST_FILE = path.resolve('data/TEST_C');
    //
    // it('should read data from file', () => {
    //
    //   console.log(TEST_FILE);
    //   return parseInput(TEST_FILE)
    //     .then(data => {
    //       console.log(data);
    //     });
    // });
  });

  describe('parsePlaceAction', () => {

    it('should parse place str to place action', () => {
      const TEST_STR = 'PLACE 0,0,NORTH';
      let result = parsePlaceAction(TEST_STR);
      let expected = { type: 'PLACE', x: 0, y: 0, face: 'NORTH' };
      expect(result).to.eql(expected);
    });
  });

  describe('parseMoveAction', () => {

    it('should parse move str to place action', () => {
      const TEST_STR = 'MOVE';
      let result = parseMoveAction(TEST_STR);
      let expected = { type: 'MOVE' };
      expect(result).to.eql(expected);
    });
  });

  describe('parseLeftAction', () => {

    it('should parse left str to place action', () => {
      const TEST_STR = 'LEFT';
      let result = parseLeftAction(TEST_STR);
      let expected = { type: 'LEFT' };
      expect(result).to.eql(expected);
    });
  });

  describe('parseRightAction', () => {

    it('should parse right str to place action', () => {
      const TEST_STR = 'RIGHT';
      let result = parseRightAction(TEST_STR);
      let expected = { type: 'RIGHT' };
      expect(result).to.eql(expected);
    });
  });

  describe('parseReportAction', () => {

    it('should parse report str to place action', () => {
      const TEST_STR = 'REPORT';
      let result = parseReportAction(TEST_STR);
      let expected = { type: 'REPORT' };
      expect(result).to.eql(expected);
    });
  });

  describe('splitToLines', () => {

    it('should split str to lines', () => {
      const TEST_STR = 'A\r\nB\nC';
      let results = splitToLines(TEST_STR);
      let expected = [ 'A', 'B', 'C' ];
      expect(results).to.eql(expected);
    });
  });
})

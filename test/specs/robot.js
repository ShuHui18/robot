
import _ from 'lodash';
import path from 'path';
import { expect } from 'chai';
import Chance from 'chance';
import deepFreeze from 'deep-freeze-node';
import FACE_TYPES from '../../src/faceTypes';
import CONFIG from '../../src/config';
import executeInput, { place, move, left, right, report, formatOutput } from '../../src/robot';

const MIN_TEST_TIMES = 100;

let chance = new Chance();

describe('robot', () => {

  describe('executeInput', () => {

    it('should pass example a', () => {
      const EXAMPLE_A = path.resolve('test/cases/example-a');
      const EXPECT_OUTPUT_A = '0,1,NORTH';
      return executeInput(EXAMPLE_A)
        .then(result => expect(result).to.eql(EXPECT_OUTPUT_A));
    });

    it('should pass example b', () => {
      const EXAMPLE_B = path.resolve('test/cases/example-b');
      const EXPECT_OUTPUT_B = '0,0,WEST';
      return executeInput(EXAMPLE_B)
        .then(result => expect(result).to.eql(EXPECT_OUTPUT_B));
    });

    it('should pass example c', () => {
      const EXAMPLE_C = path.resolve('test/cases/example-c');
      const EXPECT_OUTPUT_C = '3,3,NORTH';
      return executeInput(EXAMPLE_C)
        .then(result => expect(result).to.eql(EXPECT_OUTPUT_C));
    });
  });

  describe('place', () => {

    it('should return a new state if the inputs are valid', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const VALID_FACE = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
        const PREVIOUS_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };
        const EXPECTED_STATE = { x: VALID_X, y: VALID_Y, face: VALID_FACE };

        expect(place(PREVIOUS_STATE, VALID_X, VALID_Y, VALID_FACE)).to.eql(EXPECTED_STATE);
      }
    });

    it('should return the previous state if x is not a valid position', () => {
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_FACE = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      const PREVIOUS_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const EXPECTED_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };

      expect(place(PREVIOUS_STATE, -1, VALID_Y, VALID_FACE)).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, CONFIG.TABLE_SIZE, VALID_Y, VALID_FACE)).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, CONFIG.TABLE_SIZE + 1, VALID_Y, VALID_FACE)).to.eql(EXPECTED_STATE);
    });

    it('should return the previous state if y is not a valid position', () => {
      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_FACE = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      const PREVIOUS_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const EXPECTED_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };

      expect(place(PREVIOUS_STATE, VALID_X, -1, VALID_FACE)).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, VALID_X, CONFIG.TABLE_SIZE, VALID_FACE)).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, VALID_X, CONFIG.TABLE_SIZE + 1, VALID_FACE)).to.eql(EXPECTED_STATE);
    });

    it('should return the previous state if face is not a valid direction', () => {
      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const PREVIOUS_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const EXPECTED_STATE = { x: 0, y: 0, face: FACE_TYPES.NORTH };

      expect(place(PREVIOUS_STATE, VALID_X, VALID_Y, FACE_TYPES.NORTH.toLowerCase())).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, VALID_X, VALID_Y, '')).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, VALID_X, VALID_Y, null)).to.eql(EXPECTED_STATE);
      expect(place(PREVIOUS_STATE, VALID_X, VALID_Y, undefined)).to.eql(EXPECTED_STATE);
    });
  });

  describe('move', () => {

    it('should +1 on Y when face on North', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 2 });
        const PREVIOUS_STATE = { x: VALID_X, y: VALID_Y, face: FACE_TYPES.NORTH };
        const EXPECTED_STATE = { x: VALID_X, y: VALID_Y + 1, face: FACE_TYPES.NORTH };

        expect(move(PREVIOUS_STATE)).to.eql(EXPECTED_STATE);
      }
    });

    it('should +1 on X when face on East', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 2 });
        const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const PREVIOUS_STATE = { x: VALID_X, y: VALID_Y, face: FACE_TYPES.EAST };
        const EXPECTED_STATE = { x: VALID_X + 1, y: VALID_Y, face: FACE_TYPES.EAST };

        expect(move(PREVIOUS_STATE)).to.eql(EXPECTED_STATE);
      }
    });

    it('should -1 on Y when face on South', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const VALID_Y = chance.integer({ min: 0 + 1, max: CONFIG.TABLE_SIZE - 1 });
        const PREVIOUS_STATE = { x: VALID_X, y: VALID_Y, face: FACE_TYPES.SOUTH };
        const EXPECTED_STATE = { x: VALID_X, y: VALID_Y - 1, face: FACE_TYPES.SOUTH };

        expect(move(PREVIOUS_STATE)).to.eql(EXPECTED_STATE);
      }
    });

    it('should -1 on X when face on West', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const VALID_X = chance.integer({ min: 0 + 1, max: CONFIG.TABLE_SIZE - 1 });
        const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const PREVIOUS_STATE = { x: VALID_X, y: VALID_Y, face: FACE_TYPES.WEST };
        const EXPECTED_STATE = { x: VALID_X - 1, y: VALID_Y, face: FACE_TYPES.WEST };

        expect(move(PREVIOUS_STATE)).to.eql(EXPECTED_STATE);
      }
    });

    it('should not move outside of the table ', () => {
      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(move({ x: VALID_X, y: CONFIG.TABLE_SIZE - 1, face: FACE_TYPES.NORTH }))
        .to.eql({ x: VALID_X, y: CONFIG.TABLE_SIZE - 1, face: FACE_TYPES.NORTH });

      expect(move({ x: VALID_X, y: 0, face: FACE_TYPES.SOUTH }))
        .to.eql({ x: VALID_X, y: 0, face: FACE_TYPES.SOUTH });

      expect(move({ x: CONFIG.TABLE_SIZE - 1, y: VALID_Y, face: FACE_TYPES.EAST }))
        .to.eql({ x: CONFIG.TABLE_SIZE - 1, y: VALID_Y, face: FACE_TYPES.EAST });

      expect(move({ x: 0, y: VALID_Y, face: FACE_TYPES.WEST }))
        .to.eql({ x: 0, y: VALID_Y, face: FACE_TYPES.WEST });
    });
  });

  describe('left', () => {

    it('should return a state with new direction', () => {

      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(left({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.NORTH }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.WEST });

      expect(left({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.WEST }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.SOUTH });

      expect(left({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.SOUTH }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.EAST });

      expect(left({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.EAST }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.NORTH });
    });
  });

  describe('right', () => {

    it('should return a state with new direction', () => {

      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(right({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.NORTH }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.EAST });

      expect(right({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.EAST }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.SOUTH });

      expect(right({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.SOUTH }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.WEST });

      expect(right({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.WEST }))
        .to.eql({ x: VALID_X, y: VALID_Y, face: FACE_TYPES.NORTH });
    });
  });

  describe('report', () => {

    it('should not modify state', () => {
      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_FACE = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      const PREVIOUS_STATE = { x: VALID_X, y: VALID_Y, face: VALID_FACE };
      const EXPECTED_STATE = { x: VALID_X, y: VALID_Y, face: VALID_FACE };

      expect(report(PREVIOUS_STATE)).to.eql(EXPECTED_STATE);
    });
  });

  describe('formatOutput', () => {

    it('should return valid string output', () => {
      const STATE = { x: 1, y: 2, face: FACE_TYPES.NORTH };
      const EXPECTED = '1,2,NORTH';
      
      expect(formatOutput(STATE)).to.eql(EXPECTED);
    });
  });
})

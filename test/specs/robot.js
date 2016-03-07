
import _ from 'lodash';
import path from 'path';
import { expect } from 'chai';
import Chance from 'chance';
import FACE_TYPES from '../../src/faceTypes';
import CONFIG from '../../src/config';
import executeInput, { place } from '../../src/robot';

const MIN_TEST_TIMES = 100;

let chance = new Chance();

describe('robot', () => {

  describe('executeInput', () => {

    it('should pass example a', () => {
      const EXAMPLE_A = path.resolve('test/cases/example-a');
      const EXPECT_OUTPUT_A = '0,1,NORTH';

      return executeInput(EXAMPLE_A)
        .then(result => {
          expect(result).to.eql(EXPECT_OUTPUT_A);
        });
    });

    it('should pass example b', () => {
      const EXAMPLE_B = path.resolve('test/cases/example-b');
      const EXPECT_OUTPUT_B = '0,0,WEST';

      return executeInput(EXAMPLE_B)
        .then(result => {
          expect(result).to.eql(EXPECT_OUTPUT_B);
        });
    });

    it('should pass example c', () => {
      const EXAMPLE_C = path.resolve('test/cases/example-c');
      const EXPECT_OUTPUT_C = '3,3,NORTH';

      return executeInput(EXAMPLE_C)
        .then(result => {
          expect(result).to.eql(EXPECT_OUTPUT_C);
        });
    });
  });

  describe('place', () => {

    it('should return a new state if the inputs are valid', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
        const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
        const result = place(previousState, validX, validY, validFace);
        expect(result).to.eql({ x: validX, y: validY, face: validFace });
        expect(previousState).to.eql({ x: 0, y: 0, face: FACE_TYPES.NORTH });
      }
    });

    it('should return the previous state if x is not a valid position', () => {
      const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));

      expect(place(previousState, -1, validY, validFace)).to.eql(previousState);
      expect(place(previousState, CONFIG.TABLE_SIZE, validY, validFace)).to.eql(previousState);
      expect(place(previousState, CONFIG.TABLE_SIZE + 1, validY, validFace)).to.eql(previousState);
    });

    it('should return the previous state if y is not a valid position', () => {
      const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));

      expect(place(previousState, validX, -1, validFace)).to.eql(previousState);
      expect(place(previousState, validX, CONFIG.TABLE_SIZE, validFace)).to.eql(previousState);
      expect(place(previousState, validX, CONFIG.TABLE_SIZE + 1, validFace)).to.eql(previousState);
    });

    it('should return the previous state if face is not a valid direction', () => {
      const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(place(previousState, validX, validY, FACE_TYPES.NORTH.toLowerCase())).to.eql(previousState);
      expect(place(previousState, validX, validY, '')).to.eql(previousState);
      expect(place(previousState, validX, validY, null)).to.eql(previousState);
      expect(expect(place(previousState, validX, validY, undefined)).to.eql(previousState));
    });
  });
})

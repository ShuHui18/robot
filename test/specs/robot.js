
import _ from 'lodash';
import path from 'path';
import { expect } from 'chai';
import Chance from 'chance';
import deepFreeze from 'deep-freeze-node';
import FACE_TYPES from '../../src/faceTypes';
import CONFIG from '../../src/config';
import executeInput, { place, move, left, right, report } from '../../src/robot';

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
        const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
        const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
        const expectedState = { x: validX, y: validY, face: validFace };

        expect(place(previousState, validX, validY, validFace)).to.eql(expectedState);
      }
    });

    it('should return the previous state if x is not a valid position', () => {
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const expectedState = { x: 0, y: 0, face: FACE_TYPES.NORTH };

      expect(place(previousState, -1, validY, validFace)).to.eql(expectedState);
      expect(place(previousState, CONFIG.TABLE_SIZE, validY, validFace)).to.eql(expectedState);
      expect(place(previousState, CONFIG.TABLE_SIZE + 1, validY, validFace)).to.eql(expectedState);
    });

    it('should return the previous state if y is not a valid position', () => {
      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const expectedState = { x: 0, y: 0, face: FACE_TYPES.NORTH };

      expect(place(previousState, validX, -1, validFace)).to.eql(expectedState);
      expect(place(previousState, validX, CONFIG.TABLE_SIZE, validFace)).to.eql(expectedState);
      expect(place(previousState, validX, CONFIG.TABLE_SIZE + 1, validFace)).to.eql(expectedState);
    });

    it('should return the previous state if face is not a valid direction', () => {
      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const previousState = { x: 0, y: 0, face: FACE_TYPES.NORTH };
      const expectedState = { x: 0, y: 0, face: FACE_TYPES.NORTH };

      expect(place(previousState, validX, validY, FACE_TYPES.NORTH.toLowerCase())).to.eql(expectedState);
      expect(place(previousState, validX, validY, '')).to.eql(expectedState);
      expect(place(previousState, validX, validY, null)).to.eql(expectedState);
      expect(place(previousState, validX, validY, undefined)).to.eql(expectedState);
    });
  });

  describe('move', () => {

    it('should +1 on Y when face on North', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 2 });
        const previousState = { x: validX, y: validY, face: FACE_TYPES.NORTH };
        const expectedState = { x: validX, y: validY + 1, face: FACE_TYPES.NORTH };

        expect(move(previousState)).to.eql(expectedState);
      }
    });

    it('should +1 on X when face on East', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 2 });
        const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const previousState = { x: validX, y: validY, face: FACE_TYPES.EAST };
        const expectedState = { x: validX + 1, y: validY, face: FACE_TYPES.EAST };

        expect(move(previousState)).to.eql(expectedState);
      }
    });

    it('should -1 on Y when face on South', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const validY = chance.integer({ min: 0 + 1, max: CONFIG.TABLE_SIZE - 1 });
        const previousState = { x: validX, y: validY, face: FACE_TYPES.SOUTH };
        const expectedState = { x: validX, y: validY - 1, face: FACE_TYPES.SOUTH };

        expect(move(previousState)).to.eql(expectedState);
      }
    });

    it('should -1 on X when face on West', () => {
      for(let i = 0; i < MIN_TEST_TIMES; i++) {
        const validX = chance.integer({ min: 0 + 1, max: CONFIG.TABLE_SIZE - 1 });
        const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
        const previousState = { x: validX, y: validY, face: FACE_TYPES.WEST };
        const expectedState = { x: validX - 1, y: validY, face: FACE_TYPES.WEST };

        expect(move(previousState)).to.eql(expectedState);
      }
    });

    it('should not move outside of the table ', () => {
      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(move({ x: validX, y: CONFIG.TABLE_SIZE - 1, face: FACE_TYPES.NORTH }))
        .to.eql({ x: validX, y: CONFIG.TABLE_SIZE - 1, face: FACE_TYPES.NORTH });

      expect(move({ x: validX, y: 0, face: FACE_TYPES.SOUTH }))
        .to.eql({ x: validX, y: 0, face: FACE_TYPES.SOUTH });

      expect(move({ x: CONFIG.TABLE_SIZE - 1, y: validY, face: FACE_TYPES.EAST }))
        .to.eql({ x: CONFIG.TABLE_SIZE - 1, y: validY, face: FACE_TYPES.EAST });

      expect(move({ x: 0, y: validY, face: FACE_TYPES.WEST }))
        .to.eql({ x: 0, y: validY, face: FACE_TYPES.WEST });
    });
  });

  describe('left', () => {

    it('should return a state with new direction', () => {

      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(left({ x: validX, y: validY, face: FACE_TYPES.NORTH }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.WEST });

      expect(left({ x: validX, y: validY, face: FACE_TYPES.WEST }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.SOUTH });

      expect(left({ x: validX, y: validY, face: FACE_TYPES.SOUTH }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.EAST });

      expect(left({ x: validX, y: validY, face: FACE_TYPES.EAST }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.NORTH });
    });
  });

  describe('right', () => {

    it('should return a state with new direction', () => {

      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });

      expect(right({ x: validX, y: validY, face: FACE_TYPES.NORTH }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.EAST });

      expect(right({ x: validX, y: validY, face: FACE_TYPES.EAST }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.SOUTH });

      expect(right({ x: validX, y: validY, face: FACE_TYPES.SOUTH }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.WEST });

      expect(right({ x: validX, y: validY, face: FACE_TYPES.WEST }))
        .to.eql({ x: validX, y: validY, face: FACE_TYPES.NORTH });
    });
  });

  describe('report', () => {

    it('should not modify state', () => {
      const validX = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validY = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const validFace = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      const previousState = { x: validX, y: validY, face: validFace };
      const expectedState = { x: validX, y: validY, face: validFace };

      expect(report(previousState)).to.eql(expectedState);
    });
  });
})

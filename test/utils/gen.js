
import _ from 'lodash';
import fs from 'fs';
import Chance from 'chance';
import CONFIG from '../../src/config';
import FACE_TYPES from '../../src/faceTypes';

const TABLE_SIZE = CONFIG.TABLE_SIZE;

describe('utils', () => {

  it('should show all possiable inputs', () => {

    for (let x = 0; x < TABLE_SIZE; x++) {
      for (let y = 0; y < TABLE_SIZE; y++) {
        console.log(`PLACE ${x},${y},NORTH`);
        console.log(`PLACE ${x},${y},SOUTH`);
        console.log(`PLACE ${x},${y},EAST`);
        console.log(`PLACE ${x},${y},WEST`);
      }
    }
    console.log('MOVE');
    console.log('LEFT');
    console.log('RIGHT');
    console.log('REPORT');
  });

  it('should show all possiable actions', () => {

    let actions = [];

    for (let x = 0; x < TABLE_SIZE; x++) {
      for (let y = 0; y < TABLE_SIZE; y++) {
        actions.push({ type: 'PLACE', x: x, y: y, face: 'NORTH' });
        actions.push({ type: 'PLACE', x: x, y: y, face: 'SOUTH' });
        actions.push({ type: 'PLACE', x: x, y: y, face: 'EAST' });
        actions.push({ type: 'PLACE', x: x, y: y, face: 'WEST' });
      }
    }
    actions.push({ type: 'MOVE' });
    actions.push({ type: 'LEFT' });
    actions.push({ type: 'RIGHT' });
    actions.push({ type: 'REPORT' });
    console.log(JSON.stringify(actions));
  });

  it('should show a random test case', () => {

    const CASE_SIZE = 100;

    let chance = new Chance();

    let genPlace = () => {
      const VALID_X = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_Y = chance.integer({ min: 0, max: CONFIG.TABLE_SIZE - 1 });
      const VALID_FACE = chance.pickone(_.map(FACE_TYPES, (name, value) => value));
      return `PLACE ${VALID_X},${VALID_Y},${VALID_FACE}`;
    };

    let genMove = () => 'MOVE';
    let genLeft = () => 'LEFT';
    let genRight = () => 'RIGHT';
    let genReport = () => 'REPORT';

    for (let i = 0; i < CASE_SIZE; i++) {
      let getInput;
      if (i >= CASE_SIZE - 20) {
        getInput = chance.pickone([ genMove, genLeft, genRight, genReport ]);
      } else {
        getInput = chance.pickone([ genPlace, genMove, genLeft, genRight, genReport ]);
      }
      console.log(getInput());
    }
  });
});

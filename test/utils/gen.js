
import fs from 'fs';
import CONFIG from '../../src/config';

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
});

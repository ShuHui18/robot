
import _ from 'lodash';
import { parseInput } from './parser';
import ACTION_TYPES from './actionTypes';
import CONFIG from './config';

const TABLE_SIZE = CONFIG.TABLE_SIZE;

export function executeInput (filePath) {
  return parseInput(filePath)
    .then(commands => execute(commands));
}

export function execute (actions) {
  const initialState = null;
  return _.reduce(actions, (state, action) => reducer(state, action), initialState);
}

export function reducer (previousState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.PLACE:
      return place(action.x, action.y, action.face);
    case ACTION_TYPES.MOVE:
      return move(previousState);
    case ACTION_TYPES.LEFT:
      return left(previousState);
    case ACTION_TYPES.RIGHT:
      return right(previousState);
    case ACTION_TYPES.REPORT:
      return report(previousState);
    default:
      throw new Error(`invalid action type: ${action.type}`);
  }
}

export function place (x, y, face) {
  return { x, y, face };
}

export function move (previousState) {
  let x = previousState.x;
  let y = previousState.y;
  let face = previousState.face;
  switch (face) {
    case 'NORTH':
      return { x: x, y: y + 1 < TABLE_SIZE ? y + 1 : y, face: face };
    case 'SOUTH':
      return { x: x, y: y - 1 >= 0 ? y - 1 : 0, face: face };
    case 'EAST':
      return { x: x + 1 < TABLE_SIZE ? x + 1 : x, y: y, face: face };
    case 'WEST':
      return { x: x - 1 >= 0 ? x - 1 : x, y: y, face: face };
    default:
      throw new Error(`invalid face: ${face}`);
  }
}

export function left (previousState) {
  switch (previousState.face) {
    case 'NORTH':
      return { x: previousState.x, y: previousState.y, face: 'WEST' };
    case 'SOUTH':
      return { x: previousState.x, y: previousState.y, face: 'EAST' };
    case 'EAST':
      return { x: previousState.x, y: previousState.y, face: 'NORTH' };
    case 'WEST':
      return { x: previousState.x, y: previousState.y, face: 'SOUTH' };
    default:
      throw new Error(`invalid face: ${previousState.face}`);
  }
}

export function right (previousState) {
  switch (previousState.face) {
    case 'NORTH':
      return { x: previousState.x, y: previousState.y, face: 'EAST' };
    case 'SOUTH':
      return { x: previousState.x, y: previousState.y, face: 'WEST' };
    case 'EAST':
      return { x: previousState.x, y: previousState.y, face: 'SOUTH' };
    case 'WEST':
      return { x: previousState.x, y: previousState.y, face: 'NORTH' };
    default:
      throw new Error(`invalid face: ${previousState.face}`);
  }
}

export function report (previousState) {
  console.log(previousState);
  return previousState;
}

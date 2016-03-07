
import _ from 'lodash';
import parseInput from './parser';
import ACTION_TYPES from './actionTypes';
import FACE_TYPES from './faceTypes';
import CONFIG from './config';
import deepFreeze from 'deep-freeze-node';


const TABLE_SIZE = CONFIG.TABLE_SIZE;

export default function executeInput (filePath) {
  return parseInput(filePath)
    .then(actions => execute(actions))
    .then(result => formatOutput(result));
}

export function execute (actions) {
  const initialState = null;
  return _.reduce(actions, (state, action) => reducer(state, action), initialState);
}

export function formatOutput (state) {
  return `${state.x},${state.y},${state.face}`.toUpperCase();
}

export function reducer (previousState, action = {}) {
  deepFreeze(previousState);
  deepFreeze(action);

  switch (action.type) {
    case ACTION_TYPES.PLACE:
      return place(previousState, action.x, action.y, action.face);
    case ACTION_TYPES.MOVE:
      return move(previousState);
    case ACTION_TYPES.LEFT:
      return left(previousState);
    case ACTION_TYPES.RIGHT:
      return right(previousState);
    case ACTION_TYPES.REPORT:
      return report(previousState);
    default:
      console.error(`invalid action type: ${action.type}`);
      return { ...previousState };
  }
}

export function place (previousState, x, y, face) {
  if (!_.inRange(x, 0, TABLE_SIZE)) { return { ...previousState }; }
  if (!_.inRange(y, 0, TABLE_SIZE)) { return { ...previousState }; }
  if (!FACE_TYPES[face]) { return { ...previousState }; }
  return { x, y, face };
}

export function move (previousState) {
  const previousX = previousState.x;
  const previousY = previousState.y;
  const previousFace = previousState.face;

  switch (previousFace) {
    case FACE_TYPES.NORTH:
      return { x: previousX, y: _.min([ previousY + 1, TABLE_SIZE - 1 ]), face: previousFace };
    case FACE_TYPES.SOUTH:
      return { x: previousX, y: _.max([ previousY - 1, 0 ]), face: previousFace };
    case FACE_TYPES.EAST:
      return { x: _.min([ previousX + 1, TABLE_SIZE - 1 ]), y: previousY, face: previousFace };
    case FACE_TYPES.WEST:
      return { x: _.max([ previousX - 1, 0 ]), y: previousY, face: previousFace };
    default:
      console.error(`invalid face: ${previousFace}`);
      return { ...previousState };
  }
}

export function left (previousState) {
  const previousX = previousState.x;
  const previousY = previousState.y;
  const previousFace = previousState.face;

  switch (previousFace) {
    case FACE_TYPES.NORTH:
      return { x: previousX, y: previousY, face: FACE_TYPES.WEST };
    case FACE_TYPES.SOUTH:
      return { x: previousX, y: previousY, face: FACE_TYPES.EAST };
    case FACE_TYPES.EAST:
      return { x: previousX, y: previousY, face: FACE_TYPES.NORTH };
    case FACE_TYPES.WEST:
      return { x: previousX, y: previousY, face: FACE_TYPES.SOUTH };
    default:
      console.error(`invalid face: ${previousFace}`);
      return { ...previousState };
  }
}

export function right (previousState) {
  const previousX = previousState.x;
  const previousY = previousState.y;
  const previousFace = previousState.face;

  switch (previousFace) {
    case FACE_TYPES.NORTH:
      return { x: previousX, y: previousY, face: FACE_TYPES.EAST };
    case FACE_TYPES.SOUTH:
      return { x: previousX, y: previousY, face: FACE_TYPES.WEST };
    case FACE_TYPES.EAST:
      return { x: previousX, y: previousY, face: FACE_TYPES.SOUTH };
    case FACE_TYPES.WEST:
      return { x: previousX, y: previousY, face: FACE_TYPES.NORTH };
    default:
      console.error(`invalid face: ${previousFace}`);
      return { ...previousState };
  }
}

export function report (previousState) {
  console.log(formatOutput(previousState));
  return { ...previousState };
}

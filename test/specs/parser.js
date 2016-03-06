
import path from 'path'
import { parseInput } from '../../src/parser';

describe('Input', () => {

  describe('parseInput', () => {

    const TEST_FILE = path.resolve('data/TEST_C');

    it('should read data from file', () => {

      console.log(TEST_FILE);
      return parseInput(TEST_FILE)
        .then(data => {
          console.log(data);
        });
    });
  });
})

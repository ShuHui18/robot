
import path from 'path'
import { executeInput } from '../../src/robot';

describe('robot', () => {

  describe('executeInput', () => {

    const TEST_FILE = path.resolve('data/TEST_C');

    it('should execute input commands', () => {

      console.log(TEST_FILE);
      return executeInput(TEST_FILE);
        // .then(data => {
        //   console.log(data);
        // });
    });
  });
})

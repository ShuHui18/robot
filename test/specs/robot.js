
import path from 'path';
import { expect } from 'chai';
import { executeInput } from '../../src/robot';

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
})

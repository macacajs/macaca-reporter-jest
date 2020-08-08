'use strict';

const assert = require('assert');

describe('test2.test.js', () => {
  test('should work', () => {
  });

  describe('test2.test2', () => {
    test('should work', () => {
      assert(true);
    });

    describe('test3.test3', () => {
      test('should work', () => {
        assert(true);
      });
    });
  });

  describe('test2.test3', () => {
    test('should work', async () => {
      await new Promise((r) => setTimeout(r, 2000));
      assert(false);
    });
  });
});

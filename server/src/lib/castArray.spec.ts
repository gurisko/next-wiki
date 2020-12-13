import { assert } from 'chai';

import { castArray } from './castArray';

describe('castArray', () => {
  it('casts non-array into an array', () => {
    assert.deepEqual([1], castArray(1));
    assert.deepEqual([undefined], castArray(undefined));
  });
  it('does nothing to an array', () => {
    assert.deepEqual([1], castArray([1]));
    assert.deepEqual([], castArray([]));
  });
});

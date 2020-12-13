import { assert } from 'chai';

import { generateSlug } from './generateSlug';

describe('slugify', () => {
  it('makes the first letter uppercase', () => {
    assert.equal(generateSlug('test'), 'Test');
  });
  it('works with slashes', () => {
    assert.equal(generateSlug('A/B/C'), 'A/B/C');
  });
  it('replaces spaces', () => {
    assert.equal(generateSlug('1 2 3'), '1_2_3');
  });
});

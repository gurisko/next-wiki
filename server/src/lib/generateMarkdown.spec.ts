import { assert } from 'chai';

import { generateMarkdown } from './generateMarkdown';

describe('generateMarkdown', () => {
  it('generates markdown string', () => {
    assert.equal('<h1>Test</h1>\n', generateMarkdown('# Test'));
  });
});

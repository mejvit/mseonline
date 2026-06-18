import { describe, expect, it } from 'vitest';
import { parseTitle } from '../event-title-parser'

describe('startOfDay', () => {
  it('parses place and title when hyphen present', () => {
    const title = "Test — Title"
    const parsedResult = parseTitle(title);

    expect(parsedResult.place).toEqual('Test');
    expect(parsedResult.title).toEqual('Title');
  });

  it('returns original title when no hyphen present', () => {
    const title = "Test title without hyphen"
    const parsedResult = parseTitle(title);

    expect(parsedResult.place).toBeNull();
    expect(parsedResult.title).toEqual('Test title without hyphen');
  });
});

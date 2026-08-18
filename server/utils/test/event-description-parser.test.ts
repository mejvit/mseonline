import { describe, expect, it } from 'vitest';
import { parseDescription } from '../event-description-parser';
import type { StreamDescription } from '~~/shared/types/stream-description';

describe('parseDescription', () => {
  it('parses one link and name when one raw link', () => {
    const actualResult = parseDescription('<a href="https://www.youtube.com/channel/@MyTestChannel" target="_blank">Click to open</a>');
    const expectedResult: StreamDescription = {
        streamLinks: [{
          url: 'https://www.youtube.com/channel/@MyTestChannel',
          name: 'Click to open'
        }]
    };

    expect(actualResult).toEqual(expectedResult);
  });

  it('removes google wrapping link', () => {
    const actualResult = parseDescription('<a href="https://www.google.com/url?q=https://www.youtube.com/@MyTestChannel/streams&amp;sa=D&amp;source=calendar&amp;usd=2&amp;usg=ABCDEFGHIJKL" target="_blank">Click to open</a>');
    const expectedResult: StreamDescription = {
        streamLinks: [{
          url: 'https://www.youtube.com/@MyTestChannel/streams',
          name: 'Click to open'
        }]
    };

    expect(actualResult).toEqual(expectedResult);
  });

  it.each([
    ['malformed', 'https://%'],
    ['relative', '/stream'],
    ['empty', '']
  ])('skips a %s link without dropping valid links', (_, url) => {
    const actualResult = parseDescription(
      `<a href="${url}">Invalid</a><a href="https://example.com/live">Valid</a>`
    );

    expect(actualResult).toEqual({
      streamLinks: [{
        url: 'https://example.com/live',
        name: 'Valid'
      }]
    });
  });

  it.each([
    'javascript:alert(1)',
    'data:text/html,unsafe'
  ])('skips a link using a disallowed protocol: %s', (url) => {
    const actualResult = parseDescription(`<a href="${url}">Unsafe</a>`);

    expect(actualResult).toEqual({ streamLinks: [] });
  });

  it.each([
    ['invalid', 'not-a-url'],
    ['unsafe', 'javascript:alert(1)']
  ])('skips a google redirect with an %s target', (_, target) => {
    const redirectUrl = `https://www.google.com/url?q=${encodeURIComponent(target)}`;
    const actualResult = parseDescription(
      `<a href="${redirectUrl}">Invalid redirect</a>`
    );

    expect(actualResult).toEqual({ streamLinks: [] });
  });

  it('parses note', () => {
    const actualResult = parseDescription('<a href="https://www.youtube.com/channel/@MyTestChannel/live" target="_blank">Click to open</a><br>(Test note)');
    const expectedResult: StreamDescription = {
        streamLinks: [{
          url: 'https://www.youtube.com/channel/@MyTestChannel/live',
          name: 'Click to open'
        }],
        note: "(Test note)"
    };

    expect(actualResult).toEqual(expectedResult);
  });

  it('parses multiple links without note', () => {
    const actualResult = parseDescription('<span>On-line přenos na: <a href="https://www.twitch.tv/test_stream" target="_blank">Twitch</a>, <a href="https://example.com/test-stream" target="_blank">Custom Streaming Platform</a></span>');
    const expectedResult: StreamDescription = {
        streamLinks: [
          {
            url: 'https://www.twitch.tv/test_stream',
            name: 'Twitch'
          },
          {
            url: 'https://example.com/test-stream',
            name: 'Custom Streaming Platform'
          }
        ]
    };

    expect(actualResult).toEqual(expectedResult);
  });

  it('parses multiple links with note', () => {
    const actualResult = parseDescription('<span>On-line přenos na: <a href="https://www.twitch.tv/test_stream" target="_blank">Twitch</a>, <a href="https://example.com/test-stream" target="_blank">Custom Streaming Platform</a></span><p>(Test note)</p>');
    const expectedResult: StreamDescription = {
        streamLinks: [
          {
            url: 'https://www.twitch.tv/test_stream',
            name: 'Twitch'
          },
          {
            url: 'https://example.com/test-stream',
            name: 'Custom Streaming Platform'
          }
        ],
        note: "(Test note)"
    };

    expect(actualResult).toEqual(expectedResult);
  });
});

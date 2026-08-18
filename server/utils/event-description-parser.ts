import * as cheerio from 'cheerio';
import type { StreamDescription } from "#shared/types/stream-description";
import { StreamLink } from '#shared/types/stream-link';

export function parseDescription(description: string): StreamDescription {
  const note = parseNote(description);

  return {
    streamLinks: getLinks(description),
    ...(note !== null ? { note } : {})
  };
};

function parseNote(description: string): string | null {
  const $ = cheerio.load(description, null, false);
  const parts: string[] = [];

  $('br').replaceWith(' ');
  $('a').remove();

  $.root().contents().each((_, node) => {
    const text = $(node)
      .text()
      .replace(/\s+/g, ' ')
      .replace(/^[,\s]+|[,\s]+$/g, '')
      .trim();

    const normalizedText = text.toLocaleLowerCase('cs-CZ');
    const reserved = normalizedText.startsWith('on-line přenos') || normalizedText.startsWith('online přenos');

    if (normalizedText && !reserved) {
      parts.push(text);
    }
  });

  return parts.length > 0 ? parts.join(' ') : null;
}

function getLinks(description: string): StreamLink[] {
  const $ = cheerio.load(description);
  const links: StreamLink[] = [];

  $('a[href]').each((_, element) => {
    const link = $(element);
    const url = unwrapRedirect(link.attr('href')!);

    if (url === null) {
      return;
    }

    links.push({
      url,
      name: link.text().trim()
    });
  })

  return links;
}

function unwrapRedirect(url: string): string | null {
  const urlObject = parseAllowedUrl(url);

  if (urlObject === null) {
    return null;
  }

  if (
    urlObject.hostname === 'google.com'
    || urlObject.hostname.endsWith('.google.com')
    || urlObject.hostname === 'www.google.com'
  ) {
    const target = urlObject.searchParams.get('q');

    if (target) {
      return parseAllowedUrl(target)?.toString() ?? null;
    }
  }

  return urlObject.toString();
}

function parseAllowedUrl(url: string): URL | null {
  try {
    const urlObject = new URL(url);

    return urlObject.protocol === 'http:' || urlObject.protocol === 'https:'
      ? urlObject
      : null;
  } catch {
    return null;
  }
}

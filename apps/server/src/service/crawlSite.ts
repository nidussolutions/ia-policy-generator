import axios from 'axios';
import * as cheerio from 'cheerio';
import * as url from 'url';

export async function crawlSite(
  domain: string,
  visited: Set<string> = new Set()
): Promise<string> {
  try {
    if (!domain.startsWith('http')) {
      domain = `https://${domain}`;
    }

    if (!domain.endsWith('/')) {
      domain += '/';
    }

    if (visited.has(domain)) {
      return '';
    }

    visited.add(domain);

    const { data: html, status } = await axios.get(domain, { timeout: 10000 });
    if (status !== 200) {
      console.log(`Request error for ${domain}: Status ${status}`);
      return '';
    }

    const $ = cheerio.load(html);
    const info: string[] = [];

    const title = $('title').text().trim();
    if (title) {
      info.push(`Page title: ${title}`);
    } else {
      console.log(`No title found for ${domain}`);
    }

    const forms = $('form');
    if (forms.length) {
      info.push(`Number of forms found: ${forms.length}`);
      forms.each((i, form) => {
        const inputs = $(form).find('input, textarea, select');
        const fieldNames: string[] = [];

        inputs.each((_, el) => {
          const name = $(el).attr('name') || $(el).attr('id') || '';
          const placeholder = $(el).attr('placeholder') || '';
          const type = $(el).attr('type') || '';
          if (name || placeholder || type) {
            fieldNames.push(`Name/ID: ${name || placeholder}, Type: ${type}`);
          }
        });

        if (fieldNames.length > 0) {
          info.push(`Form ${i + 1} fields: ${fieldNames.join(', ')}`);
        }
      });
    }

    const emails = [];
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})/g;
    const emailMatches = html.match(emailRegex);
    if (emailMatches) {
      emails.push(...emailMatches);
    }
    if (emails.length) {
      info.push(`Emails found: ${emails.join(', ')}`);
    }

    const scripts = $('script[src]');
    const trackers = scripts
      .map((_, el) => $(el).attr('src'))
      .get()
      .filter(
        (src) =>
          src &&
          (src.includes('google-analytics') ||
            src.includes('gtag') ||
            src.includes('facebook') ||
            src.includes('hotjar') ||
            src.includes('pixel'))
      );

    if (trackers.length) {
      info.push(`Tracking scripts detected: ${trackers.join(', ')}`);
    }

    const links = $('a')
      .map((_, el) => {
        const href = $(el).attr('href') || '';
        const text = $(el).text().toLowerCase();
        return { href, text };
      })
      .get()
      .filter(
        ({ href, text }) =>
          text.includes('privacy') ||
          text.includes('cookies') ||
          href.includes('privacy') ||
          href.includes('cookies')
      );

    if (links.length) {
      info.push(
        `Links found for policies: ${links.map((l) => l.href).join(', ')}`
      );
      for (const { href } of links) {
        let fullUrl = href.startsWith('http')
          ? href
          : url.resolve(domain, href);
        console.log(`Accessing policy link: ${fullUrl}`);
        const result = await crawlSite(fullUrl, visited); // Access and scrape policy pages
        if (result) {
          info.push(`Information from ${fullUrl}: \n${result}`);
        }
      }
    }

    const internalLinks = $('a')
      .map((_, el) => $(el).attr('href'))
      .get()
      .filter(
        (href) => (href && href.startsWith('/')) || href.startsWith(domain)
      );

    console.log(`Internal links found: ${internalLinks.length}`);
    for (const link of internalLinks) {
      let fullUrl = link.startsWith('/') ? url.resolve(domain, link) : link;
      console.log(`Following link: ${fullUrl}`);
      const result = await crawlSite(fullUrl, visited);
      if (result) {
        info.push(`Information from ${fullUrl}: \n${result}`);
      }
    }

    return info.join('\n\n');
  } catch (error) {
    console.error('Error while crawling:', error);
    return 'Could not extract information from the site.';
  }
}

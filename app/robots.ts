import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Bytespider', 'Google-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://vaavedigital.com/sitemap.xml',
  };
}

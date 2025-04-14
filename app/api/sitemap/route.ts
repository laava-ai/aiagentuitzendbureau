import { blogPosts } from '@/lib/blog-data';
import { NextResponse } from 'next/server';

export async function GET() {
  // Define base URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://laava.nl';

  // Define main pages with their last modification date and priority
  const mainPages = [
    { url: '/', lastmod: '2023-10-01T10:00:00+00:00', priority: '1.00', changefreq: 'weekly' },
    { url: '/services', lastmod: '2023-09-15T08:00:00+00:00', priority: '0.90', changefreq: 'monthly' },
    { url: '/about', lastmod: '2023-09-10T14:00:00+00:00', priority: '0.80', changefreq: 'monthly' },
    { url: '/company', lastmod: '2023-09-10T14:00:00+00:00', priority: '0.80', changefreq: 'monthly' },
    { url: '/blog', lastmod: '2023-09-28T16:00:00+00:00', priority: '0.85', changefreq: 'weekly' },
    { url: '/contact', lastmod: '2023-09-05T09:00:00+00:00', priority: '0.70', changefreq: 'monthly' },
    { url: '/privacy-policy', lastmod: '2023-08-01T12:00:00+00:00', priority: '0.30', changefreq: 'yearly' },
    { url: '/terms-of-service', lastmod: '2023-08-01T12:00:00+00:00', priority: '0.30', changefreq: 'yearly' },
    { url: '/cookie-policy', lastmod: '2023-08-01T12:00:00+00:00', priority: '0.30', changefreq: 'yearly' },
  ];

  // Generate XML for main pages
  const mainPagesXml = mainPages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <priority>${page.priority}</priority>
    <changefreq>${page.changefreq}</changefreq>
  </url>`
    )
    .join('\n');

  // Generate XML for blog posts
  const blogPostsXml = blogPosts
    .map(
      (post) => `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}T12:00:00+00:00</lastmod>
    <priority>0.75</priority>
    <changefreq>yearly</changefreq>
  </url>`
    )
    .join('\n');

  // Combine all URLs
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${mainPagesXml}
${blogPostsXml}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
} 
import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
  noindex?: boolean;
}

const SITE_NAME = 'BRDM Public School Kaithal, Haryana';
const DEFAULT_IMAGE = '/school-bg.webp';
const SITE_URL = 'https://brdmpublicschool.in';

export function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  noindex = false,
}: SEOData) {
  const fullTitle = title.includes('| BRDM')
    ? title
    : `${title} | ${SITE_NAME}`;

  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const image = ogImage ? `${SITE_URL}${ogImage}` : `${SITE_URL}${DEFAULT_IMAGE}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    if (keywords) setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:site_name', SITE_NAME);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    const existingScript = document.getElementById('seo-jsonld');
    if (existingScript) existingScript.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const script = document.getElementById('seo-jsonld');
      if (script) script.remove();
    };
  }, [fullTitle, description, keywords, url, image, ogType, jsonLd, noindex]);

  return null;
}

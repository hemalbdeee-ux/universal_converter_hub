import { supabase } from '../lib/supabase';

// SEO utilities for dynamic meta management
export const generateMetaTitle = (basePage = 'ConvertAnything.com', category = '', converter = '') => {
  const parts = [];
  
  if (converter) {
    parts?.push(`${converter} Converter`);
  }
  
  if (category && category !== converter) {
    parts?.push(`${category} Tools`);
  }
  
  parts?.push(basePage);
  
  const title = parts?.join(' - ');
  
  // Ensure title is within optimal length
  return title?.length > 60 ? title?.substring(0, 57) + '...' : title;
};

export const generateMetaDescription = (converter = '', category = '', features = []) => {
  const base = 'Professional-grade unit conversion tools';
  const parts = [base];
  
  if (converter) {
    parts?.push(`Convert ${converter?.toLowerCase()} with scientific accuracy`);
  }
  
  if (category) {
    parts?.push(`${category} conversion tools`);
  }
  
  if (features?.length > 0) {
    parts?.push(features?.slice(0, 3)?.join(', '));
  }
  
  parts?.push('Free, fast, and accurate conversions');
  
  const description = parts?.join('. ') + '.';
  
  // Ensure description is within optimal length
  return description?.length > 160 ? description?.substring(0, 157) + '...' : description;
};

export const generateKeywords = (converter = '', category = '', additional = []) => {
  const baseKeywords = [
    'unit converter',
    'measurement converter',
    'online calculator',
    'convertanything'
  ];
  
  if (converter) {
    baseKeywords?.push(`${converter?.toLowerCase()} converter`);
    baseKeywords?.push(`convert ${converter?.toLowerCase()}`);
  }
  
  if (category) {
    baseKeywords?.push(`${category?.toLowerCase()} converter`);
  }
  
  // Add specific additional keywords
  baseKeywords?.push(...additional);
  
  return [...new Set(baseKeywords)]?.join(', ');
};

export const generateStructuredData = (pageType = 'WebPage', data = {}) => {
  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://convertanything.com';
  
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': pageType,
    'url': data?.url || siteUrl,
    'name': data?.title || 'ConvertAnything.com',
    'description': data?.description || 'Professional-grade unit conversion tools',
    'inLanguage': 'en-US',
    'isAccessibleForFree': true,
    'publisher': {
      '@type': 'Organization',
      'name': 'ConvertAnything.com',
      'url': siteUrl,
      'logo': `${siteUrl}/favicon.ico`
    }
  };

  // Add specific schema based on page type
  switch (pageType) {
    case 'SoftwareApplication':
      return {
        ...baseStructure,
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Web Browser',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'featureList': data?.features || [
          'Unit conversion',
          'Real-time calculations',
          'Multiple formats support',
          'Mobile responsive'
        ]
      };
    
    case 'HowTo':
      return {
        ...baseStructure,
        'totalTime': data?.duration || 'PT5M',
        'supply': data?.supplies || [],
        'tool': data?.tools || [],
        'step': data?.steps?.map((step, index) => ({
          '@type': 'HowToStep',
          'position': index + 1,
          'name': step?.title,
          'text': step?.description
        })) || []
      };
    
    case 'WebSite':
      return {
        ...baseStructure,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${siteUrl}/search-results-hub-ai-powered-conversion-discovery?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      };
    
    default:
      return baseStructure;
  }
};

// Dynamic sitemap generation based on database content
export const generateSitemapUrls = async () => {
  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://convertanything.com';
  const urls = [];
  
  // Static pages with high priority
  const staticPages = [
    {
      url: siteUrl,
      priority: '1.0',
      changefreq: 'daily',
      lastmod: new Date()?.toISOString()?.split('T')?.[0]
    },
    {
      url: `${siteUrl}/individual-converter-focused-conversion-experience`,
      priority: '1.0',
      changefreq: 'daily',
      lastmod: new Date()?.toISOString()?.split('T')?.[0]
    },
    {
      url: `${siteUrl}/search-results-hub-ai-powered-conversion-discovery`,
      priority: '0.9',
      changefreq: 'daily',
      lastmod: new Date()?.toISOString()?.split('T')?.[0]
    }
  ];
  
  urls?.push(...staticPages);

  try {
    // Fetch converters from database
    const { data: converters, error } = await supabase?.from('converters')?.select('id, name, slug, updated_at')?.eq('status', 'published');

    if (!error && converters) {
      converters?.forEach(converter => {
        urls?.push({
          url: `${siteUrl}/converter/${converter?.slug}`,
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: new Date(converter?.updated_at)?.toISOString()?.split('T')?.[0]
        });
      });
    }

    // Fetch categories from database
    const { data: categories, error: catError } = await supabase?.from('converter_categories')?.select('id, name, slug, updated_at');

    if (!catError && categories) {
      categories?.forEach(category => {
        urls?.push({
          url: `${siteUrl}/category/${category?.slug}`,
          priority: '0.7',
          changefreq: 'weekly',
          lastmod: new Date(category?.updated_at)?.toISOString()?.split('T')?.[0]
        });
      });
    }

  } catch (error) {
    console.error('Error generating sitemap URLs:', error);
  }

  return urls;
};

// Update sitemap XML file
export const updateSitemapXML = async () => {
  const urls = await generateSitemapUrls();
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n\n';

  urls?.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url?.url}</loc>\n`;
    xml += `    <lastmod>${url?.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url?.changefreq}</changefreq>\n`;
    xml += `    <priority>${url?.priority}</priority>\n`;
    xml += '  </url>\n\n';
  });

  xml += '</urlset>';
  
  return xml;
};

// Fetch SEO settings from database
export const getSEOSettings = async (key = null) => {
  try {
    let query = supabase?.from('app_settings')?.select('key, value');
    
    if (key) {
      query = query?.eq('key', key)?.single();
    } else {
      query = query?.like('key', 'seo_%');
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return null;
  }
};

// Update SEO settings in database
export const updateSEOSettings = async (key, value) => {
  try {
    const { data, error } = await supabase?.from('app_settings')?.upsert({
        key,
        value,
        updated_at: new Date()?.toISOString()
      });
    
    if (error) throw error;
    
    return data;
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    throw error;
  }
};

// Get canonical URL for current page
export const getCanonicalUrl = (path = '') => {
  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://convertanything.com';
  const cleanPath = path?.startsWith('/') ? path : `/${path}`;
  
  return `${siteUrl}${cleanPath}`;
};

// Generate robots.txt content dynamically
export const generateRobotsTxt = (customRules = {}) => {
  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://convertanything.com';
  
  const defaultRules = {
    userAgent: '*',
    allow: ['/assets/', '/*.css$', '/*.js$', '/sitemap.xml'],
    disallow: ['/admin/', '/auth/', '/api/', '/*.json$', '/*?*', '/search?*'],
    crawlDelay: 1
  };
  
  const rules = { ...defaultRules, ...customRules };
  
  let robotsTxt = `# robots.txt for ${siteUrl} - Production Ready\n`;
  robotsTxt += '# https://www.robotstxt.org/robotstxt.html\n\n';
  robotsTxt += `User-agent: ${rules?.userAgent}\n`;
  
  rules?.allow?.forEach(path => {
    robotsTxt += `Allow: ${path}\n`;
  });
  
  rules?.disallow?.forEach(path => {
    robotsTxt += `Disallow: ${path}\n`;
  });
  
  if (rules?.crawlDelay) {
    robotsTxt += `Crawl-delay: ${rules?.crawlDelay}\n`;
  }
  
  robotsTxt += `\nSitemap: ${siteUrl}/sitemap.xml\n`;
  
  return robotsTxt;
};

export default {
  generateMetaTitle,
  generateMetaDescription,
  generateKeywords,
  generateStructuredData,
  generateSitemapUrls,
  updateSitemapXML,
  getSEOSettings,
  updateSEOSettings,
  getCanonicalUrl,
  generateRobotsTxt
};
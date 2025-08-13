import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const SEOHead = ({ 
  title = 'ConvertAnything.com - Professional Unit Converter & Measurement Tools',
  description = 'Professional-grade unit conversion tools for length, weight, temperature, volume and more. Fast, accurate conversions with educational resources. Free online converter hub.',
  keywords = 'unit converter, measurement converter, length converter, weight converter, temperature converter, volume converter, area converter, speed converter, online calculator, metric conversion, imperial conversion, convertanything',
  canonicalUrl,
  structuredData,
  ogImage = '/assets/images/og-image.jpg',
  ogType = 'website',
  author = 'ConvertAnything.com',
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
  nofollow = false
}) => {
  const location = useLocation();
  const siteUrl = import.meta.env?.VITE_SITE_URL || 'https://convertanything.com';
  const currentUrl = `${siteUrl}${location.pathname}`;
  const finalCanonicalUrl = canonicalUrl || currentUrl;
  
  // Generate robots content
  const robotsContent = (() => {
    const robots = [];
    if (noindex) robots?.push('noindex');
    else robots?.push('index');
    
    if (nofollow) robots?.push('nofollow');
    else robots?.push('follow');
    
    robots?.push('max-snippet:-1', 'max-image-preview:large', 'max-video-preview:-1');
    return robots?.join(', ');
  })();

  // Default structured data with enhanced schema
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": currentUrl,
    "mainEntity": {
      "@type": "WebSite",
      "name": "ConvertAnything.com",
      "description": description,
      "url": siteUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search-results-hub-ai-powered-conversion-discovery?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "ConvertAnything.com",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/favicon.ico`
      }
    },
    "datePublished": publishedTime || "2025-01-01T00:00:00Z",
    "dateModified": modifiedTime || new Date()?.toISOString(),
    "inLanguage": "en-US"
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  // Generate additional meta tags based on page type
  const getPageSpecificMeta = () => {
    const path = location.pathname;
    
    if (path?.includes('converter') || path === '/') {
      return (
        <>
          <meta name="category" content="Tools" />
          <meta name="coverage" content="Worldwide" />
          <meta name="target" content="all" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
        </>
      );
    }
    
    if (path?.includes('knowledge')) {
      return (
        <>
          <meta name="category" content="Education" />
          <meta name="target" content="all" />
        </>
      );
    }
    
    return null;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Author and Publication */}
      <meta name="author" content={author} />
      <meta name="publisher" content="ConvertAnything.com" />
      <meta name="copyright" content="© 2025 ConvertAnything.com" />
      
      {/* Language and Location */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      <meta name="geo.country" content="US" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="1 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Alternate URLs */}
      <link rel="alternate" hrefLang="en" href={finalCanonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={finalCanonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="ConvertAnything.com" />
      <meta property="og:locale" content="en_US" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@convertanything" />
      <meta name="twitter:creator" content="@convertanything" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content="convertanything.com" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ConvertAnything" />
      <meta name="application-name" content="ConvertAnything" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      
      {/* Page-specific meta tags */}
      {getPageSpecificMeta()}
      
      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
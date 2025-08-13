import React from 'react';
import { Helmet } from 'react-helmet';

const StructuredData = ({ data }) => {
  if (!data) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  );
};

// Common structured data schemas
export const createWebsiteSchema = (siteUrl, siteName, description) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteName,
  "description": description,
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
});

export const createOrganizationSchema = (siteUrl, organizationName) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": organizationName,
  "url": siteUrl,
  "logo": `${siteUrl}/favicon.ico`,
  "sameAs": []
});

export const createBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs?.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb?.name,
    "item": crumb?.url
  }))
});

export const createSoftwareApplicationSchema = (appName, description, siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": appName,
  "description": description,
  "url": siteUrl,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
});

export const createArticleSchema = (title, description, author, datePublished, dateModified, siteUrl, currentPath) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "author": {
    "@type": "Person",
    "name": author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Universal Converter Hub",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/favicon.ico`
    }
  },
  "datePublished": datePublished,
  "dateModified": dateModified,
  "url": `${siteUrl}${currentPath}`,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${siteUrl}${currentPath}`
  }
});

export default StructuredData;
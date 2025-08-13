import { useEffect, useState } from 'react';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import { supabase } from '../lib/supabase';

const ProductionRedirects = () => {
  const { trackEvent } = useGoogleAnalytics();
  const [redirectSettings, setRedirectSettings] = useState({
    redirectType: 'non-www-to-www', // 'non-www-to-www' or 'www-to-non-www'
    enableHttpsRedirect: true,
    enableCanonicalRedirect: true
  });

  useEffect(() => {
    // Fetch redirect settings from database
    const fetchRedirectSettings = async () => {
      try {
        const { data, error } = await supabase?.from('app_settings')?.select('key, value')?.in('key', ['redirect_type', 'enable_https_redirect', 'enable_canonical_redirect']);

        if (error) throw error;

        const settings = {};
        data?.forEach(setting => {
          if (setting?.key === 'redirect_type') {
            settings.redirectType = setting?.value?.type || 'non-www-to-www';
          } else if (setting?.key === 'enable_https_redirect') {
            settings.enableHttpsRedirect = setting?.value?.enabled !== false;
          } else if (setting?.key === 'enable_canonical_redirect') {
            settings.enableCanonicalRedirect = setting?.value?.enabled !== false;
          }
        });

        setRedirectSettings(prev => ({ ...prev, ...settings }));
      } catch (error) {
        console.error('Error fetching redirect settings:', error);
      }
    };

    fetchRedirectSettings();
  }, []);

  useEffect(() => {
    // Only run in production
    if (import.meta.env?.MODE !== 'production') return;

    let redirected = false;

    // HTTPS enforcement
    if (redirectSettings?.enableHttpsRedirect && 
        window.location?.protocol !== 'https:' && 
        !['localhost', '127.0.0.1']?.includes(window.location?.hostname) &&
        !window.location?.hostname?.includes('.local')) {
      
      const httpsUrl = `https:${window.location?.href?.substring(window.location?.protocol?.length)}`;
      
      // Track the redirect
      trackEvent('security_redirect', {
        event_category: 'Security',
        event_action: 'HTTP to HTTPS redirect',
        original_protocol: window.location?.protocol,
        redirect_url: httpsUrl
      });
      
      window.location?.replace(httpsUrl);
      redirected = true;
    }

    // WWW redirection based on admin settings
    if (!redirected && window.location?.hostname?.includes('convertanything.com')) {
      const hasWww = window.location?.hostname?.startsWith('www.');
      let shouldRedirect = false;
      let newUrl = '';

      if (redirectSettings?.redirectType === 'www-to-non-www' && hasWww) {
        newUrl = window.location?.href?.replace('://www.', '://');
        shouldRedirect = true;
      } else if (redirectSettings?.redirectType === 'non-www-to-www' && !hasWww) {
        newUrl = window.location?.href?.replace('://', '://www.');
        shouldRedirect = true;
      }

      if (shouldRedirect) {
        // Track the redirect
        trackEvent('seo_redirect', {
          event_category: 'SEO',
          event_action: `${redirectSettings?.redirectType} redirect`,
          original_hostname: window.location?.hostname,
          redirect_url: newUrl,
          redirect_type: redirectSettings?.redirectType
        });
        
        window.location?.replace(newUrl);
        redirected = true;
      }
    }

    // Canonical URL enforcement for common URL variations
    if (!redirected && redirectSettings?.enableCanonicalRedirect) {
      const currentPath = window.location?.pathname;
      const search = window.location?.search || '';
      let shouldRedirect = false;
      let newPath = currentPath;

      // Remove trailing slash except for root
      if (currentPath !== '/' && currentPath?.endsWith('/')) {
        newPath = currentPath?.slice(0, -1);
        shouldRedirect = true;
      }

      // Convert uppercase to lowercase
      if (currentPath !== currentPath?.toLowerCase()) {
        newPath = currentPath?.toLowerCase();
        shouldRedirect = true;
      }

      if (shouldRedirect) {
        const canonicalUrl = `${window.location?.protocol}//${window.location?.hostname}${newPath}${search}`;
        
        // Track canonical redirect
        trackEvent('canonical_redirect', {
          event_category: 'SEO',
          event_action: 'Canonical URL redirect',
          original_path: currentPath,
          canonical_path: newPath
        });
        
        window.location?.replace(canonicalUrl);
      }
    }
  }, [trackEvent, redirectSettings]);

  return null; // This component doesn't render anything
};

export default ProductionRedirects;
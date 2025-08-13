import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Only run in production
    if (import.meta.env?.MODE !== 'production') return;
    
    const measurementId = import.meta.env?.VITE_GA_MEASUREMENT_ID;
    if (!measurementId) {
      console.warn('Google Analytics Measurement ID not found');
      return;
    }

    // Initialize gtag.js if not already done
    if (!window.dataLayer) {
      // Load gtag.js script dynamically
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      document.head?.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(...args) {
        window.dataLayer?.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', measurementId, {
        cookie_domain: 'convertanything.com',
        cookie_flags: 'SameSite=Strict;Secure',
        send_page_view: false, // We handle page views manually
        allow_google_signals: true,
        allow_ad_personalization_signals: true,
        anonymize_ip: false, // GA4 anonymizes by default
        page_path: location.pathname + location.search,
        page_location: `https://convertanything.com${location.pathname}${location.search}`,
        custom_map: {
          'custom_parameter_1': 'conversion_type',
          'custom_parameter_2': 'user_engagement'
        }
      });
    }

    // Send page_view event on route changes
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: `https://convertanything.com${location.pathname}${location.search}`,
        page_title: document?.title || 'ConvertAnything.com',
        page_referrer: document?.referrer || '',
        content_group1: getContentGroup(location.pathname),
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  }, [location]);

  // Determine content group based on path
  const getContentGroup = (pathname) => {
    if (pathname === '/') return 'Homepage';
    if (pathname?.includes('converter')) return 'Converter Tools';
    if (pathname?.includes('knowledge')) return 'Educational Content';
    if (pathname?.includes('search')) return 'Search & Discovery';
    if (pathname?.includes('category')) return 'Category Pages';
    return 'Other Pages';
  };

  // Track custom events with enhanced parameters
  const trackEvent = (eventName, parameters = {}) => {
    if (import.meta.env?.MODE === 'production' && typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        ...parameters,
        page_path: window.location?.pathname,
        page_location: window.location?.href,
        domain: 'convertanything.com',
        timestamp: new Date()?.getTime(),
        user_agent: navigator?.userAgent,
        screen_resolution: `${screen?.width}x${screen?.height}`,
        viewport_size: `${window?.innerWidth}x${window?.innerHeight}`,
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  };

  // Track conversion events with enhanced data
  const trackConversion = (conversionType, fromUnit, toUnit, value = 1) => {
    if (import.meta.env?.MODE === 'production' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'conversion_performed', {
        event_category: 'Converter Usage',
        event_label: `${fromUnit} to ${toUnit}`,
        conversion_type: conversionType,
        from_unit: fromUnit,
        to_unit: toUnit,
        conversion_value: value,
        page_path: window.location?.pathname,
        domain: 'convertanything.com',
        timestamp: new Date()?.getTime(),
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });

      // Track as a custom conversion for goals
      window.gtag('event', 'generate_lead', {
        currency: 'USD',
        value: 0.1, // Assign small value for conversion tracking
        content_category: conversionType,
        content_id: `${fromUnit}_${toUnit}`,
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  };

  // Track user engagement with detailed metrics
  const trackEngagement = (engagementType, details = {}) => {
    if (import.meta.env?.MODE === 'production' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'engagement', {
        event_category: 'User Engagement',
        engagement_type: engagementType,
        ...details,
        page_path: window.location?.pathname,
        domain: 'convertanything.com',
        timestamp: new Date()?.getTime(),
        session_id: getSessionId(),
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  };

  // Track search events
  const trackSearch = (searchTerm, resultsCount = 0) => {
    if (import.meta.env?.MODE === 'production' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'search', {
        search_term: searchTerm,
        content_category: 'Site Search',
        results_count: resultsCount,
        page_path: window.location?.pathname,
        domain: 'convertanything.com',
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  };

  // Track AdSense interactions
  const trackAdSenseEvent = (eventType, adSlot = '') => {
    if (import.meta.env?.MODE === 'production' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'adsense_interaction', {
        event_category: 'AdSense',
        event_action: eventType,
        event_label: adSlot,
        page_path: window.location?.pathname,
        domain: 'convertanything.com',
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  };

  // Get or create session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('ga_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}_${Math.random()?.toString(36)?.substring(2)}`;
      sessionStorage.setItem('ga_session_id', sessionId);
    }
    return sessionId;
  };

  // Track errors
  const trackError = (error, errorInfo = {}) => {
    if (import.meta.env?.MODE === 'production' && typeof window.gtag !== 'undefined') {
      window.gtag('event', 'exception', {
        description: error?.message || 'Unknown error',
        fatal: false,
        error_category: errorInfo?.category || 'JavaScript Error',
        error_location: window.location?.pathname,
        ...errorInfo,
        send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
      });
    }
  };

  return { 
    trackEvent, 
    trackConversion, 
    trackEngagement, 
    trackSearch, 
    trackAdSenseEvent,
    trackError
  };
}

export default useGoogleAnalytics;
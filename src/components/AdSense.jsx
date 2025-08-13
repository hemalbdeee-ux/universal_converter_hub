import React, { useEffect, useState } from 'react';

const AdSense = ({ 
  adClient, 
  adSlot, 
  adFormat = "auto", 
  adLayout, 
  adStyle = {}, 
  slot = 'default',
  responsive = true,
  className = ""
}) => {
  const [adError, setAdError] = useState(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Only load ads in production with valid AdSense client
    if (import.meta.env?.MODE !== 'production' || !import.meta.env?.VITE_ADSENSE_CLIENT) {
      return;
    }

    const clientId = adClient || import.meta.env?.VITE_ADSENSE_CLIENT;
    
    if (!clientId) {
      console.warn('AdSense client ID not configured');
      return;
    }

    const loadAd = async () => {
      try {
        // Wait for AdSense script to load
        if (!window.adsbygoogle) {
          console.warn('AdSense script not loaded');
          return;
        }

        // Push the ad configuration
        (window.adsbygoogle = window.adsbygoogle || [])?.push({});
        setAdLoaded(true);

        // Track AdSense loading for analytics
        if (window.gtag) {
          window.gtag('event', 'adsense_load', {
            event_category: 'advertising',
            event_label: slot,
            ad_slot: adSlot,
            ad_format: adFormat,
            page_path: window.location?.pathname,
            send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
          });
        }

      } catch (error) {
        console.error('AdSense loading error:', error);
        setAdError(error?.message || 'Ad loading failed');

        // Track AdSense errors
        if (window.gtag) {
          window.gtag('event', 'adsense_error', {
            event_category: 'advertising',
            event_action: 'load_error',
            event_label: error?.message || 'Unknown error',
            ad_slot: adSlot,
            page_path: window.location?.pathname,
            send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
          });
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadAd, 100);
    
    return () => clearTimeout(timer);
  }, [adClient, adSlot, adFormat, slot]);

  // Handle ad visibility for tracking
  useEffect(() => {
    if (!adLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.gtag) {
            window.gtag('event', 'adsense_view', {
              event_category: 'advertising',
              event_action: 'ad_impression',
              event_label: slot,
              ad_slot: adSlot,
              page_path: window.location?.pathname,
              send_to: import.meta.env?.VITE_GA_MEASUREMENT_ID
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const adElement = document.querySelector(`[data-ad-slot="${adSlot}"]`);
    if (adElement) {
      observer?.observe(adElement);
    }

    return () => observer?.disconnect();
  }, [adLoaded, adSlot, slot]);

  // Don't render ads in development or if error occurred
  if (import.meta.env?.MODE !== 'production' || !import.meta.env?.VITE_ADSENSE_CLIENT) {
    return (
      <div className={`bg-gray-100 border border-gray-300 p-4 text-center text-sm text-gray-600 ${className}`}>
        {import.meta.env?.MODE !== 'production' ? 'Ad Placeholder (Dev Mode)' : 'Ad Not Available'}
      </div>
    );
  }

  if (adError) {
    return (
      <div className={`bg-red-50 border border-red-200 p-4 text-center text-sm text-red-600 ${className}`}>
        Ad failed to load
      </div>
    );
  }

  const defaultStyle = {
    display: 'block',
    ...adStyle
  };

  const clientId = adClient || import.meta.env?.VITE_ADSENSE_CLIENT;

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={defaultStyle}
        data-ad-client={clientId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
};

// Common AdSense slot configurations for ConvertAnything.com
export const AdSlots = {
  HEADER_BANNER: {
    adSlot: "1234567890", // Replace with actual slot ID
    adFormat: "auto",
    slot: "header_banner"
  },
  SIDEBAR: {
    adSlot: "1234567891", // Replace with actual slot ID
    adFormat: "auto",
    slot: "sidebar"
  },
  IN_CONTENT: {
    adSlot: "1234567892", // Replace with actual slot ID
    adFormat: "fluid",
    adLayout: "in-article",
    slot: "in_content"
  },
  FOOTER: {
    adSlot: "1234567893", // Replace with actual slot ID
    adFormat: "auto",
    slot: "footer"
  }
};

// Auto Ad component for automatic placement
export const AutoAds = () => {
  useEffect(() => {
    if (import.meta.env?.MODE === 'production' && import.meta.env?.VITE_ADSENSE_CLIENT) {
      (window.adsbygoogle = window.adsbygoogle || [])?.push({
        google_ad_client: import.meta.env?.VITE_ADSENSE_CLIENT,
        enable_page_level_ads: true,
        overlays: {bottom: true}
      });
    }
  }, []);

  return null;
};

export default AdSense;
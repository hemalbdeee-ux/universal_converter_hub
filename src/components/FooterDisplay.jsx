import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from './AppIcon';
import footerService from '../services/footerService';

const FooterDisplay = () => {
  const [footerData, setFooterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      const data = await footerService?.getPublicFooterData();
      setFooterData(data || []);
    } catch (error) {
      console.error('Error loading footer data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-pulse text-text-secondary">Loading...</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerData?.map((section) => (
            <div key={section?.id} className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">
                {section?.title}
              </h3>
              
              <ul className="space-y-2">
                {section?.links?.map((link) => (
                  <li key={link?.id}>
                    {link?.is_external ? (
                      <a
                        href={link?.url}
                        target={link?.target_type || '_self'}
                        rel={link?.target_type === '_blank' ? 'noopener noreferrer' : undefined}
                        className="text-text-secondary hover:text-primary transition-colors duration-200 text-sm flex items-center space-x-1"
                      >
                        <span>{link?.title}</span>
                        {link?.target_type === '_blank' && (
                          <Icon name="ExternalLink" size={12} />
                        )}
                      </a>
                    ) : (
                      <Link
                        to={link?.url}
                        className="text-text-secondary hover:text-primary transition-colors duration-200 text-sm"
                      >
                        {link?.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>Last updated: {new Date()?.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterDisplay;
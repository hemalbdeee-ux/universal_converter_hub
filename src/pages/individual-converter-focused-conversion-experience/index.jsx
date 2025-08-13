import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConversionCalculator from './components/ConversionCalculator';
import VisualScaleReference from './components/VisualScaleReference';
import ConversionAccuracy from './components/ConversionAccuracy';
import RelatedConversions from './components/RelatedConversions';
import EducationalContent from './components/EducationalContent';
import ConversionHistory from './components/ConversionHistory';
import BatchProcessor from './components/BatchProcessor';

const IndividualConverterPage = () => {
  const [searchParams] = useSearchParams();
  const [currentConversion, setCurrentConversion] = useState('feet-to-meters');
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('0.3048');
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock conversion data
  const conversions = {
    'feet-to-meters': {
      name: 'Feet to Meters',
      fromUnit: 'ft',
      toUnit: 'm',
      conversionRate: 0.3048,
      type: 'length',
      description: 'Convert feet to meters with precision',
      category: 'Length & Distance',
      accuracy: '99.99%',
      lastUpdated: 'Dec 7, 2025 2:50 PM'
    },
    'usd-to-eur': {
      name: 'USD to EUR',
      fromUnit: 'USD',
      toUnit: 'EUR',
      conversionRate: 0.9215,
      type: 'currency',
      description: 'Live USD to EUR exchange rates',
      category: 'Currency',
      accuracy: '99.95%',
      lastUpdated: 'Dec 7, 2025 2:50 PM'
    },
    'celsius-to-fahrenheit': {
      name: 'Celsius to Fahrenheit',
      fromUnit: 'C',
      toUnit: 'F',
      conversionRate: 1.8, // Special handling needed for temperature
      type: 'temperature',
      description: 'Temperature conversion with context',
      category: 'Temperature',
      accuracy: '100%',
      lastUpdated: 'Dec 7, 2025 2:50 PM'
    },
    'pounds-to-kilograms': {
      name: 'Pounds to Kilograms',
      fromUnit: 'lbs',
      toUnit: 'kg',
      conversionRate: 0.453592,
      type: 'weight',
      description: 'Weight conversion for health and fitness',
      category: 'Weight & Mass',
      accuracy: '99.99%',
      lastUpdated: 'Dec 7, 2025 2:50 PM'
    }
  };

  useEffect(() => {
    const type = searchParams?.get('type') || 'feet-to-meters';
    if (conversions?.[type]) {
      setCurrentConversion(type);
    }
  }, [searchParams]);

  const conversion = conversions?.[currentConversion];

  const handleConversion = (inputValue, outputValue) => {
    setFromValue(inputValue);
    setToValue(outputValue?.toString());
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    const url = `${window.location?.origin}/individual-converter-focused-conversion-experience?type=${currentConversion}`;
    navigator.clipboard?.writeText(url);
    setShowShareModal(false);
  };

  const breadcrumbs = [
    { label: 'Home', path: '/homepage-conversion-discovery-hub' },
    { label: 'Categories', path: '/category-landing-comprehensive-converter-collections' },
    { label: conversion?.category, path: '/category-landing-comprehensive-converter-collections' },
    { label: conversion?.name, path: '', current: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{conversion?.name} - Universal Converter Hub</title>
        <meta name="description" content={`${conversion?.description}. Accurate, real-time conversion with educational context and visual references.`} />
        <meta name="keywords" content={`${conversion?.fromUnit}, ${conversion?.toUnit}, conversion, calculator, ${conversion?.type}`} />
      </Helmet>
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <Icon name="ChevronRight" size={14} />}
                {crumb?.current ? (
                  <span className="text-text-primary font-medium">{crumb?.label}</span>
                ) : (
                  <Link 
                    to={crumb?.path} 
                    className="hover:text-text-primary transition-colors duration-200"
                  >
                    {crumb?.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-success rounded-xl flex items-center justify-center">
                  <Icon name="Calculator" size={24} color="white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">{conversion?.name}</h1>
                  <p className="text-text-secondary">{conversion?.description}</p>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {conversion?.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                  <Icon name="Shield" size={12} className="mr-1" />
                  {conversion?.accuracy} Accurate
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant={isFavorited ? "default" : "outline"}
                onClick={handleFavoriteToggle}
                iconName={isFavorited ? "Heart" : "Heart"}
                iconPosition="left"
                iconSize={16}
                className={isFavorited ? "text-red-500" : ""}
              >
                {isFavorited ? 'Favorited' : 'Add to Favorites'}
              </Button>
              <Button
                variant="outline"
                onClick={handleShare}
                iconName="Share"
                iconPosition="left"
                iconSize={16}
              >
                Share
              </Button>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Calculator & Visual Reference */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Calculator */}
              <ConversionCalculator
                conversionType={conversion?.type}
                fromUnit={conversion?.fromUnit}
                toUnit={conversion?.toUnit}
                conversionRate={conversion?.conversionRate}
                onConvert={handleConversion}
              />

              {/* Visual Scale Reference */}
              <VisualScaleReference
                conversionType={conversion?.type}
                fromValue={fromValue}
                toValue={toValue}
                fromUnit={conversion?.fromUnit}
                toUnit={conversion?.toUnit}
              />

              {/* Batch Processor */}
              <BatchProcessor
                conversionType={conversion?.type}
                fromUnit={conversion?.fromUnit}
                toUnit={conversion?.toUnit}
                conversionRate={conversion?.conversionRate}
              />

              {/* Educational Content */}
              <EducationalContent
                conversionType={conversion?.type}
                fromUnit={conversion?.fromUnit}
                toUnit={conversion?.toUnit}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Conversion Accuracy */}
              <ConversionAccuracy
                conversionType={conversion?.type}
                accuracy={conversion?.accuracy}
                lastUpdated={conversion?.lastUpdated}
              />

              {/* Conversion History */}
              <ConversionHistory />

              {/* Related Conversions */}
              <RelatedConversions
                currentConversion={currentConversion}
                conversionType={conversion?.type}
              />

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-brand">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Usage Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Daily Conversions</span>
                    <span className="font-semibold text-primary">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Accuracy Rating</span>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5]?.map((star) => (
                          <Icon key={star} name="Star" size={12} className="text-accent fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-text-secondary ml-1">4.9</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Last Updated</span>
                    <span className="text-sm text-success">{conversion?.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-success/5 border border-primary/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Need More Conversion Tools?</h2>
            <p className="text-text-secondary mb-6">
              Explore our comprehensive collection of converters across all categories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                iconName="Grid3X3"
                iconPosition="left"
                iconSize={16}
                onClick={() => window.location.href = '/category-landing-comprehensive-converter-collections'}
              >
                Browse All Categories
              </Button>
              <Button
                variant="outline"
                iconName="Search"
                iconPosition="left"
                iconSize={16}
                onClick={() => window.location.href = '/search-results-hub-ai-powered-conversion-discovery'}
              >
                Search Converters
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-brand">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-brand-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Share Converter</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShareModal(false)}
                iconName="X"
                iconSize={16}
              />
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-surface rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-2">Share this converter:</p>
                <p className="font-medium text-text-primary">{conversion?.name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleCopyLink}
                  iconName="Link"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full"
                >
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  iconName="Share"
                  iconPosition="left"
                  iconSize={16}
                  className="w-full"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-text-secondary">
              © {new Date()?.getFullYear()} Universal Converter Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndividualConverterPage;
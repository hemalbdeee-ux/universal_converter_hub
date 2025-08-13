import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EducationalTooltipsSection = () => {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const educationalTips = [
    {
      id: 'precision',
      title: 'Precision Guarantee',
      content: `Our conversions use scientifically validated formulas with up to 15 decimal places of precision. \n\nEvery calculation is verified against international standards and updated regularly to maintain 99.9% accuracy.`,
      icon: 'Target',
      position: 'bottom-left',
      trigger: 'precision-badge',
      category: 'Accuracy'
    },
    {
      id: 'cultural-context',
      title: 'Cultural Context',
      content: `We understand that measurements vary by culture and region. \n\nFor example, the UK uses stones for body weight, while the US uses pounds, and most of the world uses kilograms. Our converters respect these cultural preferences.`,
      icon: 'Globe',
      position: 'top-center',
      trigger: 'cultural-indicator',
      category: 'Localization'
    },
    {
      id: 'real-time-data',
      title: 'Real-Time Updates',
      content: `Currency rates update every 60 seconds from multiple financial sources. \n\nWeather-related temperature conversions include current conditions and forecasts for contextual accuracy.`,
      icon: 'RefreshCw',
      position: 'top-right',
      trigger: 'live-data-badge',
      category: 'Data'
    },
    {
      id: 'keyboard-shortcuts',
      title: 'Keyboard Shortcuts',
      content: `Press ⌘/Ctrl + K from anywhere to open global search. \n\nUse Tab to navigate between input fields, and Enter to perform conversions instantly. Arrow keys navigate through suggestions.`,
      icon: 'Keyboard',
      position: 'center',
      trigger: 'search-shortcut',
      category: 'Productivity'
    },
    {
      id: 'batch-processing',
      title: 'Batch Conversions',
      content: `Convert multiple values at once using our batch processor. \n\nPerfect for professionals who need to convert entire datasets or lists of measurements quickly and accurately.`,
      icon: 'Layers',
      position: 'bottom-right',
      trigger: 'batch-feature',
      category: 'Advanced'
    }
  ];

  useEffect(() => {
    // Check if user is new (hasn't seen tooltips before)
    const hasSeenTooltips = localStorage.getItem('ucHub_hasSeenTooltips');
    if (!hasSeenTooltips) {
      setIsNewUser(true);
      
      // Show tooltips in sequence for new users
      const showTooltipsSequence = () => {
        setTimeout(() => {
          setActiveTooltip('precision');
          setTimeout(() => {
            setActiveTooltip('cultural-context');
            setTimeout(() => {
              setActiveTooltip('keyboard-shortcuts');
              setTimeout(() => {
                setActiveTooltip(null);
                localStorage.setItem('ucHub_hasSeenTooltips', 'true');
                setIsNewUser(false);
              }, 4000);
            }, 3000);
          }, 3000);
        }, 2000);
      };

      showTooltipsSequence();
    }
  }, []);

  const handleTooltipToggle = (tipId) => {
    setActiveTooltip(activeTooltip === tipId ? null : tipId);
  };

  const handleNextTip = () => {
    const nextIndex = (currentTipIndex + 1) % educationalTips?.length;
    setCurrentTipIndex(nextIndex);
    setActiveTooltip(educationalTips?.[nextIndex]?.id);
  };

  const handlePrevTip = () => {
    const prevIndex = currentTipIndex === 0 ? educationalTips?.length - 1 : currentTipIndex - 1;
    setCurrentTipIndex(prevIndex);
    setActiveTooltip(educationalTips?.[prevIndex]?.id);
  };

  const handleSkipTour = () => {
    setActiveTooltip(null);
    setIsNewUser(false);
    localStorage.setItem('ucHub_hasSeenTooltips', 'true');
  };

  return (
    <>
      {/* Educational Indicators */}
      <div className="fixed top-24 right-8 z-30 space-y-3">
        {/* Precision Badge */}
        <div
          id="precision-badge"
          className="cultural-indicator bg-success/10 border border-success/20 rounded-full px-3 py-2 cursor-pointer hover:bg-success/20 transition-colors duration-200"
          onClick={() => handleTooltipToggle('precision')}
        >
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={14} className="text-success" />
            <span className="text-xs font-medium text-success">99.9% Accurate</span>
          </div>
        </div>

        {/* Cultural Context Indicator */}
        <div
          id="cultural-indicator"
          className="cultural-indicator bg-primary/10 border border-primary/20 rounded-full px-3 py-2 cursor-pointer hover:bg-primary/20 transition-colors duration-200"
          onClick={() => handleTooltipToggle('cultural-context')}
        >
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">200+ Countries</span>
          </div>
        </div>

        {/* Live Data Badge */}
        <div
          id="live-data-badge"
          className="cultural-indicator bg-accent/10 border border-accent/20 rounded-full px-3 py-2 cursor-pointer hover:bg-accent/20 transition-colors duration-200"
          onClick={() => handleTooltipToggle('real-time-data')}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-accent">Live Data</span>
          </div>
        </div>
      </div>
      {/* Search Shortcut Indicator */}
      <div
        id="search-shortcut"
        className="fixed top-1/2 left-8 transform -translate-y-1/2 z-30 cultural-indicator bg-card border border-border rounded-lg p-3 cursor-pointer hover:shadow-brand transition-all duration-200"
        onClick={() => handleTooltipToggle('keyboard-shortcuts')}
      >
        <div className="flex items-center space-x-2">
          <Icon name="Keyboard" size={16} className="text-text-secondary" />
          <kbd className="px-2 py-1 text-xs font-mono bg-muted border border-border rounded text-text-secondary">
            ⌘K
          </kbd>
        </div>
      </div>
      {/* Batch Feature Indicator */}
      <div
        id="batch-feature"
        className="fixed bottom-24 right-8 z-30 cultural-indicator bg-card border border-border rounded-lg p-3 cursor-pointer hover:shadow-brand transition-all duration-200"
        onClick={() => handleTooltipToggle('batch-processing')}
      >
        <div className="flex items-center space-x-2">
          <Icon name="Layers" size={16} className="text-text-secondary" />
          <span className="text-xs font-medium text-text-secondary">Batch Convert</span>
        </div>
      </div>
      {/* Tooltip Overlay */}
      {activeTooltip && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {educationalTips?.filter(tip => tip?.id === activeTooltip)?.map(tip => (
              <div
                key={tip?.id}
                className={`
                  educational-tooltip visible absolute bg-card/95 backdrop-blur-brand border border-border rounded-xl p-6 shadow-brand-lg max-w-sm pointer-events-auto
                  ${tip?.position === 'top-center' ? 'top-32 left-1/2 transform -translate-x-1/2' : ''}
                  ${tip?.position === 'top-right' ? 'top-32 right-8' : ''}
                  ${tip?.position === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}
                  ${tip?.position === 'bottom-left' ? 'bottom-32 left-8' : ''}
                  ${tip?.position === 'bottom-right' ? 'bottom-32 right-8' : ''}
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={tip?.icon} size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm">{tip?.title}</h4>
                      <span className="text-xs text-text-secondary">{tip?.category}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveTooltip(null)}
                    iconName="X"
                    iconSize={14}
                    className="text-text-secondary hover:text-text-primary w-6 h-6"
                  />
                </div>

                {/* Content */}
                <div className="mb-4">
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                    {tip?.content}
                  </p>
                </div>

                {/* Actions */}
                {isNewUser && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePrevTip}
                        iconName="ChevronLeft"
                        iconSize={14}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextTip}
                        iconName="ChevronRight"
                        iconPosition="right"
                        iconSize={14}
                      >
                        Next
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSkipTour}
                    >
                      Skip Tour
                    </Button>
                  </div>
                )}

                {/* Progress Indicator for New Users */}
                {isNewUser && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-center space-x-1">
                      {educationalTips?.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            index === currentTipIndex ? 'bg-primary' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
      {/* Help Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleTooltipToggle('precision')}
        iconName="HelpCircle"
        iconSize={20}
        className="fixed bottom-8 left-8 z-30 shadow-brand-lg"
      />
    </>
  );
};

export default EducationalTooltipsSection;
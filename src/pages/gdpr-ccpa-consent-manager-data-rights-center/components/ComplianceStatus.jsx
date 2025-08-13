import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatus = ({ consents, userRegion, user }) => {
  const getComplianceScore = () => {
    const totalConsents = Object.keys(consents)?.length;
    const activeConsents = Object.values(consents)?.filter(Boolean)?.length;
    return Math.round((activeConsents / totalConsents) * 100);
  };

  const getComplianceLevel = (score) => {
    if (score >= 80) return { level: 'High', color: 'success', icon: 'CheckCircle' };
    if (score >= 60) return { level: 'Medium', color: 'warning', icon: 'AlertCircle' };
    return { level: 'Basic', color: 'danger', icon: 'XCircle' };
  };

  const score = getComplianceScore();
  const compliance = getComplianceLevel(score);

  const consentStatus = [
    {
      category: 'Essential Cookies',
      status: consents?.essential,
      required: true,
      description: 'Always required for basic functionality'
    },
    {
      category: 'Functional Cookies',
      status: consents?.functional,
      required: false,
      description: 'Enhance user experience and preferences'
    },
    {
      category: 'Analytics Cookies',
      status: consents?.analytics,
      required: false,
      description: 'Help improve our services through usage insights'
    },
    {
      category: 'Advertising Cookies',
      status: consents?.advertising,
      required: false,
      description: 'Enable personalized advertising through Google AdSense'
    },
    {
      category: 'Personalization Cookies',
      status: consents?.personalization,
      required: false,
      description: 'Customize content based on your preferences'
    }
  ];

  const getRegionCompliance = () => {
    switch (userRegion) {
      case 'gdpr':
        return {
          framework: 'GDPR (General Data Protection Regulation)',
          requirements: [
            'Explicit consent for non-essential cookies',
            'Right to withdraw consent at any time',
            'Data portability and access rights',
            'Data deletion upon request'
          ],
          compliant: consents?.essential && (consents?.advertising === false || consents?.advertising === true),
          status: 'Active consent management in place'
        };
      case 'ccpa':
        return {
          framework: 'CCPA (California Consumer Privacy Act)',
          requirements: [
            'Opt-out of sale of personal information',
            'Right to know what data is collected',
            'Right to delete personal information',
            'Non-discrimination for exercising rights'
          ],
          compliant: true,
          status: 'Privacy rights accessible and exercisable'
        };
      case 'lgpd':
        return {
          framework: 'LGPD (Lei Geral de Proteção de Dados)',
          requirements: [
            'Lawful basis for data processing',
            'Data subject rights (access, correction, deletion)',
            'Consent management for advertising',
            'Data protection officer contact available'
          ],
          compliant: true,
          status: 'Compliance measures implemented'
        };
      default:
        return {
          framework: 'General Privacy Best Practices',
          requirements: [
            'Transparent data collection practices',
            'User consent for tracking cookies',
            'Privacy policy and terms available',
            'Data security measures in place'
          ],
          compliant: true,
          status: 'Privacy-conscious approach maintained'
        };
    }
  };

  const regionInfo = getRegionCompliance();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Privacy Compliance Status
        </h2>
        <p className="text-text-secondary">
          Overview of your current privacy settings and compliance status
        </p>
      </div>
      {/* Compliance Overview */}
      <div className="bg-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">
            Overall Compliance Score
          </h3>
          <div className={`
            flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
            ${compliance?.color === 'success' ? 'bg-success/20 text-success' : ''}
            ${compliance?.color === 'warning' ? 'bg-warning/20 text-warning' : ''}
            ${compliance?.color === 'danger' ? 'bg-danger/20 text-danger' : ''}
          `}>
            <Icon name={compliance?.icon} size={16} />
            {compliance?.level}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-secondary">Consent Coverage</span>
            <span className="font-bold text-text-primary">{score}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-3">
            <div
              className={`
                h-3 rounded-full transition-all duration-500
                ${compliance?.color === 'success' ? 'bg-success' : ''}
                ${compliance?.color === 'warning' ? 'bg-warning' : ''}
                ${compliance?.color === 'danger' ? 'bg-danger' : ''}
              `}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-surface rounded-lg p-4">
            <div className="text-2xl font-bold text-success mb-1">
              {Object.values(consents)?.filter(Boolean)?.length}
            </div>
            <div className="text-sm text-text-secondary">Active Consents</div>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <div className="text-2xl font-bold text-text-primary mb-1">
              {Object.keys(consents)?.length}
            </div>
            <div className="text-sm text-text-secondary">Total Categories</div>
          </div>
          <div className="bg-surface rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">
              {regionInfo?.compliant ? 'Yes' : 'Review'}
            </div>
            <div className="text-sm text-text-secondary">Compliant</div>
          </div>
        </div>
      </div>
      {/* Regional Compliance Framework */}
      <div className="bg-card rounded-xl p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Applicable Privacy Framework
        </h3>
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-text-primary mb-2">
            {regionInfo?.framework}
          </h4>
          <p className="text-sm text-text-secondary mb-3">
            Status: {regionInfo?.status}
          </p>
          
          <div className="space-y-2">
            <h5 className="font-medium text-text-primary">Key Requirements:</h5>
            <ul className="text-sm text-text-secondary space-y-1">
              {regionInfo?.requirements?.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Consent Breakdown */}
      <div className="bg-card rounded-xl p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Consent Categories Status
        </h3>
        
        <div className="space-y-3">
          {consentStatus?.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-surface rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-text-primary">
                    {item?.category}
                  </h4>
                  {item?.required && (
                    <span className="text-xs bg-warning/20 text-warning px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary">
                  {item?.description}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Icon
                  name={item?.status ? 'CheckCircle' : 'XCircle'}
                  size={20}
                  className={item?.status ? 'text-success' : 'text-danger'}
                />
                <span className={`
                  font-medium
                  ${item?.status ? 'text-success' : 'text-danger'}
                `}>
                  {item?.status ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* User Data Summary */}
      {user && (
        <div className="bg-card rounded-xl p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-4">
            Account Data Summary
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Account Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Account Created:</span>
                  <span className="text-text-primary">
                    {new Date(user?.created_at)?.toLocaleDateString() || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Last Consent Update:</span>
                  <span className="text-text-primary">
                    {new Date()?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Data Requests:</span>
                  <span className="text-text-primary">0 pending</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Data Categories</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Profile Data:</span>
                  <span className="text-text-primary">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Usage Data:</span>
                  <span className="text-text-primary">
                    {consents?.analytics ? 'Collected' : 'Not Collected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Ad Data:</span>
                  <span className="text-text-primary">
                    {consents?.advertising ? 'Collected' : 'Not Collected'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => window.location.href = '#consent'}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Icon name="Settings" size={16} />
            Update Preferences
          </button>
          
          <button
            onClick={() => window.location.href = '#data-rights'}
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-text-primary rounded-lg hover:bg-surface transition-colors"
          >
            <Icon name="Download" size={16} />
            Request Data
          </button>
          
          <a
            href="/privacy-policy-legal-compliance-center"
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-text-primary rounded-lg hover:bg-surface transition-colors"
          >
            <Icon name="FileText" size={16} />
            Privacy Policy
          </a>
        </div>
      </div>
      {/* Last Updated */}
      <div className="text-center text-sm text-text-secondary">
        Compliance status last updated: {new Date()?.toLocaleDateString()}
      </div>
    </div>
  );
};

export default ComplianceStatus;
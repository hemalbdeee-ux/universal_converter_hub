import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceTracker = ({ documents }) => {
  const getComplianceRequirements = () => {
    return [
      {
        id: 'privacy_policy',
        title: 'Privacy Policy',
        description: 'Must include Google AdSense, DART cookies, and data processing information',
        required: true,
        adsenseSpecific: true,
        requirements: [
          'Google AdSense usage disclosure',
          'DART cookie information',
          'Third-party advertising partners',
          'Personalized ads opt-out links',
          'GDPR/CCPA compliance sections',
          'Contact information for privacy inquiries'
        ]
      },
      {
        id: 'terms_conditions',
        title: 'Terms & Conditions',
        description: 'Legal terms of service and website usage',
        required: true,
        adsenseSpecific: false,
        requirements: [
          'Service usage terms',
          'User responsibilities',
          'Limitation of liability',
          'Governing law',
          'Contact information'
        ]
      },
      {
        id: 'cookie_policy',
        title: 'Cookie Policy',
        description: 'Detailed information about cookie usage including AdSense cookies',
        required: true,
        adsenseSpecific: true,
        requirements: [
          'Essential cookies explanation',
          'Google AdSense cookies',
          'Analytics cookies (Google Analytics)',
          'User consent mechanisms',
          'Cookie management instructions'
        ]
      },
      {
        id: 'disclaimer',
        title: 'Disclaimer',
        description: 'Legal disclaimer and limitation of liability',
        required: true,
        adsenseSpecific: false,
        requirements: [
          'Accuracy disclaimer',
          'Limitation of liability',
          'External links disclaimer',
          'Professional advice disclaimer'
        ]
      },
      {
        id: 'affiliate_disclosure',
        title: 'Affiliate Disclosure',
        description: 'Disclosure of affiliate relationships and advertising',
        required: true,
        adsenseSpecific: true,
        requirements: [
          'Affiliate relationship disclosure',
          'Advertising compensation disclosure',
          'FTC compliance statement',
          'Amazon Associates disclosure (if applicable)'
        ]
      },
      {
        id: 'ads_txt',
        title: 'Ads.txt File',
        description: 'Publisher verification file served at domain root',
        required: true,
        adsenseSpecific: true,
        requirements: [
          'Google AdSense publisher ID',
          'Correct domain and relationship format',
          'File accessible at /ads.txt',
          'Updated certification authority ID'
        ]
      },
      {
        id: 'coppa_compliance',
        title: 'COPPA Compliance',
        description: 'Children\'s online privacy protection compliance',
        required: true,
        adsenseSpecific: true,
        requirements: [
          'Age restriction notice (13+)',
          'Child privacy protection statement',
          'Parent/guardian contact process',
          'Data collection from minors policy'
        ]
      }
    ];
  };

  const getDocumentStatus = (requirementId) => {
    const document = documents?.find(doc => doc?.document_type === requirementId);
    
    if (!document) {
      return { status: 'missing', score: 0, lastUpdated: null };
    }
    
    return {
      status: document?.status,
      score: document?.compliance_score || 0,
      lastUpdated: document?.last_updated
    };
  };

  const getOverallComplianceScore = () => {
    const requirements = getComplianceRequirements();
    let totalScore = 0;
    let documentCount = 0;
    
    requirements?.forEach(req => {
      const docStatus = getDocumentStatus(req?.id);
      if (docStatus?.status !== 'missing') {
        totalScore += docStatus?.score;
        documentCount++;
      }
    });
    
    return documentCount > 0 ? Math.round(totalScore / documentCount) : 0;
  };

  const getStatusIcon = (status, score) => {
    if (status === 'missing') return { icon: 'X', color: 'danger' };
    if (status === 'draft') return { icon: 'Edit', color: 'warning' };
    if (score >= 95) return { icon: 'CheckCircle', color: 'success' };
    if (score >= 85) return { icon: 'AlertTriangle', color: 'warning' };
    return { icon: 'XCircle', color: 'danger' };
  };

  const getAdSenseSpecificIssues = () => {
    const issues = [];
    const requirements = getComplianceRequirements();
    
    requirements?.forEach(req => {
      if (req?.adsenseSpecific) {
        const status = getDocumentStatus(req?.id);
        if (status?.status === 'missing') {
          issues?.push({
            type: 'missing',
            title: `Missing ${req?.title}`,
            description: `${req?.title} is required for AdSense compliance`,
            severity: 'high'
          });
        } else if (status?.score < 90) {
          issues?.push({
            type: 'incomplete',
            title: `${req?.title} needs improvement`,
            description: `Compliance score: ${status?.score}% (should be 90%+)`,
            severity: status?.score < 70 ? 'high' : 'medium'
          });
        }
      }
    });
    
    return issues;
  };

  const overallScore = getOverallComplianceScore();
  const adsenseIssues = getAdSenseSpecificIssues();
  const requirements = getComplianceRequirements();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Compliance Tracker
        </h2>
        <p className="text-text-secondary">
          Monitor compliance status and requirements for AdSense and legal obligations
        </p>
      </div>

      {/* Overall Score */}
      <div className="bg-card rounded-xl p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            Overall Compliance Score
          </h3>
          <div className={`
            text-6xl font-bold mb-2
            ${overallScore >= 95 ? 'text-success' : ''}
            ${overallScore >= 80 && overallScore < 95 ? 'text-warning' : ''}
            ${overallScore < 80 ? 'text-danger' : ''}
          `}>
            {overallScore}%
          </div>
          <p className="text-text-secondary">
            {overallScore >= 95 ? 'Excellent compliance' : ''}
            {overallScore >= 80 && overallScore < 95 ? 'Good compliance, some improvements needed' : ''}
            {overallScore < 80 ? 'Compliance issues need attention' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">
              {documents?.filter(doc => doc?.status === 'published')?.length}
            </div>
            <div className="text-sm text-text-secondary">Published Documents</div>
          </div>
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-warning mb-1">
              {documents?.filter(doc => doc?.status === 'draft')?.length}
            </div>
            <div className="text-sm text-text-secondary">Draft Documents</div>
          </div>
          <div className="text-center p-4 bg-surface rounded-lg">
            <div className="text-2xl font-bold text-danger mb-1">
              {requirements?.length - documents?.length}
            </div>
            <div className="text-sm text-text-secondary">Missing Documents</div>
          </div>
        </div>
      </div>

      {/* AdSense Issues */}
      {adsenseIssues?.length > 0 && (
        <div className="bg-card rounded-xl p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="Target" size={20} className="text-warning" />
            AdSense Compliance Issues
          </h3>
          
          <div className="space-y-3">
            {adsenseIssues?.map((issue, index) => (
              <div
                key={index}
                className={`
                  p-4 rounded-lg border-l-4
                  ${issue?.severity === 'high' ? 'bg-danger/10 border-danger' : ''}
                  ${issue?.severity === 'medium' ? 'bg-warning/10 border-warning' : ''}
                  ${issue?.severity === 'low' ? 'bg-primary/10 border-primary' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <Icon 
                    name={issue?.severity === 'high' ? 'AlertTriangle' : 'Info'} 
                    size={20} 
                    className={`
                      mt-0.5
                      ${issue?.severity === 'high' ? 'text-danger' : ''}
                      ${issue?.severity === 'medium' ? 'text-warning' : ''}
                      ${issue?.severity === 'low' ? 'text-primary' : ''}
                    `}
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {issue?.title}
                    </h4>
                    <p className="text-text-secondary text-sm">
                      {issue?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Requirements */}
      <div className="bg-card rounded-xl p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-6">
          Compliance Requirements Checklist
        </h3>
        
        <div className="space-y-4">
          {requirements?.map((requirement) => {
            const status = getDocumentStatus(requirement?.id);
            const statusInfo = getStatusIcon(status?.status, status?.score);
            
            return (
              <div
                key={requirement?.id}
                className="border border-border rounded-lg p-4 hover:border-border-hover transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                    ${statusInfo?.color === 'success' ? 'bg-success/20 text-success' : ''}
                    ${statusInfo?.color === 'warning' ? 'bg-warning/20 text-warning' : ''}
                    ${statusInfo?.color === 'danger' ? 'bg-danger/20 text-danger' : ''}
                  `}>
                    <Icon name={statusInfo?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-text-primary">
                        {requirement?.title}
                        {requirement?.adsenseSpecific && (
                          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                            AdSense Required
                          </span>
                        )}
                      </h4>
                      
                      <div className="text-right">
                        <div className="font-medium text-text-primary">
                          {status?.status === 'missing' ? 'Missing' : `${status?.score}%`}
                        </div>
                        {status?.lastUpdated && (
                          <div className="text-xs text-text-secondary">
                            {new Date(status?.lastUpdated)?.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-text-secondary mb-3">
                      {requirement?.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-text-primary text-sm">
                        Requirements:
                      </h5>
                      <ul className="text-sm text-text-secondary space-y-1">
                        {requirement?.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-surface rounded-xl p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Recommended Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
              <Icon name="Clock" size={16} className="text-warning" />
              Immediate Actions
            </h4>
            <ul className="text-sm text-text-secondary space-y-1">
              {adsenseIssues?.filter(issue => issue?.severity === 'high')?.length > 0 ? (
                adsenseIssues
                  ?.filter(issue => issue?.severity === 'high')
                  ?.map((issue, index) => (
                    <li key={index}>• {issue?.title}</li>
                  ))
              ) : (
                <li>• No immediate actions required</li>
              )}
            </ul>
          </div>
          
          <div className="bg-card rounded-lg p-4">
            <h4 className="font-semibold text-text-primary mb-2 flex items-center gap-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              Improvements
            </h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Review documents with scores below 95%</li>
              <li>• Update last modified timestamps</li>
              <li>• Verify external links functionality</li>
              <li>• Check GDPR/CCPA compliance updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTracker;
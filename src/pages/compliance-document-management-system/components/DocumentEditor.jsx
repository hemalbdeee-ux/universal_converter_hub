import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DocumentEditor = ({ document, onSave, onPublish, onBack }) => {
  const [content, setContent] = useState(document?.content || '');
  const [title, setTitle] = useState(document?.title || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setContent(document?.content || '');
    setTitle(document?.title || '');
    setHasChanges(false);
  }, [document]);

  const handleContentChange = (value) => {
    setContent(value);
    setHasChanges(true);
  };

  const handleTitleChange = (value) => {
    setTitle(value);
    setHasChanges(true);
  };

  const handleSave = async (status = 'draft') => {
    setIsSaving(true);
    try {
      await onSave(document?.id, content, status);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save document:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    await handleSave('published');
    await onPublish(document?.id);
  };

  const insertTemplate = (templateType) => {
    const templates = {
      adsense_clause: `
<h3>Google AdSense</h3>
<p>This website uses Google AdSense, a web advertising service provided by Google Inc. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</p>

<p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank">Google Ads Settings</a> or by visiting the Network Advertising Initiative opt-out page at <a href="https://www.networkadvertising.org/choices/" target="_blank">www.networkadvertising.org/choices/</a>.</p>
      `?.trim(),
      
      dart_cookies: `
<h3>DART Cookie</h3>
<p>Google, as a third party vendor, uses cookies to serve ads on this website. Google's use of the DART cookie enables it to serve ads based on your visit to this website and other sites on the Internet. You may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at <a href="https://policies.google.com/privacy" target="_blank">https://policies.google.com/privacy</a>.</p>
      `?.trim(),
      
      coppa_notice: `
<h3>Children's Privacy (COPPA)</h3>
<p>This website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information. If you are a parent or guardian and become aware that your child has provided us with personal information, please contact us.</p>
      `?.trim(),
      
      contact_info: `
<h3>Contact Information</h3>
<p>If you have any questions about this policy, please contact us:</p>
<ul>
  <li>Email: [BUSINESS_EMAIL]</li>
  <li>Address: [BUSINESS_ADDRESS]</li>
  <li>Privacy Officer: [PRIVACY_EMAIL]</li>
</ul>
      `?.trim(),

      gdpr_rights: `
<h3>Your Rights Under GDPR</h3>
<p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights including:</p>
<ul>
  <li><strong>Right to Access:</strong> You can request copies of your personal data.</li>
  <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data.</li>
  <li><strong>Right to Erasure:</strong> You can request deletion of your personal data.</li>
  <li><strong>Right to Data Portability:</strong> You can request transfer of your data.</li>
  <li><strong>Right to Object:</strong> You can object to processing of your personal data.</li>
</ul>
<p>To exercise these rights, please contact our privacy officer at [PRIVACY_EMAIL].</p>
      `?.trim(),

      ccpa_rights: `
<h3>California Consumer Privacy Act (CCPA)</h3>
<p>California residents have specific rights regarding their personal information:</p>
<ul>
  <li><strong>Right to Know:</strong> You can request information about what personal data we collect.</li>
  <li><strong>Right to Delete:</strong> You can request deletion of your personal data.</li>
  <li><strong>Right to Opt-Out:</strong> You can opt-out of the sale of your personal information.</li>
  <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your rights.</li>
</ul>
<p>To submit a request, visit our <a href="/gdpr-ccpa-consent-manager-data-rights-center">Data Rights Center</a> or email [PRIVACY_EMAIL].</p>
      `?.trim()
    };

    const template = templates?.[templateType];
    if (template) {
      const textarea = document?.getElementById('content-editor');
      const startPos = textarea?.selectionStart;
      const endPos = textarea?.selectionEnd;
      const newContent = content?.substring(0, startPos) + '\n\n' + template + '\n\n' + content?.substring(endPos);
      setContent(newContent);
      setHasChanges(true);
    }
  };

  const getDocumentTypeTemplates = () => {
    const templates = {
      privacy_policy: [
        { id: 'adsense_clause', name: 'AdSense Clause', icon: 'Target' },
        { id: 'dart_cookies', name: 'DART Cookies', icon: 'Cookie' },
        { id: 'gdpr_rights', name: 'GDPR Rights', icon: 'Shield' },
        { id: 'ccpa_rights', name: 'CCPA Rights', icon: 'Flag' },
        { id: 'coppa_notice', name: 'COPPA Notice', icon: 'Baby' },
        { id: 'contact_info', name: 'Contact Info', icon: 'Mail' }
      ],
      cookie_policy: [
        { id: 'adsense_clause', name: 'AdSense Cookies', icon: 'Target' },
        { id: 'dart_cookies', name: 'DART Cookie', icon: 'Cookie' },
        { id: 'contact_info', name: 'Contact Info', icon: 'Mail' }
      ],
      terms_conditions: [
        { id: 'coppa_notice', name: 'Age Restrictions', icon: 'Baby' },
        { id: 'contact_info', name: 'Contact Info', icon: 'Mail' }
      ]
    };

    return templates?.[document?.document_type] || [];
  };

  return (
    <div className="bg-card rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            size="sm"
            iconName="ArrowLeft"
          >
            Back to List
          </Button>
          
          <div>
            <h2 className="text-2xl font-bold text-text-primary">
              Edit {document?.title}
            </h2>
            <p className="text-sm text-text-secondary">
              Version {document?.version} • {document?.status}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            size="sm"
            iconName={showPreview ? 'Edit' : 'Eye'}
          >
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          
          <Button
            onClick={() => handleSave('draft')}
            variant="outline"
            size="sm"
            iconName="Save"
            disabled={!hasChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          
          <Button
            onClick={handlePublish}
            variant="default"
            size="sm"
            iconName="Upload"
            disabled={isSaving}
          >
            Publish
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Template Sidebar */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Quick Templates
          </h3>
          
          <div className="space-y-2">
            {getDocumentTypeTemplates()?.map((template) => (
              <button
                key={template?.id}
                onClick={() => insertTemplate(template?.id)}
                className="w-full flex items-center gap-3 p-3 bg-surface hover:bg-border rounded-lg transition-colors text-left"
              >
                <Icon name={template?.icon} size={16} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">
                  {template?.name}
                </span>
              </button>
            ))}
          </div>

          {/* Auto-update Notice */}
          <div className="mt-6 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="Zap" size={16} className="text-primary mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-text-primary">
                  Auto-Update
                </h4>
                <p className="text-xs text-text-secondary">
                  Last updated timestamp will be automatically added when published.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Editor/Preview */}
        <div className="lg:col-span-3">
          {/* Title Editor */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter document title..."
            />
          </div>

          {showPreview ? (
            /* Preview Mode */
            (<div className="border border-border rounded-lg p-6 bg-surface min-h-96">
              <h1 className="text-3xl font-bold text-text-primary mb-6">
                {title}
              </h1>
              <div 
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: content?.replace(/\[BUSINESS_EMAIL\]/g, 'contact@universalconverter.com')?.replace(/\[BUSINESS_ADDRESS\]/g, '123 Tech Street, Digital City, DC 12345')?.replace(/\[PRIVACY_EMAIL\]/g, 'privacy@universalconverter.com')?.replace(/\n/g, '<br>')
                }}
              />
              <div className="mt-8 pt-6 border-t border-border text-sm text-text-secondary">
                <p><strong>Last updated:</strong> {new Date()?.toLocaleDateString()}</p>
                <p><strong>Effective date:</strong> {new Date()?.toLocaleDateString()}</p>
              </div>
            </div>)
          ) : (
            /* Editor Mode */
            (<div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-text-primary">
                  Document Content
                </label>
                
                {hasChanges && (
                  <span className="text-xs text-warning flex items-center gap-1">
                    <Icon name="AlertCircle" size={12} />
                    Unsaved changes
                  </span>
                )}
              </div>
              <textarea
                id="content-editor"
                value={content}
                onChange={(e) => handleContentChange(e?.target?.value)}
                className="w-full h-96 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
                placeholder="Enter document content... You can use HTML tags for formatting."
              />
              <div className="text-xs text-text-secondary">
                <p>
                  <strong>Tip:</strong> Use placeholders like [BUSINESS_EMAIL], [BUSINESS_ADDRESS], and [PRIVACY_EMAIL] 
                  which will be automatically replaced with your business information.
                </p>
                <p className="mt-1">
                  <strong>HTML Supported:</strong> You can use HTML tags like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;, etc.
                </p>
              </div>
            </div>)
          )}
        </div>
      </div>
      {/* Footer Actions */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div className="text-sm text-text-secondary">
          {hasChanges ? 'You have unsaved changes' : 'All changes saved'}
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="outline"
            iconName="X"
          >
            Cancel
          </Button>
          
          <Button
            onClick={() => handleSave('draft')}
            variant="outline"
            iconName="Save"
            disabled={!hasChanges || isSaving}
          >
            Save Draft
          </Button>
          
          <Button
            onClick={handlePublish}
            variant="default"
            iconName="Upload"
            disabled={isSaving}
          >
            Save & Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
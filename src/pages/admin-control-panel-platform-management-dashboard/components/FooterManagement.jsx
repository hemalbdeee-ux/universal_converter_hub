import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import footerService from '../../../services/footerService';

const FooterManagement = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [footerPages, setFooterPages] = useState([]);
  const [footerLinks, setFooterLinks] = useState([]);
  const [footerSections, setFooterSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [pageForm, setPageForm] = useState({
    title: '',
    slug: '',
    content: '',
    meta_description: '',
    is_published: true,
    sort_order: 0
  });

  const [linkForm, setLinkForm] = useState({
    title: '',
    url: '',
    target_type: '_self',
    is_external: false,
    footer_page_id: null,
    sort_order: 0,
    is_active: true
  });

  const [sectionForm, setSectionForm] = useState({
    title: '',
    sort_order: 0,
    is_visible: true
  });

  useEffect(() => {
    loadFooterData();
  }, []);

  const loadFooterData = async () => {
    try {
      setLoading(true);
      const [pagesData, linksData, sectionsData] = await Promise.all([
        footerService?.getFooterPages(),
        footerService?.getFooterLinks(),
        footerService?.getFooterSections()
      ]);

      setFooterPages(pagesData || []);
      setFooterLinks(linksData || []);
      setFooterSections(sectionsData || []);
    } catch (err) {
      setError('Failed to load footer data: ' + err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    try {
      await footerService?.createFooterPage(pageForm);
      setShowModal(false);
      setPageForm({
        title: '',
        slug: '',
        content: '',
        meta_description: '',
        is_published: true,
        sort_order: 0
      });
      loadFooterData();
    } catch (err) {
      setError('Failed to create page: ' + err?.message);
    }
  };

  const handleUpdatePage = async () => {
    try {
      await footerService?.updateFooterPage(editingItem?.id, pageForm);
      setShowModal(false);
      setEditingItem(null);
      setPageForm({
        title: '',
        slug: '',
        content: '',
        meta_description: '',
        is_published: true,
        sort_order: 0
      });
      loadFooterData();
    } catch (err) {
      setError('Failed to update page: ' + err?.message);
    }
  };

  const handleDeletePage = async (id) => {
    if (!confirm('Are you sure you want to delete this footer page?')) return;
    
    try {
      await footerService?.deleteFooterPage(id);
      loadFooterData();
    } catch (err) {
      setError('Failed to delete page: ' + err?.message);
    }
  };

  const handleCreateLink = async () => {
    try {
      await footerService?.createFooterLink(linkForm);
      setShowModal(false);
      setLinkForm({
        title: '',
        url: '',
        target_type: '_self',
        is_external: false,
        footer_page_id: null,
        sort_order: 0,
        is_active: true
      });
      loadFooterData();
    } catch (err) {
      setError('Failed to create link: ' + err?.message);
    }
  };

  const handleUpdateLink = async () => {
    try {
      await footerService?.updateFooterLink(editingItem?.id, linkForm);
      setShowModal(false);
      setEditingItem(null);
      setLinkForm({
        title: '',
        url: '',
        target_type: '_self',
        is_external: false,
        footer_page_id: null,
        sort_order: 0,
        is_active: true
      });
      loadFooterData();
    } catch (err) {
      setError('Failed to update link: ' + err?.message);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!confirm('Are you sure you want to delete this footer link?')) return;
    
    try {
      await footerService?.deleteFooterLink(id);
      loadFooterData();
    } catch (err) {
      setError('Failed to delete link: ' + err?.message);
    }
  };

  const handleCreateSection = async () => {
    try {
      await footerService?.createFooterSection(sectionForm);
      setShowModal(false);
      setSectionForm({
        title: '',
        sort_order: 0,
        is_visible: true
      });
      loadFooterData();
    } catch (err) {
      setError('Failed to create section: ' + err?.message);
    }
  };

  const handleUpdateSection = async () => {
    try {
      await footerService?.updateFooterSection(editingItem?.id, sectionForm);
      setShowModal(false);
      setEditingItem(null);
      setSectionForm({
        title: '',
        sort_order: 0,
        is_visible: true
      });
      loadFooterData();
    } catch (err) {
      setError('Failed to update section: ' + err?.message);
    }
  };

  const handleDeleteSection = async (id) => {
    if (!confirm('Are you sure you want to delete this footer section?')) return;
    
    try {
      await footerService?.deleteFooterSection(id);
      loadFooterData();
    } catch (err) {
      setError('Failed to delete section: ' + err?.message);
    }
  };

  const openCreateModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);

    if (type === 'page') {
      setPageForm({
        title: item?.title || '',
        slug: item?.slug || '',
        content: item?.content || '',
        meta_description: item?.meta_description || '',
        is_published: item?.is_published ?? true,
        sort_order: item?.sort_order || 0
      });
    } else if (type === 'link') {
      setLinkForm({
        title: item?.title || '',
        url: item?.url || '',
        target_type: item?.target_type || '_self',
        is_external: item?.is_external ?? false,
        footer_page_id: item?.footer_page_id || null,
        sort_order: item?.sort_order || 0,
        is_active: item?.is_active ?? true
      });
    } else if (type === 'section') {
      setSectionForm({
        title: item?.title || '',
        sort_order: item?.sort_order || 0,
        is_visible: item?.is_visible ?? true
      });
    }

    setShowModal(true);
  };

  const tabs = [
    { id: 'pages', label: 'Footer Pages', icon: 'FileText' },
    { id: 'links', label: 'Footer Links', icon: 'Link' },
    { id: 'sections', label: 'Footer Sections', icon: 'Layout' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} />
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <Icon name="X" size={14} />
            </button>
          </div>
        </div>
      )}
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Footer Pages Tab */}
      {activeTab === 'pages' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-text-primary">Footer Pages</h3>
            <Button
              onClick={() => openCreateModal('page')}
              iconName="Plus"
              iconPosition="left"
              size="sm"
            >
              Create Page
            </Button>
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Slug
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Sort Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {footerPages?.map((page) => (
                    <tr key={page?.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-text-primary">{page?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">{page?.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          page?.is_published 
                            ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                        }`}>
                          {page?.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">{page?.sort_order}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal('page', page)}
                          iconName="Edit"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePage(page?.id)}
                          iconName="Trash2"
                          className="text-red-600 hover:text-red-800"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Footer Links Tab */}
      {activeTab === 'links' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-text-primary">Footer Links</h3>
            <Button
              onClick={() => openCreateModal('link')}
              iconName="Plus"
              iconPosition="left"
              size="sm"
            >
              Create Link
            </Button>
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {footerLinks?.map((link) => (
                    <tr key={link?.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-text-primary">{link?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">{link?.url}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          link?.is_external 
                            ? 'bg-blue-100 text-blue-800' :'bg-gray-100 text-gray-800'
                        }`}>
                          {link?.is_external ? 'External' : 'Internal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          link?.is_active 
                            ? 'bg-success/10 text-success' :'bg-red-100 text-red-800'
                        }`}>
                          {link?.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal('link', link)}
                          iconName="Edit"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLink(link?.id)}
                          iconName="Trash2"
                          className="text-red-600 hover:text-red-800"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Footer Sections Tab */}
      {activeTab === 'sections' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-text-primary">Footer Sections</h3>
            <Button
              onClick={() => openCreateModal('section')}
              iconName="Plus"
              iconPosition="left"
              size="sm"
            >
              Create Section
            </Button>
          </div>

          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Sort Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Links Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {footerSections?.map((section) => (
                    <tr key={section?.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-text-primary">{section?.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">{section?.sort_order}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          section?.is_visible 
                            ? 'bg-success/10 text-success' :'bg-red-100 text-red-800'
                        }`}>
                          {section?.is_visible ? 'Visible' : 'Hidden'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-text-secondary">
                          {section?.footer_section_links?.length || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal('section', section)}
                          iconName="Edit"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSection(section?.id)}
                          iconName="Trash2"
                          className="text-red-600 hover:text-red-800"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-card px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-text-primary mb-4">
                      {editingItem ? 'Edit' : 'Create'} {modalType === 'page' ? 'Footer Page' : modalType === 'link' ? 'Footer Link' : 'Footer Section'}
                    </h3>

                    {modalType === 'page' && (
                      <div className="space-y-4">
                        <Input
                          label="Page Title"
                          value={pageForm?.title}
                          onChange={(e) => setPageForm({...pageForm, title: e?.target?.value})}
                          placeholder="Enter page title"
                        />
                        <Input
                          label="URL Slug"
                          value={pageForm?.slug}
                          onChange={(e) => setPageForm({...pageForm, slug: e?.target?.value})}
                          placeholder="Enter URL slug"
                        />
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Content
                          </label>
                          <textarea
                            value={pageForm?.content}
                            onChange={(e) => setPageForm({...pageForm, content: e?.target?.value})}
                            placeholder="Enter page content"
                            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows={4}
                          />
                        </div>
                        <Input
                          label="Meta Description"
                          value={pageForm?.meta_description}
                          onChange={(e) => setPageForm({...pageForm, meta_description: e?.target?.value})}
                          placeholder="Enter meta description"
                        />
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={pageForm?.is_published}
                              onChange={(e) => setPageForm({...pageForm, is_published: e?.target?.checked})}
                              className="rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">Published</span>
                          </label>
                          <Input
                            label="Sort Order"
                            type="number"
                            value={pageForm?.sort_order}
                            onChange={(e) => setPageForm({...pageForm, sort_order: parseInt(e?.target?.value) || 0})}
                            className="w-24"
                          />
                        </div>
                      </div>
                    )}

                    {modalType === 'link' && (
                      <div className="space-y-4">
                        <Input
                          label="Link Title"
                          value={linkForm?.title}
                          onChange={(e) => setLinkForm({...linkForm, title: e?.target?.value})}
                          placeholder="Enter link title"
                        />
                        <Input
                          label="URL"
                          value={linkForm?.url}
                          onChange={(e) => setLinkForm({...linkForm, url: e?.target?.value})}
                          placeholder="Enter URL"
                        />
                        <Select
                          label="Target Type"
                          value={linkForm?.target_type}
                          onValueChange={(value) => setLinkForm({...linkForm, target_type: value})}
                          options={[
                            { value: '_self', label: 'Same Window' },
                            { value: '_blank', label: 'New Window' }
                          ]}
                        />
                        <Select
                          label="Linked Page"
                          value={linkForm?.footer_page_id || ''}
                          onValueChange={(value) => setLinkForm({...linkForm, footer_page_id: value || null})}
                          options={[
                            { value: '', label: 'No linked page' },
                            ...(footerPages?.map(page => ({
                              value: page?.id,
                              label: page?.title
                            })) || [])
                          ]}
                        />
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={linkForm?.is_external}
                              onChange={(e) => setLinkForm({...linkForm, is_external: e?.target?.checked})}
                              className="rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">External Link</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={linkForm?.is_active}
                              onChange={(e) => setLinkForm({...linkForm, is_active: e?.target?.checked})}
                              className="rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">Active</span>
                          </label>
                          <Input
                            label="Sort Order"
                            type="number"
                            value={linkForm?.sort_order}
                            onChange={(e) => setLinkForm({...linkForm, sort_order: parseInt(e?.target?.value) || 0})}
                            className="w-24"
                          />
                        </div>
                      </div>
                    )}

                    {modalType === 'section' && (
                      <div className="space-y-4">
                        <Input
                          label="Section Title"
                          value={sectionForm?.title}
                          onChange={(e) => setSectionForm({...sectionForm, title: e?.target?.value})}
                          placeholder="Enter section title"
                        />
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={sectionForm?.is_visible}
                              onChange={(e) => setSectionForm({...sectionForm, is_visible: e?.target?.checked})}
                              className="rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="ml-2 text-sm text-text-primary">Visible</span>
                          </label>
                          <Input
                            label="Sort Order"
                            type="number"
                            value={sectionForm?.sort_order}
                            onChange={(e) => setSectionForm({...sectionForm, sort_order: parseInt(e?.target?.value) || 0})}
                            className="w-24"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-surface px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  onClick={() => {
                    if (modalType === 'page') {
                      editingItem ? handleUpdatePage() : handleCreatePage();
                    } else if (modalType === 'link') {
                      editingItem ? handleUpdateLink() : handleCreateLink();
                    } else if (modalType === 'section') {
                      editingItem ? handleUpdateSection() : handleCreateSection();
                    }
                  }}
                  className="w-full sm:w-auto sm:ml-3"
                  size="sm"
                >
                  {editingItem ? 'Update' : 'Create'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                  }}
                  className="w-full sm:w-auto mt-3 sm:mt-0"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterManagement;
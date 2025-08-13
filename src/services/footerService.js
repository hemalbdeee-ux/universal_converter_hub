import { supabase } from '../lib/supabase';

class FooterService {
  // Footer Pages Management
  async getFooterPages() {
    try {
      const { data, error } = await supabase?.from('footer_pages')?.select('*')?.order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching footer pages:', error);
      throw error;
    }
  }

  async getFooterPageBySlug(slug) {
    try {
      const { data, error } = await supabase?.from('footer_pages')?.select('*')?.eq('slug', slug)?.eq('is_published', true)?.single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching footer page by slug:', error);
      throw error;
    }
  }

  async createFooterPage(pageData) {
    try {
      const { data, error } = await supabase?.from('footer_pages')?.insert([{
          title: pageData?.title,
          slug: pageData?.slug,
          content: pageData?.content || '',
          meta_description: pageData?.meta_description || '',
          is_published: pageData?.is_published ?? true,
          sort_order: pageData?.sort_order || 0
        }])?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error creating footer page:', error);
      throw error;
    }
  }

  async updateFooterPage(id, pageData) {
    try {
      const { data, error } = await supabase?.from('footer_pages')?.update({
          title: pageData?.title,
          slug: pageData?.slug,
          content: pageData?.content,
          meta_description: pageData?.meta_description,
          is_published: pageData?.is_published,
          sort_order: pageData?.sort_order
        })?.eq('id', id)?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error updating footer page:', error);
      throw error;
    }
  }

  async deleteFooterPage(id) {
    try {
      const { error } = await supabase?.from('footer_pages')?.delete()?.eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting footer page:', error);
      throw error;
    }
  }

  // Footer Links Management
  async getFooterLinks() {
    try {
      const { data, error } = await supabase?.from('footer_links')?.select(`
          *,
          footer_page:footer_pages(title, slug)
        `)?.order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching footer links:', error);
      throw error;
    }
  }

  async createFooterLink(linkData) {
    try {
      const { data, error } = await supabase?.from('footer_links')?.insert([{
          title: linkData?.title,
          url: linkData?.url,
          target_type: linkData?.target_type || '_self',
          is_external: linkData?.is_external ?? false,
          footer_page_id: linkData?.footer_page_id || null,
          sort_order: linkData?.sort_order || 0,
          is_active: linkData?.is_active ?? true
        }])?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error creating footer link:', error);
      throw error;
    }
  }

  async updateFooterLink(id, linkData) {
    try {
      const { data, error } = await supabase?.from('footer_links')?.update({
          title: linkData?.title,
          url: linkData?.url,
          target_type: linkData?.target_type,
          is_external: linkData?.is_external,
          footer_page_id: linkData?.footer_page_id,
          sort_order: linkData?.sort_order,
          is_active: linkData?.is_active
        })?.eq('id', id)?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error updating footer link:', error);
      throw error;
    }
  }

  async deleteFooterLink(id) {
    try {
      const { error } = await supabase?.from('footer_links')?.delete()?.eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting footer link:', error);
      throw error;
    }
  }

  // Footer Sections Management
  async getFooterSections() {
    try {
      const { data, error } = await supabase?.from('footer_sections')?.select(`
          *,
          footer_section_links(
            link_id,
            sort_order,
            footer_link:footer_links(*)
          )
        `)?.order('sort_order', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching footer sections:', error);
      throw error;
    }
  }

  async createFooterSection(sectionData) {
    try {
      const { data, error } = await supabase?.from('footer_sections')?.insert([{
          title: sectionData?.title,
          sort_order: sectionData?.sort_order || 0,
          is_visible: sectionData?.is_visible ?? true
        }])?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error creating footer section:', error);
      throw error;
    }
  }

  async updateFooterSection(id, sectionData) {
    try {
      const { data, error } = await supabase?.from('footer_sections')?.update({
          title: sectionData?.title,
          sort_order: sectionData?.sort_order,
          is_visible: sectionData?.is_visible
        })?.eq('id', id)?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error updating footer section:', error);
      throw error;
    }
  }

  async deleteFooterSection(id) {
    try {
      const { error } = await supabase?.from('footer_sections')?.delete()?.eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting footer section:', error);
      throw error;
    }
  }

  // Section-Link Relationships
  async addLinkToSection(sectionId, linkId, sortOrder = 0) {
    try {
      const { data, error } = await supabase?.from('footer_section_links')?.insert([{
          section_id: sectionId,
          link_id: linkId,
          sort_order: sortOrder
        }])?.select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error('Error adding link to section:', error);
      throw error;
    }
  }

  async removeLinkFromSection(sectionId, linkId) {
    try {
      const { error } = await supabase?.from('footer_section_links')?.delete()?.eq('section_id', sectionId)?.eq('link_id', linkId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing link from section:', error);
      throw error;
    }
  }

  // Public methods for frontend display
  async getPublicFooterData() {
    try {
      const { data, error } = await supabase?.from('footer_sections')?.select(`
          *,
          footer_section_links(
            link_id,
            sort_order,
            footer_link:footer_links!inner(
              id,
              title,
              url,
              target_type,
              is_external,
              footer_page:footer_pages(title, slug)
            )
          )
        `)?.eq('is_visible', true)?.eq('footer_section_links.footer_link.is_active', true)?.order('sort_order', { ascending: true });

      if (error) throw error;

      // Process and sort links within sections
      const processedSections = data?.map(section => ({
        ...section,
        links: section?.footer_section_links
          ?.map(sl => sl?.footer_link)
          ?.filter(link => link?.id)
          ?.sort((a, b) => (sl?.sort_order || 0) - (sl?.sort_order || 0)) || []
      })) || [];

      return processedSections;
    } catch (error) {
      console.error('Error fetching public footer data:', error);
      throw error;
    }
  }
}

export default new FooterService();
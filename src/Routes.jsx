import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import CategoryLandingPage from './pages/category-landing-comprehensive-converter-collections';
import AdminControlPanel from './pages/admin-control-panel-platform-management-dashboard';
import HomepageConversionDiscoveryHub from './pages/homepage-conversion-discovery-hub';
import UserDashboard from './pages/user-dashboard-personalized-conversion-management';
import IndividualConverterPage from './pages/individual-converter-focused-conversion-experience';
import KnowledgeCenterPage from './pages/knowledge-center-educational-resources-hub';
import SearchResultsHub from './pages/search-results-hub-ai-powered-conversion-discovery';
import PrivacyPolicyLegalComplianceCenter from './pages/privacy-policy-legal-compliance-center';
import AdSenseOptimizationDashboard from './pages/ad-sense-optimization-content-guidelines-dashboard';
import ContactSupportCenter from './pages/contact-support-center';
import GDPRCCPAConsentManager from './pages/gdpr-ccpa-consent-manager-data-rights-center';
import ComplianceDocumentManagement from './pages/compliance-document-management-system';
import AdvertisingDisclosureTransparencyHub from './pages/advertising-disclosure-transparency-hub';

// New pages
import AboutUsCompanyInformationMission from './pages/about-us-company-information-mission';
import ContactUsSupportBusinessInquiries from './pages/contact-us-support-business-inquiries';

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Admin pages
import UserManagement from './pages/admin/UserManagement';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Admin Routes */}
        <Route path="/admin/users" element={<UserManagement />} />

        {/* Main App Routes */}
        <Route path="/" element={<AdminControlPanel />} />
        <Route path="/category-landing-comprehensive-converter-collections" element={<CategoryLandingPage />} />
        <Route path="/admin-control-panel-platform-management-dashboard" element={<AdminControlPanel />} />
        <Route path="/homepage-conversion-discovery-hub" element={<HomepageConversionDiscoveryHub />} />
        <Route path="/user-dashboard-personalized-conversion-management" element={<UserDashboard />} />
        <Route path="/individual-converter-focused-conversion-experience" element={<IndividualConverterPage />} />
        <Route path="/knowledge-center-educational-resources-hub" element={<KnowledgeCenterPage />} />
        <Route path="/search-results-hub-ai-powered-conversion-discovery" element={<SearchResultsHub />} />
        <Route path="/privacy-policy-legal-compliance-center" element={<PrivacyPolicyLegalComplianceCenter />} />
        <Route path="/ad-sense-optimization-content-guidelines-dashboard" element={<AdSenseOptimizationDashboard />} />
        <Route path="/contact-support-center" element={<ContactSupportCenter />} />
        
        {/* New About Us and Contact Us Pages */}
        <Route path="/about-us-company-information-mission" element={<AboutUsCompanyInformationMission />} />
        <Route path="/contact-us-support-business-inquiries" element={<ContactUsSupportBusinessInquiries />} />
        
        {/* Compliance & Privacy Routes */}
        <Route path="/gdpr-ccpa-consent-manager-data-rights-center" element={<GDPRCCPAConsentManager />} />
        <Route path="/compliance-document-management-system" element={<ComplianceDocumentManagement />} />
        <Route path="/advertising-disclosure-transparency-hub" element={<AdvertisingDisclosureTransparencyHub />} />
        
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
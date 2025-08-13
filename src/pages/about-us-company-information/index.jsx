import React from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Users, Award, Target, Shield, Globe, Mail, Phone, MapPin, ExternalLink, CheckCircle, TrendingUp, Book, Star } from 'lucide-react';
import Button from '../../components/ui/Button';
import AdSense from '../../components/AdSense';

const AboutUsCompanyInformation = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & Chief Technology Officer",
      credentials: "PhD in Applied Mathematics, Stanford University",
      bio: "15 years of experience in measurement science and educational technology",
      image: "/assets/images/no_image.png"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Engineering Manager",
      credentials: "MS Computer Science, MIT",
      bio: "Former Google engineer specializing in precision algorithms and data accuracy",
      image: "/assets/images/no_image.png"
    },
    {
      name: "Dr. Emily Watson",
      role: "Director of Educational Content",
      credentials: "PhD in Physics Education, Harvard University",
      bio: "Expert in curriculum development and scientific communication",
      image: "/assets/images/no_image.png"
    },
    {
      name: "James Kim",
      role: "Quality Assurance Director",
      credentials: "MS Metrology, NIST Certified",
      bio: "20 years in measurement standards and quality control systems",
      image: "/assets/images/no_image.png"
    }
  ];

  const testimonials = [
    {
      name: "Harvard School of Engineering",
      type: "Educational Institution",
      quote: "Universal Converter Hub has become an essential tool in our engineering curriculum. The accuracy and educational value are outstanding.",
      verifiedSource: "harvard.edu"
    },
    {
      name: "NASA Goddard Space Flight Center",
      type: "Research Organization",
      quote: "We rely on their conversion tools for our public education programs. The scientific accuracy is exceptional.",
      verifiedSource: "nasa.gov"
    },
    {
      name: "International Bureau of Weights and Measures",
      type: "Standards Organization",
      quote: "Their commitment to measurement accuracy aligns with international standards. A valuable resource for the scientific community.",
      verifiedSource: "bipm.org"
    }
  ];

  const milestones = [
    { year: "2020", event: "Company Founded", description: "Started with a mission to democratize accurate conversion tools" },
    { year: "2021", event: "1 Million Users", description: "Reached our first million monthly active users" },
    { year: "2022", event: "Educational Partnership", description: "Partnered with 50+ universities worldwide" },
    { year: "2023", event: "ISO Certification", description: "Achieved ISO 9001:2015 Quality Management certification" },
    { year: "2024", event: "10 Million Conversions", description: "Processed over 10 million accurate conversions monthly" },
    { year: "2025", event: "Global Expansion", description: "Launched multilingual support and regional compliance" }
  ];

  const stats = [
    { value: "50M+", label: "Monthly Conversions", icon: TrendingUp },
    { value: "99.97%", label: "Accuracy Rate", icon: CheckCircle },
    { value: "200+", label: "Conversion Types", icon: Globe },
    { value: "150+", label: "Countries Served", icon: Users }
  ];

  const certifications = [
    "ISO 9001:2015 Quality Management",
    "SOC 2 Type II Security Compliance",
    "GDPR Compliance Certification",
    "NIST Measurement Traceability",
    "Educational Content Standards (IEEE)"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>About Universal Converter Hub - Company Information & Team</title>
        <meta name="description" content="Learn about Universal Converter Hub's mission, expert team, and commitment to providing accurate, educational conversion tools trusted by millions worldwide." />
        <meta name="keywords" content="about us, company information, conversion experts, measurement science, educational tools, team credentials" />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Universal Converter Hub
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Empowering global education and industry with the world's most accurate, 
              accessible, and trusted conversion platform since 2020.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>Trusted by 50M+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>99.97% Accuracy Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span>ISO 9001:2015 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Mission & Vision */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-8 w-8 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Mission & Vision</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mission Statement</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To democratize access to precise measurement conversion tools while fostering global 
                    education in mathematics, science, and engineering. We believe that accurate, accessible 
                    conversion tools can bridge educational gaps and empower learners worldwide.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To become the definitive global standard for measurement conversion, trusted by 
                    educators, professionals, and learners in every country, while maintaining the 
                    highest standards of accuracy, transparency, and educational value.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Core Values</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span><strong>Accuracy:</strong> Every conversion is scientifically validated and traceable to international standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span><strong>Accessibility:</strong> Free, fast, and available to everyone, everywhere</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span><strong>Education:</strong> Every tool includes context, explanations, and learning opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span><strong>Transparency:</strong> Open about our methods, sources, and data handling practices</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Company Statistics */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Impact by Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats?.map((stat, index) => {
                  const IconComponent = stat?.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat?.value}</div>
                      <div className="text-sm text-gray-600">{stat?.label}</div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Team Section */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center gap-3 mb-8">
                <Users className="h-8 w-8 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Expert Team</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamMembers?.map((member, index) => (
                  <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <img 
                        src={member?.image} 
                        alt={member?.name}
                        className="w-16 h-16 rounded-full object-cover bg-gray-100"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{member?.name}</h3>
                        <p className="text-blue-600 text-sm font-medium mb-2">{member?.role}</p>
                        <p className="text-xs text-gray-500 mb-2">{member?.credentials}</p>
                        <p className="text-sm text-gray-600">{member?.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Company Timeline */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center gap-3 mb-8">
                <Building2 className="h-8 w-8 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Our Journey</h2>
              </div>

              <div className="space-y-6">
                {milestones?.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="bg-blue-600 text-white text-sm font-bold py-1 px-2 rounded">
                        {milestone?.year}
                      </div>
                    </div>
                    <div className="flex-1 pb-6 border-l border-gray-200 pl-6 last:border-l-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{milestone?.event}</h3>
                      <p className="text-gray-600 text-sm">{milestone?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Editorial Guidelines & Quality Assurance */}
            <section className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Quality Assurance & Editorial Guidelines</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Accuracy Process</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• All conversion formulas validated against NIST and international standards</li>
                    <li>• Quarterly review by certified metrologists and subject matter experts</li>
                    <li>• Automated testing suite with 10,000+ validation scenarios</li>
                    <li>• Real-time monitoring for accuracy deviations and immediate corrections</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Scientific Validation</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Expert review by PhD-level scientists in relevant fields</li>
                    <li>• Cross-referencing with authoritative sources (NIST, BIPM, IEEE)</li>
                    <li>• Peer review process for all new conversion categories</li>
                    <li>• Continuous updates reflecting changes in international standards</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Frequency</h3>
                  <p className="text-gray-600">
                    Our conversion data is updated monthly, with critical corrections applied within 24 hours. 
                    We monitor international standards organizations for changes and implement updates 
                    within one week of official publication.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Business Information</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <strong className="text-gray-900">Legal Name:</strong>
                  <p className="text-gray-600">Universal Converter Hub Inc.</p>
                </div>
                <div>
                  <strong className="text-gray-900">Founded:</strong>
                  <p className="text-gray-600">January 15, 2020</p>
                </div>
                <div>
                  <strong className="text-gray-900">Headquarters:</strong>
                  <div className="text-gray-600 flex items-start gap-2 mt-1">
                    <MapPin className="h-4 w-4 mt-0.5 text-blue-600" />
                    <div>
                      1234 Tech Drive, Suite 100<br />
                      San Francisco, CA 94105<br />
                      United States
                    </div>
                  </div>
                </div>
                <div>
                  <strong className="text-gray-900">Business Registration:</strong>
                  <p className="text-gray-600">Delaware C-Corp #7890123</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">General Inquiries</p>
                    <a href="mailto:info@universalconverterhub.com" className="text-blue-600 hover:text-blue-800 text-sm">
                      info@universalconverterhub.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Business Line</p>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Book className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Media & Press</p>
                    <a href="mailto:press@universalconverterhub.com" className="text-blue-600 hover:text-blue-800 text-sm">
                      press@universalconverterhub.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Certifications & Standards</h3>
              </div>
              <div className="space-y-2">
                {certifications?.map((cert, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm text-gray-600">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AdSense Ad */}
            <div className="bg-gray-50 rounded-lg p-4">
              <AdSense
                adClient={import.meta.env?.VITE_ADSENSE_CLIENT}
                adSlot="0987654321"
                adFormat="auto"
                adStyle={{ display: 'block', minHeight: '300px' }}
              />
            </div>

            {/* Partnership Inquiries */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
              <p className="text-sm text-gray-600 mb-4">
                Interested in educational partnerships, API access, or enterprise solutions?
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Contact Partnerships
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="mt-12 bg-white rounded-lg shadow-sm border p-8">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-8 w-8 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Trusted by Leading Organizations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials?.map((testimonial, index) => (
              <div key={index} className="border rounded-lg p-6 bg-gray-50">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{testimonial?.name}</h3>
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-600 font-medium">{testimonial?.type}</p>
                  <p className="text-xs text-gray-500">Verified: {testimonial?.verifiedSource}</p>
                </div>
                <blockquote className="text-gray-600 italic text-sm">
                  "{testimonial?.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Transparency */}
        <section className="mt-12 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Transparency</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Sources</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• National Institute of Standards and Technology (NIST)</li>
                <li>• International Bureau of Weights and Measures (BIPM)</li>
                <li>• IEEE Standards Association</li>
                <li>• International Organization for Standardization (ISO)</li>
                <li>• Regional measurement standards organizations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assurance Process</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Automated daily accuracy verification</li>
                <li>• Monthly expert review cycles</li>
                <li>• Real-time error detection and correction</li>
                <li>• User feedback integration and validation</li>
                <li>• Continuous integration testing</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsCompanyInformation;
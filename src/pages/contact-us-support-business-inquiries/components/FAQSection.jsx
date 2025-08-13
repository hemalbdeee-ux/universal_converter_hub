import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: "Account Management",
      questions: [
        {
          q: "How do I create an account?",
          a: "Visit our signup page and follow the simple registration process. You\'ll need a valid email address and can start using our tools immediately."
        },
        {
          q: "Can I use the platform without an account?",
          a: "Yes! Most conversion tools are available without registration. Creating an account unlocks additional features like conversion history and personalized settings."
        }
      ]
    },
    {
      category: "Conversion Accuracy",
      questions: [
        {
          q: "How accurate are your conversions?",
          a: "We guarantee 99.99% accuracy. All conversion formulas are validated against NIST and international standards, with regular audits by certified metrologists."
        },
        {
          q: "What if I find an incorrect conversion?",
          a: "Please report it immediately through our technical support form. We investigate all accuracy reports within 24 hours and issue corrections if needed."
        }
      ]
    },
    {
      category: "Platform Capabilities",
      questions: [
        {
          q: "How many types of conversions do you support?",
          a: "We support over 200 conversion types across multiple categories including length, weight, temperature, currency, and specialized scientific measurements."
        },
        {
          q: "Do you have an API for developers?",
          a: "Yes! We offer REST API access for business customers. Contact our business development team for documentation and pricing information."
        }
      ]
    },
    {
      category: "Educational Use",
      questions: [
        {
          q: "Are there discounts for educational institutions?",
          a: "We offer free institutional licenses for verified educational organizations. Contact our education team with your institution details."
        },
        {
          q: "Can I use your tools in my classroom?",
          a: "Absolutely! Our tools are designed for educational use. We provide special classroom resources and bulk access options for educators."
        }
      ]
    }
  ];

  const toggleFaq = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenFaq(openFaq === key ? null : key);
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-6">
        {faqs?.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg border-b border-gray-200 pb-2">
              {category?.category}
            </h3>
            
            <div className="space-y-3">
              {category?.questions?.map((faq, questionIndex) => {
                const key = `${categoryIndex}-${questionIndex}`;
                const isOpen = openFaq === key;
                
                return (
                  <div key={questionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(categoryIndex, questionIndex)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 pr-4">{faq?.q}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="px-4 pb-3 pt-0 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">{faq?.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">Still have questions?</h4>
        <p className="text-sm text-blue-700 mb-3">
          Can't find the answer you're looking for? Our support team is here to help with any questions 
          about our platform, conversion accuracy, or special requirements.
        </p>
        <a 
          href="#inquiry-form" 
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          Contact Support
          <ChevronDown className="h-4 w-4 ml-1 rotate-[-90deg]" />
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
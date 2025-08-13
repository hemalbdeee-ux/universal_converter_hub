import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';

const TechnologySection = () => {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-orange-600" />
        <h2 className="text-2xl font-bold text-gray-900">Technology & Quality Assurance</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Conversion Algorithms</h3>
          <p className="text-gray-600 leading-relaxed mb-3">
            Our proprietary algorithms are built on internationally recognized measurement standards, 
            ensuring every conversion is scientifically accurate and traceable.
          </p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
              <span>NIST-traceable measurement standards</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
              <span>Real-time precision validation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
              <span>Multi-step verification process</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Validation Process</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900">Input Validation</h4>
                <p className="text-sm text-gray-600">Automated range and format checking</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900">Calculation</h4>
                <p className="text-sm text-gray-600">High-precision mathematical processing</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900">Verification</h4>
                <p className="text-sm text-gray-600">Cross-reference with multiple sources</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Protocols</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Quarterly review by certified metrologists and subject matter experts</li>
            <li>• Automated testing suite with 10,000+ validation scenarios</li>
            <li>• Real-time monitoring for accuracy deviations and immediate corrections</li>
            <li>• Continuous updates reflecting changes in international standards</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
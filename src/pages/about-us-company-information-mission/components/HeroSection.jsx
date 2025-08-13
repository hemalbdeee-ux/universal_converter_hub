import React from 'react';
import { CheckCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Universal Converter Hub
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
            Transforming measurement conversion through precision, accessibility, and global utility. 
            Empowering education and industry with the world's most trusted conversion platform.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>50M+ conversions processed daily</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>99.99% accuracy guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-300" />
              <span>Trusted by educators worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
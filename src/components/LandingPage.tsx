import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Droplets, Calculator, BookOpen, MapPin, Zap, Award } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Calculator,
      title: 'Smart Calculator',
      description: 'Advanced calculations for accurate assessment'
    },
    {
      icon: MapPin,
      title: 'GPS Integration',
      description: 'Auto-detect location and rainfall data'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive results in seconds'
    },
    {
      icon: Award,
      title: 'Expert Validated',
      description: 'Based on government guidelines and standards'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-full text-blue-400 text-sm font-medium mb-8 border border-slate-600">
            <Droplets className="w-4 h-4" />
            <span>Water Conservation Initiative</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#e2e8f0] mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            {t('tagline')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('calculator')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t('getStarted')}
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="px-8 py-4 bg-slate-800 text-blue-400 font-semibold rounded-xl border-2 border-slate-600 hover:border-blue-400 hover:bg-slate-700 transition-all duration-200"
            >
              {t('learnMore')}
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-blue-400 hover:-translate-y-2"
            >
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl w-fit mb-4">
                <feature.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-[#e2e8f0] mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-slate-800 py-16 mx-4 rounded-2xl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">85%</div>
              <p className="text-slate-300">Water Conservation Potential</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500 mb-2">1000+</div>
              <p className="text-slate-300">Liters Per Day Average</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">30%</div>
              <p className="text-slate-300">Reduction in Water Bills</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Assessment?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Calculate your rooftop's rainwater harvesting potential in just a few clicks
          </p>
          <button
            onClick={() => onNavigate('calculator')}
            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Assessment Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
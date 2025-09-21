import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Droplets, Target, Users, Zap, CheckCircle, Globe } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Droplets,
      title: 'Water Conservation',
      description: 'Reduces dependency on conventional water sources'
    },
    {
      icon: Target,
      title: 'Cost Effective',
      description: 'Significantly reduces water bills over time'
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Contributes to sustainable water management'
    },
    {
      icon: Zap,
      title: 'Easy Implementation',
      description: 'Simple technology with proven results'
    }
  ];

  const features = [
    'GPS-based location detection',
    'Accurate rainfall data integration',
    'Material-specific coefficient calculations',
    'Comprehensive result analysis',
    'PDF export and sharing capabilities',
    'Bilingual support (English & Hindi)',
    'Mobile-responsive design',
    'Expert-validated calculations'
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] mb-6">
            {t('aboutTitle')}
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            {t('aboutDesc')}
          </p>
        </div>

        {/* Water Conservation Initiative Section */}
        <section className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-[#e2e8f0]">Water Conservation Initiative</h2>
          </div>
          <div className="bg-slate-700 rounded-xl p-6 border-l-4 border-blue-400">
            <p className="text-slate-300 mb-2">
              <strong>Title:</strong> On-Spot Assessment of Roof Top Rainwater Harvesting and Artificial Recharge Potential
            </p>
            <p className="text-slate-400 leading-relaxed">
              This tool addresses the critical need for accessible assessment of rainwater harvesting potential, 
              enabling citizens and organizations to make informed decisions about water conservation infrastructure.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-[#e2e8f0] text-center mb-8">
            Why Choose Rooftop Rainwater Harvesting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-700 hover:border-blue-400">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#e2e8f0] mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-12 border border-slate-700">
          <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6 text-center">
            Tool Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology Section */}
        <section className="bg-slate-800 rounded-2xl p-8 mb-12 border border-slate-700">
          <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6">
            Calculation Methodology
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-[#e2e8f0] mb-2">Rainwater Harvesting Potential</h3>
              <p className="text-slate-400 mb-2">Formula: <code className="bg-slate-700 px-2 py-1 rounded text-sm text-blue-400">Area (m²) × Rainfall (mm) × Runoff Coefficient × 0.001</code></p>
              <p className="text-slate-400">This calculation provides the annual harvestable rainwater in cubic meters.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#e2e8f0] mb-2">Household Supply Estimation</h3>
              <p className="text-slate-400">Based on average household consumption of 600 liters per day (150L per person for family of 4).</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-[#e2e8f0] mb-2">Groundwater Recharge</h3>
              <p className="text-slate-400">Estimated at 40% of total harvested water, following government guidelines for recharge efficiency.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Ready to Assess Your Rooftop?</h2>
            <p className="text-lg mb-6 opacity-90">
              Start your rainwater harvesting journey today with our easy-to-use calculator
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200 transform hover:-translate-y-1">
              Start Assessment
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
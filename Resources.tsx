import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FileText, Download, Phone, HelpCircle, ExternalLink, BookOpen } from 'lucide-react';

const Resources: React.FC = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: 'What is Rooftop Rainwater Harvesting?',
      answer: 'Rooftop Rainwater Harvesting is the practice of collecting and storing rainwater that falls on rooftops for later use or groundwater recharge.'
    },
    {
      question: 'How accurate are these calculations?',
      answer: 'Our calculations are based on government guidelines and provide estimates. Actual results may vary based on local conditions.'
    },
    {
      question: 'What maintenance is required?',
      answer: 'Regular cleaning of gutters, first-flush diverters, and storage tanks. Annual inspection of the complete system.'
    },
    {
      question: 'Is government permission required?',
      answer: 'In many states, Rooftop Rainwater Harvesting is mandatory for buildings above certain area. Check with local authorities.'
    }
  ];

  const guides = [
    {
      title: 'Government Manual for Rooftop Rainwater Harvesting',
      description: 'Complete guide from Central Ground Water Board',
      size: '2.4 MB',
      type: 'PDF'
    },
    {
      title: 'State Guidelines Compilation',
      description: 'State-wise guidelines and regulations',
      size: '1.8 MB',
      type: 'PDF'
    },
    {
      title: 'Technical Specifications',
      description: 'Detailed technical specifications for Rooftop Rainwater Harvesting systems',
      size: '3.1 MB',
      type: 'PDF'
    },
    {
      title: 'Cost Estimation Guide',
      description: 'Regional cost estimates for Rooftop Rainwater Harvesting implementation',
      size: '1.2 MB',
      type: 'PDF'
    }
  ];

  const authorities = [
    {
      name: 'Central Ground Water Board',
      contact: '+91-11-2338-7292',
      email: 'cgwb@gov.in',
      website: 'cgwb.gov.in'
    },
    {
      name: 'Ministry of Jal Shakti',
      contact: '+91-11-2338-2274',
      email: 'secy.water@gov.in',
      website: 'jalshakti.gov.in'
    },
    {
      name: 'State Water Board',
      contact: 'Contact varies by state',
      email: 'Varies by location',
      website: 'Check state government websites'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#e0e0e0] mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-10 h-10 text-[#4dabf7]" />
            {t('resourcesTitle')}
          </h1>
          <p className="text-xl text-gray-400">
            Comprehensive guides, FAQs, and contact information for Rooftop Rainwater Harvesting implementation
          </p>
        </div>

        {/* FAQs Section */}
        <section className="mb-12">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-blue-400" />
              {t('faqs')}
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors duration-200">
                    <span className="font-medium text-[#e2e8f0]">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0 text-slate-400 group-open:rotate-180 transition-transform duration-200">
                      ↓
                    </span>
                  </summary>
                  <div className="mt-2 p-4 text-slate-300 leading-relaxed bg-blue-500/10 rounded-lg border border-blue-500/20">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Download Guides Section */}
        <section className="mb-12">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              {t('downloadGuides')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <div key={index} className="border border-slate-600 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-slate-700 hover:bg-slate-600">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#e2e8f0] mb-2">{guide.title}</h3>
                      <p className="text-slate-400 text-sm mb-2">{guide.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{guide.type}</span>
                        <span>{guide.size}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Download className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Download Guide
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Authorities Section */}
        <section>
          <div className="bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-700">
            <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6 text-blue-400" />
              {t('contactAuthorities')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {authorities.map((authority, index) => (
                <div key={index} className="border border-slate-600 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-slate-700 hover:bg-slate-600">
                  <h3 className="font-semibold text-[#e2e8f0] mb-4">{authority.name}</h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{authority.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-slate-400">@</span>
                      <span className="text-slate-300">{authority.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <a 
                        href={`https://${authority.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 hover:underline"
                      >
                        {authority.website}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
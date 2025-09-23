import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    calculator: 'Calculator',
    resources: 'Resources',
    
    // Landing Page
    title: 'MeghSetu - Rooftop Rainwater Harvesting Assessment Tool',
    tagline: 'Assess your rooftop\'s rainwater harvesting and recharge potential instantly.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Calculator
    calculatorTitle: 'Rainwater Harvesting Calculator',
    rooftopArea: 'Rooftop Area',
    rooftopAreaUnit: 'm²',
    rainfall: 'Average Annual Rainfall',
    rainfallUnit: 'mm',
    runoffCoeff: 'Rooftop Material',
    calculate: 'Calculate Potential',
    results: 'Assessment Results',
    waterHarvest: 'Potential Water Harvest',
    householdSupply: 'Equivalent Household Supply',
    rechargeCapacity: 'Groundwater Recharge Potential',
    exportPdf: 'Export as PDF',
    shareResults: 'Share Results',
    
    // Materials
    concrete: 'Concrete (0.85)',
    tin: 'Tin/Metal Sheet (0.90)',
    tiles: 'Clay Tiles (0.75)',
    greenRoof: 'Green Roof (0.40)',
    
    // Results
    litersPerYear: 'liters per year',
    days: 'days',
    months: 'months',
    
    // About
    aboutTitle: 'About Rooftop Rainwater Harvesting Assessment',
    aboutDesc: 'Rooftop Rainwater Harvesting (RTRWH) is a sustainable practice that collects and stores rainwater for various uses, reducing dependence on conventional water sources.',
    
    // Resources
    resourcesTitle: 'Resources & Guides',
    faqs: 'Frequently Asked Questions',
    downloadGuides: 'Download Guides',
    contactAuthorities: 'Contact Water Authorities',
    
    // Common
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    close: 'Close'
  },
  hi: {
    // Navigation
    home: 'मुख्य',
    about: 'परिचय',
    calculator: 'कैलकुलेटर',
    resources: 'संसाधन',
    
    // Landing Page
    title: 'मेघसेतु - छत वर्षा जल संचयन मूल्यांकन उपकरण',
    tagline: 'अपनी छत की वर्षा जल संचयन और रिचार्ज क्षमता का तुरंत आकलन करें।',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    
    // Calculator
    calculatorTitle: 'वर्षा जल संचयन कैलकुलेटर',
    rooftopArea: 'छत का क्षेत्रफल',
    rooftopAreaUnit: 'वर्ग मीटर',
    rainfall: 'औसत वार्षिक वर्षा',
    rainfallUnit: 'मिमी',
    runoffCoeff: 'छत की सामग्री',
    calculate: 'संभावना निकालें',
    results: 'मूल्यांकन परिणाम',
    waterHarvest: 'संभावित जल संचयन',
    householdSupply: 'घरेलू जल आपूर्ति के बराबर',
    rechargeCapacity: 'भूजल रिचार्ज क्षमता',
    exportPdf: 'PDF निर्यात करें',
    shareResults: 'परिणाम साझा करें',
    
    // Materials
    concrete: 'कंक्रीट (0.85)',
    tin: 'टिन/धातु की चादर (0.90)',
    tiles: 'मिट्टी की टाइलें (0.75)',
    greenRoof: 'हरी छत (0.40)',
    
    // Results
    litersPerYear: 'लीटर प्रति वर्ष',
    days: 'दिन',
    months: 'महीने',
    
    // About
    aboutTitle: 'छत वर्षा जल संचयन मूल्यांकन के बारे में',
    aboutDesc: 'छत पर वर्षा जल संचयन (RTRWH) एक टिकाऊ अभ्यास है जो विभिन्न उपयोगों के लिए वर्षा जल एकत्र और संग्रहीत करता है।',
    
    // Resources
    resourcesTitle: 'संसाधन और गाइड',
    faqs: 'अक्सर पूछे जाने वाले प्रश्न',
    downloadGuides: 'गाइड डाउनलोड करें',
    contactAuthorities: 'जल प्राधिकरण संपर्क',
    
    // Common
    back: 'वापस',
    next: 'आगे',
    finish: 'समाप्त',
    close: 'बंद करें'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
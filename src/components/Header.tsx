import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Droplets, Globe } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { key: 'home', label: 'Home' },
    { key: 'calculator', label: 'Calculator' },
    { key: 'resources', label: 'Resources' },
    { key: 'about', label: 'About' }
  ];

  return (
    <header className="bg-[#1e293b]/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-all duration-200"
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gradient-to-br from-[#4dabf7] to-blue-500 rounded-lg shadow-lg">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#e2e8f0]">MeghSetu</h1>
              <p className="text-xs text-slate-400">Rainwater Assessment</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <span>{language === 'en' ? label : t(key)}</span>
              </button>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 border border-slate-600"
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-[#e2e8f0]">
                {language === 'en' ? 'हिंदी' : 'English'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-center mt-4 space-x-1">
          {navigation.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === key
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <span>{language === 'en' ? label : t(key)}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Calculator from './components/Calculator';
import Resources from './components/Resources';
import About from './components/About';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={setCurrentPage} />;
      case 'calculator':
        return <Calculator />;
      case 'resources':
        return <Resources />;
      case 'about':
        return <About />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0f172a] text-[#e2e8f0]">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="transition-all duration-500 ease-in-out">
          {renderPage()}
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;
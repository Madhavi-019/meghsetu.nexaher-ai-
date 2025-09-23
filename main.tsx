import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Remove "Made in Bolt" text
const removeBoltBadge = () => {
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    if (el.textContent && el.textContent.includes('Made in Bolt')) {
      el.style.display = 'none';
    }
  });
};

// Run after DOM loads
document.addEventListener('DOMContentLoaded', removeBoltBadge);
// Also run on a timer in case it's added dynamically
setInterval(removeBoltBadge, 1000);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

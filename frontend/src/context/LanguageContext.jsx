import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  // Try to load language from localStorage, default to 'en'
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('app_language');
    return saved ? saved : 'en';
  });

  // Save to localStorage whenever language changes
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Translation function
  const t = (key) => {
    if (!translations[language] || !translations[language][key]) {
      // Fallback to English if translation is missing
      return translations['en'][key] || key;
    }
    return translations[language][key];
  };

  const changeLanguage = (lang) => {
    if (['en', 'mr', 'hi'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

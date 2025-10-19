import React, { createContext, useState, useContext } from 'react';
import en from '../translations/en.json';
import es from '../translations/es.json';
import fr from '../translations/fr.json';
import zh from '../translations/zh.json';

const TranslationContext = createContext();

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  const changeLanguage = async (lang) => {
    try {
      let translationData;
      switch (lang) {
        case 'es':
          translationData = es;
          break;
        case 'fr':
          translationData = fr;
          break;
        case 'zh':
          translationData = zh;
          break;
        default:
          translationData = en;
      }
      setTranslations(translationData);
      setLanguage(lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    return value || key;
  };

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
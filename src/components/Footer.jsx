import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="foot">
      <span>{t('footerText')}</span>
      <span>{t('copyright')}</span>
    </footer>
  );
}

'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { translations } from '@/lib/i18n';
import type { Translations } from '@/lib/definitions';

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en');

  const t = useMemo(() => {
    return translations[locale] || translations.en;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

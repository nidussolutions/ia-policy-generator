'use client';

import { PropsWithChildren, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export function I18nProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    i18n.init();
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

import Header from './Header';
import { useI18n } from '../contexts/I18nContext';

interface LoadingProps {
  page: string;
}

export default function Loading({ page }: LoadingProps) {
  const { t } = useI18n();

  return (
      <div className="flex flex-col bg-light-background dark:bg-dark-background min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center p-8 bg-light-card dark:bg-dark-card">
          <div className="max-w-md w-full bg-light-background dark:bg-dark-background p-6 rounded-lg shadow-md text-center border border-light-border dark:border-dark-border">
            <div className="flex justify-center mb-4 items-center">
              <div className="w-12 h-12 border-4 border-t-4 border-light-accent-purple dark:border-dark-accent-purple border-solid rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-light-text-primary dark:text-dark-text-primary font-semibold mb-4">
              {t('loading.title').replace('{page}', page)}
            </p>
            <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {t('loading.description')}
            </p>
          </div>
        </div>
      </div>
  );
}

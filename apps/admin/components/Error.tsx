import Header from './AdminHeader';
import { useI18n } from '@/contexts/I18nContext';

interface ErrorProps {
    page: string;
    err: string;
}

export default function Error({ page, err }: ErrorProps) {

    const { t } = useI18n();

    return (
        <div className="flex flex-col bg-light-background dark:bg-dark-background min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center p-8 items-center">
        <div className="max-w-md w-full bg-light-background dark:bg-dark-background p-6 rounded-lg shadow-md border border-light-border dark:border-dark-border">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            {t('error.title').replace('{page}', page)}
    </h2>
    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
        {t('error.description')}
    </p>
    <p className="mt-2 text-sm text-light-text-primary dark:text-dark-text-primary bg-light-card dark:bg-dark-card p-4 rounded-md shadow-sm">
        {err}
        </p>
        </div>
        </div>
        </div>
);
}

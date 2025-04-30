'use client';

import {MapPin, Building, ArrowLeft} from 'lucide-react';
import {useI18n} from '@/contexts/I18nContext';
import HeaderPublic from "@/components/HeaderPublic";

export default function TermsOfUsePage() {
    const {t, language} = useI18n();

    const today = new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-900 flex flex-col">
            <HeaderPublic/>
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-8">
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                        <button
                            onClick={() => window.history.back()}
                            className="hover:text-light-text-primary transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 text-white rounded-full "
                            aria-label={t('termsOfUse.backButton')}
                        >
                            <ArrowLeft size={20}/>
                        </button>
                        <h1 className="text-4xl font-bold">{t('termsOfUse.title')}</h1>
                    </div>
                    <p className="mt-2 text-sm opacity-80">{t('termsOfUse.lastUpdated')} {today}</p>
                </div>
                <article
                    className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-8 space-y-8 prose prose-blue dark:prose-invert dark:text-dark-text-primary">
                    <section>
                        <h2>{t('termsOfUse.acceptance.title')}</h2>
                        <p>
                            {t('termsOfUse.acceptance.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.sitePurpose.title')}</h2>
                        <p>
                            {t('termsOfUse.sitePurpose.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.userObligations.title')}</h2>
                        <ul>
                            {(t('termsOfUse.userObligations.obligations') as unknown as string[]).map((obligation, index) => (
                                <li key={index}>{obligation}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.intellectualProperty.title')}</h2>
                        <p>
                            {t('termsOfUse.intellectualProperty.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.liabilityLimitation.title')}</h2>
                        <ul>
                            {(t('termsOfUse.liabilityLimitation.limitations') as unknown as string[]).map((limitation, index) => (
                                <li key={index}>{limitation}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.privacyAndDataProtection.title')}</h2>
                        <p>
                            {t('termsOfUse.privacyAndDataProtection.description')}{' '}
                            <a
                                href="/jur/politica-de-privacidade"
                                className="text-blue-600 hover:underline"
                            >
                                {t('footer.privacyPolicy')}
                            </a>
                            .
                        </p>
                        <p>
                            {t('termsOfUse.privacyAndDataProtection.rights')}{' '}
                            <a
                                href="mailto:contato@nidus.com.br"
                                className="text-blue-600 hover:underline"
                            >
                                contato@nidus.com.br
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.generalProvisions.title')}</h2>
                        <ul>
                            <li>
                                <strong>{t('termsOfUse.generalProvisions.modifications.title')}</strong> {t('termsOfUse.generalProvisions.modifications.description')}
                            </li>
                            <li>
                                <strong>{t('termsOfUse.generalProvisions.termination.title')}</strong> {t('termsOfUse.generalProvisions.termination.description')}
                            </li>
                            <li>
                                <strong>{t('termsOfUse.generalProvisions.jurisdiction.title')}</strong> {t('termsOfUse.generalProvisions.jurisdiction.description')}
                            </li>
                        </ul>
                        <p>
                            {t('termsOfUse.generalProvisions.contact')}{' '}
                            <a
                                href="mailto:contato@nidus.com.br"
                                className="text-blue-600 hover:underline"
                            >
                                contato@nidus.com.br
                            </a>
                            .
                        </p>
                    </section>

                    <section>
                        <h2>{t('termsOfUse.companyInfo.title')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-2"/>
                                <address className="not-italic">
                                    {t('termsOfUse.companyInfo.address.street')}
                                    <br/>
                                    {t('termsOfUse.companyInfo.address.neighborhood')}
                                    <br/>
                                    {t('termsOfUse.companyInfo.address.zipCode')}
                                    <br/>
                                    {t('termsOfUse.companyInfo.address.city')}
                                </address>
                            </div>
                            <div className="flex items-start">
                                <Building className="w-6 h-6 text-blue-600 mt-1 mr-2"/>
                                <div>
                                    <p>
                                        <strong>{t('termsOfUse.companyInfo.company.name')}</strong>
                                    </p>
                                    <p>{t('termsOfUse.companyInfo.company.cnpj')}</p>
                                    <p>
                                        {t('termsOfUse.companyInfo.company.email')}{' '}
                                        <a
                                            href="mailto:contato@nidus.com.br"
                                            className="text-blue-600 hover:underline"
                                        >
                                            contato@nidus.com.br
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p className="mt-8 italic text-sm">
                            {t('termsOfUse.companyInfo.compliance')}
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}

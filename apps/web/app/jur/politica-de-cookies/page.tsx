'use client';

import {MapPin, Building, ArrowLeft} from 'lucide-react';
import {useI18n} from '@/contexts/I18nContext';
import HeaderPublic from "@/components/HeaderPublic";

export default function CookiePolicyPage() {
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
                            aria-label={t('cookiePolicy.backButton')}
                        >
                            <ArrowLeft size={20}/>
                        </button>
                        <h1 className="text-4xl font-bold">{t('cookiePolicy.title')}</h1>
                    </div>
                    <p className="mt-2 text-sm opacity-80">{t('cookiePolicy.lastUpdated')} {today}</p>
                </div>

                <article
                    className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-8 space-y-8 prose prose-blue dark:prose-invert dark:text-dark-text-primary">
                    <section>
                        <h2>{t('cookiePolicy.definitions.title')}</h2>
                        <ul>
                            <li>
                                <strong>{t('cookiePolicy.definitions.cookies.title')}</strong> {t('cookiePolicy.definitions.cookies.description')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.definitions.personalData.title')}</strong> {t('cookiePolicy.definitions.personalData.description')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.definitions.dataSubject.title')}</strong> {t('cookiePolicy.definitions.dataSubject.description')}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.purpose.title')}</h2>
                        <p>
                            {t('cookiePolicy.purpose.description')}
                        </p>
                        <ul>
                            {(t('cookiePolicy.purpose.items') as unknown as string[]).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.cookieTypes.title')}</h2>

                        <h3>{t('cookiePolicy.cookieTypes.essential.title')}</h3>
                        <ul>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.essential.purpose')}</strong> {t('cookiePolicy.cookieTypes.essential.purposeDescription')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.essential.legalBasis')}</strong> {t('cookiePolicy.cookieTypes.essential.legalBasisDescription')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.essential.storage')}</strong> {t('cookiePolicy.cookieTypes.essential.storageDescription')}
                            </li>
                        </ul>

                        <h3>{t('cookiePolicy.cookieTypes.performance.title')}</h3>
                        <ul>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.performance.purpose')}</strong> {t('cookiePolicy.cookieTypes.performance.purposeDescription')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.performance.legalBasis')}</strong> {t('cookiePolicy.cookieTypes.performance.legalBasisDescription')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.performance.note')}</strong> {t('cookiePolicy.cookieTypes.performance.noteDescription')}
                            </li>
                        </ul>

                        <h3>{t('cookiePolicy.cookieTypes.marketing.title')}</h3>
                        <ul>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.marketing.purpose')}</strong> {t('cookiePolicy.cookieTypes.marketing.purposeDescription')}
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.cookieTypes.marketing.legalBasis')}</strong> {t('cookiePolicy.cookieTypes.marketing.legalBasisDescription')}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.cookieManagement.title')}</h2>
                        <ul>
                            <li>
                                <strong>{t('cookiePolicy.cookieManagement.userControl.title')}</strong> {t('cookiePolicy.cookieManagement.userControl.description')}
                                <ul className="mt-2 list-disc ml-6">
                                    <li>
                                        <a
                                            href="https://support.google.com/chrome/answer/95647"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t('cookiePolicy.cookieManagement.userControl.browsers.chrome')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t('cookiePolicy.cookieManagement.userControl.browsers.firefox')}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t('cookiePolicy.cookieManagement.userControl.browsers.safari')}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>{t('cookiePolicy.cookieManagement.consentTool.title')}</strong> {t('cookiePolicy.cookieManagement.consentTool.description')}
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.dataAndSharing.title')}</h2>
                        <p>
                            {t('cookiePolicy.dataAndSharing.description')}
                        </p>
                        <p>
                            <strong>{t('cookiePolicy.dataAndSharing.sharing.title')}</strong> {t('cookiePolicy.dataAndSharing.sharing.description')}
                        </p>
                        <ul>
                            {(t('cookiePolicy.dataAndSharing.sharingItems') as unknown as string[]).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.retentionPeriod.title')}</h2>
                        <p>
                            {t('cookiePolicy.retentionPeriod.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.dataSubjectRights.title')}</h2>
                        <p>{t('cookiePolicy.dataSubjectRights.description')}</p>
                        <ul>
                            {(t('cookiePolicy.dataSubjectRights.rights') as unknown as string[]).map((right, index) => (
                                <li key={index}>{right}</li>
                            ))}
                        </ul>
                        <p>
                            <strong>{t('cookiePolicy.dataSubjectRights.howToExercise.title')}</strong> {t('cookiePolicy.dataSubjectRights.howToExercise.description')}{' '}
                            <a
                                href="mailto:contato@nidussolutions.com"
                                className="text-blue-600 hover:underline"
                            >
                                contato@nidussolutions.com
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.updates.title')}</h2>
                        <p>
                            {t('cookiePolicy.updates.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('cookiePolicy.contact.title')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-2"/>
                                <address className="not-italic">
                                    {t('cookiePolicy.contact.address.street')}
                                    <br/>
                                    {t('cookiePolicy.contact.address.neighborhood')}
                                    <br/>
                                    {t('cookiePolicy.contact.address.zipCode')}
                                    <br/>
                                    {t('cookiePolicy.contact.address.city')}
                                </address>
                            </div>
                            <div className="flex items-start">
                                <Building className="w-6 h-6 text-blue-600 mt-1 mr-2"/>
                                <div>
                                    <p>
                                        <strong>{t('cookiePolicy.contact.company.name')}</strong>
                                    </p>
                                    <p>{t('cookiePolicy.contact.company.cnpj')}</p>
                                    <p>
                                        {t('cookiePolicy.contact.company.email')}{' '}
                                        <a
                                            href="mailto:contato@nidus.com.br"
                                            className="text-blue-600 hover:underline"
                                        >
                                            contato@nidus.com.br
                                        </a>
                                    </p>
                                    <p>
                                        {t('cookiePolicy.contact.company.dpo')}{' '}
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
                            {t('cookiePolicy.contact.compliance')}
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}

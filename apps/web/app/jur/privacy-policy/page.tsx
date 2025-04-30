'use client';

import {MapPin, Building, ArrowLeft} from 'lucide-react';
import {useI18n} from '@/contexts/I18nContext';
import HeaderPublic from "@/components/HeaderPublic";

export default function PrivacyPolicyPage() {
    const {t, language} = useI18n();

    const today = new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-900 flex flex-col">
            <HeaderPublic/>
            <div className="max-w-4xl mx-auto mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-8">
                    <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                        <button
                            onClick={() => window.history.back()}
                            className="hover:text-light-text-primary transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400 text-white rounded-full "
                            aria-label={t('privacyPolicy.backButton')}
                        >
                            <ArrowLeft size={20}/>
                        </button>
                        <h1 className="text-4xl font-bold text-white dark:text-dark-text-primary">
                            {t('privacyPolicy.title')}</h1>
                    </div>
                    <p className="mt-2 text-sm opacity-80">{t('privacyPolicy.lastUpdated')} {today}</p>
                </div>
                <article
                    className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-8 space-y-8 prose prose-blue dark:prose-invert dark:text-dark-text-primary">
                    <section>
                        <h2>{t('privacyPolicy.introduction.title')}</h2>
                        <p>
                            A <strong>{t('privacyPolicy.introduction.company')}</strong> {t('privacyPolicy.introduction.companyDescription')}
                            <strong> {t('privacyPolicy.introduction.website')}</strong>, {t('privacyPolicy.introduction.valueStatement')}{' '}
                            <strong>
                                {t('privacyPolicy.introduction.law')}
                            </strong>{' '}
                            {t('privacyPolicy.introduction.otherLaws')}
                        </p>
                        <p>
                            {t('privacyPolicy.introduction.agreement')}
                        </p>
                    </section>

                    <section>
                        <h2>2. Dados Coletados</h2>
                        <ul>
                            <li>
                                <strong>Dados fornecidos voluntariamente</strong>: Nome, e-mail,
                                telefone, dados de cadastro e outras informações enviadas via
                                formulários ou contato direto.
                            </li>
                            <li>
                                <strong>Dados de navegação</strong>: Endereço IP, tipo de
                                navegador, páginas acessadas, tempo de visita e cookies
                                (conforme nossa{' '}
                                <a
                                    href="/politica-de-cookies"
                                    className="text-blue-600 hover:underline"
                                >
                                    Política de Cookies
                                </a>
                                ).
                            </li>
                            <li>
                                <strong>Dados de transações</strong>: Em caso de compras ou
                                assinaturas, informações financeiras (processadas por gateways
                                de pagamento terceirizados).
                            </li>
                        </ul>
                        <p>
                            <strong>Dados sensíveis</strong>: Não coletamos intencionalmente
                            dados sensíveis (ex: origem racial, opinião política, saúde),
                            salvo com consentimento explícito e fundamentação legal.
                        </p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.processingPurposes.title')}</h2>
                        <ul>
                            {(t('privacyPolicy.processingPurposes.purposes') as unknown as string[]).map((purpose, index) => (
                                <li key={index}>{purpose}</li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.dataSharing.title')}</h2>
                        <ul>
                            <li>
                                <strong>{t('privacyPolicy.dataSharing.servicePartners')}</strong>: {t('privacyPolicy.dataSharing.servicePartnersDescription')}
                            </li>
                            <li>
                                <strong>{t('privacyPolicy.dataSharing.legalObligations')}</strong>: {t('privacyPolicy.dataSharing.legalObligationsDescription')}
                            </li>
                            <li>
                                <strong>{t('privacyPolicy.dataSharing.withConsent')}</strong>: {t('privacyPolicy.dataSharing.withConsentDescription')}
                            </li>
                        </ul>
                        <p>{t('privacyPolicy.dataSharing.note')}</p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.dataSubjectRights.title')}</h2>
                        <ul>
                            {(t('privacyPolicy.dataSubjectRights.rights') as unknown as string[]).map((right, index) => (
                                <li key={index}>{right}</li>
                            ))}
                        </ul>
                        <p>
                            {t('privacyPolicy.dataSubjectRights.contact')}{' '}
                            <a
                                href="mailto:contato@nidus.com.br"
                                className="text-blue-600 hover:underline"
                            >
                                contato@nidus.com.br
                            </a>
                            . {t('privacyPolicy.dataSubjectRights.response')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.securityMeasures.title')}</h2>
                        <ul>
                            {(t('privacyPolicy.securityMeasures.measures') as unknown as string[]).map((measure, index) => (
                                <li key={index}>{measure}</li>
                            ))}
                        </ul>
                        <p>
                            {t('privacyPolicy.securityMeasures.note')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.dataRetention.title')}</h2>
                        <p>
                            {t('privacyPolicy.dataRetention.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.cookies.title')}</h2>
                        <p>
                            {t('privacyPolicy.cookies.description')}{' '}
                            <a
                                href="/politica-de-cookies"
                                className="text-blue-600 hover:underline"
                            >
                                {t('privacyPolicy.cookies.cookiePolicy')}
                            </a>{' '}
                            {t('privacyPolicy.cookies.forDetails')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.policyChanges.title')}</h2>
                        <p>
                            {t('privacyPolicy.policyChanges.description')}
                        </p>
                    </section>

                    <section>
                        <h2>{t('privacyPolicy.contact.title')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            <div className="flex items-start">
                                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-2"/>
                                <address className="not-italic">
                                    {t('privacyPolicy.contact.address.street')}
                                    <br/>
                                    {t('privacyPolicy.contact.address.neighborhood')}
                                    <br/>
                                    {t('privacyPolicy.contact.address.zipCode')}
                                    <br/>
                                    {t('privacyPolicy.contact.address.city')}
                                </address>
                            </div>
                            <div className="flex items-start">
                                <Building className="w-6 h-6 text-blue-600 mt-1 mr-2"/>
                                <div>
                                    <p>
                                        <strong>{t('privacyPolicy.contact.company.name')}</strong>
                                    </p>
                                    <p>{t('privacyPolicy.contact.company.cnpj')}</p>
                                    <p>
                                        {t('privacyPolicy.contact.company.email')}{' '}
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
                            {t('privacyPolicy.contact.effectiveDate')}
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}

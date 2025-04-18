'use client';

import { MapPin, Building, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const today = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-8 flex flex-col">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-900 :opacity-80 transition hover:opacity-100 dark:text-white mb-8"
        >
          Legal Forge
        </Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-8">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <button
              onClick={() => window.history.back()}
              className="hover:text-blue-600 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-4xl font-bold">Política de Cookies</h1>
          </div>
          <p className="mt-2 text-sm opacity-80">Última atualização: {today}</p>
        </div>

        <article className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-8 space-y-8 prose prose-blue dark:prose-invert">
          <section>
            <h2>1. Definições</h2>
            <ul>
              <li>
                <strong>Cookies:</strong> Pequenos arquivos de texto armazenados
                no dispositivo do usuário ao acessar um site, contendo
                informações sobre sua navegação.
              </li>
              <li>
                <strong>Dados Pessoais:</strong> Qualquer informação relacionada
                a uma pessoa natural identificada ou identificável, nos termos
                da LGPD.
              </li>
              <li>
                <strong>Titular:</strong> Usuário do site legalforge.com,
                titular dos dados pessoais coletados por meio de cookies.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. Finalidade</h2>
            <p>
              Esta Política de Cookies tem por objetivo informar os usuários
              sobre:
            </p>
            <ul>
              <li>
                Os tipos de cookies utilizados pelo site{' '}
                <strong>legalforge.com</strong>;
              </li>
              <li>
                As finalidades para as quais esses cookies são empregados;
              </li>
              <li>
                Os direitos dos usuários em relação ao uso de cookies, conforme
                a LGPD.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Tipos de Cookies Utilizados</h2>

            <h3>3.1. Cookies Essenciais</h3>
            <ul>
              <li>
                <strong>Finalidade:</strong> Garantir o funcionamento técnico do
                site (ex.: autenticação, segurança, carregamento de páginas).
              </li>
              <li>
                <strong>Base Legal:</strong> Necessidade para execução de
                serviços solicitados (Art. 7º, II, LGPD).
              </li>
              <li>
                <strong>Armazenamento:</strong> Sessão ou persistentes.
              </li>
            </ul>

            <h3>3.2. Cookies de Desempenho e Análise</h3>
            <ul>
              <li>
                <strong>Finalidade:</strong> Coletar dados estatísticos sobre
                uso do site por meio de ferramentas como Google Analytics.
              </li>
              <li>
                <strong>Base Legal:</strong> Consentimento do usuário (Art. 7º,
                I, LGPD).
              </li>
              <li>
                <strong>Observação:</strong> Os dados são anonimizados sempre
                que possível.
              </li>
            </ul>

            <h3>3.3. Cookies de Marketing</h3>
            <ul>
              <li>
                <strong>Finalidade:</strong> Personalizar campanhas
                publicitárias com base no comportamento de navegação.
              </li>
              <li>
                <strong>Base Legal:</strong> Consentimento explícito (Art. 7º,
                I, LGPD).
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Gestão de Cookies</h2>
            <ul>
              <li>
                <strong>Controle pelo Usuário:</strong> O titular pode
                configurar seu navegador para bloquear ou eliminar cookies:
                <ul className="mt-2 list-disc ml-6">
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/pt-BR/kb/gerencie-configuracoes-de-armazenamento-local-de-s"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Safari
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>Ferramenta de Consentimento:</strong> Ao acessar o site,
                o usuário receberá um banner solicitando consentimento para
                cookies não essenciais, podendo revogá-lo a qualquer momento.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Dados Pessoais e Compartilhamento</h2>
            <p>
              Os dados coletados por cookies podem incluir endereço IP,
              localização aproximada e preferências de navegação.
            </p>
            <p>
              <strong>Compartilhamento:</strong> Os dados poderão ser
              compartilhados com:
            </p>
            <ul>
              <li>
                Prestadores de serviços terceirizados (ex.: Google Analytics),
                sob contratos de proteção de dados (Art. 26, LGPD);
              </li>
              <li>Autoridades competentes, se exigido por lei.</li>
            </ul>
          </section>

          <section>
            <h2>6. Prazo de Armazenamento</h2>
            <p>
              Os cookies serão mantidos pelo período necessário para cumprir
              suas finalidades, exceto se o usuário optar por excluí-los
              manualmente.
            </p>
          </section>

          <section>
            <h2>7. Direitos do Titular</h2>
            <p>Conforme a LGPD, o usuário tem direito a:</p>
            <ul>
              <li>
                Acessar, corrigir ou solicitar a exclusão de seus dados
                pessoais;
              </li>
              <li>Revogar consentimento para cookies não essenciais;</li>
              <li>Solicitar portabilidade ou anonimização dos dados.</li>
            </ul>
            <p>
              <strong>Como exercer:</strong> Enviar solicitação para o
              Encarregado de Dados (DPO) pelo e-mail:{' '}
              <a
                href="mailto:contato@nidussolutions.com"
                className="text-blue-600 hover:underline"
              >
                contato@nidussolutions.com
              </a>
            </p>
          </section>

          <section>
            <h2>8. Atualizações</h2>
            <p>
              Esta Política pode ser revisada periodicamente. Alterações serão
              comunicadas por meio de notificação no site ou por e-mail, quando
              aplicável.
            </p>
          </section>

          <section>
            <h2>Contato</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-2" />
                <address className="not-italic">
                  AVENIDA PAULISTA, 1106, SALA 01, ANDAR 16
                  <br />
                  Bairro Bela Vista
                  <br />
                  CEP 01310-914
                  <br />
                  São Paulo - SP
                </address>
              </div>
              <div className="flex items-start">
                <Building className="w-6 h-6 text-blue-600 mt-1 mr-2" />
                <div>
                  <p>
                    <strong>Nidus Solutions LTDA</strong>
                  </p>
                  <p>CNPJ: 57.581.208/0001-69</p>
                  <p>
                    E-mail:{' '}
                    <a
                      href="mailto:contato@nidus.com.br"
                      className="text-blue-600 hover:underline"
                    >
                      contato@nidus.com.br
                    </a>
                  </p>
                  <p>
                    DPO:{' '}
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
              Este documento foi elaborado em conformidade com a LGPD e as
              melhores práticas de privacidade e proteção de dados.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

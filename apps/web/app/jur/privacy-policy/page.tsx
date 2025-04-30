'use client';

import { MapPin, Building, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
      </div>{' '}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-8">
          <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
            <button
              onClick={() => window.history.back()}
              className="hover:text-blue-600 transition-colors duration-200 dark:text-gray-200 dark:hover:text-blue-400"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-4xl font-bold">Política de Privacidade</h1>
          </div>
          <p className="mt-2 text-sm opacity-80">Última atualização: {today}</p>
        </div>
        <article className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-8 space-y-8 prose prose-blue dark:prose-invert">
          <section>
            <h2>1. Introdução</h2>
            <p>
              A <strong>Nidus Solutions LTDA</strong> (&quot;Nós&quot;,
              &quot;Nosso&quot; ou &quot;Empresa&quot;), titular do site
              <strong> legalforge.com</strong>, valoriza a privacidade e a
              proteção de dados de seus usuários (&quot;Você&quot; ou
              &quot;Usuário&quot;). Esta Política de Privacidade
              (&quot;Política&quot;) descreve como coletamos, utilizamos,
              armazenamos e protegemos suas informações pessoais, em
              conformidade com a{' '}
              <strong>
                Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018)
              </strong>{' '}
              e outras normas aplicáveis.
            </p>
            <p>
              Ao acessar ou utilizar nosso site, você concorda expressamente com
              os termos desta Política. Caso não concorde, recomendamos que não
              utilize nossos serviços.
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
            <h2>3. Finalidades do Tratamento</h2>
            <ul>
              <li>Prestar serviços e responder solicitações;</li>
              <li>Personalizar sua experiência no site;</li>
              <li>
                Enviar comunicações (como newsletters, desde que autorizadas);
              </li>
              <li>Cumprir obrigações legais e regulatórias;</li>
              <li>Melhorar a segurança e funcionalidades do site.</li>
            </ul>
          </section>

          <section>
            <h2>4. Compartilhamento de Dados</h2>
            <ul>
              <li>
                <strong>Parceiros de serviços</strong>: Empresas terceirizadas
                que auxiliam na operação do site, sob contratos de
                confidencialidade;
              </li>
              <li>
                <strong>Obrigações legais</strong>: Cumprimento de ordens
                judiciais ou solicitações de autoridades competentes;
              </li>
              <li>
                <strong>Com seu consentimento</strong>: Em situações
                específicas, mediante autorização.
              </li>
            </ul>
            <p>Observação: Não comercializamos dados pessoais.</p>
          </section>

          <section>
            <h2>5. Direitos do Titular</h2>
            <ul>
              <li>Acesso, correção ou exclusão de seus dados;</li>
              <li>Portabilidade dos dados a outro fornecedor;</li>
              <li>Revogação do consentimento (quando aplicável);</li>
              <li>Oposição a tratamentos baseados em legítimo interesse;</li>
              <li>Informação sobre compartilhamentos realizados.</li>
            </ul>
            <p>
              Para exercer esses direitos, entre em contato pelo e-mail{' '}
              <a
                href="mailto:contato@nidus.com.br"
                className="text-blue-600 hover:underline"
              >
                contato@nidus.com.br
              </a>
              . Responderemos em até 15 dias úteis.
            </p>
          </section>

          <section>
            <h2>6. Medidas de Segurança</h2>
            <ul>
              <li>Criptografia de informações;</li>
              <li>Limitação de acesso a pessoas autorizadas;</li>
              <li>Monitoramento contra acessos não autorizados.</li>
            </ul>
            <p>
              Observação: Nenhum sistema é 100% invulnerável. Em caso de
              incidentes de segurança, comunicaremos os fatos e as ações
              tomadas.
            </p>
          </section>

          <section>
            <h2>7. Retenção de Dados</h2>
            <p>
              Seus dados serão armazenados enquanto necessário para as
              finalidades descritas ou por obrigações legais. Ao final do prazo,
              serão anonimizados ou excluídos com segurança.
            </p>
          </section>

          <section>
            <h2>8. Cookies e Tecnologias Semelhantes</h2>
            <p>
              Utilizamos cookies para melhorar a experiência no site. Você pode
              gerenciar suas preferências nas configurações do navegador.
              Consulte nossa{' '}
              <a
                href="/politica-de-cookies"
                className="text-blue-600 hover:underline"
              >
                Política de Cookies
              </a>{' '}
              para detalhes.
            </p>
          </section>

          <section>
            <h2>9. Alterações nesta Política</h2>
            <p>
              Esta Política pode ser atualizada para refletir mudanças legais ou
              operacionais. A versão atualizada será publicada no site, com data
              de revisão destacada.
            </p>
          </section>

          <section>
            <h2>10. Contato</h2>
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
                </div>
              </div>
            </div>
            <p className="mt-8 italic text-sm">
              Esta Política entra em vigor a partir da data de publicação.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

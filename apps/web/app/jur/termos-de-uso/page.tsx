'use client';

import { MapPin, Building, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfUsePage() {
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
            <h1 className="text-4xl font-bold">Termos de Uso</h1>
          </div>
          <p className="mt-2 text-sm opacity-80">Última atualização: {today}</p>
        </div>
        <article className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg p-8 space-y-8 prose prose-blue dark:prose-invert">
          <section>
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar o site <strong>LEGALFORGE.COM</strong>, de
              propriedade da <strong>NIDUS SOLUTIONS LTDA</strong>, você
              concorda expressamente com estes Termos de Uso e com nossa{' '}
              <a
                href="/jur/politica-de-privacidade"
                className="text-blue-600 hover:underline"
              >
                Política de Privacidade
              </a>
              . Caso não concorde, recomendamos cessar imediatamente o uso do
              site.
            </p>
          </section>

          <section>
            <h2>2. Finalidade do Site</h2>
            <p>
              O LEGALFORGE.COM oferece conteúdos, ferramentas e modelos de
              documentos jurídicos apenas para fins educativos e informativos,
              não constituindo aconselhamento jurídico.
            </p>
          </section>

          <section>
            <h2>3. Obrigações do Usuário</h2>
            <ul>
              <li>Usar o site para fins lícitos;</li>
              <li>Não reproduzir ou distribuir conteúdos sem autorização;</li>
              <li>Fornecer dados verídicos quando solicitado;</li>
              <li>
                Responsabilizar-se por atividades realizadas sob seu login (se
                aplicável).
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo do site pertence à NIDUS SOLUTIONS LTDA ou a
              terceiros licenciados. Uso indevido configura violação de direitos
              autorais.
            </p>
          </section>

          <section>
            <h2>5. Limitação de Responsabilidade</h2>
            <ul>
              <li>Danos decorrentes do uso ou incapacidade de uso do site;</li>
              <li>Conteúdos de terceiros vinculados ao site;</li>
              <li>Falhas técnicas, vírus ou indisponibilidades temporárias.</li>
            </ul>
          </section>

          <section>
            <h2>6. Privacidade e Proteção de Dados</h2>
            <p>
              O tratamento de dados está de acordo com a{' '}
              <strong>
                Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)
              </strong>
              . Veja nossa{' '}
              <a
                href="/jur/politica-de-privacidade"
                className="text-blue-600 hover:underline"
              >
                Política de Privacidade
              </a>
              .
            </p>
            <p>
              Para exercer seus direitos como titular de dados, envie e-mail
              para:{' '}
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
            <h2>7. Disposições Gerais</h2>
            <ul>
              <li>
                <strong>Modificações</strong>: Estes termos podem ser alterados
                unilateralmente, com aviso prévio no site;
              </li>
              <li>
                <strong>Rescisão</strong>: Podemos suspender o acesso do usuário
                em caso de descumprimento dos termos;
              </li>
              <li>
                <strong>Foro</strong>: Disputas serão resolvidas no Foro da
                Comarca de São Paulo/SP.
              </li>
            </ul>
            <p>
              Em caso de dúvidas, entre em contato via:{' '}
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
            <h2>Informações da Empresa</h2>
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
              Documento elaborado em conformidade com as legislações vigentes,
              em especial a LGPD.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}

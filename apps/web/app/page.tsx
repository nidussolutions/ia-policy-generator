'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Globe, Code2 } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function HomePage() {

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center">
      <header className="w-full max-w-5xl py-6 px-4 flex items-center justify-center ">
        <motion.div
          className="text-2xl font-bold"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0.1}
        >
          <motion.h1
            className="text-blue-600 dark:text-blue-500"
            variants={fadeInUp}
            custom={0.1}
          >
            Legal Forge
          </motion.h1>
        </motion.div>
      </header>

      <section
        className="relative w-full flex items-center justify-center text-center py-32 sm:py-48 px-4 bg-fixed bg-[url('/bg-hero.jpg')] bg-cover bg-center dark:bg-blend-darken dark:bg-gray-900/70"
        style={{ backgroundAttachment: 'fixed' }}
      >
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0.1}
        >
          <motion.h1 className="text-4xl sm:text-5xl font-bold text-white">
            Gere políticas legais para seu site com inteligência artificial
          </motion.h1>

          <motion.p
            className="text-lg text-white/80 mt-6 mb-10"
            variants={fadeInUp}
            custom={0.2}
          >
            Em segundos, gere documentos como Política de Privacidade, Termos de
            Uso e Banner de Cookies personalizados e em conformidade com a LGPD
            e GDPR.
          </motion.p>

          <motion.div variants={fadeInUp} custom={0.3}>
            <Link href="/auth/login">
              <button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer">
                Comece agora gratuitamente
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        className="w-full max-w-5xl py-24 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0.2}
      >
        {[
          {
            title: '100% Personalizado',
            desc: 'Adapte os documentos ao seu negócio, site ou app com precisão.',
            icon: (
              <ShieldCheck className="mx-auto mb-4 w-10 h-10 text-blue-500" />
            ),
          },
          {
            title: 'Conforme LGPD e GDPR',
            desc: 'Geramos documentos com base nas leis de privacidade mais atuais.',
            icon: <Globe className="mx-auto mb-4 w-10 h-10 text-green-500" />,
          },
          {
            title: 'Integração fácil',
            desc: 'Use um link público ou incorpore o conteúdo no seu site.',
            icon: <Code2 className="mx-auto mb-4 w-10 h-10 text-purple-500" />,
          },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeInUp} custom={index * 0.2}>
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        className="py-24 max-w-4xl w-full px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0.3}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Como funciona?</h2>
        <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300 text-lg">
          <li>Crie uma conta rapidamente</li>
          <li>Adicione seu site ou app</li>
          <li>Gere documentos com um clique</li>
          <li>Copie o link público ou incorpore no seu site</li>
        </ol>
      </motion.section>

      <motion.section
        className="w-full max-w-5xl py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0.3}
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Escolha seu plano
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <motion.div
            className="border rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800"
            variants={fadeInUp}
            custom={0.1}
          >
            <h3 className="text-2xl font-semibold mb-2">Gratuito</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">R$ 0 / mês</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Ideal para testar a plataforma
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>✔️ 1 documento gerado</li>
              <li>✔️ 1 site adicionado</li>
              <li>✔️ 1.000 caracteres de IA</li>
              <li>✔️ IA básica</li>
            </ul>
            <Link href="/auth/register">
              <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer">
                Começar grátis
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="border-2 border-blue-600 rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900"
            variants={fadeInUp}
            custom={0.2}
          >
            <h3 className="text-2xl font-semibold mb-2 text-blue-600">Pro</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-1">R$ 15 / mês</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Para projetos profissionais e uso contínuo
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>✔️ Documentos ilimitados</li>
              <li>✔️ Até 10 sites cadastrados</li>
              <li>✔️ Sem limite de caracteres de IA</li>
              <li>✔️ IA avançada</li>
            </ul>
            <Link href="/auth/register">
              <button
                disabled
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                No momento apenas entrando em contato
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="text-center py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0.4}
      >
        <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Crie seus documentos agora mesmo, sem complicação.
        </p>
        <Link href="/auth/login">
          <button className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer">
            Criar conta grátis
          </button>
        </Link>
      </motion.section>
    </main>
  );
}

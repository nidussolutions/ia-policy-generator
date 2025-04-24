'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ShieldCheck, Globe, Code2} from 'lucide-react';

const fadeInUp = {
    hidden: {opacity: 0, y: 30},
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {delay, duration: 0.6, ease: 'easeOut'},
    }),
};

export default function HomePage() {

    return (
        <main
            className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white flex flex-col items-center justify-center">
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
                style={{backgroundAttachment: 'fixed'}}
            >
                <motion.div
                    className="max-w-2xl"
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    custom={0.1}
                >
                    <motion.h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Generate legal policies for your website with artificial intelligence
                    </motion.h1>

                    <motion.p
                        className="text-lg text-white/80 mt-6 mb-10"
                        variants={fadeInUp}
                        custom={0.2}
                    >
                        In seconds, generate documents like Privacy Policy, Terms of Service, and Cookie Banners,
                        tailored and compliant with LGPD and GDPR.
                    </motion.p>

                    <motion.div variants={fadeInUp} custom={0.3}>
                        <Link href="/auth/login">
                            <button
                                className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer">
                                Get started for free
                            </button>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            <motion.section
                className="w-full max-w-5xl py-24 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={fadeInUp}
                custom={0.2}
            >
                {[
                    {
                        title: '100% Customizable',
                        desc: 'Tailor the documents to your business, website, or app with precision.',
                        icon: (
                            <ShieldCheck className="mx-auto mb-4 w-10 h-10 text-blue-500"/>
                        ),
                    },
                    {
                        title: 'Compliant with LGPD and GDPR',
                        desc: 'We generate documents based on the latest privacy laws.',
                        icon: <Globe className="mx-auto mb-4 w-10 h-10 text-green-500"/>,
                    },
                    {
                        title: 'Easy Integration',
                        desc: 'Use a public link or embed the content directly on your site.',
                        icon: <Code2 className="mx-auto mb-4 w-10 h-10 text-purple-500"/>,
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
                viewport={{once: true}}
                variants={fadeInUp}
                custom={0.3}
            >
                <h2 className="text-3xl font-bold text-center mb-6">How it works?</h2>
                <ol className="space-y-4 list-decimal list-inside text-gray-700 dark:text-gray-300 text-lg">
                    <li>Create an account quickly</li>
                    <li>Add your website or app</li>
                    <li>Generate documents with a click</li>
                    <li>Copy the public link or embed it on your site</li>
                </ol>
            </motion.section>

            <motion.section
                className="w-full max-w-5xl py-24 px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={fadeInUp}
                custom={0.3}
            >
                <h2 className="text-3xl font-bold text-center mb-12">
                    Choose your plan
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <motion.div
                        className="border rounded-2xl p-6 shadow-sm bg-white dark:bg-gray-800"
                        variants={fadeInUp}
                        custom={0.1}
                    >
                        <h3 className="text-2xl font-semibold mb-2">Free</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">$ 0 / month</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Ideal for testing the platform
                        </p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>✔️ 1 document generated</li>
                            <li>✔️ 1 site added</li>
                            <li>✔️ 1,000 characters of AI</li>
                            <li>✔️ Basic AI</li>
                        </ul>
                        <Link href="/auth/register">
                            <button
                                className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer">
                                Start for free
                            </button>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="border-2 border-blue-600 rounded-2xl p-6 shadow-md bg-white dark:bg-gray-900"
                        variants={fadeInUp}
                        custom={0.2}
                    >
                        <h3 className="text-2xl font-semibold mb-2 text-blue-600">Pro</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">$ 5 / month</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            For professional projects and continuous use
                        </p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                            <li>✔️ Unlimited documents</li>
                            <li>✔️ Up to 10 sites added</li>
                            <li>✔️ No limit on AI characters</li>
                            <li>✔️ Advanced AI</li>
                        </ul>
                        <Link href={{pathname: '/auth/register', query: {redirect: true}}}>
                            <button
                                className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Subscribe now
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="text-center py-24"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={fadeInUp}
                custom={0.4}
            >
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="mb-8 text-gray-600 dark:text-gray-400">
                    Create your documents now, hassle-free.
                </p>
                <Link href="/auth/login">
                    <button
                        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer">
                        Create a free account
                    </button>
                </Link>
            </motion.section>
        </main>
    );
}

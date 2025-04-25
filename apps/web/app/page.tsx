'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ShieldCheck, Globe, Code2} from 'lucide-react';

const containerVariants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.1}},
};

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 100, damping: 12}},
};

export default function HomePage() {
    return (
        <main
            className="min-h-screen flex flex-col bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] text-gray-200"
        >
            {/* Navbar */}
            <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
                <div className="text-2xl font-bold text-white">
                    <Link href='/'>
                        Legal Forge
                    </Link>
                </div>
                <nav className="hidden md:flex space-x-8 text-gray-300 ">
                    <Link href="#features" className="hover:text-white transition">Features</Link>
                    <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
                    <Link href="#about" className="hover:text-white transition">About Us</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href="/auth/login">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm"
                            variants={itemVariants}
                        >
                            Get Started
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{scale: 1.05}}
                            className="px-6 py-2 border border-gray-500 rounded-full font-medium hover:border-white transition"
                            variants={itemVariants}
                        >
                            Talk to an Expert
                        </motion.button>
                    </Link>
                </div>
            </header>

            {/* Hero */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                <motion.p
                    className="uppercase mb-4 text-sm tracking-wider text-[#8C0368]/80"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    We have already generated more than 1K documents.
                </motion.p>
                <motion.h1
                    className="text-4xl md:text-6xl font-extrabold mb-6 max-w-3xl leading-tight"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    Generate legal policies for your website with AI
                </motion.h1>
                <motion.p
                    className="max-w-xl text-gray-400 mb-8"
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                >
                    In seconds, create Privacy Policies, Terms of Service, and Cookie Banners that are fully compliant
                    with LGPD & GDPR.
                </motion.p>
                <div className="flex space-x-4">
                    <Link href="/auth/login">
                        <motion.button
                            className="px-8 py-3 bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm hover:scale-105 transition-transform"
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            Get Started for Free
                        </motion.button>
                    </Link>
                    <Link href="/contact">
                        <motion.button
                            className="px-8 py-3 border border-gray-500 rounded-full font-medium hover:border-white transition-transform"
                            initial="hidden"
                            animate="visible"
                            variants={itemVariants}
                        >
                            Talk to an Expert
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <motion.section
                id="features"
                className="w-full max-w-6xl mx-auto py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                    variants={itemVariants}
                >
                    Features
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-[#1E0359]/30 rounded-2xl"
                        variants={itemVariants}>
                        <ShieldCheck className="w-12 h-12 mb-4 text-[#8C0368]"/>
                        <h3 className="text-xl font-semibold mb-2 text-white">100% Customizable</h3>
                        <p className="text-gray-300">Tailor documents precisely to your business needs.</p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-[#1E0359]/30 rounded-2xl"
                        variants={itemVariants}>
                        <Globe className="w-12 h-12 mb-4 text-[#A429A6]"/>
                        <h3 className="text-xl font-semibold mb-2 text-white">LGPD & GDPR Compliant</h3>
                        <p className="text-gray-300">Stay up to date with global privacy regulations.</p>
                    </motion.div>
                    <motion.div
                        className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-[#1E0359]/30 rounded-2xl"
                        variants={itemVariants}>
                        <Code2 className="w-12 h-12 mb-4 text-[#471ED9]"/>
                        <h3 className="text-xl font-semibold mb-2 text-white">Easy Integration</h3>
                        <p className="text-gray-300">Embed or link directly – no coding required.</p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Pricing Section */}
            <motion.section
                id="pricing"
                className="w-full max-w-6xl mx-auto py-24 px-4 bg-[#030526]/30 backdrop-blur-lg rounded-2xl shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                           variants={itemVariants}>
                    Pricing
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <motion.div className="p-8 bg-[#1E0359]/30 rounded-2xl text-center" variants={itemVariants}>
                        <h3 className="text-2xl font-semibold mb-2 text-white">Free</h3>
                        <p className="text-lg font-bold mb-4 text-[#8C0368]">$0 / month</p>
                        <ul className="space-y-2 text-gray-300 mb-6">
                            <li>1 document</li>
                            <li>1 site</li>
                            <li>1,000 characters</li>
                            <li>Basic AI</li>
                        </ul>
                        <Link href="/auth/register">
                            <motion.button
                                className="w-full py-3 bg-[#8C0368] rounded-full font-medium hover:scale-105 transition-transform"
                                variants={itemVariants}>
                                Start for Free
                            </motion.button>
                        </Link>
                    </motion.div>

                    <motion.div className="p-8 bg-[#1E0359]/30 rounded-2xl text-center border-2 border-[#A429A6]"
                                variants={itemVariants}>
                        <h3 className="text-2xl font-semibold mb-2 text-white">Pro</h3>
                        <p className="text-lg font-bold mb-4 text-[#A429A6]">$5 / month</p>
                        <ul className="space-y-2 text-gray-300 mb-6">
                            <li>Unlimited documents</li>
                            <li>Up to 10 sites</li>
                            <li>No character limits</li>
                            <li>Advanced AI</li>
                        </ul>
                        <Link href="/auth/register?redirect=true">
                            <motion.button
                                className="w-full py-3 bg-[#A429A6] rounded-full font-medium hover:scale-105 transition-transform"
                                variants={itemVariants}>
                                Subscribe Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>

            {/* About Us Section */}
            <motion.section
                id="about"
                className="w-full max-w-6xl mx-auto py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
                variants={containerVariants}
            >
                <motion.h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                           variants={itemVariants}>
                    About Us
                </motion.h2>
                <motion.p className="max-w-2xl mx-auto text-center text-gray-300 mb-8" variants={itemVariants}>
                    Legal Forge was born with the mission of simplifying the creation of legal policies for websites and
                    applications, using artificial intelligence to deliver accurate, updated and personalized documents
                    in seconds.
                </motion.p>
                <div className="flex justify-center gap-14 items-center">
                    {[
                        {name: 'João Gustavo', role: 'CEO & Founder', image: '/team/joao.png'},
                        {name: 'Thiago Viana', role: 'CMO & Founder', image: '/team/thiago.png'},
                    ].map((member, idx) => (
                        <motion.div key={idx} className="text-center" variants={itemVariants}>
                            <div className="w-24 h-24 mx-auto mb-4 rounded-full">
                                <img
                                    alt={member.name}
                                    src={member.image}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                            <p className="text-gray-400">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </main>
    );
}

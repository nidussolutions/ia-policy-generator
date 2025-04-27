'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // integrar com um backend ou API de email
    console.log('Formulário enviado:', form);
    alert('Mensagem enviada com sucesso!');
    setForm({ name: '', phone: '', subject: '', message: '' });
  };

  return (
    <main>
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
        <div className="text-2xl font-bold text-white">
          <Link href="/">Legal Forge</Link>
        </div>
        <nav className="hidden md:flex space-x-8 text-gray-300 ">
          <Link href="/#features" className="hover:text-white transition">
            Features
          </Link>
          <Link href="/#pricing" className="hover:text-white transition">
            Pricing
          </Link>
          <Link href="/#about" className="hover:text-white transition">
            About Us
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 bg-[#8C0368] rounded-full font-medium shadow-lg backdrop-blur-sm"
              variants={itemVariants}
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 border border-gray-500 rounded-full font-medium hover:border-white transition"
              variants={itemVariants}
            >
              Talk to an Expert
            </motion.button>
          </Link>
        </div>
      </header>
      <div className="min-h-screen bg-gradient-to-b from-[#030526] via-[#1E0359] to-[#030526] py-16 px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto bg-[#1E0359]/40 p-8 rounded-2xl backdrop-blur-md border border-[#8C0368]/30 shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Entre em Contato
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-[#79d3d3] focus:border-[#79d3d3]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-[#79d3d3] focus:border-[#79d3d3]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Assunto
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-[#79d3d3] focus:border-[#79d3d3]"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Mensagem
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-[#79d3d3] focus:border-[#79d3d3]"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-[#79d3d3] text-black font-semibold py-2 rounded-lg transition shadow hover:shadow-md"
            >
              Enviar Mensagem
            </motion.button>
          </form>
        </motion.div>
      </div>
    </main>
  );
}

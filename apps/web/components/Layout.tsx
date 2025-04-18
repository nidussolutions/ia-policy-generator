'use client';

import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 bg-white text-black dark:bg-gray-950 dark:text-white mb-8">
      <Header />
      <main className="p-6 mt-8 max-w-5xl mx-auto dark:bg-blend-darken dark:bg-gray-900/70 rounded-lg shadow-md  ">
        {children}
      </main>
    </div>
  );
}

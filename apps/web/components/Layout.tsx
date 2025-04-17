'use client';

import Header from './Header';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 bg-white text-black">
      <Header />
      <main className="p-6 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}

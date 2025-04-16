import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="p-6 max-w-5xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

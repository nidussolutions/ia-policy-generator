import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadown-sm py-4 px-6 flex justify-between items-center stick top-0 z-50">
      <Link href="/" className="text-xl font-bold text-gray-800">
        Legal Forge
      </Link>
      <nav className="space-x-6">
        <Link
          href="/dashboard"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Dashboard
        </Link>
        <Link
          href="/sites"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Sites
        </Link>
        <Link href="/logout" className="text-red-500 hover:underline">
          Sair
        </Link>
      </nav>
    </header>
  );
}

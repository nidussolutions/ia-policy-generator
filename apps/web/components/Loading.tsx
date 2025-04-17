import Header from './Header';

interface LoadingProps {
  page: string;
}

export default function Loading({ page }: LoadingProps) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
              |
            </div>
          </div>
          <p className="text-xl text-gray-700">Carregando {page}...</p>
          <p className="mt-2 text-sm text-gray-600">
            Por favor, aguarde enquanto estamos preparando a página.
          </p>
        </div>
      </div>
    </div>
  );
}

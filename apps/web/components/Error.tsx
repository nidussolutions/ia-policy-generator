import Header from './Header';

interface ErrorProps {
  page: string;
  err: string;
}

export default function Error({ page, err }: ErrorProps) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center p-8">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Oops! Algo deu errado ao carregar a página {page}.
          </h2>
          <p className="text-sm text-gray-600">
            Não conseguimos carregar o conteúdo devido ao seguinte erro:
          </p>
          <p className="mt-2 text-sm text-gray-800 bg-gray-100 p-4 rounded-md">
            {err}
          </p>
        </div>
      </div>
    </div>
  );
}

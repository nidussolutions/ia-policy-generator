import Header from './Header';

interface LoadingProps {
  page: string;
}

export default function Loading({ page }: LoadingProps) {
  return (
    <div>
      <Header />
      <div className="p-8 text-gray-700 flex justify-center ">
        <p>Carregando {page}...</p>
      </div>
    </div>
  );
}

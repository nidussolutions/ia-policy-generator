import Header from './Header';

interface LoadingProps {
  page: string;
}

export default function Loading({ page }: LoadingProps) {
  return (
      <div className="flex flex-col dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="flex-grow flex items-center justify-center p-8 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-800">
            <div className="flex justify-center mb-4 items-center">
              <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
                |
              </div>
            </div>
            <p className="text-xl text-gray-700 dark:text-white font-semibold mb-4">
              Loading {page}...
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please wait while we are preparing the page.
            </p>
          </div>
        </div>
      </div>
  );
}

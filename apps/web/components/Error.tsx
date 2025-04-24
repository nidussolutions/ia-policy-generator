import Header from './Header';

interface ErrorProps {
  page: string;
  err: string;
}

export default function Error({ page, err }: ErrorProps) {
  return (
      <div className="flex flex-col dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center p-8 items-center">
          <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              Oops! Something went wrong while loading the {page} page.
            </h2>
            <p className="text-sm text-gray-600">
              We couldn't load the content due to the following error:
            </p>
            <p className="mt-2 text-sm text-gray-800 bg-gray-100 p-4 rounded-md shadow-sm">
              {err}
            </p>
          </div>
        </div>
      </div>
  );
}

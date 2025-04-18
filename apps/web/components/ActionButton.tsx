import { HTMLAttributes } from 'react';

export default function ActionButton({
  text,
  onClick,
  ...props
}: {
  text: string;
  onClick: () => void;
  [key: string]: string | (() => void) | HTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={` bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600 ${props!.className}`}
    >
      {text}
    </button>
  );
}

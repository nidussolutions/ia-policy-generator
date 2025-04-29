import {ButtonHTMLAttributes} from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick: () => void;
}

export default function ActionButton({text, onClick, className = '', ...props}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-light-accent-purple dark:bg-dark-accent-purple text-light-background dark:text-dark-text-primary py-3 px-6 rounded-full shadow-lg transition-transform hover:bg-light-accent-blue dark:hover:bg-dark-accent-blue ${className}`}
            {...props}
        >
            {text}
        </button>
    );
}

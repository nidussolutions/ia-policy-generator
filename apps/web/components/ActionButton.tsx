import {ButtonHTMLAttributes} from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    onClick: () => void;
}

export default function ActionButton({text, onClick, className = '', ...props}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-[#8C0368] text-white py-3 px-6 rounded-full shadow-lg transition-transform hover:bg-[#A429A6] ${className}`}
            {...props}
        >
            {text}
        </button>
    );
}
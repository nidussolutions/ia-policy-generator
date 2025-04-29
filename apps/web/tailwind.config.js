/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // Light theme colors
                light: {
                    background: '#FFFFFF',
                    text: {
                        primary: '#222222',
                        secondary: '#666666',
                    },
                    border: '#E0E0E0' ,
                    card: '#F9FAFB',
                    accent: {
                        blue: '#3B82F6',
                        purple: '#7C3AED',
                    },
                },
                // Dark theme colors
                dark: {
                    background: '#18181B',
                    text: {
                        primary: '#F3F4F6',
                        secondary: '#A1A1AA',
                    },
                    border: '#27272A',
                    card: '#23232A',
                    disabled: '#27272A',
                    accent: {
                        blue: '#3B82F6',
                        purple: '#6366F1',
                    },
                },
            },
        },
    },
    plugins: [],
}

'use client';
import React, {createContext, useContext, useState, useEffect} from 'react';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    // Check for system preference
    const getInitialTheme = () => {
        // Check if we're in the browser
        if (typeof window !== 'undefined') {
            // Check for saved theme in localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                return savedTheme;
            }

            // Check for system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }

        // Default to light
        return 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        // Apply theme class to document
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

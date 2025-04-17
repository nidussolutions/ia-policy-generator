/** @type {import('tailwindcss').Config} */
export const purge = [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
];
export const darkMode = 'class';
export const theme = {
  extend: {},
};
export const variants = {
  extend: {},
};
export const plugins = [import('@tailwindcss/typography')];

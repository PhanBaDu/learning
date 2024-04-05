/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            height: {
                128: '42rem',
            },
            colors: {
                'regal-blue': '#FF3F80',
                'regal-blue': '#3E50B4',
                primary: 'rgba(var(--color-primary))',
                secondary: 'rgba(var(--color-secondary), 0.7)',
                hint: 'rgba(var(--color-hint), 0.3)',
                rose: 'rgba(var(--bg-gradient-rose), 0.5)',
                blue: 'rgba(var(--bg-gradient-blue), 0.5)',
            },
        },
    },
    plugins: [],
};

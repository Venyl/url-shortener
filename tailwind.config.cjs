/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                main500: 'hsl(240, 10%, 10%)',
                main400: 'hsl(240, 10%, 15%)',
                main300: 'hsl(240, 10%, 20%)',
            },
        },
    },
    plugins: [],
};

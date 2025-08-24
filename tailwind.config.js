export default {
  darkMode: 'class', 
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f9f9f9',
          text: '#1f2937',
          card: '#ffffff',
          border: '#e5e7eb',
        },
        dark: {
          bg: '#1f2937',
          text: '#f3f4f6',
          card: '#111827',
          border: '#374151',
        },
        primary: '#3b82f6', 
        danger: '#ef4444',  
        success: '#10b981', 
      },
    },
  },
  plugins: [],
};

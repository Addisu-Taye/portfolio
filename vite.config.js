import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Conditionally set the base path depending on the environment
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4+ official plugin
  ],
  base: isGitHubPages ? '/portfolio/' : '/', // Change 'portfolio' to your repo name
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

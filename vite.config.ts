import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Set the base URL for GitHub Pages deployment
const isGitHubPages = process.env.GITHUB_PAGES === 'true';  // You can also check the environment manually

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4+ official plugin
  ],
  base: isGitHubPages ? '/portfolio/' : '/',  // Change 'portfolio' to your repository name
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

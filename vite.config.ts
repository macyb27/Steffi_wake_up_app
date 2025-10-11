import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'Neon Monsters Alarm',
        short_name: 'NeonAlarm',
        description: 'Ein verspielter Wecker mit süßen Monstern, Belohnungen und Mini-Games.',
        theme_color: '#ff2ad5',
        background_color: '#0b0b0f',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      srcDir: 'src',
      filename: 'sw.ts'
    })
  ],
  server: {
    port: 5173
  }
});

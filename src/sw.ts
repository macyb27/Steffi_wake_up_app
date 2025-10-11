self.addEventListener('install', () => {
  // skip waiting for fresh deploys
  // @ts-ignore
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // @ts-ignore
  event.waitUntil(self.clients.claim());
});

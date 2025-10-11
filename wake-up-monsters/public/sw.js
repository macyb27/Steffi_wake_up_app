self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open('wum-v1')
    await cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest'
    ])
    self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return
  event.respondWith((async () => {
    const cache = await caches.open('wum-v1')
    const cached = await cache.match(request)
    if (cached) return cached
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  })())
})

// VuAppStore Service Worker - Privacy-First PWA
// Version: 1.0.0

const CACHE_NAME = 'vuappstore-v1.0.0';
const STATIC_CACHE_NAME = 'vuappstore-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'vuappstore-dynamic-v1.0.0';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/apps',
  '/pricing',
  '/privacy-levels',
  '/vu-store',
  '/vutoken',
  '/manifest.json',
  // Core CSS and JS will be added by SvelteKit automatically
];

// Resources to cache on first access
const DYNAMIC_ASSETS = [
  '/apps/',
  '/legal/',
  '/support/',
  '/developers/',
  '/resources/',
  '/about/'
];

// Privacy-first: Never cache sensitive data
const NEVER_CACHE = [
  '/account',
  '/api/auth',
  '/api/payment',
  '/api/user',
  '/api/subscription',
  'stripe.com',
  'analytics',
  'tracking'
];

// Install event - Cache critical resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing VuAppStore Service Worker v1.0.0');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating VuAppStore Service Worker v1.0.0');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old cache versions
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME && 
                cacheName.startsWith('vuappstore-')) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Cache cleanup complete');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - Privacy-first caching strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Privacy check: Never cache sensitive endpoints
  if (NEVER_CACHE.some(pattern => url.pathname.includes(pattern) || url.hostname.includes(pattern))) {
    console.log('[SW] Bypassing cache for sensitive resource:', url.pathname);
    return event.respondWith(fetch(event.request));
  }

  // Handle different request types
  if (event.request.method !== 'GET') {
    // Don't cache non-GET requests
    return event.respondWith(fetch(event.request));
  }

  // Cache strategy based on resource type
  if (url.pathname.startsWith('/api/')) {
    // API requests: Network first, cache as fallback
    event.respondWith(networkFirstStrategy(event.request));
  } else if (STATIC_ASSETS.includes(url.pathname) || url.pathname.match(/\.(css|js|png|jpg|svg|woff2?)$/)) {
    // Static assets: Cache first, network as fallback
    event.respondWith(cacheFirstStrategy(event.request));
  } else {
    // Dynamic content: Stale while revalidate
    event.respondWith(staleWhileRevalidateStrategy(event.request));
  }
});

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      return cachedResponse;
    }

    console.log('[SW] Fetching and caching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first strategy failed:', error);
    return new Response('Offline - Resource not available', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network-first strategy for API calls
async function networkFirstStrategy(request) {
  try {
    console.log('[SW] Network-first for API:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache for:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline - API not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale-while-revalidate strategy for dynamic content
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    console.log('[SW] Network failed for:', request.url);
  });

  // Return cached version immediately if available
  if (cachedResponse) {
    console.log('[SW] Serving stale content for:', request.url);
    return cachedResponse;
  }

  // If no cache, wait for network
  console.log('[SW] No cache, waiting for network:', request.url);
  return fetchPromise;
}

// Background sync for offline actions (future enhancement)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Future: Handle offline form submissions, downloads, etc.
  console.log('[SW] Performing background sync');
}

// Push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore Apps',
          icon: '/icons/action-explore.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/action-close.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/apps')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handler
self.addEventListener('error', (event) => {
  console.error('[SW] Service Worker error:', event.error);
});

// Unhandled promise rejection handler
self.addEventListener('unhandledrejection', (event) => {
  console.error('[SW] Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

console.log('[SW] VuAppStore Service Worker loaded successfully');

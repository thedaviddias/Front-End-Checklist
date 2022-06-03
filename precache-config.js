module.exports = {
  staticFileGlobs: [
    'index.html',
    'manifest.json',
    'favicon-32x32.png',
    'android-chrome-192x192.png',
    'favicon-16x16.png',
    'safari-pinned-tab.svg',
    'mstile-144x144.png',
    'browserconfig.xml',
    'apple-touch-icon.png'
  ],
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [/^\/user\//],
  skipWaiting: true,
  runtimeCaching: [
      {
          urlPattern: '/',
          handler: 'networkFirst',
          options: {
              cache: {
                  name: 'src'
              }
          }
      },
      {
          urlPattern: /src/,
          handler: 'networkFirst',
          options: {
              cache: {
                  name: 'src'
              }
          }
      },
      {
          urlPattern: /^https:\/\/api\.github\.com\/users\/[^\/]*\?/,
          handler: 'cacheFirst',
          options: {
              cache: {
                  maxAgeSeconds: 60 * 60 * 4,
                  name: 'users'
              }
          }
      },
      {
          urlPattern: /^https:\/\/api\.github\.com\/users\/[^\/]*\/repos\?.*$/,
          handler: 'cacheFirst',
          options: {
              cache: {
                  maxAgeSeconds: 60 * 60 * 4,
                  name: 'repos'
              }
          }
      },
      {
          urlPattern: /^https:\/\/api\.github\.com\/repos/,
          handler: 'cacheFirst',
          options: {
              cache: {
                  maxAgeSeconds: 60 * 60 * 4,
                  name: 'contributors'
              }
          }
      },
      {
          urlPattern: /^https:\/\/.*\.githubusercontent\.com\//,
          handler: 'cacheFirst',
          options: {
              cache: {
                  maxAgeSeconds: 60 * 60 * 24,
                  name: 'user-images'
              }
          }
      }
  ]
};

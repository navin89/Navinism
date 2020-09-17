const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [],
  stripePrefix: 'dist/client',
  root: '../server/dist/client',
  plugins:[
    new SWPrecacheWebpackPlugin({
      cacheId: 'ng-pwa',
      filename: 'service-worker.js',
      staticFileGlobs: [
        'dist/client/index.html',
        'dist/client/**.js',
        'dist/client/**.css'
      ],

    })
  ],
  stripePrefix: 'dist/client/assets',
  mergeStaticsConfig: true
};

const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [],
  stripePrefix: '../server/dist/client',
  root: '../server/dist/client',
  plugins:[
    new SWPrecacheWebpackPlugin({
      cacheId: 'navinism-pwa',
      filename: '../server/dist/client/service-worker.js',
      staticFileGlobs: [
        '../server/dist/client/index.html',
        '../server/dist/client/**.js',
        '../server/dist/client/**.css'
      ],

    })
  ],
  stripePrefix: '../server/dist/client/assets',
  mergeStaticsConfig: true
};

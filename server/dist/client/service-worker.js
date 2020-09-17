/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["01.f9d01435976a8cfb9daa.png","0a3750e6fdb29fcd632e627e2fc34dde"],["02.53687cbe6512fb70292f.png","351bd6828f980ec53eb3a1ad0d3b1e31"],["03.bc6306f4b8105410a282.png","e438ea2aabdb1087dc4f6fea5f6518e7"],["04.2006e36b1a39bb1ce0cb.png","0284d042a6c29213aaa1979528195b7f"],["05.1fd3bfd5831b5af640a3.png","5014f9cce435c71ade6395a5ed0c50e7"],["06.d50a610ed86c3d5363bb.png","21612b9d3e9d84e7e8761a2caf43bc65"],["07.535b98d8b10c9c1713fb.png","f8da0281186df8f17f732a2a22aa0efa"],["08.83eb2c7e2892a66afe14.png","975f7e0074400e7561ba2124604aacf2"],["09.2012ae6071a90778f12d.png","fd19309a1932b475138799acc0b75a82"],["3rdpartylicenses.txt","3980649341327de9c8ca1776fb075c64"],["arrow_left.db6e2d88c7c35a775ce4.svg","270f72df47e036d9cfa11f91f0a94a60"],["arrow_right.f7c6ac6d310d3b82f0a0.svg","d9ccc77c8240ad0dc2724cf333c0479e"],["assets/alaska.jpg","2c9827c8fdda0dad2f9580f7aacf743c"],["assets/bee.gif","2c7cb8de7cb54eeccfcc4adf5a7bc658"],["assets/edit_attributes.png","416aa44ae88c471b75b67ab53da9ad9a"],["assets/favicon.png","e57cb16417285d18ee7d9016883dad53"],["assets/icon-addlist.png","ee284421dd08d3c76865cca2fa611d2b"],["assets/icon-archive.png","0c86efb7cfd91facf648b3c574b26958"],["assets/icon-download.png","e9255edcf014d66a3a6bad08bb29278f"],["assets/icon-edit.png","5c3f35eebbfaca30023fa7f74326ee93"],["assets/icon-export.svg","f627dfa707a3b6be6cb4b6f780ee96a8"],["assets/icon-filter.png","49bbf928a96313817ce26db47eded6e6"],["assets/icon-help.png","43790d0076a5a70db3d7ea331c298c42"],["assets/icon-menu.png","a55c1c345a90bcca3e981da4868e77e7"],["assets/icon-print.png","2328c5c06c004a9539f5f03ab5fc1c19"],["assets/icon-report-problem.png","4c37e8f47e10e6a017544d6cbbf40d41"],["assets/icon-sync.png","7cf3c0ae2496805db2056825e9395367"],["assets/icon-upload.svg","8b1f650fd2058a38e886892bf9fbac38"],["assets/icons/icon-128x128.png","c868628f85920746394b72634dfcc4f9"],["assets/icons/icon-144x144.png","cd8497548afb834dda62757379542627"],["assets/icons/icon-152x152.png","fe8578eb15d077ca8c61b136d721f816"],["assets/icons/icon-192x192.png","cba69c4d0a85d58c52948906f09cc2e5"],["assets/icons/icon-384x384.png","09e0f809670656f359124debc2f18af5"],["assets/icons/icon-512x512.png","499374c2e19adb5ef3b3dadc7cc53412"],["assets/icons/icon-72x72.png","18f662ec383f61bfe9db19a5a43fcec5"],["assets/icons/icon-96x96.png","5e7bb9c1b59630a0a57a10b506ba83b8"],["assets/infinity_loader.gif","82fbfa0af5c9deec3082f0d0463a0dbd"],["assets/print.png","ed4579d9079d06d9f41cae18f5b65f1c"],["assets/profile-alt.jpg","0223f4c7e1bbd0138f5eb984884221ab"],["assets/public.png","35e5c46791a347556a63972ca2f6c7cd"],["assets/refresh.png","2a7a86e03f2ae0cbd9998bb24d3dbe08"],["assets/smallTele.gif","61a13d2fbac7ae0c3365e48c024b9cd7"],["assets/spaceRocket_takeOff.jpg","b661d831e4e267a9d7f4d60c7246f513"],["fa-brands-400.140e875e1e58453221ad.eot","4a5d4d855d11fae79cc864bdacb2f479"],["fa-brands-400.64295e33efa263357733.woff","5734d789b25228cbafc64a58ae971aca"],["fa-brands-400.65ed7d005846ac8f8096.svg","778b1f251bea7412048da95b87bf816f"],["fa-brands-400.6bc193d6b167d7175b0f.woff2","91a23e8bf2b4b84c39311cb5eb23aaa0"],["fa-brands-400.f318edaf81ff2d1dc049.ttf","4c1da237bdae0773309df93b2cd48e09"],["fa-regular-400.07c1f6dce8b2bfcf5111.ttf","260be4f29c0b2ce47480afb23f38f237"],["fa-regular-400.45bbc08ee25c0f5cd0fb.eot","6b20949b3a679c30d09f64acd5d3317d"],["fa-regular-400.5a071ce2da7c9811d1d2.woff","d44ad00c44e46fd29f6126fa7d888cde"],["fa-regular-400.75761b3a9c4443721310.woff2","5c674c9216c06ede2f618aa58ae71116"],["fa-regular-400.eae91b15e71cf13b2f8c.svg","66578cdbb6dc01f527a53971051b3e85"],["fa-solid-900.1b81e504c3d6fcfbdf46.eot","9a1672a8a8d91fbf82c71f451d495253"],["fa-solid-900.2c16a818018a030c0b87.ttf","c65d154888aa166982dac3e72e7380ec"],["fa-solid-900.792bbe12870f9e1707aa.woff2","412a43d6840addd683665ec12c30f810"],["fa-solid-900.e01ea526204590d06558.svg","486853107489520b3265b19b191626f8"],["fa-solid-900.f89ad185d4d491dd5ffe.woff","f3a7d3b5880544a91e9a7e6f8f35d4d2"],["index.html","c8a88fb1ad20099a2bd365a0ac9c9101"],["main-es2015.2e69b76e80e62cebe7ba.js","d88b459b62e50c135638009bb49cad2a"],["main-es5.2e69b76e80e62cebe7ba.js","2b6012175a19a30c486449062662710e"],["manifest.json","8f8f99542c645e13dec3486f1e3d0221"],["ngsw-worker.js","0a57357be8efaab1b6ea9cd9bd0982b4"],["ngsw.json","b7f115cd80e4541391c18021412892c0"],["polyfills-es2015.1db1bb4bb4e3a6067d35.js","4ff72a879a69d1e64cf49e4343c6bc9f"],["polyfills-es5.db022527a41cfa93441f.js","c0f211b9d50cfa721721585a30e0431a"],["runtime-es2015.1eba213af0b233498d9d.js","1244d3f2f28ecc6619157927aca95200"],["runtime-es5.1eba213af0b233498d9d.js","1244d3f2f28ecc6619157927aca95200"],["safety-worker.js","cce0b16d6bc4aa9e74c9337e78c59e4b"],["scripts.38f4663a91ede48fca74.js","97c0fd2e73c07f95f87b2bd96acbfd5e"],["smallTele.f93650b3d57214aa7fa5.gif","61a13d2fbac7ae0c3365e48c024b9cd7"],["styles.027e78605e0a59c45a0d.css","3ca1398e36bacb3fbf51ece2f787b7c4"],["worker-basic.min.js","cce0b16d6bc4aa9e74c9337e78c59e4b"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});








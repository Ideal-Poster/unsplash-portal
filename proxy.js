const app = require('express')();
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// Configuration
const { PROXY_HOST, PROXY_PORT, APP_PORT } = process.env;
const PORT = PROXY_PORT || 5000;
const HOST = PROXY_HOST || 'localhost';

// Logging
app.use(morgan('dev'));

// proxy middleware options
var filter = function(pathname, req) {
  // Only allow requests from specific origins
  return req.headers.origin === `http://${HOST}:${APP_PORT}` || req.headers.origin === `https://${HOST}:${APP_PORT}`;
};

// Proxy endpoint
app.use(
  '/api',
  createProxyMiddleware(filter, {
    target: 'https://api.unsplash.com',
    changeOrigin: true,
    pathRewrite: { [`^/api`]: 'search/photos/' },
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}` }
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});

const app = require('express')()
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')

// Configuration
const { PROXY_HOST, PROXY_PORT } = process.env
const PORT = PROXY_PORT || 5000
const HOST = PROXY_HOST || 'localhost'

// Logging
app.use(morgan('dev'))

// Proxy endpoint
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://api.unsplash.com',
    changeOrigin: true,
    pathRewrite: {
      [`^/api`]: 'search/photos/'
    },
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_API_URL}` }
  })
)

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`)
})

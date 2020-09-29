const app = require('express')()
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware')

// Configuration
const PORT = 5000
const HOST = 'localhost'

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

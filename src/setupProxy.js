const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/charges',
    createProxyMiddleware({
      target: 'https://api.omise.co',
      changeOrigin: true,
    })
  );
};
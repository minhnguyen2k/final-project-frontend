// eslint-disable-next-line no-undef
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = {
  '/api': 'http://api.freemics.tech',
};

// eslint-disable-next-line no-undef
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.freemics.tech/api',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.removeHeader('Origin');
      },
      router,
      logLevel: 'debug',
    }),
  );
};

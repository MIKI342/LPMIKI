// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Puedes personalizar la configuración de Webpack aquí si es necesario
      return webpackConfig;
    }
  },
  devServer: {
    port: process.env.PORT || 3000, // Puerto configurado desde .env
    historyApiFallback: true, // Soporte para SPA
    hot: true, // Hot Module Replacement (HMR)
    open: true, // Abre el navegador automáticamente
    static: {
      directory: path.join(__dirname, 'public'), // Servir archivos estáticos desde 'public'
    },
    setupMiddlewares: (middlewares, devServer) => {
      console.log("Servidor de desarrollo iniciado en:", devServer.options.port);
      // Aquí puedes agregar otros middlewares si lo necesitas
      return middlewares;
    },
  }
};

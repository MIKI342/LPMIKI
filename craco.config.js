const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log("Loaded PORT:", process.env.PORT); // Para verificar que se carga correctamente

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Puedes personalizar la configuración de Webpack aquí si es necesario
      return webpackConfig;
    }
  },
  devServer: {
    port: parseInt(process.env.PORT, 10) || 3000, // Asegura que el puerto sea un número
    historyApiFallback: true, // Soporte para SPA
    hot: true, // Hot Module Replacement (HMR)
   
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

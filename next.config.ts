
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  webpack(config:any, options:any) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        remotes: {
          angularRemote: 'angularRemote@http://localhost:4201/remoteEntry.js',
        },
        shared: {
          // Define aquí las dependencias compartidas si es necesario
        },
        extraOptions: {
          exposePages: true // Opcional
        }
      })
    );
    return config;
  },

  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};





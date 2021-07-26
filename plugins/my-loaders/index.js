
module.exports = function(context, options) {
  return {
    name: 'loaders',
    configureWebpack(config, isServer) {
      return {
        module: {
          rules: [
            {
              test: /\.ya?ml$/,
              type: 'json', // Required by Webpack v4
              use: 'yaml-loader'
            }
          ],
        },
      };
    },
  }
}

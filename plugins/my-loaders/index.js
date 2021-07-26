
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
            },
            // {
            //   test: /\.(gif|png|jpe?g|svg)$/i,
            //   exclude: /\.(mdx?)$/i,
            //   use: ['file-loader', { loader: 'image-webpack-loader' }],
            // }
          ],
        },
      };
    },
  }
}

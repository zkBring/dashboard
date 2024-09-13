const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        ignoreWarnings: [
          { module: /node_modules\// }
        ],
        output: {
          ...webpackConfig.output,
          filename: 'static/js/bundle.[hash].js',
          chunkFilename: 'static/js/[name].[hash].chunk.js',
          // filename: 'static/js/[name].[hash].[ext]'
        },
        resolve: {
          ...webpackConfig.resolve,
          fallback: {
            ...webpackConfig.resolve.fallback
          }
        },
        module: {
          ...webpackConfig.module,
          rules: [
            ...webpackConfig.module.rules,
            {
              test: /\.m?js$/,
              resolve: {
                fullySpecified: false,
              },
            },
          ],
        },
        plugins: [
          ...webpackConfig.plugins,
          new NodePolyfillPlugin(),
          new webpack.ProvidePlugin({
            process: 'process/browser',
          })
        ],
      }
    },
  },

  babel: {
    plugins: [
      "@babel/plugin-proposal-logical-assignment-operators",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-numeric-separator",
      ['@babel/plugin-transform-private-property-in-object',
        {
          "loose": true
        }
      ],
      ['@babel/plugin-transform-private-methods',
        {
          "loose": true
        }
      ],
      [
        "@babel/plugin-transform-class-properties",
        {
          "loose": true
        }
      ]
    ] 
  }
}
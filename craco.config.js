const WorkerLoaderPlugin = require("craco-worker-loader")
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  webpack: {
    plugins: [
      new NodePolyfillPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      })
    ]
  },
  configure: (webpackConfig) => {
    return {
      ...webpackConfig,
      output: {
        ...webpackConfig.output,
        filename: '[name].[hash].[ext]'
      },
      resolve: {
        ...webpackConfig.resolve,
        fallback: {
          ...webpackConfig.resolve.fallback
        }
      },
      
    }
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
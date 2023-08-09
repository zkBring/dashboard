const path = require('path')
const WorkerLoaderPlugin = require("craco-worker-loader")

module.exports = {
  webpack: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  babel: {
    plugins: [
      "@babel/plugin-proposal-logical-assignment-operators",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-numeric-separator",
      [
        "@babel/plugin-transform-class-properties",
        {
          "loose": true,
          "shippedProposals": true
        }
      ]
    ] 
  },
  plugins: [{
    plugin: WorkerLoaderPlugin
  }]
}

    // to babel
    // configure: { 
    //   module: {
    //     rules: [
    //       {
    //         test: /\.js$/,
    //         use: [path.join(__dirname, './loaders/remove-hashbag-loader.js')],
    //         include: [ path.resolve(__dirname, './node_modules/@thirdweb-dev/sdk/dist') ],
    //         exclude: /node_modules/,
    //       }
    //     ]
    //   },
    // }
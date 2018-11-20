// import nodeExternals from 'webpack-node-externals'
const nodeExternals = require("webpack-node-externals")

const config = {
  target: "node",
  externals: [nodeExternals()],
  entry: "./index.js",
  //   entry: {
  //     'src/index': './src/index.js',
  //     'test/index': './test/index.js'
  //   },
  output: {
    path: __dirname,
    filename: "[name].bundle.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "env",
                {
                  targets: {
                    node: "current",
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
}

module.exports = [config]

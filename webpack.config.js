const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:'development',
  entry: "./src/frontend/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    publicPath: "/",
  },
  module: {
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.html$/,
        use: "html-loader"
      },
      /*Choose only one of the following two: if you're using 
      plain CSS, use the first one, and if you're using a
      preprocessor, in this case SASS, use the second one*/
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use:[
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
      },
    ], 
  },  
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html"
    }),
  ],
  stats: 'errors-only',

  devServer: {
    host: 'localhost',
    port: 3000,
    // https: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
    historyApiFallback: true,
    compress: true,
    hot: true,
    liveReload: true,
    // open: true,
    // client: {
    //     overlay: false,
    // },
  
  },
}
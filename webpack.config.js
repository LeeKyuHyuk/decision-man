const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "/src"),
  mode: process.env.NODE_ENV,
  node: {
    global: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "app.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: "file-loader" }],
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, "/public/index.html"),
      fileName: path.join(__dirname, "/dist"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "/public/images/changsuyug.jpg"),
          to: path.join(__dirname, "/dist/images/changsuyug.jpg"),
        },
      ],
    }),
  ],
};

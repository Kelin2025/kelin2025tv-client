const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[contentHash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js", ".css", ".svg"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loaders: [{ loader: "svg-sprite-loader" }, "svgo-loader"],
      },
      {
        test: /\.css$/,
        loaders: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|woff)$/,
        loader: "file-loader",
        options: {
          name: "[name]-[sha1:hash:hex:20].[ext]",
        },
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/env", { loose: true, modules: false }]],
              plugins: [
                [
                  "@babel/transform-runtime",
                  {
                    regenerator: true,
                  },
                ],
              ],
              sourceType: "unambiguous",
            },
          },
          { loader: "ts-loader", options: { transpileOnly: true } },
        ],
        include: [/node_modules\/forest/, /src/],
        exclude: [/node_modules/],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.IgnorePlugin({
      // Workaround for broken libraries
      resourceRegExp: /^(fs|path)$/,
    }),
    new HtmlWebpackPlugin({
      chunks: ["main"],
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    port: 1234,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: { chunks: "all" },
  },
};

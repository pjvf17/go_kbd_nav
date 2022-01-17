const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const WebExtPlugin = require("web-ext-plugin");

module.exports = {
  target: "electron-renderer",
  plugins: [
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "**/*",
    //       context: path.resolve(__dirname, "lib/src", "options"),
    //       to: "./",
    //     },
    //   ],
    // }),
    new CopyPlugin({
      patterns: [{ from: "lib/src/static" }],
    }),
  ],
  entry: {
    content: "./lib/src/content.ts",
    options: "./lib/src/options.ts",
    default: "./lib/src/default.ts",
    main: "./lib/src/main.ts",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/prod"),
    clean: true,
  },
};

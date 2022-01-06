const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "**/*",
          context: path.resolve(__dirname, "lib/src", "options"),
          to: "./",
        },
      ],
    }),
  ],
  entry: "./lib/src/content.ts",
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
    filename: "content.js",
    path: path.resolve(__dirname, "dist/prod"),
  },
};

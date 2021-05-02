const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "demo", "index.ts"),

  plugins: [
    new HtmlWebpackPlugin({
      template: "demo/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "main-[hash:8].css",
    })
  ],

  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(s[ac]ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ],
      }
    ]
  },

  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8089,
    hot: true,
    inline: true
  }
}

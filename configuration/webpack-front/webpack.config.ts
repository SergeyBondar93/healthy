import { Configuration } from "webpack";
import { Configuration as DevServer } from "webpack-dev-server";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { babelConfig } from "./babel.config";

type AppMode = "production" | "development";

const getMode = (): "production" | "development" => {
  if (["production", "development"].includes(process.env.mode || ""))
    return process.env.mode as AppMode;
  return "development";
};

export const generateConfig = ({
  port,
  ModuleFederationPlugin,
}: any): Configuration & DevServer => ({
  mode: getMode(),
  entry: path.resolve(process.cwd(), "src", "index.tsx"),
  devServer: {
    port,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "[hash].[name].js",
    // publicPath: '/assets/'
    // publicPath: '/'
    publicPath: `http://localhost:${port}/`,
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelConfig,
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), "public", "index.html"),
    }),
    new MiniCssExtractPlugin(),
    ModuleFederationPlugin,
  ],
});

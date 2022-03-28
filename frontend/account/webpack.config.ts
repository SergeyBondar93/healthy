import { generateConfig } from "@healthy/webpack-front";
import { container } from "webpack";
import { dependencies } from "./package.json";

const config = generateConfig({
  port: 3003,
  ModuleFederationPlugin: new container.ModuleFederationPlugin({
    name: "healthy_front_account",
    filename: "remoteEntry.js",
    exposes: {
      "./app": "./src/App",
    },
    shared: {
      ...dependencies,
      react: {
        singleton: true,
        requiredVersion: dependencies.react,
      },
      "react-dom": {
        singleton: true,
        requiredVersion: dependencies["react-dom"],
      },
    },
  }),
});

export default config;

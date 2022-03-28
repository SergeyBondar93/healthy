import {generateConfig} from '@healthy/webpack-front';
import { container } from "webpack";
import { dependencies } from "./package.json";


const config = generateConfig({
  port: 3001,
  ModuleFederationPlugin: new container.ModuleFederationPlugin({
    name: "layout",
    filename: "remoteEntry.js",
    remotes: {
      healthy_front_statistic: "healthy_front_statistic@http://localhost:3002/remoteEntry.js",
      healthy_front_account: "healthy_front_account@http://localhost:3003/remoteEntry.js",
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


export default config
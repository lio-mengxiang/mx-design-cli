import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import getWebpackConfig from "../config/webpackConfig";
import { isAddForkTsPlugin, syncChainFns, getProjectConfig } from "../utils";
import { DEV } from "../constants";
import { IDevelopmentConfig } from "../interface";
import detect from "detect-port-alt";

const isInteractive = process.stdout.isTTY;

async function choosePort(port, host) {
  const resPort = await detect(port, host);
  if (resPort === Number(port)) {
    return resPort;
  }
  const message = `Something is already running on port ${port}.`;

  if (isInteractive) {
    console.log(message);
    return resPort;
  }
  console.log(message);
  return null;
}

export default ({ host, port }: IDevelopmentConfig) => {
  const compiler = syncChainFns(
    getWebpackConfig,
    getProjectConfig,
    isAddForkTsPlugin,
    webpack
  )(DEV);

  const serverConfig = {
    publicPath: "/",
    compress: true,
    noInfo: true,
    hot: true,
  };
  const runDevServer = async (port) => {
    const devServer = new WebpackDevServer(compiler, serverConfig);
    const resPort = await choosePort(port, host);
    if (resPort !== null) {
      devServer.listen(resPort, host, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.warn(`http://${host}:${resPort}\n`);
      });
    }
  };
  runDevServer(port);
};

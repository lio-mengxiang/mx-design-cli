import buildSite from "../buildSite/buildSite";
import commander from "commander";
import { getProjectConfig, isAddForkTsPlugin, syncChainFns } from "../utils";
import getWebpackConfig from "../config/webpackConfig";
import { BUILD_SITE } from "../constants";

jest.mock("../buildSite/buildSite");
const config = syncChainFns(
  getWebpackConfig,
  getProjectConfig,
  isAddForkTsPlugin
)(BUILD_SITE);

const pluginsName = config.plugins.map((v) => v.constructor.name);

describe("buildSite", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("exec mx build", () => {
    it("should toBeCalled buildSite once", () => {
      const program = new commander.Command();
      program.command("buildSite").action(buildSite);
      program.parse(["node", "test", "buildSite"]);
      expect(buildSite).toBeCalledTimes(1);
    });
  });
  describe("build webpackconfig correct", () => {
    it("mode is production", () => {
      expect(config.mode).toMatch("production");
    });
    webpackTest(config);
  });
});

export function webpackTest(config) {
  it("rules have js jsx ts tsx parser", () => {
    expect(config.module.rules[0].test.test(".js")).toBe(true);
    expect(config.module.rules[0].test.test(".ts")).toBe(true);
    expect(config.module.rules[0].test.test(".jsx")).toBe(true);
    expect(config.module.rules[0].test.test(".tsx")).toBe(true);
  });
  it("loader contain babel loader", () => {
    expect(config.module.rules[0].use[1].loader).toContain("babel-loader");
  });
  it("rules have less parser", () => {
    expect(config.module.rules[1].test.test(".less")).toBe(true);
  });
  it("loader contain less loader", () => {
    expect(config.module.rules[1].use[3].loader).toContain("less-loader");
  });
  it("if have tsconfig.json, then plugin have ForkTsCheckerWebpackPlugin ", () => {
    expect(pluginsName).toContain("ForkTsCheckerWebpackPlugin");
  });
}

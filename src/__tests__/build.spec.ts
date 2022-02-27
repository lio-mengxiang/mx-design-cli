import { mocked } from "ts-jest/utils";
import buildLib from "../buildLib/build";
import commander from "commander";

jest.mock("../buildLib/build");
// const buildLibMocked = mocked(buildLib);

describe("deploy", () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("exec mx build", () => {
    it("should toBeCalled buildLib once", () => {
      const program = new commander.Command();
      program.command("buildLib").action(buildLib);
      program.parse(["node", "test", "buildLib"]);
      expect(buildLib).toBeCalledTimes(1);
    });
    // it("should build success", () => {

    // });
  });
});

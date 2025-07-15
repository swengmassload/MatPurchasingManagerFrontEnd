import { DefaultTestingModes, AllTestingModes } from "./DefaultTestingModes";

describe("DefaultTestingModes constants", () => {
  it("should have the correct Manual mode", () => {
    expect(DefaultTestingModes.Manual).toEqual({ code: "MANUAL" });
  });

  it("should have the correct Auto mode", () => {
    expect(DefaultTestingModes.Auto).toEqual({ code: "AUTOMATIC" });
  });

  it("should have AllTestingModes array with Manual and Auto", () => {
    expect(AllTestingModes).toEqual([
      { code: "MANUAL" },
      { code: "AUTOMATIC" }
    ]);
  });
});
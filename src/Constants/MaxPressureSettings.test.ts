import { MaxPressureSettings } from "./MaxPressureSettings";

describe("MaxPressureSettings constants", () => {
  it("should have correct MAX_EXERCISE_PRESSURE value", () => {
    expect(MaxPressureSettings.MAX_EXERCISE_PRESSURE).toBe(80000);
  });

  it("should have correct AutoVerificationExcerciseRatio value", () => {
    expect(MaxPressureSettings.AutoVerificationExcerciseRatio).toBe(1.5);
  });
});
import { StandardUnits, AllOutputUnitTypes, InspectionConclusion, DUT_ZERO_OUTPUT_TOLERANCE, RESISTANCE_TOLERANCE, Tester_HardCodedName, GeneralCertificateTypes } from "./StandardUnits";


describe("StandardUnits constants", () => {
  it("should have correct milliVoltPerVolt", () => {
    expect(StandardUnits.milliVoltPerVolt).toEqual({ name: "milliVoltPerVolt", code: "mV/V" });
  });
  it("should have correct kilograms", () => {
    expect(StandardUnits.kilograms).toEqual({ name: "Kilogrammes", code: "kg" });
  });
  it("should have correct volts", () => {
    expect(StandardUnits.volts).toEqual({ name: "Volts", code: "V" });
  });
  it("should have correct ohms", () => {
    expect(StandardUnits.ohms).toEqual({ name: "Ohms", code: "Ω" });
  });
  it("should have correct pounds", () => {
    expect(StandardUnits.pounds).toEqual({ name: "Pounds", code: "lbs" });
  });
  it("should have correct milliAmpere", () => {
    expect(StandardUnits.milliAmpere).toEqual({ name: "MilliAmpere", code: "mA" });
  });
});

describe("AllOutputUnitTypes constant", () => {
  it("should contain all output unit types in correct order", () => {
    expect(AllOutputUnitTypes).toEqual([
      StandardUnits.milliVoltPerVolt,
      StandardUnits.milliAmpere,
      StandardUnits.volts,
      StandardUnits.pounds,
      StandardUnits.kilograms,
      StandardUnits.ohms
    ]);
  });
});

describe("InspectionConclusion constants", () => {
  it("should have correct values", () => {
    expect(InspectionConclusion.PASS).toBe("PASS");
    expect(InspectionConclusion.FAIL).toBe("FAIL");
    expect(InspectionConclusion.COMPLETED).toBe("COMPLETED");
    expect(InspectionConclusion.TRIM).toBe("TRIM");
  });
});

describe("Tolerance constants", () => {
  it("should have correct DUT_ZERO_OUTPUT_TOLERANCE", () => {
    expect(DUT_ZERO_OUTPUT_TOLERANCE).toBe(0.15);
  });
  it("should have correct RESISTANCE_TOLERANCE", () => {
    expect(RESISTANCE_TOLERANCE).toBe(15);
  });
});

describe("Tester_HardCodedName constants", () => {
  it("should have correct tester names", () => {
    expect(Tester_HardCodedName.Automatic_Hydraulic_Tester).toBe("Automatic Hydraulic Tester");
    expect(Tester_HardCodedName.Dead_Load_Tester).toBe("Dead Load Tester");
    expect(Tester_HardCodedName.Old_Grey_Hydraulic_Tester).toBe("Old Grey Hydraulic Tester");
  });
});

describe("GeneralCertificateTypes constants", () => {
  it("should have correct StandardCertificate", () => {
    expect(GeneralCertificateTypes.StandardCertificate).toEqual({ displayName: "StandardCertificate", code: "StandardCertificate" });
  });
  it("should have correct ZeroToTen", () => {
    expect(GeneralCertificateTypes.ZeroToTen).toEqual({ displayName: "0-10", code: "ZeroToTen" });
  });
  it("should have correct FourToTwenty", () => {
    expect(GeneralCertificateTypes.FourToTwenty).toEqual({ displayName: "4-20", code: "FourToTwenty" });
  });
  it("should have correct MatraCourt", () => {
    expect(GeneralCertificateTypes.MatraCourt).toEqual({ displayName: "Mantracourt", code: "Mantracourt" });
  });
  it("should have correct Others", () => {
    expect(GeneralCertificateTypes.Others).toEqual({ displayName: "Others", code: "Other" });
  });
  it("should have correct WesternScale", () => {
    expect(GeneralCertificateTypes.WesternScale).toEqual({ displayName: "WesternScale", code: "WesternScale" });
  });
});
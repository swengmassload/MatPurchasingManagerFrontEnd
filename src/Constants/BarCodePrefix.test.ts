import { BarCodePrefix } from "./BarCodePrefix";


describe("BarCodePrefix constants", () => {
  it("should have the correct value for SpecialBarCode", () => {
    expect(BarCodePrefix.SpecialBarCode).toBe("__");
  });

  it("should have the correct value for PerformSavePrefix", () => {
    expect(BarCodePrefix.PerformSavePrefix).toBe("__SAVE");
  });

  it("should have the correct value for PrintProductCertificatePrefix", () => {
    expect(BarCodePrefix.PrintProductCertificatePrefix).toBe("__PRNT_CERT");
  });

  it("should have the correct value for RePrintSurfaceLabelPrefix", () => {
    expect(BarCodePrefix.RePrintSurfaceLabelPrefix).toBe("__PRNT_LABEL");
  });

  it("should have the correct value for PrintActualOutputLabelPrefix", () => {
    expect(BarCodePrefix.PrintActualOutputLabelPrefix).toBe("__PRNT_OUTPUT");
  });
});
import { DefaultProductionStages } from "./ProductionStages";

describe("DefaultProductionStages constants", () => {
  it("should have correct Scrap stage", () => {
    expect(DefaultProductionStages.Scrap).toEqual({
      stage: "Scrap",
      code: "Scrap",
      priority: -2,
    });
  });

  it("should have correct Quarantine stage", () => {
    expect(DefaultProductionStages.Quarantine).toEqual({
      stage: "Quarantine",
      code: "Quarantine",
      priority: -1,
    });
  });

  it("should have correct Finished stage", () => {
    expect(DefaultProductionStages.Finished).toEqual({
      stage: "Finished",
      code: "Finished",
      priority: 0,
    });
  });

  it("should have correct AssignSerialNo stage", () => {
    expect(DefaultProductionStages.AssignSerialNo).toEqual({
      stage: "Batching / Serial Number",
      code: "Assign_SerialNo",
      priority: 1,
    });
  });

  it("should have correct SurfacePreparation stage", () => {
    expect(DefaultProductionStages.SurfacePreparation).toEqual({
      stage: "Surface Preparation",
      code: "Surface_Prep",
      stageCardName: "Surface Prep",
      priority: 2,
    });
  });

  it("should have correct Gauging stage", () => {
    expect(DefaultProductionStages.Gauging).toEqual({
      stage: "Gauging",
      code: "Gauging",
      priority: 3,
    });
  });

  it("should have correct GaugeInspection stage", () => {
    expect(DefaultProductionStages.GaugeInspection).toEqual({
      stage: "Gauge Inspection",
      code: "Gauge_Inspection",
      priority: 4,
    });
  });

  it("should have correct Wiring stage", () => {
    expect(DefaultProductionStages.Wiring).toEqual({
      stage: "Wiring",
      code: "Wiring",
      priority: 5,
    });
  });

  it("should have correct Cabling stage", () => {
    expect(DefaultProductionStages.Cabling).toEqual({
      stage: "Cabling",
      code: "Cabling",
      priority: 6,
    });
  });

  it("should have correct InitialVerificationManual stage", () => {
    expect(DefaultProductionStages.InitialVerificationManual).toEqual({
      stage: "Initial Verification Manual",
      optionalCommonName: "Initial Verification",
      code: "IVManual",
      stageCardName: "IV Manual",
      priority: 7,
    });
  });

  it("should have correct FinalVerificationManual stage", () => {
    expect(DefaultProductionStages.FinalVerificationManual).toEqual({
      optionalCommonName: "Final Verification",
      stage: "Final Verification Manual",
      code: "FVManual",
      stageCardName: "FV Manual",
      priority: 7,
    });
  });

  it("should have correct InitialVerificationAuto stage", () => {
    expect(DefaultProductionStages.InitialVerificationAuto).toEqual({
      optionalCommonName: "Initial Verification",
      stage: "Initial Verification Auto",
      code: "IVAuto",
      stageCardName: "IV Auto",
      priority: 7,
    });
  });

  it("should have correct FinalVerificationAuto stage", () => {
    expect(DefaultProductionStages.FinalVerificationAuto).toEqual({
      optionalCommonName: "Final Verification",
      stage: "Final Verification Auto",
      code: "FVAuto",
      stageCardName: "FV Auto",
      priority: 7,
    });
  });

  it("should have correct AddResistor stage", () => {
    expect(DefaultProductionStages.AddResistor).toEqual({
      stage: "Add Resistor",
      code: "Add_Resistor",
      priority: 8,
    });
  });

  it("should have correct Sealing stage", () => {
    expect(DefaultProductionStages.Sealing).toEqual({
      stage: "Sealing",
      code: "Sealing",
      priority: 9,
    });
  });

  it("should have correct Labelling stage", () => {
    expect(DefaultProductionStages.Labelling).toEqual({
      stage: "Labelling",
      code: "Labelling",
      priority: 11,
    });
  });

  it("should have correct Inventory stage", () => {
    expect(DefaultProductionStages.Inventory).toEqual({
      stage: "Inventory",
      code: "Inventory",
      priority: 12,
    });
  });

  it("should have correct Shipping stage", () => {
    expect(DefaultProductionStages.Shipping).toEqual({
      stage: "Shipping",
      code: "Shipping",
      priority: 13,
    });
  });
});
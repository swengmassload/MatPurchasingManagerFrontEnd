import { DefaultProductionStages } from "./ProductionStages";

export interface ProductionCheckedStage {
  name: string;
  checked: boolean;
  code: string;
}

export const ProductionCheckedStages: ProductionCheckedStage[] = [
  // Please note :These names must be the same name in Production Database there Please make sure they are
  //always in alignment or you automate the retrival of these and send back just the stage code
  // the stage code can also be like names so that its easy to read
  // meaning that that the future work should be that stages are retrieved from Product manage Stage API
  // thefore ProductionStages.test.ts must always pass or you change the names here all the way from the API to here
  {
    name: DefaultProductionStages.SurfacePreparation.stage,
    checked: false,
    code: DefaultProductionStages.SurfacePreparation.code,
  },
  { name: DefaultProductionStages.Gauging.stage, checked: false, code: DefaultProductionStages.Gauging.code },
  {
    name: DefaultProductionStages.GaugeInspection.stage,
    checked: false,
    code: DefaultProductionStages.GaugeInspection.code,
  },
  { name: DefaultProductionStages.Wiring.stage, checked: false, code: DefaultProductionStages.Wiring.code },
  {
    name: DefaultProductionStages.Cabling.stage,
    checked: false,
    code: DefaultProductionStages.Cabling.code,
  },
  {
    name: DefaultProductionStages.InitialVerificationManual.stage,
    checked: false,
    code: DefaultProductionStages.InitialVerificationManual.code,
  },
  {
    name: DefaultProductionStages.InitialVerificationAuto.stage,
    checked: false,
    code: DefaultProductionStages.InitialVerificationAuto.code,
  },
  { name: DefaultProductionStages.AddResistor.stage, checked: false, code: DefaultProductionStages.AddResistor.code },
  { name: DefaultProductionStages.Sealing.stage, checked: false, code: DefaultProductionStages.Sealing.code },
  {
    name: DefaultProductionStages.FinalVerificationManual.stage,
    checked: false,
    code: DefaultProductionStages.FinalVerificationManual.code,
  },
  {
    name: DefaultProductionStages.FinalVerificationAuto.stage,
    checked: false,
    code: DefaultProductionStages.FinalVerificationAuto.code,
  },
  { name: DefaultProductionStages.Labelling.stage, checked: false, code: DefaultProductionStages.Labelling.code },
  { name: DefaultProductionStages.Inventory.stage, checked: false, code: DefaultProductionStages.Inventory.code },
  { name: DefaultProductionStages.Shipping.stage, checked: false, code: DefaultProductionStages.Shipping.code },
];

export const getProductionCheckedStage = (code: string): ProductionCheckedStage | undefined => {
  return ProductionCheckedStages.find((stage) => stage.code === code) || undefined;
};

export const checkStageCodesInProductionCheckedStages = (stageCodes: string[]): ProductionCheckedStage[] => {
  const productionCheckedStages = ProductionCheckedStages;

  productionCheckedStages.forEach((stage) => {
    if (stageCodes.includes(stage.code)) {
      stage.checked = true;
    }
  });
  return productionCheckedStages;
};

export const convertStageCodesToProductionCheckedStages = (stageCodes: string[]): ProductionCheckedStage[] => {
  const productionCheckedStages: ProductionCheckedStage[] = [];
  stageCodes.forEach((code) => {
    const stage = getProductionCheckedStage(code);
    if (stage) {
      productionCheckedStages.push(stage);
    }
  });
  return productionCheckedStages;
};

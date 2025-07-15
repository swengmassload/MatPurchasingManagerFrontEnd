import { EstablishedClaims } from "./EstablishedClaims";

describe("EstablishedClaims constants", () => {
  it("should have the correct claim values", () => {
    expect(EstablishedClaims).toEqual({
      Surface_Preparation_APP03: 'APP03_01',
      Gauging_APP03: 'APP03_02',
      Gauge_Inspection_APP03: 'APP03_03',
      Wiring_APP03: 'APP03_04',
      Cabling_APP03: 'APP03_05',
      Initial_Verification_Manual_APP03: 'APP03_06',
      Initial_Verification_Auto_APP03: 'APP03_07',
      Add_Resistor_APP03: 'APP03_08',
      Seal_APP03: 'APP03_09',
      Final_Verification_Manual_APP03: 'APP03_10',
      Final_Verification_Auto_APP03: 'APP03_11',
      Labelling_APP03: 'APP03_12',
      Inventory_APP03: 'APP03_13',
      Shipping_APP03: 'APP03_14',
      Record_Defect_APP03: 'APP03_15',
      Batch_Serial_No_APP03: 'APP03_16',
      Track__Report_APP03: 'APP03_17',
      Add_Picture_APP03: 'APP03_18',
      Defect_APP03: 'APP03_19',
      Print_Stage_card_APP03: 'APP03_20',
      Version_Reassignment_APP03: 'APP03_21',
      Change_Stage_APP03: 'APP03_22',
      NCR_List_APP03: 'APP03_23',
      Add_Reference_Cell_APP03: 'APP03_24',
    });
  });
});
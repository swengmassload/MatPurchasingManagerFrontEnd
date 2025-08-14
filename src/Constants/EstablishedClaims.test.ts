import { EstablishedClaims } from "./EstablishedClaims";

describe("EstablishedClaims constants", () => {
  it("should have the correct claim values", () => {
    expect(EstablishedClaims).toEqual({
      Create_RMA_APP04: "APP04_01",
      Receive_RMA_APP04: "APP04_02",
      Assess_RMA_APP04: "APP04_03",
      Add_Sales_Order_APP04: "APP04_04",
      Repair_RMA_APP04: "APP04_05",
      Close_RMA_APP04: "APP04_06",
      General_Access_APP04: "APP04_07",
    });
  });
});

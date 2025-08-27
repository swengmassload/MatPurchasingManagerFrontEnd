import { ProductManagerEnpoints, RMAManagerEnpoints } from "./EndPoints";
import { PRODUCTAPINAME, RMAAPINAME } from "./APINames";

describe("EndPoints constants", () => {
  describe("ProductManagerEnpoints", () => {
    it("should have the correct ProductMovingEvents endpoint", () => {
      expect(ProductManagerEnpoints.ProductMovingEvents).toBe(`${PRODUCTAPINAME}/v1/ProductMovingEvents`);
    });

    it("should use the correct API name prefix", () => {
      expect(ProductManagerEnpoints.ProductMovingEvents).toContain("/ProductManagerAPI");
    });
  });

  describe("RMAManagerEnpoints", () => {
    it("should have the correct ExchangeEndPoint", () => {
      expect(RMAManagerEnpoints.ExchangeEndPoint).toBe(`${RMAAPINAME}/v1/ConstantContact/exchangeCode`);
    });

    it("should have the correct SearchEndPoint", () => {
      expect(RMAManagerEnpoints.SearchEndPoint).toBe(`${RMAAPINAME}/v1/ConstantContact/searchContact`);
    });

    it("should have the correct SearchContactEndPoint", () => {
      expect(RMAManagerEnpoints.SearchContactEndPoint).toBe(
        `${RMAAPINAME}/v1/ConstantContact/searchContactByContactId`
      );
    });

    it("should have the correct ConfirmIfUserHasExistingValidToken endpoint", () => {
      expect(RMAManagerEnpoints.ConfirmIfUserHasExistingValidToken).toBe(
        `${RMAAPINAME}/v1/ConstantContact/ConfirmIfUserHasExistingValidToken`
      );
    });

    it("should have the correct RMAEndpoints", () => {
      expect(RMAManagerEnpoints.RMAEndpoints).toBe(`${RMAAPINAME}/v1/RMAs`);
    });

    it("should have the correct ProductAssessedEventsEndPoints", () => {
      expect(RMAManagerEnpoints.ProductAssessedEventsEndPoints).toBe(`${RMAAPINAME}/v1/ProductAssessedEvents`);
    });

    it("should have the correct SalesOrderAddedEventsEndPoints", () => {
      expect(RMAManagerEnpoints.SalesOrderAddedEventsEndPoints).toBe(`${RMAAPINAME}/v1/SalesOrderAddedEvents`);
    });

    it("should have the correct RepairInProgressEventsEndPoints", () => {
      expect(RMAManagerEnpoints.RepairInProgressEventsEndPoints).toBe(`${RMAAPINAME}/v1/RepairInProgressEvents`);
    });

    it("should have the correct CloseRMAEventsEndPoints", () => {
      expect(RMAManagerEnpoints.CloseRMAEventsEndPoints).toBe(`${RMAAPINAME}/v1/RMACloseEvents`);
    });

    it("should have the correct RMAProductByStage endpoint", () => {
      expect(RMAManagerEnpoints.RMAProductByStage).toBe(`${RMAAPINAME}/v1/RMAs/Stage`);
    });

    it("should have the correct PackageReceivedEventsEndPoints", () => {
      expect(RMAManagerEnpoints.PackageReceivedEventsEndPoints).toBe(`${RMAAPINAME}/v1/PackageReceivedEvents`);
    });

    it("should have the correct LabelSentEventsEndPoints", () => {
      expect(RMAManagerEnpoints.LabelSentEventsEndPoints).toBe(`${RMAAPINAME}/v1/LabelSentEvents`);
    });

    it("should have the correct RMANextNumberEndpoint", () => {
      expect(RMAManagerEnpoints.RMANextNumberEndpoint).toBe(`${RMAAPINAME}/v1/RMANextNumbers`);
    });

    it("should have the correct TrackingGroupedRMAProduct endpoint", () => {
      expect(RMAManagerEnpoints.TrackingGroupedRMAProduct).toBe(`${RMAAPINAME}/v1/RMATracking`);
    });

    it("should have the correct GetRMATrackingDetails endpoint", () => {
      expect(RMAManagerEnpoints.GetRMATrackingDetails).toBe(`${RMAAPINAME}/v1/RMATracking/TrackingReportDetail`);
    });

    it("should use the correct API name prefix for all endpoints", () => {
      const endpoints = Object.values(RMAManagerEnpoints);
      endpoints.forEach((endpoint) => {
        expect(endpoint).toContain("/RMAManagerAPI");
      });
    });

    it("should have all endpoints follow v1 versioning pattern", () => {
      const endpoints = Object.values(RMAManagerEnpoints);
      endpoints.forEach((endpoint) => {
        expect(endpoint).toContain("/v1/");
      });
    });
  });

  describe("Endpoint object structure", () => {
    it("should have ProductManagerEnpoints object with expected properties", () => {
      expect(ProductManagerEnpoints).toHaveProperty("ProductMovingEvents");
      expect(Object.keys(ProductManagerEnpoints)).toHaveLength(2);
    });

    it("should have RMAManagerEnpoints object with expected properties", () => {
      const expectedProperties = [
        "ExchangeEndPoint",
        "SearchEndPoint",
        "SearchContactEndPoint",
        "ConfirmIfUserHasExistingValidToken",
        "RMAEndpoints",
        "ProductAssessedEventsEndPoints",
        "SalesOrderAddedEventsEndPoints",
        "RepairInProgressEventsEndPoints",
        "CreateChangeProductStageEndPoints",
        "CloseRMAEventsEndPoints",
        "RMAProductByStage",
        "PackageReceivedEventsEndPoints",
        "LabelSentEventsEndPoints",
        "RMANextNumberEndpoint",
        "TrackingGroupedRMAProduct",
        "GetRMATrackingDetails",
        "GetRMAProblemTypesEndPoint",
        "GetRMASolutionTypesEndPoint",
        "GetReportsEndpoint",
        "GetTrackingDetailsBySpecifics"







      ];

      expectedProperties.forEach((property) => {
        expect(RMAManagerEnpoints).toHaveProperty(property);
      });

      expect(Object.keys(RMAManagerEnpoints)).toHaveLength(expectedProperties.length);
    });

    it("should have all endpoint values as strings", () => {
      const allEndpoints = {
        ...ProductManagerEnpoints,
        ...RMAManagerEnpoints,
      };

      Object.values(allEndpoints).forEach((endpoint) => {
        expect(typeof endpoint).toBe("string");
        expect(endpoint.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Constant Contact endpoints", () => {
    it("should group all Constant Contact endpoints under ConstantContact path", () => {
      const constantContactEndpoints = [
        RMAManagerEnpoints.ExchangeEndPoint,
        RMAManagerEnpoints.SearchEndPoint,
        RMAManagerEnpoints.SearchContactEndPoint,
        RMAManagerEnpoints.ConfirmIfUserHasExistingValidToken,
      ];

      constantContactEndpoints.forEach((endpoint) => {
        expect(endpoint).toContain("/ConstantContact/");
      });
    });
  });

  describe("RMA Event endpoints", () => {
    it("should have consistent naming pattern for event endpoints", () => {
      const eventEndpoints = [
        RMAManagerEnpoints.ProductAssessedEventsEndPoints,
        RMAManagerEnpoints.SalesOrderAddedEventsEndPoints,
        RMAManagerEnpoints.RepairInProgressEventsEndPoints,
        RMAManagerEnpoints.CloseRMAEventsEndPoints,
        RMAManagerEnpoints.PackageReceivedEventsEndPoints,
        RMAManagerEnpoints.LabelSentEventsEndPoints,
      ];

      eventEndpoints.forEach((endpoint) => {
        expect(endpoint).toMatch(/Events$/);
      });
    });
  });
});

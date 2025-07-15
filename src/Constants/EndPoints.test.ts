import { RegistrationEnpoints, ModelManagerEnpoints, ProductManagerEnpoints } from "./EndPoints";

describe("RegistrationEnpoints constants", () => {
  it("should have correct UsersEndpoint", () => {
    expect(RegistrationEnpoints.UsersEndpoint).toBe("/RegistrationManagerAPI/v1/Users");
  });
  it("should have correct ResourceResponsibilityEndPoint", () => {
    expect(RegistrationEnpoints.ResourceResponsibilityEndPoint).toBe(
      "/RegistrationManagerAPI/v1/ResourceResponsibilitys"
    );
  });
  it("should have correct SignatureManagerEndpoint", () => {
    expect(RegistrationEnpoints.SignatureManagerEndpoint).toBe("/RegistrationManagerAPI/v1/SignatureManagers");
  });
  it("should have correct EMailSenderEndpoint", () => {
    expect(RegistrationEnpoints.EMailSenderEndpoint).toBe("/RegistrationManagerAPI/v1/EMailSenders");
  });
});

describe("ModelManagerEnpoints constants", () => {
  it("should have correct ProcessFlowGroupEndpoint", () => {
    expect(ModelManagerEnpoints.ProcessFlowGroupEndpoint).toBe("/ModelManagerAPI/v1/ProcessFlowGroups");
  });
  it("should have correct ModelTypeEndpoint", () => {
    expect(ModelManagerEnpoints.ModelTypeEndpoint).toBe("/ModelManagerAPI/v1/ModelTypes");
  });
  it("should have correct ModelEndpoint", () => {
    expect(ModelManagerEnpoints.ModelEndpoint).toBe("/ModelManagerAPI/v1/Models");
  });
  it("should have correct TestPointEndpoint", () => {
    expect(ModelManagerEnpoints.TestPointEndpoint).toBe("/ModelManagerAPI/v1/DefaultTestPoints");
  });
  it("should have correct ModelVersionEndpoint", () => {
    expect(ModelManagerEnpoints.ModelVersionEndpoint).toBe("/ModelManagerAPI/v1/ModelVersions");
  });
  it("should have correct ModelVersionQueryStringEndpoint", () => {
    expect(ModelManagerEnpoints.ModelVersionQueryStringEndpoint).toBe("/ModelManagerAPI/v1/ModelVersions/QueryString");
  });
  it("should have correct MaxModelVersionQueryStringEndpoint", () => {
    expect(ModelManagerEnpoints.MaxModelVersionQueryStringEndpoint).toBe(
      "/ModelManagerAPI/v1/ModelVersions/MostRecentVersion"
    );
  });
  it("should have correct EditableModelVersionEndpoint", () => {
    expect(ModelManagerEnpoints.EditableModelVersionEndpoint).toBe("/ModelManagerAPI/v1/ModelVersions/EditableVersion");
  });
  it("should have correct ModelVersionDocumentEndpoint", () => {
    expect(ModelManagerEnpoints.ModelVersionDocumentEndpoint).toBe("/ModelManagerAPI/v1/ModelVersionDocuments");
  });
  it("should have correct ModelVersionDocumentQueryStringEndpoint", () => {
    expect(ModelManagerEnpoints.ModelVersionDocumentQueryStringEndpoint).toBe(
      "/ModelManagerAPI/v1/ModelVersionDocuments/QueryString"
    );
  });
  it("should have correct DocumentEndpoint", () => {
    expect(ModelManagerEnpoints.DocumentEndpoint).toBe("/ModelManagerAPI/v1/ModelVersionDocuments/Document");
  });
  it("should have correct ViewSpecificModelVersionEndpoint", () => {
    expect(ModelManagerEnpoints.ViewSpecificModelVersionEndpoint).toBe(
      "/ModelManagerAPI/v1/ModelVersions/ViewSpecificVersion"
    );
  });
});

describe("ProductManagerEnpoints constants", () => {
  it("should have correct GetProductByStage", () => {
    expect(ProductManagerEnpoints.GetProductByStage).toBe("/ProductManagerAPI/v1/Products/Stage");
  });
  it("should have correct UpdateProductByStage", () => {
    expect(ProductManagerEnpoints.UpdateProductByStage).toBe("/ProductManagerAPI/v1/Products/Stage");
  });
  it("should have correct ModelVersionReassignment", () => {
    expect(ProductManagerEnpoints.ModelVersionReassignment).toBe(
      "/ProductManagerAPI/v1/Products/ModelVersionReassignment"
    );
  });
  it("should have correct UpdateProductBySurfacePrepStage", () => {
    expect(ProductManagerEnpoints.UpdateProductBySurfacePrepStage).toBe("/ProductManagerAPI/v1/Products/SurfacePrep");
  });
  it("should have correct PrintStageCardEndpoint", () => {
    expect(ProductManagerEnpoints.PrintStageCardEndpoint).toBe("/ProductManagerAPI/v1/Products/PrintStageCard");
  });
  it("should have correct UpdateProductByExercise", () => {
    expect(ProductManagerEnpoints.UpdateProductByExercise).toBe("/ProductManagerAPI/v1/Products/Exercise");
  });
  it("should have correct ReprintSurfacePrepLabel", () => {
    expect(ProductManagerEnpoints.ReprintSurfacePrepLabel).toBe(
      "/ProductManagerAPI/v1/ProductSurfacePreparationEvents/RePrintLabel"
    );
  });
  it("should have correct PrintActualOutputLabel", () => {
    expect(ProductManagerEnpoints.PrintActualOutputLabel).toBe(
      "/ProductManagerAPI/v1/ProductLabellingEvents/PrintActualOutPutLabel"
    );
  });
  it("should have correct BatchEndpoint", () => {
    expect(ProductManagerEnpoints.BatchEndpoint).toBe("/ProductManagerAPI/v1/Batchs");
  });
  it("should have correct BatchNoEndpoint", () => {
    expect(ProductManagerEnpoints.BatchNoEndpoint).toBe("/ProductManagerAPI/v1/Batchs/GetNewBatchNo");
  });
  it("should have correct BatchbySerialNoEndpoint", () => {
    expect(ProductManagerEnpoints.BatchbySerialNoEndpoint).toBe("/ProductManagerAPI/v1/Batchs/SerialNo");
  });
  it("should have correct DefectTypeEndpoint", () => {
    expect(ProductManagerEnpoints.DefectTypeEndpoint).toBe("/ProductManagerAPI/v1/DefectTypes");
  });
  it("should have correct DefectLogEndpoint", () => {
    expect(ProductManagerEnpoints.DefectLogEndpoint).toBe("/ProductManagerAPI/v1/DefectLogs");
  });
  it("should have correct TesterEndpoint", () => {
    expect(ProductManagerEnpoints.TesterEndpoint).toBe("/ProductManagerAPI/v1/Testers");
  });
  it("should have correct ReferenceCellStandards", () => {
    expect(ProductManagerEnpoints.ReferenceCellStandards).toBe("/ProductManagerAPI/v1/ReferenceCellStandards");
  });
  it("should have correct ProductInitialAutoVerificationEventEndpoint", () => {
    expect(ProductManagerEnpoints.ProductInitialAutoVerificationEventEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductInitialVerificationEvents/Auto"
    );
  });
  it("should have correct ProductInitialManualVerificationEventEndpoint", () => {
    expect(ProductManagerEnpoints.ProductInitialManualVerificationEventEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductInitialVerificationEvents/Manual"
    );
  });
  it("should have correct ProductFinalManualVerificationEventEndpoint", () => {
    expect(ProductManagerEnpoints.ProductFinalManualVerificationEventEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductFinalVerificationEvents/Manual"
    );
  });
  it("should have correct ProductFinalAutoVerificationEventEndpoint", () => {
    expect(ProductManagerEnpoints.ProductFinalAutoVerificationEventEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductFinalVerificationEvents/Auto"
    );
  });
  it("should have correct RMCEndPoint", () => {
    expect(ProductManagerEnpoints.RMCEndPoint).toBe("/CompressionTesterAPI/v1/Devices");
  });
  it("should have correct VerificationEndPoint", () => {
    expect(ProductManagerEnpoints.VerificationEndPoint).toBe("/CompressionTesterAPI/v1/AutoVerification");
  });
  it("should have correct TrimResistorEndpoint", () => {
    expect(ProductManagerEnpoints.TrimResistorEndpoint).toBe("/ProductManagerAPI/v1/TrimmingResistors");
  });
  it("should have correct ShuntResistorEndpoint", () => {
    expect(ProductManagerEnpoints.ShuntResistorEndpoint).toBe("/ProductManagerAPI/v1/ShuntResistors");
  });
  it("should have correct GetProductById", () => {
    expect(ProductManagerEnpoints.GetProductById).toBe("/ProductManagerAPI/v1/Products/");
  });
  it("should have correct GetProductBySerialNoOrBatchNo", () => {
    expect(ProductManagerEnpoints.GetProductBySerialNoOrBatchNo).toBe(
      "/ProductManagerAPI/v1/Products/SerialNoOrBatcNo"
    );
  });
  it("should have correct NCRLogs", () => {
    expect(ProductManagerEnpoints.NCRLogs).toBe("/ProductManagerAPI/v1/NCRLogs");
  });
  it("should have correct ProductMovingEvents", () => {
    expect(ProductManagerEnpoints.ProductMovingEvents).toBe("/ProductManagerAPI/v1/ProductMovingEvents");
  });
  it("should have correct ReferenceCellStandardEndPoint", () => {
    expect(ProductManagerEnpoints.ReferenceCellStandardEndPoint).toBe("/ProductManagerAPI/v1/ReferenceCellStandards");
  });
  it("should have correct TrackingGroupedProduct", () => {
    expect(ProductManagerEnpoints.TrackingGroupedProduct).toBe("/ProductManagerAPI/v1/ProductsTracking");
  });
  it("should have correct GetTrackingReportDetails", () => {
    expect(ProductManagerEnpoints.GetTrackingReportDetails).toBe(
      "/ProductManagerAPI/v1/ProductsTracking/TrackingReportDetail"
    );
  });
  it("should have correct GetTrackingDetailsBySpecifics", () => {
    expect(ProductManagerEnpoints.GetTrackingDetailsBySpecifics).toBe(
      "/ProductManagerAPI/v1/ProductsTracking/TrackingDetailsBySpecifics"
    );
  });
  it("should have correct SearchCertificatesEndpoint", () => {
    expect(ProductManagerEnpoints.SearchCertificatesEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductCertificates/QueryString"
    );
  });
  it("should have correct GetCertificatesByGuidEndpoint", () => {
    expect(ProductManagerEnpoints.GetCertificatesByGuidEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductCertificates/CertificateGuid"
    );
  });
  it("should have correct GetCertificatesByProductIdEndpoint", () => {
    expect(ProductManagerEnpoints.GetCertificatesByProductIdEndpoint).toBe(
      "/ProductManagerAPI/v1/ProductCertificates/CertificateProductId"
    );
  });
  it("should have correct IndicatorsModelEndpoint", () => {
    expect(ProductManagerEnpoints.IndicatorsModelEndpoint).toBe("/ProductManagerAPI/v1/IndicatorModels");
  });
  it("should have correct TransmitterModelEndpoint", () => {
    expect(ProductManagerEnpoints.TransmitterModelEndpoint).toBe("/ProductManagerAPI/v1/TransmitterModels");
  });
  it("should have correct GetReportsEndpoint", () => {
    expect(ProductManagerEnpoints.GetReportsEndpoint).toBe("/ProductManagerAPI/v1/ProductsTracking");
  });
});

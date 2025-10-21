export interface PurchasingGetRequestByStage {
  Stage: string | undefined;
  DraftAssessment: boolean;
}
export interface PurchasingResponseDTO {
  rmaNumber: number;
  customerEmail: string;
  dateIssued?: Date;
  dateReceived?: Date;
  rmaProblemDescription: string;
  stage: string;
  salesPerson: string;
  companyName: string;
  contactName: string;
  street?: string;
  city?: string;
  province?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
  notes: string;

  draftAssessment: boolean;
  salesOrderId?: string;
  guidId: string; // UUID string
}
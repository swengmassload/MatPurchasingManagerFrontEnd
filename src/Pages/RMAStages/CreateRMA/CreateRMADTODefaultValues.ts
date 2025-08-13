import { DefaultRMAStages } from "../../../Constants/RMAStages";
import { RMACreateRequestDTO } from "../../../Models/RMAManagerModels/Dto";

export const DefaultRMAFormValues: RMACreateRequestDTO = {
  // rMANumber: undefined,
  customerEmail: "",
  dateIssued: new Date(),
  dateReceived: undefined,
  rMAProblemDescription: "",
  stage: DefaultRMAStages.LABELSENT.code,
  salesPerson: "",
  companyName: "",
  contactName: "",
  street: "",
  city: "",
  province: "",
  zipCode: "",
  country: "",
  phoneNumber: "",

  notes: "",

  guidId: undefined,
  createContact: false,
};

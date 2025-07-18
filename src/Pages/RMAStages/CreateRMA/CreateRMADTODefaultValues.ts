import { DefaultRMAStages } from "../../../Constants/RMAStages"
import { RMACreateRequestDTO } from "../../../Models/RMAManagerModels/Dto"

export const DefaultRMAFormValues: RMACreateRequestDTO = {


        rMANumber: undefined,
        customerEmail: "",
        dateIssued: new Date(),
        dateRecieved: undefined,
        rMAProblemDescription: "",
        status: DefaultRMAStages.LABELSENT.code,
        salesPerson: "",
        companyName: "",
        contactName: "",
        city: "",
        province: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
        faxNumber: "",
        notes: "",
        guidId: undefined,
        createContact: false,
      }
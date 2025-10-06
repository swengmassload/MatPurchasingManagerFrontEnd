import { useState, useEffect } from "react";
import { RMACreateRequestDTO, RMAResponseDTO } from "../../../../Models/RMAManagerModels/Dto";
import { Lead, Opportunity } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { useCreateRMA } from "../../../../Hooks/useCreateRMA";

import { DefaultRMAFormValues } from "../CreateRMADTODefaultValues";
import toast from "react-hot-toast";

export const useCreateRMAForm = (selectedContact?: Lead | null, selectedOpportunity?: Opportunity | null) => {
  const createRMAMutation = useCreateRMA();
  const [formData, setFormData] = useState<RMACreateRequestDTO>(DefaultRMAFormValues);
  const [errors, setErrors] = useState<Partial<RMACreateRequestDTO>>({});

  useEffect(() => {
    if (selectedContact) {
      setFormData((prev) => ({
        ...prev,
        customerEmail: selectedContact?.emailAddress || "",
        street: selectedContact?.street || "",
        city: selectedContact?.city || "",
        zipCode: selectedContact?.zipcode || "",
        province: selectedContact?.state || "",
        country: selectedContact?.country || "",
        contactName: `${selectedContact?.firstName || ""} ${selectedContact?.lastName || ""}`.trim(),
        companyName: selectedContact?.companyName || "",
        phoneNumber: selectedContact?.officePhoneNumber || selectedContact?.phoneNumber || "",


      }));
      toast.success(`Form populated with contact: ${selectedContact.firstName} ${selectedContact.lastName}`);
    }
  }, [selectedContact]);

  useEffect(() => {
    if (selectedOpportunity) {
      const noteFields = [
        //selectedOpportunity?.opportunityName,
        { label: "Service Type", value: selectedOpportunity?.type_of_service_633489e2066cb },
        { label: "Product Enquiry", value: selectedOpportunity?.product_enquiry_633487faea1c8 },
        { label: "Message", value: selectedOpportunity?.message_633489f949d24 },
        { label: "RFQ Data", value: selectedOpportunity?.rfq_data_dump_6334bf377f7f6 },
        { label: "Quote Source", value: selectedOpportunity?.quote_source_634de14fe2552 },
        { label: "Opportunity Details", value: selectedOpportunity?.opportunity_6398afa43a373 },
        { label: "Contact By", value: selectedOpportunity?.contact_by_633489cc3366e },
        { label: "Loss Reason", value: selectedOpportunity?.reasons_for_loss__outbound_sales___6859ca4e19edb },
      ]
        .filter((field) => field.value && field.value.trim() !== "") // Filter out empty/null values
        .map((field) => `${field.label}: ${field.value}`); // Format as "Label: Value"

      const note = noteFields.length > 0 ? noteFields.join(" | ") : "No additional details available";
      console.log("Generated note from opportunity:", selectedOpportunity);
      console.log("Generated note from opportunity:", note);

      setFormData((prev) => ({
        ...prev,

        rMAProblemDescription: selectedOpportunity?.opportunityName || "",
        notes: note,
      }));
      toast.success(`Form populated with Opportunity: ${selectedOpportunity?.opportunityName || ""}`);
    }
  }, [selectedOpportunity]);

  const handleFieldChange =
    (field: keyof RMACreateRequestDTO) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleDateChange = (field: "dateIssued" | "dateReceived") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    setFormData((prev) => ({ ...prev, [field]: date }));
  };

  const handleCreateContactChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, createContact: checked }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RMACreateRequestDTO> = {};

    if (!formData.customerEmail) {
      newErrors.customerEmail = "Customer email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }


    if (formData.rMAProblemDescription && formData.rMAProblemDescription.length > 400) {
      newErrors.rMAProblemDescription = "Problem description must be at most 400 characters";
    }
    if (formData.notes && formData.notes.length > 300) {
      newErrors.notes = "Notes must be at most 300 characters";
    }

    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactName) {
      newErrors.contactName = "Contact name is required";
    }

    if (formData.phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const downloadDocumentFromBytes = (byteArray: any, filename: string = "RMA_Document.doc") => {
    try {
      console.log("Raw response type:", typeof byteArray);
      console.log("Raw response:", byteArray);

      // Determine MIME type based on file extension
      const getMimeType = (filename: string) => {
        const extension = filename.split(".").pop()?.toLowerCase();
        switch (extension) {
          case "doc":
            return "application/msword";
          case "docx":
            return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          case "pdf":
            return "application/pdf";
          case "txt":
            return "text/plain";
          case "rtf":
            return "application/rtf";
          default:
            return "application/octet-stream";
        }
      };

      let processedData: any;

      // Handle different response formats
      if (typeof byteArray === "string") {
        console.log("Converting from Base64 string");
        // If it's a Base64 string, convert it to bytes
        try {
          processedData = Uint8Array.from(atob(byteArray), (c) => c.charCodeAt(0));
        } catch (e) {
          console.error("Failed to decode Base64, treating as plain text");
          processedData = new TextEncoder().encode(byteArray);
        }
      } else if (byteArray instanceof Uint8Array) {
        console.log("Using Uint8Array directly");
        processedData = byteArray;
      } else if (byteArray instanceof ArrayBuffer) {
        console.log("Converting from ArrayBuffer");
        processedData = new Uint8Array(byteArray);
      } else if (Array.isArray(byteArray)) {
        console.log("Converting from number array");
        processedData = new Uint8Array(byteArray);
      } else {
        console.log("Converting object to JSON string");
        // If it's an object, convert to JSON string then to bytes
        const jsonString = JSON.stringify(byteArray);
        processedData = new TextEncoder().encode(jsonString);
      }

      console.log("Processed data type:", processedData.constructor.name);
      console.log("Processed data length:", processedData.length);

      // Create a Blob from the processed data
      const blob = new Blob([processedData], {
        type: getMimeType(filename),
      });

      console.log("Blob size:", blob.size);
      console.log("Blob type:", blob.type);

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element for download
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      URL.revokeObjectURL(url);

      toast.success(`Document "${filename}" downloaded successfully!`);
    } catch (error) {
      console.error("Error downloading document:", error);
      toast.error("Failed to download document. Please try again.");
    }
  };

  const openDefaultMailClient = (rmaData: RMAResponseDTO) => {
    const subject = encodeURIComponent(`RMA #${rmaData.guidId || "New"} - Return Merchandise Authorization`);

    const body = encodeURIComponent(`Dear Customer,

      Your RMA #${rmaData.rmaNumber || "New"} has been created successfully.

      RMA Details:
      - RMA Number: ${rmaData.rmaNumber || "N/A"}
      - Customer: ${formData.contactName}
      - Company: ${formData.companyName}
      - Email: ${formData.customerEmail}
      - Problem Description: ${formData.rMAProblemDescription}

      Please retain this information for your records.

      Best regards,
      RMA Management Team`);

    const mailtoLink = `mailto:${formData.customerEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_blank");
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors before submitting");
      return;
    }

    try {
      const createdRMA = await createRMAMutation.mutateAsync(formData);
      console.log("RMA created successfully:", createdRMA);

      if (createdRMA) {
        toast.success(`RMA  created successfully!`);

        const filename = `RMAShippingLabel-No_${createdRMA.rmaData.rmaNumber}_${createdRMA.rmaData.contactName}_${new Date().toISOString().split("T")[0]}.doc`;
        downloadDocumentFromBytes(createdRMA.rmaLabel, filename);

        // If it's a regular response object, open mail client
        openDefaultMailClient(createdRMA.rmaData);
        //  }

        // Reset form after successful creation
        setFormData(DefaultRMAFormValues);
        setErrors({});
      }
    } catch (error) {
      // Error handling is done in the mutation
      alert("Failed to create RMA. Please try again.");
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleReset = () => {
    setFormData(DefaultRMAFormValues);
    setErrors({});
  };

  const handleClearContact = () => {
    setFormData((prev) => ({
      ...prev,
      customerEmail: "",
      contactName: "",
    }));
    toast.success("Contact information cleared from form");
  };

  return {
    formData,
    errors,
    isSubmitting: createRMAMutation.isPending,
    handleFieldChange,
    handleDateChange,
    handleCreateContactChange,
    handleSubmit,
    handleReset,
    handleClearContact,
    createdRMA: createRMAMutation.data || null,
  };
};

import { useState, useEffect } from "react";
import { RMACreateRequestDTO, RMAResponseDTO } from "../../../../Models/RMAManagerModels/Dto";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { useCreateRMA } from "../../../../Hooks/useCreateRMA";
//import { useGetRMANumber } from "../../../../Hooks/useGetRMANumber";
import { DefaultRMAFormValues } from "../CreateRMADTODefaultValues";
import toast from "react-hot-toast";

export const useCreateRMAForm = (selectedContact?: Contact | null) => {
  // const nextNumberRequest = useGetRMANumber();
  const createRMAMutation = useCreateRMA();
  const [formData, setFormData] = useState<RMACreateRequestDTO>(DefaultRMAFormValues);
  const [errors, setErrors] = useState<Partial<RMACreateRequestDTO>>({});

  useEffect(() => {
    if (selectedContact) {
      setFormData((prev) => ({
        ...prev,
        customerEmail: selectedContact.email_address?.address || "",
        street:selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.street    || "",            
        city: selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.city|| "",
        zipCode: selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.postal_code || "",
        province: selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.state || "",
        country: selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.country || "",
        contactName: `${selectedContact.first_name || ""} ${selectedContact.last_name || ""}`.trim(),
        companyName: selectedContact.company_name || "",
        phoneNumber: selectedContact.phone_numbers?.filter((phone) => phone.kind === "work")[0]?.phone_number || "",

      }));
      toast.success(`Form populated with contact: ${selectedContact.first_name} ${selectedContact.last_name}`);
    }
  }, [selectedContact]);

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
    debugger;
    if (!formData.customerEmail) {
      newErrors.customerEmail = "Customer email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "Invalid email format";
    }

    if (!formData.rMAProblemDescription) {
      newErrors.rMAProblemDescription = "Problem description is required";
    } else if (formData.rMAProblemDescription.length < 10) {
      newErrors.rMAProblemDescription = "Problem description must be at least 10 characters";
    }

    if (!formData.companyName) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.contactName) {
      newErrors.contactName = "Contact name is required";
    }

    // if (!formData.salesPerson) {
    //   newErrors.salesPerson = "Sales person is required";
    // }

    if (formData.phoneNumber && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      debugger;
      // Show alert with RMA details
      if (createdRMA) {
        const alertMessage = `
🎉 RMA Created Successfully!

RMA Number: ${createdRMA.rmaNumber}
Customer: ${createdRMA.contactName || "N/A"}
Company: ${createdRMA.companyName || "N/A"}
Email: ${createdRMA.customerEmail || "N/A"}
Status: ${createdRMA.stage || "New"}
Date Created: ${new Date().toLocaleDateString()}

Problem Description: ${formData.rMAProblemDescription?.substring(0, 100)}${(formData.rMAProblemDescription?.length || 0) > 100 ? "..." : ""}
        `.trim();

        alert(alertMessage);

        // Also show a toast for quick feedback
        toast.success(`RMA #${createdRMA.rmaNumber || "New"} created successfully!`);
      } else {
        alert("RMA created successfully but no details returned");
        toast.success("RMA created successfully!");
      }

      // refresh next RMA number
      //nextNumberRequest.refetch();
      // Reset form after successful submission
      setFormData(DefaultRMAFormValues);
      setErrors({});
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

  const generateRMADataAsText = (createdRMA: RMAResponseDTO): string => {
    return `
=== RMA REQUEST DETAILS ===

Date Created: ${new Date().toLocaleDateString()}
Status: ${createdRMA.stage || "New"}

=== CUSTOMER INFORMATION ===
Customer Email: ${createdRMA.customerEmail || "N/A"}
Company Name: ${createdRMA.companyName || "N/A"}
Contact Name: ${createdRMA.contactName || "N/A"}
Phone Number: ${createdRMA.phoneNumber || "N/A"}

=== RMA DETAILS ===
Sales Person: ${createdRMA.salesPerson || "N/A"}
Date Issued: ${createdRMA.dateIssued ? createdRMA.dateIssued.toLocaleDateString() : "N/A"}
Date Received: ${createdRMA.dateReceived ? createdRMA.dateReceived.toLocaleDateString() : "N/A"}

=== PROBLEM DESCRIPTION ===
${formData.rMAProblemDescription || "N/A"}

=== ADDITIONAL NOTES ===
${formData.notes || "None"}

=== CONTACT PREFERENCES ===
Create Contact: ${formData.createContact ? "Yes" : "No"}

Generated on: ${new Date().toISOString()}
    `.trim();
  };

  const handleSendMail = (attachmentFiles?: File[]) => {
    const createdRMA = createRMAMutation.data;
    if (!createdRMA) {
      toast.error("Please create an RMA first before sending email");
      return;
    }

    const subject = encodeURIComponent(
      `RMA Request - ${createdRMA.rmaNumber ? `RMA #${createdRMA.rmaNumber}` : "New RMA"}`
    );

    const attachmentText =
      attachmentFiles && attachmentFiles.length > 0
        ? `\n\nManual Attachments to include:\n${attachmentFiles.map((file) => `- ${file.name} (${(file.size / 1024).toFixed(1)} KB)`).join("\n")}\n\nNote: Please manually attach these files to your email.`
        : "";

    // Auto-generate RMA data as text attachment content
    const rmaDataText = generateRMADataAsText(createdRMA);

    const body = encodeURIComponent(
      `
Dear ${createdRMA.contactName || "Customer"},

This is regarding your RMA request with the following details:

RMA Number: ${createdRMA.rmaNumber || "To be assigned"}
Customer Email: ${createdRMA.customerEmail}
Company: ${createdRMA.companyName}
Contact Name: ${createdRMA.contactName}
Phone Number: ${createdRMA.phoneNumber}
Status: ${createdRMA.stage}

Problem Description:
${formData.rMAProblemDescription}

${formData.notes ? `Additional Notes:\n${formData.notes}` : ""}${attachmentText}

=== COMPLETE RMA DATA (Copy to .txt file if needed) ===
${rmaDataText}
=== END RMA DATA ===

Please let us know if you need any further assistance.

Best regards,
${formData.salesPerson || "Sales Team"}
    `.trim()
    );

    const mailtoLink = `mailto:${formData.customerEmail}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;
      if (attachmentFiles && attachmentFiles.length > 0) {
        toast.success(
          `Default mail client opened. Please manually attach ${attachmentFiles.length} file(s) mentioned in the email.`
        );
      } else {
        toast.success("Default mail client opened");
      }
    } catch (error) {
      toast.error("Failed to open mail client");
      console.error("Error opening mail client:", error);
    }
  };

  const generateAndDownloadRMAFile = (createdRMA: RMAResponseDTO): File => {
    const rmaData = generateRMADataAsText(createdRMA);
    const fileName = `RMA_${createdRMA.rmaNumber || "New"}_${new Date().toISOString().split("T")[0]}.txt`;

    // Create a Blob with the RMA data
    const blob = new Blob([rmaData], { type: "text/plain" });

    // Create a File object
    const file = new File([blob], fileName, { type: "text/plain" });

    // Auto-download the file
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`RMA data file downloaded: ${fileName}`);
    return file;
  };

  const handleSendMailWithAttachments = async (attachmentFiles: File[]) => {
    const createdRMA = createRMAMutation.data;
    if (!createdRMA) {
      toast.error("Please create an RMA first before sending email with attachments");
      return;
    }

    try {
      // Auto-generate and download RMA data file
      const rmaDataFile = generateAndDownloadRMAFile(createdRMA);

      // Combine user attachments with auto-generated RMA file
      const allAttachments = [rmaDataFile, ...attachmentFiles];

      // Create FormData for file uploads
      const formDataForEmail = new FormData();

      // Add RMA details
      formDataForEmail.append("to", createdRMA.customerEmail || "");
      formDataForEmail.append(
        "subject",
        `RMA Request - ${createdRMA.rmaNumber ? `RMA #${createdRMA.rmaNumber}` : "New RMA"}`
      );
      formDataForEmail.append(
        "body",
        `
Dear ${formData.contactName || "Customer"},

This is regarding your RMA request with the following details:

RMA Number: ${createdRMA.rmaNumber || "To be assigned"}
Customer Email: ${createdRMA.customerEmail}
Company: ${createdRMA.companyName}
Contact Name: ${createdRMA.contactName}
Phone Number: ${createdRMA.phoneNumber}
Status: ${createdRMA.stage}

Problem Description:
${formData.rMAProblemDescription}

${formData.notes ? `Additional Notes:\n${formData.notes}` : ""}

Please let us know if you need any further assistance.

Best regards,
${formData.salesPerson || "Sales Team"}
      `.trim()
      );

      // Add attachments (including auto-generated RMA file)
      allAttachments.forEach((file, index) => {
        formDataForEmail.append(`attachment_${index}`, file);
      });

      // TODO: Replace with your actual email API endpoint
      // const response = await fetch('/api/send-email-with-attachments', {
      //   method: 'POST',
      //   body: formDataForEmail,
      // });

      // For now, just simulate the API call
      console.log("Email with attachments would be sent:", {
        to: formData.customerEmail,
        attachments: allAttachments.map((f) => f.name),
      });

      toast.success(
        `Email with ${allAttachments.length} attachment(s) would be sent via email service (including auto-generated RMA data file)`
      );
    } catch (error) {
      toast.error("Failed to send email with attachments");
      console.error("Error sending email:", error);
    }
  };

  const handleSendMailWithAutoFile = () => {
    const createdRMA = createRMAMutation.data;
    if (!createdRMA) {
      toast.error("Please create an RMA first before sending email with auto file");
      return;
    }

    // Auto-generate and download RMA data file
    const rmaDataFile = generateAndDownloadRMAFile(createdRMA);

    // Send email with file reference
    handleSendMail([rmaDataFile]);
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
    handleSendMail,
    handleSendMailWithAttachments,
    handleSendMailWithAutoFile,
    handleClearContact,
    createdRMA: createRMAMutation.data || null,
  };
};

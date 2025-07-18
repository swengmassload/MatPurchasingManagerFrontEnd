import { useState, useEffect } from "react";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { useCreateRMA } from "../../../../Hooks/useCreateRMA";
import { useGetRMANumber } from "../../../../Hooks/useGetRMANumber";
import { DefaultRMAFormValues } from "../CreateRMADTODefaultValues";
import toast from "react-hot-toast";

export const useCreateRMAForm = (selectedContact?: Contact | null) => {
  const nextNumberRequest = useGetRMANumber();
  const createRMAMutation = useCreateRMA();
  const [formData, setFormData] = useState<RMACreateRequestDTO>(DefaultRMAFormValues);
  const [errors, setErrors] = useState<Partial<RMACreateRequestDTO>>({});

  // Handle RMA number assignment
  useEffect(() => {
    if (nextNumberRequest.data && nextNumberRequest.data.length > 0) {
      if (nextNumberRequest.data.length === 1) {
        setFormData((prev) => ({ ...prev, rMANumber: nextNumberRequest.data![0].nextNumber }));
      } else {
        alert("Multiple RMA numbers found, please check the API response. Contact support To resolve this issue.");
        console.error("Multiple RMA numbers found:", nextNumberRequest.data);
      }
    } else if (nextNumberRequest.data && nextNumberRequest.data.length === 0) {
      alert("No RMA Number Found. Contact support To resolve this issue.");
      console.warn("No RMA number found in the response");
      setFormData((prev) => ({ ...prev, rMANumber: undefined }));
    }
  }, [nextNumberRequest.data]);

  // Auto-populate form when contact is selected
  useEffect(() => {
    if (selectedContact) {
      setFormData((prev) => ({
        ...prev,
        customerEmail: selectedContact.email_address?.address || "",
        contactName: `${selectedContact.first_name || ""} ${selectedContact.last_name || ""}`.trim(),
        companyName: selectedContact.company_name || "",
        phoneNumber:
          selectedContact.phone_numbers
            ?.map((phone) => phone.phone_number)
            .filter(Boolean)
            .join(", ") || "",
      }));
      toast.success(`Form populated with contact: ${selectedContact.first_name} ${selectedContact.last_name}`);
    }
  }, [selectedContact]);

  const handleFieldChange = (field: keyof RMACreateRequestDTO) => 
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleDateChange = (field: 'dateIssued' | 'dateRecieved') => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.salesPerson) {
      newErrors.salesPerson = "Sales person is required";
    }

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
      await createRMAMutation.mutateAsync(formData);
      console.log("RMA created successfully:", formData);
      // refresh next RMA number
      nextNumberRequest.refetch();
      // Reset form after successful submission
      setFormData(DefaultRMAFormValues);
      setErrors({});
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Error in handleSubmit:", error);
    }
  };

  const handleReset = () => {
    setFormData(DefaultRMAFormValues);
    setErrors({});
  };

  const handleSendMail = () => {
    const subject = encodeURIComponent(
      `RMA Request - ${formData.rMANumber ? `RMA #${formData.rMANumber}` : "New RMA"}`
    );
    const body = encodeURIComponent(
      `
Dear ${formData.contactName || "Customer"},

This is regarding your RMA request with the following details:

RMA Number: ${formData.rMANumber || "To be assigned"}
Customer Email: ${formData.customerEmail}
Company: ${formData.companyName}
Contact Name: ${formData.contactName}
Phone Number: ${formData.phoneNumber}
Status: ${formData.status}

Problem Description:
${formData.rMAProblemDescription}

${formData.notes ? `Additional Notes:\n${formData.notes}` : ""}

Please let us know if you need any further assistance.

Best regards,
${formData.salesPerson || "Sales Team"}
    `.trim()
    );

    const mailtoLink = `mailto:${formData.customerEmail}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;
      toast.success("Default mail client opened");
    } catch (error) {
      toast.error("Failed to open mail client");
      console.error("Error opening mail client:", error);
    }
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
    handleClearContact,
  };
};

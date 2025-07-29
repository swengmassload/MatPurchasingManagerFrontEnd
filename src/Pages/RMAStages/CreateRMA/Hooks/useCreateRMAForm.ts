import { useState, useEffect } from "react";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";
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
  const [showMailModal, setShowMailModal] = useState(false);

  useEffect(() => {
    if (selectedContact) {
      setFormData((prev) => ({
        ...prev,
        customerEmail: selectedContact.email_address?.address || "",
        street: selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.street || "",
        city: selectedContact.street_addresses?.filter((addr) => addr.kind === "work")[0]?.city || "",
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

      if (createdRMA) {
        // Show success toast
        toast.success(`RMA #${createdRMA.rmaNumber || "New"} created successfully!`);

        // Show mail sender modal
        setShowMailModal(true);
      }

      // Don't reset form yet - wait for modal to close
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

  const handleCloseMailModal = () => {
    setShowMailModal(false);
    // Reset form after modal closes
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
    showMailModal,
    handleFieldChange,
    handleDateChange,
    handleCreateContactChange,
    handleSubmit,
    handleReset,
    handleCloseMailModal,
    handleClearContact,
    createdRMA: createRMAMutation.data || null,
  };
};

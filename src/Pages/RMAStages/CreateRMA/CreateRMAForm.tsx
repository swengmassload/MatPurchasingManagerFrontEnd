import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { Contact } from "../../../Models/ConstantContactModels/ConstantContactDTO";
import { ValidToken } from "../../../Hooks/useGetConfirmIfUserHasExistingValidToken";
import { useCreateRMAForm } from "./Hooks/useCreateRMAForm";
import CustomerInformationSection from "./Components/CustomerInformationSection";
import AddressInformationSection from "./Components/AddressInformationSection";
import RMADetailsSection from "./Components/RMADetailsSection";
import ContactOptionsSection from "./Components/ContactOptionsSection";
import FormActions from "./Components/FormActions";
import MailSenderModal from "./Components/MailSenderModal";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

interface CreateRMAFormProps {
  selectedContact?: Contact | null;
  tokenValidationResult?: ValidToken | null;
}

const CreateRMAForm: React.FC<CreateRMAFormProps> = ({ selectedContact, tokenValidationResult }) => {


  const {
    formData,
    errors,
    isSubmitting,
    showMailModal,
    handleFieldChange,
    handleDateChange,
    handleCreateContactChange,
    handleSubmit,
    handleCloseMailModal,
    createdRMA,
  } = useCreateRMAForm(selectedContact);

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 2, pt: 0 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 0 }}>
          Fill out the form below to create a new Return Merchandise Authorization (RMA).
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={1}>
            <CustomerInformationSection formData={formData} errors={errors} onFieldChange={handleFieldChange} />

            <AddressInformationSection formData={formData} onFieldChange={handleFieldChange} />

            <RMADetailsSection
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              onDateChange={handleDateChange}
            />

            <ContactOptionsSection
              formData={formData}
              tokenValidationResult={tokenValidationResult}
              onCreateContactChange={handleCreateContactChange}
            />

            <FormActions isSubmitting={isSubmitting} />
          </Stack>
        </form>

        {/* Mail Sender Modal */}
        {showMailModal && createdRMA && (
          <MailSenderModal
            open={showMailModal}
            onClose={handleCloseMailModal}
            rmaData={createdRMA}
           
          />
        )}
      </Paper>
    </Box>
  );
};

export default CreateRMAForm;

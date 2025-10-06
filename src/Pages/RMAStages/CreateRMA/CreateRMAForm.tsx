import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { Lead, Opportunity } from "../../../Models/ConstantContactModels/ConstantContactDTO";

import { useCreateRMAForm } from "./Hooks/useCreateRMAForm";
import CustomerInformationSection from "./Components/CustomerInformationSection";
import AddressInformationSection from "./Components/AddressInformationSection";
import RMADetailsSection from "./Components/RMADetailsSection";

import FormActions from "./Components/FormActions";

interface CreateRMAFormProps {
  selectedLead?: Lead | null;
  selectedOpportunity?: Opportunity | null;
}

const CreateRMAForm: React.FC<CreateRMAFormProps> = ({ selectedLead, selectedOpportunity }) => {
  const {
    formData,
    errors,
    isSubmitting,
    handleFieldChange,
    handleDateChange,

    handleSubmit,
  } = useCreateRMAForm(selectedLead, selectedOpportunity);

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

            <FormActions isSubmitting={isSubmitting} />
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateRMAForm;

import React from "react";
import { Box, Button } from "@mui/material";
import { Email } from "@mui/icons-material";
import { Contact } from "../../../../Models/ConstantContactModels/ConstantContactDTO";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";

interface FormActionsProps {
  selectedContact?: Contact | null;
  formData: RMACreateRequestDTO;
  isSubmitting: boolean;
  onClearContact: () => void;
  onSendMail: () => void;
  onReset: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  selectedContact,
  formData,
  isSubmitting,
  onClearContact,
  onSendMail,
  onReset,
}) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
      {selectedContact && (
        <Button type="button" variant="outlined" color="warning" onClick={onClearContact} disabled={isSubmitting}>
          Clear Contact
        </Button>
      )}
      <Button
        type="button"
        variant="outlined"
        color="info"
        startIcon={<Email />}
        onClick={onSendMail}
        disabled={isSubmitting || !formData.customerEmail}
        sx={{ minWidth: 120 }}
      >
        Send Mail
      </Button>
      <Button type="button" variant="outlined" onClick={onReset} disabled={isSubmitting}>
        Reset Form
      </Button>
      <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ minWidth: 120 }}>
        {isSubmitting ? "Creating..." : "Create RMA"}
      </Button>
    </Box>
  );
};

export default FormActions;

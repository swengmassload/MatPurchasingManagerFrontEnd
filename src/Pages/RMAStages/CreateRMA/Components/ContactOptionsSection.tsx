import React from "react";
import { Card, CardContent, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";
import { ValidToken } from "../../../../Hooks/useGetConfirmIfUserHasExistingValidToken";
import toast from "react-hot-toast";

interface ContactOptionsSectionProps {
  formData: RMACreateRequestDTO;
  tokenValidationResult?: ValidToken | null;
  onCreateContactChange: (checked: boolean) => void;
}

const ContactOptionsSection: React.FC<ContactOptionsSectionProps> = ({
  formData,
  tokenValidationResult,
  onCreateContactChange,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Token validation result:", tokenValidationResult);
    // Only allow changes if token is valid or no token validation result exists yet
    if (tokenValidationResult && tokenValidationResult.isValid) {
      onCreateContactChange(e.target.checked);
    } else {
      // Show a toast message when user tries to change disabled checkbox
      toast.error("Please search for a contact in Constant Contact first to enable this option.");
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Contact Options
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <FormControlLabel
          control={<Checkbox checked={formData.createContact} onChange={handleCheckboxChange} color="primary" />}
          label="Create a new contact record for this customer"
        />

        {!tokenValidationResult || !tokenValidationResult.isValid ? (
          <Typography variant="body2" color="warning.main" sx={{ mt: 1, ml: 4, fontWeight: "medium" }}>
            ⚠️ Please search for the contact in Constant Contact first to enable this option.
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
            Check this box if you want to create a new contact record in the system for this customer.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactOptionsSection;

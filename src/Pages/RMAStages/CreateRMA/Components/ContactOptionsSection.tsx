import React from "react";
import { Card, CardContent, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material";
import { RMACreateRequestDTO } from "../../../../Models/RMAManagerModels/Dto";



interface ContactOptionsSectionProps {
  formData: RMACreateRequestDTO;

  onCreateContactChange: (checked: boolean) => void;
}

const ContactOptionsSection: React.FC<ContactOptionsSectionProps> = ({
  formData,

  onCreateContactChange,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 onCreateContactChange(e.target.checked);
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

   
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, ml: 4 }}>
            Check this box if you want to create a new contact record in the system for this customer.
          </Typography>
     
      </CardContent>
    </Card>
  );
};

export default ContactOptionsSection;

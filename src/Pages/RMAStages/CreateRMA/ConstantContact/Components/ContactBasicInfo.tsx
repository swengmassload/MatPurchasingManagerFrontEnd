import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Contact } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import ContactDetailField from "./ContactDetailField";

interface ContactBasicInfoProps {
  contact: Contact;
}

const ContactBasicInfo: React.FC<ContactBasicInfoProps> = ({ contact }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: "text.primary",
          mb: 0.5,
        }}
      >
        {contact.first_name || "N/A"} {contact.last_name || "N/A"}
      </Typography>

      <Stack spacing={1.5}>
        <ContactDetailField label="Contact ID" value={contact.contact_id} />
        <ContactDetailField label="Company" value={contact.company_name} />
        <ContactDetailField label="Job Title" value={contact.job_title} />
        <ContactDetailField label="Email Address" value={contact.email_address?.address} />
      </Stack>
    </Box>
  );
};

export default ContactBasicInfo;

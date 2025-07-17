import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { DetailContact } from "../../../../../Models/ConstantContactModels/ConstantContactDTO";
import { formatDate } from "../../../../../Utils/formatDate";
import ContactDetailField from "./ContactDetailField";

interface DetailedContactInfoProps {
  contactDetails: DetailContact;
}

const DetailedContactInfo: React.FC<DetailedContactInfoProps> = ({ contactDetails }) => {
  return (
    <Stack spacing={1.5}>
      <ContactDetailField label="Contact ID" value={contactDetails.contact_id} />

      <ContactDetailField
        label="Full Name"
        value={`${contactDetails.first_name || "N/A"} ${contactDetails.last_name || "N/A"}`}
      />

      <ContactDetailField label="Company" value={contactDetails.company_name} />
      <ContactDetailField label="Job Title" value={contactDetails.job_title} />

      {/* Email Details */}
      {contactDetails.email_address && (
        <>
          <ContactDetailField label="Email Address" value={contactDetails.email_address.address} />
          <ContactDetailField
            label="Permission to Send"
            value={contactDetails.email_address.permission_to_send || "N/A"}
          />
          <ContactDetailField label="Opt-in Source" value={contactDetails.email_address.opt_in_source} />
        </>
      )}

      {/* Phone Numbers */}
      {contactDetails.phone_numbers && contactDetails.phone_numbers.length > 0 && (
        <ContactDetailField label="Phone Number(s)" isFlexStart>
          <Box sx={{ textAlign: "right", maxWidth: "60%" }}>
            {contactDetails.phone_numbers
              .filter((phone) => phone.phone_number)
              .map((phone, index) => (
                <Typography key={index} variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                  {phone.phone_number}
                  {phone.kind && ` (${phone.kind})`}
                </Typography>
              ))}
          </Box>
        </ContactDetailField>
      )}

      <ContactDetailField label="Fax Number" value={contactDetails.fax_number} />

      {/* Street Addresses */}
      {contactDetails.street_addresses && contactDetails.street_addresses.length > 0 && (
        <ContactDetailField label="Address(es)" isFlexStart>
          <Box sx={{ textAlign: "right", maxWidth: "60%" }}>
            {contactDetails.street_addresses.map((address, index) => (
              <Typography key={index} variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {[address.street, address.city, address.state, address.postal_code, address.country_code]
                  .filter(Boolean)
                  .join(", ")}
              </Typography>
            ))}
          </Box>
        </ContactDetailField>
      )}

      {/* Birthday */}
      {(contactDetails.birthday_month || contactDetails.birthday_day) && (
        <ContactDetailField
          label="Birthday"
          value={
            contactDetails.birthday_month && contactDetails.birthday_day
              ? `${contactDetails.birthday_month}/${contactDetails.birthday_day}`
              : `Month: ${contactDetails.birthday_month || "N/A"}, Day: ${contactDetails.birthday_day || "N/A"}`
          }
        />
      )}

      <ContactDetailField label="Anniversary" value={contactDetails.anniversary} />

      {/* Notes */}
      {contactDetails.notes && (
        <ContactDetailField label="Notes" isFlexStart>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "60%", textAlign: "right" }}>
            {contactDetails.notes}
          </Typography>
        </ContactDetailField>
      )}

      <ContactDetailField label="Create Source" value={contactDetails.create_source} />
      <ContactDetailField label="Update Source" value={contactDetails.update_source} />

      {/* Source */}
      {contactDetails.source && (
        <ContactDetailField
          label="Source"
          value={
            typeof contactDetails.source === "object" ? JSON.stringify(contactDetails.source) : contactDetails.source
          }
        />
      )}

      <ContactDetailField label="Opt Out Reason" value={contactDetails.opt_out_reason} />

      {/* List Memberships */}
      {contactDetails.list_memberships && contactDetails.list_memberships.length > 0 && (
        <ContactDetailField label="List Memberships" isFlexStart>
          <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "60%", textAlign: "right" }}>
            {contactDetails.list_memberships.join(", ")}
          </Typography>
        </ContactDetailField>
      )}

      {/* Custom Fields */}
      {contactDetails.custom_fields && contactDetails.custom_fields.length > 0 && (
        <ContactDetailField label="Custom Fields" isFlexStart>
          <Box sx={{ textAlign: "right", maxWidth: "60%" }}>
            {contactDetails.custom_fields.map((field, index) => (
              <Typography key={index} variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {field.custom_field_id}: {field.value}
              </Typography>
            ))}
          </Box>
        </ContactDetailField>
      )}

      {/* Taggings */}
      {contactDetails.taggings && contactDetails.taggings.length > 0 && (
        <ContactDetailField label="Tags" isFlexStart>
          <Box sx={{ textAlign: "right", maxWidth: "60%" }}>
            {contactDetails.taggings.map((tag, index) => (
              <Typography key={index} variant="body2" sx={{ color: "text.secondary", mb: 0.5 }}>
                {tag.tag_id}
              </Typography>
            ))}
          </Box>
        </ContactDetailField>
      )}

      {/* Dates */}
      <ContactDetailField label="Created Date" value={formatDate(contactDetails.created_at)} />
      <ContactDetailField label="Last Updated" value={formatDate(contactDetails.updated_at)} />
    </Stack>
  );
};

export default DetailedContactInfo;

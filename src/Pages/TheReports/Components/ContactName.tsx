import { Box, TextField } from "@mui/material";

interface ContactNameProps {
  contactName: string;
  setContactName: React.Dispatch<React.SetStateAction<string>>;
}

const ContactName = ({
  contactName,
  setContactName

}: ContactNameProps) => {
  return (

        <Box
        sx={{
          width: "100%",  }}
        >
          <TextField fullWidth label="contactName" type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} />
        </Box>


  );
};

export default ContactName;

import { Box, TextField } from "@mui/material";

interface CustomerEmailProps {
  customerEmail: string;
  setCustomerEmail  : React.Dispatch<React.SetStateAction<string>>;
}

const CustomerEmailForReport = ({
  customerEmail,
  setCustomerEmail

}: CustomerEmailProps) => {
  return (

        <Box
        sx={{
          width: "100%",  }}
        >
          <TextField fullWidth label="customerEmail" type="text" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
        </Box>


  );
};

export default CustomerEmailForReport;

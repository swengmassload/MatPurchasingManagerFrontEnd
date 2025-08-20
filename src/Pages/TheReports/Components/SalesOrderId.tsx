import { Box, TextField } from "@mui/material";

interface SalesOrderIdProps {
  salesOrderId: string;
  setSalesOrderId: React.Dispatch<React.SetStateAction<string>>;
}

const SalesOrderId = ({
  salesOrderId,
  setSalesOrderId 

}: SalesOrderIdProps) => {
  return (

        <Box
        sx={{
          width: "100%",  }}
        >
          <TextField fullWidth label="salesOrderId" type="text" value={salesOrderId} onChange={(e) => setSalesOrderId(e.target.value)} />
        </Box>


  );
};

export default SalesOrderId;

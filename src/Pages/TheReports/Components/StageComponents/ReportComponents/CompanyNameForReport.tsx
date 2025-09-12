import { Box, TextField } from "@mui/material";

interface CompanyProps {
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyNameForReport = ({
  companyName,
  setCompanyName

}: CompanyProps) => {
  return (

        <Box
        sx={{
          width: "100%",  }}
        >
          <TextField fullWidth label="companyName" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </Box>

  );
};

export default CompanyNameForReport;

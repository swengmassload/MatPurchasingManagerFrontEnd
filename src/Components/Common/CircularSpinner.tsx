import { Dialog, Box, CircularProgress, Typography } from "@mui/material";
interface TanstackFetchingCircularSpinnerProps {
  isFetching: boolean;
  caption: string;
}

const CircularSpinner = ({ isFetching, caption }: TanstackFetchingCircularSpinnerProps) => {
  return (
    <Dialog open={isFetching}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>{caption}</Typography>
      </Box>
    </Dialog>
  );
};

export default CircularSpinner;

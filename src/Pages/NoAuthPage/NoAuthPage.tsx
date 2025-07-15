import { Box } from "@mui/material";
import assets from "../../assets";
interface NoAuthPageProps {
  message?: string;
}
const NoAuthPage = ({message="How on earth did you get here ?"}:NoAuthPageProps) => {
  document.title = "No Auth Page";
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" //
    >
      <Box
        component="img"
        src={assets.images.confusedface}
        sx={{
          paddingRight: "0px",
          objectFit: "cover",
          width: "215px",
          height: "10",
        }}
      ></Box>
      <Box>
        <h1>{message}</h1>
      </Box>
    </Box>
  );
};

export default NoAuthPage;

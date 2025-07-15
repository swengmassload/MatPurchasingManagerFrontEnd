import { Card } from "@mui/material";
import styled from "styled-components";

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export const CustomCard = styled(Card)(({ theme }) => ({
//     maxWidth: "283px",
//     width: "283px",
  
  
//     "&.MuiPaper-root": {
//       margin: 0,
//       marginBottom: "10px",
//     },
//     "& .MuiCardContent-root": {
//         margin: 0,
//         padding: 1,
//       },
//   }));

export const CustomCard = styled(Card)({
 // maxWidth: '283px',
  //width: '283px',
  '&.MuiPaper-root': {
    margin: 0,
    marginBottom: '10px',
    padding: 0,
    boxShadow: 'none', 
  },
  '& .MuiCardContent-root': {
    margin: 0,
    padding: 2,
  },

  '& .MuiCardContent-root:last-child': {
    margin: 0,
    padding: 0,
  },
});





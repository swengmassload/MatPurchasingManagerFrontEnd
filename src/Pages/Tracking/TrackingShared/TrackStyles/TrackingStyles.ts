import { Typography } from "@mui/material";


import {  styled } from "@mui/material";
import { Paper, TableCell, TableRow,} from "@mui/material";
import { sideBarColor } from "../../../../Constants/ComponentStyles";
export const Title = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: sideBarColor,

  fontWeight: "bold",
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));


export const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  overflow: "hidden",
  width: "600px",
}));
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.grey[100],
  width: "30%",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const StyledValueCell = styled(TableCell)(({ theme }) => ({
  width: "70%",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SectionHeader = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  "& th": {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: "1.1rem",
    padding: theme.spacing(1, 2),
  },
}));



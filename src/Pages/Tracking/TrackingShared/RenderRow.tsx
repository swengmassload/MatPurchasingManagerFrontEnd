import { TableRow } from "@mui/material";
import { StyledTableCell, StyledValueCell } from "./TrackStyles/TrackingStyles";

interface RenderRowProps {
    label: string | undefined;
    value: any | null;
    }


const RenderRow = ({label, value}:RenderRowProps) => {


  let displayValue = value;
  if (typeof value === "number") {

    displayValue = value;
  } else if (typeof value === "boolean") {
    displayValue = value ? "Yes" : "No";
  } else if (value instanceof Date) {
    displayValue = value.toLocaleString();
  }

  return (
    <TableRow>
      <StyledTableCell>{label}</StyledTableCell>
      <StyledValueCell>{displayValue}</StyledValueCell>
    </TableRow>
  );
};

export default RenderRow;

import { Box, TextField } from "@mui/material";
import { SimpleBoxborder } from "../../../../../Components/Common/SimpleBoxborder";

interface RMANumberRangeProps {
  startRMANumber: number | null;
  endRMANumber: number | null;
  setStartRMANumber: React.Dispatch<React.SetStateAction<number | null>>;
  setEndRMANumber: React.Dispatch<React.SetStateAction<number | null>>;
}
const ProductIdNumberRange = ({ startRMANumber, endRMANumber, setStartRMANumber, setEndRMANumber }: RMANumberRangeProps) => {
  return (
    <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
      Type one or a range of RMA Numbers
      <Box sx={{ display: "flex", gap: 2, p: 1, alignItems: "center", width: "100%" }}>
        <Box>
          <TextField
            label=""
            value={startRMANumber ?? ""}
            onChange={(e) => setStartRMANumber(e.target.value === "" ? null : Number(e.target.value))}
            type="number"
          />
        </Box>
        to
        <Box>
          <TextField
            label=""
            value={endRMANumber ?? ""}
            onChange={(e) => setEndRMANumber(e.target.value === "" ? null : Number(e.target.value))}
            type="number"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductIdNumberRange;

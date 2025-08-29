import { Box } from "@mui/material";
import RMAListSection from "./RMAListSection";
import { RMAResponseDTO } from "../../../../Models/RMAManagerModels/Dto";

interface AssessPackageRMAListPanelProps {
  rmaList: RMAResponseDTO[];
  onSelectRMA: (rma: RMAResponseDTO) => void;
  selectedRMANumber:  number | null;
  isLoading: boolean;
}

const AssessPackageRMAListPanel = ({
  rmaList,
  onSelectRMA,
  selectedRMANumber,
  isLoading,
}: AssessPackageRMAListPanelProps) => (
  <Box sx={{ flex: "0 0 400px", minWidth: { xs: "100%", md: "400px" } }}>
    <RMAListSection
      rmaList={rmaList}
      onSelectRMA={onSelectRMA}
      selectedRMANumber={selectedRMANumber}
      isLoading={isLoading}
    />
  </Box>
);

export default AssessPackageRMAListPanel;

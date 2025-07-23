import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";

import { useState } from "react";
import { RMATrackingReportDetailResponseDTO } from "../../../Models/RMAManagerModels/Dto";
import { LayOutHeader } from "../../../Components/Common/Headers";
import TrackingRMAs from "./TrackingRMAs";
import TrackingSelectedRMAEvents from "./TrackingSelectedRMAEvents";
import TrackingSelectedRMAInfo from "./TrackingSelectedRMAInfo";
import { SortedAvailableEvents } from "./SortedAvailableEvents";

interface TrackingDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  data: RMATrackingReportDetailResponseDTO[];
  additionalInfo?: string;
}

const TrackingDetailsDialog: React.FC<TrackingDetailsDialogProps> = ({ open, onClose, data, additionalInfo }) => {
  debugger;
  console.log("TrackingDetailsDialog Rendered", data);
  console.log("Additional Info:", additionalInfo);
  const [selectedTrackingDetail, setSelectedTrackingDetail] = useState<RMATrackingReportDetailResponseDTO | undefined>(
    undefined
  );
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ p: 0, gap: 0 }}
      maxWidth="xl"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            width: "80vw",
            height: "90vh",
            maxWidth: 1800,
            maxHeight: 1300,
            "&.MuiBox-root": {},
          },
        },
      }}
    >
      {!additionalInfo && (
        <DialogTitle>
          {" "}
          <LayOutHeader>RMA History</LayOutHeader>
        </DialogTitle>
      )}
      {additionalInfo && (
        <DialogTitle>
          {" "}
          <LayOutHeader>RMA History {additionalInfo}</LayOutHeader>{" "}
        </DialogTitle>
      )}
      <DialogContent>
        <Box sx={{ display: "flex", width: "100%", height: "100%", gap: 5 }}>
          <Box>
            <TrackingRMAs data={data} setSelectedTrackingDetail={setSelectedTrackingDetail} />
          </Box>
          <Box>
            <TrackingSelectedRMAInfo product={selectedTrackingDetail?.products} />
          </Box>
          <Box>
            {selectedTrackingDetail && (
              <TrackingSelectedRMAEvents filterEvents={SortedAvailableEvents(selectedTrackingDetail) || []} />
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TrackingDetailsDialog;

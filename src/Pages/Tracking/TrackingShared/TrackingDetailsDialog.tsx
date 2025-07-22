import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from "@mui/material";

import { useState } from "react";
import { RMAGetTrackingDetailRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import { LayOutHeader } from "../../../Components/Common/Headers";

interface TrackingDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  data: RMAGetTrackingDetailRequestDTO[];
  additionalInfo?: string;
}

const TrackingDetailsDialog: React.FC<TrackingDetailsDialogProps> = ({ open, onClose, data, additionalInfo }) => {
  const [selectedTrackingDetail, setSelectedTrackingDetail] = useState<RMAGetTrackingDetailRequestDTO | undefined>(
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
          <LayOutHeader>Product History</LayOutHeader>
        </DialogTitle>
      )}
      {additionalInfo && (
        <DialogTitle>
          {" "}
          <LayOutHeader>Product History {additionalInfo}</LayOutHeader>{" "}
        </DialogTitle>
      )}
      <DialogContent>
        <Box sx={{ display: "flex", width: "100%", height: "100%", gap: 5 }}>
          {/* <Box>
            <TrackingProducts data={data} setSelectedTrackingDetail={setSelectedTrackingDetail} />
          </Box>
          <Box>
            <TrackingSelectedProductInfo product={selectedTrackingDetail?.products} />
          </Box>
          <Box>
            {selectedTrackingDetail && (
              <TrackingSelectedProductEvents filterEvents={SortedAvailableEvents(selectedTrackingDetail) || []} />
            )}
          </Box> */}
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

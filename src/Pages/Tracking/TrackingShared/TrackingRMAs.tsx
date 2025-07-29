import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

import { sideBarColor } from "../../../Constants/ComponentStyles";
import { RMATrackingReportDetailResponseDTO } from "../../../Models/RMAManagerModels/Dto";
import { Title } from "./TrackStyles/TrackingStyles";

interface TrackingDetailsTableProps {
  data: RMATrackingReportDetailResponseDTO[];
  setSelectedTrackingDetail: React.Dispatch<React.SetStateAction<RMATrackingReportDetailResponseDTO | undefined>>;
}

const TrackingRMAs: React.FC<TrackingDetailsTableProps> = ({ data, setSelectedTrackingDetail }) => {

  console.log("TrackingRMAs Rendered", data);
  const handleTableCellClicked = (
    _: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    detail: RMATrackingReportDetailResponseDTO
  ) => {
    setSelectedTrackingDetail(detail);

  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: 2,
          p: 4,
          maxWidth: 300,
          maxHeight: 900,
          overflow: "auto",
          backgroundColor: sideBarColor,
        }}
      >
        <Title variant="h6" align="center">
          RMA Numbers
        </Title>
        <Table size="small">
          <TableHead></TableHead>
          <TableBody sx={{}}>
            {data.map((detail, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    textAlign: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                      cursor: "pointer",
                    },
                  }}
                  onClick={(e) => handleTableCellClicked(e, detail)}
                >
                  {detail.products.rmaNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
    </>
  );
};

export default TrackingRMAs;

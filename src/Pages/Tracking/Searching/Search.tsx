import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CircularSpinner from "../../../Components/Common/CircularSpinner";
import { defaultRMASearchRequestDTOParamsValue, RMASearchRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import RMASearchSpecifier from "../../TheReports/Components/RMASearchSpecifier";
import { useGetSearchRMA } from "../../../Hooks/useGetSearchRMA";
import TrackingDetailsDialog from "../TrackingShared/TrackingDetailsDialog";

const Search = () => {
  const [searchParams, setSearchParams] = useState<RMASearchRequestDTO>(defaultRMASearchRequestDTOParamsValue);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const searchRMARequest = useGetSearchRMA(searchParams, enableSearch);
  const [openTrackingDetailsDialog, setOpenTrackingDetailsDialog] = useState(false);

  useEffect(() => {
    if (enableSearch) {
      searchRMARequest.refetch();
    }
  }, [enableSearch]);

  const handleSearchRMA = async (input: RMASearchRequestDTO) => {
    var data: RMASearchRequestDTO = {
      startDateIssued: input.startDateIssued,
      endDateIssued: input.endDateIssued,
      endDateReceived: input.endDateReceived,
      startDateReceived: input.startDateReceived,
      salesOrderId: input.salesOrderId,
      rmaNumberStart: input.rmaNumberStart,
      rmaNumberEnd: input.rmaNumberEnd,
      stage: input.stage,
      salesPerson: input.salesPerson,
      contactName: input.contactName,
      companyName: input.companyName,
      customerEmail: input.customerEmail,
      searchBy: input.searchBy,
    };
    try {
      console.log("Search Params:", data);
      setSearchParams(data);
      setEnableSearch(true);

      if (searchRMARequest.data) {
        alert("Search Completed");
 
      }
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  useEffect(() => {
    if (searchRMARequest.isSuccess) {
      setOpenTrackingDetailsDialog(true);
    } else if (searchRMARequest.error) {
      alert("Error Fetching Tracking Details");
    }
  }, [searchRMARequest.isSuccess, searchRMARequest.error, searchRMARequest.data]);
  const handleTrackingDetailsDialogClose = () => {
    setOpenTrackingDetailsDialog(false);
    setEnableSearch(false);
    setSearchParams(defaultRMASearchRequestDTOParamsValue);
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem", width: "70%", justifyContent: "left", alignItems: "flex-start", mt: 3 }}>
      <CircularSpinner isFetching={searchRMARequest.isFetching} caption="Searching RMA..."></CircularSpinner>

      <Box
        sx={{
          display: "flex",

          flexDirection: "column",
          gap: "1rem",
          width: "20%",
          minWidth: "304px",
          justifyContent: "left",
          alignItems: "flex-start",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          minWidth: "px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {openTrackingDetailsDialog && searchRMARequest.data && (
          <TrackingDetailsDialog
            open={openTrackingDetailsDialog}
            onClose={handleTrackingDetailsDialogClose}
            data={searchRMARequest.data || []}
            additionalInfo={` (${searchRMARequest.data?.length}   Items)`}
          />
        )}
        <RMASearchSpecifier RMASearchSpecifierCaption="Search Filters" handleSearchRMA={handleSearchRMA} />

        {/* <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
          <Button onClick={handleSearchRMA}>Search</Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Search;

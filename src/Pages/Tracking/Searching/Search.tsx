import { Box, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import CircularSpinner from "../../../Components/Common/CircularSpinner";
import { defaultRMASearchRequestDTOParamsValue, RMASearchRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import RMASearchSpecifier from "../../TheReports/Components/RMASearchSpecifier";
import { useGetSearchRMA } from "../../../Hooks/useGetSearchRMA";
import TrackingDetailsDialog from "../TrackingShared/TrackingDetailsDialog";

const Search = () => {
  const [startDateIssued, setStartDateIssued] = useState<Dayjs | null>(dayjs());
  const [endDateIssued, setEndDateIssued] = useState<Dayjs | null>(dayjs().add(1, "year"));
  const [startDateReceived, setStartDateReceived] = useState<Dayjs | null>(dayjs());
  const [endDateReceived, setEndDateReceived] = useState<Dayjs | null>(dayjs().add(1, "year"));
  const [salesOrderId, setSalesOrderId] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [startRMANumber, setStartRMANumber] = useState<number | null>(null);
  const [endRMANumber, setEndRMANumber] = useState<number | null>(null);
  const [salesPerson, setSalesPerson] = useState<string>("ALL");
  const [stage, setStage] = useState<string>("ALL");
  const [searchParams, setSearchParams] = useState<RMASearchRequestDTO>(defaultRMASearchRequestDTOParamsValue);
  const [enableSearch, setEnableSearch] = useState<boolean>(false);
  const searchRMARequest = useGetSearchRMA(searchParams, enableSearch);
  const [openTrackingDetailsDialog, setOpenTrackingDetailsDialog] = useState(false);

  useEffect(() => {
    if (enableSearch) {
 
      searchRMARequest.refetch();
    }
  }, [enableSearch]);

  const handleSearchRMA = async () => {
    var data: RMASearchRequestDTO = {
      startDateIssued: startDateIssued ? startDateIssued.format("YYYY-MM-DD") : null,
      endDateIssued: endDateIssued ? endDateIssued.format("YYYY-MM-DD") : null,
      endDateReceived: endDateReceived ? endDateReceived.format("YYYY-MM-DD") : null,
      startDateReceived: startDateReceived ? startDateReceived.format("YYYY-MM-DD") : null,
      salesOrderId: salesOrderId,
      rmaNumberStart: startRMANumber,
      rmaNumberEnd: endRMANumber,
      stage: stage,
      salesPerson: salesPerson,
      contactName: contactName,
      companyName: companyName,
      customerEmail: customerEmail,
    };
    try {
       console.log("Search Params:", data);
      setSearchParams(data);
      setEnableSearch(true);

      if (searchRMARequest.data) {
        alert("Search Completed");
        console.log("Search Results:", searchRMARequest.data);
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
        <RMASearchSpecifier
          startDateIssued={startDateIssued}
          endDateIssued={endDateIssued}
          setStartDateIssued={setStartDateIssued}
          setEndDateIssued={setEndDateIssued}
          startDateReceived={startDateReceived}
          endDateReceived={endDateReceived}
          setStartDateReceived={setStartDateReceived}
          setEndDateReceived={setEndDateReceived}
          startRMANumber={startRMANumber}
          endRMANumber={endRMANumber}
          setStartRMANumber={setStartRMANumber}
          setEndRMANumber={setEndRMANumber}
          companyName={companyName}
          setCompanyName={setCompanyName}
          contactName={contactName}
          setContactName={setContactName}
          customerEmail={customerEmail}
          setCustomerEmail={setCustomerEmail}
          salesOrderId={salesOrderId}
          setSalesOrderId={setSalesOrderId}
          stage={stage}
          setStage={setStage}
          salesPerson={salesPerson}
          setSalesPerson={setSalesPerson}
          // handleGenerateReport={handleGenerateReport}
          RMASearchSpecifierCaption="Search Filters"
        />

        <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
          <Button onClick={handleSearchRMA}>Search</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;

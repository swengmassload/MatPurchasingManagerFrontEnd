import React from "react";
import { Dispatch, SetStateAction } from "react";
import { Box,  Typography } from "@mui/material";
import DateRangeComponent from "./DateRangeComponent";
import RMANumberRange from "./ProductIdNumberRange";
import CompanyName from "./CompanyName";
import ContactName from "./ContactName";
import CustomerEmail from "./CustomerEmail";
import SalesOrderId from "./SalesOrderId";
import AllStagesDropDown from "./StageComponents/AllStagesDropDown";
import AllUsers from "./AllUsers";
import { SimpleBoxborder } from "../../../Components/Common/SimpleBoxborder";
import { Dayjs } from "dayjs";

interface RMASearchSpecifierProps {
  startDateIssued: Dayjs | null;
  endDateIssued: Dayjs | null;
  startDateReceived: Dayjs | null;
  endDateReceived: Dayjs | null;
  startRMANumber: number | null;
  endRMANumber: number | null;
  companyName: string;
  contactName: string;
  customerEmail: string;
  salesOrderId: string;
  stage: string;
  salesPerson: string;
  setStartDateIssued: Dispatch<SetStateAction<Dayjs | null>>;
  setEndDateIssued: Dispatch<SetStateAction<Dayjs | null>>;
  setStartDateReceived: Dispatch<SetStateAction<Dayjs | null>>;
  setEndDateReceived: Dispatch<SetStateAction<Dayjs | null>>;
  setStartRMANumber: Dispatch<SetStateAction<number | null>>;
  setEndRMANumber: Dispatch<SetStateAction<number | null>>;
  setCompanyName: Dispatch<SetStateAction<string>>;
  setContactName: Dispatch<SetStateAction<string>>;
  setCustomerEmail: Dispatch<SetStateAction<string>>;
  setSalesOrderId: Dispatch<SetStateAction<string>>;
  setStage: Dispatch<SetStateAction<string>>;
  setSalesPerson: Dispatch<SetStateAction<string>>;
 // handleGenerateReport: () => void;
 RMASearchSpecifierCaption:string;

}

const RMASearchSpecifier: React.FC<RMASearchSpecifierProps> = ({
  startDateIssued,
  endDateIssued,
  setStartDateIssued,
  setEndDateIssued,
  startDateReceived,
  endDateReceived,
  setStartDateReceived,
  setEndDateReceived,
  startRMANumber,
  endRMANumber,
  setStartRMANumber,
  setEndRMANumber,
  companyName,
  setCompanyName,
  contactName,
  setContactName,
  customerEmail,
  setCustomerEmail,
  salesOrderId,
  setSalesOrderId,
  stage,
  setStage,
  salesPerson,
  setSalesPerson,
//  handleGenerateReport,
RMASearchSpecifierCaption
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%", alignItems: "flex-start" }}>
      {/* Title */}
      <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
        <Typography
          sx={{ fontFamily: "Inter", fontWeight: 500, fontSize: "18px", lineHeight: "30px", letterSpacing: "-1%" }}
        >
          {RMASearchSpecifierCaption} 
        </Typography>
      </Box>
      {/* Date Range Filters */}
      <Box
        sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "left", alignItems: "flex-start", mt: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <DateRangeComponent
              startDate={startDateIssued}
              endDate={endDateIssued}
              setStartDate={setStartDateIssued}
              setEndDate={setEndDateIssued}
              caption="Issued "
            />
            <DateRangeComponent
              startDate={startDateReceived}
              endDate={endDateReceived}
              setStartDate={setStartDateReceived}
              setEndDate={setEndDateReceived}
              caption="Received "
            />
          </Box>
          {/* RMA Number Range and Company/Contact Info */}
          <Box
            sx={{
              ...SimpleBoxborder,
              display: "flex",
              gap: "1rem",
              alignContent: "flex-start",
              padding: "1rem",
              width: "100%",
            }}
          >
            <RMANumberRange
              setEndRMANumber={setEndRMANumber}
              setStartRMANumber={setStartRMANumber}
              startRMANumber={startRMANumber}
              endRMANumber={endRMANumber}
            />
            <Box sx={{ ...SimpleBoxborder, flexDirection: "column", gap: 1, alignItems: "center", width: "100%" }}>
              Company and Contact Information
              <Box sx={{ display: "flex", gap: 2, p: 1, alignItems: "center", width: "100%" }}>
                <CompanyName companyName={companyName} setCompanyName={setCompanyName} />
                <ContactName contactName={contactName} setContactName={setContactName} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Email and Sales Order */}
      <Box
        sx={{
          ...SimpleBoxborder,
          display: "flex",
          gap: "1rem",
          width: "100%",
          justifyContent: "left",
          alignItems: "flex-start",
          mt: 0,
          p: 2,
          pl: 0,
        }}
      >
        <Box sx={{ ...SimpleBoxborder, width: "100%", gap: "2rem", padding: "1rem" }}>
          <CustomerEmail customerEmail={customerEmail} setCustomerEmail={setCustomerEmail} />
          <SalesOrderId salesOrderId={salesOrderId} setSalesOrderId={setSalesOrderId} />
        </Box>
      </Box>
      {/* Stage and Sales Person */}
      <Box
        sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "left", alignItems: "flex-start", mt: 0 }}
      >
        <Box sx={{ ...SimpleBoxborder, width: "100%", gap: "2rem", padding: "1rem" }}>
          <AllStagesDropDown stage={stage} setStage={setStage} />
          <AllUsers salesPerson={salesPerson} setSalesPerson={setSalesPerson} />
        </Box>
      </Box>
      {/* Generate Button */}
      {/* <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
        <Button onClick={handleGenerateReport}>Generate and Export Report</Button>
      </Box> */}
    </Box>
  );
};

export default RMASearchSpecifier;

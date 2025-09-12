import { Box, Button, Typography } from "@mui/material";
import StageComponent from "../../TheReports/Components/StageComponents/SearchingComponenets/StageComponent";
import { useState } from "react";
import { AllStagesAndEvents, StageAndFields } from "../../TheReports/Components/StageComponents/StagesModel";
import dayjs, { Dayjs } from "dayjs";
import FileSaver from "file-saver";
import { RMAReportRequestDTO } from "../../../Models/RMAManagerModels/Dto";
import CircularSpinner from "../../../Components/Common/CircularSpinner";
import { useGenerateReports } from "../../../Hooks/useGenerateReports";
import RMAReportSpecifier from "../../TheReports/Components/StageComponents/ReportComponents/RMAReportSpecifier";


const TheReports = () => {
  const [listOfCheckedFields, setListOfCheckedFields] = useState<StageAndFields[]>(
    AllStagesAndEvents.map((x) => {
      return { stageTitle: x.stageTitle, stageFields: [] };
    })
  );

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
  const downloadRequest = useGenerateReports();

  const handleSetCheckedFields = (newChecked: StageAndFields) => {
    setListOfCheckedFields((prevChecked) => {
      const updatedChecked = [...prevChecked];
      const stageIndex = prevChecked.findIndex((stage) => stage.stageTitle === newChecked.stageTitle);
      if (stageIndex !== -1) {
        updatedChecked[stageIndex] = newChecked;
      }

      return updatedChecked;
    });
  };

  const handleGenerateReport = async () => {
    var data: RMAReportRequestDTO = {
      AllStagesAndEvents: listOfCheckedFields,
      startDateIssued: startDateIssued?.format("YYYY-MM-DD") ?? null,
      endDateIssued: startDateIssued?.day(1).format("YYYY-MM-DD") ?? null,
      endDateReceived: endDateReceived?.format("YYYY-MM-DD") ?? null,
      startDateReceived: startDateReceived?.day(1).format("YYYY-MM-DD") ?? null,
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
      const response = await downloadRequest.mutateAsync(data);

      if (response) {
        const blob = new Blob([response], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        FileSaver.saveAs(blob, "Report Generated File.xlsx");
      }
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: "1rem", width: "70%", justifyContent: "left", alignItems: "flex-start", mt: 3 }}>
      <CircularSpinner isFetching={downloadRequest.isPending} caption="Processing..."></CircularSpinner>

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
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "30px",
            letterSpacing: "-1%",
          }}
        >
          Select Fields to Include :
        </Typography>
        {AllStagesAndEvents.map((stage) => (
          <StageComponent
            key={stage.stageTitle.stageActualTitle}
            stageAndFields={stage}
            checkedStageAndFields={
              listOfCheckedFields.length > 0
                ? (listOfCheckedFields.find((p) => p.stageTitle === stage.stageTitle) as StageAndFields)
                : undefined
            }
            handleSetCheckedFields={handleSetCheckedFields}
          />
        ))}
      </Box>
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
        {/* <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "30px",
              letterSpacing: "-1%",
            }}
          >
            Filter to Selecting the Information You Want :
          </Typography>
        </Box> */}

        <RMAReportSpecifier
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
          RMASearchSpecifierCaption="Filter to Selecting the Information You Want"
        />

        <Box sx={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
          <Button onClick={handleGenerateReport}>Generate and Export Report</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TheReports;

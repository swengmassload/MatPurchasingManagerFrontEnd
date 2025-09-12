import { Box, Button } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SimpleBoxborder } from "../../../Components/Common/SimpleBoxborder";
import { RMASearchRequestDTO, SearchByOptions } from "../../../Models/RMAManagerModels/Dto";
import { useState } from "react";

interface DateRangeComponentProps {
  handleSearchRMA: (input: RMASearchRequestDTO) => Promise<void>;
  caption: string;
  SearchBy: SearchByOptions;
}

const DateRangeComponent = ({ handleSearchRMA, caption, SearchBy }: DateRangeComponentProps) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs().add(1, "year"));
  const handleSubmit = () => {
    var data: RMASearchRequestDTO = {
      startDateIssued: SearchBy === "IssuedDate" ? (startDate ? startDate.format("YYYY-MM-DD") : null) : null,
      endDateIssued: SearchBy === "IssuedDate" ? (endDate ? endDate.format("YYYY-MM-DD") : null) : null,
      searchBy: SearchBy,
      startDateReceived: SearchBy === "ReceivedDate" ? (startDate ? startDate.format("YYYY-MM-DD") : null) : null,
      endDateReceived: SearchBy === "ReceivedDate" ? (endDate ? endDate.format("YYYY-MM-DD") : null) : null,
      salesOrderId: null,
      rmaNumberStart: null,
      rmaNumberEnd: null,
      stage: null,
      salesPerson: null,
      contactName: null,
      companyName: null,
      customerEmail: null,
    };
    handleSearchRMA(data);
  };

  return (
    <Box
      sx={{
        ...SimpleBoxborder,
        gap: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <Box sx={{ width: "100%", display: "flex",  flexDirection: "row",justifyContent: "space-between" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              width: "50%",

              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <DatePicker
              label={caption + "Start Date"}
              value={startDate}
              // format="MMM DD, YYYY"
              onChange={(newValue) => setStartDate(dayjs.isDayjs(newValue) && newValue.isValid() ? newValue : null)}
            />
          </Box>
          <Box
            sx={{
              width: "50%",

              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
              padding: "1rem",
            }}
          >
            <DatePicker
              label={caption + "End Date"}
              value={endDate}
              //format="MMM DD, YYYY"
              onChange={(newValue) => setEndDate(dayjs.isDayjs(newValue) && newValue.isValid() ? newValue : null)}
            />
          </Box>
        </LocalizationProvider>
      </Box>
      <Box sx={{  gap: "1rem", width: "100%", justifyContent: "center", padding: "1rem" }}>
        <Button onClick={handleSubmit}>Search</Button>
      </Box>
    </Box>
  );
};

export default DateRangeComponent;

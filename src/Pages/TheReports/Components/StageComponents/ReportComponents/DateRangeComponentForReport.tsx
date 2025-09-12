import { Box } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SimpleBoxborder } from "../../../../../Components/Common/SimpleBoxborder";

interface DateRangeComponentProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  caption: string;
  //
}

const DateRangeComponentForReport = ({ startDate, endDate, setStartDate, setEndDate, caption }: DateRangeComponentProps) => {
  return (
    <Box
      sx={{
        ...SimpleBoxborder,
        gap: 2,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        padding: "1rem",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
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
            display: "flex",
            flexDirection: "column",
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
  );
};

export default DateRangeComponentForReport;

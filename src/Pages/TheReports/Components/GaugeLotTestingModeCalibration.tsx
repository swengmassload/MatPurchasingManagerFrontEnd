// import { Box, TextField } from "@mui/material";
// import { AllOutputUnitTypes } from "../../../../Constants/StandardUnits";
// import { AllTestingModes } from "../../../../Constants/DefaultTestingModes";

// interface GaugeLotTestingModeCalibrationProps {
//   gauge: string;
//   setGauge: React.Dispatch<React.SetStateAction<string>>;
//   lotNo: string;
//   setLotNo: React.Dispatch<React.SetStateAction<string>>;
//   testingMode: string;
//   setTestingMode: React.Dispatch<React.SetStateAction<string>>;
//   calibration: string;
//   setCalibration: React.Dispatch<React.SetStateAction<string>>;
//   // add props here
// }

// const GaugeLotTestingModeCalibration = ({
//   gauge,
//   lotNo,
//   setGauge,
//   setLotNo,
//   testingMode,
//   setTestingMode,
//   calibration,
//   setCalibration,
// }: GaugeLotTestingModeCalibrationProps) => {
//   return (
//     <Box sx={{ display: "flex", alignItems: "left", width: "100%" }}>
//       <Box
//         sx={{
//           width: "50%",
//           display: "flex",

//           gap: "2rem",
//           justifyContent: "left",
//           alignItems: "center",
//             padding: "1rem",
//         }}
//       >
//         <Box
//         sx={{
//           width: "100%",  }}
//         >
//           <TextField fullWidth label="Gauge" type="text" value={gauge} onChange={(e) => setGauge(e.target.value)} />
//         </Box>
//         <Box
//         sx={{
//           width: "100%",  }}
//         >
//           <TextField fullWidth label="LotNo" type="text" value={lotNo} onChange={(e) => setLotNo(e.target.value)} />
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           width: "50%",
//           display: "flex",

//           gap: "1rem",
//           justifyContent: "center",
//           alignItems: "center",
//           //   padding: "1rem",
//         }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             gap: "1rem",
//             justifyContent: "center",
//             alignItems: "center",
//             // padding: "1rem",
//           }}
//         >
//           <TextField
//             fullWidth
//             select
//             sx={{ width: "100%" }}
//             value={testingMode}
//             slotProps={{
//               inputLabel: {
//                 shrink: true,
//               },
//               select: {
//                 native: true,
//                 variant: "standard",
//                 onChange: (event) => {
//                   setTestingMode(event.target.value as unknown as string);
//                 },
//               },
//             }}
//             label="Testing Mode"
//           >
//             {[...AllTestingModes, { code: "ALL" }].map((option) => (
//               <option key={option.code} value={option.code}>
//                 {option.code}
//               </option>
//             ))}
//           </TextField>
//         </Box>
//         <Box
//           sx={{
//             width: "100%",
//             display: "flex",
//             gap: "1rem",
//             justifyContent: "center",
//             alignItems: "center",
//             //padding: "1rem",
//           }}
//         >
//           <TextField
//             fullWidth
//             select
//             sx={{ width: "100%" }}
//             value={calibration || ""}
//             slotProps={{
//               inputLabel: {
//                 shrink: true,
//               },
//               select: {
//                 native: true,
//                 variant: "standard",
//                 onChange: (event) => {
//                   setCalibration(event.target.value as unknown as string);
//                 },
//               },
//             }}
//             label="Calibration Type"
//           >
//             {[...AllOutputUnitTypes, { name: "ALL", code: "ALL" }].map((option) => (
//               <option key={option.code} value={option.code}>
//                 {option.name} - {option.code}
//               </option>
//             ))}
//           </TextField>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default GaugeLotTestingModeCalibration;

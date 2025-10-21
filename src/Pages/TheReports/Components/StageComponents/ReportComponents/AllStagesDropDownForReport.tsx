// //
// import { TextField } from "@mui/material";
// import { RMAStage, DefaultRMAStages } from "../../../../../Constants/PurchasingStages";

// interface StagesProps {
//   stage: string;
//   setStage: React.Dispatch<React.SetStateAction<string>>;
// }
// const allStages: RMAStage = {
//   stage: "All Stages",
//   code: "ALL",
//   priority: -111,
//   CommonName: "All Stages",
//   stageCardName: "All Stages",
// };
// const NullPaddedDefaultProductionStages: RMAStage[] = [...DefaultRMAStages.AllStages, allStages];

// const AllStagesDropDownForReport = ({ stage, setStage }: StagesProps) => {
//   return (
//     <TextField
//       fullWidth
//       select
//       sx={{ width: "100%" }}
//       value={stage || ""}
//       slotProps={{
//         inputLabel: {
//           shrink: true,
//         },
//         select: {
//           native: true,
//           variant: "standard",
//           onChange: (event) => {
//             setStage(event.target.value as unknown as string);
//           },
//         },
//       }}
//       label="Current Stage"
//     >
//       {NullPaddedDefaultProductionStages.map((option) => (
//         <option key={option.code} value={option.stage}>
//           {option.CommonName}
//         </option>
//       ))}
//     </TextField>
//   );
// };

// export default AllStagesDropDownForReport;

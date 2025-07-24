// import { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
// import { ModelVersionResponseDTO } from "../../Models/ModelManagerModels/Dto";
// import { useGetModelVersion } from "../../Hooks/useGetModelVersion";
// import { Guid } from "guid-typescript";

// const extraModelVersionWithNoneValue: ModelVersionResponseDTO = {
//   guidId: Guid.create().toString(),
//   modelName: "ALL",
//   modelVersionId: -1,
//   timestamp: "string",
//   compensatedTempRangeLow: 0,
//   compensatedTempRangeHigh: 0,
//   ratedExcitationMin: 0,
//   ratedExcitationMax: 0,
//   operatingTempMin: 0,
//   operatingTempMax: 0,  
//    noOfGauges: 4 ,
//   testpoints: [],
// };
// interface VersionSelectComponentProps {
//   filterVersionByModelName?: string;
//   VersionSelectionChangePublisher: (value: ModelVersionResponseDTO | undefined) => void;
//   addExtraModelVersionWithNoneValue?: boolean;
// }
// const VersionSelectComponent = ({
//   VersionSelectionChangePublisher,
//   filterVersionByModelName: filterVersionByModelName,
//   addExtraModelVersionWithNoneValue = false,
// }: VersionSelectComponentProps) => {
 
//   const { data: getModelVersionData, isSuccess, isLoading } = useGetModelVersion();
//   const [filteredModelVersionData, setFilteredModelVersionData] = useState<ModelVersionResponseDTO[] | []>([]);
//   const [ModelVersionSelectValue, setModelVersionSelectValue] = useState<string | undefined>();

//   useEffect(() => {
//     if (isSuccess && getModelVersionData) {
  
//       const filtered = getModelVersionData.filter((model) => {
//         return filterVersionByModelName && filterVersionByModelName!="ALL"? model.modelName === filterVersionByModelName : true;
     
     
//       });

//       addExtraModelVersionWithNoneValue && filtered.push(extraModelVersionWithNoneValue);

//     //   console.log(filtered);
//     //   // console.log( filtered[0]);
//     //   setFilteredModelVersionData(filtered);
//     //   VersionSelectionChangePublisher(filtered[0]);

//     //   const selectedModelVersion = filtered[0]?.modelVersionId.toString();
//     //   setModelVersionSelectValue(selectedModelVersion);
//     // } else {
//     //   setFilteredModelVersionData([]);
//     //   VersionSelectionChangePublisher(undefined);
//     // }

//     // Sort the filtered data in descending order based on modelVersionId
//     const sortedFiltered = filtered.sort((a, b) => b.modelVersionId - a.modelVersionId);

//     console.log(sortedFiltered);
//     setFilteredModelVersionData(sortedFiltered);
//     VersionSelectionChangePublisher(sortedFiltered[0]);

//     const selectedModelVersion = sortedFiltered[0]?.modelVersionId.toString();
//     setModelVersionSelectValue(selectedModelVersion);
//   } else {
//     setFilteredModelVersionData([]);
//     VersionSelectionChangePublisher(undefined);
//   }

//   }, [getModelVersionData, isSuccess, filterVersionByModelName, VersionSelectionChangePublisher]);

//   const OnSelectionChangedhandler = (event: unknown) => {
//     const eventTarget = event as React.ChangeEvent<{ value: string }>;
//     const selectedValue = eventTarget.target.value;

//     const selectedVersionModel = filteredModelVersionData?.find(
//       (model) => model.modelVersionId.toString() === selectedValue
//     );
//     VersionSelectionChangePublisher(selectedVersionModel);
//     setModelVersionSelectValue(selectedValue);
//   };

//   return (
    
//       <TextField
//         select
//         required
//         sx={{ width: "329px" }}
//         value={ModelVersionSelectValue}
//         slotProps={{
//           inputLabel: {
//             shrink: true,
//           },
//           select: {
//             native: true,
//             variant: "standard",
//             onChange: (event) => {
//               OnSelectionChangedhandler(event);
//             },
//           },
//         }}
//         label="Select  Model Version"
//       >
//         {isSuccess ? (
//           filteredModelVersionData?.map((option) => (
//             <option key={option.guidId} value={option.modelVersionId}>
//               {option.modelVersionId == -1 ? "ALL" : option.modelVersionId + " - (" + option.modelName+")"}
//             </option>
//           ))
//         ) : (
//           <>
//             {isLoading ? (
//               <>
//                 <option value="">..Loading Pls wait..</option>
//               </>
//             ) : (
//               <>
//                 <option value="">Error fetching Data.</option>
//               </>
//             )}
//           </>
//         )}
//       </TextField>
    
//   );
// };

// export default VersionSelectComponent;

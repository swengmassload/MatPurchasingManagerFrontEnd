// import { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
// import { useGetModel } from "../../Hooks/useGetModel";
// import { ModelResponseDTO } from "../../Models/ModelManagerModels/Dto";

// interface ModelSelectComponentProps {
//   filterModelby?: string | undefined;
//   ModelSelectionChangePublisher?: (value: ModelResponseDTO | undefined) => void;
//   previousSelectedModelName?: string | undefined;
//   previousSelectedModelTypeName?: string | undefined;
//   addExtraModelwithNoneValue?: boolean;
// }

// const extraModelWithNoneValue: ModelResponseDTO = {
//   modelName: "ALL",
//   modelTypeName: "ALL TYPES",
//   guidId: "00000000-0000-0000-0000-000000000000",
// };

// const ModelSelectComponent = ({
//   ModelSelectionChangePublisher = () => {},
//   filterModelby: filterModelby,
//   //previousSelectedModelName,
//   //previousSelectedModelTypeName,
//   addExtraModelwithNoneValue = false,
// }: ModelSelectComponentProps) => {
//  // alert("ModelSelectComponent");
//   const { data: getModelData, isSuccess, isLoading } = useGetModel();
//   const [filteredModelData, setFilteredModelData] = useState<ModelResponseDTO[] | []>([]);
//   const [ModelSelectValue, setModelSelectValue] = useState<string | undefined>();

//   useEffect(() => {
//     if (isSuccess && getModelData) {
//       const filtered = getModelData.filter((model) => {
//         return filterModelby && filterModelby!="ALL"? model.modelTypeName === filterModelby : true;
//       });
//       //  if (filtered && filtered.length > 0 && previousSelectedModelName && previousSelectedModelTypeName) {
//       addExtraModelwithNoneValue && filtered.push(extraModelWithNoneValue);
//       //  }
//       setFilteredModelData(filtered);
//       ModelSelectionChangePublisher(filtered[0]);
//       const selectedModel = filtered[0]?.modelName;
//       //alert(selectedModel);
//       setModelSelectValue(selectedModel);
//     }
//   }, [getModelData, isSuccess, filterModelby, ModelSelectionChangePublisher]);

//   // useEffect(() => {
//   //   alert(previousSelectedModelName);
//   //   setModelSelectValue(previousSelectedModelName);
//   //   if (isSuccess && getModelData && previousSelectedModelName) {
//   //     const filtered = getModelData.filter((model) => model.modelTypeName === previousSelectedModelTypeName);
//   //     setFilteredModelData(filtered);
//   //     ModelSelectionChangePublisher(filtered.filter((model) => model.modelName === previousSelectedModelName)[0]);
//   //     setModelSelectValue(previousSelectedModelName);
//   //   }
//   // }, [
//   //   ModelSelectionChangePublisher,
//   //   getModelData,
//   //   isSuccess,
//   //   previousSelectedModelName,
//   //   previousSelectedModelTypeName,
//   // ]);

//   const OnSelectionChangedhandler = (event: unknown) => {
//    // alert("OnSelectionChangedhandler");
//     const eventTarget = event as React.ChangeEvent<{ value: string }>;
//     const selectedValue = eventTarget.target.value;

//     const selectedModel = filteredModelData?.find((model) => model.modelName === selectedValue);
//     ModelSelectionChangePublisher(selectedModel);
//     setModelSelectValue(selectedValue);
//     console.log("selectedModel", selectedValue);
//   };

//   return (
//     <>
//       <TextField
//         select
//         required
//         sx={{ width: "329px" }}
//         value={ModelSelectValue}
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
//         // SelectProps={{
//         //   native: true,
//         //   variant: "standard",
//         //   onChange: (event) => {
//         //     OnSelectionChangedhandler(event);
//         //   },
//         // }}
//         label="Select  Model Name"
//       >
//         {isSuccess ? (
//           filteredModelData?.map((option) => (
//             <option key={option.guidId} value={option.modelName}>
//               {option.modelName}
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
//     </>
//   );
// };

// export default ModelSelectComponent;

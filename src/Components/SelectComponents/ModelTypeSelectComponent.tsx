import { useGetModelTypes } from "../../Hooks/useGetModelTypes";
import { TextField } from "@mui/material";
import { ModelTypeResponseDTO } from "../../Models/ModelManagerModels/Dto";
import { useEffect, useState } from "react";

const emptyModelType: ModelTypeResponseDTO = {
  modelTypeName: "ALL",
  guidId: "00000000-0000-0000-0000-000000000000",
};

interface ModelTypeSelectComponentProps {
  ModelTypeSelectionChangePublisher: (value: ModelTypeResponseDTO | undefined) => void;
  // previousSelectedModelTypeName?: string | undefined;
  addExtraModelTypeWithNoneValue?: boolean;
}
const ModelTypeSelectComponent = ({
  ModelTypeSelectionChangePublisher,

  addExtraModelTypeWithNoneValue = false,
}: ModelTypeSelectComponentProps) => {
  const { data: modelTypes, isSuccess, isLoading, isRefetching } = useGetModelTypes();
  const [ModelTypeSelectValue, setModelTypeSelectValue] = useState<string | undefined>();
  useEffect(() => {
    addExtraModelTypeWithNoneValue && modelTypes?.push(emptyModelType);
    if (modelTypes && modelTypes?.length > 0) {
      ModelTypeSelectionChangePublisher(modelTypes[0]);
    }
  }, [isSuccess, isRefetching]);

  const OnSelectionChangedhandler = (event: unknown) => {
    const eventTarget = event as React.ChangeEvent<{ value: string }>;
    const selectedValue = eventTarget.target.value;
    const selectedModelType = modelTypes?.find((model) => model.modelTypeName === selectedValue);

    ModelTypeSelectionChangePublisher(selectedModelType);
    setModelTypeSelectValue(selectedValue);
  };

  return (
    <>
      <TextField
        select
        required
        sx={{ width: "329px" }}
        value={ModelTypeSelectValue}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
          select: {
            native: true,
            variant: "standard",
            onChange: (event) => {
              OnSelectionChangedhandler(event);
            },
          },
        }}
        // SelectProps={{
        //   native: true,
        //   variant: "standard",
        //   onChange: (event) => {
        //     OnSelectionChangedhandler(event);
        //   },
        // }}
        label="Select  Model Type"
      >
        {isSuccess ? (
          modelTypes?.map((option) => (
            <option key={option.guidId} value={option.modelTypeName}>
              {option.modelTypeName}
            </option>
          ))
        ) : (
          <>
            {isLoading ? (
              <>
                <option value="">..Loading Pls wait..</option>
              </>
            ) : (
              <>
                <option value="">Error fetching Data.</option>
              </>
            )}
          </>
        )}
      </TextField>
    </>
  );
};

export default ModelTypeSelectComponent;

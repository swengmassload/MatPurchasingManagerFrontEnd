import { sideBarColor } from "../../../Constants/ComponentStyles";
import { RMAResponseDTO } from "../../../Models/RMAManagerModels/Dto";
import ProductInfoCard from "./ProductInfoCard";

import { StyledPaper, Title } from "./TrackStyles/TrackingStyles";

interface TrackingSelectedProductInfoProps {
  product: RMAResponseDTO | undefined;
}

const TrackingSelectedRMAInfo: React.FC<TrackingSelectedProductInfoProps> = ({ product }) => {
  const trackBasic = [
    { label: "RMA NUmber", value: product?.rmaNumber },
    { label: "Stage", value: product?.stage },
    { label: "Company Name", value: product?.companyName },
    { label: "Contact Name", value: product?.contactName },
    { label: "Customer Email", value: product?.customerEmail },
    { label: "Notes", value: product?.notes },
  ];
  const trackSpecs = [
    { label: "Date Received", value: product?.dateReceived },
    { label: "Problem", value: product?.rmaProblemDescription },
  ];

  
  // const trackStatusInfo = [
  //   { label: "Stage", value: product?.stage },
  //   { label: "Inspection Result", value: product?. },
  //   { label: "Current Status", value: product?.currentStatus },
  //   { label: "Testing Mode", value: product?.testingMode },
  //   { label: "Has Been Exercised", value: product?.hasBeenExercised },
  //   { label: "Load Direction", value: product?.loadDirection },
  //   { label: "Calibration Type", value: product?.calibrationType },
  //   { label: "Weight Unit", value: product?.weightUnit },
  //   { label: "isRMA ?", value: product?.isRMA ? "YES" : "NO" },
  // ];

  // const trackOrderInfo = [
  //   { label: "Invoice ID", value: product?.notes },
  //   { label: "Sales Order ID", value: product?.salesOrderId },
  //   { label: "Batch No", value: product?.batchNo },
  //   { label: "Thermex PO No", value: product?.thermexPurcharseOrderNo },
  //   { label: "Machining PO No", value: product?.machiningPurcharseOrderNo },
  //   { label: "Steel PO No", value: product?.steelPurcharseOrderNo },
  //   { label: "Process Flow Group", value: product?.processFlowGroupName },
  //   { label: "Model Version GUID", value: product?.modelVersionGuid },
  //   { label: "GUID", value: product?.guidId },
  //   { label: "Timestamp", value: product?.timestamp },
  // ];

  return (
    <StyledPaper
      elevation={3}
      sx={{
        backgroundColor: sideBarColor,
        width: "100%",
        padding: 2,
      }}
    >
      <Title variant="h6" align="center">
        Product Summary
      </Title>
      <ProductInfoCard renderRows={trackBasic} cardTitle="Basic Information" defaultExpanded={true} />
      <ProductInfoCard renderRows={trackSpecs} cardTitle="Specifications" />
      {/* <ProductInfoCard renderRows={trackStatusInfo} cardTitle="Status Information" />
      <ProductInfoCard renderRows={trackOrderInfo} cardTitle="Order Information" /> */}
    </StyledPaper>
  );
};
export default TrackingSelectedRMAInfo;

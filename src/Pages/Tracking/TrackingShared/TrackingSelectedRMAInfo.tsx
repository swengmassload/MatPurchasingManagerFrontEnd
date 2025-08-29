import { sideBarColor } from "../../../Constants/ComponentStyles";
import { RMAResponseDTO } from "../../../Models/RMAManagerModels/Dto";
import ProductInfoCard from "./ProductInfoCard";

import { StyledPaper, Title } from "./TrackStyles/TrackingStyles";

interface TrackingSelectedProductInfoProps {
  product: RMAResponseDTO | undefined;
}

const TrackingSelectedRMAInfo: React.FC<TrackingSelectedProductInfoProps> = ({ product }) => {
  console.log("Selected Product:", product);
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
    { label: "Date Issued", value: product?.dateIssued },
    { label: "Sales Order ID", value: product?.salesOrderId },

    { label: "Problem", value: product?.rmaProblemDescription },
  ];



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
      <ProductInfoCard renderRows={trackSpecs} cardTitle="Details" />

    </StyledPaper>
  );
};
export default TrackingSelectedRMAInfo;

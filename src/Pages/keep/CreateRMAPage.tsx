import React from "react";
import LayoutInLetWrapper from "../../LayOut/LayoutInLetWrapper";
import CreateRMAForm from "./CreateRMAForm";

const CreateRMAPage: React.FC = () => {
  return (
    <LayoutInLetWrapper pageTitle="Create New RMA" layOutAccessClaim="" marginleft="20px">
      <CreateRMAForm />
    </LayoutInLetWrapper>
  );
};

export default CreateRMAPage;

import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function InspectionStepper({ activeStep }) {
  const steps = [
    "Details",
    "BD And Coach Details",
    "CTRB A Details",
    "CTRB B Details",
    "Repair Details",
  ];

  
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default InspectionStepper;

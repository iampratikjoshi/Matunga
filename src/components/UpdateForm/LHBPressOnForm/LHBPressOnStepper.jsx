import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function InspectionStepper({ activeStep }) {
  const steps = [
    "Wheel Details",
    "Wheel Activities",
    "Wheel Disc A Side Bore Size",
    "Wheel Disc A Side",
    "Wheel Disc B Side Bore Size",
    "Wheel Disc B Side",
    "Brake Disc A Side Bore Size",
    "Brake Disc A Side",
    "Brake Disc B Side Bore Size",
    "Brake Disc B Side",
    "Operator Details",
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

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarVB from "./SidebarVB.jsx";
import WheelDiscAsideDetails from "./WheelsDiscAsideDetails.jsx";
import WheelDetails from "./WheelDetails.jsx";
import WheelDiscABoreSizeDetails from "./WheelDiscABoreSizeDetails.jsx";
import WheelDiscBSideDetails from "./WheelDiscBSideDetails.jsx";
import WheelDiscBBoreSizeDetails from "./WheelDiscBBoreSizeDetails.jsx";
import BrakeDiscABsideDetails from "./BrakeDiscABSideDetails.jsx";
import BrakeDiscASideBoreSizeDetails from "./BrakeDiscASideBoreSizeDetails.jsx";
import BrakeDiscBSideBoreSizeDetails from "./BrakeDiscBSideBoreSizeDetails.jsx";
import BrakeDiscBsideDetails from "./BrakeDiscBsideDetails.jsx";
import OperatorDetails from "./OperatorDetails.jsx";
import VBPressOnBreadcrumbs from "./VBPressOnBreadcrumbs.jsx";
import VBPressOnStepper from "./VBPressOnStepper.jsx";
import "../../resources/Assembly/PressOn&Off.css";
import WheelActivities from "./WheelActivities.jsx";

function VBPressOnForm({ formDataPressOnVB, setFormDataPressOnVB }) {
  // State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 10));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataPressOnVB((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <VBPressOnBreadcrumbs />
      <VBPressOnStepper activeStep={activeStep} />
      <hr></hr>
      <div className="containerLHB">
        <div>
          <SidebarVB />
        </div>
        <div className="contentLHB">
          <div></div>
          <div>
            <Routes>
              <Route
                path="wheel_details"
                element={
                  <WheelDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheelactivities_details"
                element={
                  <WheelActivities
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheeldiscA_details"
                element={
                  <WheelDiscAsideDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheeldiscABoresize_details"
                element={
                  <WheelDiscABoreSizeDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheeldiscB_details"
                element={
                  <WheelDiscBSideDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheeldiscBBoresize_details"
                element={
                  <WheelDiscBBoreSizeDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="brakediscA_Bdetails"
                element={
                  <BrakeDiscABsideDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="brakediscABoresize_details"
                element={
                  <BrakeDiscASideBoreSizeDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              {/* <Route
                path="brakediscB_details"
                element={
                  <BrakeDiscBsideDetails
                  formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              /> */}
              <Route
                path="brakediscBBoresize_details"
                element={
                  <BrakeDiscBSideBoreSizeDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="operator_details"
                element={
                  <OperatorDetails
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default VBPressOnForm;

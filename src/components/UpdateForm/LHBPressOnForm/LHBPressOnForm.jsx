import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarLHB from "./SidebarLHB.jsx";
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
import LHBPressOnBreadcrumbs from "./LHBPressOnBreadcrumbs.jsx";
import LHBPressOnStepper from "./LHBPressOnStepper.jsx";
import "../../../resources/LHB/preInspectionform/preInspectionform.css";
import WheelActivities from "./WheelActivities.jsx";

function LHBPressOnForm({ formDataPressOnLHB, setFormDataPressOnLHB }) {
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
    setFormDataPressOnLHB((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <LHBPressOnBreadcrumbs />
      <LHBPressOnStepper activeStep={activeStep} />
      <hr></hr>
      <div className="containerLHB">
        <div>
          <SidebarLHB />
        </div>
        <div className="contentLHB">
          <div></div>
          <div>
            <Routes>
              <Route
                path="wheel_details"
                element={
                  <WheelDetails
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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
                    formDataPressOnLHB={formDataPressOnLHB}
                    setFormDataPressOnLHB={setFormDataPressOnLHB}
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

export default LHBPressOnForm;

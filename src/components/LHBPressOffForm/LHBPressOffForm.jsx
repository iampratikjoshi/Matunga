import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import IdentificationDetails from "./IdentificationDetails.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import WheelDetails from "./WheelDetails.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";
import WheelConditionDetails from"./WheelConditionDetails.jsx"
import InspectorDetails from "./InspectorDetails.jsx"

function LHBPressOffForm({ formDataPressOffLHB, setFormDataPressOffLHB }) {
  // State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataPressOffLHB((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 style={{marginTop:"10px", textAlign:"left"}}></h1>
      <Breadcrumbs/>
      <InspectionStepper activeStep={activeStep}/>
      <hr></hr>
      <div className="containerLHB">
        <div>
          <SidebarLHB />
        </div>
        <div className="contentLHB">
         
          <div>
            <Routes>
              <Route
                path="identification_details"
                element={
                  <IdentificationDetails
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              <Route
                path="wheelcondition_details"
                element={
                  <WheelConditionDetails
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              <Route
                path="wheel_details"
                element={
                  <WheelDetails
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep} 
                  />
                }
              />
              
              <Route
                path="inspector_details"
                element={
                  <InspectorDetails
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
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

export default LHBPressOffForm;

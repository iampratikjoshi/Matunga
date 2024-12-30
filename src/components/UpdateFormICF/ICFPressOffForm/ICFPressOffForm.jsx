import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import IdentificationDetails from "./IdentificationDetails.jsx";
import SidebarLHB from "./SidebarICF.jsx";
import WheelDetails from "./WheelDetails.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";
import WheelConditionDetails from"./WheelConditionDetails.jsx"
import InspectorDetails from "./InspectorDetails.jsx"

function ICFPressOffForm({ formDataPressOffICF, setFormDataPressOffICF }) {
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
    setFormDataPressOffICF((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{width:"100%"}}>
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
                    formDataPressOffICF={formDataPressOffICF}
                    setFormDataPressOffICF={setFormDataPressOffICF}
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
                    formDataPressOffICF={formDataPressOffICF}
                    setFormDataPressOffICF={setFormDataPressOffICF}
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
                    formDataPressOffICF={formDataPressOffICF}
                    setFormDataPressOffICF={setFormDataPressOffICF}
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
                    formDataPressOffICF={formDataPressOffICF}
                    setFormDataPressOffICF={setFormDataPressOffICF}
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
    </div>
  );
}

export default ICFPressOffForm;

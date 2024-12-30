import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarEMU from "./SidebarICF.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import EmuDetails from "./ICFDetails.jsx";
import RAValue from "./RAValue.jsx";
import Layout from "../Layout.jsx";
import WheelSeatSize from "./WheelSeatSize.jsx";
import Operator from "./Operator.jsx";
import RepairDetails from "./WheelADetails.jsx";
import WheelA1 from "./WheelADetails.jsx";
import WheelA2 from "./WheelA2Details.jsx";
import WheelA3 from "./WheelA3Details.jsx";
import WheelB3 from "./WheelB3Details.jsx";
import WheelB1 from "./WheelBDetails.jsx";
import WheelB2 from "./WheelB2Details.jsx";
import ICFPressOnDetails from "./ICFDetails.jsx";
import OperatorDetails from "./OperatorDetails.jsx";
import WheelActivities from "./WheelActivities.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function ICFPressOn({ formDataProceedSubmitPressOnICF, setformDataProceedSubmitPressOnICF }) {
  // State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 13));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setformDataProceedSubmitPressOnICF((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Breadcrumbs />
      <InspectionStepper activeStep={activeStep} />
      <hr></hr>

      <div className="containerLHB">
        <div>
          <SidebarEMU />
        </div>
        <div className="contentLHB">
          <div>
            <Routes>
              <Route
            path="icf_details"
            element={
                <ICFPressOnDetails
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep} />
            }
          />
              <Route
            path="wheel_size"
            element={
                <WheelSeatSize 
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                />
            }
          />
                <Route
                path="ra_value"
                element={
                  <RAValue
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
                <Route
                path="operator"
                element={
                  <Operator
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
               <Route
                path="wheel_activities"
                element={
                  <WheelActivities
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
               <Route
                path="wheel_a1_details"
                element={
                  <WheelA1
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
              <Route
                path="wheel_a2_details"
                element={
                  <WheelA2
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
                <Route
                path="wheel_a3_details"
                element={
                  <WheelA3
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
              <Route
                path="wheel_b1_details"
                element={
                  <WheelB1
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
              <Route
                path="wheel_b2_details"
                element={
                  <WheelB2
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                  
                }
              />
              <Route
                path="wheel_b3_details"
                element={
                  <WheelB3
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
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
                    formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                    setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
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
      {/* </Router> */}
    </>
  );
}

export default ICFPressOn;

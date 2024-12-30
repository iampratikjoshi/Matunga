import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./Details.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import CTRBDetailsA from "./CTRBDetailsA.jsx";
import BDAndCoachDetails from "./BDAndCoachDetails.jsx";
import RepairDetails from "./RepairDetails.jsx";
import CTRBDetailsB from "./CTRBDetailsB.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function VBSchedulePreInspection({ formDataVB, setFormDataVB }) {
  // State for stepper
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 5));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataVB((prevState) => ({
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
          <SidebarLHB />
        </div>
        <div className="contentLHB">
          <div>
            <Routes>
              <Route
                path="details"
                element={
                  <Details
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />

              <Route
                path="ctrba_details"
                element={
                  <CTRBDetailsA
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />

              <Route
                path="ctrbb_details"
                element={
                  <CTRBDetailsB
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="bdandcoach_details"
                element={
                  <BDAndCoachDetails
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="repair_details"
                element={
                  <RepairDetails
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
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

export default VBSchedulePreInspection;

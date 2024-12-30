import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./Details.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import BRGDetails from "./BRGDetails.jsx";
// import BRGDe from "./CTRBDetailsA.jsx";
import BDAndCoachDetails from "./Wheel2Details.jsx";
import RepairDetails from "./RepairDetails.jsx";
import CTRBDetailsB from "./CTRBDetailsB.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function ICFSchedulePreInspection({ formDataScheduleICF, setFormDataScheduleICF }) {
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
    setFormDataScheduleICF((prevState) => ({
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
                path="w1_details"
                element={
                  <Details
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />

              <Route
                path="brg_details"
                element={
                  <BRGDetails
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />

              {/* <Route
                path="ctrbb_details"
                element={
                  <CTRBDetailsB
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              /> */}
              <Route
                path="w2_details"
                element={
                  <BDAndCoachDetails
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
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
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
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

export default ICFSchedulePreInspection;

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarEMU from "./SidebarWearingClearance.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import EmuDetails from "./WheelDetails.jsx";
import RAValue from "./MonthlyServices.jsx";
import Layout from "../Layout.jsx";
import WheelSeatSize from "./Clearance.jsx";
import Operator from "./Status.jsx";
import ICFPressOnDetails from "./WheelDetails.jsx";
import InspectionStepper from "./InspectionStepper.jsx";
import Status from "./Status.jsx";

function WearingClearance({
  formDataProceedSubmitEMUWearingClearance,
  setformDataProceedSubmitEMUWearingClearance,
}) {
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
    setformDataProceedSubmitEMUWearingClearance((prevState) => ({
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
                path="wheel_details"
                element={
                  <ICFPressOnDetails
                    formDataProceedSubmitEMUWearingClearance={
                      formDataProceedSubmitEMUWearingClearance
                    }
                    setformDataProceedSubmitEMUWearingClearance={
                      setformDataProceedSubmitEMUWearingClearance
                    }
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="clearance"
                element={
                  <WheelSeatSize
                    formDataProceedSubmitEMUWearingClearance={
                      formDataProceedSubmitEMUWearingClearance
                    }
                    setformDataProceedSubmitEMUWearingClearance={
                      setformDataProceedSubmitEMUWearingClearance
                    }
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="servicesbymonth"
                element={
                  <RAValue
                    formDataProceedSubmitEMUWearingClearance={
                      formDataProceedSubmitEMUWearingClearance
                    }
                    setformDataProceedSubmitEMUWearingClearance={
                      setformDataProceedSubmitEMUWearingClearance
                    }
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="status"
                element={
                  <Operator
                    formDataProceedSubmitEMUWearingClearance={
                      formDataProceedSubmitEMUWearingClearance
                    }
                    setformDataProceedSubmitEMUWearingClearance={
                      setformDataProceedSubmitEMUWearingClearance
                    }
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

export default WearingClearance;

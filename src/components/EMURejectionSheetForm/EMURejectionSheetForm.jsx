import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import BearingDetails from "./BearingDetails.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import Details from "./Details.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";

function EMURejectionSheetForm({
  formDataRejectionSheetEMU,
  setFormDataRejectionSheetEMU,
}) {

  const [activeStep, setActiveStep] = useState(0);

   // Function to move to the next step
   const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 1));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataRejectionSheetEMU((prevState) => ({
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
        <SidebarLHB />
        <div className="content">
          <div>
            <Routes>
              <Route
                path="bearing_details"
                element={
                  <BearingDetails
                    // formData={formData}
                    // setFormData={setFormData}
                    formDataRejectionSheetEMU={formDataRejectionSheetEMU}
                    setFormDataRejectionSheetEMU={setFormDataRejectionSheetEMU}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="report_details"
                element={
                  <Details
                    // formData={formData}
                    // setFormData={setFormData}
                    formDataRejectionSheetEMU={formDataRejectionSheetEMU}
                    setFormDataRejectionSheetEMU={setFormDataRejectionSheetEMU}
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

export default EMURejectionSheetForm;

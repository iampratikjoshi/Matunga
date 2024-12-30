import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AxleDetails from "./AxleDetails.jsx";
import SidebarLHB from "./SidebarLHB.jsx";
import Wheeldetails from "./WheelDetails.jsx";
import JournalDetails from "./JournalDetails.jsx";
import BDDetails from "./BDDetails.jsx";
import GeneralInspection from "./GeneralInspection.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";
import CTRBDetailsA from "./CTRBDetailsA.jsx";
import CTRBDetailsB from "./CTRBDetailsB.jsx";

function VBFinalInspection({ formDataFinalVB, setFormDataFinalVB }) {
  const [activeStep, setActiveStep] = useState(0);

  // Function to move to the next step
  const handleNextStep = () => {
    setActiveStep((prevStep) => Math.min(prevStep + 1, 6));
  };

  // Function to reset the step to the first step
  const handleResetStep = () => {
    setActiveStep(0);
  };

  // Function to update form data
  const handleInputChange = (name, value) => {
    setFormDataFinalVB((prevState) => ({
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
          {/* <div> */}
          {/* <div className="form_headline">
              <select>
                <option>need to write something here !</option>
                <option></option>
              </select>
            </div> */}
          {/* </div> */}
          <div>
            {" "}
            {/* Content section for routed components */}
            <Routes>
              <Route
                path="axle_details"
                element={
                  <AxleDetails
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="wheel_details"
                element={
                  <Wheeldetails
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="journal_details"
                element={
                  <JournalDetails
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="bd_details"
                element={
                  <BDDetails
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
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
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
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
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              
              <Route
                path="general_details"
                element={
                  <GeneralInspection
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
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

export default VBFinalInspection;

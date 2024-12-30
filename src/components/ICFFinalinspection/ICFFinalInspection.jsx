import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SidebarLHB from "./SidebarLHB.jsx";
import Wheeldetails from "./WheelDetails.jsx";
import JournalDetailsA from "./JournalDetailsA.jsx";
import JournalDetailsB from "./JournalDetailsB.jsx";
import CollerCondition from "./CollerCondition.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import InspectionStepper from "./InspectionStepper.jsx";
import BrgDetailsA from "./BRGDetailsA.jsx";
import BrgDetailsB from "./BRGDetailsB.jsx";
import Details from "./Details.jsx";


function ICFFinalInspection({ formDataFinalICF, setFormDataFinalICF }) {
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
    setFormDataFinalICF((prevState) => ({
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
                path="wheel_details"
                element={
                  <Wheeldetails
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep}
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="journalA_details"
                element={
                  <JournalDetailsA
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="journalB_details"
                element={
                  <JournalDetailsB
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="Brg_detailsA"
                element={
                  <BrgDetailsA
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="Brg_detailsB"
                element={
                  <BrgDetailsB
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              <Route
                path="details"
                element={
                  <Details
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
                    onInputChange={handleInputChange}
                    onNextStep={handleNextStep} 
                    onResetStep={handleResetStep}
                  />
                }
              />
              
              <Route
                path="collercondition_details"
                element={
                  <CollerCondition
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
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

export default ICFFinalInspection;

import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EMUDivisionPreInspectionForm from './EMUDivisionPreInspectionForm';
// import ProceedSubmitDivi from './ProceedSubmitDivision';
// import AllEntry from './AllEntryDivision';
import ProceedSubmitDivision from './ProceedSubmitDivision';
import AllEntryDivision from './AllEntryDivision';

function ParentEMUDivision() {
  const [formDataDivisionEMU, setFormDataDivisionEMU] = useState({
    WheelNo: "",
    LooryNo: "",
    POHDate: "",
    divisionreport: "",
    DivisionName: "",
    matungareport: "",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 4,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });
  return (
    <div>
      {/* <Router> */}
      <Routes>
        {/* <Route
            path="/"
            element={<Navigate to="/EMUDivisionPreInspectionForm" replace />}
          /> */}
        <Route
          path="/emudivisionpreinspectionform/*"
          element={
            <EMUDivisionPreInspectionForm
              formDataDivisionEMU={formDataDivisionEMU}
              setFormDataDivisionEMU={setFormDataDivisionEMU}
            />
          }
        />
        <Route
          path="/proceedsubmitEMUDivision"
          element={
            <ProceedSubmitDivision formDataDivisionEMU={formDataDivisionEMU} setFormDataDivisionEMU={setFormDataDivisionEMU} />
          }
        />
        <Route path="/viewallentryEMUDivision" element={<AllEntryDivision />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentEMUDivision
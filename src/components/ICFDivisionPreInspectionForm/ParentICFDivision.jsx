import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ICFDivisionPreInspectionForm from './ICFDivisionPreInspectionForm';
// import ProceedSubmitDivi from './ProceedSubmitDivision';
// import AllEntry from './AllEntryDivision';
import ProceedSubmitDivision from './ProceedSubmitDivision';
import AllEntryDivision from './AllEntryDivision';

function ParentLhbDivision() {
  const [formDataICFDivision, setFormDataICFDivision] = useState({
    WheelNo: "",
    LooryNo: "",
    POHDate: "",
    divisionreport: "",
    DivisionName: "",
    matungareport: "",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 2,
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
            element={<Navigate to="/ICFDivisionPreInspectionForm" replace />}
          /> */}
        <Route
          path="/icfdivisionpreinspectionform/*"
          element={
            <ICFDivisionPreInspectionForm
              formDataICFDivision={formDataICFDivision}
              setFormDataICFDivision={setFormDataICFDivision}
            />
          }
        />
        <Route
          path="/proceedsubmitICFDivision"
          element={
            <ProceedSubmitDivision formDataICFDivision={formDataICFDivision} setFormDataICFDivision={setFormDataICFDivision} />
          }
        />
        <Route path="/viewallentryEMUDivision" element={<AllEntryDivision />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentLhbDivision
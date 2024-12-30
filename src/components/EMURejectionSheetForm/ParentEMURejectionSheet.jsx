import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EMURejectionSheetForm from './EMURejectionSheetForm';
import ProceedSubmitDivision from './ProceedSubmitEMURejectionSheet';
import AllEntryDivision from './AllEntryDivision';

function ParentEMURejectionSheet() {
  const [formDataRejectionSheetEMU, setFormDataRejectionSheetEMU] = useState({
    Wheelid:"",
    BearingNo: "",
    Make: "",
    CodeorYearofMFG:"",
    DateofRejection:"",
    DateLastInspection: "",
    DateOfInitialFitment: "",
    LifeOfBearing: "",
    CauseOfRejection: "",
    SectionId: 1,
    DepartmentId: 6,
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
          path="/emurejectionsheetform/*"
          element={
            <EMURejectionSheetForm
              formDataRejectionSheetEMU={formDataRejectionSheetEMU}
              setFormDataRejectionSheetEMU={setFormDataRejectionSheetEMU}
            />
          }
        />
        <Route
          path="/proceedsubmitEMUrejectionsheet"
          element={
            <ProceedSubmitDivision formDataRejectionSheetEMU={formDataRejectionSheetEMU} setFormDataRejectionSheetEMU={setFormDataRejectionSheetEMU} />
          }
        />
        <Route path="/viewallentryemurejectionsheet" element={<AllEntryDivision />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentEMURejectionSheet;
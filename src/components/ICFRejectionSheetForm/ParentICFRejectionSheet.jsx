import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ICFRejectionSheetForm from './ICFRejectionSheetForm';
import ProceedSubmitRejectionSheet from './ProceedSubmitICFRejectionSheet';
import AllEntryRejectionSheet from './AllEntryRejectionSheet';

function ParentICFRejectionSheet() {
  const [formDataRejectionSheetICF, setFormDataRejectionSheetICF] = useState({
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
            element={<Navigate to="/EMUDivisionPreInspectionForm" replace />}
          /> */}
        <Route
          path="/icfrejectionsheetform/*"
          element={
            <ICFRejectionSheetForm
              formDataRejectionSheetICF={formDataRejectionSheetICF}
              setFormDataRejectionSheetICF={setFormDataRejectionSheetICF}
            />
          }
        />
        <Route
          path="/proceedsubmitICFrejectionsheet"
          element={
            <ProceedSubmitRejectionSheet formDataRejectionSheetICF={formDataRejectionSheetICF} setFormDataRejectionSheetICF={setFormDataRejectionSheetICF} />
          }
        />
        <Route path="/viewallentryicfrejectionsheet" element={<AllEntryRejectionSheet />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentICFRejectionSheet;
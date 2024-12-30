import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import VBDivisionPreInspectionForm from './VBDivisionPreInspectionForm';
// import ProceedSubmitDivi from './ProceedSubmitDivision';
// import AllEntry from './AllEntryDivision';
import ProceedSubmitDivisionVB from './ProceedSubmitDivisionVB';
import AllEntryDivisionVB from './AllEntryDivisionVB';

function ParentLhbDivision() {
    const [formDataDivisionVB, setFormDataDivisionVB] = useState({
        WheelNo: "",
        LooryNo: "",
        POHDate: "",
        divisionreport: "",
        DivisionName: "",
        matungareport:"",
        SectionId: 1,
        DepartmentId:1,
        WheeltypeId:1,
        createdBy: "ADMIN",
        modifiedBy: "admin",
        modifiedDate:"",
      });
  return (
    <div>
        {/* <Router> */}
        <Routes>
          {/* <Route
            path="/"
            element={<Navigate to="/LHBDivisionPreInspectionForm" replace />}
          /> */}
          <Route
            path="/VBDivisionPreInspectionForm/*"
            element={
              <VBDivisionPreInspectionForm
                formDataDivisionVB={formDataDivisionVB}
                setFormDataDivisionVB={setFormDataDivisionVB}
              />
            }
          />
          <Route
            path="/proceedsubmitVBDivision"
            element={
              <ProceedSubmitDivisionVB formDataDivisionVB={formDataDivisionVB} setFormDataDivisionVB={setFormDataDivisionVB} />
            }
          />
          <Route path="/viewallentryLHBDivision" element={<AllEntryDivisionVB />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentLhbDivision
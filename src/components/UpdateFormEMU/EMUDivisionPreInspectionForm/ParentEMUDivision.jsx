import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import UpdateEMUDivisionPreInspectionForm from './EMUDivisionPreInspectionForm';
// import ProceedSubmitDivi from './ProceedSubmitDivision';
// import AllEntry from './AllEntryDivision';
import ProceedSubmitDivision from "../../../UpdateForm/LHBSchedulePreInspection/ProceedSubmit";;
import AllEntryDivision from './AllEntryDivision';

function ParentEMUDivision() {
    const [formDataDivisionEMU, setFormDataDivisionEMU] = useState({
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
            path="/UpdateEMUDivisionPreInspectionForm/*"
            element={
              <UpdateEMUDivisionPreInspectionForm
                formDataDivisionEMU={formDataDivisionEMU}
                setFormDataDivisionEMU={setFormDataDivisionEMU}
              />
            }
          />
          <Route
            path="/proceedsubmitLHBDivision"
            element={
              <ProceedSubmitDivision formDataDivisionEMU={formDataDivisionEMU} setFormDataDivisionEMU={setFormDataDivisionEMU} />
            }
          />
          <Route path="/viewallentryLHBDivision" element={<AllEntryDivision />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentEMUDivision
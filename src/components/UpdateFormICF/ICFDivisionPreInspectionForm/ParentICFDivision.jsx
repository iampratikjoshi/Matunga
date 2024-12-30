import React,{useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import UpdateLHBDivisionPreInspectionForm from './LHBDivisionPreInspectionForm';
// import ProceedSubmitDivi from './ProceedSubmitDivision';
// import AllEntry from './AllEntryDivision';
import ProceedSubmitDivision from "../../UpdateForm/LHBSchedulePreInspection/ProceedSubmit";;
import AllEntryDivision from './AllEntryDivision';

function ParentICFDivision() {
    const [formDataICFDivision, setFormDataICFDivision] = useState({
        wheelid:"",
        WheelNo: "",
        LooryNo: "",
        POHDate: "",
        divisionreport: "",
        DivisionName: "",
        matungareport:"",
        SectionId: 1,
        DepartmentId:1,
        WheeltypeId:2,
        createdBy: "ADMIN",
        modifiedBy: "admin",
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
            path="/UpdateICFDivisionPreInspectionForm/*"
            element={
              <UpdateICFDivisionPreInspectionForm
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
          <Route path="/viewallentryICFDivision" element={<AllEntryDivision />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentICFDivision
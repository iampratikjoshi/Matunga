import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EMUSchedulePreInspection from "./EMUSchedulePreInspection";
import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
import AllEntry from "../LHBPreInspection/AllEntry";

function ParentEMU() {
  const [formDataScheduleEMU, setFormDataScheduleEMU] = useState({
    ShopSrNumber: "",
    AxleNumber: "",
    ReceiveDate: "",
    AxleCondition: "",
    CoachNo: "",
    CTRBDefectNameA: "",
    CTRBDefectNameB: "",
    CTRBStatusA: "",
    CTRBStatusB: "",
    BDThicknessA: "",
    BDThicknessB: "",
    DiameterINA: "",
    DiameterINB: "",
    BDDefect: "",
    BDMakeIN: "",
    RODGaugeIN: "",
    SoundTestINA: "",
    SoundTestINB: "",
    TypeOfRepair: "",
    MatungaRemark: "",
    DiscParticularA: "",
    DiscParticularB: "",
    CTRBNumberA: "",
    CTRBNumberB: "",
    CTRBMakeA: "",
    CTRBMakeB: "",
    RefurbishmentDetailsA: "",
    RefurbishmentDetailsB: "",
    CTRBDefectA: "",
    CTRBDefectB: "",
    CTRBRemarkA: "",
    CTRBRemarkB: "",
    FitmentDate: "",
    CTRBRemainingLifeA: "",
    CTRBRemainingLifeB: "",
    InspectorName: "",
    InspectorTicketNo: "",
    createdBy: "ADMIN",
    SectionId: 1,
    DepartmentId: 2,
    WheeltypeId: 4,
  });

  return (
    // <Router>
    <Routes>
      {/* <Route
            path="/"
            element={<Navigate to="/EMUSchedulePreInspection" replace />}
          /> */}
      <Route
        path="/emuschedulepreinspectionform/*"
        element={
          <EMUSchedulePreInspection
            formDataScheduleEMU={formDataScheduleEMU}
            setFormDataScheduleEMU={setFormDataScheduleEMU}
          />
        }
      />
      <Route
        path="/proceedsubmitemu"
        element={
          <ProceedSubmit formDataScheduleEMU={formDataScheduleEMU} setFormDataScheduleEMU={setFormDataScheduleEMU} />
        }
      />
      <Route path="/viewallentryemu" element={<AllEntry />} />
    </Routes>
    //   </Router>
  );
}

export default ParentEMU;

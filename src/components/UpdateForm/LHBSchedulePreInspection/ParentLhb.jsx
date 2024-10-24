import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LHBSchedulePreInspection from "./LHBSchedulePreInspection";
import ProceedSubmit from "../../UpdateForm/LHBSchedulePreInspection/ProceedSubmit";
import AllEntry from "../../LHBPreInspection/AllEntry";

function ParentLhb() {
  const [formData, setFormData] = useState({
    ShopSrNumber: "",
    AxleNumber: "",
    ReceiveDate: "",
    AxleCondition: "",
    CoachNumber: "",
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
    RodGaugeIN: "",
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
    WheeltypeId: 1,
  });

  return (
    // <Router>
    <Routes>
      {/* <Route
            path="/"
            element={<Navigate to="/LHBSchedulePreInspection" replace />}
          /> */}
      <Route
        path="/LHBSchedulePreInspection/*"
        element={
          <LHBSchedulePreInspection
            formData={formData}
            setFormData={setFormData}
          />
        }
      />
      <Route
        path="/editproceedsubmit"
        element={
          <ProceedSubmit formData={formData} setFormData={setFormData} />
        }
      />
      <Route path="/viewallentry" element={<AllEntry />} />
    </Routes>
    //   </Router>
  );
}

export default ParentLhb;

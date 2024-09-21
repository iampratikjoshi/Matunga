import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LHBSchedulePreInspection from "./LHBSchedulePreInspection";
import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
import AllEntry from "../LHBPreInspection/AllEntry";

function ParentLhb() {
  const [formData, setFormData] = useState({
    ShopSrNumber: "",
    AxleNumber: "",
    ReceiveDate: "",
    AxleCondition: "",
    CoachNo: "",
    CTRBDefectName: "",
    CTRBStatusA: "",
    CTRBStatusB: "",
    BDThicknessA: "",
    BDThicknessB: "",
    DiameterINA: "",
    DiameterINB: "",
    FlageIN: "",
    BDNumber: "",
    BDDefect: "",
    BDMakeIN: "",
    BDSizeIN: "",
    RODGaugeIN: "",
    SoundTestIN: "",
    TypeOfRepair: "",
    MatungaRemark: "",
    DiscParticularA: "",
    DiscParticularB: "",
    CTRBA: "",
    CTRBB: "",
    CTRBNumberA: "",
    CTRBNumberB: "",
    CTRBMakeA: "",
    CTRBMakeB: "",
    RefurbishmentDetailsA: "",
    RefurbishmentDetailsB: "",
    CTRBDefect: "",
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
        path="/proceedsubmit"
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

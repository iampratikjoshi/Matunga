import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UpdateVBSchedulePreInspection from "./VBSchedulePreInspection";
import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
import AllEntryVB from "./AllEntryVB";

function ParentLhb() {
  const [formDataVB, setFormDataVB] = useState({
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
    WheeltypeId: 3,
  });

  return (
    // <Router>
    <Routes>
      {/* <Route
            path="/"
            element={<Navigate to="/LHBSchedulePreInspection" replace />}
          /> */}
      <Route
        path="/UpdateVBSchedulePreInspection/*"
        element={
          <UpdateVBSchedulePreInspection
            formDataVB={formDataVB}
            setFormDataVB={setFormDataVB}
          />
        }
      />
      <Route
        path="/proceedsubmitvb"
        element={
          <ProceedSubmit formDataVB={formDataVB} setFormDataVB={setFormDataVB} />
        }
      />
      <Route path="/viewallentryvb" element={<AllEntryVB />} />
    </Routes>
    //   </Router>
  );
}

export default ParentLhb;

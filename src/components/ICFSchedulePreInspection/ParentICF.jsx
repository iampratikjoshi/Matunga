import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ICFSchedulePreInspection from "./ICFSchedulePreInspection";
import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
import AllEntry from "../LHBPreInspection/AllEntry";

function ParentICF() {
  const [formDataScheduleICF, setFormDataScheduleICF] = useState({
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
    WheeltypeId: 2,
  });

  return (
    // <Router>
    <Routes>
      {/* <Route
            path="/"
            element={<Navigate to="/ICFSchedulePreInspection" replace />}
          /> */}
      <Route
        path="/icfschedulepreinspectionform/*"
        element={
          <ICFSchedulePreInspection
            formDataScheduleICF={formDataScheduleICF}
            setFormDataScheduleICF={setFormDataScheduleICF}
          />
        }
      />
      <Route
        path="/proceedsubmiticf"
        element={
          <ProceedSubmit formDataScheduleICF={formDataScheduleICF} setFormDataScheduleICF={setFormDataScheduleICF} />
        }
      />
      <Route path="/viewallentryicf" element={<AllEntry />} />
    </Routes>
    //   </Router>
  );
}

export default ParentICF;

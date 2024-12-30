import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EMUPressOn from "./EMUPressOn";
import ProceedSubmitPressOnEMU from "./ProceedSubmit";
// import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
// import AllEntry from "../LHBPreInspection/AllEntry";
import AllEntry from "./AllEntry";
import AllEntryPressOnEMU from "./AllEntry";

function ParentEmu() {
  const [formDataProceedSubmitEMU, setformDataProceedSubmitEMU] = useState({
    wheelid: "141",
    SectionId: "1",
    DepartmentId: 3,
    WheeltypeId: 4,
    WheelNo: "",
    WheelType: "",
    AxleNo: "",
    ATLNo: "",
    AWheelSide: "",
    BWheelSide: "",
    ARASide: "",
    BRASide: "",
    OperatorNamePrimary: "",
    VTLNo: "",
    BoreSize: "",
    RAValue: "",
    OperatorNameA: "",
    TopX: "",
    TopY: "",
    MiddleX: "",
    MiddleY: "",
    LowerX: "",
    LowerY: "",
    AvgX: "",
    AvgY: "",
    BWheelSeatSize: "",
    CBAIntAllow: "",
    PressureInTon: "",
    RDNo: "",
    WheelDiscAParticulars: "",
    VTLNoB: "",
    BoreSizeB: "",
    RAValueB: "",
    OperatorNameB: "",
    BTopX: "",
    BTopY: "",
    BMiddleX: "",
    BMiddleY: "",
    BLowerX: "",
    BLowerY: "",
    BAvgX: "",
    BAvgY: "",
    BWheelSeatSizeB: "",
    CBAIntAllowB: "",
    PressureInTonB: "",
    RDNoB: "",
    WheelDiscAParticularsB: "",
    MCNo: "",
    OperatorNameFinal: "",
    InspectorNameFinal: "",
    createdBy: "ADMIN",
    modifiedBy: "admin",
  });



  return (
    // <Router>
    <Routes>
      {/* <Route
            path="/"
            element={<Navigate to="/LHBSchedulePreInspection" replace />}
          /> */}
      <Route
        path="/UpdateEMUPressOn/*"
        element={
          <EMUPressOn
            formDataProceedSubmitEMU={formDataProceedSubmitEMU}
            setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
          />
        }
      />
      <Route
        path="/updateproceedsubmitemupresson"
        element={
          <ProceedSubmitPressOnEMU formDataProceedSubmitEMU={formDataProceedSubmitEMU} setformDataProceedSubmitEMU={setformDataProceedSubmitEMU} />
        }
      />
      <Route path="/emupresson_viewallentry" element={<AllEntryPressOnEMU />} />
    </Routes>
    //   </Router>
  );
}

export default ParentEmu;

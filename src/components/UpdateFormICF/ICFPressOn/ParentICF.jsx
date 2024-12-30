import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ICFPressOn from "./ICFPressOn";
// import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
// import AllEntry from "../LHBPreInspection/AllEntry";
import ProceedSubmitICF from "./ProceedSubmit";
import AllEntryICF from "./AllEntry";
import AllEntryPressOnICF from "./AllEntry";
import ProceedSubmitPressOnICF from "./ProceedSubmit";

function ParentICF() {
  const [formDataProceedSubmitPressOnICF, setformDataProceedSubmitPressOnICF] = useState({
    WheelNo: "",
    AxleNo: "",
    ATLNo: "",
    WheelSeatSize: "",
    BDSeatSize: "",
    RAValue: "",
    OperatorName: "",
    WheelDiscAVTLNO: "",
    WheelDiscABoreSizeByOperator: "",
    WheelDiscARAValue: "",
    WheelDiscAOperatorName: "",
    WheelDiscAABoreSize: "",
    WheelDiscABWheelSeatSize: "",
    WheelDiscAAllow: "",
    WheelDiscAPressOnPressure: "",
    WheelDiscARDNo: "",
    WheelDiscAWheelDiscParticulars: "",
    WheelDiscATopXAxis: "",
    WheelDiscATopYAxis: "",
    WheelDiscAMiddleXAxis: "",
    WheelDiscAMiddleYAxis: "",
    WheelDiscALowerXAxis: "",
    WheelDiscALowerYAxis: "",
    WheelDiscAAvgXAxis: "",
    WheelDiscAAvgYAxis: "",
    WheelDiscBVTLNo: "",
    WheelDiscBBoreSizeByOperator: "",
    WheelDiscBRAValue: "",
    WheelDiscBOperatorName: "",
    WheelDiscBABoreSize: "",
    WheelDiscBBWheelSeatSize: "",
    WheelDiscBAllow: "",
    WheelDiscBPressOnPressure: "",
    WheelDiscBRDNo: "",
    WheelDiscBWheelDiscParticulars: "",
    WheelDiscBTopXAxis: "",
    WheelDiscBTopYAxis: "",
    WheelDiscBMiddleXAxis: "",
    WheelDiscBMiddleYAxis: "",
    WheelDiscBLowerXAxis: "",
    WheelDiscBLowerYAxis: "",
    WheelDiscBAvgXAxis: "",
    WheelDiscBAvgYAxis: "",
    BrakeDiscAABoreSize: "",
    BrakeDiscABBDSeatSize: "",
    BrakeDiscAAllow: "",
    BrakeDiscAPressOnPressure: "",
    BrakeDiscABDThickness: "",
    BrakeDiscABrakeDiscParticulars: "",
    BrakeDiscATopXAxis: "",
    BrakeDiscATopYAxis: "",
    BrakeDiscAMiddleXAxis: "",
    BrakeDiscAMiddleYAxis: "",
    BrakeDiscALowerXAxis: "",
    BrakeDiscALowerYAxis: "",
    BrakeDiscAAvgXAxis: "",
    BrakeDiscAAvgYAxis: "",
    BrakeDiscBABoreSize: "",
    BrakeDiscBBBDSeatSize: "",
    BrakeDiscBAllow: "",
    BrakeDiscBPressOnPressure: "",
    BrakeDiscBBDThickness: "",
    BrakeDiscBBrakeDiscParticulars: "",
    BrakeDiscBTopXAxis: "",
    BrakeDiscBTopYAxis: "",
    BrakeDiscBMiddleXAxis: "",
    BrakeDiscBMiddleYAxis: "",
    BrakeDiscBLowerXAxis: "",
    BrakeDiscBLowerYAxis: "",
    BrakeDiscBAvgXAxis: "",
    BrakeDiscBAvgYAxis: "",
    MCNo: "",
    OperatorNameFinal: "",
    InspectorName: "",
    OperatorNo: "",
    InspectorNo: "",
    wheelid: "",
    SectionId: 1,
    DepartmentId: 3,
    WheeltypeId: 2,
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
        path="/parentediticf/UpdateICFPressOnForm*"
        element={
          <ICFPressOn
          formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
          setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
          />
        }
      />
      <Route
        path="/proceedsubmitpressonicf"
        element={
          <ProceedSubmitPressOnICF formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF} setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF} />
        }
      />
      <Route path="/icfpresson_viewallentry" element={<AllEntryPressOnICF />} />
    </Routes>
    //   </Router>
  );
}

export default ParentICF;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ICFPressOn from "./WearingClearance";
// import ProceedSubmit from "../LHBPreInspection/ProceedSubmit";
// import AllEntry from "../LHBPreInspection/AllEntry";
import ProceedSubmitICF from "./ProceedSubmit";
import AllEntryICF from "./AllEntry";
import AllEntryWearingClearance  from "./AllEntry";
import ProceedSubmitWearingClearance  from "./ProceedSubmit";

function ParentWearingClearanceEMU() {
  const [formDataProceedSubmitEMUWearingClearance , setformDataProceedSubmitEMUWearingClearance ] = useState({
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
    SectionID: 1,
    DepartmentID: 3,
    WheeltypeID: 2,
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
        path="/wearingclearanceemu/*"
        element={
          <ICFPressOn
          formDataProceedSubmitEMUWearingClearance ={formDataProceedSubmitEMUWearingClearance }
          setformDataProceedSubmitEMUWearingClearance ={setformDataProceedSubmitEMUWearingClearance }
          />
        }
      />
      <Route
        path="/proceedsubmitemuwearingclearance"
        element={
          <ProceedSubmitWearingClearance  formDataProceedSubmitEMUWearingClearance ={formDataProceedSubmitEMUWearingClearance } setformDataProceedSubmitEMUWearingClearance ={setformDataProceedSubmitEMUWearingClearance } />
        }
      />
      <Route path="/wearingclearanceemuviewallentry" element={<AllEntryWearingClearance  />} />
    </Routes>
    //   </Router>
  );
}

export default ParentWearingClearanceEMU;

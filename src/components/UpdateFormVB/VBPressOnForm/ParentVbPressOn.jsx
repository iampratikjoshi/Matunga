import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllEntryPressOn from "./AllEntryPressOn";
import ProceedSubmitPressOn from "./ProceedSubmitPressOn";
import VBPressOnForm from "./VBPressOnForm";

function ParentLhbPressOn() {
  const [formDataPressOnVB, setFormDataPressOnVB] = useState({
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
    WheelActivities: "",
    AxleWheelSeatSize: "",
    WheelDiscBoreSize: "",
    wheelDiscStampingParticulars: "",
    PressOnNumber: "",
    WheelActivityBDThickness: "",
    WheelActivityBDMake: "",
    SectionId: 1,
    DepartmentId: 3,
    WheeltypeId: 3,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });

  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        {/* <Route
                path="/"
                element={<Navigate to="/VBPressOnForm" replace />}
              /> */}
        <Route
          path="/VBPressOnForm/*"
          element={
            <VBPressOnForm
              formDataPressOnVB={formDataPressOnVB}
              setFormDataPressOnVB={setFormDataPressOnVB}
            />
          }
        />
        <Route
          path="/proceedsubmitvbpresson"
          element={
            <ProceedSubmitPressOn
              formDataPressOnVB={formDataPressOnVB}
              setFormDataPressOnVB={setFormDataPressOnVB}
            />
          }
        />
        <Route path="/viewallentryvbpresson" element={<AllEntryPressOn />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentLhbPressOn;

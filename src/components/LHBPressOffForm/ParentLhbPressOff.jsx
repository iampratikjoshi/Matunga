import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LHBPressOffForm from './LHBPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import ProceedSubmitPressOff from './ProceedSubmitPressOff';

function ParentLhbPressOff() {
  const [formDataPressOffLHB, setFormDataPressOffLHB] = useState({
    Date: "",
    OperatorName: "",
    OperatorTNo: "",
    InspectorName: "",
    InspectorTNo: "",
    ShopSNo: "",
    MachineNumber: "",
    ShiftNumber: "",
    TypeOfWheel: "",
    WheelPressedOff: "",
    DiscSrNo: "",
    AxleNo: "",
    AxleCondition: "",
    AxleConditionReason: "",
    AxleConditionCause: "",
    BrakeDiscCondition: "",
    BrakeDiscConditionReason: "",
    BrakeDiscConditionCause: "",
    WheelDiscCondition: "",
    WheelConditionReason: "",
    WheelDiscConditionCause: "",
    serviceablediscidnumber: "",
    Reason: "",
    PressedOffRemark: "",
    SectionID: 1,
    DepartmentID: 5,
    WheeltypeID: 1,
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
                element={<Navigate to="/LHBPressOffForm" replace />}
              /> */}
        <Route
          path="/LHBPressOffForm/*"
          element={
            <LHBPressOffForm
              formDataPressOffLHB={formDataPressOffLHB}
              setFormDataPressOffLHB={setFormDataPressOffLHB}
            />
          }
        />
        <Route
          path="/proceedsubmitpressoff"
          element={
            <ProceedSubmitPressOff formDataPressOffLHB={formDataPressOffLHB} setFormDataPressOffLHB={setFormDataPressOffLHB} />
          }
        />
        <Route path="/viewallentrypressoff" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentLhbPressOff
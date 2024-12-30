import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import VBPressOffForm from './VBPressOffForm';
import AllEntryPressOff from './AllEntryPressOffVB';
import ProceedSubmitPressOff from './ProceedSubmitPressOffVB';

function ParentVBPressOff() {
  const [formDataPressOffVB, setFormDataPressOffVB] = useState({
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
                element={<Navigate to="/VBPressOffForm" replace />}
              /> */}
        <Route
          path="/VBPressOffForm/*"
          element={
            <VBPressOffForm
              formDataPressOffVB={formDataPressOffVB}
              setFormDataPressOffVB={setFormDataPressOffVB}
            />
          }
        />
        <Route
          path="/proceedsubmitpressoffVB"
          element={
            <ProceedSubmitPressOff formDataPressOffVB={formDataPressOffVB} setFormDataPressOffVB={setFormDataPressOffVB} />
          }
        />
        <Route path="/viewallentrypressoffVB" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentVBPressOff
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import VBPressOffForm from './VBPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import ProceedSubmitPressOff from './ProceedSubmitPressOff';

function ParentLhbPressOff() {
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
    WheeltypeID: 3,
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
          path="/proceedsubmitpressoff"
          element={
            <ProceedSubmitPressOff formDataPressOffVB={formDataPressOffVB} setFormDataPressOffVB={setFormDataPressOffVB} />
          }
        />
        <Route path="/viewallentrypressoff" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentLhbPressOff
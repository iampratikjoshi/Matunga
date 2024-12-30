import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import EMUPressOffForm from './EMUPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import ProceedSubmitPressOff from './ProceedSubmitPressOff';

function ParentEMUPressOff() {
  const [formDataPressOffEMU, setFormDataPressOffEMU] = useState({
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
    WheeltypeID: 4,
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
                element={<Navigate to="/EMUPressOffForm" replace />}
              /> */}
        <Route
          path="/emupressoffForm/*"
          element={
            <EMUPressOffForm
              formDataPressOffEMU={formDataPressOffEMU}
              setFormDataPressOffEMU={setFormDataPressOffEMU}
            />
          }
        />
        <Route
          path="/proceedsubmitemupressoff"
          element={
            <ProceedSubmitPressOff formDataPressOffEMU={formDataPressOffEMU} setFormDataPressOffEMU={setFormDataPressOffEMU} />
          }
        />
        <Route path="/viewallentryemupressoff" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentEMUPressOff
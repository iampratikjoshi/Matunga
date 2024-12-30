import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UpdateLHBPressOffForm from './LHBPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import Proceedsubmitpressoff from '../../UpdateForm/LHBPressOffForm/ProceedSubmitPressOff';

function ParentLhbPressOff() {
  const [formDataPressOffLHB, setFormDataPressOffLHB] = useState({
    Date: "",
    OperatorName:"",
    OperatorTNo: "",
    InspectorName:"",
    InspectorTNo: "",
    ShopSNo: "",
    MachineNumber:"",
    ShiftNumber:"",
    TypeOfWheel: "",
    WheelPressedOff: "",
    DiscSrNo: "",
    AxleNo: "",
    AxleCondition: "",
    AxleConditionReason: "",
    AxleConditionCause:"",
    BrakeDiscCondition: "",
    BrakeDiscConditionReason: "",
    BrakeDiscConditionCause:"",
    WheelDiscCondition: "",
    WheelConditionReason: "",
    WheelDiscConditionCause:"",
    serviceablediscidnumber:"",
    Reason: "",
    PressedOffRemark: "",
    SectionID: 1,
    DepartmentID: 5,
    WheeltypeID: 1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
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
          path="/UpdateLHBPressOffForm/*"
          element={
            <UpdateLHBPressOffForm
              formDataPressOffLHB={formDataPressOffLHB}
              setFormDataPressOffLHB={setFormDataPressOffLHB}
            />
          }
        />
        <Route
          path="/updateproceedsubmitpressoff"
          element={
            <Proceedsubmitpressoff formDataPressOffLHB={formDataPressOffLHB} setFormDataPressOffLHB={setFormDataPressOffLHB} />
          }
        />
        <Route path="/viewallentrypressoff" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentLhbPressOff
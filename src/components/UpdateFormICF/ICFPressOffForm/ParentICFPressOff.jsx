import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import UpdateICFPressOffForm from './ICFPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import Proceedsubmitpressoff from '../../UpdateForm/LHBPressOffForm/ProceedSubmitPressOff';

function ParentICFPressOff() {
  const [formDataPressOffICF, setFormDataPressOffICF] = useState({
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
    WheeltypeID: 2,
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
          path="/UpdateICFPressOffForm/*"
          element={
            <UpdateICFPressOffForm
              formDataPressOffICF={formDataPressOffICF}
              setFormDataPressOffICF={setFormDataPressOffICF}
            />
          }
        />
        <Route
          path="/updateproceedsubmitpressoff"
          element={
            <Proceedsubmitpressoff formDataPressOffICF={formDataPressOffICF} setFormDataPressOffICF={setFormDataPressOffICF} />
          }
        />
        <Route path="/viewallentrypressoff" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentICFPressOff
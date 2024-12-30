import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ICFPressOffForm from './ICFPressOffForm';
import AllEntryPressOff from './AllEntryPressOff';
import ProceedSubmitPressOff from './ProceedSubmitPressOff';

function ParentLhbPressOff() {
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
    modifiedDate: "",
  });

  return (
    <div className="App">
      {/* <Router> */}
      <Routes>
        {/* <Route
                path="/"
                element={<Navigate to="/ICFPressOffForm" replace />}
              /> */}
        <Route
          path="/icfpressoffForm/*"
          element={
            <ICFPressOffForm
              formDataPressOffICF={formDataPressOffICF}
              setFormDataPressOffICF={setFormDataPressOffICF}
            />
          }
        />
        <Route
          path="/proceedsubmiticfpressoff"
          element={
            <ProceedSubmitPressOff formDataPressOffICF={formDataPressOffICF} setFormDataPressOffICF={setFormDataPressOffICF} />
          }
        />
        <Route path="/viewallentryicfpressoff" element={<AllEntryPressOff />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default ParentLhbPressOff
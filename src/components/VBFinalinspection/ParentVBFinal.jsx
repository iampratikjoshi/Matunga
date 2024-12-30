import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllEntryFinal from './AllEntry';
import VBFinalInspection from './VBFinalInspection';
import ProceedSubmitFinalVB from './ProceedSubmitFinalVB';
import AllEntryFinalVB from './AllEntryFinalVB';

function ParentVBFinal() {

  const [formDataFinalVB, setFormDataFinalVB] = useState({
    SectionId: 1,
    DepartmentId: 4,
    WheeltypeId: 1,
    AxleNo: "",
    WheelNo: "",
    Shift: "",
    WheelDiaA: "",
    WheelDiaB: "",
    WheelRG: "",
    WheelFLG: "",
    SizeA: "",
    SizeB: "",
    OvalA: "",
    OvalB: "",
    TapA: "",
    TapB: "",
    ShoulderSizeA: "",
    ShoulderSizeB: "",
    JrWaivinessA: "",
    JrWaivinessB: "",
    BDMake: "",
    BDSizeA: "",
    BDSizeB: "",
    EndHoleA: "",
    EndHoleB: "",
    CTRBRefurbishmentDetailsA: "",
    CTRBRefurbishmentDetailsB: "",
    CTRBRemainingLifeA: "",
    CTRBRemainingLifeB: "",
    CTRBNumberA: "",
    CTRBNumberB: "",
    CTRBMakeA: "",
    CTRBMakeB: "",
    CTRBStatusA: "",
    CTRBStatusB: "",
    CTRBRemarkA: "",
    CTRBRemarkB: "",
    CTRBDefectA: "",
    CTRBDefectB: "",
    CTRBDefectNameA: "",
    CTRBDefectNameB: "",
    InspectorTicketNo: "",
    InspectorName: "",
    WheelTreadUST: "",
    MEPA: "",
    MEPB: "",
    USTName: "",
    FittingDt: "",
    ECATest: "",
    createdBy: "ADMIN",
  });
  return (
    <div>
      {/* <Router> */}
      <Routes>
        {/* <Route
            path="/"
            element={<Navigate to="/lhbfinalinspection" replace />}
          /> */}
        <Route
          path="/VBfinalinspection/*"
          element={
            <VBFinalInspection
              formData={formDataFinalVB}
              setFormData={setFormDataFinalVB}
            />
          }
        />
        <Route
          path="/proceedsubmitVB"
          element={
            <ProceedSubmitFinalVB formData={formDataFinalVB} setFormData={setFormDataFinalVB} />
          }
        />
        <Route path="/viewallentryFinalVB" element={<AllEntryFinalVB />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentVBFinal
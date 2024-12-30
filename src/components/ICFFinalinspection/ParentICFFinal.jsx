import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllEntryFinal from './AllEntry';
import ICFFinalInspection from './ICFFinalInspection';
import ProceedSubmitFinal from './ProceedSubmit';

function ParentICFFinal() {

  const [formDataFinalICF, setFormDataFinalICF] = useState({
    SectionId: 1,
    DepartmentId: 4,
    WheeltypeId: 2,
    WheelNo: "",
    TypeOfWheel: "",
    ParticularAX1: "",
    ParticularAX2: "",
    ParticularAX3: "",
    ParticularAY1: "",
    ParticularAY2: "",
    ParticularAY3: "",
    TaperXA: "",
    TaperYA: "",
    ShoulderSizeA: "",
    OvalityA: "",
    ParticularBX1: "",
    ParticularBX2: "",
    ParticularBX3: "",
    ParticularBY1: "",
    ParticularBY2: "",
    ParticularBY3: "",
    TaperXB: "",
    TaperYB: "",
    ShoulderSizeB: "",
    OvalityB: "",
    WearTear: "",
    Bend: "",
    AxleEndHole: "",  
    AxleNo:"",
    BrgCodeA: "",
    BrgYearA: "",
    MTNBrgNoA: "",
    BrgMakeA: "",
    RadialClearanceDismountedA: "",
    RadialClearanceMountedA: "",
    BrgInitialFitmentMonthA: "",
    BrgServiceInMonthA: "",
    BrgCodeB: "",
    BrgYearB: "",
    MTNBrgNoB: "",
    BrgMakeB: "",
    RadialClearanceDismountedB: "",
    RadialClearanceMountedB: "",
    BrgInitialFitmentMonthB: "",
    BrgServiceInMonthB: "",
    FitmentDate: "",
    Shift: "",
    GangNameA: "",
    GangNameB: "",
    InspectorName: "",  
    createdBy: "ADMIN",
  });
  return (
    <div>
      {/* <Router> */}
      <Routes>
        {/* <Route
            path="/"
            element={<Navigate to="/icffinalinspection" replace />}
          /> */}
        <Route
          path="/icffinalinspection/*"
          element={
            <ICFFinalInspection
              formDataFinalICF={formDataFinalICF}
              setFormDataFinalICF={setFormDataFinalICF}
            />
          }
        />
        <Route
          path="/proceedsubmitFinalicf"
          element={
            <ProceedSubmitFinal formDataFinalICF={formDataFinalICF} setFormDataFinalICF={setFormDataFinalICF} />
          }
        />
        <Route path="/viewallentryicfFinal" element={<AllEntryFinal />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentICFFinal
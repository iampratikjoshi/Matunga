import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllEntryFinal from './AllEntry';
import UpdateEMUFinalinspection from './EMUFinalInspection';
import ProceedSubmitUpdatedFinal from './ProceedSubmit';

function ParentEMUFinal() {

  const [formDataFinalEMU, setFormDataFinalEMU] = useState({
    SectionId: 1,
    DepartmentId: 4,
    WheeltypeId: 4,
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
            element={<Navigate to="/UpdateEMUFinalInspection" replace />}
          /> */}
        <Route
          path="/UpdateEMUFinalInspection/*"
          element={
            <UpdateEMUFinalinspection
              formDataFinalEMU={formDataFinalEMU}
              setFormDataFinalEMU={setFormDataFinalEMU}
            />
          }
        />
        <Route
          path="/updateproceedsubmitemufinal"
          element={
            <ProceedSubmitUpdatedFinal formDataFinalEMU={formDataFinalEMU} setFormDataFinalEMU={setFormDataFinalEMU} />
          }
        />
        <Route path="/viewallentryemuFinal" element={<AllEntryFinal />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentEMUFinal
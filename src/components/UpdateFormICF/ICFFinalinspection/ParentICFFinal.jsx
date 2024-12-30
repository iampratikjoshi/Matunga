import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AllEntryFinal from './AllEntry';
import UpdateICFFinalinspection from './ICFFinalInspection';
import ProceedSubmitUpdatedFinal from './ProceedSubmit';

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
    createdBy: "ADMIN",
  });
  return (
    <div>
      {/* <Router> */}
      <Routes>
        {/* <Route
            path="/"
            element={<Navigate to="/UpdateICFfinalinspection" replace />}
          /> */}
        <Route
          path="/UpdateICFfinalinspection/*"
          element={
            <UpdateICFFinalinspection
              formDataFinalICF={formDataFinalICF}
              setFormDataFinalICF={setFormDataFinalICF}
            />
          }
        />
        <Route
          path="/proceedsubmitupdatedFinalicf"
          element={
            <ProceedSubmitUpdatedFinal formDataFinalICF={formDataFinalICF} setFormDataFinalICF={setFormDataFinalICF} />
          }
        />
        <Route path="/viewallentryicfFinal" element={<AllEntryFinal />} />
      </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentICFFinal
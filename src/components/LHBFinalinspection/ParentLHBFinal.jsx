import React,{useState} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import AllEntryFinal from './AllEntry';
import LHBFinalInspection from './LHBFinalInspection';
import ProceedSubmitFinal from './ProceedSubmit';

function ParentLHBFinal() {

    const [formDataFinal, setFormDataFinal] = useState({
        SectionId: 1,
        DepartmentId: 4,
        WheeltypeId: 1,
        AxleNo: "",
        WheelNo:"",
        Shift:"",
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
        CTRBRefurbishmentDetailsA:"",
        CTRBRefurbishmentDetailsB:"",
        CTRBRemainingLifeA:"",
        CTRBRemainingLifeB:"",
        CTRBNumberA:"",
        CTRBNumberB:"",
        CTRBMakeA:"",
        CTRBMakeB:"",
        CTRBStatusA:"",
        CTRBStatusB:"",
        CTRBRemarkA:"",
        CTRBRemarkB:"",
        InspectorTicketNo:"",
        InspectorName:"",
        WheelTreadUST:"",
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
            path="/lhbfinalinspection/*"
            element={
              <LHBFinalInspection
                formData={formDataFinal}
                setFormData={setFormDataFinal}
              />
            }
          />
          <Route
            path="/proceedsubmit"
            element={
              <ProceedSubmitFinal formData={formDataFinal} setFormData={setFormDataFinal} />
            }
          />
          <Route path="/viewallentryFinal" element={<AllEntryFinal />} />
        </Routes>
      {/* </Router> */}
    </div>
  )
}

export default ParentLHBFinal
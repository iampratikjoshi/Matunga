import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import AddWheel from "./components/AddWheel";
import PendingTasks from "./components/PendingTasks";
import "./App.css";
// import ParentLhb from "./components/LHBPreInspection/ParentLhb";
// import LHBPreInspection from "./components/LHBPreInspection/LHBPreInspection";
import LoginForm from "./components/Login";
import LHBSchedulePreInspection from "./components/LHBSchedulePreInspection/LHBSchedulePreInspection";
import ProceedSubmit from "./components/LHBSchedulePreInspection/ProceedSubmit";
import AllEntry from "./components/LHBSchedulePreInspection/AllEntry";
import LHBDivisionPreInspectionForm from "./components/LHBDivisionPreInspectionForm/LHBDivisionPreInspectionForm";
import ProceedSubmitDivision from "./components/LHBDivisionPreInspectionForm/ProceedSubmitDivision";
import AllEntryDivision from "./components/LHBDivisionPreInspectionForm/AllEntryDivision";
import LHBFinalInspection from "./components/LHBFinalinspection/LHBFinalInspection";
import ProceedSubmitFinal from "./components/LHBFinalinspection/ProceedSubmit";
import AllEntryFinal from "./components/LHBFinalinspection/AllEntry";
import LHBPressOffForm from "./components/LHBPressOffForm/LHBPressOffForm";
import ProceedSubmitPressOff from "./components/LHBPressOffForm/ProceedSubmitPressOff";
import AllEntryPressOff from "./components/LHBPressOffForm/AllEntryPressOff";
import ProtectedRoute from "./components/ProtectedRoute";
import ProceedSubmitPressOn from "./components/LHBPressOnForm/ProceedSubmitPressOn";
import LHBPressOnForm from "./components/LHBPressOnForm/LHBPressOnForm";
import AllEntryPressOn from "./components/LHBPressOnForm/AllEntryPressOn";
import ProceedSubmitWheelDispatch from "./components/LHBWheelDispatchRecordForm/ProceedSubmitWheelDispatch";
import AllEntryWheelDispatch from "./components/LHBWheelDispatchRecordForm/AllEntryWheelDispatch";
import Wheelsdispatchrecordform from "./components/LHBWheelDispatchRecordForm/WheelDispatchRecordForm";
import Search from "./components/Search";
import UpdateProceedSubmit from "./components/UpdateForm/LHBSchedulePreInspection/ProceedSubmit";
import UpdateLHBPressOffForm from "./components/UpdateForm/LHBPressOffForm/LHBPressOffForm";
import Updateproceedsubmitpressoff from "./components/UpdateForm/LHBPressOffForm/ProceedSubmitPressOff";
import UpdateLHBPressOnForm from "./components/UpdateForm/LHBPressOnForm/LHBPressOnForm";
import UpdateProceedSubmitPressOn from "./components/UpdateForm/LHBPressOnForm/ProceedSubmitPressOn";
import Updatelhbfinalinspection from "./components/UpdateForm/LHBFinalinspection/LHBFinalInspection";
import UpdateProceedSubmitFinal from "./components/UpdateForm/LHBFinalinspection/ProceedSubmit";
import Edit from "./components/Edit/Edit";
import ParentEdit from "./components/Edit/ParentEdit";

function App() {
  const [formData, setFormData] = useState({
    ShopSrNumber: "",
    AxleNumber: "",
    ReceiveDate: "",
    AxleCondition: "",
    CoachNo: "",
    CTRBDefectName: "",
    CTRBStatusA: "",
    CTRBStatusB: "",
    BDThicknessA: "",
    BDThicknessB: "",
    DiameterINA: "",
    DiameterINB: "",
    FlageIN: "",
    BDNumber: "",
    BDDefect: "",
    BDMakeIN: "",
    BDSizeIN: "",
    RODGaugeIN: "",
    SoundTestIN: "",
    TypeOfRepair: "",
    MatungaRemark: "",
    DiscParticularA: "",
    DiscParticularB: "",
    CTRBA: "",
    CTRBB: "",
    CTRBNumberA: "",
    CTRBNumberB: "",
    CTRBMakeA: "",
    CTRBMakeB: "",
    RefurbishmentDetailsA: "",
    RefurbishmentDetailsB: "",
    CTRBDefect: "",
    CTRBRemarkA: "",
    CTRBRemarkB: "",
    FitmentDate: "",
    CTRBRemainingLifeA: "",
    CTRBRemainingLifeB: "",
    InspectorName: "",
    InspectorTicketNo: "",
    createdBy: "ADMIN",
    SectionId: 1,
    DepartmentId: 2,
    WheeltypeId: 1,
  });

  const [formDataDivision, setFormDataDivision] = useState({
    WheelNo: "",
    LooryNo: "",
    POHDate: "",
    divisionreport: "",
    DivisionName: "",
    matungareport: "",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });

  const [formDataFinal, setFormDataFinal] = useState({
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
    Size: "",
    Oval: "",
    Tap: "",
    ShoulderSize: "",
    JrWaiviness: "",
    BDMake: "",
    BDSize: "",
    EndHole: "",
    BRGRemainLife: "",
    BRGMake: "",
    CTRBRefurbishmentDetails: "",
    FinalInspectionRemark: "",
    InspectorTicketNo: "",
    InspectorName: "",
    WheelTreadUST: "",
    BRGNo: "",
    MEP: "",
    USTName: "",
    FittingDt: "",
    ECATest: "",
    createdBy: "ADMIN",
  });

  const [formDataPressOffLHB, setFormDataPressOffLHB] = useState({
    Date: "",
    OperatorTNo: "",
    InspectorTNo: "",
    ShopSNo: "",
    TypeOfWheel: "",
    WheelPressedOff: "",
    DiscSrNo: "",
    AxleNo: "",
    AxleCondition: "",
    AxleConditionReason: "",
    BrakeDiscCondition: "",
    BrakeDiscConditionReason: "",
    WheelDiscCondition: "",
    WheelConditionReason: "",
    Reason: "",
    PressedOffRemark: "",
    wheelid: "",
    SectionID: 1,
    DepartmentID: 2,
    WheeltypeID: 1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
  });

  const [formDataPressOnLHB, setFormDataPressOnLHB] = useState({
    WheelNo: "",
    AxleNo: "",
    ATLNo: "",
    WheelSeatSize: "",
    BDSeatSize: "",
    RAValue: "",
    OperatorName: "",
    WheelDiscAVTLNO: "",
    WheelDiscABoreSizeByOperator: "",
    WheelDiscARAValue: "",
    WheelDiscAOperatorName: "",
    WheelDiscAABoreSize: "",
    WheelDiscABWheelSeatSize: "",
    WheelDiscAAllow: "",
    WheelDiscAPressOnPressure: "",
    WheelDiscARDNo: "",
    WheelDiscAWheelDiscParticulars: "",
    WheelDiscATopXAxis: "",
    WheelDiscATopYAxis: "",
    WheelDiscAMiddleXAxis: "",
    WheelDiscAMiddleYAxis: "",
    WheelDiscALowerXAxis: "",
    WheelDiscALowerYAxis: "",
    WheelDiscAAvgXAxis: "",
    WheelDiscAAvgYAxis: "",
    WheelDiscBVTLNo: "",
    WheelDiscBBoreSizeByOperator: "",
    WheelDiscBRAValue: "",
    WheelDiscBOperatorName: "",
    WheelDiscBABoreSize: "",
    WheelDiscBBWheelSeatSize: "",
    WheelDiscBAllow: "",
    WheelDiscBPressOnPressure: "",
    WheelDiscBRDNo: "",
    WheelDiscBWheelDiscParticulars: "",
    WheelDiscBTopXAxis: "",
    WheelDiscBTopYAxis: "",
    WheelDiscBMiddleXAxis: "",
    WheelDiscBMiddleYAxis: "",
    WheelDiscBLowerXAxis: "",
    WheelDiscBLowerYAxis: "",
    WheelDiscBAvgXAxis: "",
    WheelDiscBAvgYAxis: "",
    BrakeDiscAABoreSize: "",
    BrakeDiscABBDSeatSize: "",
    BrakeDiscAAllow: "",
    BrakeDiscAPressOnPressure: "",
    BrakeDiscABDThickness: "",
    BrakeDiscABrakeDiscParticulars: "",
    BrakeDiscATopXAxis: "",
    BrakeDiscATopYAxis: "",
    BrakeDiscAMiddleXAxis: "",
    BrakeDiscAMiddleYAxis: "",
    BrakeDiscALowerXAxis: "",
    BrakeDiscALowerYAxis: "",
    BrakeDiscAAvgXAxis: "",
    BrakeDiscAAvgYAxis: "",
    BrakeDiscBABoreSize: "",
    BrakeDiscBBBDSeatSize: "",
    BrakeDiscBAllow: "",
    BrakeDiscBPressOnPressure: "",
    BrakeDiscBBDThickness: "",
    BrakeDiscBBrakeDiscParticulars: "",
    BrakeDiscBTopXAxis: "",
    BrakeDiscBTopYAxis: "",
    BrakeDiscBMiddleXAxis: "",
    BrakeDiscBMiddleYAxis: "",
    BrakeDiscBLowerXAxis: "",
    BrakeDiscBLowerYAxis: "",
    BrakeDiscBAvgXAxis: "",
    BrakeDiscBAvgYAxis: "",
    MCNo: "",
    OperatorNameFinal: "",
    InspectorName: "",
    OperatorNo: "",
    InspectorNo: "",
    wheelid: "",
    SectionId: 1,
    DepartmentId: 3,
    WheeltypeId: 1,
    createdBy: "ADMIN",
    modifiedBy: "admin",
  });

  const [formDataWheelDispatch, setformDataWheelDispatch] = useState({
    date: "",
    DivisionCarshed: "",
    LooryNo: "",
    WheelNo: "",
    TypeOfWheel: "",
    TradeDiameter: "",
    WheelGauge: "",
    AxleUSTCode: "",
    remark: "",
    createdBy: "ADMIN",
    wheelid: "",
    SectionId: 1,
    DepartmentId: 5,
    WheeltypeId: 1,
  });
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_wheel"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddWheel />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending_tasks"
            element={
              <ProtectedRoute>
                <Layout>
                  <PendingTasks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Layout>
                  <Search />
                </Layout>
              </ProtectedRoute>
            }
          />


          {/* <Route
            path="/UpdateLHBSchedulePreInspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <UpdateLHBSchedulePreInspection
                    formData={formData}
                    setFormData={setFormData}
                  />
                </Layout>
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/editproceedsubmit"
            element={
              <ProtectedRoute>
              <Layout>
                <UpdateProceedSubmit formData={formData} setFormData={setFormData} />
              </Layout>
              </ProtectedRoute>

            }
          />
          
          <Route
            path="/parentedit/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ParentEdit 
                  
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/LHBSchedulePreInspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBSchedulePreInspection
                    formData={formData}
                    setFormData={setFormData}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/LHBDivisionPreInspectionForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBDivisionPreInspectionForm
                    formDataDivision={formDataDivision}
                    setFormDataDivision={setFormDataDivision}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/updateproceedsubmitpressoff"
            element={

              <Layout>
                <Updateproceedsubmitpressoff formDataPressOffLHB={formDataPressOffLHB} setFormDataPressOffLHB={setFormDataPressOffLHB} />
              </Layout>

            }
          />
          <Route
            path="/LHBPressOffForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBPressOffForm
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          

          <Route
            path="/proceedsubmitpressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitPressOff
                    formDataPressOffLHB={formDataPressOffLHB}
                    setFormDataPressOffLHB={setFormDataPressOffLHB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentrypressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryPressOff />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmit"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmit
                    formData={formData}
                    setFormData={setFormData}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentry"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntry />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitLHBDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitDivision
                    formDataDivision={formDataDivision}
                    setFormDataDivision={setFormDataDivision}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryLHBDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryDivision />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/lhbfinalinspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <LHBFinalInspection
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
         

          <Route
            path="/proceedsubmitFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitFinal
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateproceedsubmitFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <UpdateProceedSubmitFinal
                    formDataFinal={formDataFinal}
                    setFormDataFinal={setFormDataFinal}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryFinal />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/LHBPressOnForm/*"
            element={
              <Layout>
                <LHBPressOnForm
                  formDataPressOnLHB={formDataPressOnLHB}
                  setFormDataPressOnLHB={setFormDataPressOnLHB}
                />
              </Layout>
            }
          />
          

          <Route
            path="/proceedsubmitlhbpresson"
            element={
              <Layout>
                <ProceedSubmitPressOn
                  formDataPressOnLHB={formDataPressOnLHB}
                  setFormDataPressOnLHB={setFormDataPressOnLHB}
                />
              </Layout>
            }
          />
          <Route
            path="/updateproceedsubmitlhbpresson"
            element={
              <Layout>
                <UpdateProceedSubmitPressOn
                  formDataPressOnLHB={formDataPressOnLHB}
                  setFormDataPressOnLHB={setFormDataPressOnLHB}
                />
              </Layout>
            }
          />
          <Route
            path="/viewallentrylhbpresson"
            element={
              <Layout>
                <AllEntryPressOn />
              </Layout>
            }
          />

          <Route
            path="/wheelsdispatchrecordform/*"
            element={
              <Layout>
                <Wheelsdispatchrecordform
                  formDataWheelDispatch={formDataWheelDispatch}
                  setformDataWheelDispatch={setformDataWheelDispatch}
                />
              </Layout>
            }
          />

          <Route
            path="/proceedsubmitlhbwheelsdispatch"
            element={
              <Layout>
                <ProceedSubmitWheelDispatch
                  formDataWheelDispatch={formDataWheelDispatch}
                  setformDataWheelDispatch={setformDataWheelDispatch}
                />
              </Layout>
            }
          />

          <Route
            path="/viewallentrylhbwheelsdispatch"
            element={
              <Layout>
                <AllEntryWheelDispatch />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

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
import Updateproceedsubmitpressoff from "./components/UpdateForm/LHBPressOffForm/ProceedSubmitPressOff";
import UpdateProceedSubmitPressOn from "./components/UpdateForm/LHBPressOnForm/ProceedSubmitPressOn";
import UpdateProceedSubmitFinal from "./components/UpdateForm/LHBFinalinspection/ProceedSubmit";
import ParentEdit from "./components/Edit/ParentEdit";
import EMUDivisionPreInspectionForm from "./components/EMUDivisionPreInspectionForm/EMUDivisionPreInspectionForm";
import EMUSchedulePreInspectionForm from "./components/EMUSchedulePreInspection/EMUSchedulePreInspection";
import ProceedSubmitEMU from "./components/EMUSchedulePreInspection/ProceedSubmit";
import AllEntryEMU from "./components/EMUSchedulePreInspection/AllEntry";
import ProceedSubmitEMUDivision from "./components/EMUDivisionPreInspectionForm/ProceedSubmitDivision";
import AllEntryEMUDivision from "./components/EMUDivisionPreInspectionForm/AllEntryDivision";
import EMUFinalInspection from "./components/EMUFinalinspection/EMUFinalInspection";
import ProceedSubmitEMUFinal from "./components/EMUFinalinspection/ProceedSubmit";
import EMUPressOffForm from "./components/EMUPressOffForm/EMUPressOffForm";
import AllEntryEMUPressOff from "./components/EMUPressOffForm/AllEntryPressOff";
import ProceedSubmitEMUPressoff from "./components/EMUPressOffForm/ProceedSubmitPressOff";
import AllEntryEMUFinal from "./components/EMUFinalinspection/AllEntry";
import EMUPressOn from "./components/EMUPressOn/EMUPressOn";
import AllEntryPressOnEMU from "./components/EMUPressOn/AllEntry";
import ICFDivisionPreInspectionForm from "./components/ICFDivisionPreInspectionForm/ICFDivisionPreInspectionForm";
import ICFSchedulePreInspection from "./components/ICFSchedulePreInspection/ICFSchedulePreInspection";
import AllEntryICF from "./components/ICFSchedulePreInspection/AllEntry";
import ProceedSubmitICF from "./components/ICFSchedulePreInspection/ProceedSubmit";
import ICFPressOffForm from "./components/ICFPressOffForm/ICFPressOffForm";
import ProceedSubmitICFPressoff from "./components/ICFPressOffForm/ProceedSubmitPressOff";
import AllEntryICFPressOff from "./components/ICFPressOffForm/AllEntryPressOff";
import AllEntryICFFinal from "./components/ICFFinalinspection/AllEntry";
import ICFFinalInspection from "./components/ICFFinalinspection/ICFFinalInspection";
import ProceedSubmitICFFinal from "./components/ICFFinalinspection/ProceedSubmit";
import ProceedSubmitPressOnEMU from "./components/EMUPressOn/ProceedSubmit";
import ProceedSubmitPressOnICF from "./components/ICFPressOn/ProceedSubmit";
import AllEntryPressOnICF from "./components/ICFPressOn/AllEntry";
import ICFPressOn from "./components/ICFPressOn/ICFPressOn";
import ParentEMUEdit from "./components/EditEMU/ParentEMUEdit";
import UpdateProceedSubmitEMUSchedule from "./components/UpdateFormEMU/EMUSchedulePreInspection/ProceedSubmit";
import UpdateproceedsubmitEMUpressoff from "./components/UpdateFormEMU/EMUPressOffForm/ProceedSubmitPressOff";
import UpdateProceedSubmitPressOnEMU from "./components/UpdateFormEMU/EMUPressOn/ProceedSubmit";
import ProceedSubmitEMUFinalInspection from "./components/UpdateFormEMU/EMUFinalinspection/ProceedSubmit";
import ProceedSubmitUpdatedPressOnICF from "./components/UpdateFormICF/ICFPressOn/ProceedSubmit";
import ProceedSubmitUpdatedPressOff from "./components/UpdateFormICF/ICFPressOffForm/ProceedSubmitICFPressOff";
import ProceedSubmitUpdatedFinal from "./components/UpdateFormICF/ICFFinalinspection/ProceedSubmit";
import ProceedSubmitUpdatedSchedulePreinspection from "./components/UpdateFormICF/ICFSchedulePreInspection/ProceedSubmit";
import ParentEditICF from "./components/EditICF/ParentEditICF";
import EMURejectionSheetForm from "./components/EMURejectionSheetForm/EMURejectionSheetForm";
import ProceedsubmitEMUrejectionsheet from "./components/EMURejectionSheetForm/ProceedSubmitEMURejectionSheet";
import AllEntryEMURejectionSheet from "./components/EMURejectionSheetForm/AllEntryEMURejectionSheet";
import ICFRejectionSheetForm from "./components/ICFRejectionSheetForm/ICFRejectionSheetForm";
import ProceedsubmitICFrejectionsheet from "./components/ICFRejectionSheetForm/ProceedSubmitICFRejectionSheet";
import AllEntryICFRejectionSheet from "./components/ICFRejectionSheetForm/AllEntryICFRejectionSheet";
import WearingClearance from "./components/WearingClearanceEMU/WearingClearance";
import ProceedSubmitWearingClearance from "./components/WearingClearanceEMU/ProceedSubmit";
// import ParentWearingClearanceEMU from "./components/ WearingClearanceICF/ParentWearingClearanceICF";
import ParentWearingClearanceICF from "./components/WearingClearanceICF/ParentWearingClearanceICF";
import WearingClearanceICF from "./components/WearingClearanceICF/WearingClearance";
import ProceedSubmitWearingClearanceICF from "./components/WearingClearanceICF/ProceedSubmit";
import AllEntryWearingClearance from "./components/WearingClearanceEMU/AllEntry";
import AllEntryWearingClearanceICF from "./components/WearingClearanceICF/AllEntry";
import DifferencePage from "./components/DifferencePage";
import ImportData from "./components/ImportData";
import ReportPage from "./components/ReportPage";
import RepeatedPage from "./components/RepeatedPage";
import VBPressOffForm from "./components/VBPressOffForm/VBPressOffForm";
import VBPressOnForm from "./components/VBPressOnForm/VBPressOnForm";
import VBDivisionPreInspectionForm from "./components/VBDivisionPreInspectionForm/VBDivisionPreInspectionForm";
import ProceedSubmitDivisionVB from "./components/VBDivisionPreInspectionForm/ProceedSubmitDivisionVB";
import AllEntryDivisionVB from "./components/VBDivisionPreInspectionForm/AllEntryDivisionVB";
import VBSchedulePreInspection from "./components/VBSchedulePreInspection/VBSchedulePreInspection";
import ProceedSubmitVB from "./components/VBSchedulePreInspection/ProceedSubmitVB";
import AllEntryVB from "./components/VBSchedulePreInspection/AllEntryVB";
import ProceedSubmitFinalVB from "./components/VBFinalinspection/ProceedSubmitFinalVB";
import VBFinalInspection from "./components/VBFinalinspection/VBFinalInspection";
import AllEntryFinalVB from "./components/VBFinalinspection/AllEntryFinalVB";
import AllEntryPressOffVB from "./components/VBPressOffForm/AllEntryPressOffVB";
import ProceedSubmitPressOffVB from "./components/VBPressOffForm/ProceedSubmitPressOffVB";
import AllEntryPressOnVB from "./components/VBPressOnForm/AllEntryPressOnVB";
import ProceedSubmitPressOnVB from "./components/VBPressOnForm/ProceedSubmitPressOnVB";
import ParentEditVB from "./components/EditVB/ParentEditVB";
import UpdateProceedSubmitPressOffVB from "./components/UpdateFormVB/VBPressOffForm/ProceedSubmitPressOff";
import UpdateProceedSubmitPressonVB from "./components/UpdateFormVB/VBPressOnForm/ProceedSubmitPressOn";
import ProceedSubmitVBUpdatedSchedulePreinspection from "./components/UpdateFormVB/VBSchedulePreInspection/ProceedSubmitVB";


function App() {
  const [formDataProceedSubmitPressOnICF, setformDataProceedSubmitPressOnICF] =
    useState({
      wheelid: "",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 2,
      WheelNo: "",
      WheelType: "",
      AxleNo: "",
      ATLNo: "",
      AWheelSide: "",
      BWheelSide: "",
      ARASide: "",
      BRASide: "",
      OperatorNamePrimary: "",
      AxleWheelSeatSize: "",
      WheelDiscBoreSize: "",
      wheelDiscStampingParticulars: "",
      PressOnNumber: "",
      InspectorNameActivities: "",
      TicketNo: "",
      OperatorNo: "",
      VTLNo: "",
      BoreSize: "",
      RAValue: "",
      OperatorNameA: "",
      TopX: "",
      TopY: "",
      MiddleX: "",
      MiddleY: "",
      LowerX: "",
      LowerY: "",
      AvgX: "",
      AvgY: "",
      BWheelSeatSize: "",
      CBAIntAllow: "",
      PressureInTon: "",
      RDNo: "",
      WheelDiscAParticulars: "",
      VTLNoB: "",
      BoreSizeB: "",
      RAValueB: "",
      OperatorNameB: "",
      BTopX: "",
      BTopY: "",
      BMiddleX: "",
      BMiddleY: "",
      BLowerX: "",
      BLowerY: "",
      BAvgX: "",
      BAvgY: "",
      BWheelSeatSizeB: "",
      CBAIntAllowB: "",
      PressureInTonB: "",
      RDNoB: "",
      WheelDiscAParticularsB: "",
      MCNo: "",
      OperatorNameFinal: "",
      InspectorNameFinal: "",
      createdBy: "ADMIN",
      modifiedBy: "",
    });

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

  const [formDataVB, setFormDataVB] = useState({
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

  const [formDataScheduleEMU, setFormDataScheduleEMU] = useState({
    ShopSrNumber: "",
    AxleNumber: "",
    ReceiveDate: "",
    AxleCondition: "",
    CoachNumber: "",
    DiameterINA: "",
    DiameterINB: "",
    BrgCodeA: "",
    BrgCodeB: "",
    BrgYearA: "",
    BrgYearB: "",
    BrgMakeA: "",
    BrgMakeB: "",
    FitmentDate: "",
    BrgFitmentA: "",
    BrgFitmentB: "",
    BrgServiceA: "",
    BrgServiceB: "",
    MTNBrgSideA: "",
    MTNBrgSideB: "",
    WheelType: "",
    Shift: "",
    GNameAside: "",
    GNameBside: "",
    RodGaugeIN: "",
    RodGaugeDefect: "",
    TypeOfRepair: "",
    MatungaRemark: "",
    InspectorName: "",
    InspectorTicketNo: "",
    DiscParticularA: "",
    DiscParticularB: "",
    createdBy: "ADMIN",
    SectionId: 1,
    DepartmentId: 2,
    WheeltypeId: 4,
  });

  const [formDataScheduleICF, setFormDataScheduleICF] = useState({
    ShopSrNumber: "",
    AxleNumber: "",
    ReceiveDate: "",
    AxleCondition: "",
    CoachNumber: "",
    DiameterINA: "",
    DiameterINB: "",
    BrgCodeA: "",
    BrgCodeB: "",
    BrgYearA: "",
    BrgYearB: "",
    BrgMakeA: "",
    BrgMakeB: "",
    FitmentDate: "",
    BrgFitmentA: "",
    BrgFitmentB: "",
    BrgServiceA: "",
    BrgServiceB: "",
    MTNBrgSideA: "",
    MTNBrgSideB: "",
    Shift: "",
    GNameAside: "",
    GNameBside: "",
    RodGaugeIN: "",
    TypeOfRepair: "",
    MatungaRemark: "",
    InspectorName: "",
    InspectorTicketNo: "",
    DiscParticularA: "",
    DiscParticularB: "",
    createdBy: "ADMIN",
    SectionId: 1,
    DepartmentId: 2,
    WheeltypeId: 2,
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
    modifiedBy: "",
    modifiedDate: "",
  });

  const [formDataDivisionVB, setFormDataDivisionVB] = useState({
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
    modifiedBy: "",
    modifiedDate: "",
  });

  const [formDataICFDivision, setFormDataICFDivision] = useState({
    WheelNo: "",
    LooryNo: "",
    POHDate: "",
    divisionreport: "",
    DivisionName: "",
    matungareport: "",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 2,
    createdBy: "ADMIN",
    modifiedBy: "",
    modifiedDate: "",
  });

  const [formDataDivisionEMU, setFormDataDivisionEMU] = useState({
    WheelNo: "",
    LooryNo: "",
    POHDate: "",
    divisionreport: "",
    DivisionName: "",
    matungareport: "",
    SectionId: 1,
    DepartmentId: 1,
    WheeltypeId: 4,
    createdBy: "ADMIN",
    modifiedBy: "",
    modifiedDate: "",
  });

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
    AxleNo: "",
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
    AxleNo: "",
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
    RefurbishmentDetailsA: "",
    RefurbishmentDetailsB: "",
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
    DiscParticularA: "",
    DiscParticularB: "",
    createdBy: "ADMIN",
  });

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
    RefurbishmentDetailsA: "",
    RefurbishmentDetailsB: "",
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
    DiscParticularA: "",
    DiscParticularB: "",
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
    DepartmentID: 5,
    WheeltypeID: 1,
    createdBy: "ADMIN",
    modifiedBy: "",
  });

  const [formDataPressOffEMU, setFormDataPressOffEMU] = useState({
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
    DepartmentID: 5,
    WheeltypeID: 4,
    createdBy: "ADMIN",
    modifiedBy: "",
  });

  const [formDataPressOffICF, setFormDataPressOffICF] = useState({
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
    DepartmentID: 5,
    WheeltypeID: 2,
    createdBy: "ADMIN",
    modifiedBy: "",
  });

  const [formDataProceedSubmitEMU, setformDataProceedSubmitEMU] = useState({
    wheelid: "",
    SectionId: 1,
    DepartmentId: 3,
    WheeltypeId: 4,
    WheelNo: "",
    WheelType: "",
    AxleNo: "",
    ATLNo: "",
    AWheelSide: "",
    BWheelSide: "",
    ARASide: "",
    BRASide: "",
    OperatorNamePrimary: "",
    AxleWheelSeatSize: "",
    wheelDiscStampingParticulars: "",
    PressOnNumber: "",
    InspectorNameActivities: "",
    TicketNo: "",
    OperatorNo: "",
    VTLNo: "",
    BoreSize: "",
    RAValue: "",
    OperatorNameA: "",
    TopX: "",
    TopY: "",
    MiddleX: "",
    MiddleY: "",
    LowerX: "",
    LowerY: "",
    AvgX: "",
    AvgY: "",
    BWheelSeatSize: "",
    CBAIntAllow: "",
    PressureInTon: "",
    RDNo: "",
    WheelDiscAParticulars: "",
    VTLNoB: "",
    BoreSizeB: "",
    RAValueB: "",
    OperatorNameB: "",
    BTopX: "",
    BTopY: "",
    BMiddleX: "",
    BMiddleY: "",
    BLowerX: "",
    BLowerY: "",
    BAvgX: "",
    BAvgY: "",
    BWheelSeatSizeB: "",
    CBAIntAllowB: "",
    PressureInTonB: "",
    RDNoB: "",
    WheelDiscAParticularsB: "",
    MCNo: "",
    OperatorNameFinal: "",
    InspectorNameFinal: "",
    createdBy: "ADMIN",
    modifiedBy: "",
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
    modifiedBy: "",
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

  const [formDataRejectionSheetEMU, setFormDataRejectionSheetEMU] = useState({
    Wheelid: "",
    BearingNo: "",
    Make: "",
    CodeorYearofMFG: "",
    DateofRejection: "",
    DateLastInspection: "",
    DateOfInitialFitment: "",
    LifeOfBearing: "",
    CauseOfRejection: "",
    SectionId: 1,
    DepartmentId: 6,
    WheeltypeId: 4,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });

  const [formDataRejectionSheetICF, setFormDataRejectionSheetICF] = useState({
    Wheelid: "",
    BearingNo: "",
    Make: "",
    CodeorYearofMFG: "",
    DateofRejection: "",
    DateLastInspection: "",
    DateOfInitialFitment: "",
    LifeOfBearing: "",
    CauseOfRejection: "",
    SectionId: 1,
    DepartmentId: 6,
    WheeltypeId: 2,
    createdBy: "ADMIN",
    modifiedBy: "admin",
    modifiedDate: "",
  });

  const [
    formDataProceedSubmitEMUWearingClearance,
    setformDataProceedSubmitEMUWearingClearance,
  ] = useState({
    Wheelid: "",
    SectionId: "",
    DepartmentId: "",
    WheeltypeId: "",
    WheelNo: "",
    AxleNo: "",
    WearingCodeNo: "",
    MatungaWNo: "",
    VMake: "",
    DMA: "",
    MA: "",
    InitialFittings: "",
    WearingService: "",
    TagStatus: "",
    FrontCover: "",
    WheelType: "",
    WheelDiameter: "",
    AxleYear: "",
    createdBy: "",
    modifiedBy: "",
  });

  const [
    formDataProceedSubmitICFWearingClearance,
    setformDataProceedSubmitICFWearingClearance,
  ] = useState({
    Wheelid: "",
    SectionId: "",
    DepartmentId: "",
    WheeltypeId: "",
    WheelNo: "",
    AxleNo: "",
    WearingCodeNo: "",
    MatungaWNo: "",
    VMake: "",
    DMA: "",
    MA: "",
    InitialFittings: "",
    WearingService: "",
    TagStatus: "",
    FrontCover: "",
    WheelType: "",
    WheelDiameter: "",
    AxleYear: "",
    createdBy: "",
    modifiedBy: "",
  });

  const [formDataPressOnVB, setFormDataPressOnVB] = useState({
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
    modifiedBy: "",
  });

  const [formDataPressOffVB, setFormDataPressOffVB] = useState({
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
    DepartmentID: 5,
    WheeltypeID: 1,
    createdBy: "ADMIN",
    modifiedBy: "",
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
            path="/wearingclearanceemu/*"
            element={
              <Layout>
                <WearingClearance
                  formDataProceedSubmitEMUWearingClearance={
                    formDataProceedSubmitEMUWearingClearance
                  }
                  setformDataProceedSubmitEMUWearingClearance={
                    setformDataProceedSubmitEMUWearingClearance
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/proceedsubmitemuwearingclearance"
            element={
              <Layout>
                <ProceedSubmitWearingClearance
                  formDataProceedSubmitEMUWearingClearance={
                    formDataProceedSubmitEMUWearingClearance
                  }
                  setformDataProceedSubmitEMUWearingClearance={
                    setformDataProceedSubmitEMUWearingClearance
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/wearingclearanceemuviewallentry"
            element={
              <Layout>
                <AllEntryWearingClearance />
              </Layout>
            }
          />
          <Route
            path="/wearingclearanceicf/*"
            element={
              <Layout>
                <WearingClearanceICF
                  formDataProceedSubmitICFWearingClearance={
                    formDataProceedSubmitICFWearingClearance
                  }
                  setformDataProceedSubmitICFWearingClearance={
                    setformDataProceedSubmitICFWearingClearance
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/proceedsubmiticfwearingclearance"
            element={
              <Layout>
                <ProceedSubmitWearingClearanceICF
                  formDataProceedSubmitICFWearingClearance={
                    formDataProceedSubmitICFWearingClearance
                  }
                  setformDataProceedSubmitICFWearingClearance={
                    setformDataProceedSubmitICFWearingClearance
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/wearingclearanceicfviewallentry"
            element={
              <Layout>
                <AllEntryWearingClearanceICF />
              </Layout>
            }
          />

          {/*---------------------------------ICF UPDATE--------------------------------------------- */}

          <Route
            path="/parentediticf/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ParentEditICF />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateproceedsubmiticfpresson"
            element={
              <Layout>
                <ProceedSubmitUpdatedPressOnICF />
              </Layout>
            }
          />
          <Route
            path="/updateproceedsubmitpressoff"
            element={
              <Layout>
                <ProceedSubmitUpdatedPressOff />
              </Layout>
            }
          />
          <Route
            path="/proceedsubmitupdatedFinalicf"
            element={
              <Layout>
                <ProceedSubmitUpdatedFinal
                  formDataFinalICF={formDataFinalICF}
                  setFormDataFinalICF={setFormDataFinalICF}
                />
              </Layout>
            }
          />
          <Route
            path="/proceedsubmitupdatedscheduleicf"
            element={
              <Layout>
                <ProceedSubmitUpdatedSchedulePreinspection
                  formDataScheduleICF={formDataScheduleICF}
                  setFormDataScheduleICF={setFormDataScheduleICF}
                />
              </Layout>
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

          <Route
            path="/importdata"
            element={
              <ProtectedRoute>
                <Layout>
                  <ImportData />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reportpage"
            element={
              <ProtectedRoute>
                <Layout>
                  <ReportPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/repeatedpage"
            element={
              <ProtectedRoute>
                <Layout>
                  <RepeatedPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/difference_page"
            element={
              <ProtectedRoute>
                <Layout>
                  <DifferencePage />
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
                  <UpdateProceedSubmit
                    formData={formData}
                    setFormData={setFormData}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateproceedsubmitemuschedule"
            element={
              <ProtectedRoute>
                <Layout>
                  <UpdateProceedSubmitEMUSchedule
                    formDataScheduleEMU={formDataScheduleEMU}
                    setFormDataScheduleEMU={setFormDataScheduleEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/parentedit/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ParentEdit />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/parenteditvb/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ParentEditVB />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateproceedsubmitVBpressoff"
            element={
              <Layout>
                <UpdateProceedSubmitPressOffVB
                  formDataPressOffVB={formDataPressOffVB}
                  setFormDataPressOffVB={setFormDataPressOffVB}
                />
              </Layout>
            }
          />
          <Route
            path="/updateproceedsubmitVBpresson"
            element={
              <Layout>
                <UpdateProceedSubmitPressonVB
                  formDataPressOnVB={formDataPressOnVB}
                  setFormDataPressOnVB={setFormDataPressOnVB}
                />
              </Layout>
            }
          />
          <Route
            path="/updateproceedsubmitvbschedule"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitVBUpdatedSchedulePreinspection
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/parentemuedit/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ParentEMUEdit />
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
            path="/VBSchedulePreInspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <VBSchedulePreInspection
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
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
            path="/VBDivisionPreInspectionForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <VBDivisionPreInspectionForm
                    formDataDivisionVB={formDataDivisionVB}
                    setFormDataDivisionVB={setFormDataDivisionVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/emudivisionpreinspectionform/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <EMUDivisionPreInspectionForm
                    formDataDivisionEMU={formDataDivisionEMU}
                    setFormDataDivisionEMU={setFormDataDivisionEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/emurejectionsheetform/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <EMURejectionSheetForm
                    formDataRejectionSheetEMU={formDataRejectionSheetEMU}
                    setFormDataRejectionSheetEMU={setFormDataRejectionSheetEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmitEMUrejectionsheet"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedsubmitEMUrejectionsheet
                    formDataRejectionSheetEMU={formDataRejectionSheetEMU}
                    setFormDataRejectionSheetEMU={setFormDataRejectionSheetEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentryemurejectionsheet"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryEMURejectionSheet />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/icfrejectionsheetform/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ICFRejectionSheetForm
                    formDataRejectionSheetICF={formDataRejectionSheetICF}
                    setFormDataRejectionSheetICF={setFormDataRejectionSheetICF}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmitICFrejectionsheet"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedsubmitICFrejectionsheet
                    formDataRejectionSheetICF={formDataRejectionSheetICF}
                    setFormDataRejectionSheetICF={setFormDataRejectionSheetICF}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentryicfrejectionsheet"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryICFRejectionSheet />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/icfdivisionpreinspectionform/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ICFDivisionPreInspectionForm
                    formDataICFDivision={formDataICFDivision}
                    setFormDataICFDivision={setFormDataICFDivision}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/emuschedulepreinspectionform/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <EMUSchedulePreInspectionForm
                    formDataScheduleEMU={formDataScheduleEMU}
                    setFormDataScheduleEMU={setFormDataScheduleEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/icfschedulepreinspectionform/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ICFSchedulePreInspection
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/updateproceedsubmitpressoff"
            element={
              <Layout>
                <Updateproceedsubmitpressoff
                  formDataPressOffLHB={formDataPressOffLHB}
                  setFormDataPressOffLHB={setFormDataPressOffLHB}
                />
              </Layout>
            }
          />
          <Route
            path="/updateproceedsubmitemupressoff"
            element={
              <Layout>
                <UpdateproceedsubmitEMUpressoff
                  formDataPressOffLHB={formDataPressOffLHB}
                  setFormDataPressOffLHB={setFormDataPressOffLHB}
                />
              </Layout>
            }
          />

          <Route
            path="/emu_presson/*"
            element={
              <Layout>
                <EMUPressOn
                  formDataProceedSubmitEMU={formDataProceedSubmitEMU}
                  setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
                />
              </Layout>
            }
          />

          <Route
            path="/proceedsubmitpressonemu"
            element={
              <Layout>
                <ProceedSubmitPressOnEMU
                  formDataProceedSubmitEMU={formDataProceedSubmitEMU}
                  setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
                />
              </Layout>
            }
          />
          <Route
            path="/updateproceedsubmitemupresson"
            element={
              <Layout>
                <UpdateProceedSubmitPressOnEMU
                  formDataProceedSubmitEMU={formDataProceedSubmitEMU}
                  setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
                />
              </Layout>
            }
          />

          <Route
            path="/emu_viewallentry"
            element={
              <Layout>
                <AllEntryPressOnEMU />
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
            path="/EMUPressOffForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <EMUPressOffForm
                    formDataPressOffEMU={formDataPressOffEMU}
                    setFormDataPressOffEMU={setFormDataPressOffEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/icfpressoffForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ICFPressOffForm
                    formDataPressOffICF={formDataPressOffICF}
                    setFormDataPressOffICF={setFormDataPressOffICF}
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
            path="/proceedsubmitemupressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitEMUPressoff
                    formDataPressOffEMU={formDataPressOffEMU}
                    setFormDataPressOffEMU={setFormDataPressOffEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmiticfpressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitICFPressoff
                    formDataPressOffICF={formDataPressOffICF}
                    setFormDataPressOffICF={setFormDataPressOffICF}
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
            path="/viewallentryemupressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryEMUPressOff />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryicfpressoff"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryICFPressOff />
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
            path="/proceedsubmitvb"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitVB
                    formDataVB={formDataVB}
                    setFormDataVB={setFormDataVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitemu"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitEMU
                    formDataScheduleEMU={formDataScheduleEMU}
                    setFormDataScheduleEMU={setFormDataScheduleEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmiticf"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitICF
                    formDataScheduleICF={formDataScheduleICF}
                    setFormDataScheduleICF={setFormDataScheduleICF}
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
            path="/viewallentryvb"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryVB />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryemu"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryEMU />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryicf"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryICF />
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
            path="/proceedsubmitLHBDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitDivisionVB
                    formDataDivisionVB={formDataDivisionVB}
                    setFormDataDivisionVB={setFormDataDivisionVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitEMUDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitEMUDivision
                    formDataDivisionEMU={formDataDivisionEMU}
                    setFormDataDivisionEMU={setFormDataDivisionEMU}
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
            path="/viewallentryVBDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryDivisionVB />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryEMUDivision"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryEMUDivision />
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
            path="/VBfinalinspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <VBFinalInspection
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/emufinalinspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <EMUFinalInspection
                    formDataFinalEMU={formDataFinalEMU}
                    setFormDataFinalEMU={setFormDataFinalEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/icffinalinspection/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <ICFFinalInspection
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
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
            path="/proceedsubmitFinalVB"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitFinalVB
                    formDataFinalVB={formDataFinalVB}
                    setFormDataFinalVB={setFormDataFinalVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitFinalemu"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitEMUFinal
                    formDataFinalEMU={formDataFinalEMU}
                    setFormDataFinalEMU={setFormDataFinalEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateproceedsubmitemufinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitEMUFinalInspection
                    formDataFinalEMU={formDataFinalEMU}
                    setFormDataFinalEMU={setFormDataFinalEMU}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitFinalicf"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitICFFinal
                    formDataFinalICF={formDataFinalICF}
                    setFormDataFinalICF={setFormDataFinalICF}
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
            path="/viewallentryFinalVB"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryFinalVB />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryemuFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryEMUFinal />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryicfFinal"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryICFFinal />
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

          <Route
            path="/proceedsubmitpressonemu"
            element={
              <Layout>
                <ProceedSubmitPressOnEMU
                  formDataProceedSubmitEMU={formDataProceedSubmitEMU}
                  setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
                />
              </Layout>
            }
          />
          <Route
            path="/emupresson_viewallentry"
            element={
              <Layout>
                <AllEntryPressOnEMU />
              </Layout>
            }
          />
          <Route
            path="/icf_presson/*"
            element={
              <Layout>
                <ICFPressOn
                  formDataProceedSubmitPressOnICF={
                    formDataProceedSubmitPressOnICF
                  }
                  setformDataProceedSubmitPressOnICF={
                    setformDataProceedSubmitPressOnICF
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/proceedsubmitpressonicf"
            element={
              <Layout>
                <ProceedSubmitPressOnICF
                  formDataProceedSubmitPressOnICF={
                    formDataProceedSubmitPressOnICF
                  }
                  setformDataProceedSubmitPressOnICF={
                    setformDataProceedSubmitPressOnICF
                  }
                />
              </Layout>
            }
          />
          <Route
            path="/icfpresson_viewallentry"
            element={
              <Layout>
                <AllEntryPressOnICF />
              </Layout>
            }
          />

          <Route
            path="/VBPressOffForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <VBPressOffForm
                    formDataPressOffVB={formDataPressOffVB}
                    setFormDataPressOffVB={setFormDataPressOffVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proceedsubmitpressoffVB"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitPressOffVB
                    formDataPressOffVB={formDataPressOffVB}
                    setFormDataPressOffVB={setFormDataPressOffVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/viewallentrypressoffVB"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryPressOffVB />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/VBPressOnForm/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <VBPressOnForm
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/proceedsubmitvbpresson"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProceedSubmitPressOnVB
                    formDataPressOnVB={formDataPressOnVB}
                    setFormDataPressOnVB={setFormDataPressOnVB}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/viewallentryvbpresson"
            element={
              <ProtectedRoute>
                <Layout>
                  <AllEntryPressOnVB />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

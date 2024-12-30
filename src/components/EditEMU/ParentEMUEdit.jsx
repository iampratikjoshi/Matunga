import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import EditEMU from "./EditEMU";
import UpdateEMUDivisionPreInspectionForm from "../UpdateFormEMU/EMUDivisionPreInspectionForm/EMUDivisionPreInspectionForm";
import ProceedSubmitEMUSchedule from "../UpdateFormEMU/EMUSchedulePreInspection/ProceedSubmit";
import EMUSchedulePreInspection from "../UpdateFormEMU/EMUSchedulePreInspection/EMUSchedulePreInspection";
import UpdateEMUPressOffForm from "../UpdateFormEMU/EMUPressOffForm/EMUPressOffForm";
import ProceedSubmitEMUPressOff from "../UpdateFormEMU/EMUPressOffForm/ProceedSubmitPressOff";
import UpdateEMUPressOn from "../UpdateFormEMU/EMUPressOn/EMUPressOn";
import ProceedSubmitEMUPressOn from "../UpdateFormEMU/EMUPressOn/ProceedSubmit";
import UpdateEMUFinalInspection from "../UpdateFormEMU/EMUFinalinspection/EMUFinalInspection";
import ProceedSubmitEMUFinalInspection from "../UpdateFormEMU/EMUFinalinspection/ProceedSubmit";

function ParentEdit() {
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
    modifiedBy: "admin",
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
    modifiedBy: "admin",
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
    modifiedBy: "admin",
  });

  return (
    <>
      <Routes>
        <Route path="/editemu" element={<EditEMU />} />
      </Routes>

      <div className="containerLHB">
        <div className="content">
          <div>
            <Routes>
              <Route
                path="/UpdateEMUDivisionPreInspectionForm/*"
                element={
                  <UpdateEMUDivisionPreInspectionForm
                    formDataDivisionEMU={formDataDivisionEMU}
                    setFormDataDivisionEMU={setFormDataDivisionEMU}
                  />
                }
              />

              <Route
                path="/UpdateEMUSchedulePreInspectionForm/*"
                element={
                  <EMUSchedulePreInspection
                    formDataScheduleEMU={formDataScheduleEMU}
                    setFormDataScheduleEMU={setFormDataScheduleEMU}
                  />
                }
              />
              <Route
                path="/UpdateEMUPressOffForm/*"
                element={
                  <UpdateEMUPressOffForm
                    formDataPressOffEMU={formDataPressOffEMU}
                    setFormDataPressOffEMU={setFormDataPressOffEMU}
                  />
                }
              />
              <Route
                path="/UpdateEMUPressOn/*"
                element={
                  <UpdateEMUPressOn
                    formDataProceedSubmitEMU={formDataProceedSubmitEMU}
                    setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
                  />
                }
              />
              <Route
                path="/UpdateEMUFinalInspection/*"
                element={
                  <UpdateEMUFinalInspection
                    formDataFinalEMU={formDataFinalEMU}
                    setFormDataFinalEMU={setFormDataFinalEMU}
                  />
                }
              />
              <Route
                path="/updateproceedsubmitemufinal"
                element={
                  <ProceedSubmitEMUFinalInspection
                    formDataFinalEMU={formDataFinalEMU}
                    setFormDataFinalEMU={setFormDataFinalEMU}
                  />
                }
              />
              <Route
                path="/updateproceedsubmitemupresson"
                element={
                  <ProceedSubmitEMUPressOn
                    formDataProceedSubmitEMU={formDataProceedSubmitEMU}
                    setformDataProceedSubmitEMU={setformDataProceedSubmitEMU}
                  />
                }
              />

              <Route
                path="/updateproceedsubmitemupressoff"
                element={
                  <ProceedSubmitEMUPressOff
                    formDataPressOffEMU={formDataPressOffEMU}
                    setFormDataPressOffEMU={setFormDataPressOffEMU}
                  />
                }
              />
              <Route
                path="/updateproceedsubmitemuschedule"
                element={
                  <ProceedSubmitEMUSchedule
                    formDataScheduleEMU={formDataScheduleEMU}
                    setFormDataScheduleEMU={setFormDataScheduleEMU}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      {/* </Router> */}
    </>
  );
}

export default ParentEdit;

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import EditICF from "./EditICF";
import UpdateICFDivisionPreInspectionForm from "../UpdateFormICF/ICFDivisionPreInspectionForm/ICFDivisionPreInspectionForm";
import UpdateICFPressOffForm from "../UpdateFormICF/ICFPressOffForm/ICFPressOffForm";
import UpdateICFPressOn from "../UpdateFormICF/ICFPressOn/ICFPressOn";
import ProceedSubmitUpdatedPressOnICF from "../UpdateFormICF/ICFPressOn/ProceedSubmit";
import ProceedSubmitUpdatedPressOff from "../UpdateFormICF/ICFPressOffForm/ProceedSubmitICFPressOff";
import ProceedSubmitUpdatedFinal from "../UpdateFormICF/ICFFinalinspection/ProceedSubmit";
import ICFUpdatedSchedulePreInspection from "../UpdateFormICF/ICFSchedulePreInspection/ICFSchedulePreInspection";
import ProceedSubmit from "../ICFSchedulePreInspection/ProceedSubmit";
import ProceedSubmitUpdatedSchedulePreinspection from "../UpdateFormICF/ICFSchedulePreInspection/ProceedSubmit";
import UpdateICFfinalinspection from "../UpdateFormICF/ICFFinalinspection/ICFFinalInspection";

function ParentEditICF(
) {

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
        WheelType: "",
        Shift: "",
        GNameAside: "",
        GNameBside: "",
        RodGaugeIN: "",
        SoundTestINA: "",
        SoundTestINB: "",
        TypeOfRepair: "",
        MatungaRemark: "",
        InspectorName: "",
        InspectorTicketNo: "",
        DiscParticularA: "",
        DiscParticularB: "",
        RCDMA:"",
        RCDMB:"",
        RCMA:"",
        RCMB:"",
        createdBy: "ADMIN",
        SectionId: 1,
        DepartmentId: 2,
        WheeltypeId: 2,
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
        modifiedBy: "admin",
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
        modifiedBy: "admin",
    });

    const [formDataProceedSubmitPressOnICF, setformDataProceedSubmitPressOnICF] = useState({
        wheelid: "",
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
        createdBy: "",
        modifiedBy: "",
        SectionID: 1,
        DepartmentID: 3,
        WheeltypeID: 2,
        createdBy: "ADMIN",
        modifiedBy: "admin",
    });






    return (
        <>
            <Routes>
                <Route
                    path="/editicf"
                    element={
                        <EditICF />
                    }
                />
            </Routes>


            <div className="containerLHB">

                <div className="content">
                    <div>
                        <Routes>
                            <Route
                                path="/UpdateICFDivisionPreInspectionForm/*"
                                element={
                                    <UpdateICFDivisionPreInspectionForm
                                        formDataICFDivision={formDataICFDivision}
                                        setFormDataICFDivision={setFormDataICFDivision}
                                    />
                                }
                            />

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
                                path="/UpdateICFfinalinspection/*"
                                element={
                                    <UpdateICFfinalinspection
                                        formDataFinalICF={formDataFinalICF}
                                        setFormDataFinalICF={setFormDataFinalICF}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateICFPressOnForm/*"
                                element={
                                    <UpdateICFPressOn
                                        formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                                        setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
                                    />
                                }
                            />
                            <Route
                                path="/UpdateICFSchedulePreInspection/*"
                                element={
                                    <ICFUpdatedSchedulePreInspection
                                        formDataScheduleICF={formDataScheduleICF}
                                        setFormDataScheduleICF={setFormDataScheduleICF}
                                    />
                                }
                            />
                            <Route
                                path="/proceedsubmitupdatedscheduleicf"
                                element={
                                    <ProceedSubmitUpdatedSchedulePreinspection formDataScheduleICF={formDataScheduleICF} setFormDataScheduleICF={setFormDataScheduleICF} />
                                }
                            />
                            <Route
                                path="/proceedsubmitupdatedFinalicf"
                                element={
                                    <ProceedSubmitUpdatedFinal formDataFinalICF={formDataFinalICF} setFormDataFinalICF={setFormDataFinalICF} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitpressoff"
                                element={
                                    <ProceedSubmitUpdatedPressOff formDataPressOffICF={formDataPressOffICF} setFormDataPressOffICF={setFormDataPressOffICF} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmiticfpresson"
                                element={
                                    <ProceedSubmitUpdatedPressOnICF
                                        formDataProceedSubmitPressOnICF={formDataProceedSubmitPressOnICF}
                                        setformDataProceedSubmitPressOnICF={setformDataProceedSubmitPressOnICF}
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

export default ParentEditICF;

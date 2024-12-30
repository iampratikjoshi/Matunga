import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UpdateLHBSchedulePreInspection from "../UpdateForm/LHBSchedulePreInspection/LHBSchedulePreInspection";
import Edit from "./Edit";
import UpdateLHBDivisionPreInspectionForm from "../UpdateForm/LHBDivisionPreInspectionForm/LHBDivisionPreInspectionForm";
import UpdateLHBPressOffForm from "../UpdateForm/LHBPressOffForm/LHBPressOffForm";
import UpdateLHBPressOnForm from "../UpdateForm/LHBPressOnForm/LHBPressOnForm";
import Updatelhbfinalinspection from "../UpdateForm/LHBFinalinspection/LHBFinalInspection";
import ProceedSubmitFinal from "../UpdateForm/LHBFinalinspection/ProceedSubmit";
import ProceedSubmit from "../UpdateForm/LHBSchedulePreInspection/ProceedSubmit";
import ProceedSubmitPressOff from "../UpdateForm/LHBPressOffForm/ProceedSubmitPressOff";
import ProceedSubmitPressOn from "../UpdateForm/LHBPressOnForm/ProceedSubmitPressOn";
import UpdateEMUDivisionPreInspectionForm from "../UpdateFormEMU/EMUDivisionPreInspectionForm/EMUDivisionPreInspectionForm";
import ProceedSubmitEMUSchedule from "../UpdateFormEMU/EMUSchedulePreInspection/ProceedSubmit";
import EMUSchedulePreInspection from "../UpdateFormEMU/EMUSchedulePreInspection/EMUSchedulePreInspection";
import UpdateEMUPressOffForm from "../UpdateFormEMU/EMUPressOffForm/EMUPressOffForm";
import ProceedSubmitEMUPressOff from "../UpdateFormEMU/EMUPressOffForm/ProceedSubmitPressOff";
import UpdateEMUPressOn from "../UpdateFormEMU/EMUPressOn/EMUPressOn";
import ProceedSubmitEMUPressOn from "../UpdateFormEMU/EMUPressOn/ProceedSubmit";
import UpdateEMUFinalInspection from "../UpdateFormEMU/EMUFinalinspection/EMUFinalInspection";
import ProceedSubmitEMUFinalInspection from "../EMUFinalinspection/ProceedSubmit";


function ParentEdit(
) {

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

    //---------------------------------------------------------EMU FORMS-------------------------------------------------------------------

    const [formDataScheduleEMU, setFormDataScheduleEMU] = useState({
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
                <Route
                    path="/edit"
                    element={
                        <Edit />
                    }
                />
            </Routes>


            <div className="containerLHB">

                <div className="content">
                    <div>
                        <Routes>
                            <Route
                                path="/UpdateLHBSchedulePreInspection/*"
                                element={
                                    <UpdateLHBSchedulePreInspection
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateLHBDivisionPreInspectionForm/*"
                                element={
                                    <UpdateLHBDivisionPreInspectionForm
                                        formDataDivision={formDataDivision}
                                        setFormDataDivision={setFormDataDivision}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateLHBPressOffForm/*"
                                element={
                                    <UpdateLHBPressOffForm
                                        formDataPressOffLHB={formDataPressOffLHB}
                                        setFormDataPressOffLHB={setFormDataPressOffLHB}
                                    />
                                }
                            />

                            <Route
                                path="/Updatelhbfinalinspection/*"
                                element={
                                    <Updatelhbfinalinspection
                                        formDataFinal={formDataFinal}
                                        setFormDataFinal={setFormDataFinal}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateLHBPressOnForm/*"
                                element={
                                    <UpdateLHBPressOnForm
                                        formDataPressOnLHB={formDataPressOnLHB}
                                        setFormDataPressOnLHB={setFormDataPressOnLHB}
                                    />
                                }
                            />
                            <Route
                                path="/editproceedsubmit"
                                element={
                                    <ProceedSubmit formData={formData} setFormData={setFormData} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitFinal"
                                element={
                                    <ProceedSubmitFinal formDataFinal={formDataFinal} setFormDataFinal={setFormDataFinal} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitpressoff"
                                element={
                                    <ProceedSubmitPressOff formDataPressOffLHB={formDataPressOffLHB} setFormDataPressOffLHB={setFormDataPressOffLHB} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitlhbpresson"
                                element={
                                    <ProceedSubmitPressOn
                                        formDataPressOnLHB={formDataPressOnLHB}
                                        setFormDataPressOnLHB={setFormDataPressOnLHB}
                                    />
                                }
                            />

                            {/* --------------------------------------------------EMU FORMS ---------------------------------------------------------------------*/}


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
                                    <ProceedSubmitEMUPressOff formDataPressOffEMU={formDataPressOffEMU} setFormDataPressOffEMU={setFormDataPressOffEMU} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitemuschedule"
                                element={
                                    <ProceedSubmitEMUSchedule formDataScheduleEMU={formDataScheduleEMU} setFormDataScheduleEMU={setFormDataScheduleEMU} />
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

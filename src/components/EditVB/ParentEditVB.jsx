import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UpdateVBSchedulePreInspection from "../UpdateFormVB/VBSchedulePreInspection/VBSchedulePreInspection";
import UpdateVBDivisionPreInspectionForm from "../UpdateFormVB/VBDivisionPreInspectionForm/VBDivisionPreInspectionForm";
import UpdateVBPressOffForm from "../UpdateFormVB/VBPressOffForm/VBPressOffForm";
import UpdateVBPressOnForm from "../UpdateFormVB/VBPressOnForm/VBPressOnForm";
import UpdateVBfinalinspection from "../UpdateFormVB/VBFinalinspection/VBFinalInspection";
import ProceedSubmitFinal from "../UpdateFormVB/VBFinalinspection/ProceedSubmitFinalVB";
import Proceedsubmitvbschedule from "../UpdateFormVB/VBSchedulePreInspection/ProceedSubmitVB";
import ProceedSubmitPressOff from "../UpdateFormVB/VBPressOffForm/ProceedSubmitPressOff";
import ProceedSubmitPressOn from "../UpdateFormVB/VBPressOnForm/ProceedSubmitPressOn";



function ParentEditVB(
) {

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
        WheeltypeId: 3,
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
        WheeltypeId: 3,
        createdBy: "ADMIN",
        modifiedBy: "admin",
    });

    const [formDataFinalVB, setFormDataFinalVB] = useState({
        SectionId: 1,
        DepartmentId: 4,
        WheeltypeId: 3,
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
        WheeltypeID: 3,
        createdBy: "ADMIN",
        modifiedBy: "admin",
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
        WheeltypeId: 3,
        createdBy: "ADMIN",
        modifiedBy: "admin",
    });



    return (
        <>
            {/* <Routes>
                <Route
                    path="/editvb"
                    element={
                        <Edit />
                    }
                />
            </Routes> */}


            <div className="containerLHB">

                <div className="content">
                    <div>
                        <Routes>
                            <Route
                                path="/UpdateVBSchedulePreInspection/*"
                                element={
                                    <UpdateVBSchedulePreInspection
                                        formDataVB={formDataVB}
                                        setFormDataVB={setFormDataVB}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateVBDivisionPreInspectionForm/*"
                                element={
                                    <UpdateVBDivisionPreInspectionForm
                                        formDataDivisionVB={formDataDivisionVB}
                                        setFormDataDivisionVB={setFormDataDivisionVB}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateVBPressOffForm/*"
                                element={
                                    <UpdateVBPressOffForm
                                        formDataPressOffVB={formDataPressOffVB}
                                        setFormDataPressOffVB={setFormDataPressOffVB}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateVBfinalinspection/*"
                                element={
                                    <UpdateVBfinalinspection
                                        formDataFinalVB={formDataFinalVB}
                                        setFormDataFinalVB={setFormDataFinalVB}
                                    />
                                }
                            />

                            <Route
                                path="/UpdateVBPressOnForm/*"
                                element={
                                    <UpdateVBPressOnForm
                                        formDataPressOnVB={formDataPressOnVB}
                                        setFormDataPressOnVB={setFormDataPressOnVB}
                                    />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitvbschedule"
                                element={
                                    <Proceedsubmitvbschedule formDataVB={formDataVB} setFormDataVB={setFormDataVB} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitVBFinal"
                                element={
                                    <ProceedSubmitFinal formDataFinalVB={formDataFinalVB} setFormDataFinalVB={setFormDataFinalVB} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitVBpressoff"
                                element={
                                    <ProceedSubmitPressOff formDataPressOffVB={formDataPressOffVB} setFormDataPressOffVB={setFormDataPressOffVB} />
                                }
                            />
                            <Route
                                path="/updateproceedsubmitVBpresson"
                                element={
                                    <ProceedSubmitPressOn
                                        formDataPressOnVB={formDataPressOnVB}
                                        setFormDataPressOnVB={setFormDataPressOnVB}
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

export default ParentEditVB;

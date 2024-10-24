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
import UpdateProceedSubmit from "../UpdateForm/LHBSchedulePreInspection/ProceedSubmit"
import ProceedSubmitPressOff from "../UpdateForm/LHBPressOffForm/ProceedSubmitPressOff";
import ProceedSubmitPressOn from "../UpdateForm/LHBPressOnForm/ProceedSubmitPressOn";

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
                        </Routes>
                    </div>
                </div>
            </div>
            {/* </Router> */}
        </>
    );
}

export default ParentEdit;

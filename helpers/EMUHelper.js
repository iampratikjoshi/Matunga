const EMUScheduledPreIinspection = require("../models/EMUScheduledPreIinspection"); // Adjust the path as needed
const sequelize = require("../config/database.js");
const EMUPressOn = require("../models/EMUPressOn.js");

async function insertEMUPreInspectionData(data) {
  try {
    const newData = {
      SectionId: data.SectionId || "NULL",
      DepartmentId: data.DepartmentId || "NULL",
      WheeltypeId: data.WheeltypeId || "NULL",
      ShopSrNumber: data.ShopSrNumber || "NULL",
      AxleNumber: data.AxleNumber || "NULL",
      ReceiveDate: data.ReceiveDate || "NULL",
      AxleCondition: data.AxleCondition || "NULL",
      CoachNumber: data.CoachNumber || "NULL",
      DiameterINA: data.DiameterINA || "NULL",
      DiameterINB: data.DiameterINB || "NULL",
      BDDefect: data.BDDefect || "NULL",
      BDMakeIN: data.BDMakeIN || "NULL",
      RodGaugeIN: data.RodGaugeIN || "NULL",
      SoundTestINA: data.SoundTestINA || "NULL",
      SoundTestINB: data.SoundTestINB || "NULL",
      TypeOfRepair: data.TypeOfRepair || "NULL",
      MatungaRemark: data.MatungaRemark || "NULL",
      DiscParticularA: data.DiscParticularA || "NULL",
      DiscParticularB: data.DiscParticularB || "NULL",
      CTRBNumberA: data.CTRBNumberA || "NULL",
      CTRBNumberB: data.CTRBNumberB || "NULL",
      CTRBMakeA: data.CTRBMakeA || "NULL",
      CTRBMakeB: data.CTRBMakeB || "NULL",
      CTRBStatusA: data.CTRBStatusA || "NULL",
      CTRBStatusB: data.CTRBStatusB || "NULL",
      BDThicknessA: data.BDThicknessA || "NULL",
      BDThicknessB: data.BDThicknessB || "NULL",
      RefurbishmentDetailsA: data.RefurbishmentDetailsA || "NULL",
      RefurbishmentDetailsB: data.RefurbishmentDetailsB || "NULL",
      CTRBDefectA: data.CTRBDefectA || "NULL",
      CTRBDefectB: data.CTRBDefectB || "NULL",
      CTRBDefectNameA: data.CTRBDefectNameA || "NULL",
      CTRBDefectNameB: data.CTRBDefectNameB || "NULL",
      CTRBRemarkA: data.CTRBRemarkA || "NULL",
      CTRBRemarkB: data.CTRBRemarkB || "NULL",
      FitmentDate: data.FitmentDate || "NULL",
      CTRBRemainingLifeA: data.CTRBRemainingLifeA || "NULL",
      CTRBRemainingLifeB: data.CTRBRemainingLifeB || "NULL",
      InspectorName: data.InspectorName || "NULL",
      InspectorTicketNo: data.InspectorTicketNo || "NULL",
      createdBy: data.createdBy || "NULL",
    };

    const result = await EMUScheduledPreIinspection.create(newData);

    return result; // Return the created instance
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

async function insertEMUFinalInspectionData(data) {
  const {
    SectionId,
    DepartmentId,
    WheeltypeId,
    WheelNo,
    Shift,
    wheelid,
    AxleNo,
    WheelDiaA,
    WheelDiaB,
    WheelRG,
    WheelFLG,
    SizeA,
    SizeB,
    OvalA,
    OvalB,
    TapA,
    TapB,
    ShoulderSizeA,
    ShoulderSizeB,
    JrWaivinessA,
    JrWaivinessB,
    BDMake,
    BDSizeA,
    BDSizeB,
    EndHoleA,
    EndHoleB,
    USTName,
    FittingDt,
    MEPA,
    MEPB,
    RefurbishmentDetailsA,
    RefurbishmentDetailsB,
    CTRBNumberA,
    CTRBNumberB,
    CTRBMakeA,
    CTRBMakeB,
    CTRBStatusA,
    CTRBStatusB,
    CTRBRemainingLifeA,
    CTRBRemainingLifeB,
    DiscParticularA,
    DiscParticularB,
    InspectorTicketNo,
    InspectorName,
    WheelTreadUST,
    ECATest,
    createdBy,
  } = data;

  // Ensure nullable fields are explicitly set to null if not provided
  const safeRefurbishmentDetailsA = RefurbishmentDetailsA || null;
  const safeRefurbishmentDetailsB = RefurbishmentDetailsB || null;

  try {
    // Raw SQL query to insert data
    await sequelize.query(
      `INSERT INTO EMUFinalInspection (SectionId, DepartmentId, WheeltypeId, WheelNo, Shift,
        wheelid, AxleNo, WheelDiaA, WheelDiaB, WheelRG, WheelFLG, SizeA, SizeB, OvalA, OvalB, TapA, TapB,
        ShoulderSizeA, ShoulderSizeB, JrWaivinessA, JrWaivinessB, BDMake, BDSizeA, BDSizeB, EndHoleA,
        EndHoleB, USTName, FittingDt, MEPA, MEPB, RefurbishmentDetailsA, RefurbishmentDetailsB,
        CTRBNumberA, CTRBNumberB, CTRBMakeA, CTRBMakeB, CTRBStatusA, CTRBStatusB, CTRBRemainingLifeA,
        CTRBRemainingLifeB, DiscParticularA, DiscParticularB, ECATest, InspectorTicketNo,
        InspectorName, WheelTreadUST, createdBy
      ) VALUES (
        :SectionId, :DepartmentId, :WheeltypeId, :WheelNo, :Shift, :wheelid, :AxleNo, :WheelDiaA,
        :WheelDiaB, :WheelRG, :WheelFLG, :SizeA, :SizeB, :OvalA, :OvalB, :TapA, :TapB, :ShoulderSizeA,
        :ShoulderSizeB, :JrWaivinessA, :JrWaivinessB, :BDMake, :BDSizeA, :BDSizeB, :EndHoleA, 
        :EndHoleB, :USTName, :FittingDt, :MEPA, :MEPB, :RefurbishmentDetailsA, :RefurbishmentDetailsB,
        :CTRBNumberA, :CTRBNumberB, :CTRBMakeA, :CTRBMakeB, :CTRBStatusA, :CTRBStatusB, :CTRBRemainingLifeA,
        :CTRBRemainingLifeB, :DiscParticularA, :DiscParticularB, :ECATest, :InspectorTicketNo,
        :InspectorName, :WheelTreadUST, :createdBy
      )`,
      {
        replacements: {
          SectionId,
          DepartmentId,
          WheeltypeId,
          WheelNo,
          Shift,
          wheelid,
          AxleNo,
          WheelDiaA,
          WheelDiaB,
          WheelRG,
          WheelFLG,
          SizeA,
          SizeB,
          OvalA,
          OvalB,
          TapA,
          TapB,
          ShoulderSizeA,
          ShoulderSizeB,
          JrWaivinessA,
          JrWaivinessB,
          BDMake,
          BDSizeA,
          BDSizeB,
          EndHoleA,
          EndHoleB,
          USTName,
          FittingDt,
          MEPA,
          MEPB,
          RefurbishmentDetailsA: safeRefurbishmentDetailsA,
          RefurbishmentDetailsB: safeRefurbishmentDetailsB,
          CTRBNumberA,
          CTRBNumberB,
          CTRBMakeA,
          CTRBMakeB,
          CTRBStatusA,
          CTRBStatusB,
          CTRBRemainingLifeA,
          CTRBRemainingLifeB,
          DiscParticularA,
          DiscParticularB,
          ECATest,
          InspectorTicketNo,
          InspectorName,
          WheelTreadUST,
          createdBy,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

async function insertPressOffData(data) {
  try {
    // Raw SQL query to insert data into the EMUPressOff table
    await sequelize.query(
      `INSERT INTO EMUPressOff (
        wheelid,
        SectionID,
        DepartmentID,
        WheeltypeID,
        Date,
        OperatorTNo,
        InspectorTNo,
        ShopSNo,
        TypeOfWheel,
        WheelPressedOff,
        DiscSrNo,
        AxleNo,
        AxleCondition,
        AxleConditionReason,
        BrakeDiscCondition,
        BrakeDiscConditionReason,
        WheelDiscCondition,
        WheelConditionReason,
        WheelDiscConditionCause,
        AxleConditionCause,
        BrakeDiscConditionCause,
        InspectorName,
        OperatorName,
        MachineNumber,
        ShiftNumber,
        serviceablediscidnumber,
        Reason,
        PressedOffRemark,
        createdBy
      ) VALUES (
        :wheelid,
        :SectionID,
        :DepartmentID,
        :WheeltypeID,
        :Date,
        :OperatorTNo,
        :InspectorTNo,
        :ShopSNo,
        :TypeOfWheel,
        :WheelPressedOff,
        :DiscSrNo,
        :AxleNo,
        :AxleCondition,
        :AxleConditionReason,
        :BrakeDiscCondition,
        :BrakeDiscConditionReason,
        :WheelDiscCondition,
        :WheelConditionReason,
        :WheelDiscConditionCause,
        :BrakeDiscConditionCause,
        :AxleConditionCause,
        :InspectorName,
        :OperatorName,
        :MachineNumber,
        :ShiftNumber,
        :serviceablediscidnumber,
        :Reason,
        :PressedOffRemark,
        :createdBy
      )`,
      {
        replacements: { ...data },
        type: sequelize.QueryTypes.INSERT,
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error; // Propagate the error to be handled by the caller
  }
}

// Helper function to insert press on data
async function insertPressOnData(data) {
  try {
    // Use Sequelize to create a new record in the EMUPressOn table
    await EMUPressOn.create(data);
  } catch (error) {
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

module.exports = {
  insertEMUPreInspectionData,
  insertEMUFinalInspectionData,
  insertPressOffData,
  insertPressOnData
};

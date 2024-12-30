const sequelize = require("../config/database.js");

async function insertVBPreInspectionData(data) {
  const transaction = await sequelize.transaction();
  try {
    // Destructuring to include new fields
    const {
      WheelId,
      SectionId,
      DepartmentId,
      WheeltypeId,
      ShopSrNumber,
      AxleNumber,
      ReceiveDate,
      AxleCondition,
      CoachNumber,
      DiameterINA,
      DiameterINB,
      CTRBDefectNameA,
      CTRBDefectNameB,
      BDDefect,
      BDMakeIN,
      RodGaugeIN,
      SoundTestINA,
      SoundTestINB,
      TypeOfRepair,
      MatungaRemark,
      DiscParticularA,
      DiscParticularB,
      CTRBNumberA,
      CTRBNumberB,
      CTRBMakeA,
      CTRBMakeB,
      CTRBStatusA,
      CTRBStatusB,
      BDThicknessA,
      BDThicknessB,
      RefurbishmentDetailsA,
      RefurbishmentDetailsB,
      CTRBDefectA,
      CTRBDefectB,
      CTRBRemarkA,
      CTRBRemarkB,
      FitmentDate,
      CTRBRemainingLifeA,
      CTRBRemainingLifeB,
      InspectorName,
      InspectorTicketNo,
      createdBy,
    } = data;

    const result = await sequelize.query(
      `EXEC [dbo].[CreateVBPreInspection] 
              @SectionId = :SectionId,
               @DepartmentId = :DepartmentId,
                @WheeltypeId = :WheeltypeId, 
                @ShopSrNumber = :ShopSrNumber, 
                @AxleNumber = :AxleNumber, 
                @ReceiveDate = :ReceiveDate, 
                @AxleCondition = :AxleCondition,
                 @CoachNumber = :CoachNumber, 
                 @DiameterINA = :DiameterINA, 
                 @DiameterINB = :DiameterINB, 
                 @CTRBDefectNameA = :CTRBDefectNameA, 
                 @CTRBDefectNameB = :CTRBDefectNameB, 
                 @BDDefect = :BDDefect, 
                 @BDMakeIN = :BDMakeIN, 
                 @RodGaugeIN = :RodGaugeIN, 
                 @SoundTestINA = :SoundTestINA, 
                 @SoundTestINB = :SoundTestINB, 
                 @TypeOfRepair = :TypeOfRepair, 
                 @MatungaRemark = :MatungaRemark, 
                 @DiscParticularA = :DiscParticularA, 
                 @DiscParticularB = :DiscParticularB, 
                 @CTRBNumberA = :CTRBNumberA, 
                 @CTRBNumberB = :CTRBNumberB, 
                 @CTRBMakeA = :CTRBMakeA, 
                 @CTRBMakeB = :CTRBMakeB, 
                 @CTRBStatusA = :CTRBStatusA, 
                 @CTRBStatusB = :CTRBStatusB, 
                 @BDThicknessA = :BDThicknessA, 
                 @BDThicknessB = :BDThicknessB, 
                 @RefurbishmentDetailsA = :RefurbishmentDetailsA,
                  @RefurbishmentDetailsB = :RefurbishmentDetailsB, 
                  @CTRBDefectA = :CTRBDefectA, 
                  @CTRBDefectB = :CTRBDefectB, 
                  @CTRBRemarkA = :CTRBRemarkA, 
                  @CTRBRemarkB = :CTRBRemarkB, 
                  @FitmentDate = :FitmentDate, 
                  @CTRBRemainingLifeA = :CTRBRemainingLifeA,
                   @CTRBRemainingLifeB = :CTRBRemainingLifeB, 
                   @InspectorName = :InspectorName, 
                   @InspectorTicketNo = :InspectorTicketNo, 
                   @createdBy = :createdBy`,
      {
        replacements: {
          WheelId,
          SectionId,
          DepartmentId,
          WheeltypeId,
          ShopSrNumber,
          AxleNumber,
          ReceiveDate,
          AxleCondition,
          CoachNumber,
          DiameterINA,
          DiameterINB,
          CTRBDefectNameA,
          CTRBDefectNameB,
          BDDefect,
          BDMakeIN,
          RodGaugeIN,
          SoundTestINA,
          SoundTestINB,
          TypeOfRepair,
          MatungaRemark,
          DiscParticularA,
          DiscParticularB,
          CTRBNumberA,
          CTRBNumberB,
          CTRBMakeA,
          CTRBMakeB,
          CTRBStatusA,
          CTRBStatusB,
          BDThicknessA,
          BDThicknessB,
          RefurbishmentDetailsA,
          RefurbishmentDetailsB,
          CTRBDefectA,
          CTRBDefectB,
          CTRBRemarkA,
          CTRBRemarkB,
          FitmentDate,
          CTRBRemainingLifeA,
          CTRBRemainingLifeB,
          InspectorName,
          InspectorTicketNo,
          createdBy,
        },
        type: sequelize.QueryTypes.EXEC,
      }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();

    return result;
  } catch (error) {
    // Rollback the transaction in case of any error
    await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

async function insertVBDivisionData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
      WheelNo,
      LooryNo,
      POHDate,
      divisionreport,
      DivisionName,
      matungareport,
      createdBy,
      SectionId,
      DepartmentId,
      WheeltypeId,
      modifiedBy,
    } = data;

    const result = await sequelize.query(
      "EXEC [dbo].[CreateVBDivisionPreInspectionRecord] " +
        "@WheelNo = :WheelNo, @LooryNo = :LooryNo, @POHDate = :POHDate, @divisionreport = :divisionreport, " +
        "@DivisionName = :DivisionName, @matungareport = :matungareport, @createdBy = :createdBy, " +
        "@SectionId = :SectionId, @DepartmentId = :DepartmentId, @WheeltypeId = :WheeltypeId, " +
        "@modifiedBy = :modifiedBy",

      {
        replacements: {
          WheelNo,
          LooryNo,
          POHDate,
          divisionreport,
          DivisionName,
          matungareport,
          createdBy,
          SectionId,
          DepartmentId,
          WheeltypeId,
          modifiedBy,
        },
        transaction,
        type: sequelize.QueryTypes.RAW,
      }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();

    return result;
  } catch (error) {
    // Rollback the transaction in case of any error
    // await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

async function insertVBPressOffData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
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
      Reason,
      PressedOffRemark,
      wheelid,
      SectionID,
      DepartmentID,
      WheeltypeID,
      createdBy,
      modifiedBy,
    } = data;

    const result = await sequelize.query(
      "EXEC [dbo].[CreateVBPressOffRecord] @Date = :Date, " +
        "@OperatorTNo = :OperatorTNo, @InspectorTNo = :InspectorTNo, @ShopSNo = :ShopSNo, " +
        "@TypeOfWheel = :TypeOfWheel, @WheelPressedOff = :WheelPressedOff, @DiscSrNo = :DiscSrNo, " +
        "@AxleNo = :AxleNo, @AxleCondition = :AxleCondition, @AxleConditionReason = :AxleConditionReason, " +
        "@BrakeDiscCondition = :BrakeDiscCondition, @BrakeDiscConditionReason = :BrakeDiscConditionReason, " +
        "@WheelDiscCondition = :WheelDiscCondition, @WheelConditionReason = :WheelConditionReason, " +
        "@Reason = :Reason, @PressedOffRemark = :PressedOffRemark, " +
        "@wheelid = :wheelid, @SectionID = :SectionID, @DepartmentID = :DepartmentID, " +
        "@WheeltypeID = :WheeltypeID, @createdBy = :createdBy, @modifiedBy = :modifiedBy, " +
        "@modifiedDate = NULL",

      {
        replacements: {
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
          Reason,
          PressedOffRemark,
          wheelid,
          SectionID,
          DepartmentID,
          WheeltypeID,
          createdBy,
          modifiedBy,
        },
        transaction,
        type: sequelize.QueryTypes.RAW,
      }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();

    return result;
  } catch (error) {
    // Rollback the transaction in case of any error
    // await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

async function insertVBFinalInspectionData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
      wheelid,
      SectionId,
      DepartmentId,
      WheeltypeId,
      AxleNo,
      WheelNo,
      Shift,
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
      RefurbishmentDetailsA,
      RefurbishmentDetailsB,
      CTRBRemainingLifeA,
      CTRBRemainingLifeB,
      CTRBNumberA,
      CTRBNumberB,
      CTRBMakeA,
      CTRBMakeB,
      CTRBStatusA,
      CTRBStatusB,
      CTRBRemarkA,
      CTRBRemarkB,
      CTRBDefectA,
      CTRBDefectB,
      CTRBDefectNameA,
      CTRBDefectNameB,
      InspectorTicketNo,
      InspectorName,
      WheelTreadUST,
      MEPA,
      MEPB,
      USTName,
      FittingDt,
      ECATest,
      createdBy, // added modifiedDate
    } = data;

    // Execute stored procedure to insert data
    const result = await sequelize.query(
      `EXEC [dbo].[CreateVBFinalInspectionRecord] 
              @SectionId = :SectionId,
              @wheelid = :wheelid,
              @DepartmentId = :DepartmentId,
              @WheeltypeId = :WheeltypeId,
              @AxleNo = :AxleNo,
              @WheelNo = :WheelNo,
              @Shift = :Shift,
              @WheelDiaA = :WheelDiaA,
              @WheelDiaB = :WheelDiaB,
              @WheelRG = :WheelRG,
              @WheelFLG = :WheelFLG,
              @SizeA = :SizeA,
              @SizeB = :SizeB,
              @OvalA = :OvalA,
              @OvalB = :OvalB,
              @TapA = :TapA,
              @TapB = :TapB,
              @ShoulderSizeA = :ShoulderSizeA,
              @ShoulderSizeB = :ShoulderSizeB,
              @JrWaivinessA = :JrWaivinessA,
              @JrWaivinessB = :JrWaivinessB,
              @BDMake = :BDMake,
              @BDSizeA = :BDSizeA,
              @BDSizeB = :BDSizeB,
              @EndHoleA = :EndHoleA,
              @EndHoleB = :EndHoleB,
              @RefurbishmentDetailsA = :RefurbishmentDetailsA,
              @RefurbishmentDetailsB = :RefurbishmentDetailsB,
              @CTRBRemainingLifeA = :CTRBRemainingLifeA,
              @CTRBRemainingLifeB = :CTRBRemainingLifeB,
              @CTRBNumberA = :CTRBNumberA,
              @CTRBNumberB = :CTRBNumberB,
              @CTRBMakeA = :CTRBMakeA,
              @CTRBMakeB = :CTRBMakeB,
              @CTRBStatusA = :CTRBStatusA,
              @CTRBStatusB = :CTRBStatusB,
              @CTRBRemarkA = :CTRBRemarkA,
              @CTRBRemarkB = :CTRBRemarkB,
              @CTRBDefectA = :CTRBDefectA,
              @CTRBDefectB = :CTRBDefectB,
              @CTRBDefectNameA = :CTRBDefectNameA,
              @CTRBDefectNameB = :CTRBDefectNameB,
              @InspectorTicketNo = :InspectorTicketNo,
              @InspectorName = :InspectorName,
              @WheelTreadUST = :WheelTreadUST,
              @MEPA = :MEPA,
              @MEPB = :MEPB,
              @USTName = :USTName,
              @FittingDt = :FittingDt,
              @ECATest = :ECATest,
              @createdBy = :createdBy`,
      {
        replacements: {
          wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
          AxleNo,
          WheelNo,
          Shift,
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
          RefurbishmentDetailsA,
          RefurbishmentDetailsB,
          CTRBRemainingLifeA,
          CTRBRemainingLifeB,
          CTRBNumberA,
          CTRBNumberB,
          CTRBMakeA,
          CTRBMakeB,
          CTRBStatusA,
          CTRBStatusB,
          CTRBRemarkA,
          CTRBRemarkB,
          CTRBDefectA,
          CTRBDefectB,
          CTRBDefectNameA,
          CTRBDefectNameB,
          InspectorTicketNo,
          InspectorName,
          WheelTreadUST,
          MEPA,
          MEPB,
          USTName,
          FittingDt,
          ECATest,
          createdBy,
        },
        type: sequelize.QueryTypes.EXEC,
      }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();

    return result;
  } catch (error) {
    // Rollback the transaction in case of any error
    await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}
// Helper function to insert press on data
async function insertVBPressOnData(data) {
  const transaction = await sequelize.transaction(); // Start a transaction to ensure atomicity
  try {
    // Extract all the necessary data from the data object to pass to the stored procedure
    const {
      WheelNo,
      AxleNo,
      ATLNo,
      WheelSeatSize,
      BDSeatSize,
      RAValue,
      OperatorName,
      WheelDiscAVTLNO,
      WheelDiscABoreSizeByOperator,
      WheelDiscARAValue,
      WheelDiscAOperatorName,

      WheelDiscABWheelSeatSize,
      WheelDiscAAllow,
      WheelDiscAPressOnPressure,
      WheelDiscARDNo,
      WheelDiscAWheelDiscParticulars,
      WheelDiscATopXAxis,
      WheelDiscATopYAxis,
      WheelDiscAMiddleXAxis,
      WheelDiscAMiddleYAxis,
      WheelDiscALowerXAxis,
      WheelDiscALowerYAxis,
      WheelDiscAAvgXAxis,
      WheelDiscAAvgYAxis,
      WheelDiscBVTLNo,
      WheelDiscBBoreSizeByOperator,
      WheelDiscBRAValue,
      WheelDiscBOperatorName,

      WheelDiscBBWheelSeatSize,
      WheelDiscBAllow,
      WheelDiscBPressOnPressure,
      WheelDiscBRDNo,
      WheelDiscBWheelDiscParticulars,
      WheelDiscBTopXAxis,
      WheelDiscBTopYAxis,
      WheelDiscBMiddleXAxis,
      WheelDiscBMiddleYAxis,
      WheelDiscBLowerXAxis,
      WheelDiscBLowerYAxis,
      WheelDiscBAvgXAxis,
      WheelDiscBAvgYAxis,

      BrakeDiscABBDSeatSize,
      BrakeDiscAAllow,
      BrakeDiscAPressOnPressure,
      BrakeDiscABDThickness,
      BrakeDiscABrakeDiscParticulars,
      BrakeDiscATopXAxis,
      BrakeDiscATopYAxis,
      BrakeDiscAMiddleXAxis,
      BrakeDiscAMiddleYAxis,
      BrakeDiscALowerXAxis,
      BrakeDiscALowerYAxis,
      BrakeDiscAAvgXAxis,
      BrakeDiscAAvgYAxis,

      BrakeDiscBBBDSeatSize,
      BrakeDiscBAllow,
      BrakeDiscBPressOnPressure,
      BrakeDiscBBDThickness,
      BrakeDiscBBrakeDiscParticulars,
      BrakeDiscBTopXAxis,
      BrakeDiscBTopYAxis,
      BrakeDiscBMiddleXAxis,
      BrakeDiscBMiddleYAxis,
      BrakeDiscBLowerXAxis,
      BrakeDiscBLowerYAxis,
      BrakeDiscBAvgXAxis,
      BrakeDiscBAvgYAxis,
      MCNo,
      OperatorNameFinal,
      InspectorName,
      OperatorNo,
      InspectorNo,
      wheelid,
      SectionId,
      DepartmentId,
      WheeltypeId,
      createdBy,

      // New fields
      WheelActivities,
      AxleWheelSeatSize,
      WheelDiscBoreSize,
      WheelDiscStampingParticulars,
      PressOnNumber,
      WheelActivityBDThickness,
      WheelActivityBDMake,
    } = data;

    const result = await sequelize.query(
      "EXEC [dbo].[CreateVBPressOnRecord] " +
        "@WheelNo = :WheelNo, @AxleNo = :AxleNo, @ATLNo = :ATLNo, @WheelSeatSize = :WheelSeatSize, " +
        "@BDSeatSize = :BDSeatSize, @RAValue = :RAValue, @OperatorName = :OperatorName, @WheelDiscAVTLNO = :WheelDiscAVTLNO, " +
        "@WheelDiscABoreSizeByOperator = :WheelDiscABoreSizeByOperator, @WheelDiscARAValue = :WheelDiscARAValue, @WheelDiscAOperatorName = :WheelDiscAOperatorName, " +
        "@WheelDiscABWheelSeatSize = :WheelDiscABWheelSeatSize, @WheelDiscAAllow = :WheelDiscAAllow, " +
        "@WheelDiscAPressOnPressure = :WheelDiscAPressOnPressure, @WheelDiscARDNo = :WheelDiscARDNo, @WheelDiscAWheelDiscParticulars = :WheelDiscAWheelDiscParticulars, " +
        "@WheelDiscATopXAxis = :WheelDiscATopXAxis, @WheelDiscATopYAxis = :WheelDiscATopYAxis, @WheelDiscAMiddleXAxis = :WheelDiscAMiddleXAxis, " +
        "@WheelDiscAMiddleYAxis = :WheelDiscAMiddleYAxis, @WheelDiscALowerXAxis = :WheelDiscALowerXAxis, @WheelDiscALowerYAxis = :WheelDiscALowerYAxis, " +
        "@WheelDiscAAvgXAxis = :WheelDiscAAvgXAxis, @WheelDiscAAvgYAxis = :WheelDiscAAvgYAxis, @WheelDiscBVTLNo = :WheelDiscBVTLNo, " +
        "@WheelDiscBBoreSizeByOperator = :WheelDiscBBoreSizeByOperator, @WheelDiscBRAValue = :WheelDiscBRAValue, @WheelDiscBOperatorName = :WheelDiscBOperatorName, " +
        "@WheelDiscBBWheelSeatSize = :WheelDiscBBWheelSeatSize, @WheelDiscBAllow = :WheelDiscBAllow, " +
        "@WheelDiscBPressOnPressure = :WheelDiscBPressOnPressure, @WheelDiscBRDNo = :WheelDiscBRDNo, @WheelDiscBWheelDiscParticulars = :WheelDiscBWheelDiscParticulars, " +
        "@WheelDiscBTopXAxis = :WheelDiscBTopXAxis, @WheelDiscBTopYAxis = :WheelDiscBTopYAxis, @WheelDiscBMiddleXAxis = :WheelDiscBMiddleXAxis, " +
        "@WheelDiscBMiddleYAxis = :WheelDiscBMiddleYAxis, @WheelDiscBLowerXAxis = :WheelDiscBLowerXAxis, @WheelDiscBLowerYAxis = :WheelDiscBLowerYAxis, " +
        "@WheelDiscBAvgXAxis = :WheelDiscBAvgXAxis, @WheelDiscBAvgYAxis = :WheelDiscBAvgYAxis, " +
        "@BrakeDiscABBDSeatSize = :BrakeDiscABBDSeatSize, @BrakeDiscAAllow = :BrakeDiscAAllow, @BrakeDiscAPressOnPressure = :BrakeDiscAPressOnPressure, " +
        "@BrakeDiscABDThickness = :BrakeDiscABDThickness, @BrakeDiscABrakeDiscParticulars = :BrakeDiscABrakeDiscParticulars, @BrakeDiscATopXAxis = :BrakeDiscATopXAxis, " +
        "@BrakeDiscATopYAxis = :BrakeDiscATopYAxis, @BrakeDiscAMiddleXAxis = :BrakeDiscAMiddleXAxis, @BrakeDiscAMiddleYAxis = :BrakeDiscAMiddleYAxis, " +
        "@BrakeDiscALowerXAxis = :BrakeDiscALowerXAxis, @BrakeDiscALowerYAxis = :BrakeDiscALowerYAxis, @BrakeDiscAAvgXAxis = :BrakeDiscAAvgXAxis, " +
        "@BrakeDiscAAvgYAxis = :BrakeDiscAAvgYAxis, @BrakeDiscBBBDSeatSize = :BrakeDiscBBBDSeatSize, " +
        "@BrakeDiscBAllow = :BrakeDiscBAllow, @BrakeDiscBPressOnPressure = :BrakeDiscBPressOnPressure, @BrakeDiscBBDThickness = :BrakeDiscBBDThickness, " +
        "@BrakeDiscBBrakeDiscParticulars = :BrakeDiscBBrakeDiscParticulars, @BrakeDiscBTopXAxis = :BrakeDiscBTopXAxis, @BrakeDiscBTopYAxis = :BrakeDiscBTopYAxis, " +
        "@BrakeDiscBMiddleXAxis = :BrakeDiscBMiddleXAxis, @BrakeDiscBMiddleYAxis = :BrakeDiscBMiddleYAxis, @BrakeDiscBLowerXAxis = :BrakeDiscBLowerXAxis, " +
        "@BrakeDiscBLowerYAxis = :BrakeDiscBLowerYAxis, @BrakeDiscBAvgXAxis = :BrakeDiscBAvgXAxis, @BrakeDiscBAvgYAxis = :BrakeDiscBAvgYAxis, " +
        "@MCNo = :MCNo, @OperatorNameFinal = :OperatorNameFinal, @InspectorName = :InspectorName, @OperatorNo = :OperatorNo, @InspectorNo = :InspectorNo, " +
        "@wheelid = :wheelid, @SectionId = :SectionId, @DepartmentId = :DepartmentId, @WheeltypeId = :WheeltypeId, @createdBy = :createdBy, " +
        "@WheelActivities = :WheelActivities, @AxleWheelSeatSize = :AxleWheelSeatSize, @WheelDiscBoreSize = :WheelDiscBoreSize, " +
        "@WheelDiscStampingParticulars = :WheelDiscStampingParticulars, @PressOnNumber = :PressOnNumber, " +
        "@WheelActivityBDThickness = :WheelActivityBDThickness, @WheelActivityBDMake = :WheelActivityBDMake",
      {
        replacements: {
          WheelNo,
          AxleNo,
          ATLNo,
          WheelSeatSize,
          BDSeatSize,
          RAValue,
          OperatorName,
          WheelDiscAVTLNO,
          WheelDiscABoreSizeByOperator,
          WheelDiscARAValue,
          WheelDiscAOperatorName,
          WheelDiscABWheelSeatSize,
          WheelDiscAAllow,
          WheelDiscAPressOnPressure,
          WheelDiscARDNo,
          WheelDiscAWheelDiscParticulars,
          WheelDiscATopXAxis,
          WheelDiscATopYAxis,
          WheelDiscAMiddleXAxis,
          WheelDiscAMiddleYAxis,
          WheelDiscALowerXAxis,
          WheelDiscALowerYAxis,
          WheelDiscAAvgXAxis,
          WheelDiscAAvgYAxis,
          WheelDiscBVTLNo,
          WheelDiscBBoreSizeByOperator,
          WheelDiscBRAValue,
          WheelDiscBOperatorName,
          WheelDiscBBWheelSeatSize,
          WheelDiscBAllow,
          WheelDiscBPressOnPressure,
          WheelDiscBRDNo,
          WheelDiscBWheelDiscParticulars,
          WheelDiscBTopXAxis,
          WheelDiscBTopYAxis,
          WheelDiscBMiddleXAxis,
          WheelDiscBMiddleYAxis,
          WheelDiscBLowerXAxis,
          WheelDiscBLowerYAxis,
          WheelDiscBAvgXAxis,
          WheelDiscBAvgYAxis,
          BrakeDiscABBDSeatSize,
          BrakeDiscAAllow,
          BrakeDiscAPressOnPressure,
          BrakeDiscABDThickness,
          BrakeDiscABrakeDiscParticulars,
          BrakeDiscATopXAxis,
          BrakeDiscATopYAxis,
          BrakeDiscAMiddleXAxis,
          BrakeDiscAMiddleYAxis,
          BrakeDiscALowerXAxis,
          BrakeDiscALowerYAxis,
          BrakeDiscAAvgXAxis,
          BrakeDiscAAvgYAxis,
          BrakeDiscBBBDSeatSize,
          BrakeDiscBAllow,
          BrakeDiscBPressOnPressure,
          BrakeDiscBBDThickness,
          BrakeDiscBBrakeDiscParticulars,
          BrakeDiscBTopXAxis,
          BrakeDiscBTopYAxis,
          BrakeDiscBMiddleXAxis,
          BrakeDiscBMiddleYAxis,
          BrakeDiscBLowerXAxis,
          BrakeDiscBLowerYAxis,
          BrakeDiscBAvgXAxis,
          BrakeDiscBAvgYAxis,
          MCNo,
          OperatorNameFinal,
          InspectorName,
          OperatorNo,
          InspectorNo,
          wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
          createdBy,
          WheelActivities,
          AxleWheelSeatSize,
          WheelDiscBoreSize,
          WheelDiscStampingParticulars,
          PressOnNumber,
          WheelActivityBDThickness: WheelActivityBDThickness || null,
          WheelActivityBDMake: WheelActivityBDMake || null,
        },
        transaction,
        type: sequelize.QueryTypes.RAW,
      }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();

    return result;
  } catch (error) {
    // Rollback the transaction in case of any error
    await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

module.exports = {
  insertVBDivisionData,
  insertVBPreInspectionData,
  insertVBFinalInspectionData,
  insertVBPressOffData,
  insertVBPressOnData,
};

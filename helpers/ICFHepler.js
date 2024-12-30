const sequelize = require("../config/database.js");

async function insertDivisionData(data) {
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
      "EXEC [dbo].[CreateICFDivisionPreInspectionRecord] " +
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
    await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

async function insertICFPreInspectionData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
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
      BrgCodeA,
      BrgCodeB,
      BrgYearA,
      BrgYearB,
      BrgMakeA,
      BrgMakeB,
      FitmentDate,
      BrgFitmentA,
      BrgFitmentB,
      BrgServiceA,
      BrgServiceB,
      MTNBrgSideA,
      MTNBrgSideB,
      WheelType,
      Shift,
      GNameAside,
      GNameBside,
      RodGaugeIN,
      SoundTestINA,
      SoundTestINB,
      TypeOfRepair,
      MatungaRemark,
      InspectorName,
      InspectorTicketNo,
      DiscParticularA,
      DiscParticularB,
      createdBy,
      modifiedBy,
      RCDMA,
      RCDMB,
      RCMA,
      RCMB
    } = data;

    const result = await sequelize.query(
      "EXEC [dbo].[CreateICFPreInspectionRecord]" +
        "@SectionId = :SectionId,@DepartmentId = :DepartmentId, @WheeltypeId = :WheeltypeId, @ShopSrNumber = :ShopSrNumber, " +
        "@AxleNumber = :AxleNumber, @ReceiveDate = :ReceiveDate, @AxleCondition = :AxleCondition, " +
        "@CoachNumber = :CoachNumber, @DiameterINA = :DiameterINA, @DiameterINB = :DiameterINB, " +
        "@BrgCodeA = :BrgCodeA, @BrgCodeB = :BrgCodeB, @BrgYearA = :BrgYearA, @BrgYearB = :BrgYearB, " +
        "@BrgMakeA = :BrgMakeA, @BrgMakeB = :BrgMakeB, @FitmentDate = :FitmentDate, @BrgFitmentA = :BrgFitmentA, " +
        "@BrgFitmentB = :BrgFitmentB, @BrgServiceA = :BrgServiceA, @BrgServiceB = :BrgServiceB, " +
        "@MTNBrgSideA = :MTNBrgSideA, @MTNBrgSideB = :MTNBrgSideB, @WheelType = :WheelType, @Shift = :Shift, " +
        "@GNameAside = :GNameAside, @GNameBside = :GNameBside, @RodGaugeIN = :RodGaugeIN, " +
        "@SoundTestINA = :SoundTestINA, @SoundTestINB = :SoundTestINB, @TypeOfRepair = :TypeOfRepair, " +
        "@MatungaRemark = :MatungaRemark, @InspectorName = :InspectorName, @InspectorTicketNo = :InspectorTicketNo, " +
        "@DiscParticularA = :DiscParticularA, @DiscParticularB = :DiscParticularB, @createdBy = :createdBy, " +
        "@modifiedBy = :modifiedBy, @RCDMA = :RCDMA, @RCDMB = :RCDMB, @RCMA = :RCMA, @RCMB = :RCMB", // Add new fields to the query
      {
        replacements: {
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
          BrgCodeA,
          BrgCodeB,
          BrgYearA,
          BrgYearB,
          BrgMakeA,
          BrgMakeB,
          FitmentDate,
          BrgFitmentA,
          BrgFitmentB,
          BrgServiceA,
          BrgServiceB,
          MTNBrgSideA,
          MTNBrgSideB,
          WheelType,
          Shift,
          GNameAside,
          GNameBside,
          RodGaugeIN,
          SoundTestINA,
          SoundTestINB,
          TypeOfRepair,
          MatungaRemark,
          InspectorName,
          InspectorTicketNo,
          DiscParticularA,
          DiscParticularB,
          createdBy,
          modifiedBy: modifiedBy || null,
          RCDMA,
          RCDMB,
          RCMA,
          RCMB
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

async function insertPressOnDataICF(data) {
  const transaction = await sequelize.transaction(); // Start a transaction to ensure atomicity
  try {
    // Extract all the necessary data from the data object to pass to the stored procedure
    const {
      wheelid,
      SectionId,
      DepartmentId,
      WheeltypeId,
      WheelNo,
      WheelType,
      AxleNo,
      ATLNo,
      AWheelSide,
      BWheelSide,
      ARASide,
      BRASide,
      OperatorNamePrimary,
      VTLNo,
      BoreSize,
      RAValue,
      OperatorNameA,
      TopX,
      TopY,
      MiddleX,
      MiddleY,
      LowerX,
      LowerY,
      AvgX,
      AvgY,
      BWheelSeatSize,
      CBAIntAllow,
      PressureInTon,
      RDNo,
      WheelDiscAParticulars,
      VTLNoB,
      BoreSizeB,
      RAValueB,
      OperatorNameB,
      BTopX,
      BTopY,
      BMiddleX,
      BMiddleY,
      BLowerX,
      BLowerY,
      BAvgX,
      BAvgY,
      BWheelSeatSizeB,
      CBAIntAllowB,
      PressureInTonB,
      RDNoB,
      WheelDiscAParticularsB,
      MCNo,
      OperatorNameFinal,
      InspectorNameFinal,
      createdBy,
      modifiedBy,
      isActive = 1,
      AxleWheelSeatSize,
      WheelDiscBoreSize,
      wheelDiscStampingParticulars,
      PressOnNumber,
      InspectorNameActivities,
      TicketNo,
      OperatorNo,
      WheelActivities,
    } = data;

    await sequelize.query(
      "EXEC [dbo].[CreateICFPressOnRecord] @wheelid = :wheelid, " +
        "@SectionId = :SectionId, @DepartmentId = :DepartmentId, @WheeltypeId = :WheeltypeId, " +
        "@WheelType = :WheelType, @WheelNo = :WheelNo, @AxleNo = :AxleNo, @ATLNo = :ATLNo, " +
        "@AWheelSide = :AWheelSide, @BWheelSide = :BWheelSide, @ARASide = :ARASide, @BRASide = :BRASide, " +
        "@OperatorNamePrimary = :OperatorNamePrimary, @VTLNo = :VTLNo, @BoreSize = :BoreSize, @RAValue = :RAValue, @OperatorNameA = :OperatorNameA," +
        "@TopX = :TopX, @TopY = :TopY, @MiddleX = :MiddleX, @MiddleY = :MiddleY, " +
        "@LowerX = :LowerX, @LowerY = :LowerY, @AvgX = :AvgX, @AvgY = :AvgY, " +
        "@BWheelSeatSize = :BWheelSeatSize, @CBAIntAllow = :CBAIntAllow, @PressureInTon = :PressureInTon, " +
        "@RDNo = :RDNo, @WheelDiscAParticulars = :WheelDiscAParticulars, @VTLNoB = :VTLNoB, @BoreSizeB = :BoreSizeB, " +
        "@RAValueB = :RAValueB, @OperatorNameB = :OperatorNameB, @BTopX = :BTopX, @BTopY = :BTopY, " +
        "@BMiddleX = :BMiddleX, @BMiddleY = :BMiddleY, @BLowerX = :BLowerX, @BLowerY = :BLowerY, " +
        "@BAvgX = :BAvgX, @BAvgY = :BAvgY, @BWheelSeatSizeB = :BWheelSeatSizeB, @CBAIntAllowB = :CBAIntAllowB, " +
        "@PressureInTonB = :PressureInTonB, @RDNoB = :RDNoB, @WheelDiscAParticularsB = :WheelDiscAParticularsB, " +
        "@MCNo = :MCNo, @OperatorNameFinal = :OperatorNameFinal, @InspectorNameFinal = :InspectorNameFinal," +
        "@createdBy = :createdBy, @modifiedBy = :modifiedBy, @modifiedDate = NULL, " +
        "@AxleWheelSeatSize = :AxleWheelSeatSize, @WheelDiscBoreSize = :WheelDiscBoreSize, " +
        "@wheelDiscStampingParticulars = :wheelDiscStampingParticulars, @PressOnNumber = :PressOnNumber, " +
        "@InspectorNameActivities = :InspectorNameActivities, @TicketNo = :TicketNo, @OperatorNo = :OperatorNo," +
        "@WheelActivities = :WheelActivities", // Add WheelActivities here
      {
        replacements: {
          wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
          WheelNo,
          WheelType,
          AxleNo,
          ATLNo,
          AWheelSide,
          BWheelSide,
          ARASide,
          BRASide,
          OperatorNamePrimary,
          VTLNo,
          BoreSize,
          RAValue,
          OperatorNameA,
          TopX,
          TopY,
          MiddleX,
          MiddleY,
          LowerX,
          LowerY,
          AvgX,
          AvgY,
          BWheelSeatSize,
          CBAIntAllow,
          PressureInTon,
          RDNo,
          WheelDiscAParticulars,
          VTLNoB,
          BoreSizeB,
          RAValueB,
          OperatorNameB,
          BTopX,
          BTopY,
          BMiddleX,
          BMiddleY,
          BLowerX,
          BLowerY,
          BAvgX,
          BAvgY,
          BWheelSeatSizeB,
          CBAIntAllowB,
          PressureInTonB,
          RDNoB,
          WheelDiscAParticularsB,
          MCNo,
          OperatorNameFinal,
          InspectorNameFinal,
          createdBy,
          modifiedBy,
          AxleWheelSeatSize: AxleWheelSeatSize || null,
          WheelDiscBoreSize: WheelDiscBoreSize || null,
          wheelDiscStampingParticulars: wheelDiscStampingParticulars || null,
          PressOnNumber: PressOnNumber || null,
          InspectorNameActivities: InspectorNameActivities || null,
          TicketNo: TicketNo || null,
          OperatorNo: OperatorNo || null,
          WheelActivities,
        },
        transaction,
        type: sequelize.QueryTypes.RAW,
      }
    );

    // Commit the transaction if everything is successful
    await transaction.commit();
  } catch (error) {
    // Rollback the transaction in case of any error
    await transaction.rollback();
    console.error("Error inserting data:", error);
    throw new Error("Error inserting data: " + error.message);
  }
}

async function insertICFPressOffData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
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
      createdBy,
    } = data;

    const result = await sequelize.query(
      "EXEC [dbo].[CreateICFPressOff] " +
        "@wheelid = :wheelid, @SectionID = :SectionID, @DepartmentID = :DepartmentID, @WheeltypeID = :WheeltypeID, " +
        "@Date = :Date, @OperatorTNo = :OperatorTNo, @InspectorTNo = :InspectorTNo, @ShopSNo = :ShopSNo, " +
        "@TypeOfWheel = :TypeOfWheel, @WheelPressedOff = :WheelPressedOff, @DiscSrNo = :DiscSrNo, @AxleNo = :AxleNo, " +
        "@AxleCondition = :AxleCondition, @AxleConditionReason = :AxleConditionReason, " +
        "@BrakeDiscCondition = :BrakeDiscCondition, @BrakeDiscConditionReason = :BrakeDiscConditionReason, " +
        "@WheelDiscCondition = :WheelDiscCondition, @WheelConditionReason = :WheelConditionReason, " +
        "@WheelDiscConditionCause = :WheelDiscConditionCause, @AxleConditionCause = :AxleConditionCause, " +
        "@BrakeDiscConditionCause = :BrakeDiscConditionCause, @InspectorName = :InspectorName, " +
        "@OperatorName = :OperatorName, @MachineNumber = :MachineNumber, @ShiftNumber = :ShiftNumber, " +
        "@serviceablediscidnumber = :serviceablediscidnumber, @Reason = :Reason, @PressedOffRemark = :PressedOffRemark, " +
        "@createdBy = :createdBy",

      {
        replacements: {
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
          createdBy,
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

async function insertICFFinalInspectionData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
      wheelid,
      WheelNo,
      TypeOfWheel,
      SectionId,
      DepartmentId,
      WheeltypeId,
      AxleNo,
      ParticularAX1,
      ParticularAX2,
      ParticularAX3,
      ParticularAY1,
      ParticularAY2,
      ParticularAY3,
      TaperXA,
      TaperYA,
      ShoulderSizeA,
      OvalityA,
      ParticularBX1,
      ParticularBX2,
      ParticularBX3,
      ParticularBY1,
      ParticularBY2,
      ParticularBY3,
      TaperXB,
      TaperYB,
      ShoulderSizeB,
      OvalityB,
      WearTear,
      Bend,
      AxleEndHole,
      BrgCodeA,
      BrgYearA,
      MTNBrgNoA,
      BrgMakeA,
      RadialClearanceDismountedA,
      RadialClearanceMountedA,
      BrgInitialFitmentMonthA,
      BrgServiceInMonthA,
      BrgCodeB,
      BrgYearB,
      MTNBrgNoB,
      BrgMakeB,
      RadialClearanceDismountedB,
      RadialClearanceMountedB,
      BrgInitialFitmentMonthB,
      BrgServiceInMonthB,
      FitmentDate,
      Shift,
      GangNameA,
      GangNameB,
      InspectorName,
      createdBy,
      modifiedBy, // Default to null if not provided
      modifiedDate, // Default to null if not provided
    } = data;

    // Execute stored procedure to insert data
    const result = await sequelize.query(
      "EXEC [dbo].[CreateICFFinalInspectionRecord] " +
        "@wheelid = :wheelid, @WheelNo = :WheelNo, @TypeOfWheel = :TypeOfWheel, " +
        "@SectionId = :SectionId, @DepartmentId = :DepartmentId, @WheeltypeId = :WheeltypeId, " +
        "@AxleNo = :AxleNo, " +
        "@ParticularAX1 = :ParticularAX1, @ParticularAX2 = :ParticularAX2, @ParticularAX3 = :ParticularAX3, " +
        "@ParticularAY1 = :ParticularAY1, @ParticularAY2 = :ParticularAY2, @ParticularAY3 = :ParticularAY3, " +
        "@TaperXA = :TaperXA, @TaperYA = :TaperYA, @ShoulderSizeA = :ShoulderSizeA, @OvalityA = :OvalityA, " +
        "@ParticularBX1 = :ParticularBX1, @ParticularBX2 = :ParticularBX2, @ParticularBX3 = :ParticularBX3, " +
        "@ParticularBY1 = :ParticularBY1, @ParticularBY2 = :ParticularBY2, @ParticularBY3 = :ParticularBY3, " +
        "@TaperXB = :TaperXB, @TaperYB = :TaperYB, @ShoulderSizeB = :ShoulderSizeB, @OvalityB = :OvalityB, " +
        "@WearTear = :WearTear, @Bend = :Bend, @AxleEndHole = :AxleEndHole, " +
        "@BrgCodeA = :BrgCodeA, @BrgYearA = :BrgYearA, @MTNBrgNoA = :MTNBrgNoA, @BrgMakeA = :BrgMakeA, " +
        "@RadialClearanceDismountedA = :RadialClearanceDismountedA, @RadialClearanceMountedA = :RadialClearanceMountedA, " +
        "@BrgInitialFitmentMonthA = :BrgInitialFitmentMonthA, @BrgServiceInMonthA = :BrgServiceInMonthA, " +
        "@BrgCodeB = :BrgCodeB, @BrgYearB = :BrgYearB, @MTNBrgNoB = :MTNBrgNoB, @BrgMakeB = :BrgMakeB, " +
        "@RadialClearanceDismountedB = :RadialClearanceDismountedB, @RadialClearanceMountedB = :RadialClearanceMountedB, " +
        "@BrgInitialFitmentMonthB = :BrgInitialFitmentMonthB, @BrgServiceInMonthB = :BrgServiceInMonthB, " +
        "@FitmentDate = :FitmentDate, @Shift = :Shift, @GangNameA = :GangNameA, @GangNameB = :GangNameB, " +
        "@InspectorName = :InspectorName, @createdBy = :createdBy, @modifiedBy = :modifiedBy, @modifiedDate = :modifiedDate",
      {
        replacements: {
          wheelid,
          WheelNo,
          TypeOfWheel,
          SectionId,
          DepartmentId,
          WheeltypeId,
          AxleNo,
          ParticularAX1,
          ParticularAX2,
          ParticularAX3,
          ParticularAY1,
          ParticularAY2,
          ParticularAY3,
          TaperXA,
          TaperYA,
          ShoulderSizeA,
          OvalityA,
          ParticularBX1,
          ParticularBX2,
          ParticularBX3,
          ParticularBY1,
          ParticularBY2,
          ParticularBY3,
          TaperXB,
          TaperYB,
          ShoulderSizeB,
          OvalityB,
          WearTear,
          Bend,
          AxleEndHole,
          BrgCodeA,
          BrgYearA,
          MTNBrgNoA,
          BrgMakeA,
          RadialClearanceDismountedA,
          RadialClearanceMountedA,
          BrgInitialFitmentMonthA,
          BrgServiceInMonthA,
          BrgCodeB,
          BrgYearB,
          MTNBrgNoB,
          BrgMakeB,
          RadialClearanceDismountedB,
          RadialClearanceMountedB,
          BrgInitialFitmentMonthB,
          BrgServiceInMonthB,
          FitmentDate,
          Shift,
          GangNameA,
          GangNameB,
          InspectorName,
          createdBy,
          modifiedBy: modifiedBy || null, // Default to null if not provided
          modifiedDate: modifiedDate || null, // Default to null if not provided
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

async function insertICFWearingClearanceData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
      Wheelid,
      SectionId,
      DepartmentId,
      WheeltypeId,
      WheelNo,
      AxleNo,
      WearingCodeNo,
      MatungaWNo,
      V,
      Make,
      DMA,
      MA,
      InitialFittings,
      WearingService,
      TagStatus,
      FrontCover,
      WheelType,
      WheelDiameter,
      AxleYear,
      StaffTNo,
      InspName,
      InspTicket,
      createdBy,
      modifiedBy,
      modifiedDate,
    } = data;

    // Call the stored procedure with the provided data
    const result = await sequelize.query(
      "EXEC [dbo].[CreateICFWearingClearanceRecord] " +
        "@Wheelid = :Wheelid, @SectionId = :SectionId, @DepartmentId = :DepartmentId, " +
        "@WheeltypeId = :WheeltypeId, @WheelNo = :WheelNo, @AxleNo = :AxleNo, " +
        "@WearingCodeNo = :WearingCodeNo, @MatungaWNo = :MatungaWNo, " +
        "@V = :V, @Make = :Make, @DMA = :DMA, @MA = :MA, @InitialFittings = :InitialFittings, " +
        "@WearingService = :WearingService, @TagStatus = :TagStatus, @FrontCover = :FrontCover, " +
        "@WheelType = :WheelType, @WheelDiameter = :WheelDiameter, @AxleYear = :AxleYear, " +
        "@StaffTNo = :StaffTNo, @InspName = :InspName, @InspTicket = :InspTicket, " + // Corrected this line
        "@createdBy = :createdBy, @modifiedBy = :modifiedBy, @modifiedDate = :modifiedDate",
      {
        replacements: {
          Wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
          WheelNo,
          AxleNo,
          WearingCodeNo,
          MatungaWNo,
          V,
          Make,
          DMA,
          MA,
          InitialFittings,
          WearingService,
          TagStatus,
          FrontCover,
          WheelType,
          WheelDiameter,
          AxleYear,
          StaffTNo,
          InspName,
          InspTicket,
          createdBy,
          modifiedBy,
          modifiedDate: modifiedDate || null, // Handle the case where modifiedDate may be null
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

async function insertICFBearingRejectionData(data) {
  const transaction = await sequelize.transaction();
  try {
    const {
      Wheelid,
      SectionId,
      DepartmentId,
      WheeltypeId,
      BearingNo,
      Make,
      CodeorYearofMFG,
      DateofRejection,
      DateLastInspection,
      DateOfInitialFitment,
      LifeOfBearing,
      CauseOfRejection,
      createdBy,
      modifiedBy,
      modifiedDate,
    } = data;

    const result = await sequelize.query(
      "EXEC [dbo].[CreateICFBearingRejectionRecord] " +
        "@Wheelid = :Wheelid, @SectionId = :SectionId, @DepartmentId = :DepartmentId, @WheeltypeId = :WheeltypeId, " +
        "@BearingNo = :BearingNo, @Make = :Make, @CodeorYearofMFG = :CodeorYearofMFG, @DateofRejection = :DateofRejection, " +
        "@DateLastInspection = :DateLastInspection, @DateOfInitialFitment = :DateOfInitialFitment, " +
        "@LifeOfBearing = :LifeOfBearing, @CauseOfRejection = :CauseOfRejection, " +
        "@createdBy = :createdBy, @modifiedBy = :modifiedBy, @modifiedDate = :modifiedDate",
      {
        replacements: {
          Wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
          BearingNo,
          Make,
          CodeorYearofMFG,
          DateofRejection,
          DateLastInspection,
          DateOfInitialFitment,
          LifeOfBearing,
          CauseOfRejection,
          createdBy,
          modifiedBy,
          modifiedDate: modifiedDate || null,
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
  insertDivisionData,
  insertPressOnDataICF,
  insertICFPreInspectionData,
  insertICFPressOffData,
  insertICFFinalInspectionData,
  insertICFWearingClearanceData,
  insertICFBearingRejectionData,
};

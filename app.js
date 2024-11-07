const https = require("https");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database.js"); // Sequelize instance
require("dotenv").config();
// Import models
const LHBFinalInspection = require("./models/LHBFinalInspection");
const LHBScheduledPreIinspection = require("./models/LHBScheduledPreIinspection");
const LHBDivisionPreInspection = require("./models/LHBDivisionPreInspection");
const User = require("./models/User");
const LHBPressON = require("./models/LHBPressOn");
const LHBPressOff = require("./models/LHBPressOff");
const SummaryReport = require("./models/SummaryReport");
const WheelsDispatchRecord = require("./models/WheelsDispatchRecord");
const { QueryTypes } = require("sequelize");

// Initialize Express
const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173", // Replace with your React app's origin
//     methods: ["GET", "POST", "PUT", "DELETE"], // Specify the HTTP methods you want to allow
//     credentials: true, // Enable this if your request needs to send cookies or HTTP authentication
//   })
// );

// -----------------------------LHB-DIVISION Update and Delete Api -----------------------------------------------------------

app.delete("/division/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBDivisionPreInspection.findOne({
      where: { wheelid },
    });

    // If no record found, return a 404 response
    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    // Delete the record
    await wheelRecord.destroy();

    // Send a success message
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/division/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBDivisionPreInspection.findOne({
      where: { wheelid },
    });

    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    console.log("updatedData", updatedData);
    console.log("wheelid", wheelid);

    // Update the record with the new data
    await wheelRecord.update(updatedData);

    res.json({
      message: "Record updated successfully",
      updatedRecord: wheelRecord,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/division/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBDivisionPreInspection.findAll({
      where: {
        wheelid: Wheelid, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------LHB-FinalInspection Update Api -----------------------------------------------------------

app.delete("/finalinspection/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBFinalInspection.findOne({
      where: { wheelid },
    });

    // If no record found, return a 404 response
    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    // Delete the record
    await wheelRecord.destroy();

    // Send a success message
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/finalinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBFinalInspection.findOne({
      where: { wheelid },
    });

    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    console.log("updatedData", updatedData);
    console.log("wheelid", wheelid);

    // Update the record with the new data
    await wheelRecord.update(updatedData);

    res.json({
      message: "Record updated successfully",
      updatedRecord: wheelRecord,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/finalinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBFinalInspection.findAll({
      where: {
        wheelid: Wheelid, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------LHB-PressOff Update Api -----------------------------------------------------------

app.delete("/pressoff/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBPressOff.findOne({
      where: { wheelid },
    });

    // If no record found, return a 404 response
    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    // Delete the record
    await wheelRecord.destroy();

    // Send a success message
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/pressoff/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBPressOff.findOne({
      where: { wheelid },
    });

    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    console.log("updatedData", updatedData);
    console.log("wheelid", wheelid);

    // Update the record with the new data
    await wheelRecord.update(updatedData);

    res.json({
      message: "Record updated successfully",
      updatedRecord: wheelRecord,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/pressoff/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBPressOff.findAll({
      where: {
        wheelid: Wheelid, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------LHB-PressOn Update Api -----------------------------------------------------------

app.delete("/presson/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBPressON.findOne({
      where: { wheelid },
    });

    // If no record found, return a 404 response
    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    // Delete the record
    await wheelRecord.destroy();

    // Send a success message
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/presson/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBPressON.findOne({
      where: { wheelid },
    });

    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    console.log("updatedData", updatedData);
    console.log("wheelid", wheelid);

    // Update the record with the new data
    await wheelRecord.update(updatedData);

    res.json({
      message: "Record updated successfully",
      updatedRecord: wheelRecord,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/presson/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBPressON.findAll({
      where: {
        wheelid: Wheelid, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------LHB-ScheduledPreInspection Update Api -----------------------------------------------------------

app.delete("/schedule/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBScheduledPreIinspection.findOne({
      where: { wheelid },
    });

    // If no record found, return a 404 response
    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    // Delete the record
    await wheelRecord.destroy();

    // Send a success message
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/prelhb/getdata/shop/:shopSrNumber", async (req, res) => {
  const shopSrNumber = req.params.shopSrNumber;

  try {
    // Query the database to retrieve records based on the ShopSrNumber
    const wheelReports = await LHBScheduledPreIinspection.findAll({
      where: {
        ShopSrNumber: shopSrNumber, // Adjust this line if you're filtering by a different column
      },
      attributes: ["WheelId"], // Assuming you only want the WheelId
    });

    if (wheelReports.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReports);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/scheduledpreinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await LHBScheduledPreIinspection.findOne({
      where: { wheelid },
    });

    if (!wheelRecord) {
      return res
        .status(404)
        .json({ message: "No record found with the given wheelid" });
    }

    console.log("updatedData", updatedData);
    console.log("wheelid", wheelid);

    // Update the record with the new data
    await wheelRecord.update(updatedData);

    res.json({
      message: "Record updated successfully",
      updatedRecord: wheelRecord,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/scheduledpreinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBScheduledPreIinspection.findAll({
      where: {
        wheelid: Wheelid, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------Login Api -----------------------------------------------------------
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords directly
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Optionally, you can generate and send a token here
    // const token = jwt.sign({ userId: user.userId }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      // token, // Include token if using JWT
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------LHB Final inspection Api's -----------------------------------------------------------

app.get("/api/getdata/:AxleNo", async (req, res) => {
  const axleNo = req.params.AxleNo;
  console.log(axleNo);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBFinalInspection.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBFinalInspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/data", async (req, res) => {
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
    MEPA,
    MEPB,
    USTName,
    FittingDt,
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
  } = req.body;

  try {
    // Ensure nullable fields are explicitly set to null if not provided
    const safeRefurbishmentDetailsA = RefurbishmentDetailsA || null;
    const safeRefurbishmentDetailsB = RefurbishmentDetailsB || null;

    // Raw SQL query to insert data
    await sequelize.query(
      `INSERT INTO LHBFinalInspection (SectionId,DepartmentId,WheeltypeId,WheelNo,Shift,
        wheelid,AxleNo,WheelDiaA,WheelDiaB,WheelRG,WheelFLG,SizeA,SizeB,OvalA,OvalB,TapA,TapB,
        ShoulderSizeA,ShoulderSizeB,JrWaivinessA,JrWaivinessB,BDMake,BDSizeA,BDSizeB,EndHoleA,
        EndHoleB,USTName,FittingDt,MEPA,MEPB,RefurbishmentDetailsA,RefurbishmentDetailsB,
        CTRBNumberA,CTRBNumberB,CTRBMakeA,CTRBMakeB,CTRBStatusA,CTRBStatusB,CTRBRemainingLifeA,
        CTRBRemainingLifeB,DiscParticularA,DiscParticularB,ECATest,InspectorTicketNo,
        InspectorName,WheelTreadUST,createdBy
      ) VALUES (
        :SectionId,:DepartmentId,:WheeltypeId,:WheelNo,:Shift,:wheelid,:AxleNo,:WheelDiaA,
        :WheelDiaB,:WheelRG,:WheelFLG,:SizeA,:SizeB,:OvalA,:OvalB,:TapA,:TapB,:ShoulderSizeA,
        :ShoulderSizeB,:JrWaivinessA,:JrWaivinessB,:BDMake,:BDSizeA,:BDSizeB,:EndHoleA, 
        :EndHoleB,:USTName,:FittingDt,:MEPA,:MEPB,:RefurbishmentDetailsA,:RefurbishmentDetailsB,
        :CTRBNumberA,:CTRBNumberB,:CTRBMakeA,:CTRBMakeB,:CTRBStatusA,:CTRBStatusB,:CTRBRemainingLifeA,
        :CTRBRemainingLifeB,:DiscParticularA,:DiscParticularB,:ECATest,:InspectorTicketNo,
        :InspectorName,:WheelTreadUST,:createdBy
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
          RefurbishmentDetailsA: safeRefurbishmentDetailsA, // Explicitly set null if empty
          RefurbishmentDetailsB: safeRefurbishmentDetailsB, // Explicitly set null if empty
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
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data", error: error });
  }
});


//---------------------------------------------------------------------------------------------------------------------
app.get("/prelhb/getdata/:wheelid", async (req, res) => {
  const WheelID = req.params.wheelid;
  console.log(WheelID);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBScheduledPreIinspection.findAll({
      where: {
        WheelId: WheelID, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/prelhb/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBScheduledPreIinspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/prelhb/data", async (req, res) => {
  const {
    SectionId,
    DepartmentId,
    WheeltypeId,
    ShopSrNumber,
    AxleNumber,
    ReceiveDate,
    AxleCondition,
    CoachNumber,
    DiameterINA, // Separate field for DiameterINA
    DiameterINB, // Separate field for DiameterINB
    // FlageIN,
    // BDNumber,
    BDDefect,
    BDMakeIN,
    // BDSizeIN,
    RodGaugeIN,
    SoundTestINA,
    SoundTestINB,
    TypeOfRepair,
    MatungaRemark,
    DiscParticularA,
    DiscParticularB,
    // CTRBA,
    // CTRBB,
    CTRBNumberA, // Adjusted as per model
    CTRBNumberB, // Adjusted as per model
    CTRBMakeA, // Adjusted as per model
    CTRBMakeB, // Adjusted as per model
    CTRBStatusA, // Added as per model
    CTRBStatusB, // Added as per model
    BDThicknessA, // Added as per model
    BDThicknessB, // Added as per model
    RefurbishmentDetailsA, // Adjusted as per model
    RefurbishmentDetailsB, // Adjusted as per model
    CTRBDefectA,
    CTRBDefectB,
    CTRBRemarkA,
    CTRBRemarkB,
    FitmentDate,
    CTRBRemainingLifeA,
    CTRBRemainingLifeB,
    InspectorName,
    InspectorTicketNo,
    CTRBDefectNameA, // Added the missing CTRBDefectName field
    CTRBDefectNameB, // Added the missing CTRBDefectName field
    createdBy,
  } = req.body;

  try {
    // Custom query to insert data into the LHBScheduledPreIinspection table
    const query = `
      INSERT INTO LHBPreIinspection 
        (SectionId, DepartmentId, WheeltypeId, ShopSrNumber, AxleNumber, ReceiveDate, AxleCondition, CoachNumber, 
         DiameterINA, DiameterINB, BDDefect, BDMakeIN, RodGaugeIN, SoundTestINA,SoundTestINB, 
         TypeOfRepair, MatungaRemark, DiscParticularA, DiscParticularB, CTRBNumberA, CTRBNumberB, 
         CTRBMakeA, CTRBMakeB, CTRBStatusA, CTRBStatusB, BDThicknessA, BDThicknessB, RefurbishmentDetailsA, 
         RefurbishmentDetailsB, CTRBDefectA,CTRBDefectB, CTRBRemarkA,CTRBRemarkB, CTRBDefectNameA,CTRBDefectNameB, FitmentDate,CTRBRemainingLifeA,CTRBRemainingLifeB, InspectorName, 
         InspectorTicketNo, createdBy, createdDate, isActive) 
      VALUES 
        (:SectionId, :DepartmentId, :WheeltypeId, :ShopSrNumber, :AxleNumber, :ReceiveDate, :AxleCondition, :CoachNumber, 
         :DiameterINA, :DiameterINB, :BDDefect, :BDMakeIN, :RodGaugeIN, :SoundTestINA, :SoundTestINB,
         :TypeOfRepair, :MatungaRemark, :DiscParticularA, :DiscParticularB, :CTRBNumberA, :CTRBNumberB, 
         :CTRBMakeA, :CTRBMakeB, :CTRBStatusA, :CTRBStatusB, :BDThicknessA, :BDThicknessB, :RefurbishmentDetailsA, 
         :RefurbishmentDetailsB, :CTRBDefectA,:CTRBDefectB, :CTRBRemarkA,:CTRBRemarkB, :CTRBDefectNameA,:CTRBDefectNameB, :FitmentDate,:CTRBRemainingLifeA, :CTRBRemainingLifeB, 
         :InspectorName, :InspectorTicketNo, :createdBy, GETDATE(), 1)
    `;

    // Execute the custom query
    const [result, metadata] = await sequelize.query(query, {
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
        CTRBDefectNameA,
        CTRBDefectNameB,
        FitmentDate,
        CTRBRemainingLifeA,
        CTRBRemainingLifeB,
        InspectorName,
        InspectorTicketNo,
        createdBy,
      },
    });

    res.status(200).json({ message: "Data saved successfully", result });

    console.log("Data saved successfully:", result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//---------------------------Api's of the Graph/Charts ------------------------------------------------------------------

// SQL Queries
const summaryReportQuery = "SELECT TOP 1000 * FROM SummaryReport";
const wheelTypeQuery = "SELECT TOP 1000 * FROM Wheeltype";

// API endpoint to get the data for the React app
// app.get("/api/dashboard-data", async (req, res) => {
//   try {
//     // Fetch data from the database
//     // const summaryData = await getData(summaryReportQuery);
//     // const wheelTypeData = await getData(wheelTypeQuery);
//     const summaryData = await sequelize.query(summaryReportQuery, {
//       type: sequelize.QueryTypes.SELECT,
//     });
//     const wheelTypeData = await sequelize.query(wheelTypeQuery, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     // Merge summaryData with wheelTypeData on WheeltypeId
//     const mergedData = summaryData.map((entry) => {
//       const wheelType = wheelTypeData.find(
//         (type) => type.WheeltypeId === entry.WheeltypeId
//       );
//       return {
//         ...entry,
//         WheeltypeName: wheelType ? wheelType.WheeltypeName : null,
//       };
//     });

//     // Data preparation for charts
//     // Replace 'Operation' with 'Operations' to unify stages
//     mergedData.forEach((row) => {
//       if (row.WheelStageName === "Operation") {
//         row.WheelStageName = "Operations";
//       }
//     });

//     // Aggregating counts for each stage
//     const inwardCount = mergedData.filter(
//       (row) => row.WheelStageName === "Inward"
//     ).length;
//     const preinspectionCount = mergedData.filter(
//       (row) => row.WheelStageName === "PreInspection"
//     ).length;
//     const finalinspectionCount = mergedData.filter(
//       (row) => row.WheelStageName === "LHBFinalInspection"
//     ).length;
//     const dispatchCount = mergedData.filter(
//       (row) => row.WheelStageName === "Dispatch"
//     ).length;

//     // Group by WheeltypeName for operations
//     const operationCounts = mergedData
//       .filter((row) => row.WheelStageName === "Operations")
//       .reduce((acc, row) => {
//         acc[row.WheeltypeName] = (acc[row.WheeltypeName] || 0) + 1;
//         return acc;
//       }, {});

//     // Prepare data for the Sankey diagram
//     const labels = [
//       "Inward",
//       "Preinspection",
//       ...Object.keys(operationCounts),
//       "Finalinspection",
//       "Dispatch",
//     ];
//     const sources = [];
//     const targets = [];
//     const values = [];

//     // Inward -> Preinspection
//     sources.push(labels.indexOf("Inward"));
//     targets.push(labels.indexOf("Preinspection"));
//     values.push(inwardCount);

//     // Preinspection -> Operations (aggregate by WheeltypeName)
//     Object.entries(operationCounts).forEach(([wheelType, count]) => {
//       sources.push(labels.indexOf("Preinspection"));
//       targets.push(labels.indexOf(wheelType));
//       values.push(count);
//     });

//     // Operations -> Finalinspection (for each WheeltypeName)
//     Object.entries(operationCounts).forEach(([wheelType, count]) => {
//       sources.push(labels.indexOf(wheelType));
//       targets.push(labels.indexOf("Finalinspection"));
//       values.push(count);
//     });

//     // Finalinspection -> Dispatch
//     sources.push(labels.indexOf("Finalinspection"));
//     targets.push(labels.indexOf("Dispatch"));
//     values.push(finalinspectionCount);

//     // Data for charts
//     const stageCounts = mergedData.reduce((acc, row) => {
//       acc[row.WheelStageName] = (acc[row.WheelStageName] || 0) + 1;
//       return acc;
//     }, {});

//     // Calculate average stage durations
//     mergedData.forEach((row) => {
//       row.StageDuration = Math.abs(
//         new Date(row.WheelStageExitTimestamp) -
//           new Date(row.WheelStageEnrtyTimestamp)
//       );
//     });

//     const stageDurations = Object.entries(
//       mergedData.reduce((acc, row) => {
//         acc[row.WheelStageName] = acc[row.WheelStageName] || [];
//         acc[row.WheelStageName].push(row.StageDuration);
//         return acc;
//       }, {})
//     ).reduce((acc, [stage, durations]) => {
//       acc[stage] = durations.reduce((sum, d) => sum + d, 0) / durations.length;
//       return acc;
//     }, {});

//     // Send data as JSON to the client-side
//     res.json({ labels, sources, targets, values, stageCounts, stageDurations });
//   } catch (err) {
//     console.error("Error fetching data: ", err);
//     res.status(500).send("Error retrieving data from database");
//   }
// });

app.get("/api/dashboard-data", async (req, res) => {
  try {
    // Fetch data from the database
    const summaryData = await sequelize.query(summaryReportQuery, {
      type: sequelize.QueryTypes.SELECT,
    });
    const wheelTypeData = await sequelize.query(wheelTypeQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Merge summaryData with wheelTypeData on WheeltypeId
    const mergedData = summaryData.map((entry) => {
      const wheelType = wheelTypeData.find(
        (type) => type.WheeltypeId === entry.WheeltypeId
      );
      return {
        ...entry,
        WheeltypeName: wheelType ? wheelType.WheeltypeName : null,
      };
    });

    // Data preparation for charts
    mergedData.forEach((row) => {
      // Normalize stage names if necessary
      if (row.WheelStageName === "Operation") {
        row.WheelStageName = "Operations";
      }
    });

    // Aggregating counts for each stage
    const divisionPreinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBDivisionPreInspection"
    ).length;

    const preinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "PreInspection"
    ).length;

    const finalinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBFinalInspection"
    ).length;

    const dispatchCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBDispatch"
    ).length;

    // Group by WheeltypeName for LHBPressOFF and LHBPressOn ("Operations" stage)
    const operationCounts = mergedData
      .filter(
        (row) =>
          row.WheelStageName === "LHBPressOFF" ||
          row.WheelStageName === "LHBPressOn"
      )
      .reduce((acc, row) => {
        acc[row.WheeltypeName] = (acc[row.WheeltypeName] || 0) + 1;
        return acc;
      }, {});

    // Prepare data for the Sankey diagram
    const labels = [
      "LHBDivisionPreInspection",
      "Preinspection",
      ...Object.keys(operationCounts),
      "LHBFinalInspection",
      "Dispatch",
    ];
    const sources = [];
    const targets = [];
    const values = [];

    // LHBDivisionPreInspection -> Preinspection
    sources.push(labels.indexOf("LHBDivisionPreInspection"));
    targets.push(labels.indexOf("Preinspection"));
    values.push(divisionPreinspectionCount);

    // Preinspection -> LHBPressOFF (for heavy repair)
    Object.entries(operationCounts).forEach(([wheelType, count]) => {
      sources.push(labels.indexOf("Preinspection"));
      targets.push(labels.indexOf(wheelType));
      values.push(count);
    });

    // LHBPressOFF -> LHBPressOn (for heavy repair)
    Object.entries(operationCounts).forEach(([wheelType, count]) => {
      sources.push(labels.indexOf(wheelType));
      targets.push(labels.indexOf("LHBFinalInspection"));
      values.push(count);
    });

    // LHBFinalInspection -> Dispatch
    sources.push(labels.indexOf("LHBFinalInspection"));
    targets.push(labels.indexOf("Dispatch"));
    values.push(finalinspectionCount);

    // Data for charts
    const stageCounts = mergedData.reduce((acc, row) => {
      acc[row.WheelStageName] = (acc[row.WheelStageName] || 0) + 1;
      return acc;
    }, {});

    // Calculate average stage durations
    mergedData.forEach((row) => {
      row.StageDuration = Math.abs(
        new Date(row.WheelStageExitTimestamp) -
          new Date(row.WheelStageEnrtyTimestamp)
      );
    });

    const stageDurations = Object.entries(
      mergedData.reduce((acc, row) => {
        acc[row.WheelStageName] = acc[row.WheelStageName] || [];
        acc[row.WheelStageName].push(row.StageDuration);
        return acc;
      }, {})
    ).reduce((acc, [stage, durations]) => {
      acc[stage] = durations.reduce((sum, d) => sum + d, 0) / durations.length;
      return acc;
    }, {});

    // Send data as JSON to the client-side
    res.json({
      labels,
      sources,
      targets,
      values,
      stageCounts,
      stageDurations,
    });
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).send("Error retrieving data from database");
  }
});

//------------------------------ LHB Scheduled Pre Inspection Api's ----------------------------------------------------------------------------
app.get("/inward/getdata/:WheelNo", async (req, res) => {
  const wheelno = req.params.WheelNo;
  console.log(wheelno);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBDivisionPreInspection.findAll({
      where: {
        WheelNo: wheelno, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/inward/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBDivisionPreInspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/inward/data", async (req, res) => {
  const {
    WheelNo,
    LooryNo,
    POHDate,
    // returndate,
    divisionreport,
    DivisionName,
    matungareport,
    createdBy,
    SectionId,
    DepartmentId,
    WheeltypeId,
    modifiedBy,
  } = req.body;

  try {
    // Custom insert query for MSSQL
    const insertQuery = `
      INSERT INTO LHBDivisionPreInspection 
        (WheelNo, LooryNo, POHDate, divisionreport,DivisionName, matungareport, createdBy, SectionId, DepartmentId, WheeltypeId, modifiedBy)
      VALUES 
        (:WheelNo, :LooryNo, :POHDate, :divisionreport,:DivisionName, :matungareport, :createdBy, :SectionId, :DepartmentId, :WheeltypeId, :modifiedBy)
    `;

    // Execute the query
    await sequelize.query(insertQuery, {
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
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(200).json({ message: "Data inserted successfully" });

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ Press-ON Of LHB Wheel Api's ----------------------------------------------------------------------------

app.get("/pressonlhb/getdata/:wheelid", async (req, res) => {
  const WheelID = req.params.wheelid;
  console.log(WheelID);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBPressON.findAll({
      where: {
        wheelid: WheelID, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/pressonlhb/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBPressON.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/pressonlhb/data", async (req, res) => {
  const {
    wheelid,
    SectionId,
    DepartmentId,
    WheeltypeId,
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
    WheelActivities,
    AxleWheelSeatSize,
    WheelDiscBoreSize,
    wheelDiscStampingParticulars,
    PressOnNumber,
    WheelActivityBDThickness,
    WheelActivityBDMake,
    createdBy,
  } = req.body;

  try {
    // Raw SQL query to insert data
    await sequelize.query(
      `INSERT INTO LHBPressON (
        wheelid,
        SectionId,
        DepartmentId,
        WheeltypeId,
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
        WheelActivities,
        AxleWheelSeatSize,
        WheelDiscBoreSize,
        wheelDiscStampingParticulars,
        PressOnNumber,
        WheelActivityBDThickness,
        WheelActivityBDMake,
        createdBy
      ) VALUES (
        :wheelid,
        :SectionId,
        :DepartmentId,
        :WheeltypeId,
        :WheelNo,
        :AxleNo,
        :ATLNo,
        :WheelSeatSize,
        :BDSeatSize,
        :RAValue,
        :OperatorName,
        :WheelDiscAVTLNO,
        :WheelDiscABoreSizeByOperator,
        :WheelDiscARAValue,
        :WheelDiscAOperatorName,
        :WheelDiscABWheelSeatSize,
        :WheelDiscAAllow,
        :WheelDiscAPressOnPressure,
        :WheelDiscARDNo,
        :WheelDiscAWheelDiscParticulars,
        :WheelDiscATopXAxis,
        :WheelDiscATopYAxis,
        :WheelDiscAMiddleXAxis,
        :WheelDiscAMiddleYAxis,
        :WheelDiscALowerXAxis,
        :WheelDiscALowerYAxis,
        :WheelDiscAAvgXAxis,
        :WheelDiscAAvgYAxis,
        :WheelDiscBVTLNo,
        :WheelDiscBBoreSizeByOperator,
        :WheelDiscBRAValue,
        :WheelDiscBOperatorName,
        :WheelDiscBBWheelSeatSize,
        :WheelDiscBAllow,
        :WheelDiscBPressOnPressure,
        :WheelDiscBRDNo,
        :WheelDiscBWheelDiscParticulars,
        :WheelDiscBTopXAxis,
        :WheelDiscBTopYAxis,
        :WheelDiscBMiddleXAxis,
        :WheelDiscBMiddleYAxis,
        :WheelDiscBLowerXAxis,
        :WheelDiscBLowerYAxis,
        :WheelDiscBAvgXAxis,
        :WheelDiscBAvgYAxis,
        :BrakeDiscABBDSeatSize,
        :BrakeDiscAAllow,
        :BrakeDiscAPressOnPressure,
        :BrakeDiscABDThickness,
        :BrakeDiscABrakeDiscParticulars,
        :BrakeDiscATopXAxis,
        :BrakeDiscATopYAxis,
        :BrakeDiscAMiddleXAxis,
        :BrakeDiscAMiddleYAxis,
        :BrakeDiscALowerXAxis,
        :BrakeDiscALowerYAxis,
        :BrakeDiscAAvgXAxis,
        :BrakeDiscAAvgYAxis,
        :BrakeDiscBBBDSeatSize,
        :BrakeDiscBAllow,
        :BrakeDiscBPressOnPressure,
        :BrakeDiscBBDThickness,
        :BrakeDiscBBrakeDiscParticulars,
        :BrakeDiscBTopXAxis,
        :BrakeDiscBTopYAxis,
        :BrakeDiscBMiddleXAxis,
        :BrakeDiscBMiddleYAxis,
        :BrakeDiscBLowerXAxis,
        :BrakeDiscBLowerYAxis,
        :BrakeDiscBAvgXAxis,
        :BrakeDiscBAvgYAxis,
        :MCNo,
        :OperatorNameFinal,
        :InspectorName,
        :OperatorNo,
        :InspectorNo,
        :WheelActivities,
        :AxleWheelSeatSize,
        :WheelDiscBoreSize,
        :wheelDiscStampingParticulars,
        :PressOnNumber,
        :WheelActivityBDThickness,
        :WheelActivityBDMake,
        :createdBy
      )`,
      {
        replacements: {
          wheelid,
          SectionId,
          DepartmentId,
          WheeltypeId,
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
          WheelActivities,
          AxleWheelSeatSize,
          WheelDiscBoreSize,
          wheelDiscStampingParticulars,
          PressOnNumber,
          WheelActivityBDThickness,
          WheelActivityBDMake,
          createdBy,
        },
      }
    );

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data" });
  }
});

//------------------------------ Press-OFF Of LHB Wheel Api's ----------------------------------------------------------------------------

app.get("/pressofflhb/getdata/:AxleNo", async (req, res) => {
  const axleNo = req.params.AxleNo;
  console.log(axleNo);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await LHBPressOff.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/pressofflhb/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await LHBPressOff.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/pressofflhb/data", async (req, res) => {
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
    BrakeDiscConditionCause,
    AxleConditionCause,
    InspectorName,
    OperatorName,
    MachineNumber,
    ShiftNumber,
    serviceablediscidnumber,
    Reason,
    PressedOffRemark,
    createdBy,
  } = req.body;

  try {
    // Raw SQL query to insert data
    // await sequelize.query(`SET IDENTITY_INSERT PressOff ON`);
    await sequelize.query(
      `INSERT INTO LHBPressOff (
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
          BrakeDiscConditionCause,
          AxleConditionCause,
          InspectorName,
          OperatorName,
          MachineNumber,
          ShiftNumber,
          serviceablediscidnumber,
          Reason,
          PressedOffRemark,
          createdBy,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------Press-Off/final Inspection (Pending Tasks Page) Api's -----------------------------------------------------------

app.get("/summaryreport/heavyrepair/pressofftable", async (req, res) => {
  try {
    const heavyrepairData = await SummaryReport.findAll({
      where: {
        TypeofRepair: "HeavyRepair",
        // attributes: ['WheelNo', 'DateOfEntry']
      },
    });

    res.json(heavyrepairData);
  } catch (error) {
    console.error("Error fetching heavy repair data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get(
  "/summaryreport/normalrepair/finalinspectiontable",
  async (req, res) => {
    try {
      const normalRepairData = await SummaryReport.findAll({
        where: {
          TypeOfRepair: "NormalRepair",
          DepartmentId: 2,
        },
      });
      res.json(normalRepairData);
    } catch (error) {
      console.log("Error fetching Normal Repair Data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get(
  "/summaryreport/dataComingFromPressOn/finalinspectiontable",
  async (req, res) => {
    try {
      const pressOnApprovedData = await SummaryReport.findAll({
        where: {
          DepartmentID: 3,
          WheelStageName: "LHBPressOn",
        },
      });
      res.json(pressOnApprovedData);
    } catch (error) {
      console.log("Error fetching Press On Approved Data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/summaryreport/pendingdataof/pressontable", async (req, res) => {
  try {
    const pressOnPendingData = await SummaryReport.findAll({
      where: {
        // SectionID: 1,
        // DepartmentID: 1,
        // WheeltypeID: 1,
        WheelStageName: "LHBPressOff",
      },
    });
    res.json(pressOnPendingData);
  } catch (error) {
    console.log("Error fetching press on pending Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/summaryreport/pendingdataof/dispatchtable", async (req, res) => {
  try {
    const dispatchPendingData = await SummaryReport.findAll({
      where: {
        // SectionID: 1,
        DepartmentID: 4,
        // WheeltypeID: 1,
        WheelStageName: "LHBFinalInspection",
      },
    });
    res.json(dispatchPendingData);
  } catch (error) {
    console.log("Error fetching dispatch pending Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/summaryreport/pendingdataof/preinspectiontable", async (req, res) => {
  try {
    const preinspectionPendingData = await SummaryReport.findAll({
      where: {
        // SectionID: 1,
        DepartmentID: 1,
        // WheeltypeID: 1,
        WheelStageName: "LHBDivisionPreInspection",
      },
    });
    res.json(preinspectionPendingData);
  } catch (error) {
    console.log("Error fetching dispatch pending Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------ Wheel Dispatch Record Api's ----------------------------------------------------------------------------

const { Op } = require("sequelize");
app.get("/lhbinspection/getalldata", async (req, res) => {
  const { wheelNo, timeRange, defectName } = req.query;

  try {
    // Base query conditions for the division inspection
    let whereConditionsDivisionPreInspection = {};
    let wheelNumbers = [];

    // If wheelNo is provided, add it to the query conditions
    if (wheelNo) {
      whereConditionsDivisionPreInspection.WheelNo = wheelNo;
    }

    // Handle time range filtering (using 'createdDate' as the timestamp)
    if (timeRange) {
      const currentDate = new Date();
      let startDate;

      switch (timeRange) {
        case "7":
          startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
          break;
        case "15":
          startDate = new Date(currentDate.setDate(currentDate.getDate() - 15));
          break;
        case "1Month":
          startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
          break;
        case "1Year":
          startDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        whereConditionsDivisionPreInspection.createdDate = {
          [Op.gte]: startDate,
        };
      }
    }

    // Add conditional query parameters for Defect Name
    if (defectName) {
      whereConditionsDivisionPreInspection.divisionreport = defectName;
    }

    // Fetch wheel numbers based on conditions
    const divisionData = await LHBDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });

    if (divisionData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Extract and filter out any undefined, null, or empty string wheel numbers
    wheelNumbers = divisionData
      .map(item => item.WheelNo)
      .filter(wheel => wheel && typeof wheel === "string" && wheel.trim() !== "");

    // Prepare to fetch data from other tables based on wheel numbers
    const preInspectionData = await LHBScheduledPreIinspection.findAll({
      where: {
        ShopSrNumber: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    const finalInspectionData = await LHBFinalInspection.findAll({
      where: {
        WheelNo: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Combine results
    const combinedResults = wheelNumbers.map(wheel => {
      const preInspec = preInspectionData.find(item => item.ShopSrNumber === wheel);
      const finalInspec = finalInspectionData.find(item => item.WheelNo === wheel);
      const divisionInspec = divisionData.find(item => item.WheelNo === wheel);

      return {
        WheelNo: preInspec ? preInspec.ShopSrNumber : wheel,
        BRGDetailA: preInspec ? preInspec.CTRBNumberA : null,
        BRGDetailB: preInspec ? preInspec.CTRBNumberB : null,
        RefurbishmentDetailsA: finalInspec ? finalInspec.RefurbishmentDetailsA : null,
        RefurbishmentDetailsB: finalInspec ? finalInspec.RefurbishmentDetailsB : null,
        BRGMakeA: preInspec ? preInspec.CTRBMakeA : null,
        BRGMakeB: preInspec ? preInspec.CTRBMakeB : null,
        MTNRemarkA: divisionInspec ? divisionInspec.matungareport : null,
        MTNRemarkB: divisionInspec ? divisionInspec.matungareport : null,
        Timestamp: divisionInspec ? divisionInspec.createdDate : null, // Add timestamp from LHBDivisionPreInspection
      };
    });

    // Return the combined results as JSON
    res.json(combinedResults);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});


//------------------------------ Wheel Dispatch Record Api's ----------------------------------------------------------------------------
app.get("/dispatch/getdata/:WheelNo", async (req, res) => {
  const wheelno = req.params.WheelNo;
  console.log(wheelno);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await WheelsDispatchRecord.findAll({
      where: {
        WheelNo: wheelno, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/dispatch/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await WheelsDispatchRecord.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/dispatch/data", async (req, res) => {
  const {
    wheelid,
    date,
    DivisionCarshed,
    LooryNo,
    WheelNo,
    TypeOfWheel,
    TradeDiameter,
    WheelGauge,
    AxleUSTCode,
    remark,
    createdBy,
    SectionId,
    DepartmentId,
    WheeltypeId,
  } = req.body;

  try {
    // Custom query to insert data into the LHBScheduledPreIinspection table
    const query = `
      INSERT INTO WheelsDispatchRecord 
        (wheelid,SectionId, DepartmentId, WheeltypeId, date, DivisionCarshed, LooryNo, WheelNo, TypeOfWheel, 
         TradeDiameter, WheelGauge, AxleUSTCode, remark, createdBy, createdDate, isActive) 
      VALUES 
        (:wheelid,:SectionId, :DepartmentId, :WheeltypeId, :date, :DivisionCarshed, :LooryNo, :WheelNo, :TypeOfWheel, 
         :TradeDiameter, :WheelGauge, :AxleUSTCode, :remark,  :createdBy, GETDATE(), 1)
    `;

    // Execute the custom query
    const [result, metadata] = await sequelize.query(query, {
      replacements: {
        wheelid,
        date,
        DivisionCarshed,
        LooryNo,
        WheelNo,
        TypeOfWheel,
        TradeDiameter,
        WheelGauge,
        AxleUSTCode,
        remark,
        createdBy,
        SectionId,
        DepartmentId,
        WheeltypeId,
      },
    });

    res.status(200).json({ message: "Data saved successfully", result });

    console.log("Data saved successfully:", result);
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/lhb/search", async (req, res) => {
  const { wheelNo } = req.query; // Use req.query to get the wheelNo
  console.log("wheelNo", wheelNo); // Log the wheelNo

  try {
    // Base query conditions for both tables
    let whereConditionsPreInspection = {};
    let whereConditionsDivisionPreInspection = {};
    let whereConditionsPressOff = {};
    let whereConditionsPressOn = {};
    let whereConditionsFinalInspection = {};

    // Add conditional query parameters for WheelNo
    if (wheelNo) {
      whereConditionsPreInspection.ShopSrNumber = wheelNo;
      whereConditionsDivisionPreInspection.WheelNo = wheelNo;
      whereConditionsPressOff.ShopSNo = wheelNo;
      whereConditionsPressOn.WheelNo = wheelNo;
      whereConditionsFinalInspection.WheelNo = wheelNo;
    }

    // Query both tables based on the conditions
    const preInspectionData = await LHBScheduledPreIinspection.findAll({
      where: whereConditionsPreInspection,
    });
    const divisionPreInspectionData = await LHBDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });
    const finalInspectionData = await LHBFinalInspection.findAll({
      where: whereConditionsFinalInspection,
    });
    const pressOffData = await LHBPressOff.findAll({
      where: whereConditionsPressOff,
    });
    const pressOnData = await LHBPressON.findAll({
      where: whereConditionsPressOn,
    });

    // Create an object to separate results by type
    const responseData = {
      preInspection: preInspectionData,
      divisionPreInspection: divisionPreInspectionData,
      finalInspection: finalInspectionData,
      pressOff: pressOffData,
      pressOn: pressOnData,
    };

    // Check if any records were found
    if (
      !responseData.preInspection.length &&
      !responseData.divisionPreInspection.length &&
      !responseData.finalInspection.length &&
      !responseData.pressOff.length &&
      !responseData.pressOn.length
    ) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(responseData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ EMU Pre-Inspection Form ----------------------------------------------------------------------------

const { insertEMUPreInspectionData, insertEMUFinalInspectionData, insertPressOffData, insertPressOnData } = require("./helpers/EMUHelper.js"); // Adjust the path as needed
const EMUScheduledPreIinspection = require("./models/EMUScheduledPreIinspection.js");

app.post("/emu/preinsp/data", async (req, res) => {
  try {
    const result = await insertEMUPreInspectionData(req.body);

    // Check if result has content before sending the success response
    if (result) {
      res.status(200).json({ message: "Data saved successfully", result });
      console.log("Data saved successfully:", result);
    } else {
      res.status(400).json({
        message: "No data was inserted. Please check your input data.",
      });
      console.log("No data was inserted.");
    }
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emu/preinsp/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUScheduledPreIinspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emu/preinsp/getdata", async (req, res) => {
  const { shopSrNumber } = req.body; // Extract WheelId from the query parameters

  if (!shopSrNumber) {
    return res.status(400).json({ message: "WheelId is required" });
  }

  try {
    // Query the database to retrieve a record by WheelId
    const data = await EMUScheduledPreIinspection.findOne({
      where: { ShopSrNumber: shopSrNumber },
    });

    // Check if a record was found
    if (!data) {
      return res.status(404).json({ message: "Record not found" });
    }

    // Return the fetched data as JSON
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ LHB Scheduled Pre Inspection Api's ----------------------------------------------------------------------------
const EMUDivisionPreInspection = require("./models/EMUDivisionPreInspection.js");
const EMUFinalInspection = require("./models/EMUFinalInspection.js");
const EMUPressOff = require("./models/EMUPressOff.js");
const EMUPressOn = require("./models/EMUPressOn.js");
app.get("/emu/division/getdata", async (req, res) => {
  const { wheelno } = req.body;
  console.log(wheelno);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUDivisionPreInspection.findAll({
      where: {
        WheelNo: wheelno, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emu/division/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUDivisionPreInspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/inward/data", async (req, res) => {
  const {
    WheelNo,
    LooryNo,
    POHDate,
    // returndate,
    divisionreport,
    DivisionName,
    matungareport,
    createdBy,
    SectionId,
    DepartmentId,
    WheeltypeId,
    modifiedBy,
  } = req.body;

  try {
    // Custom insert query for MSSQL
    const insertQuery = `
      INSERT INTO LHBDivisionPreInspection 
        (WheelNo, LooryNo, POHDate, divisionreport,DivisionName, matungareport, createdBy, SectionId, DepartmentId, WheeltypeId, modifiedBy)
      VALUES 
        (:WheelNo, :LooryNo, :POHDate, :divisionreport,:DivisionName, :matungareport, :createdBy, :SectionId, :DepartmentId, :WheeltypeId, :modifiedBy)
    `;

    // Execute the query
    await sequelize.query(insertQuery, {
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
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(200).json({ message: "Data inserted successfully" });

    console.log("Data saved successfully");
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//--------------------------EMU Final Inspection Form--------------------------------------------------------------------------

app.get("/emu/finalinspection/getdata", async (req, res) => {
  const {axleNo} = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUFinalInspection.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emu/finalinspection/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUFinalInspection.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/emu/finalinspection/data", async (req, res) => {
  const requestData = req.body;

  try {
    // Call the helper function to insert data
    await insertEMUFinalInspectionData(requestData);

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data", error: error.message });
  }
});

//------------------------------ EMU Press-Off Api's ----------------------------------------------------------------------------

app.get("/emu/pressoff/getdata", async (req, res) => {
  const {axleNo} = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUPressOff.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emu/pressoff/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUPressOff.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/emu/pressoff/data", async (req, res) => {
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
    BrakeDiscConditionCause,
    AxleConditionCause,
    InspectorName,
    OperatorName,
    MachineNumber,
    ShiftNumber,
    serviceablediscidnumber,
    Reason,
    PressedOffRemark,
    createdBy,
  } = req.body;

  const data = {
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
    BrakeDiscConditionCause,
    AxleConditionCause,
    InspectorName,
    OperatorName,
    MachineNumber,
    ShiftNumber,
    serviceablediscidnumber,
    Reason,
    PressedOffRemark,
    createdBy,
  };

  try {
    // Call the helper function to insert the data
    await insertPressOffData(data);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to the database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//------------------------------ EMU Press-On Api's ----------------------------------------------------------------------------

app.get("/emu/presson/getdata", async (req, res) => {
  const {axleNo} = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUPressOn.findAll({
      where: {
        AxleNo: axleNo, // Adjust this line if you're filtering by a different column
      },
    });

    if (wheelReport.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    res.json(wheelReport);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emu/presson/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUPressOn.findAll();

    // Check if any records were found
    if (allData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Return the fetched data as JSON
    res.json(allData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/emu/presson/data", async (req, res) => {
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
    OperatorName,
    VTLNo,
    BoreSize,
    RAValue,
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
    createdBy,
    modifiedBy,
  } = req.body;

  const data = {
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
    OperatorName,
    VTLNo,
    BoreSize,
    RAValue,
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
    createdBy,
    modifiedBy,
  };

  try {
    // Call the helper function to insert the data
    await insertPressOnData(data);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data to the database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


//------------------------------ Server ----------------------------------------------------------------------------
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected...");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
});

// const sslOptions = {
//   key: fs.readFileSync('C:/inetpub/vhosts/noviusrailtech.co.in/dwapi2.noviusrailtech.co.in/privkey.pem'),// Path to the private key
//   cert: fs.readFileSync('C:/inetpub/vhosts/noviusrailtech.co.in/dwapi2.noviusrailtech.co.in/cert.pem') // Path to the full certificate chain
// };

// //HTTPS server creation
// https.createServer(sslOptions, app).listen(4000, () => {
//   console.log('Server is running securely on port 4000');

//   // Connect to the database
//   sequelize
//     .authenticate()
//     .then(() => {
//       console.log("Database connected...");
//     })
//     .catch((err) => {
//       console.error("Unable to connect to the database:", err);
//     });
// });

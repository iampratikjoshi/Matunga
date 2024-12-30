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

// -----------------------------VB-ScheduledPreInspection Update Api -----------------------------------------------------------

app.delete("/vbschedule/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await VBScheduledPreIinspection.findOne({
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


app.put("/vbscheduledpreinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await VBScheduledPreIinspection.findOne({
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

app.get("/vbscheduledpreinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBScheduledPreIinspection.findAll({
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

// -----------------------------VB-PressOn Update Api -----------------------------------------------------------

app.delete("/vbpresson/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await VBPressOn.findOne({
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

app.put("/vbpresson/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await VBPressOn.findOne({
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

app.get("/vbpresson/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBPressOn.findAll({
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

// -----------------------------VB-PressOff Update Api -----------------------------------------------------------

app.delete("/vbpressoff/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await VBPressOff.findOne({
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

app.put("/vbpressoff/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await VBPressOff.findOne({
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

app.get("/vbpressoff/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBPressOff.findAll({
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

// -----------------------------VB-FinalInspection Update Api -----------------------------------------------------------

app.delete("/vbfinalinspection/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await VBFinalInspection.findOne({
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

app.put("/vbfinalinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await VBFinalInspection.findOne({
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

app.get("/vbfinalinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBFinalInspection.findAll({
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

// -----------------------------VB-DIVISION Update and Delete Api -----------------------------------------------------------

app.get("/vb/search", async (req, res) => {
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
    const preInspectionData = await VBScheduledPreIinspection.findAll({
      where: whereConditionsPreInspection,
    });
    const divisionPreInspectionData = await VBDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });
    const finalInspectionData = await VBFinalInspection.findAll({
      where: whereConditionsFinalInspection,
    });
    const pressOffData = await VBPressOff.findAll({
      where: whereConditionsPressOff,
    });
    const pressOnData = await VBPressOn.findAll({
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

app.delete("/vbdivision/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await VBDivisionPreInspection.findOne({
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

app.put("/vbdivision/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await VBDivisionPreInspection.findOne({
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

app.get("/vbdivision/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBDivisionPreInspection.findAll({
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

//--------------------------VB Scheduled Pre Inspection Form--------------------------------------------------------------------------

const {
  insertVBPreInspectionData,
  insertVBFinalInspectionData,
  insertVBPressOffData,
  insertVBPressOnData,
  insertVBDivisionData,
} = require("./helpers/VBHelper.js"); // Adjust the path as needed
const VBScheduledPreIinspection = require("./models/VBScheduledPreIinspection.js");

app.post("/vb/preinsp/data", async (req, res) => {
  try {
    const result = await insertVBPreInspectionData(req.body);

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

app.get("/vb/preinsp/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await VBScheduledPreIinspection.findAll();

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

app.get("/vb/preinsp/getdata", async (req, res) => {
  const { shopSrNumber } = req.body; // Extract WheelId from the query parameters

  if (!shopSrNumber) {
    return res.status(400).json({ message: "WheelId is required" });
  }

  try {
    // Query the database to retrieve a record by WheelId
    const data = await VBScheduledPreIinspection.findOne({
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

//--------------------------VB Press On Form--------------------------------------------------------------------------

app.post("/vb/presson/data", async (req, res) => {
  try {
    const result = await insertVBPressOnData(req.body);

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

app.get("/vb/presson/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await VBPressOn.findAll();

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

app.get("/vb/presson/getdata", async (req, res) => {
  const { WheelNo } = req.body; // Extract WheelId from the query parameters

  if (!WheelNo) {
    return res.status(400).json({ message: "WheelId is required" });
  }

  try {
    // Query the database to retrieve a record by WheelId
    const data = await VBPressOn.findOne({
      where: { WheelNo: WheelNo },
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

//--------------------------VB Final Inspection Form--------------------------------------------------------------------------

const VBDivisionPreInspection = require("./models/VBDivisionPreInspection.js");
const VBFinalInspection = require("./models/VBFinalInspection.js");
const VBPressOff = require("./models/VBPressOff.js");
const VBPressOn = require("./models/VBPressOn.js");

app.get("/vb/finalinspection/getdata", async (req, res) => {
  const { wheelno } = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBFinalInspection.findAll({
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

app.get("/vb/finalinspection/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await VBFinalInspection.findAll();

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

app.post("/vb/finalinspection/data", async (req, res) => {
  try {
    const result = await insertVBFinalInspectionData(req.body);

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

//--------------------------VB Division Pre Inspection Form--------------------------------------------------------------------------

app.get("/vb/division/getdata", async (req, res) => {
  const { wheelno } = req.body;
  console.log(wheelno);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBDivisionPreInspection.findAll({
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

app.get("/vb/division/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await VBDivisionPreInspection.findAll();

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

app.post("/vb/division/data", async (req, res) => {
  try {
    const result = await insertVBDivisionData(req.body);

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

app.get("/vb/pressoff/getdata", async (req, res) => {
  const { axleNo } = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await VBPressOff.findAll({
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

app.get("/vb/pressoff/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await VBPressOff.findAll();

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

app.post("/vb/pressoff/data", async (req, res) => {
  try {
    const result = await insertVBPressOffData(req.body);

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

//------------------------------- ICF --------------------------------------------------------

app.get("/icf/search", async (req, res) => {
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
    const preInspectionData = await ICFScheduledPreIinspection.findAll({
      where: whereConditionsPreInspection,
    });
    const divisionPreInspectionData = await ICFDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });
    const finalInspectionData = await ICFFinalInspection.findAll({
      where: whereConditionsFinalInspection,
    });
    const pressOffData = await ICFPressOff.findAll({
      where: whereConditionsPressOff,
    });
    const pressOnData = await ICFPressOn.findAll({
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

// -----------------------------ICF-DIVISION Update and Delete Api -----------------------------------------------------------

app.delete("/icfdivision/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFDivisionPreInspection.findOne({
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

app.put("/icfdivision/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFDivisionPreInspection.findOne({
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

app.get("/icfdivision/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFDivisionPreInspection.findAll({
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

// -----------------------------ICF-FinalInspection Update Api -----------------------------------------------------------

app.delete("/icffinalinspection/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFFinalInspection.findOne({
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

app.put("/icffinalinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFFinalInspection.findOne({
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

app.get("/icffinalinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFFinalInspection.findAll({
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

// -----------------------------ICF-PressOff Update Api -----------------------------------------------------------

app.delete("/icfpressoff/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFPressOff.findOne({
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

app.put("/icfpressoff/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFPressOff.findOne({
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

app.get("/icfpressoff/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFPressOff.findAll({
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

// -----------------------------ICF-PressOn Update Api -----------------------------------------------------------

app.delete("/icfpresson/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFPressOn.findOne({
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

app.put("/icfpresson/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFPressOn.findOne({
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

app.get("/icfpresson/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFPressOn.findAll({
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

// -----------------------------ICF-ScheduledPreInspection Update Api -----------------------------------------------------------

app.delete(
  "/icfscheduledpreinspection/deletedata/:wheelid",
  async (req, res) => {
    const { wheelid } = req.params; // Get the wheelid from the URL params

    try {
      // Find the record by wheelid
      const wheelRecord = await ICFScheduledPreIinspection.findOne({
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
  }
);

app.get(
  "/icfscheduledpreinspection/getdata/shop/:shopSrNumber",
  async (req, res) => {
    const shopSrNumber = req.params.shopSrNumber;

    try {
      // Query the database to retrieve records based on the ShopSrNumber
      const wheelReports = await ICFScheduledPreIinspection.findAll({
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
  }
);

app.put("/icfscheduledpreinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await ICFScheduledPreIinspection.findOne({
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

app.get("/icfscheduledpreinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFScheduledPreIinspection.findAll({
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
// -----------------------------EMU-DIVISION Update and Delete Api -----------------------------------------------------------

app.get("/emu/search", async (req, res) => {
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
    const preInspectionData = await EMUScheduledPreIinspection.findAll({
      where: whereConditionsPreInspection,
    });
    const divisionPreInspectionData = await EMUDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });
    const finalInspectionData = await EMUFinalInspection.findAll({
      where: whereConditionsFinalInspection,
    });
    const pressOffData = await EMUPressOff.findAll({
      where: whereConditionsPressOff,
    });
    const pressOnData = await EMUPressOn.findAll({
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

app.delete("/emudivision/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUDivisionPreInspection.findOne({
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

app.put("/emudivision/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUDivisionPreInspection.findOne({
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

app.get("/emudivision/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUDivisionPreInspection.findAll({
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
// -----------------------------EMU-FinalInspection Update Api -----------------------------------------------------------

app.delete("/emufinalinspection/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUFinalInspection.findOne({
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

app.put("/emufinalinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUFinalInspection.findOne({
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

app.get("/emufinalinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUFinalInspection.findAll({
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
// -----------------------------EMU-PressOff Update Api -----------------------------------------------------------

app.delete("/emupressoff/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUPressOff.findOne({
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

app.put("/emupressoff/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUPressOff.findOne({
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

app.get("/emupressoff/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUPressOff.findAll({
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
// -----------------------------EMU-PressOn Update Api -----------------------------------------------------------

app.delete("/emupresson/deletedata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUPressOn.findOne({
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

app.put("/emupresson/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUPressOn.findOne({
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

app.get("/emupresson/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUPressOn.findAll({
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
// -----------------------------EMU-ScheduledPreInspection Update Api -----------------------------------------------------------

app.delete(
  "/emuscheduledpreinspection/deletedata/:wheelid",
  async (req, res) => {
    const { wheelid } = req.params; // Get the wheelid from the URL params

    try {
      // Find the record by wheelid
      const wheelRecord = await EMUScheduledPreIinspection.findOne({
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
  }
);

app.put("/emuscheduledpreinspection/editdata/:wheelid", async (req, res) => {
  const { wheelid } = req.params; // Get the wheelid from the URL params
  const updatedData = req.body; // Get the updated data from the request body

  try {
    // Find the record by wheelid
    const wheelRecord = await EMUScheduledPreIinspection.findOne({
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

app.get("/emuscheduledpreinspection/getdata/:wheelid", async (req, res) => {
  const Wheelid = req.params.wheelid;
  console.log(Wheelid);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUScheduledPreIinspection.findAll({
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
    CTRBRemarkA,
    CTRBRemarkB,
    CTRBDefectA,
    CTRBDefectB,
    CTRBDefectNameA,
    CTRBDefectNameB,
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
        InspectorName,WheelTreadUSTCTRBRemarkA,
          CTRBRemarkB,
          CTRBDefectA,
          CTRBDefectB,
          CTRBDefectNameA,
          CTRBDefectNameB,createdBy
      ) VALUES (
        :SectionId,:DepartmentId,:WheeltypeId,:WheelNo,:Shift,:wheelid,:AxleNo,:WheelDiaA,
        :WheelDiaB,:WheelRG,:WheelFLG,:SizeA,:SizeB,:OvalA,:OvalB,:TapA,:TapB,:ShoulderSizeA,
        :ShoulderSizeB,:JrWaivinessA,:JrWaivinessB,:BDMake,:BDSizeA,:BDSizeB,:EndHoleA, 
        :EndHoleB,:USTName,:FittingDt,:MEPA,:MEPB,:RefurbishmentDetailsA,:RefurbishmentDetailsB,
        :CTRBNumberA,:CTRBNumberB,:CTRBMakeA,:CTRBMakeB,:CTRBStatusA,:CTRBStatusB,:CTRBRemainingLifeA,
        :CTRBRemainingLifeB,:DiscParticularA,:DiscParticularB,:ECATest,:InspectorTicketNo,
        :InspectorName,:WheelTreadUST,:CTRBRemarkA,
          :CTRBRemarkB,
          :CTRBDefectA,
          :CTRBDefectB,
          :CTRBDefectNameA,
          :CTRBDefectNameB,:createdBy
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
          CTRBRemarkA,
          CTRBRemarkB,
          CTRBDefectA,
          CTRBDefectB,
          CTRBDefectNameA,
          CTRBDefectNameB,
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

//-------------------------------------- Pre-Inspection Api's -------------------------------------------------------------------------------
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

//-------------------------------------- EMU Wearing Clearance Api's -------------------------------------------------------------------------------
app.get("/wearingclremu/getdata", async (req, res) => {
  const { wheelid } = req.query;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUWearingClearance.findAll({
      where: {
        wheelid: wheelid, // Adjust this line if you're filtering by a different column
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

app.get("/wearingclremu/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUWearingClearance.findAll();

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

app.post("/wearingclremu/data", async (req, res) => {
  try {
    const result = await insertEMUWearingClearanceData(req.body);

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

//-------------------------------------- ICF Wearing Clearance Api's -------------------------------------------------------------------------------
app.get("/wearingclricf/getdata", async (req, res) => {
  const { wheelid } = req.query;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFWearingClearance.findAll({
      where: {
        wheelid: wheelid, // Adjust this line if you're filtering by a different column
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

app.get("/wearingclricf/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFWearingClearance.findAll();

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

app.post("/wearingclricf/data", async (req, res) => {
  try {
    const result = await insertICFWearingClearanceData(req.body);

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

//-------------------------------------- ICF Bearing Rejection Api's -------------------------------------------------------------------------------
app.get("/bearingrejectionicf/getdata", async (req, res) => {
  const { wheelid } = req.query;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFBearingRejection.findAll({
      where: {
        Wheelid: wheelid, // Adjust this line if you're filtering by a different column
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

app.get("/bearingrejectionicf/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFBearingRejection.findAll();

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

app.post("/bearingrejectionicf/data", async (req, res) => {
  try {
    const result = await insertICFBearingRejectionData(req.body);

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

//-------------------------------------- EMU Bearing Rejection Api's -------------------------------------------------------------------------------
app.get("/bearingrejectionemu/getdata", async (req, res) => {
  const { wheelid } = req.query;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await EMUBearingRejection.findAll({
      where: {
        Wheelid: wheelid, // Adjust this line if you're filtering by a different column
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

app.get("/bearingrejectionemu/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await EMUBearingRejection.findAll();

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

app.post("/bearingrejectionemu/data", async (req, res) => {
  try {
    const result = await insertEMUBearingRejectionData(req.body);

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

// app.get("/api/dashboard-data", async (req, res) => {
//   try {
//     // Fetch data from the database
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
//     mergedData.forEach((row) => {
//       // Normalize stage names if necessary
//       if (row.WheelStageName === "Operation") {
//         row.WheelStageName = "Operations";
//       }
//     });

//     // Aggregating counts for each stage
//     const divisionPreinspectionCount = mergedData.filter(
//       (row) => row.WheelStageName === "LHBDivisionPreInspection"
//     ).length;

//     const preinspectionCount = mergedData.filter(
//       (row) => row.WheelStageName === "PreInspection"
//     ).length;

//     const finalinspectionCount = mergedData.filter(
//       (row) => row.WheelStageName === "LHBFinalInspection"
//     ).length;

//     const dispatchCount = mergedData.filter(
//       (row) => row.WheelStageName === "LHBDispatch"
//     ).length;

//     // Group by WheeltypeName for LHBPressOFF and LHBPressOn ("Operations" stage)
//     const operationCounts = mergedData
//       .filter(
//         (row) =>
//           row.WheelStageName === "LHBPressOFF" ||
//           row.WheelStageName === "LHBPressOn"
//       )
//       .reduce((acc, row) => {
//         acc[row.WheeltypeName] = (acc[row.WheeltypeName] || 0) + 1;
//         return acc;
//       }, {});

//     // Prepare data for the Sankey diagram
//     const labels = [
//       "LHBDivisionPreInspection",
//       "Preinspection",
//       ...Object.keys(operationCounts),
//       "LHBFinalInspection",
//       "Dispatch",
//     ];
//     const sources = [];
//     const targets = [];
//     const values = [];

//     // LHBDivisionPreInspection -> Preinspection
//     sources.push(labels.indexOf("LHBDivisionPreInspection"));
//     targets.push(labels.indexOf("Preinspection"));
//     values.push(divisionPreinspectionCount);

//     // Preinspection -> LHBPressOFF (for heavy repair)
//     Object.entries(operationCounts).forEach(([wheelType, count]) => {
//       sources.push(labels.indexOf("Preinspection"));
//       targets.push(labels.indexOf(wheelType));
//       values.push(count);
//     });

//     // LHBPressOFF -> LHBPressOn (for heavy repair)
//     Object.entries(operationCounts).forEach(([wheelType, count]) => {
//       sources.push(labels.indexOf(wheelType));
//       targets.push(labels.indexOf("LHBFinalInspection"));
//       values.push(count);
//     });

//     // LHBFinalInspection -> Dispatch
//     sources.push(labels.indexOf("LHBFinalInspection"));
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
//     res.json({
//       labels,
//       sources,
//       targets,
//       values,
//       stageCounts,
//       stageDurations,
//     });
//   } catch (err) {
//     console.error("Error fetching data: ", err);
//     res.status(500).send("Error retrieving data from database");
//   }
// });

//------------------------------ LHB Scheduled Pre Inspection Api's ----------------------------------------------------------------------------

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

    // Normalize stage names (if necessary)
    mergedData.forEach((row) => {
      if (row.WheelStageName === "Operation") {
        row.WheelStageName = "Operations";
      }
    });

    // Find WheelIds that appear in both LHBPressOn and LHBFinalInspection
    const pressOnWheelIds = new Set(
      mergedData
        .filter((row) => row.WheelStageName === "LHBPressOn")
        .map((row) => row.WheelID)
    );

    const finalInspectionWheelIds = new Set(
      mergedData
        .filter((row) => row.WheelStageName === "LHBFinalInspection")
        .map((row) => row.WheelID)
    );

    // Find common WheelIds between the two stages
    const commonWheelIds = [...pressOnWheelIds].filter((WheelID) =>
      finalInspectionWheelIds.has(WheelID)
    );

    // Filter data based on the stages and the repair type
    const divisionPreinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBDivisionPreInspection"
    ).length;

    const schedulePreinspectionData = mergedData.filter(
      (row) => row.WheelStageName === "PreInspection"
    );

    const normalRepairData = schedulePreinspectionData.filter(
      (row) => row.TypeofRepair === "NormalRepair"
    );

    const heavyRepairData = schedulePreinspectionData.filter(
      (row) => row.TypeofRepair === "HeavyRepair"
    );

    const pressOnCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBPressOn"
    ).length;

    const finalinspectionCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBFinalInspection"
    ).length;

    const dispatchCount = mergedData.filter(
      (row) => row.WheelStageName === "LHBDispatch"
    ).length;

    // Group by WheeltypeName for the Press Off and Press On stages
    const heavyRepairCounts = heavyRepairData.reduce((acc, row) => {
      acc[row.WheeltypeName] = (acc[row.WheeltypeName] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for the Sankey diagram
    const labels = [
      "DivisionPreInspection",
      "SchedulePreInspection",
      "PressOff",
      "PressOn",
      "FinalInspection",
    ];

    const sources = [];
    const targets = [];
    const values = [];

    // DivisionPreInspection -> SchedulePreInspection
    sources.push(labels.indexOf("DivisionPreInspection"));
    targets.push(labels.indexOf("SchedulePreInspection"));
    values.push(divisionPreinspectionCount);

    // SchedulePreInspection -> NormalRepairFinalInspection (if Normal Repair)
    sources.push(labels.indexOf("SchedulePreInspection"));
    targets.push(labels.indexOf("FinalInspection"));
    values.push(normalRepairData.length);

    // SchedulePreInspection -> PressOff -> PressOn -> FinalInspection (if Heavy Repair)
    sources.push(labels.indexOf("SchedulePreInspection"));
    targets.push(labels.indexOf("PressOff"));
    values.push(heavyRepairData.length);

    sources.push(labels.indexOf("PressOff"));
    targets.push(labels.indexOf("PressOn"));
    values.push(pressOnCount);

    sources.push(labels.indexOf("PressOn"));
    targets.push(labels.indexOf("FinalInspection"));
    values.push(commonWheelIds.length);

    // FinalInspection -> Dispatch
    // sources.push(labels.indexOf("FinalInspection"));
    // targets.push(labels.indexOf("Dispatch"));
    // values.push(25);

    // Data for the stage counts (how many records in each stage)
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
        WheelStageName: "PreInspection",
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
          WheelStageName: "PreInspection",
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

app.get("/emu/summaryreport/combineddata", async (req, res) => {
  try {
    // Run all queries in parallel
    const [
      heavyRepairData,
      normalRepairData,
      pressOnApprovedData,
      pressOnPendingData,
      dispatchPendingData,
      preinspectionPendingData,
    ] = await Promise.all([
      SummaryReport.findAll({
        where: {
          TypeofRepair: "HeavyRepair",
          WheelStageName: "EMUPreInspection",
        },
      }),
      SummaryReport.findAll({
        where: {
          TypeOfRepair: "NormalRepair",
          WheelStageName: "EMUPreInspection",
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 3,
          WheelStageName: "EMUPressOn",
        },
      }),
      SummaryReport.findAll({
        where: {
          WheelStageName: "EMUPressOFF",
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 4,
          WheelStageName: "EMUFinalInspection",
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 1,
          WheelStageName: "EMUDivisionPreInspection",
        },
      }),
    ]);

    // console.log("Dispatch Pending data :", dispatchPendingData);

    // Step 1: Filter preinspectionPendingData by WheelNo
    const preinspectionWheelNos = new Set([
      ...heavyRepairData.map((item) => item.WheelNo),
      ...normalRepairData.map((item) => item.WheelNo),
    ]);

    const filteredPreinspectionPendingData = preinspectionPendingData.filter(
      (item) => !preinspectionWheelNos.has(item.WheelNo)
    );

    // Step 2: Filter heavyRepairData by WheelID (if it exists in pressOnPendingData)
    const pressOnPendingWheelIDs = new Set(
      pressOnPendingData.map((item) => item.WheelID)
    );

    const filteredHeavyRepairData = heavyRepairData.filter(
      (item) => !pressOnPendingWheelIDs.has(item.WheelID)
    );

    // Step 3: Filter pressOnPendingData by WheelID (if it exists in pressOnApprovedData)
    const pressOnApprovedWheelIDs = new Set(
      pressOnApprovedData.map((item) => item.WheelID)
    );

    const filteredPressOnPendingData = pressOnPendingData.filter(
      (item) => !pressOnApprovedWheelIDs.has(item.WheelID)
    );

    // Step 4: Filter dispatchPendingData by WheelID (if it exists in pressOnApprovedData or normalRepairData)
    const dispatchWheelIDs = new Set([
      ...pressOnApprovedData.map((item) => item.WheelID),
      ...normalRepairData.map((item) => item.WheelID),
    ]);

    // Step 5: Remove WheelID from normalRepairData or pressOnApprovedData if it exists in dispatchPendingData
    const dispatchPendingWheelIDs = new Set(
      dispatchPendingData.map((item) => item.WheelID)
    );

    // Remove WheelID from pressOnApprovedData or normalRepairData if it's in dispatchPendingData
    const filteredPressOnApprovedData = pressOnApprovedData.filter(
      (item) => !dispatchPendingWheelIDs.has(item.WheelID)
    );

    const filteredNormalRepairData = normalRepairData.filter(
      (item) => !dispatchPendingWheelIDs.has(item.WheelID)
    );

    // Step 6: Combine all the filtered data into one object
    const response = {
      heavyRepairData: filteredHeavyRepairData,
      normalRepairData: filteredNormalRepairData,
      pressOnApprovedData: filteredPressOnApprovedData,
      pressOnPendingData: filteredPressOnPendingData,
      dispatchPendingData: dispatchPendingData,
      preinspectionPendingData: filteredPreinspectionPendingData,
    };

    // Send the combined data as the response
    res.json(response);
  } catch (error) {
    console.log("Error fetching combined data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/vb/summaryreport/combineddata", async (req, res) => {
  try {
    // Run all queries in parallel
    const [
      heavyRepairData,
      normalRepairData,
      pressOnApprovedData,
      pressOnPendingData,
      dispatchPendingData,
      preinspectionPendingData,
    ] = await Promise.all([
      SummaryReport.findAll({
        where: {
          TypeofRepair: "HeavyRepair",
          WheelStageName: "VBPreInspection",
        },
      }),
      SummaryReport.findAll({
        where: {
          TypeOfRepair: "NormalRepair",
          WheelStageName: "VBPreInspection",
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 3,
          WheelStageName: "VBPressOn",
        },
      }),
      SummaryReport.findAll({
        where: {
          WheelStageName: "VBPressOFF",
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 4,
          WheelStageName: "VBFinalInspection",
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 1,
          WheelStageName: "VBDivisionPreInspection",
        },
      }),
    ]);

    // console.log("Dispatch Pending data :", dispatchPendingData);

    // Step 1: Filter preinspectionPendingData by WheelNo
    const preinspectionWheelNos = new Set([
      ...heavyRepairData.map((item) => item.WheelNo),
      ...normalRepairData.map((item) => item.WheelNo),
    ]);

    const filteredPreinspectionPendingData = preinspectionPendingData.filter(
      (item) => !preinspectionWheelNos.has(item.WheelNo)
    );

    // Step 2: Filter heavyRepairData by WheelID (if it exists in pressOnPendingData)
    const pressOnPendingWheelIDs = new Set(
      pressOnPendingData.map((item) => item.WheelID)
    );

    const filteredHeavyRepairData = heavyRepairData.filter(
      (item) => !pressOnPendingWheelIDs.has(item.WheelID)
    );

    // Step 3: Filter pressOnPendingData by WheelID (if it exists in pressOnApprovedData)
    const pressOnApprovedWheelIDs = new Set(
      pressOnApprovedData.map((item) => item.WheelID)
    );

    const filteredPressOnPendingData = pressOnPendingData.filter(
      (item) => !pressOnApprovedWheelIDs.has(item.WheelID)
    );

    // Step 4: Filter dispatchPendingData by WheelID (if it exists in pressOnApprovedData or normalRepairData)
    const dispatchWheelIDs = new Set([
      ...pressOnApprovedData.map((item) => item.WheelID),
      ...normalRepairData.map((item) => item.WheelID),
    ]);

    // Step 5: Remove WheelID from normalRepairData or pressOnApprovedData if it exists in dispatchPendingData
    const dispatchPendingWheelIDs = new Set(
      dispatchPendingData.map((item) => item.WheelID)
    );

    // Remove WheelID from pressOnApprovedData or normalRepairData if it's in dispatchPendingData
    const filteredPressOnApprovedData = pressOnApprovedData.filter(
      (item) => !dispatchPendingWheelIDs.has(item.WheelID)
    );

    const filteredNormalRepairData = normalRepairData.filter(
      (item) => !dispatchPendingWheelIDs.has(item.WheelID)
    );

    // Step 6: Combine all the filtered data into one object
    const response = {
      heavyRepairData: filteredHeavyRepairData,
      normalRepairData: filteredNormalRepairData,
      pressOnApprovedData: filteredPressOnApprovedData,
      pressOnPendingData: filteredPressOnPendingData,
      dispatchPendingData: dispatchPendingData,
      preinspectionPendingData: filteredPreinspectionPendingData,
    };

    // Send the combined data as the response
    res.json(response);
  } catch (error) {
    console.log("Error fetching combined data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/icf/summaryreport/combineddata", async (req, res) => {
  try {
    // Run all queries in parallel
    const [
      heavyRepairData,
      normalRepairData,
      pressOnApprovedData,
      pressOnPendingData,
      dispatchPendingData,
      preinspectionPendingData,
    ] = await Promise.all([
      SummaryReport.findAll({
        where: {
          TypeofRepair: "HeavyRepair",
          WheelStageName: "ICFPreInspection", // Changed from EMU to ICF
        },
      }),
      SummaryReport.findAll({
        where: {
          TypeOfRepair: "NormalRepair",
          WheelStageName: "ICFPreInspection", // Changed from EMU to ICF
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 3,
          WheelStageName: "ICFPressOn", // Changed from EMU to ICF
        },
      }),
      SummaryReport.findAll({
        where: {
          WheelStageName: "ICFPressOFF", // Changed from EMU to ICF
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 4,
          WheelStageName: "ICFFinalInspection", // Changed from EMU to ICF
        },
      }),
      SummaryReport.findAll({
        where: {
          DepartmentID: 1,
          WheelStageName: "ICFDivisionPreInspection", // Changed from EMU to ICF
        },
      }),
    ]);

    // console.log("Dispatch Pending data :", dispatchPendingData);

    // Step 1: Filter preinspectionPendingData by WheelNo
    const preinspectionWheelNos = new Set([
      ...heavyRepairData.map((item) => item.WheelNo),
      ...normalRepairData.map((item) => item.WheelNo),
    ]);

    const filteredPreinspectionPendingData = preinspectionPendingData.filter(
      (item) => !preinspectionWheelNos.has(item.WheelNo)
    );

    // Step 2: Filter heavyRepairData by WheelID (if it exists in pressOnPendingData)
    const pressOnPendingWheelIDs = new Set(
      pressOnPendingData.map((item) => item.WheelID)
    );

    const filteredHeavyRepairData = heavyRepairData.filter(
      (item) => !pressOnPendingWheelIDs.has(item.WheelID)
    );

    // Step 3: Filter pressOnPendingData by WheelID (if it exists in pressOnApprovedData)
    const pressOnApprovedWheelIDs = new Set(
      pressOnApprovedData.map((item) => item.WheelID)
    );

    const filteredPressOnPendingData = pressOnPendingData.filter(
      (item) => !pressOnApprovedWheelIDs.has(item.WheelID)
    );

    // Step 4: Filter dispatchPendingData by WheelID (if it exists in pressOnApprovedData or normalRepairData)
    const dispatchWheelIDs = new Set([
      ...pressOnApprovedData.map((item) => item.WheelID),
      ...normalRepairData.map((item) => item.WheelID),
    ]);

    // Step 5: Remove WheelID from normalRepairData or pressOnApprovedData if it exists in dispatchPendingData
    const dispatchPendingWheelIDs = new Set(
      dispatchPendingData.map((item) => item.WheelID)
    );

    // Remove WheelID from pressOnApprovedData or normalRepairData if it's in dispatchPendingData
    const filteredPressOnApprovedData = pressOnApprovedData.filter(
      (item) => !dispatchPendingWheelIDs.has(item.WheelID)
    );

    const filteredNormalRepairData = normalRepairData.filter(
      (item) => !dispatchPendingWheelIDs.has(item.WheelID)
    );

    // Step 6: Combine all the filtered data into one object
    const response = {
      heavyRepairData: filteredHeavyRepairData,
      normalRepairData: filteredNormalRepairData,
      pressOnApprovedData: filteredPressOnApprovedData,
      pressOnPendingData: filteredPressOnPendingData,
      dispatchPendingData: dispatchPendingData,
      preinspectionPendingData: filteredPreinspectionPendingData,
    };

    // Send the combined data as the response
    res.json(response);
  } catch (error) {
    console.log("Error fetching combined data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//------------------------------ Wheel Dispatch Record Api's ----------------------------------------------------------------------------

const { Op } = require("sequelize");
// app.get("/lhbinspection/getalldata", async (req, res) => {
//   const { wheelNo, timeRange, defectName } = req.query;

//   try {
//     // Base query conditions for the division inspection
//     let whereConditionsDivisionPreInspection = {};
//     let wheelNumbers = [];

//     // If wheelNo is provided, add it to the query conditions
//     if (wheelNo) {
//       whereConditionsDivisionPreInspection.WheelNo = wheelNo;
//     }

//     // Handle time range filtering (using 'createdDate' as the timestamp)
//     if (timeRange) {
//       const currentDate = new Date();
//       let startDate;

//       switch (timeRange) {
//         case "7":
//           startDate = new Date(currentDate.setDate(currentDate.getDate() - 7));
//           break;
//         case "15":
//           startDate = new Date(currentDate.setDate(currentDate.getDate() - 15));
//           break;
//         case "1Month":
//           startDate = new Date(
//             currentDate.setMonth(currentDate.getMonth() - 1)
//           );
//           break;
//         case "1Year":
//           startDate = new Date(
//             currentDate.setFullYear(currentDate.getFullYear() - 1)
//           );
//           break;
//         default:
//           startDate = null;
//       }

//       if (startDate) {
//         whereConditionsDivisionPreInspection.createdDate = {
//           [Op.gte]: startDate,
//         };
//       }
//     }

//     // Add conditional query parameters for Defect Name
//     if (defectName) {
//       whereConditionsDivisionPreInspection.divisionreport = defectName;
//     }

//     // Fetch wheel numbers based on conditions
//     const divisionData = await LHBDivisionPreInspection.findAll({
//       where: whereConditionsDivisionPreInspection,
//     });

//     if (divisionData.length === 0) {
//       return res.status(404).json({ message: "No records found" });
//     }

//     // Extract and filter out any undefined, null, or empty string wheel numbers
//     wheelNumbers = divisionData
//       .map((item) => item.WheelNo)
//       .filter(
//         (wheel) => wheel && typeof wheel === "string" && wheel.trim() !== ""
//       );

//     // Prepare to fetch data from other tables based on wheel numbers
//     const preInspectionData = await LHBScheduledPreIinspection.findAll({
//       where: {
//         ShopSrNumber: {
//           [Op.in]: wheelNumbers,
//         },
//       },
//     });

//     const finalInspectionData = await LHBFinalInspection.findAll({
//       where: {
//         WheelNo: {
//           [Op.in]: wheelNumbers,
//         },
//       },
//     });

//     // Combine results
//     const combinedResults = wheelNumbers.map((wheel) => {
//       const preInspec = preInspectionData.find(
//         (item) => item.ShopSrNumber === wheel
//       );
//       const finalInspec = finalInspectionData.find(
//         (item) => item.WheelNo === wheel
//       );
//       const divisionInspec = divisionData.find(
//         (item) => item.WheelNo === wheel
//       );

//       return {
//         WheelNo: preInspec ? preInspec.ShopSrNumber : wheel,
//         BRGDetailA: preInspec ? preInspec.CTRBNumberA : null,
//         BRGDetailB: preInspec ? preInspec.CTRBNumberB : null,
//         RefurbishmentDetailsA: finalInspec
//           ? finalInspec.RefurbishmentDetailsA
//           : null,
//         RefurbishmentDetailsB: finalInspec
//           ? finalInspec.RefurbishmentDetailsB
//           : null,
//         BRGMakeA: preInspec ? preInspec.CTRBMakeA : null,
//         BRGMakeB: preInspec ? preInspec.CTRBMakeB : null,
//         MTNRemarkA: divisionInspec ? divisionInspec.matungareport : null,
//         MTNRemarkB: divisionInspec ? divisionInspec.matungareport : null,
//         Timestamp: divisionInspec ? divisionInspec.createdDate : null, // Add timestamp from LHBDivisionPreInspection
//       };
//     });

//     // Return the combined results as JSON
//     res.json(combinedResults);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

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

//------------------------------ Joint Inspection Api's ----------------------------------------------------------------------------

app.get("/lhbinspection/getalldata", async (req, res) => {
  const { wheelNo, timeRange, defectName } = req.query;

  try {
    // Base query conditions for the division inspection
    let whereConditionsDivisionPreInspection = {};
    let wheelNumbers = [];
    let wheelIds = [];

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
          startDate = new Date(
            currentDate.setMonth(currentDate.getMonth() - 1)
          );
          break;
        case "1Year":
          startDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 1)
          );
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

    // Fetch division inspection data based on the conditions
    const divisionData = await LHBDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });

    if (divisionData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Extract and filter out any undefined, null, or empty string wheel numbers and IDs
    wheelNumbers = divisionData
      .map((item) => item.WheelNo)
      .filter(
        (wheel) => wheel && typeof wheel === "string" && wheel.trim() !== ""
      );

    // Assuming 'WheelId' is a field that uniquely identifies each wheel
    wheelIds = divisionData.map((item) => item.wheelid); // Assuming 'WheelId' exists in your database

    // Fetch pre-inspection data based on wheel numbers
    const preInspectionData = await LHBScheduledPreIinspection.findAll({
      where: {
        ShopSrNumber: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch final inspection data based on wheel numbers
    const finalInspectionData = await LHBFinalInspection.findAll({
      where: {
        WheelNo: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch joint inspection data based on wheelIds
    const jointInspectionData = await JointInspection.findAll({
      where: {
        Wheelid: {
          [Op.in]: wheelIds,
        },
      },
    });

    // Combine results from different sources
    const combinedResults = divisionData.map((divisionInspec) => {
      const wheel = divisionInspec.WheelNo;
      const wheelId = divisionInspec.wheelid;

      // Find matching pre-inspection, final inspection, and joint inspection data
      const preInspec = preInspectionData.find(
        (item) => item.ShopSrNumber === wheel
      );
      const finalInspec = finalInspectionData.find(
        (item) => item.WheelNo === wheel
      );
      const jointInspec = jointInspectionData.find(
        (item) => item.Wheelid == wheelId
      );

      return {
        WheelNo: wheel, // Duplicate WheelNo will appear multiple times
        WheelId: wheelId, // Unique WheelId for each WheelNo
        BRGDetailA: preInspec ? preInspec.CTRBNumberA : null,
        BRGDetailB: preInspec ? preInspec.CTRBNumberB : null,
        RefurbishmentDetailsA: finalInspec
          ? finalInspec.RefurbishmentDetailsA
          : null,
        RefurbishmentDetailsB: finalInspec
          ? finalInspec.RefurbishmentDetailsB
          : null,
        BRGMakeA: preInspec ? preInspec.CTRBMakeA : null,
        BRGMakeB: preInspec ? preInspec.CTRBMakeB : null,
        MTNRemarkA: divisionInspec ? divisionInspec.matungareport : null,
        MTNRemarkB: divisionInspec ? divisionInspec.matungareport : null,
        Timestamp: divisionInspec ? divisionInspec.createdDate : null, // Timestamp from LHBDivisionPreInspection
        Remark: jointInspec ? jointInspec.JointRemark : null, // Fetch details from JointInspection table
      };
    });

    // Return the combined results as JSON
    res.json(combinedResults);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/vbinspection/getalldata", async (req, res) => {
  const { wheelNo, timeRange, defectName } = req.query;

  try {
    // Base query conditions for the division inspection
    let whereConditionsDivisionPreInspection = {};
    let wheelNumbers = [];
    let wheelIds = [];

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
          startDate = new Date(
            currentDate.setMonth(currentDate.getMonth() - 1)
          );
          break;
        case "1Year":
          startDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 1)
          );
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

    // Fetch division inspection data based on the conditions
    const divisionData = await VBDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });

    if (divisionData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Extract and filter out any undefined, null, or empty string wheel numbers and IDs
    wheelNumbers = divisionData
      .map((item) => item.WheelNo)
      .filter(
        (wheel) => wheel && typeof wheel === "string" && wheel.trim() !== ""
      );

    // Assuming 'WheelId' is a field that uniquely identifies each wheel
    wheelIds = divisionData.map((item) => item.wheelid); // Assuming 'WheelId' exists in your database

    // Fetch pre-inspection data based on wheel numbers
    const preInspectionData = await VBScheduledPreIinspection.findAll({
      where: {
        ShopSrNumber: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch final inspection data based on wheel numbers
    const finalInspectionData = await VBFinalInspection.findAll({
      where: {
        WheelNo: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch joint inspection data based on wheelIds
    const jointInspectionData = await JointInspection.findAll({
      where: {
        Wheelid: {
          [Op.in]: wheelIds,
        },
      },
    });

    // Combine results from different sources
    const combinedResults = divisionData.map((divisionInspec) => {
      const wheel = divisionInspec.WheelNo;
      const wheelId = divisionInspec.wheelid;

      // Find matching pre-inspection, final inspection, and joint inspection data
      const preInspec = preInspectionData.find(
        (item) => item.ShopSrNumber === wheel
      );
      const finalInspec = finalInspectionData.find(
        (item) => item.WheelNo === wheel
      );
      const jointInspec = jointInspectionData.find(
        (item) => item.Wheelid == wheelId
      );

      return {
        WheelNo: wheel, // Duplicate WheelNo will appear multiple times
        WheelId: wheelId, // Unique WheelId for each WheelNo
        BRGDetailA: preInspec ? preInspec.CTRBNumberA : null,
        BRGDetailB: preInspec ? preInspec.CTRBNumberB : null,
        RefurbishmentDetailsA: finalInspec
          ? finalInspec.RefurbishmentDetailsA
          : null,
        RefurbishmentDetailsB: finalInspec
          ? finalInspec.RefurbishmentDetailsB
          : null,
        BRGMakeA: preInspec ? preInspec.CTRBMakeA : null,
        BRGMakeB: preInspec ? preInspec.CTRBMakeB : null,
        MTNRemarkA: divisionInspec ? divisionInspec.matungareport : null,
        MTNRemarkB: divisionInspec ? divisionInspec.matungareport : null,
        Timestamp: divisionInspec ? divisionInspec.createdDate : null, // Timestamp from LHBDivisionPreInspection
        Remark: jointInspec ? jointInspec.JointRemark : null, // Fetch details from JointInspection table
      };
    });

    // Return the combined results as JSON
    res.json(combinedResults);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/emuinspection/getalldata", async (req, res) => {
  const { wheelNo, timeRange, defectName } = req.query;

  try {
    // Base query conditions for the division inspection
    let whereConditionsDivisionPreInspection = {};
    let wheelNumbers = [];
    let wheelIds = [];

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
          startDate = new Date(
            currentDate.setMonth(currentDate.getMonth() - 1)
          );
          break;
        case "1Year":
          startDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 1)
          );
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

    // Fetch division inspection data based on the conditions
    const divisionData = await EMUDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });

    if (divisionData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Extract and filter out any undefined, null, or empty string wheel numbers and IDs
    wheelNumbers = divisionData
      .map((item) => item.WheelNo)
      .filter(
        (wheel) => wheel && typeof wheel === "string" && wheel.trim() !== ""
      );

    // Assuming 'WheelId' is a field that uniquely identifies each wheel
    wheelIds = divisionData.map((item) => item.wheelid); // Assuming 'WheelId' exists in your database

    // Fetch pre-inspection data based on wheel numbers
    const preInspectionData = await EMUScheduledPreIinspection.findAll({
      where: {
        ShopSrNumber: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch final inspection data based on wheel numbers
    const finalInspectionData = await EMUFinalInspection.findAll({
      where: {
        WheelNo: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch joint inspection data based on wheelIds
    const jointInspectionData = await JointInspection.findAll({
      where: {
        Wheelid: {
          [Op.in]: wheelIds,
        },
      },
    });

    // Combine results from different sources
    const combinedResults = divisionData.map((divisionInspec) => {
      const wheel = divisionInspec.WheelNo;
      const wheelId = divisionInspec.wheelid;

      // Find matching pre-inspection, final inspection, and joint inspection data
      const preInspec = preInspectionData.find(
        (item) => item.ShopSrNumber === wheel
      );
      const finalInspec = finalInspectionData.find(
        (item) => item.WheelNo === wheel
      );
      const jointInspec = jointInspectionData.find(
        (item) => item.Wheelid == wheelId
      );

      return {
        WheelNo: wheel, // Duplicate WheelNo will appear multiple times
        WheelId: wheelId, // Unique WheelId for each WheelNo
        BRGDetailA: preInspec ? preInspec.CTRBNumberA : null,
        BRGDetailB: preInspec ? preInspec.CTRBNumberB : null,
        RefurbishmentDetailsA: finalInspec
          ? finalInspec.RefurbishmentDetailsA
          : null,
        RefurbishmentDetailsB: finalInspec
          ? finalInspec.RefurbishmentDetailsB
          : null,
        BRGMakeA: preInspec ? preInspec.CTRBMakeA : null,
        BRGMakeB: preInspec ? preInspec.CTRBMakeB : null,
        MTNRemarkA: divisionInspec ? divisionInspec.matungareport : null,
        MTNRemarkB: divisionInspec ? divisionInspec.matungareport : null,
        Timestamp: divisionInspec ? divisionInspec.createdDate : null, // Timestamp from LHBDivisionPreInspection
        Remark: jointInspec ? jointInspec.JointRemark : null, // Fetch details from JointInspection table
      };
    });

    // Return the combined results as JSON
    res.json(combinedResults);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/icfinspection/getalldata", async (req, res) => {
  const { wheelNo, timeRange, defectName } = req.query;

  try {
    // Base query conditions for the division inspection
    let whereConditionsDivisionPreInspection = {};
    let wheelNumbers = [];
    let wheelIds = [];

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
          startDate = new Date(
            currentDate.setMonth(currentDate.getMonth() - 1)
          );
          break;
        case "1Year":
          startDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 1)
          );
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

    // Fetch division inspection data based on the conditions
    const divisionData = await ICFDivisionPreInspection.findAll({
      where: whereConditionsDivisionPreInspection,
    });

    if (divisionData.length === 0) {
      return res.status(404).json({ message: "No records found" });
    }

    // Extract and filter out any undefined, null, or empty string wheel numbers and IDs
    wheelNumbers = divisionData
      .map((item) => item.WheelNo)
      .filter(
        (wheel) => wheel && typeof wheel === "string" && wheel.trim() !== ""
      );

    // Assuming 'WheelId' is a field that uniquely identifies each wheel
    wheelIds = divisionData.map((item) => item.wheelid); // Assuming 'WheelId' exists in your database

    // Fetch pre-inspection data based on wheel numbers
    const preInspectionData = await ICFScheduledPreIinspection.findAll({
      where: {
        ShopSrNumber: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch final inspection data based on wheel numbers
    const finalInspectionData = await ICFFinalInspection.findAll({
      where: {
        WheelNo: {
          [Op.in]: wheelNumbers,
        },
      },
    });

    // Fetch joint inspection data based on wheelIds
    const jointInspectionData = await JointInspection.findAll({
      where: {
        Wheelid: {
          [Op.in]: wheelIds,
        },
      },
    });

    // Combine results from different sources
    const combinedResults = divisionData.map((divisionInspec) => {
      const wheel = divisionInspec.WheelNo;
      const wheelId = divisionInspec.wheelid;

      // Find matching pre-inspection, final inspection, and joint inspection data
      const preInspec = preInspectionData.find(
        (item) => item.ShopSrNumber === wheel
      );
      const finalInspec = finalInspectionData.find(
        (item) => item.WheelNo === wheel
      );
      const jointInspec = jointInspectionData.find(
        (item) => item.Wheelid == wheelId
      );

      return {
        WheelNo: wheel, // Duplicate WheelNo will appear multiple times
        WheelId: wheelId, // Unique WheelId for each WheelNo
        BRGDetailA: preInspec ? preInspec.CTRBNumberA : null,
        BRGDetailB: preInspec ? preInspec.CTRBNumberB : null,
        RefurbishmentDetailsA: finalInspec
          ? finalInspec.RefurbishmentDetailsA
          : null,
        RefurbishmentDetailsB: finalInspec
          ? finalInspec.RefurbishmentDetailsB
          : null,
        BRGMakeA: preInspec ? preInspec.CTRBMakeA : null,
        BRGMakeB: preInspec ? preInspec.CTRBMakeB : null,
        MTNRemarkA: divisionInspec ? divisionInspec.matungareport : null,
        MTNRemarkB: divisionInspec ? divisionInspec.matungareport : null,
        Timestamp: divisionInspec ? divisionInspec.createdDate : null, // Timestamp from LHBDivisionPreInspection
        Remark: jointInspec ? jointInspec.JointRemark : null, // Fetch details from JointInspection table
      };
    });

    // Return the combined results as JSON
    res.json(combinedResults);
  } catch (error) {
    console.error("Error retrieving data:", error);
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

//------------------------------ EMU Schedule Pre-Inspection Form ----------------------------------------------------------------------------

const {
  insertEMUPreInspectionData,
  insertEMUFinalInspectionData,
  insertPressOffData,
  insertPressOnData,
  insertEMUWearingClearanceData,
  insertEMUBearingRejectionData,
} = require("./helpers/EMUHelper.js"); // Adjust the path as needed
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

//------------------------------ EMU Division Pre Inspection Api's ----------------------------------------------------------------------------
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

app.post("/emu/division/data", async (req, res) => {
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
  } = req.body;

  try {
    // Custom insert query for MSSQL
    const insertQuery = `
      INSERT INTO EMUDivisionPreInspection 
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
  const { axleNo } = req.body;
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
    const insertedData = await insertEMUFinalInspectionData(requestData);
    console.log("Inserted Data :", insertedData);

    // Check if any records were found
    if (insertedData.length > 0) {
      return res.status(200).json({ message: "Data saved successfully" });
    } else {
      return res.status(404).json({ message: "No Data Saved" });
    }
  } catch (error) {
    console.error("Error inserting data:", error);
    res
      .status(500)
      .json({ message: "Error inserting data", error: error.message });
  }
});

//------------------------------ EMU Press-Off Api's ----------------------------------------------------------------------------

app.get("/emu/pressoff/getdata", async (req, res) => {
  const { axleNo } = req.body;
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

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ EMU Press-On Api's ----------------------------------------------------------------------------

app.get("/emu/presson/getdata", async (req, res) => {
  const { axleNo } = req.body;
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
  try {
    // Call the helper function to insert the data
    await insertPressOnData(req.body);

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ ICF Division Pre Inspection Api's ----------------------------------------------------------------------------
const ICFDivisionPreInspection = require("./models/ICFDivisionPreInspection.js");
const {
  insertDivisionData,
  insertICFPressOffData,
  insertPressOnDataICF,
  insertICFWearingClearanceData,
  insertICFBearingRejectionData,
} = require("./helpers/ICFHepler.js");

app.get("/icf/division/getdata", async (req, res) => {
  const { wheelno } = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFDivisionPreInspection.findAll({
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

app.get("/icf/division/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFDivisionPreInspection.findAll();

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

app.post("/icf/division/data", async (req, res) => {
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
  } = req.body;

  const data = {
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
  };

  try {
    // Call the helper function to insert the data
    const insertedData = await insertDivisionData(data);

    // Check if any records were found
    if (insertedData.length > 0) {
      return res.status(200).json({ message: "Data saved successfully" });
    } else {
      return res.status(404).json({ message: "No Data Saved" });
    }
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ ICF Press-Off Api's ----------------------------------------------------------------------------

app.get("/icf/pressoff/getdata", async (req, res) => {
  const { axleNo } = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFPressOff.findAll({
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

app.get("/icf/pressoff/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFPressOff.findAll();

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

app.post("/icf/pressoff/data", async (req, res) => {
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
    await insertICFPressOffData(data);

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ ICF Schedule Pre-Inspection Form ----------------------------------------------------------------------------

const { insertICFPreInspectionData } = require("./helpers/ICFHepler.js"); // Adjust the path as needed
const ICFScheduledPreIinspection = require("./models/ICFScheduledPreIinspection.js");

app.post("/icf/preinsp/data", async (req, res) => {
  try {
    const result = await insertICFPreInspectionData(req.body);

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

app.get("/icf/preinsp/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFScheduledPreIinspection.findAll();

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

app.get("/icf/preinsp/getdata", async (req, res) => {
  const { shopSrNumber } = req.body;

  if (!shopSrNumber) {
    return res.status(400).json({ message: "WheelId is required" });
  }

  try {
    // Query the database to retrieve a record by WheelId
    const data = await ICFScheduledPreIinspection.findOne({
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

//--------------------------ICF Final Inspection Form--------------------------------------------------------------------------
const { insertICFFinalInspectionData } = require("./helpers/ICFHepler.js");

app.get("/preicf/getdata/:wheelid", async (req, res) => {
  const WheelID = req.params.wheelid;
  console.log(WheelID);
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFScheduledPreIinspection.findAll({
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

app.get("/icf/finalinspection/getdata", async (req, res) => {
  const { axleNo } = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFFinalInspection.findAll({
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

app.get("/icf/finalinspection/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFFinalInspection.findAll();

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

app.post("/icf/finalinspection/data", async (req, res) => {
  const requestData = req.body;

  try {
    // Call the helper function to insert data
    await insertICFFinalInspectionData(requestData);

    res.status(201).json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    res
      .status(500)
      .json({ message: "Error inserting data", error: error.message });
  }
});

//------------------------------ ICF Press-On Api's ----------------------------------------------------------------------------

app.get("/icf/presson/getdata", async (req, res) => {
  const { axleNo } = req.body;
  try {
    // Query the database to retrieve records based on the filename
    const wheelReport = await ICFPressOn.findAll({
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

app.get("/icf/presson/getalldata", async (req, res) => {
  try {
    // Query the database to retrieve all records from the LHBFinalInspection table
    const allData = await ICFPressOn.findAll();

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

app.post("/icf/presson/data", async (req, res) => {
  try {
    // Call the helper function to insert the data
    await insertPressOnDataICF(req.body);

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data to the database:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ Joint Inspection API ----------------------------------------------------------------------------
const { createJointInspection } = require("./helpers/JointInspectionHelper.js");
const JointInspection = require("./models/JointInspection.js");
const ICFPressOff = require("./models/ICFPressOff.js");
const ICFFinalInspection = require("./models/ICFFinalInspection.js");
const ICFPressOn = require("./models/ICFPressOn.js");
const EMUWearingClearance = require("./models/EMUWearingClearance.js");
const ICFWearingClearance = require("./models/ICFWearingClearance.js");
const ICFBearingRejection = require("./models/ICFBearingRejection.js");
const EMUBearingRejection = require("./models/EMUBearingRejection.js");
app.post("/jointinspection/add", async (req, res) => {
  const { wheelTypeId, WheelId, remark } = req.body;

  // Validate incoming data
  if (!WheelId || !remark || !wheelTypeId) {
    return res
      .status(400)
      .json({ message: "Wheelid, WheelTypeId and JointRemark are required" });
  }

  try {
    // Call the helper function to insert data into the database
    const newInspection = await createJointInspection(
      wheelTypeId,
      WheelId,
      remark
    );

    // Respond with the created record
    return res.status(201).json({
      message: "Joint inspection record created successfully",
      data: newInspection,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while saving the data" });
  }
});

app.get("/jointinspection/getdata", async (req, res) => {
  const { wheelTypeId, wheelid } = req.query; // Use req.query to fetch query parameters

  if (!wheelid) {
    return res.status(400).json({ message: "Wheelid (wheelno) is required" });
  }

  try {
    // Query the database to find records matching the provided Wheelid
    const jointInspectionData = await JointInspection.findAll({
      where: {
        Wheelid: wheelid, // Filter records by Wheelid (Wheelno in query params)
        WheelTypeId: wheelTypeId,
      },
    });

    if (jointInspectionData.length === 0) {
      return res
        .status(404)
        .json({ message: "No records found for the provided Wheelid" });
    }

    // Respond with the found records
    return res.status(200).json(jointInspectionData);
  } catch (error) {
    console.error("Error retrieving joint inspection data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/jointinspection/update", async (req, res) => {
  const { wheelTypeId, wheelid, JointRemark } = req.body; // Fetch JointRemark from request body

  if (!wheelid) {
    return res.status(400).json({ message: "Wheelid is required" });
  }

  if (!JointRemark) {
    return res.status(400).json({ message: "JointRemark is required" });
  }
  if (!wheelTypeId) {
    return res.status(400).json({ message: "WheelTypeId is required" });
  }

  try {
    // Find the record in the database by Wheelid
    const jointInspection = await JointInspection.findOne({
      where: {
        Wheelid: wheelid,
        WheelTypeId: wheelTypeId, // Add the condition for WheelTypeId
      },
    });

    if (!jointInspection) {
      return res
        .status(404)
        .json({ message: "No record found for the provided Wheelid" });
    }

    // Update the JointRemark for the found record
    jointInspection.JointRemark = JointRemark;

    // Save the updated record back to the database
    await jointInspection.save();

    // Respond with a success message
    return res.status(200).json({
      message: "JointRemark updated successfully",
      updatedRecord: jointInspection,
    });
  } catch (error) {
    console.error("Error updating joint inspection data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//------------------------------ Difference Page Api's -------------------------------------------------------------
// app.get("/api/lhb/getdiameterdifferences", async (req, res) => {
//   try {
//     const { diffRange, startDate, endDate } = req.query; // Get the filter range and dates from the query

//     // Ensure the start and end dates are in 'YYYY-MM-DD' format
//     const startDateFormatted = new Date(startDate).toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
//     const endDateFormatted = new Date(endDate).toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'

//     // Dynamically set the filter conditions for the range
//     let filterCondition = "";
//     switch (diffRange) {
//       case "1": // 0 - 0.2
//         filterCondition = `
//           AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) BETWEEN 0 AND 0.2
//           AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) BETWEEN 0 AND 0.2
//         `;
//         break;
//       case "2": // 0.2 - 0.5
//         filterCondition = `
//           AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) > 0.2
//           AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) > 0.2
//           AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) <= 0.5
//           AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) <= 0.5
//         `;
//         break;
//       case "3": // 0.5 and above
//         filterCondition = `
//           AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) >= 0.5
//           AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) >= 0.5
//         `;
//         break;
//       default:
//         filterCondition = ""; // No filter if no range is specified
//     }

//     const query = `
//       SELECT
//         LFB.wheelid,
//         LFB.WheelNo,
//         LFB.WheelDiaA,
//         LFB.WheelDiaB,
//         LPI.DiameterINA,
//         LPI.DiameterINB,
//         ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS WheelDiaA_float,
//         ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS WheelDiaB_float,
//         ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS DiameterINA_float,
//         ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS DiameterINB_float,
//         ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS diffA,
//         ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS diffB,
//         LFB.createdDate
//       FROM
//         LHBFinalInspection LFB
//       JOIN
//         LHBPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
//       WHERE
//         TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
//         AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
//         AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
//         AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
//         AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'  -- Strip time for comparison (>=)
//         AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'  -- Strip time for comparison (<=)
//         ${filterCondition}  -- Apply the range filter based on diffA and diffB
//     `;

//     // Execute the query
//     const data = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     // Check if any results are found
//     if (data.length === 0) {
//       return res.status(404).json({ message: "No matching records found" });
//     }

//     // Return the filtered data as JSON
//     res.json(data);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// app.get("/api/lhb/getdiameterdifferences", async (req, res) => {
//   try {
//     const { diffRange, startDate, endDate } = req.query; // Get the filter range and dates from the query

//     // Ensure the start and end dates are in 'YYYY-MM-DD' format
//     const startDateFormatted = new Date(startDate).toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'
//     const endDateFormatted = new Date(endDate).toISOString().split('T')[0]; // Converts to 'YYYY-MM-DD'

//     // Dynamically set the filter conditions for the range
//     let filterCondition = "";
//     switch (diffRange) {
//       case "1": // 0 - 0.2
//         filterCondition = `
//           AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) BETWEEN 0 AND 0.2
//           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) BETWEEN 0 AND 0.2
//         `;
//         break;
//       case "2": // 0.2 - 0.5
//         filterCondition = `
//           AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) > 0.2
//           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) > 0.2
//           AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) <= 0.5
//           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) <= 0.5
//         `;
//         break;
//       case "3": // 0.5 and above
//         filterCondition = `
//           AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) >= 0.5
//           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) >= 0.5
//         `;
//         break;
//       default:
//         filterCondition = ""; // No filter if no range is specified
//     }

//     const query = `
//       SELECT
//         LFB.wheelid,
//         LFB.WheelNo,
//         LFB.WheelDiaA,
//         LFB.WheelDiaB,
//         LPI.DiameterINA,
//         LPI.DiameterINB,
//         ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS WheelDiaA_float,
//         ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS WheelDiaB_float,
//         ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS DiameterINA_float,
//         ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS DiameterINB_float,
//         ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS diffA,  -- Change here
//         ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS diffB,  -- Change here
//         LFB.createdDate
//       FROM
//         LHBFinalInspection LFB
//       JOIN
//         LHBPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
//       WHERE
//         TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
//         AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
//         AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
//         AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
//         AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'  -- Strip time for comparison (>=)
//         AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'  -- Strip time for comparison (<=)
//         ${filterCondition}  -- Apply the range filter based on diffA and diffB
//     `;

//     // Execute the query
//     const data = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     // Check if any results are found
//     if (data.length === 0) {
//       return res.status(404).json({ message: "No matching records found" });
//     }

//     // Return the filtered data as JSON
//     res.json(data);
//   } catch (error) {
//     console.error("Error retrieving data:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

app.get("/api/lhb/getdiameterdifferences", async (req, res) => {
  try {
    const { diffRange, startDate, endDate } = req.query; // Get the filter range and dates from the query

    // Ensure the start and end dates are in 'YYYY-MM-DD' format
    const startDateFormatted = new Date(startDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
    const endDateFormatted = new Date(endDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'

    // Dynamically set the filter conditions for the range
    let filterCondition = "";
    switch (diffRange) {
      case "1": // 0 - 0.2
        filterCondition = `AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) BETWEEN 0 AND 0.2
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) BETWEEN 0 AND 0.2`;
        break;
      case "2": // 0.2 - 0.5
        filterCondition = `AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) > 0.2
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) > 0.2
                           AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) <= 0.5
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) <= 0.5`;
        break;
      case "3": // 0.5 and above
        filterCondition = `AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) >= 0.5
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) >= 0.5`;
        break;
      default:
        filterCondition = ""; // No filter if no range is specified
    }

    const query = `
      SELECT
        LFB.wheelid,
        LFB.WheelNo,
        LFB.WheelDiaA,
        LFB.WheelDiaB,
        LPI.DiameterINA,
        LPI.DiameterINB,
        ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS WheelDiaA_float,
        ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS WheelDiaB_float,
        ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS DiameterINA_float,
        ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS DiameterINB_float,
        ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS diffA,
        ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS diffB,
        LFB.createdDate
      FROM
        LHBFinalInspection LFB
      JOIN
        LHBPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
      WHERE
        TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
        AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'
        AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'
        ${filterCondition}
    `;

    // Execute the query to get diameter differences
    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Query to count total final inspection forms and count of forms for each diameter difference range
    const countQuery = `
      SELECT
  COUNT(*) AS totalForms,
  
  -- Count for diameter difference between 0 and 0.2
  SUM(CASE 
        WHEN ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) BETWEEN 0 AND 0.2
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) BETWEEN 0 AND 0.2
        THEN 1 
        ELSE 0 
      END) AS count_0_0_2,

  -- Count for diameter difference between 0.2 and 0.5
  SUM(CASE 
        WHEN ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) > 0.2
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) > 0.2
             AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) <= 0.5
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) <= 0.5
        THEN 1
        ELSE 0
      END) AS count_0_2_0_5,

  -- Count for diameter difference 0.5 and above
  SUM(CASE 
        WHEN ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) >= 0.5
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) >= 0.5
        THEN 1 
        ELSE 0
      END) AS count_0_5_above

FROM
  LHBFinalInspection LFB
JOIN
  LHBPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
WHERE
  TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
  AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
  AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
  AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
  AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'
  AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'

    `;

    // Execute the query to get the counts
    const countData = await sequelize.query(countQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if any results are found
    if (data.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    // Return the filtered data and count data as JSON
    res.json({
      data,
      totalForms: countData[0].totalForms,
      count_0_0_2: countData[0].count_0_0_2,
      count_0_2_0_5: countData[0].count_0_2_0_5,
      count_0_5_above: countData[0].count_0_5_above,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/vb/getdiameterdifferences", async (req, res) => {
  try {
    const { diffRange, startDate, endDate } = req.query; // Get the filter range and dates from the query

    // Ensure the start and end dates are in 'YYYY-MM-DD' format
    const startDateFormatted = new Date(startDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
    const endDateFormatted = new Date(endDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'

    // Dynamically set the filter conditions for the range
    let filterCondition = "";
    switch (diffRange) {
      case "1": // 0 - 0.2
        filterCondition = `AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) BETWEEN 0 AND 0.2
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) BETWEEN 0 AND 0.2`;
        break;
      case "2": // 0.2 - 0.5
        filterCondition = `AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) > 0.2
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) > 0.2
                           AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) <= 0.5
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) <= 0.5`;
        break;
      case "3": // 0.5 and above
        filterCondition = `AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) >= 0.5
                           AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) >= 0.5`;
        break;
      default:
        filterCondition = ""; // No filter if no range is specified
    }

    const query = `
      SELECT
        LFB.wheelid,
        LFB.WheelNo,
        LFB.WheelDiaA,
        LFB.WheelDiaB,
        LPI.DiameterINA,
        LPI.DiameterINB,
        ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS WheelDiaA_float,
        ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS WheelDiaB_float,
        ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS DiameterINA_float,
        ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS DiameterINB_float,
        ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS diffA,
        ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS diffB,
        LFB.createdDate
      FROM
        VBFinalInspection LFB
      JOIN
        VBPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
      WHERE
        TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
        AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'
        AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'
        ${filterCondition}
    `;

    // Execute the query to get diameter differences
    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Query to count total final inspection forms and count of forms for each diameter difference range
    const countQuery = `
      SELECT
  COUNT(*) AS totalForms,
  
  -- Count for diameter difference between 0 and 0.2
  SUM(CASE 
        WHEN ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) BETWEEN 0 AND 0.2
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) BETWEEN 0 AND 0.2
        THEN 1 
        ELSE 0 
      END) AS count_0_0_2,

  -- Count for diameter difference between 0.2 and 0.5
  SUM(CASE 
        WHEN ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) > 0.2
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) > 0.2
             AND ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) <= 0.5
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) <= 0.5
        THEN 1
        ELSE 0
      END) AS count_0_2_0_5,

  -- Count for diameter difference 0.5 and above
  SUM(CASE 
        WHEN ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT) - TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) >= 0.5
             AND ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT) - TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) >= 0.5
        THEN 1 
        ELSE 0
      END) AS count_0_5_above

FROM
  VBFinalInspection LFB
JOIN
  VBPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
WHERE
  TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
  AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
  AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
  AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
  AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'
  AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'

    `;

    // Execute the query to get the counts
    const countData = await sequelize.query(countQuery, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if any results are found
    if (data.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    // Return the filtered data and count data as JSON
    res.json({
      data,
      totalForms: countData[0].totalForms,
      count_0_0_2: countData[0].count_0_0_2,
      count_0_2_0_5: countData[0].count_0_2_0_5,
      count_0_5_above: countData[0].count_0_5_above,
    });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/emu/getdiameterdifferences", async (req, res) => {
  try {
    const { diffRange, startDate, endDate } = req.query; // Get the filter range and dates from the query

    // Ensure the start and end dates are in 'YYYY-MM-DD' format
    const startDateFormatted = new Date(startDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
    const endDateFormatted = new Date(endDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'

    // Dynamically set the filter conditions for the range
    let filterCondition = "";
    switch (diffRange) {
      case "1": // 0 - 0.2
        filterCondition = `
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) BETWEEN 0 AND 0.2
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) BETWEEN 0 AND 0.2
        `;
        break;
      case "2": // 0.2 - 0.5
        filterCondition = `
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) > 0.2
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) > 0.2
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) <= 0.5
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) <= 0.5
        `;
        break;
      case "3": // 0.5 and above
        filterCondition = `
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) >= 0.5
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) >= 0.5
        `;
        break;
      default:
        filterCondition = ""; // No filter if no range is specified
    }

    const query = `
      SELECT
        LFB.wheelid,
        LFB.WheelNo,
        LFB.WheelDiaA,
        LFB.WheelDiaB,
        LPI.DiameterINA,
        LPI.DiameterINB,
        ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS WheelDiaA_float,
        ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS WheelDiaB_float,
        ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS DiameterINA_float,
        ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS DiameterINB_float,
        ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS diffA,
        ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS diffB,
        LFB.createdDate
      FROM
        EMUFinalInspection LFB
      JOIN
        EMUPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
      WHERE
        TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
        AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'  -- Strip time for comparison (>=)
        AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'  -- Strip time for comparison (<=)
        ${filterCondition}  -- Apply the range filter based on diffA and diffB
    `;

    // Execute the query
    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if any results are found
    if (data.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    // Return the filtered data as JSON
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/icf/getdiameterdifferences", async (req, res) => {
  try {
    const { diffRange, startDate, endDate } = req.query; // Get the filter range and dates from the query

    // Ensure the start and end dates are in 'YYYY-MM-DD' format
    const startDateFormatted = new Date(startDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'
    const endDateFormatted = new Date(endDate).toISOString().split("T")[0]; // Converts to 'YYYY-MM-DD'

    // Dynamically set the filter conditions for the range
    let filterCondition = "";
    switch (diffRange) {
      case "1": // 0 - 0.2
        filterCondition = `
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) BETWEEN 0 AND 0.2
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) BETWEEN 0 AND 0.2
        `;
        break;
      case "2": // 0.2 - 0.5
        filterCondition = `
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) > 0.2
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) > 0.2
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) <= 0.5
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) <= 0.5
        `;
        break;
      case "3": // 0.5 and above
        filterCondition = `
          AND ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) >= 0.5
          AND ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) >= 0.5
        `;
        break;
      default:
        filterCondition = ""; // No filter if no range is specified
    }

    const query = `
      SELECT
        LFB.wheelid,
        LFB.WheelNo,
        LFB.WheelDiaA,
        LFB.WheelDiaB,
        LPI.DiameterINA,
        LPI.DiameterINB,
        ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT), 2) AS WheelDiaA_float,
        ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT), 2) AS WheelDiaB_float,
        ROUND(TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS DiameterINA_float,
        ROUND(TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS DiameterINB_float,
        ROUND(TRY_CAST(LFB.WheelDiaA AS FLOAT) - TRY_CAST(LPI.DiameterINA AS FLOAT), 2) AS diffA,
        ROUND(TRY_CAST(LFB.WheelDiaB AS FLOAT) - TRY_CAST(LPI.DiameterINB AS FLOAT), 2) AS diffB,
        LFB.createdDate
      FROM
        ICFFinalInspection LFB
      JOIN
        ICFPreIinspection LPI ON LFB.wheelid = LPI.Wheelid
      WHERE
        TRY_CAST(LFB.WheelDiaA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LFB.WheelDiaB AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINA AS FLOAT) IS NOT NULL
        AND TRY_CAST(LPI.DiameterINB AS FLOAT) IS NOT NULL
        AND CONVERT(DATE, LFB.createdDate) >= '${startDateFormatted}'  -- Strip time for comparison (>=)
        AND CONVERT(DATE, LFB.createdDate) <= '${endDateFormatted}'  -- Strip time for comparison (<=)
        ${filterCondition}  -- Apply the range filter based on diffA and diffB
    `;

    // Execute the query
    const data = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    // Check if any results are found
    if (data.length === 0) {
      return res.status(404).json({ message: "No matching records found" });
    }

    // Return the filtered data as JSON
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//------------------------------ Report Page API ----------------------------------------------------------------------------

app.get("/fetchData", async (req, res) => {
  const { startdate, enddate, tablename } = req.query;

  if (!startdate || !enddate || !tablename) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  // Convert the start and end date to Date objects
  let formattedStartDate = new Date(startdate);
  let formattedEndDate = new Date(enddate);

  // Ensure that the date format is valid
  if (isNaN(formattedStartDate) || isNaN(formattedEndDate)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  // Strip the time portion by resetting the hours, minutes, seconds, and milliseconds for the start date
  formattedStartDate.setHours(0, 0, 0, 0); // Set to 00:00:00

  // To include all records for the end date, set the time to the very end of that day (23:59:59.999)
  formattedEndDate.setHours(23, 59, 59, 999); // Set to 23:59:59.999

  // Ensure the end date includes all of the day, as it will now include data from the full end date (e.g., December 16th)
  const startDateString = formattedStartDate.toISOString().split("T")[0]; // "2024-12-04"
  const endDateString = formattedEndDate.toISOString().split("T")[0]; // "2024-12-16"

  // Ensure that the table name is set correctly based on input
  let TableName = tablename;
  if (TableName === "LHBPreIinspection") {
    TableName = "LHBScheduledPreIinspection";
  } else if (TableName === "EMUPreIinspection") {
    TableName = "EMUScheduledPreIinspection";
  } else if (TableName === "ICFPreIinspection") {
    TableName = "ICFScheduledPreIinspection";
  }

  try {
    const model = sequelize.models[TableName];

    if (!model) {
      return res.status(400).json({ message: "Invalid table name" });
    }

    // Query the database using the formatted start and end date strings
    const result = await model.findAll({
      where: {
        createdDate: {
          [Op.gte]: formattedStartDate, // Include the start date
          [Op.lte]: formattedEndDate, // Include the end date (with time 23:59:59.999)
        },
      },
    });

    // Return the results
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//------------------------------ Repeated wheels API ----------------------------------------------------------------------------

app.get("/repeated-wheels", async (req, res) => {
  try {
    const { startDate, endDate, wheelTypeId } = req.query;

    // Parse the dates from the request (make sure they are valid dates)
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate the inputs
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date range." });
    }

    // Choose the appropriate model based on wheelTypeId
    let model;
    switch (wheelTypeId) {
      case "1":
        model = LHBFinalInspection; // Use LHBFinalInspection for wheelTypeId 1
        break;
      case "2":
        model = ICFFinalInspection; // Use ICFFinalInspection for wheelTypeId 2
        break;
      case "4":
        model = EMUFinalInspection; // Use EMUFinalInspection for wheelTypeId 4
        break;
      case "3":
        model = VBFinalInspection; // Use VBFinalInspection for wheelTypeId 3
        break;
      default:
        return res.status(400).json({ message: "Invalid wheelTypeId." });
    }

    // Query to find the repeated wheel numbers within a 7-day window
    const repeatedWheels = await model.findAll({
      where: {
        WheelTypeId: wheelTypeId,
        createdDate: {
          [Op.between]: [start, end], // Filter by the given time range
        },
        isActive: true, // Make sure only active records are included
      },
      order: [
        ["WheelNo", "ASC"], // Sort by WheelNo to make it easier to process in 7-day windows
        ["createdDate", "ASC"], // Sort by createdDate
      ],
    });

    // We'll use this array to store the results of repeated wheels with their times
    const repeatedWheelData = [];
    const wheelMap = {};

    // Process the result to detect repeated wheel numbers in a 7-day period
    for (let i = 0; i < repeatedWheels.length; i++) {
      const currentWheel = repeatedWheels[i];

      // If the WheelNo doesn't exist in wheelMap, initialize an empty array for its createdDate
      if (!wheelMap[currentWheel.WheelNo]) {
        wheelMap[currentWheel.WheelNo] = [];
      }

      // Check the current wheel's createdDate with the last occurrence of the same WheelNo
      const wheelDates = wheelMap[currentWheel.WheelNo];

      // Compare this entry's date with previous entries
      for (let j = 0; j < wheelDates.length; j++) {
        const lastDate = new Date(wheelDates[j]);

        // If the current entry's date and any past date are within 7 days, it's a repeat
        if (currentWheel.createdDate - lastDate <= 7 * 24 * 60 * 60 * 1000) {
          // Only add if it's not already included
          const existingEntry = repeatedWheelData.find(
            (entry) => entry.WheelNo === currentWheel.WheelNo
          );

          if (!existingEntry) {
            repeatedWheelData.push({
              WheelNo: currentWheel.WheelNo,
              repeatTimes: [lastDate, currentWheel.createdDate], // Add both the dates
            });
          }
          break;
        }
      }

      // Store the createdDate for comparison with future records
      wheelDates.push(currentWheel.createdDate);
    }

    return res.status(200).json({
      repeatedWheelData, // Send the repeated wheel data with both repetition times
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
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

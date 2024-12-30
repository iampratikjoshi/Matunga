const JointInspection = require("../models/JointInspection"); // Import the model

// Function to insert new joint inspection data
const createJointInspection = async (WheelTypeId, Wheelid, JointRemark) => {
  try {
    // Insert the new record into the database
    const newInspection = await JointInspection.create({
      WheelTypeId,
      Wheelid,
      JointRemark,
    });

    return newInspection; // Return the created record
  } catch (error) {
    console.error("Error inserting joint inspection:", error);
    throw new Error("Error inserting joint inspection");
  }
};

module.exports = {
  createJointInspection,
};

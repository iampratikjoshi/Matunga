// import React, { useState } from 'react';
// import * as XLSX from 'xlsx'; // for parsing Excel files
// import api from './Axios/AxiosConnection';
// import '../resources/ImportData/importdata.css'; // Import the CSS file

// const ImportData = () => {
//   const [excelData, setExcelData] = useState([]);
//   const [alertMessage, setAlertMessage] = useState('');

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Read the uploaded Excel file
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const binaryStr = event.target.result;
//       const wb = XLSX.read(binaryStr, { type: 'binary' });

//       // Assuming the first sheet is what we want
//       const sheetName = wb.SheetNames[0];
//       const sheet = wb.Sheets[sheetName];

//       // Convert sheet data to JSON format
//       const data = XLSX.utils.sheet_to_json(sheet);
//       setExcelData(data);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleUploadToDB = async () => {
//     // Send the parsed data to the backend
//     try {
//       const response = await api.post('/api/insert-data', { data: excelData });

//       const result = await response.data;
//       if (result) {
//         setAlertMessage('Data uploaded successfully!');
//       } else {
//         setAlertMessage('Error uploading data');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setAlertMessage('Error uploading data');
//     }
//   };

//   return (
//     <div className="import-container">
//       <div className="upload-title">Upload Excel Data</div>
//       <div className="upload-description">
//         Please upload an Excel file to insert data into the database.
//       </div>

//       <div className="upload-input">
//         <input
//           type="file"
//           accept=".xlsx,.xls"
//           onChange={handleFileUpload}
//         />
//       </div>

//       <button className="upload-button" onClick={handleUploadToDB}>
//         Upload to Database
//       </button>

//       {alertMessage && <div className="alert">{alertMessage}</div>}
//     </div>
//   );
// };

// export default ImportData;

import React, { useState } from "react";
import * as XLSX from "xlsx";
import api from "./Axios/AxiosConnection"; // Adjust the import based on your file structure
import "../resources/ImportData/importdata.css"; // Import the CSS file
import { Atom } from "react-loading-indicators";

function ImportData() {
  const [file, setFile] = useState(null);
  const [wheelType, setWheelType] = useState("");
  const [wheelStage, setWheelStage] = useState("");
  const [excelData, setExcelData] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    // Read the uploaded Excel file
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const wb = XLSX.read(binaryStr, { type: "binary" });

      // Assuming the first sheet is what we want
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];

      // Convert sheet data to JSON format
      const data = XLSX.utils.sheet_to_json(sheet);
      setExcelData(data);
    };
    reader.readAsBinaryString(uploadedFile);
  };

  const handleUploadToDB = async () => {
    if (!excelData || !wheelType || !wheelStage) {
      alert("Please select a file, wheel type, and wheel stage.");
      return;
    }
    setLoading(true); // Set loading to true when upload starts
    let apiEndpoint = "";

    if (wheelType === "LHB") {
      if (wheelStage === "Schedule Pre-Inspection") {
        apiEndpoint = "/lhbpreinspection/upload";
      } else if (wheelStage === "Press On") {
        apiEndpoint = "/lhbpresson/upload";
      } else if (wheelStage === "Press Off") {
        apiEndpoint = "/lhbpressoff/upload";
      } else if (wheelStage === "Final Inspection") {
        apiEndpoint = "/lhbfinalinspection/upload";
      }
    } else if (wheelType === "EMU") {
      if (wheelStage === "Schedule Pre-Inspection") {
        apiEndpoint = "/emupreinspection/upload";
      } else if (wheelStage === "Press On") {
        apiEndpoint = "/emupresson/upload";
      } else if (wheelStage === "Press Off") {
        apiEndpoint = "/emupressoff/upload";
      } else if (wheelStage === "Final Inspection") {
        apiEndpoint = "/emufinalinspection/upload";
      }
    } else if (wheelType === "ICF") {
      if (wheelStage === "Schedule Pre-Inspection") {
        apiEndpoint = "/icfpreinspection/upload";
      } else if (wheelStage === "Press On") {
        apiEndpoint = "/icfpresson/upload";
      } else if (wheelStage === "Press Off") {
        apiEndpoint = "/icfpressoff/upload";
      } else if (wheelStage === "Final Inspection") {
        apiEndpoint = "/icffinalinspection/upload";
      }
    } else if (wheelType === "VB") {
      if (wheelStage === "Schedule Pre-Inspection") {
        apiEndpoint = "/vbpreinspection/upload";
      } else if (wheelStage === "Press On") {
        apiEndpoint = "/vbpresson/upload";
      } else if (wheelStage === "Press Off") {
        apiEndpoint = "/vbpressoff/upload";
      } else if (wheelStage === "Final Inspection") {
        apiEndpoint = "/vbfinalinspection/upload";
      }
    }

    try {
      const response = await api.post(apiEndpoint, { data: excelData });

      const result = await response.data;
      if (result) {
        alert(
          result.message + "\n" + result.insertedCount + " records inserted"
        );
        setExcelData([]);
      } else {
        alert("Error uploading data");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Set loading to false when upload finishes
    }
  };

  return (
    <div className="import-container">
      <div className="upload-title">Upload Excel Data</div>
      <div className="upload-description">
        Please upload an Excel file to insert data into the database.
      </div>

      <div className="upload-input">
        <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      </div>

      <div className="dropdowns">
        <select
          value={wheelType}
          onChange={(e) => setWheelType(e.target.value)}
        >
          <option value="">Select Type of Wheel</option>
          <option value="LHB">LHB</option>
          <option value="EMU">EMU</option>
          <option value="ICF">ICF</option>
          <option value="VB">VB</option>
        </select>

        <select
          value={wheelStage}
          onChange={(e) => setWheelStage(e.target.value)}
        >
          <option value="">Select Wheel Stage</option>
          <option value="Schedule Pre-Inspection">
            Schedule Pre-Inspection
          </option>
          <option value="Press On">Press On</option>
          <option value="Press Off">Press Off</option>
          <option value="Final Inspection">Final Inspection</option>
        </select>
      </div>

      <button
        className="upload-button"
        onClick={handleUploadToDB}
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload to Database"}
      </button>

      {loading && (
        <div className="report-loading">
          <Atom color="#3155cc" size="small" text="" textColor="" />
        </div>
      )}
    </div>
  );
}

export default ImportData;

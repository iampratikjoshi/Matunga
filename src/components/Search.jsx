import React, { useState } from "react";
import "../resources/Search/search.css";
import api from "./Axios/AxiosConnection";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FaPen } from "react-icons/fa";

const Search = () => {
  // States to manage search input and results
  const [wheelNo, setWheelNo] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [wheelTypeId, setWheelTypeId] = useState("");
  const [defectName, setDefectName] = useState("");
  // const [stageName, setStageName] = useState("");
  const [results, setResults] = useState([]);

  // State to handle the remark input
  const [remarks, setRemarks] = useState({}); // Store remarks by WheelNo
  const [editingRemark, setEditingRemark] = useState(null); // Track which remark is being edited
  const [updatedRemark, setUpdatedRemark] = useState(""); // Track the updated remark text

  // Function to handle adding remarks to a specific result
  const handleAddRemark = async (WheelId) => {
    const remark = remarks[WheelId]; // Get the remark for this WheelNo
    if (!remark) return; // Do nothing if the remark is empty

    try {
      // Post request to add the remark
      await api.post("/jointinspection/add", { wheelTypeId, WheelId, remark });

      // Fetch the updated data after inserting the remark
      await handleSearch();
    } catch (error) {
      console.error("Error adding remark:", error);
    }
  };

  // Function to handle updating a remark
  const handleUpdateRemark = async (WheelId) => {
    if (!updatedRemark) return; // Do nothing if the updated remark is empty

    try {
      // API call to update the remark
      await api.put("/jointinspection/update", {
        wheelTypeId: wheelTypeId,
        wheelid: WheelId,
        JointRemark: updatedRemark,
      });

      // After updating, reset the editing state and refresh the data
      setEditingRemark(null);
      setUpdatedRemark("");
      await handleSearch();
    } catch (error) {
      console.error("Error updating remark:", error);
    }
  };

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      setResults([]);
      const params = {};
      if (wheelNo) params.wheelNo = wheelNo;
      if (timeRange) params.timeRange = timeRange;
      if (defectName) params.defectName = defectName;
      // if (stageName) params.stageName = stageName;

      let apiEndpoint = "";  // Default API endpoint

      if (wheelTypeId === "1") {
        apiEndpoint = "/lhbinspection/getalldata";
      } else if (wheelTypeId === "2") {
        apiEndpoint = "/icfinspection/getalldata";
      } else if (wheelTypeId === "4") {
        apiEndpoint = "/emuinspection/getalldata";
      } else if (wheelTypeId === "3") {
        apiEndpoint = "/vbinspection/getalldata";
      }

      // Call the API and pass the selected parameters
      const response = await api.get(apiEndpoint, {
        params,
      });

      if (response.data && response.data.length > 0) {
        setResults(response.data);
      } else {
        setResults([]); // Clear the results if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const tableColumn = [
      "Sr. No.",
      "Wheel No.",
      "BRG Detail A",
      "BRG Detail B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "BRG Make A",
      "BRG Make B",
      "MTN Remark A",
      "MTN Remark B",
      "Timestamp",
      "Remark",
    ];

    const tableRows = results.map((item, index) => {
      const [datePart, timePart] = item.Timestamp.split("T");
      const formattedDate = datePart.split("-").reverse().join("-");
      const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

      return [
        index + 1,
        item.WheelNo || item.ShopSrNumber,
        item.BRGDetailA,
        item.BRGDetailB,
        item.RefurbishmentDetailsA,
        item.RefurbishmentDetailsB,
        item.BRGMakeA,
        item.BRGMakeB,
        item.MTNRemarkA,
        item.MTNRemarkB,
        formattedTimestamp,
        item.Remark || "",
      ];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startX: 10,
      startY: 30,
      theme: "grid",
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        fontSize: 6,
      },
      styles: {
        overflow: "linebreak",
        fontSize: 6,
        cellWidth: "wrap",
      },
    });

    doc.save("Search_Results.pdf");
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBFinalInspection");

    worksheet.columns = [
      { header: "Sr. No.", key: "SrNo", width: 10 },
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "BRG Detail A", key: "BRGDetailA", width: 30 },
      { header: "BRG Detail B", key: "BRGDetailB", width: 30 },
      {
        header: "Refurbishment Details A",
        key: "RefurbishmentDetailsA",
        width: 30,
      },
      {
        header: "Refurbishment Details B",
        key: "RefurbishmentDetailsB",
        width: 30,
      },
      { header: "BRG Make A", key: "BRGMakeA", width: 20 },
      { header: "BRG Make B", key: "BRGMakeB", width: 20 },
      { header: "MTN Remark A", key: "MTNRemarkA", width: 30 },
      { header: "MTN Remark B", key: "MTNRemarkB", width: 30 },
      { header: "Timestamp", key: "Timestamp", width: 20 },
      { header: "Remark", key: "Remark", width: 20 },
    ];

    // Apply styles to header row (bold and gray background)
    const headerRow = worksheet.getRow(1); // First row will be headers
    headerRow.font = { bold: true }; // Set font to bold
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F0F0F0" }, // Apply gray background color (#F0F0F0)
    };
    headerRow.alignment = { horizontal: "center", vertical: "middle" }; // Center align the text

    // Apply border to header cells
    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    headerRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    // Add the data rows
    results.forEach((item, index) => {
      const [datePart, timePart] = item.Timestamp.split("T");
      const formattedDate = datePart.split("-").reverse().join("-");
      const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

      const row = worksheet.addRow({
        SrNo: index + 1,
        WheelNo: item.WheelNo || item.ShopSrNumber,
        BRGDetailA: item.BRGDetailA,
        BRGDetailB: item.BRGDetailB,
        RefurbishmentDetailsA: item.RefurbishmentDetailsA,
        RefurbishmentDetailsB: item.RefurbishmentDetailsB,
        BRGMakeA: item.BRGMakeA,
        BRGMakeB: item.BRGMakeB,
        MTNRemarkA: item.MTNRemarkA,
        MTNRemarkB: item.MTNRemarkB,
        Timestamp: formattedTimestamp,
        Remark: item.Remark || "",
      });

      // Apply center alignment and borders to each cell in the data row
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = borderStyle; // Apply borders to data cells
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Joint Inspection.xlsx");
  };

  const exportToCSV = async () => {
    // Create an array of column headers
    const headers = [
      "Sr. No.",
      "Wheel No.",
      "BRG Detail A",
      "BRG Detail B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "BRG Make A",
      "BRG Make B",
      "MTN Remark A",
      "MTN Remark B",
      "Timestamp",
      "Remark",
    ];

    // Create the CSV content starting with headers
    let csvContent = headers.join(",") + "\n"; // Headers are separated by commas, and followed by a newline

    // Add the data rows
    results.forEach((item, index) => {
      const [datePart, timePart] = item.Timestamp.split("T");
      const formattedDate = datePart.split("-").reverse().join("-"); // Format date as DD-MM-YYYY
      const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`; // Include time up to seconds

      const row = [
        index + 1, // Sr No
        item.WheelNo || item.ShopSrNumber, // WheelNo (fallback to ShopSrNumber if WheelNo is not available)
        item.BRGDetailA,
        item.BRGDetailB,
        item.RefurbishmentDetailsA,
        item.RefurbishmentDetailsB,
        item.BRGMakeA,
        item.BRGMakeB,
        item.MTNRemarkA,
        item.MTNRemarkB,
        formattedTimestamp,
        item.Remark || "",
      ];

      // Join each row's data with commas and add it to the CSV content
      csvContent += row.map((value) => `"${value}"`).join(",") + "\n"; // Escape any commas in data with quotes
    });

    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Use FileSaver to save the file
    saveAs(blob, "Joint Inspection.csv");
  };

  return (
    <div className="report-container">
      <div className="search-div-pending">
        <div className="search-container">
          <label>Wheel No. :</label>
          <input
            type="text"
            placeholder="Search by Wheel No."
            value={wheelNo}
            onChange={(e) => setWheelNo(e.target.value)}
          />
        </div>
        <div className="search-container">
          <label>Time Range :</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="">Select Time Range</option>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="1Month">1 Month</option>
            <option value="1Year">1 Year</option>
          </select>
        </div>
        <div className="search-container">
          <label>Defect :</label>
          <select
            value={defectName}
            onChange={(e) => setDefectName(e.target.value)}
          >
            <option value="">Select Defect</option>
            <option value="ST">ST</option>
            <option value="HEAT CHECK">HEAT CHECK</option>
            <option value="RIM FLAW">RIM FLAW</option>
            <option value="BEARING SOUND">BEARING SOUND</option>
            <option value="HOT AXEL">HOT AXEL</option>
            <option value="WHEEL SHEELING">WHEEL SHEELING</option>
            <option value="SHATTERED RIM">SHATTERED RIM</option>
            <option value="METAL CHIP OFF">METAL CHIP OFF</option>
            <option value="SKIDDED">SKIDDED</option>
            <option value="FLAT TYRE">FLAT TYRE</option>
            <option value="SEAL DENT">SEAL DENT</option>
            <option value="SEAL DAMAGE">SEAL DAMAGE</option>
            <option value="BEARING JAM">BEARING JAM</option>
            <option value="SPREAD RIM">SPREAD RIM</option>
            <option value="GREASE OOZING">GREASE OOZING</option>
            <option value="OMRS">OMRS</option>
            <option value="WILD">WILD</option>
          </select>
        </div>
        <div className="search-container">
          <label>Type of Wheel :</label>
          <select
            value={wheelTypeId}
            onChange={(e) => setWheelTypeId(e.target.value)}
          >
            <option value="">Select Type Of Wheel</option>
            <option value="1">LHB</option>
            <option value="4">EMU</option>
            <option value="2">ICF</option>
            <option value="3">VB</option>
          </select>
        </div>
        <div>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <h1 className="report-title">Joint Inspection of Wheels</h1>
      <div className="table-container">
        {results.length > 0 ? (
          <div className="table_div">
            <div className="button_div">
              <button
                className="export-btn"
                onClick={exportToPDF}
                disabled={results.length === 0}
              >
                Export to PDF
              </button>
              <button
                className="export-btn"
                onClick={exportToExcel}
                disabled={results.length === 0}
              >
                Export to Excel
              </button>
              <button
                className="export-btn"
                onClick={exportToCSV}
                disabled={results.length === 0}
              >
                Export to CSV
              </button>
            </div>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Wheel No.</th>
                  <th>BRG Detail A</th>
                  <th>BRG Detail B</th>
                  <th>Refurbishment Details A</th>
                  <th>Refurbishment Details B</th>
                  <th>BRG Make A</th>
                  <th>BRG Make B</th>
                  <th>MTN Remark A</th>
                  <th>MTN Remark B</th>
                  <th>Timestamp</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => {
                  const [datePart, timePart] = item.Timestamp.split("T");
                  const formattedDate = datePart.split("-").reverse().join("-");
                  const formattedTimestamp = `${formattedDate} ${timePart.slice(
                    0,
                    8
                  )}`;

                  return (
                    <tr key={item.WheelNo}>
                      <td>{index + 1}</td> {/* Sr. No. */}
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{item.BRGDetailA}</td>
                      <td>{item.BRGDetailB}</td>
                      <td>{item.RefurbishmentDetailsA}</td>
                      <td>{item.RefurbishmentDetailsB}</td>
                      <td>{item.BRGMakeA}</td>
                      <td>{item.BRGMakeB}</td>
                      <td>{item.MTNRemarkA}</td>
                      <td>{item.MTNRemarkB}</td>
                      <td>{formattedTimestamp}</td>
                      <td>
                        {editingRemark === item.WheelId ? (
                          <div>
                            <input
                              type="text"
                              value={
                                updatedRemark || remarks[item.WheelId] || ""
                              }
                              onChange={(e) => setUpdatedRemark(e.target.value)}
                            />
                            <button
                              style={{
                                marginLeft: "10px",
                              }}
                              onClick={() => handleUpdateRemark(item.WheelId)}
                            >
                              Update Remark
                            </button>
                          </div>
                        ) : (
                          <div>
                            {item.Remark ? (
                              <>
                                <span>{item.Remark}</span>
                                {/* Pencil icon for editing */}
                                <FaPen
                                  style={{
                                    cursor: "pointer",
                                    color: "blue",
                                    marginLeft: "10px",
                                    fontSize: "18px", // Adjust size if necessary
                                  }}
                                  onClick={() => {
                                    setEditingRemark(item.WheelId);
                                    setUpdatedRemark(item.Remark); // Pre-fill the current remark for editing
                                  }}
                                />
                              </>
                            ) : (
                              <div>
                                <input
                                  type="text"
                                  value={remarks[item.WheelId] || ""}
                                  onChange={(e) =>
                                    setRemarks({
                                      ...remarks,
                                      [item.WheelId]: e.target.value,
                                    })
                                  }
                                />
                                <button
                                  style={{
                                    marginLeft: "10px",
                                  }}
                                  onClick={() => handleAddRemark(item.WheelId)}
                                >
                                  Add Remark
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: "center", color:"black" }}>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;

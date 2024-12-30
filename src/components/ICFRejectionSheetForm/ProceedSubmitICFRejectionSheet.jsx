import React from "react";
// import "../../resources/LHB/lhbdivisionInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitEMURejectionSheet = ({ formDataRejectionSheetICF, setFormDataRejectionSheetICF }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/bearingrejectionicf/data", formDataRejectionSheetICF);
      console.log(response.WheelNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataRejectionSheetICF((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 6,
          WheeltypeId: 2,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryicfrejectionsheet");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/bearingrejectionicf/data", formDataRejectionSheetICF);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataRejectionSheetICF((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 6,
          WheeltypeId: 2,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryicfrejectionsheet");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

    const loginInfo = localStorage.getItem('loggedInUser')
      ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ICFRejectionSheetForm");

    worksheet.columns = [
      { header: "Bearing No.", key: "BearingNo", width: 10 },
      { header: "Make.", key: "Make", width: 30 },
      { header: "Code/Year of MFG", key: "CodeorYearofMFG", width: 30 },
      { header: "Date of Rejection", key: "DateofRejection", width: 30 },
      { header: "Date Last Inspection", key: "DateLastInspection", width: 30 },
      { header: "Date Of Initial Fitment", key: "DateOfInitialFitment", width: 30 },
      { header: "Life Of Bearing", key: "LifeOfBearing", width: 30 },
      { header: "Cause Of Rejection", key: "CauseOfRejection", width: 30 },
      { header: "Workshop Name", key: "workshopName", width: 10 },
      { header: "Logged in as", key: "loginInfo", width: 10 },
      { header: "Time of Export", key: "formattedDate", width: 10 },
    ];

    // Add header rows
    worksheet.addRow({
      BearingNo: formDataRejectionSheetICF.BearingNo,
      Make: formDataRejectionSheetICF.Make,
      CodeorYearofMFG: formDataRejectionSheetICF.CodeorYearofMFG,
      DateofRejection: formDataRejectionSheetICF.DateofRejection,
      DateLastInspection: formDataRejectionSheetICF.DateLastInspection,
      DateOfInitialFitment: formDataRejectionSheetICF.DateOfInitialFitment,
      LifeOfBearing: formDataRejectionSheetICF.LifeOfBearing,
      CauseOfRejection: formDataRejectionSheetICF.CauseOfRejection,
      workshopName: workshopName,
      loginInfo: loginInfo,
      formattedDate: formattedDate,
    });

    // Apply styles to headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Apply border style to header row
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length + 5;
    });

    // Adjust row height
    worksheet.getRow(1).height = 20;

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ICFRejectionSheetForm.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    // Define the headers, including subheaders for columns with subcolumns
    const tableColumn = [
      [
        { content: "Bearing No.", rowSpan: 1 },
        { content: "Make.", rowSpan: 1 },
        { content: "Code/Year of MFG", rowSpan: 1 },
        { content: "Date of Rejection", rowSpan: 1 },
        { content: "Date Last Inspection", rowSpan: 1 },
        { content: "Date Of Initial Fitment", rowSpan: 1 },
        { content: "Life Of Bearing", rowSpan: 1 },
        { content: "Cause Of Rejection", rowSpan: 1 },
      ],
    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [

        formDataRejectionSheetICF.BearingNo,
        formDataRejectionSheetICF.Make,
        formDataRejectionSheetICF.CodeorYearofMFG,
        formDataRejectionSheetICF.DateofRejection,
        formDataRejectionSheetICF.DateLastInspection,
        formDataRejectionSheetICF.DateOfInitialFitment,
        formDataRejectionSheetICF.LifeOfBearing,
        formDataRejectionSheetICF.CauseOfRejection,
      ],
    ];

    // Set autoTable configuration

    doc.autoTable({
      head: tableColumn,
      body: tableRows,
      startX: 10,
      startY: 30,
      tableWidth: "auto", // Automatically adjusts the width to fit the page
      tableHeight: doc.internal.pageSize.getHeight() - 20,
      theme: "grid",
      headStyles: {
        fillColor: [0, 0, 0], // Color for the table header
        halign: "center",
        valign: "middle",
        fontSize: 8, // Adjusted to fit more content
        cellPadding: 3,
      },
      styles: {
        overflow: "linebreak", // Wrap text in cells
        fontSize: 7, // Adjust font size to reduce the table width
        cellWidth: "wrap", // Allow cells to wrap text
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        // Adjusting column widths to ensure the table fits on the page
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
        2: { cellWidth: 90 },
        3: { cellWidth: 90 },
        4: { cellWidth: 90 },
        5: { cellWidth: 90 },
        6: { cellWidth: 90 },
        7: { cellWidth: 90 },
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "ICF Rejection Sheet Form Report",
            data.settings.margin.left,
            20
          );
        }
        const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';
        const loginInfo = localStorage.getItem('loggedInUser')
          ? `Logged in as: ${localStorage.getItem('loggedInUser')}`
          : 'Logged in as: Unknown';

        const SystemName = "Digital Workshop";
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        const pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.setFontSize(10);
        const textWidth = doc.getTextWidth(workshopName, SystemName);
        const xCenter = (pageWidth - textWidth) / 2;
        doc.text(workshopName, xCenter, pageHeight - 20);
        doc.text(SystemName, xCenter, pageHeight - 7);



        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString(); // Format date and time
        doc.text(formattedDate, data.settings.margin.left, pageHeight - 10);



        doc.text(loginInfo, 20, pageHeight - 35);
      },
    });

    const totalPages = doc.internal.getNumberOfPages();

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      const pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.setFontSize(10);
      const pageNumber = `Page ${i} of ${totalPages}`;
      doc.text(pageNumber, pageWidth - 50, pageHeight - 10);
    }

    doc.save("ICFRejectionSheetForm.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Bearing No.",
      "Make.",
      "Code/Year of MFG",
      "Date of Rejection",
      "Date Last Inspection",
      "Date Of Initial Fitment",
      "Life Of Bearing",
      "Cause Of Rejection",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataRejectionSheetICF.BearingNo,
        formDataRejectionSheetICF.Make,
        formDataRejectionSheetICF.CodeorYearofMFG,
        formDataRejectionSheetICF.DateofRejection,
        formDataRejectionSheetICF.DateLastInspection,
        formDataRejectionSheetICF.DateOfInitialFitment,
        formDataRejectionSheetICF.LifeOfBearing,
        formDataRejectionSheetICF.CauseOfRejection,

      ],
    ];

    // Create CSV content
    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((e) => e.join(",")).join("\n");

    // Encode URI and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ICFRejectionSheetForm.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  return (
    <div className="main_div">
      <div className="button_div">
        <button className="blue_button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="blue_button" onClick={handleNext}>
          Submit & View All Entries
        </button>
        <button className="green-button" onClick={exportToExcel}>
          Export To Excel
        </button>
        <button className="green-button" onClick={exportToPDF}>
          Export To PDF
        </button>
        <button className="green-button" onClick={exportToCSV}>
          Export To CSV
        </button>
      </div>
      <div id="table-container">
        <table>
          <thead className="thead">
            <tr>
              <th rowSpan="2">Bearing No.</th>
              <th rowSpan="2">Make.</th>
              <th rowSpan="2">Code/Year of MFG</th>
              <th rowSpan="2">Date of Rejection</th>
              <th rowSpan="2">Date Last Inspection</th>
              <th rowSpan="2">Date Of Initial Fitment</th>
              <th rowSpan="2">Life Of Bearing</th>
              <th rowSpan="2">Cause Of Rejection</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataRejectionSheetICF.BearingNo}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.Make}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.CodeorYearofMFG}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.DateofRejection}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.DateLastInspection}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.DateOfInitialFitment}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.LifeOfBearing}</td>
              <td rowSpan="2">{formDataRejectionSheetICF.CauseOfRejection}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitEMURejectionSheet;

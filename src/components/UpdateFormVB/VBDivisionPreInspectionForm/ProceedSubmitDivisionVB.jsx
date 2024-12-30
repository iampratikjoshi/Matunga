import React from "react";
// import "../../resources/LHB/lhbdivisionInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css"
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitDivisionVB = ({ formDataDivisionVB, setFormDataDivisionVB }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/vb/division/data", formDataDivisionVB);
      console.log(response.WheelNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataDivisionVB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 1,
          WheeltypeId: 3,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryVBDivision");
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
      const response = await postData("/inward/data", formDataDivisionVB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataDivisionVB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 1,
          WheeltypeId: 3,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryVBDivision");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("VBDivisionPreInspectionForm");

    worksheet.columns = [
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "Loory No.", key: "LooryNo", width: 30 },
      { header: "P.O.H Date", key: "POHDate", width: 30 },
      // { header: "Return Date", key: "returndate", width: 30 },
      { header: "Division Report", key: "divisionreport", width: 30 },
      { header: "Division Name", key: "DivisionName", width: 30 },
    ];

    // Add header rows
    worksheet.addRow({
      // WheelNo: formData.WheelNo,
      // LooryNo: formData.LooryNo,
      // POHDate: formData.POHDate,
      // returndate: formData.returndate,
      // divisionreport: formData.divisionreport,
      // DivisionName: formData.DivisionName,
      WheelNo: formDataDivisionVB.WheelNo,
      LooryNo: formDataDivisionVB.LooryNo,
      POHDate: formDataDivisionVB.POHDate,
      // returndate: formDataDivisionVB.returndate,
      divisionreport: formDataDivisionVB.divisionreport,
      DivisionName: formDataDivisionVB.DivisionName,
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
    saveAs(blob, "VBDivisionPreInspectionForm.xlsx");
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
        { content: "Wheel No.", rowSpan: 1 },
        { content: "Loory No.", rowSpan: 1 },
        { content: "P.O.H Date", rowSpan: 1 },
        { content: "Division Report", rowSpan: 1 },
        { content: "Division Name", rowSpan: 1 },
      ],
    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        // formData.WheelNo,
        // formData.LooryNo,
        // formData.POHDate,
        // formData.returndate,
        // formData.divisionreport,
        // formData.DivisionName,
        formDataDivisionVB.WheelNo,
        formDataDivisionVB.LooryNo,
        formDataDivisionVB.POHDate,
        // formDataDivisionVB.returndate,
        formDataDivisionVB.divisionreport,
        formDataDivisionVB.DivisionName,
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
        0: { cellWidth: 80 },
        1: { cellWidth: 80 },
        2: { cellWidth: 80 },
        3: { cellWidth: 80 },
        4: { cellWidth: 80 },
        5: { cellWidth: 80 },
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "VB Division Pre Inspection Form Report",
            data.settings.margin.left,
            20
          );
        }
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

    doc.save("VBDivisionPreInspectionForm.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Wheel No.",
      "Loory No.",
      "P.O.H Date",
      "Division Report",
      "Division Name",
      "Matunga Remark",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataDivisionVB.WheelNo,
        formDataDivisionVB.LooryNo,
        formDataDivisionVB.POHDate,
        formDataDivisionVB.divisionreport,
        formDataDivisionVB.DivisionName,
        formDataDivisionVB.matungareport,
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
    link.setAttribute("download", "VBDivisionPreInspectionForm.csv");
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
              <th rowSpan="2">Wheel No.</th>
              <th rowSpan="2">Loory No.</th>
              <th rowSpan="2">P.O.H Date</th>
              <th rowSpan="2">Division Report</th>
              <th rowSpan="2">Division Name</th>
              <th rowSpan="2">Matunga Remark</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataDivisionVB.WheelNo}</td>
              <td rowSpan="2">{formDataDivisionVB.LooryNo}</td>
              <td rowSpan="2">{formDataDivisionVB.POHDate}</td>
              <td rowSpan="2">{formDataDivisionVB.divisionreport}</td>
              <td rowSpan="2">{formDataDivisionVB.DivisionName}</td>
              <td rowSpan="2">{formDataDivisionVB.matungareport}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitDivisionVB;

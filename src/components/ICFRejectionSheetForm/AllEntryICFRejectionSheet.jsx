import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
// import "../../resources/LHB/lhbdivisionInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryICFRejectionSheet = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/bearingrejectionicf/getalldata");
        console.log(response);
        setData(response.data);
      } catch (error) { 
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const exportToExcel = async () => {
    const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

    const loginInfo = localStorage.getItem('loggedInUser')
      ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ICFRejectionSheet");

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

    // Add the header rows
    worksheet.getRow(1).values = [
      "Bearing No.",
      "Make.",
      "Code/Year of MFG",
      "Date of Rejection",
      "Date Last Inspection",
      "Date Of Initial Fitment",
      "Life Of Bearing",
      "Cause Of Rejection",
      "Workshop Name",
      "Logged in as",
      "Time of Export",
    ];



    // Define the main headers and subheaders (optional for visual layout)

    // Apply styles to headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(2).alignment = {
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

    // Apply border style to header row 1
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    // Apply border style to header row 2
    

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length + 5; 
    });

    // Adjust row height
    worksheet.getRow(1).height = 20;
    worksheet.getRow(2).height = 20;

    // Add data to worksheet
    data.forEach((item) => {
      worksheet.addRow({
        BearingNo: item.BearingNo,
        Make: item.Make,
        CodeorYearofMFG: item.CodeorYearofMFG,
        DateofRejection: item.DateofRejection,
        DateLastInspection: item.DateLastInspection,
        DateOfInitialFitment: item.DateOfInitialFitment,
        LifeOfBearing: item.LifeOfBearing,
        CauseOfRejection: item.CauseOfRejection,
        workshopName: workshopName,
        loginInfo: loginInfo,
        formattedDate: formattedDate,
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ICFRejectionSheet.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

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

    const tableRows = data;

    // AutoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.BearingNo,
        row.Make,
        row.CodeorYearofMFG,
        row.DateofRejection,
        row.DateLastInspection,
        row.DateOfInitialFitment,
        row.LifeOfBearing,
        row.CauseOfRejection,
      ]),
      startX: 10,
      startY: 30,
      tableWidth: "auto",
      theme: "grid",
      headStyles: {
        fillColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        fontSize: 8,
        cellPadding: 3,
      },
      styles: {
        overflow: "linebreak",
        fontSize: 7,
        cellWidth: "wrap",
        halign: "center",
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 90 },
        2: { cellWidth: 90 },
        3: { cellWidth: 90 },
        4: { cellWidth: 90 },
        5: { cellWidth: 90 },
        6: { cellWidth: 90 },
        7: { cellWidth: 90 },
      },
      margin: { top: 20, left: 10, right: 10 },
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
      doc.text(pageNumber, pageWidth - 100, pageHeight - 10);
    }

    doc.save("ICFRejectionSheet.pdf");
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
    const rows = data.map((entry) => [
      entry.BearingNo,
      entry.Make,
      entry.CodeorYearofMFG,
      entry.DateofRejection,
      entry.DateLastInspection,
      entry.DateOfInitialFitment,
      entry.LifeOfBearing,
      entry.CauseOfRejection,
    ]);
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
    link.setAttribute("download", "ICFRejectionSheet.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main_div">
      <div className="button_div">
        <button className="green-button" onClick={exportToExcel}>
          Export To Excel
        </button>
        <button className="green-button" onClick={exportToPDF}>
          Export To PDF
        </button>
        <button className="green-button" onClick={exportToCSV}>
          Export To CSV
        </button>
        <button
          className="yellow-button"
          onClick={() => navigate("/icfrejectionsheetform/bearing_details")}
        >
          Add New Entry
        </button>
        {/* <button
          className="yellow-button"
          onClick={() => navigate("/emuschedulepreinspectionform/details")}
        >
          Complete Pre Inspection
        </button> */}
      </div>
      <div id="table-container" className="table_container">
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

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
                <td rowSpan="2" key={`${res.id}-BearingNo`}>
                  {res.BearingNo}
                </td>
                <td rowSpan="2" key="Make">
                  {res.Make}
                </td>
                <td rowSpan="2" key="CodeorYearofMFG">
                  {res.CodeorYearofMFG}
                </td>
                <td rowSpan="2" key="DateofRejection">
                  {res.DateofRejection}
                </td>
                <td colSpan={1} key="DateLastInspection">
                  {res.DateLastInspection}
                </td>

                <td colSpan={1} key="DateOfInitialFitment">
                  {res.DateOfInitialFitment}
                </td>
                <td rowSpan="2" key="LifeOfBearing">
                  {res.LifeOfBearing}
                </td>
                <td rowSpan="2" key="CauseOfRejection">
                  {res.CauseOfRejection}
                </td>

              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntryICFRejectionSheet;

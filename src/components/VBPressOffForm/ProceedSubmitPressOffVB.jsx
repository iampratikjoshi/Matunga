import React from "react";
// import "../../resources/VB/lhbpressoffform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitPressOffVB = ({
  formDataPressOffVB,
  setFormDataPressOffVB,
}) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/vb/pressoff/data", formDataPressOffVB);
      console.log(response.WheelNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffVB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 5,
          WheeltypeID: 1,
          modifiedBy: "admin",
        }));

        navigate("/viewallentrypressoffVB");
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
      const response = await postData("/vb/pressoff/data", formDataPressOffVB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffVB((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 5,
          WheeltypeID: 1,
          modifiedBy: "admin",
        }));

        // navigate("/viewallentrypressoff");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("VBPressOffForm");

    worksheet.columns = [
      { header: "Date", key: "Date", width: 10 },
      { header: "Operator Name", key: "OperatorName", width: 30 },
      { header: "Operator T.No.", key: "OperatorTNo", width: 30 },
      { header: "Inspector Name", key: "InspectorName", width: 30 },
      { header: "Inspector T.No.", key: "InspectorTNo", width: 30 },
      { header: "Shop Sr.No.", key: "ShopSNo", width: 30 },
      { header: "Machine No.", key: "MachineNumber", width: 30 },
      { header: "Shift No.", key: "ShiftNumber", width: 30 },
      { header: "Type Of Wheel", key: "TypeOfWheel", width: 30 },
      { header: "Wheel Pressed Off For RA/RD/RG", key: "WheelPressedOff", width: 30 },
      { header: "Disc Sr.No.", key: "DiscSrNo", width: 30 },
      { header: "General Observation", key: "GeneralObservation", width: 30 },
      { header: "Axle No.", key: "AxleNo", width: 15 },
      { header: "Reason", key: "Reason", width: 30 },
      { header: "Axle Condition", key: "AxleCondition", width: 30 },
      { header: "Axle Condition Reason", key: "AxleConditionReason", width: 30 },
      { header: "Axle Cause Of Condemn", key: "AxleConditionCause", width: 30 },
      { header: "Brake Disc Condition", key: "BrakeDiscCondition", width: 30 },
      { header: "Brake Disc Condition Reason", key: "BrakeDiscConditionReason", width: 30 },
      { header: "Brake Disc Cause Of Condemn", key: "BrakeDiscConditionCause", width: 30 },
      { header: "Wheel Disc Condition", key: "WheelDiscCondition", width: 30 },
      { header: "Wheel Condition Reason", key: "WheelConditionReason", width: 30 },
      { header: "Wheel Disc Cause Of Condemn", key: "WheelDiscConditionCause", width: 30 },
      { header: "Serviceable Disc ID No.", key: "serviceablediscidnumber", width: 30 },
      { header: "Remark", key: "PressedOffRemark", width: 30 },
    ];
    worksheet.getRow(1).values = [
      "Date",
      "Operator Name",
      "Operator T.No.",
      "Inspector Name",
      "Inspector T.No.",
      "Shop Sr.No.",
      "Machine No.",
      "Shift No.",
      "Type Of Wheel",
      "Wheel Pressed Off For RA/RD/RG",
      "Disc Sr.No.",
      "General Observation",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Remark",
    ];

    worksheet.getRow(2).values = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Axle No.",
      "Reason",
      "Axle Condition",
      "Axle Condition Reason",
      "Axle Cause Of Condemn",
      "Brake Disc Condition",
      "Brake Disc Condition Reason",
      "Brake Disc Cause Of Condemn",
      "Wheel Disc Condition",
      "Wheel Condition Reason",
      "Wheel Disc Cause Of Condemn",
      "Serviceable Disc ID No.",
      "",
    ];

    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");
    worksheet.mergeCells("D1:D2");
    worksheet.mergeCells("E1:E2");
    worksheet.mergeCells("F1:F2");
    worksheet.mergeCells("G1:G2");
    worksheet.mergeCells("H1:H2");
    worksheet.mergeCells("I1:I2");
    worksheet.mergeCells("J1:J2");
    worksheet.mergeCells("K1:K2");
    worksheet.mergeCells("L1:W1");
    worksheet.mergeCells("X1:X2");



    // Add header rows
    worksheet.addRow({
      Date: formDataPressOffVB.Date,
      OperatorName: formDataPressOffVB.OperatorName,
      OperatorTNo: formDataPressOffVB.OperatorTNo,
      InspectorName: formDataPressOffVB.InspectorName,
      InspectorTNo: formDataPressOffVB.InspectorTNo,
      ShopSNo: formDataPressOffVB.ShopSNo,
      MachineNumber: formDataPressOffVB.MachineNumber,
      ShiftNumber: formDataPressOffVB.ShiftNumber,
      TypeOfWheel: formDataPressOffVB.TypeOfWheel,
      WheelPressedOff: formDataPressOffVB.WheelPressedOff,
      DiscSrNo: formDataPressOffVB.DiscSrNo,
      GeneralObservation: formDataPressOffVB.AxleNo,
      AxleNo: formDataPressOffVB.Reason,
      Reason: formDataPressOffVB.AxleCondition,
      AxleCondition: formDataPressOffVB.AxleConditionReason,
      AxleConditionReason: formDataPressOffVB.AxleConditionCause,
      AxleConditionCause: formDataPressOffVB.BrakeDiscCondition,
      BrakeDiscCondition: formDataPressOffVB.BrakeDiscConditionReason,
      BrakeDiscConditionReason: formDataPressOffVB.BrakeDiscConditionCause,
      BrakeDiscConditionCause: formDataPressOffVB.WheelDiscCondition,
      WheelDiscCondition: formDataPressOffVB.WheelConditionReason,
      WheelConditionReason: formDataPressOffVB.WheelDiscConditionCause,
      WheelDiscConditionCause: formDataPressOffVB.serviceablediscidnumber,
      serviceablediscidnumber: formDataPressOffVB.PressedOffRemark,

    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };
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
    worksheet.getRow(2).fill = {
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
    worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length + 5;
    });

    // Adjust row height
    worksheet.getRow(1).height = 20;
    worksheet.getRow(2).height = 20;

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "VBPressOffForm.xlsx");
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
        { content: "Date", rowSpan: 2 },
        { content: "Operator Ticket No.", rowSpan: 2 },
        { content: "Operator Name", rowSpan: 2 },
        { content: "Inspector Ticket No.", rowSpan: 2 },
        { content: "Inspector Name", rowSpan: 2 },
        { content: "Shop Sr.No.", rowSpan: 2 },
        { content: "Machine No.", rowSpan: 2 },
        { content: "Shift", rowSpan: 2 },
        { content: "Type Of Wheel", rowSpan: 2 },
        { content: "Wheel Pressed Off", rowSpan: 2 },
        { content: "Disc Sr.No.", rowSpan: 2 },
        { content: "General Observation", colSpan: 12 },
        { content: "Remark", rowSpan: 2 },
      ],
      [
        { content: "Axle No.", colSpan: 1 },
        { content: "Reason", colSpan: 1 },
        { content: "Axle Condition", colSpan: 1 },
        { content: "Axle Condition Reason", colSpan: 1 },
        { content: "Axle Cause of Condemn", colSpan: 1 },
        { content: "Brake Disc Condition", colSpan: 1 },
        { content: "Brake Disc Condition Reason", colSpan: 1 },
        { content: "Brake Disc Cause Of Condemn", colSpan: 1 },
        { content: "Wheel Disc Condition", colSpan: 1 },
        { content: "Wheel Disc Condition Reason", colSpan: 1 },
        { content: "Wheel Disc Cause Of Condemn", colSpan: 1 },
        { content: "Servicable Disc Id No.", colSpan: 1 },
      ],
    ];

    // Define your table data.
    const tableRows = [
      [
        formDataPressOffVB.Date,
        formDataPressOffVB.OperatorTNo,
        formDataPressOffVB.OperatorName,
        formDataPressOffVB.InspectorTNo,
        formDataPressOffVB.InspectorName,
        formDataPressOffVB.ShopSNo,
        formDataPressOffVB.MachineNumber,
        formDataPressOffVB.ShiftNumber,
        formDataPressOffVB.TypeOfWheel,
        formDataPressOffVB.WheelPressedOff,
        formDataPressOffVB.DiscSrNo,
        formDataPressOffVB.AxleNo,
        formDataPressOffVB.Reason,
        formDataPressOffVB.AxleCondition,
        formDataPressOffVB.AxleConditionReason,
        formDataPressOffVB.AxleConditionCause,
        formDataPressOffVB.BrakeDiscCondition,
        formDataPressOffVB.BrakeDiscConditionReason,
        formDataPressOffVB.BrakeDiscConditionCause,
        formDataPressOffVB.WheelDiscCondition,
        formDataPressOffVB.WheelConditionReason,
        formDataPressOffVB.WheelDiscConditionCause,
        formDataPressOffVB.serviceablediscidnumber,
        formDataPressOffVB.PressedOffRemark,
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
        fillColor: [240, 240, 240], // Light gray background for the header
        textColor: [0, 0, 0], // Black text color for the header
        halign: "center",
        valign: "middle",
        fontSize: 5, // Adjusted to fit more content
        // cellPadding: 3,
      },
      styles: {
        overflow: "linebreak", // Wrap text in cells
        fontSize: 5, // Adjust font size to reduce the table width
        cellWidth: "wrap", // Allow cells to wrap text
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0], // Set the border color to black
        lineWidth: 0.1, // Adjust line thickness (optional)
      },
      columnStyles: {
        // Adjusting column widths to ensure the table fits on the page
        0: { cellWidth: 30 },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 35 },
        4: { cellWidth: 35 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 25 },
        8: { cellWidth: 35 },
        9: { cellWidth: 30 },
        10: { cellWidth: 30 },
        11: { cellWidth: 25 },
        12: { cellWidth: 30 },
        13: { cellWidth: 35 },
        14: { cellWidth: 35 },
        15: { cellWidth: 35 },
        16: { cellWidth: 35 },
        17: { cellWidth: 40 },
        18: { cellWidth: 40 },
        19: { cellWidth: 40 },
        20: { cellWidth: 40 },
        21: { cellWidth: 40 },
        22: { cellWidth: 40 },
        23: { cellWidth: 40 },
        24: { cellWidth: 25 },
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text("VB Press-Off Form", data.settings.margin.left, 20);
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
      doc.text(pageNumber, pageWidth - 80, pageHeight - 20);
    }

    doc.save("VB Press Off Report.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Date",
      "Operator Name",
      "OperatorT.No.",
      "Inspector Name",
      "InspectorT.No.",
      "ShopSNo",
      "Machine No.",
      "Shift No.",
      "TypeOfWheel",
      "WheelPressedOff",
      "DiscSrNo",
      "AxleNo",
      "Axle Condition",
      "Axle Condition Reason",
      "Axle Cause Of Condemn",
      "Brake Disc Condition",
      "Brake Disc Condition Reason",
      "Brake Disc Cause Of Condemn",
      "Wheel Disc Condition",
      "Wheel Condition Reason",
      "Wheel Disc Cause Of Condemn",
      "Serviceable ID No.",
      "Reason",
      "Remark",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataPressOffVB.Date,
        formDataPressOffVB.OperatorName,
        formDataPressOffVB.OperatorTNo,
        formDataPressOffVB.InspectorName,
        formDataPressOffVB.InspectorTNo,
        formDataPressOffVB.ShopSNo,
        formDataPressOffVB.MachineNumber,
        formDataPressOffVB.ShiftNumber,
        formDataPressOffVB.TypeOfWheel,
        formDataPressOffVB.WheelPressedOff,
        formDataPressOffVB.DiscSrNo,
        formDataPressOffVB.AxleNo,
        formDataPressOffVB.AxleCondition,
        formDataPressOffVB.AxleConditionReason,
        formDataPressOffVB.AxleConditionCause,
        formDataPressOffVB.BrakeDiscCondition,
        formDataPressOffVB.BrakeDiscConditionReason,
        formDataPressOffVB.BrakeDiscConditionCause,
        formDataPressOffVB.WheelDiscCondition,
        formDataPressOffVB.WheelConditionReason,
        formDataPressOffVB.WheelDiscConditionCause,
        formDataPressOffVB.serviceablediscidnumber,
        formDataPressOffVB.Reason,
        formDataPressOffVB.PressedOffRemark,
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
    link.setAttribute("download", "VBPressOffForm.csv");
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
              <th rowSpan="2">Date</th>
              <th rowSpan="2">Operator Name</th>
              <th rowSpan="2">Operator T.No.</th>
              <th rowSpan="2">Inspector Name</th>
              <th rowSpan="2">Inspector T.No.</th>
              <th rowSpan="2">Shop Sr.No.</th>
              <th rowSpan="2">Machine No.</th>
              <th rowSpan="2">Shift No.</th>
              <th rowSpan="2">Type Of Wheel</th>
              <th rowSpan="2">Wheel Pressed Off</th>
              <th rowSpan="2">Disc Sr.No.</th>
              <th colSpan={12}>General Observations</th>
              <th rowSpan="2">Remark</th>
            </tr>
            <tr>
              <th>Axle No.</th>
              <th>Reason</th>

              <th>Axle Condition</th>
              <th>Axle Condition Reason</th>
              <th>Axle Cause Of Condemn</th>
              <th>Brake Disc Condition</th>
              <th>Brake Disc Condition Reason</th>
              <th>Brake Disc Cause Of Condemn</th>

              <th>Wheel Disc Condition</th>
              <th>Wheel Condition Reason</th>
              <th>Wheel Disc Cause Of Condemn</th>
              <th>Serviceable Disc ID No.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataPressOffVB.Date}</td>
              <td rowSpan="2">{formDataPressOffVB.OperatorName}</td>
              <td rowSpan="2">{formDataPressOffVB.OperatorTNo}</td>
              <td rowSpan="2">{formDataPressOffVB.InspectorName}</td>
              <td rowSpan="2">{formDataPressOffVB.InspectorTNo}</td>
              <td rowSpan="2">{formDataPressOffVB.ShopSNo}</td>
              <td rowSpan="2">{formDataPressOffVB.MachineNumber}</td>
              <td rowSpan="2">{formDataPressOffVB.ShiftNumber}</td>
              <td rowSpan="2">{formDataPressOffVB.TypeOfWheel}</td>
              <td rowSpan="2">{formDataPressOffVB.WheelPressedOff}</td>
              <td rowSpan="2">{formDataPressOffVB.DiscSrNo}</td>
              <td colSpan={1}>{formDataPressOffVB.AxleNo}</td>
              <td colSpan={1}>{formDataPressOffVB.Reason}</td>

              <td colSpan={1}>{formDataPressOffVB.AxleCondition}</td>
              <td colSpan={1}>{formDataPressOffVB.AxleConditionReason}</td>
              <td colSpan={1}>{formDataPressOffVB.AxleConditionCause}</td>
              <td colSpan={1}>{formDataPressOffVB.BrakeDiscCondition}</td>
              <td colSpan={1}>
                {formDataPressOffVB.BrakeDiscConditionReason}
              </td>
              <td colSpan={1}>{formDataPressOffVB.BrakeDiscConditionCause}</td>

              <td colSpan={1}>{formDataPressOffVB.WheelDiscCondition}</td>
              <td colSpan={1}>{formDataPressOffVB.WheelConditionReason}</td>
              <td colSpan={1}>{formDataPressOffVB.WheelDiscConditionCause}</td>
              <td colSpan={1}>{formDataPressOffVB.serviceablediscidnumber}</td>

              <td rowSpan="2">{formDataPressOffVB.PressedOffRemark}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitPressOffVB;

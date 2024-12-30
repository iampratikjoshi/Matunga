import React from "react";
// import "../../resources/LHB/lhbpressoffform/proceedsubmit.css";
import "../../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitUpdatedPressOff = ({
  formDataPressOffICF,
  setFormDataPressOffICF,
}) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/icfpressoff/editdata/", formDataPressOffICF);
      console.log(response.WheelNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffICF((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 5,
          WheeltypeID: 2,
          modifiedBy: "admin",
        }));

        navigate("/viewallentryicfpressoff");
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
      const response = await postData("/icfpressoff/editdata/", formDataPressOffICF);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataPressOffICF((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 5,
          WheeltypeID: 2,
          modifiedBy: "admin",
        }));

        navigate("/parentedit/edit");
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
    const worksheet = workbook.addWorksheet("ICFPressOffForm");

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
      { header: "Workshop Name", key: "workshopName", width: 10 },
      { header: "Logged in as", key: "loginInfo", width: 10 },
      { header: "Time of Export", key: "formattedDate", width: 10 },
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
      "Workshop Name",
      "Logged in as",
      "Time of Export",
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
      "",
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
      Date: formDataPressOffICF.Date,
      OperatorName: formDataPressOffICF.OperatorName,
      OperatorTNo: formDataPressOffICF.OperatorTNo,
      InspectorName: formDataPressOffICF.InspectorName,
      InspectorTNo: formDataPressOffICF.InspectorTNo,
      ShopSNo: formDataPressOffICF.ShopSNo,
      MachineNumber: formDataPressOffICF.MachineNumber,
      ShiftNumber: formDataPressOffICF.ShiftNumber,
      TypeOfWheel: formDataPressOffICF.TypeOfWheel,
      WheelPressedOff: formDataPressOffICF.WheelPressedOff,
      DiscSrNo: formDataPressOffICF.DiscSrNo,
      GeneralObservation: formDataPressOffICF.AxleNo,
      AxleNo: formDataPressOffICF.Reason,
      Reason: formDataPressOffICF.AxleCondition,
      AxleCondition: formDataPressOffICF.AxleConditionReason,
      AxleConditionReason: formDataPressOffICF.AxleConditionCause,
      AxleConditionCause: formDataPressOffICF.BrakeDiscCondition,
      BrakeDiscCondition: formDataPressOffICF.BrakeDiscConditionReason,
      BrakeDiscConditionReason: formDataPressOffICF.BrakeDiscConditionCause,
      BrakeDiscConditionCause: formDataPressOffICF.WheelDiscCondition,
      WheelDiscCondition: formDataPressOffICF.WheelConditionReason,
      WheelConditionReason: formDataPressOffICF.WheelDiscConditionCause,
      WheelDiscConditionCause: formDataPressOffICF.serviceablediscidnumber,
      serviceablediscidnumber: formDataPressOffICF.PressedOffRemark,
      PressedOffRemark:workshopName,
      workshopName:loginInfo,
      loginInfo:formattedDate,
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
    saveAs(blob, "ICFPressOffForm.xlsx");
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
        formDataPressOffICF.Date,
        formDataPressOffICF.OperatorTNo,
        formDataPressOffICF.OperatorName,
        formDataPressOffICF.InspectorTNo,
        formDataPressOffICF.InspectorName,
        formDataPressOffICF.ShopSNo,
        formDataPressOffICF.MachineNumber,
        formDataPressOffICF.ShiftNumber,
        formDataPressOffICF.TypeOfWheel,
        formDataPressOffICF.WheelPressedOff,
        formDataPressOffICF.DiscSrNo,
        formDataPressOffICF.AxleNo,
        formDataPressOffICF.Reason,
        formDataPressOffICF.AxleCondition,
        formDataPressOffICF.AxleConditionReason,
        formDataPressOffICF.AxleConditionCause,
        formDataPressOffICF.BrakeDiscCondition,
        formDataPressOffICF.BrakeDiscConditionReason,
        formDataPressOffICF.BrakeDiscConditionCause,
        formDataPressOffICF.WheelDiscCondition,
        formDataPressOffICF.WheelConditionReason,
        formDataPressOffICF.WheelDiscConditionCause,
        formDataPressOffICF.serviceablediscidnumber,
        formDataPressOffICF.PressedOffRemark,
        
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
          doc.text("ICF Press-Off Form", data.settings.margin.left, 20);
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
      doc.text(pageNumber, pageWidth - 80, pageHeight - 20);
    }

    doc.save("ICF Press Off Report.pdf");
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
        formDataPressOffICF.Date,
        formDataPressOffICF.OperatorName,
        formDataPressOffICF.OperatorTNo,
        formDataPressOffICF.InspectorName,
        formDataPressOffICF.InspectorTNo,
        formDataPressOffICF.ShopSNo,
        formDataPressOffICF.MachineNumber,
        formDataPressOffICF.ShiftNumber,
        formDataPressOffICF.TypeOfWheel,
        formDataPressOffICF.WheelPressedOff,
        formDataPressOffICF.DiscSrNo,
        formDataPressOffICF.AxleNo,
        formDataPressOffICF.AxleCondition,
        formDataPressOffICF.AxleConditionReason,
        formDataPressOffICF.AxleConditionCause,
        formDataPressOffICF.BrakeDiscCondition,
        formDataPressOffICF.BrakeDiscConditionReason,
        formDataPressOffICF.BrakeDiscConditionCause,
        formDataPressOffICF.WheelDiscCondition,
        formDataPressOffICF.WheelConditionReason,
        formDataPressOffICF.WheelDiscConditionCause,
        formDataPressOffICF.serviceablediscidnumber,
        formDataPressOffICF.Reason,
        formDataPressOffICF.PressedOffRemark,
        
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
    link.setAttribute("download", "ICFPressOffForm.csv");
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
              <td rowSpan="2">{formDataPressOffICF.Date}</td>
              <td rowSpan="2">{formDataPressOffICF.OperatorName}</td>
              <td rowSpan="2">{formDataPressOffICF.OperatorTNo}</td>
              <td rowSpan="2">{formDataPressOffICF.InspectorName}</td>
              <td rowSpan="2">{formDataPressOffICF.InspectorTNo}</td>
              <td rowSpan="2">{formDataPressOffICF.ShopSNo}</td>
              <td rowSpan="2">{formDataPressOffICF.MachineNumber}</td>
              <td rowSpan="2">{formDataPressOffICF.ShiftNumber}</td>
              <td rowSpan="2">{formDataPressOffICF.TypeOfWheel}</td>
              <td rowSpan="2">{formDataPressOffICF.WheelPressedOff}</td>
              <td rowSpan="2">{formDataPressOffICF.DiscSrNo}</td>
              <td colSpan={1}>{formDataPressOffICF.AxleNo}</td>
              <td colSpan={1}>{formDataPressOffICF.Reason}</td>

              <td colSpan={1}>{formDataPressOffICF.AxleCondition}</td>
              <td colSpan={1}>{formDataPressOffICF.AxleConditionReason}</td>
              <td colSpan={1}>{formDataPressOffICF.AxleConditionCause}</td>
              <td colSpan={1}>{formDataPressOffICF.BrakeDiscCondition}</td>
              <td colSpan={1}>
                {formDataPressOffICF.BrakeDiscConditionReason}
              </td>
              <td colSpan={1}>{formDataPressOffICF.BrakeDiscConditionCause}</td>

              <td colSpan={1}>{formDataPressOffICF.WheelDiscCondition}</td>
              <td colSpan={1}>{formDataPressOffICF.WheelConditionReason}</td>
              <td colSpan={1}>{formDataPressOffICF.WheelDiscConditionCause}</td>
              <td colSpan={1}>{formDataPressOffICF.serviceablediscidnumber}</td>

              <td rowSpan="2">{formDataPressOffICF.PressedOffRemark}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitUpdatedPressOff;

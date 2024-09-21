import React, { useEffect, useState } from "react";
// import "../../resources/LHB/lhbpressoffform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryPressOff = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/pressofflhb/getalldata");
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
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBPressOffForm");

    worksheet.columns = [
      { header: "Date", key: "Date", width: 10 },
      { header: "Operator T.No.", key: "OperatorTNo", width: 30 },
      { header: "Inspector T.No.", key: "InspectorTNo", width: 30 },
      { header: "ShopS.No.", key: "ShopSNo", width: 30 },
      { header: "Type Of Wheel", key: "TypeOfWheel", width: 30 },
      { header: "Wheel Pressed Off For RA/RD/RG", key: "WheelPressedOff", width: 30 },
      { header: "Disc Sr.No.", key: "DiscSrNo", width: 30 },
      { header: "General Observation", key: "GeneralObservation", width: 30 },
      { header: "Axle No.", key: "AxleNo", width: 15 },
      { header: "Reason", key: "Reason", width: 30 },
      
      { header: "Axle Condition", key: "ReasonAxleCondition", width: 30 },
      { header: "Axle Condition Reason", key: "AxleConditionReason", width: 30 },
      { header: "Brake Disc Condition", key: "BrakeDiscCondition", width: 30 },
      { header: "Brake Disc Condition Reason", key: "BrakeDiscConditionReason", width: 30 },
      { header: "Wheel Disc Condition", key: "WheelDiscCondition", width: 30 },
      { header: "Wheel Condition Reason", key: "WheelConditionReason", width: 30 },

      { header: "Remark", key: "PressedOffRemark", width: 30 },
    ];
    worksheet.getRow(1).values = [
      "Date",
      "Operator T.No.",
      "Inspector T.No.",
      "ShopS.No.",
      "Type Of Wheel",
      "Wheel Pressed Off For RA/RD/RG",
      "Disc Sr.No.",
      "General Observation",
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
      "Axle No.",
      "Reason",
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
    worksheet.mergeCells("H1:I1");
    worksheet.mergeCells("J1:J2"); 


    // Apply styles to headers
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

    // Add data to worksheet
    data.forEach((item) => {
      worksheet.addRow({
        Date: item.Date,
      OperatorTNo: item.OperatorTNo,
      InspectorTNo: item.InspectorTNo,
      ShopSNo: item.ShopSNo,
      TypeOfWheel: item.TypeOfWheel,
      WheelPressedOff: item.WheelPressedOff,
      DiscSrNo: item.DiscSrNo,
      GeneralObservation: item.AxleNo,
      AxleNo: item.Reason,
      Reason: item.PressedOffRemark
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBPressOffForm.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const tableColumn = [
      [
        { content: "Date", rowSpan: 2 },
        { content: "OperatorTNo", rowSpan: 2 },
        { content: "InspectorTNo", rowSpan: 2 },
        { content: "ShopSNo", rowSpan: 2 },
        { content: "TypeOfWheel", rowSpan: 2 },
        { content: "WheelPressedOff", rowSpan: 2 },
        { content: "DiscSrNo", rowSpan: 2 },
        { content: "General Observation", colSpan: 2 },
      ],
      [
        { content: "Axle No." },
        { content: "Reason" },
      ]

    ];

    const tableRows = data;

    // AutoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.Date,
        row.OperatorTNo,
        row.InspectorTNo,
        row.ShopSNo,
        row.TypeOfWheel,
        row.WheelPressedOff,
        row.DiscSrNo,
        row.AxleNo,
        row.Reason,
        row.Remark
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
        0: { cellWidth: 80 },
        1: { cellWidth: 80 },
        2: { cellWidth: 80 },
        3: { cellWidth: 80 },
        4: { cellWidth: 80 },
        5: { cellWidth: 80 },
        6: { cellWidth: 80 },
        7: { cellWidth: 80 },
        8: { cellWidth: 80 },
      },
      margin: { top: 20, left: 10, right: 10 },
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "PRESS-OFF OF LHB WHEEL FORM Report",
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
      doc.text(pageNumber, pageWidth - 100, pageHeight - 10);
    }

    doc.save("LHBPressOffForm.pdf");
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
      "Remark"
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.Date,
      entry.OperatorName,
      entry.OperatorTNo,
      entry.InspectorName,
      entry.InspectorTNo,
      entry.ShopSNo,
      entry.MachineNumber,
      entry.ShiftNumber,
      entry.TypeOfWheel,
      entry.WheelPressedOff,
      entry.DiscSrNo,
      entry.AxleNo,
      entry.AxleCondition,
      entry.AxleConditionReason,
      entry.AxleConditionCause,
      entry.BrakeDiscCondition,
      entry.BrakeDiscConditionReason,
      entry.BrakeDiscConditionCause,
      entry.WheelDiscCondition,
      entry.WheelConditionReason,
      entry.WheelDiscConditionCause,
      entry.serviceablediscidnumber,
      entry.Reason,
      entry.PressedOffRemark,
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
    link.setAttribute("download", "LHBPressOffForm.csv");
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
          onClick={() => navigate("/pending_tasks")}
        >
          View Pending Tasks
        </button>
        {/* <button
          className="yellow-button"
          onClick={() => navigate("/LHBPressOnForm/wheel_details")}
        >
          Move to Next Stage
        </button> */}
      </div>
      <div id="table-container" className="table_container">
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

          {data.map((res,index) => (
            <tbody name="tbody" key={`tbody-${res.id}+${index}`}>
              <tr name="tr" key={`tr-${res.id}`}>
                <td rowSpan="2" key={`${res.id}-Date`}>
                  {res.Date}
                </td>
                <td rowSpan="2">{res.Date}</td>
              <td rowSpan="2">{res.OperatorName}</td>
              <td rowSpan="2">{res.OperatorTNo}</td>
              <td rowSpan="2">{res.InspectorName}</td>
              <td rowSpan="2">{res.InspectorTNo}</td>
              <td rowSpan="2">{res.ShopSNo}</td>
              <td rowSpan="2">{res.MachineNumber}</td>
              <td rowSpan="2">{res.ShiftNumber}</td>
              <td rowSpan="2">{res.TypeOfWheel}</td>
              <td rowSpan="2">{res.WheelPressedOff}</td>
              <td rowSpan="2">{res.DiscSrNo}</td>
              <td colSpan={1}>{res.AxleNo}</td>
              <td colSpan={1}>{res.Reason}</td>

              <td colSpan={1}>{res.AxleCondition}</td>
              <td colSpan={1}>{res.AxleConditionReason}</td>
              <td colSpan={1}>{res.AxleConditionCause}</td>
              <td colSpan={1}>{res.BrakeDiscCondition}</td>
              <td colSpan={1}>{res.BrakeDiscConditionReason}</td>
              <td colSpan={1}>{res.BrakeDiscConditionCause}</td>

              <td colSpan={1}>{res.WheelDiscCondition}</td>
              <td colSpan={1}>{res.WheelConditionReason}</td>
              <td colSpan={1}>{res.WheelDiscConditionCause}</td>
              <td colSpan={1}>{res.serviceablediscidnumber}</td>


              <td rowSpan="2">{res.PressedOffRemark}</td>

              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntryPressOff;

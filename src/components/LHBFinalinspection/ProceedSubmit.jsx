import React from "react";
// import "../../resources/LHB/finalInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Breadcrumbs from "./Breadcrumbs";

const ProceedSubmitFinal = ({ formDataFinal, setFormDataFinal }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/api/data", formDataFinal);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataFinal((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 1,
        }));

        navigate("/viewallentryFinal");
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
      const response = await postData("/api/data", formDataFinal);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataFinal((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 1,
        }));

        navigate("/pending_tasks");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBFinalInspection");

    worksheet.columns = [
      { header: "Axle No.", key: "AxleNo", width: 10 },
      { header: "Wheel Size", key: "WheelSize", width: 30 },
      { header: "Wheel Dia A", key: "WheelDiaA", width: 10 },
      { header: "Wheel Dia B", key: "WheelDiaB", width: 10 },
      { header: "RG", key: "WheelRG", width: 10 },
      { header: "FLG", key: "WheelFLG", width: 10 },
      { header: "Journal Size", key: "JournalSize", width: 30 },
      { header: "Jr.Size", key: "Size", width: 10 },
      { header: "Jr.Oval", key: "Oval", width: 10 },
      { header: "Jr.Tap", key: "Tap", width: 10 },
      { header: "Shoulder Size", key: "ShoulderSize", width: 15 },
      { header: "Jr. Waiviness", key: "JrWaiviness", width: 15 },
      { header: "Disc Particular A", key: "DiscParticularA", width: 10 },
      { header: "Disc Particular B", key: "DiscParticularB", width: 10 },
      { header: "BD Make", key: "BDMake", width: 15 },
      { header: "BD Size", key: "BDSize", width: 10 },
      { header: "End Hole", key: "EndHole", width: 10 },
      { header: "BRG Remain Life", key: "BRGRemainLife", width: 15 },
      { header: "BRG Make", key: "BRGMake", width: 10 },
      { header: "BRG No.", key: "BRGNo", width: 10 },
      { header: "MEP A", key: "MEPA", width: 10 },
      { header: "MEP B", key: "MEPB", width: 10 },
      { header: "UST Name", key: "USTName", width: 15 },
      { header: "Fitting Dt.", key: "FittingDt", width: 15 },
      { header: "ECA Test", key: "ECATest", width: 10 },
      { header: "Insp. Name", key: "InspectorName", width: 15 },
      { header: "Insp. Ticket No", key: "InspectorTicketNo", width: 15 },

      { header: "Shift", key: "Shift", width: 10 },
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "CTRB No. A", key: "CTRBNumberA", width: 10 },
      { header: "CTRB No. B", key: "CTRBNumberB", width: 10 },
      { header: "CTRB Make A", key: "CTRBMakeA", width: 10 },
      { header: "CTRB Make B", key: "CTRBMakeB", width: 10 },
      { header: "CTRB Status A", key: "CTRBStatusA", width: 10 },
      { header: "CTRB Status B", key: "CTRBStatusB", width: 10 },
      { header: "Refurbishment Details A", key: "RefurbishmentDetailsA", width: 10 },
      { header: "Refurbishment Details B", key: "RefurbishmentDetailsB", width: 10 },
      { header: "CTRB Remaining Life A", key: "CTRBRemainingLifeA", width: 10 },
      { header: "CTRB Remaining Life B", key: "CTRBRemainingLifeB", width: 10 },
      { header: "Wheel Tread UST", key: "WheelTreadUST", width: 10 },
      { header: "Remark", key: "FinalInspectionRemark", width: 10 },
    ];

    // Add the header rows
    worksheet.getRow(1).values = [
      "Axle No.",
      "Wheel Size",
      "",
      "",
      "",
      "Journal Size",
      "",
      "",
      "Shoulder Size",
      "Jr. Waiviness",
      "Disc Particular A",
      "Disc Particular B",
      "BD Make",
      "BD Size",
      "End Hole",
      "BRG Remain Life",
      "BRG Make",
      "BRG No.",
      "MEP A",
      "MEP B",
      "UST Name",
      "Fitting Dt.",
      "ECA Test",
      "Insp. Name",
      "Insp. Ticket No.",
      "Shift",
      "Wheel No.",
      "CTRB No. A",
      "CTRB No. B",
      "CTRB Make A",
      "CTRB Make B",
      "CTRB Status A",
      "CTRB Status B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "CTRB Remaining Life A",
      "CTRB Remaining Life B",
      "Wheel Tread UST",
      "Remark",
    ];

    worksheet.getRow(2).values = [
      "",
      "Wheel Dia A",
      "Wheel Dia B",
      "RG",
      "FLG",
      "Jr. Size",
      "Jr. Oval",
      "Jr. Tap",
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
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      
      
    ];

    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:E1"); // Wheel Size
    worksheet.mergeCells("F1:H1"); // Journal Size
    worksheet.mergeCells("I1:I2"); // Shoulder Size
    worksheet.mergeCells("J1:J2"); // Shoulder Size
    worksheet.mergeCells("K1:K2"); // Jr. Waiviness
    worksheet.mergeCells("L1:L2"); // BD Make
    worksheet.mergeCells("M1:M2"); // BD Size
    worksheet.mergeCells("N1:N2"); // End Hole
    worksheet.mergeCells("O1:O2"); // BRG Remain Life
    worksheet.mergeCells("P1:P2"); // BRG Make
    worksheet.mergeCells("Q1:Q2"); // BRG No.
    worksheet.mergeCells("R1:R2"); // MEPA
    worksheet.mergeCells("S1:S2"); // UST Name
    worksheet.mergeCells("T1:T2"); // Fitting Dt.
    worksheet.mergeCells("U1:U2"); // ECA Test
    worksheet.mergeCells("V1:V2"); // Insp. Sign
    worksheet.mergeCells("W1:W2");
    worksheet.mergeCells("X1:X2");
    worksheet.mergeCells("Y1:Y2");
    worksheet.mergeCells("Z1:Z2");
    worksheet.mergeCells("AA1:AA2");
    worksheet.mergeCells("AB1:AB2");
    worksheet.mergeCells("AC1:AC2");
    worksheet.mergeCells("AD1:AD2");
    worksheet.mergeCells("AE1:AE2");
    worksheet.mergeCells("AF1:AF2");
    worksheet.mergeCells("AG1:AG2");
    worksheet.mergeCells("AH1:AH2");
    worksheet.mergeCells("AI1:AI2");
    worksheet.mergeCells("AJ1:AJ2");
    worksheet.mergeCells("AK1:AK2");
    worksheet.mergeCells("AL1:AL2");
    worksheet.mergeCells("AM1:AM2");
    worksheet.mergeCells("AN1:AN2");

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
    worksheet.addRow({
      AxleNo: formDataFinal.AxleNo,
      WheelSize: formDataFinal.WheelDiaA,
      WheelDiaA: formDataFinal.WheelDiaB,
      WheelDiaB: formDataFinal.WheelRG,
      WheelRG: formDataFinal.WheelFLG,
      // JournalSize: "", // Not used but included for layout
      WheelFLG: formDataFinal.Size,
      JournalSize: formDataFinal.Oval,
      Size: formDataFinal.Tap,
      Oval: formDataFinal.ShoulderSize,
      Tap: formDataFinal.JrWaiviness,
      ShoulderSize: formDataFinal.DiscParticularA,
      JrWaiviness: formDataFinal.DiscParticularB,
      DiscParticularA: formDataFinal.BDMake,
      DiscParticularB: formDataFinal.BDSize,
      BDMake: formDataFinal.EndHole,
      BDSize: formDataFinal.BRGRemainLife,
      EndHole: formDataFinal.BRGMake,
      BRGRemainLife: formDataFinal.BRGNo,
      BRGMake: formDataFinal.MEPA,
      BRGNo: formDataFinal.MEPB,
      MEPA: formDataFinal.USTName,
      MEPB:formDataFinal.FittingDt,
      USTName:formDataFinal.ECATest,
      FittingDt:formDataFinal.InspectorName,
      ECATest:formDataFinal.InspectorTicketNo,
      InspectorName:formDataFinal.Shift,
      InspectorTicketNo:formDataFinal.WheelNo,
      Shift:formDataFinal.CTRBNumberA,
      WheelNo:formDataFinal.CTRBNumberB,
      CTRBNumberA:formDataFinal.CTRBMakeA,
      CTRBNumberB:formDataFinal.CTRBMakeB,
      CTRBMakeA:formDataFinal.CTRBStatusA,
      CTRBMakeB:formDataFinal.CTRBStatusB,
      CTRBStatusA:formDataFinal.RefurbishmentDetailsA,
      CTRBStatusB:formDataFinal.RefurbishmentDetailsB,
      RefurbishmentDetailsA:formDataFinal.CTRBRemainingLifeA,
      RefurbishmentDetailsB:formDataFinal.CTRBRemainingLifeB,
      CTRBRemainingLifeA:formDataFinal.WheelTreadUST,
      CTRBRemainingLifeB:formDataFinal.FinalInspectionRemark,
     
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBFinalInspection.xlsx");
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
        { content: "Wheel No.", rowSpan: 2 },
        { content: "Axle No.", rowSpan: 2 },
        { content: "Wheel Size", colSpan: 4 },
        { content: "Journal Size", colSpan: 3 },
        { content: "Shoulder Size", rowSpan: 2 },
        { content: "Jr. Waiviness", rowSpan: 2 },
        { content: "Disc Particular A", rowSpan: 2 },
        { content: "Disc Particular B", rowSpan: 2 },
        { content: "BD Make", rowSpan: 2 },
        { content: "BD Size", rowSpan: 2 },
        { content: "End Hole", rowSpan: 2 },
        { content: "BRG Remain Life", rowSpan: 2 },
        { content: "BRG Make", rowSpan: 2 },
        { content: "BRG No.", rowSpan: 2 },
        { content: "MEP A", rowSpan: 2 },
        { content: "MEP B", rowSpan: 2 },
        { content: "UST Name", rowSpan: 2 },
        { content: "Fitting Dt.", rowSpan: 2 },
        { content: "ECA Test", rowSpan: 2 },
        { content: "Insp. Name", rowSpan: 2 },
        { content: "Insp. Ticket No.", rowSpan: 2 },
        { content: "Shift", rowSpan: 2 },
        { content: "CTRB No. A", rowSpan: 2 },
        { content: "CTRB No. B", rowSpan: 2 },
        { content: "CTRB Make A", rowSpan: 2 },
        { content: "CTRB Make B", rowSpan: 2 },
        { content: "CTRB Status A", rowSpan: 2 },
        { content: "CTRB Status B", rowSpan: 2 },
        { content: "Refurbishment Details A", rowSpan: 2 },
        { content: "Refurbishment Details B", rowSpan: 2 },
        { content: "CTRB Remaining Life A", rowSpan: 2 },
        { content: "CTRB Remaining Life B", rowSpan: 2 },
        { content: "Wheel Tread UST", rowSpan: 2 },
        { content: "Remark", rowSpan: 2 },
      ],
      [
        { content: "Dia A" },
        { content: "Dia B" },
        { content: "RG" },
        { content: "FLG" },
        { content: "Jr. Size" },
        { content: "Jr. Oval" },
        { content: "Jr. Tap" },
      ],
    ];

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        formDataFinal.WheelNo,
        formDataFinal.AxleNo,
        formDataFinal.WheelDiaA,
        formDataFinal.WheelDiaB,
        formDataFinal.WheelRG,
        formDataFinal.WheelFLG,
        formDataFinal.Size,
        formDataFinal.Oval,
        formDataFinal.Tap,
        formDataFinal.ShoulderSize,
        formDataFinal.JrWaiviness,
        formDataFinal.DiscParticularA,
        formDataFinal.DiscParticularB,
        formDataFinal.BDMake,
        formDataFinal.BDSize,
        formDataFinal.EndHole,
        formDataFinal.BRGRemainLife,
        formDataFinal.BRGMake,
        formDataFinal.BRGNo,
        formDataFinal.MEPA,
        formDataFinal.MEPB,
        formDataFinal.USTName,
        formDataFinal.FittingDt,
        formDataFinal.ECATest,
        formDataFinal.InspectorName,
        formDataFinal.InspectorTicketNo,
        formDataFinal.Shift,
        formDataFinal.CTRBNumberA,
        formDataFinal.CTRBNumberB,
        formDataFinal.CTRBMakeA,
        formDataFinal.CTRBMakeB,
        formDataFinal.CTRBStatusA,
        formDataFinal.CTRBStatusB,
        formDataFinal.RefurbishmentDetailsA,
        formDataFinal.RefurbishmentDetailsB,
        formDataFinal.CTRBRemainingLifeA,
        formDataFinal.CTRBRemainingLifeB,
        formDataFinal.WheelTreadUST,
        formDataFinal.FinalInspectionRemark,
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
        fontSize: 4, // Adjusted to fit more content
        // cellPadding: 3,
      },
      styles: {
        overflow: "linebreak", // Wrap text in cells
        fontSize: 4, // Adjust font size to reduce the table width
        cellWidth: "wrap", // Allow cells to wrap text
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0], // Set the border color to black
        lineWidth: 0.1, // Adjust line thickness (optional)
      },
      columnStyles: {
        //   // Adjusting column widths to ensure the table fits on the page
        0: { cellWidth: 22 }, // AxleNo
        1: { cellWidth: 18 }, // ABSide
        2: { cellWidth: 18 }, // WheelDia
        3: { cellWidth: 18 }, // WheelRG
        4: { cellWidth: 20 }, // WheelFLG
        5: { cellWidth: 20 }, // FC
        6: { cellWidth: 20 }, // JournalSize
        7: { cellWidth: 20 }, // Oval
        8: { cellWidth: 20 }, // Tap
        9: { cellWidth: 20 }, // ShoulderSize
        10: { cellWidth: 20 }, // JrWaiviness
        11: { cellWidth: 20 }, // BDMake
        12: { cellWidth: 20 }, // BDSize
        13: { cellWidth: 20 }, // EndHole
        14: { cellWidth: 18 }, // BRGRemainLife
        15: { cellWidth: 18 }, // BRGMake
        16: { cellWidth: 18 }, // BRGNo
        17: { cellWidth: 20 }, // MEPA
        18: { cellWidth: 20 }, // USTName
        19: { cellWidth: 20 }, // FittingDt
        20: { cellWidth: 18 }, // ECATest
        21: { cellWidth: 18 }, // InspectorSign
        22: { cellWidth: 20 }, // InspectorSign
        23: { cellWidth: 22 }, // InspectorSign
        24: { cellWidth: 20 }, // InspectorSign
        25: { cellWidth: 22 }, // InspectorSign
        26: { cellWidth: 18 }, // InspectorSign
        27: { cellWidth: 22 }, // InspectorSign
        28: { cellWidth: 22 }, // InspectorSign
        29: { cellWidth: 22 }, // InspectorSign
        30: { cellWidth: 22 }, // InspectorSign
        31: { cellWidth: 22 }, // InspectorSign
        32: { cellWidth: 22 }, // InspectorSign
        33: { cellWidth: 30 }, // InspectorSign
        34: { cellWidth: 30 }, // InspectorSign
        35: { cellWidth: 30 }, // InspectorSign
        36: { cellWidth: 30 }, // InspectorSign
        37: { cellWidth: 22 }, // InspectorSign
        38: { cellWidth: 24 }, // InspectorSign
      },
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "LHB Final Inspection Report",
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
      doc.text(pageNumber, pageWidth - 80, pageHeight - 20);
    }

    doc.save("LHB_Final_Inspection.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Axle No.",
      "Wheel Dia A",
      "Wheel Dia A",
      "RG",
      "FLG",
      "Jr. Size",
      "Jr. Oval",
      "Jr. Tap",
      "Shoulder Size",
      "Jr. Waiviness",
      "Disc Particular A",
      "Disc Particular B",
      "BD Make",
      "BD Size",
      "End Hole",
      "BRG Remain Life",
      "BRG Make",
      "BRG No.",
      "MEP A",
      "MEP B",
      "UST Name",
      "Fitting Dt.",
      "ECA Test",
      "Insp. Name",
      "Insp. Ticket No.",
      "Shift",
      "Wheel No.",
      "CTRB No A",
      "CTRB No B",
      "CTRB Make A",
      "CTRB Make B",
      "CTRB Status A",
      "CTRB Status B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "CTRB Remaining Life A",
      "CTRB Remaining Life B",
      "Wheel Tread UST",
      "Remark",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataFinal.AxleNo,
        formDataFinal.WheelDiaA,
        formDataFinal.WheelDiaB,
        formDataFinal.WheelRG,
        formDataFinal.WheelFLG,
        formDataFinal.Size,
        formDataFinal.Oval,
        formDataFinal.Tap,
        formDataFinal.ShoulderSize,
        formDataFinal.JrWaiviness,
        formDataFinal.DiscParticularA,
        formDataFinal.DiscParticularB,
        formDataFinal.BDMake,
        formDataFinal.BDSize,
        formDataFinal.EndHole,
        formDataFinal.BRGRemainLife,
        formDataFinal.BRGMake,
        formDataFinal.BRGNo,
        formDataFinal.MEPA,
        formDataFinal.MEPB,
        formDataFinal.USTName,
        formDataFinal.FittingDt,
        formDataFinal.ECATest,
        formDataFinal.InspectorName,
        formDataFinal.InspectorTicketNo,
        formDataFinal.Shift,
        formDataFinal.WheelNo,
        formDataFinal.CTRBNumberA,
        formDataFinal.CTRBNumberB,
        formDataFinal.CTRBMakeA,
        formDataFinal.CTRBMakeB,
        formDataFinal.CTRBStatusA,
        formDataFinal.CTRBStatusB,
        formDataFinal.RefurbishmentDetailsA,
        formDataFinal.RefurbishmentDetailsB,
        formDataFinal.CTRBRemainingLifeA,
        formDataFinal.CTRBRemainingLifeB,
        formDataFinal.WheelTreadUST,
        formDataFinal.FinalInspectionRemark,
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
    link.setAttribute("download", "LHBFinalInspection.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  return (
    <div className="main_div">
      <Breadcrumbs />
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
              <th rowSpan="2">Axle No.</th>
              <th colSpan={4}>Wheel Size</th>
              <th colSpan={3}>Journal Size</th>
              <th rowSpan="2">Shoulder Size</th>
              <th rowSpan="2">Jr. Waiviness</th>
              <th rowSpan="2">Disc Particular A</th>
              <th rowSpan="2">Disc Particular B</th>
              <th rowSpan="2">BD Make</th>
              <th rowSpan="2">BD Size</th>
              <th rowSpan="2">End Hole</th>
              <th rowSpan="2">Brg Remain Life</th>
              <th rowSpan="2">Brg Make</th>
              <th rowSpan="2">Brg No.</th>
              <th rowSpan="2">MEP A</th>
              <th rowSpan="2">MEP B</th>
              <th rowSpan="2">UST Name</th>
              <th rowSpan="2">Fitting Dt.</th>
              <th rowSpan="2">ECA Test</th>
              <th rowSpan="2">Insp. Name</th>
              <th rowSpan="2">Insp. Ticket No</th>
              <th rowSpan="2">Shift</th>
              <th rowSpan="2">Wheel No.</th>
              <th rowSpan="2">CTRB No. A</th>
              <th rowSpan="2">CTRB No. B</th>
              <th rowSpan="2">CTRB Make A</th>
              <th rowSpan="2">CTRB Make B</th>
              <th rowSpan="2">CTRB Status A</th>
              <th rowSpan="2">CTRB Status B</th>
              <th rowSpan="2">Refurbishment Details A</th>
              <th rowSpan="2">Refurbishment Details B</th>
              <th rowSpan="2">CTRB Remaining Life A</th>
              <th rowSpan="2">CTRB Remaining Life B</th>
              <th rowSpan="2">Wheel Tread UST</th>
              <th rowSpan="2">Remark</th>
            </tr>
            <tr>
              <th>Wheel Dia A</th>
              <th>Wheel Dia B</th>
              <th>RG</th>
              <th>FLG</th>
              <th>Jr. Size</th>
              <th>Jr. Oval</th>
              <th>Jr. Tap</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">{formDataFinal.AxleNo}</td>
              <td colSpan={1}>{formDataFinal.WheelRG}</td>
              <td colSpan={1}>{formDataFinal.WheelDiaA}</td>
              <td colSpan={1}>{formDataFinal.WheelDiaB}</td>
              <td colSpan={1}>{formDataFinal.WheelFLG}</td>
              <td colSpan={1}>{formDataFinal.Size}</td>
              <td colSpan={1}>{formDataFinal.Oval}</td>
              <td colSpan={1}>{formDataFinal.Tap}</td>
              <td rowSpan="2">{formDataFinal.ShoulderSize}</td>
              <td rowSpan="2">{formDataFinal.JrWaiviness}</td>
              <td rowSpan="2">{formDataFinal.DiscParticularA}</td>
              <td rowSpan="2">{formDataFinal.DiscParticularB}</td>
              <td rowSpan="2">{formDataFinal.BDMake}</td>
              <td rowSpan="2">{formDataFinal.BDSize}</td>
              <td rowSpan="2">{formDataFinal.EndHole}</td>
              <td rowSpan="2">{formDataFinal.BRGRemainLife}</td>
              <td rowSpan="2">{formDataFinal.BRGMake}</td>
              <td rowSpan="2">{formDataFinal.BRGNo}</td>
              <td rowSpan="2">{formDataFinal.MEPA}</td>
              <td rowSpan="2">{formDataFinal.MEPB}</td>
              <td rowSpan="2">{formDataFinal.USTName}</td>
              <td rowSpan="2">{formDataFinal.FittingDt}</td>
              <td rowSpan="2">{formDataFinal.ECATest}</td>
              <td rowSpan="2">{formDataFinal.InspectorName}</td>
              <td rowSpan="2">{formDataFinal.InspectorTicketNo}</td>
              <td rowSpan="2">{formDataFinal.Shift}</td>
              <td rowSpan="2">{formDataFinal.WheelNo}</td>
              <td rowSpan="2">{formDataFinal.CTRBNumberA}</td>
              <td rowSpan="2">{formDataFinal.CTRBNumberB}</td>
              <td rowSpan="2">{formDataFinal.CTRBMakeA}</td>
              <td rowSpan="2">{formDataFinal.CTRBMakeB}</td>
              <td rowSpan="2">{formDataFinal.CTRBStatusA}</td>
              <td rowSpan="2">{formDataFinal.CTRBStatusB}</td>
              <td rowSpan="2">{formDataFinal.RefurbishmentDetailsA}</td>
              <td rowSpan="2">{formDataFinal.RefurbishmentDetailsB}</td>
              <td rowSpan="2">{formDataFinal.CTRBRemainingLifeA}</td>
              <td rowSpan="2">{formDataFinal.CTRBRemainingLifeB}</td>
              <td rowSpan="2">{formDataFinal.WheelTreadUST}</td>
              <td rowSpan="2">{formDataFinal.FinalInspectionRemark}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitFinal;

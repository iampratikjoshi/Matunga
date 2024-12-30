import React from "react";
// import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import "../../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import api from "../../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitUpdatedSchedulePreinspection = ({ formDataScheduleICF, setFormDataScheduleICF }) => {
  console.log("formdata:", formDataScheduleICF);

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/icfscheduledpreinspection/editdata/"+ formDataScheduleICF.WheelId, formDataScheduleICF);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataScheduleICF((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 2,
        }));

        navigate("/viewallentryicf");
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
      const response = await api.put("/icfscheduledpreinspection/editdata/"+ formDataScheduleICF.WheelId, formDataScheduleICF);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataScheduleICF((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 2,
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
    const setFaintGreyBackground = (cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'D3D3D3' } // Faint grey color
      };
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } }, // Black border color
        bottom: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    };
    
    const setBorders = (worksheet) => {
      // Get the last column with data
      let maxCol = 1;
      
      worksheet.eachRow((row, rowNumber) => {
        // Only process rows up to row 20
        if (rowNumber <= 12) {
          row.eachCell((cell, colNumber) => {
            maxCol = Math.max(maxCol, colNumber);
          });
        }
      });
      
      // Iterate through cells up to row 20 and max column
      for (let row = 1; row <= 12; row++) {
        for (let col = 1; col <= maxCol; col++) {
          const cell = worksheet.getCell(row, col);
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
          };
        }
      }
    };

    const setBordersSpecific = (worksheet) => {
      // Define the specific row and column range
      const startRow = 16;
      const endRow = 16;
      const endCol = 6; // Column F is the 6th column
    
      // Iterate through the specified range
      for (let row = startRow; row <= endRow; row++) {
        for (let col = 1; col <= endCol; col++) {
          const cell = worksheet.getCell(row, col);
          cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
          };
        }
      }
    };

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ICFPreInspection");

    [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].forEach(col => {
      worksheet.getColumn(col).width = 15;
    });

    // Headers for Wheel Details
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C4");
    worksheet.mergeCells("D1:D4");
    worksheet.mergeCells("E1:E4");
    worksheet.mergeCells("F1:F4");
    worksheet.mergeCells("G1:G4");
    worksheet.mergeCells("H1:H4");
    worksheet.mergeCells("I1:I4");
    worksheet.mergeCells("J1:J4");
    worksheet.mergeCells("K1:K4");
    worksheet.mergeCells("L1:L4");
    worksheet.mergeCells("M1:M4");
    worksheet.mergeCells("N1:N4");
    worksheet.mergeCells("O1:O4");
    worksheet.mergeCells("P1:P4");
    worksheet.mergeCells("Q1:Q4");
    worksheet.mergeCells("R1:R4");
    worksheet.mergeCells("S1:S4");
    worksheet.mergeCells("T1:T4");
    worksheet.mergeCells("U1:U4");
    worksheet.mergeCells("V1:V4");
    worksheet.mergeCells("W1:W4");
    worksheet.mergeCells("X1:X4");
    worksheet.mergeCells("Y1:Y4");
    worksheet.mergeCells("Z1:Z4");
    // worksheet.mergeCells("AA1:AA4");
    worksheet.mergeCells("M5:M8");
    worksheet.mergeCells("N5:N8");
    worksheet.mergeCells("O5:O8");
    worksheet.mergeCells("P5:P8");
    worksheet.mergeCells("Q5:Q8");
    worksheet.mergeCells("R5:R8");
    worksheet.mergeCells("S5:S8");
    worksheet.mergeCells("T5:T8");
    worksheet.mergeCells("U5:U8");
    worksheet.mergeCells("V5:V8");
    worksheet.mergeCells("W5:W8");
    worksheet.mergeCells("X5:X8");
    worksheet.mergeCells("Y5:Y8");
    worksheet.mergeCells("Z5:Z8");
    // worksheet.mergeCells("AA5:AA8");
    worksheet.mergeCells("A3:A4");
    worksheet.mergeCells("B3:B4");
    worksheet.mergeCells("A5:A6");
    worksheet.mergeCells("B5:B6");
    worksheet.mergeCells("D5:D8");
    worksheet.mergeCells("E5:E8");
    worksheet.mergeCells("G5:G8");
    worksheet.mergeCells("H5:H8");
    worksheet.mergeCells("I5:I8");
    worksheet.mergeCells("A7:A8");
    worksheet.mergeCells("B7:B8");
    worksheet.mergeCells("C5:C8");
    worksheet.mergeCells("F5:F8");
    worksheet.mergeCells("J5:J8");
    worksheet.mergeCells("K5:K8");
    worksheet.mergeCells("L5:L8");
    worksheet.mergeCells(9, 1, 12, 2);
    worksheet.mergeCells("C9:C10");
    worksheet.mergeCells("C11:C12");
    worksheet.mergeCells(9, 4, 10, 26);
    worksheet.mergeCells(11, 4, 12, 26);
    // worksheet.mergeCells(13, 1, 16, 2);
    // worksheet.mergeCells(13, 4, 14, 29);
    // worksheet.mergeCells("C13:C14");
    // worksheet.mergeCells("C15:C16");
    // worksheet.mergeCells(15, 4, 16, 29);
    // worksheet.mergeCells(1, 28, 4, 28);
    // worksheet.mergeCells(1, 29, 4, 29);
    // worksheet.mergeCells(5, 28, 8, 28);
    // worksheet.mergeCells(5, 29, 8, 29);
    // worksheet.mergeCells(17, 1, 20, 2);
    // worksheet.mergeCells(17, 4, 18, 29);
    // worksheet.mergeCells(19, 4, 20, 29);
    // worksheet.mergeCells(17, 3, 18, 3);
    // worksheet.mergeCells(19, 3, 20, 3);

    worksheet.getRow(1).values = [
      "Shop Sr. No.",
      "Receive Date",
      "Coach No.",
      "Diameter IN A",
      "Diameter IN B",
      "Brg Code A Side",
      "Brg Code B Side",
      "Brg Year A Side",
      "Brg Year B Side",
      "Brg Make A Side",
      "Brg Make B Side",
      "Fitment Date",
      "Brg. Initial fitment month A Side",
      "Brg. Initial fitment month B Side",
      "Brg. Service in month A Side",
      "Brg. Service in month B Side",
      "MTN Brg. No. A Side",
      "MTN Brg. No. B Side",
      // "Wheel Type",
      "Shift",
      "Gang Name A side",
      "Gang Name B side",
      "Rod Gauge IN",
      // "Sound Test IN A",
      // "Sound Test IN B",
      "Type Of Repair",
      "Matunga Remark",
      "Inspector Name",
      "Inspector Ticket No.",
    ];
    
    worksheet.getRow(3).values = ["Axle No.", "Axle Condition"];
    
    worksheet.getRow(5).values = [
      formDataScheduleICF.ShopSrNumber,
      formDataScheduleICF.ReceiveDate,
      formDataScheduleICF.CoachNumber,
      formDataScheduleICF.DiameterINA,
      formDataScheduleICF.DiameterINB,
      formDataScheduleICF.BrgCodeA,
      formDataScheduleICF.BrgCodeB,
      formDataScheduleICF.BrgYearA,
      formDataScheduleICF.BrgYearB,
      formDataScheduleICF.BrgMakeA,
      formDataScheduleICF.BrgMakeB,
      formDataScheduleICF.FitmentDate,
      formDataScheduleICF.BrgFitmentA,
      formDataScheduleICF.BrgFitmentB,
      formDataScheduleICF.BrgServiceA,
      formDataScheduleICF.BrgServiceB,
      formDataScheduleICF.MTNBrgSideA,
      formDataScheduleICF.MTNBrgSideB,
      // formDataScheduleICF.WheelType,
      formDataScheduleICF.Shift,
      formDataScheduleICF.GNameAside,
      formDataScheduleICF.GNameBside,
      formDataScheduleICF.RodGaugeIN,
      // formDataScheduleICF.SoundTestINA,
      // formDataScheduleICF.SoundTestINB,
      formDataScheduleICF.TypeOfRepair,
      formDataScheduleICF.MatungaRemark,
      formDataScheduleICF.InspectorName,
      formDataScheduleICF.InspectorTicketNo,
    ];
    
    worksheet.getRow(7).values = [
      formDataScheduleICF.AxleNumber, 
      formDataScheduleICF.AxleCondition
    ];
    
    worksheet.getRow(9).values = [
      "Disc Particular",
      "",
      "A",
      formDataScheduleICF.DiscParticularA,
    ];

    worksheet.getRow(11).values = ["", "", "B", formDataScheduleICF.DiscParticularB];
    // worksheet.getRow(13).values = ["Radial clearance dismounted condition", "", "A", formDataScheduleICF.RCDMA];
    // worksheet.getRow(15).values = ["", "", "B", formDataScheduleICF.RCDMB];
    // worksheet.getRow(17).values = ["Radial clearance mounted condition", "", "A", formDataScheduleICF.RCMA];
    // worksheet.getRow(19).values = ["", "", "B", formDataScheduleICF.RCMB];

    const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';
    const loginInfo = localStorage.getItem('loggedInUser')
      ? `${localStorage.getItem('loggedInUser')}` 
      : 'Unknown';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    worksheet.getRow(16).values = [
      "Workshop Name",
      workshopName,
      "Logged in as",
      loginInfo,
      "Time of Export",
      formattedDate,
    ];

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = {
          wrapText: true,
          horizontal: "center",
          vertical: "middle",
        };
      });
    });

    // Apply grey background to headers
    for (let col = 1; col <= 26; col++) {
      const cell = worksheet.getCell(1, col);
      setFaintGreyBackground(cell);
    }

    // Row 3 headers
    ['A3', 'B3'].forEach(cellRef => {
      const cell = worksheet.getCell(cellRef);
      setFaintGreyBackground(cell);
    });

    // Special section headers
    const headerCells = [
      'A9',
      'C9', 'C11', "A16","C16","E16"
      //  'C13', 'C15','A13'
      // 'C17', 'C19','A17',
    ];

    headerCells.forEach(cellRef => {
      const cell = worksheet.getCell(cellRef);
      setFaintGreyBackground(cell);
    });

    // Apply borders
    setBorders(worksheet);
    setBordersSpecific(worksheet);

    // Apply bold font and background to merged header cells
    const boldCells = [
      "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1", "J1", "K1", "L1",
      "M1", "N1", "O1", "P1", "Q1", "R1", "S1", "T1", "U1", "V1", "W1", "X1",
      "Y1", "Z1",
      "A3", "B3", "C3", "E3", "G3", "I3",
      "A9", "A16","C16","E16"
      //  "A13",
      //  "A17", "C9", "C11", "C13", "C15","C17","C19"
    ];

    boldCells.forEach(cellRef => {
      const cell = worksheet.getCell(cellRef);
      cell.font = { bold: true };
      setFaintGreyBackground(cell);
    });

    //Additional Bold Text Cells
    const additionalBoldCells = [
      "A1", "B1", "B3", "D1", "D3", "E1", "E3", "G1", "G3", "H1", "H3", "I1", 
      "I3", "F1", "C1", "J1", "K1", "L1", "M1", "N1", "O1", "P1", "Q1", "R1", 
      "S1", "T1", "U1", "V1", "A3", "C3", "E3", "G3", "I3", "A9", "A16","C16","E16",
      // "A18", "C18", 
      // "E18", 
      "C9", "C11", "W1", "X1", "Y1", "Z1", 
      // "AB1", "AC1",
      // "C13", "C15", "A13""AA1", 
      // "A17", "A19","A23","C23","E23"
    ];

    additionalBoldCells.forEach(cellRef => {
      const cell = worksheet.getCell(cellRef);
      cell.font = { bold: true };
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ICFPreInspection.xlsx");
};



  const exportToPDF = () => {
    const loginInfo = localStorage.getItem('loggedInUser')
      ? `Logged in as: ${localStorage.getItem('loggedInUser')}`
      : 'Logged in as: Unknown';
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    
    // Define the headers and subheaders similar to your table
    const headers = [
      [
        { content: "Shop Sr. No.", rowSpan: 1 },
        { content: "Receive Date", rowSpan: 1 },
        { content: "Coach No.", rowSpan: 2 },
        { content: "Diameter IN A", rowSpan: 2 },
        { content: "Diameter IN B", rowSpan: 2 },
        { content: "Brg Code A Side", rowSpan: 2 },
        { content: "Brg Code B Sid", rowSpan: 2 },
        { content: "Brg Year A Side", rowSpan: 2 },
        { content: "Brg Year B Side", rowSpan: 2 },
        { content: "Brg Make A Side", rowSpan: 2 },
        { content: "Brg Make B Side", rowSpan: 2 },
        { content: "Fitment Date", rowSpan: 2 },
        { content: "Brg. Initial fitment month A Side", rowSpan: 2 },
        { content: "Brg. Initial fitment month B Side", rowSpan: 2 },
        { content: "Brg. Service in month A Side", rowSpan: 2 },
        { content: "Brg. Service in month B Side", rowSpan: 2 },
        { content: "MTN Brg. No. A Side", rowSpan: 2 },
        { content: "MTN Brg. No. B Side", rowSpan: 2 },
        // { content: "Wheel Type", rowSpan: 2 },
        { content: "Shift", rowSpan: 2 },
        { content: "Gang Name A side", rowSpan: 2 },
        { content: "Gang Name B side", rowSpan: 2 },
        { content: "Rod Gauge IN", rowSpan: 2 },
        // { content: "Sound Test IN A", rowSpan: 2 },
        // { content: "Sound Test IN B", rowSpan: 2 },
        { content: "Type Of Repair", rowSpan: 2 },
        { content: "Matunga Remark", rowSpan: 2 },
        { content: "Inspector Name", rowSpan: 2 },
        { content: "Inspector Ticket No.", rowSpan: 2 },
      ],
      [{ content: "Axle No." }, { content: "Axle Condition" }],
    ];

    const handleNullValue = (value) =>
      value === null || value === undefined ? "" : value;
    // Define the body
    const body = [
      [
        { content: handleNullValue(formDataScheduleICF.ShopSrNumber), rowSpan: 1 }, // Data for Shop Sr. No.
        { content: handleNullValue(formDataScheduleICF.ReceiveDate), rowSpan: 1 }, // All other data with rowSpan 2
        { content: handleNullValue(formDataScheduleICF.CoachNumber), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.DiameterINA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.DiameterINB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgCodeA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgCodeB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgYearA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgYearB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgMakeA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgMakeB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.FitmentDate), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgFitmentA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgFitmentB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgServiceA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.BrgServiceB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.MTNBrgSideA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.MTNBrgSideB), rowSpan: 2 },
        // { content: handleNullValue(formDataScheduleICF.WheelType), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.Shift), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.GNameAside), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.GNameBside), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.RodGaugeIN), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.SoundTestINA), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.SoundTestINB), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.TypeOfRepair), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.MatungaRemark), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.InspectorName), rowSpan: 2 },
        { content: handleNullValue(formDataScheduleICF.InspectorTicketNo), rowSpan: 2 },
      ],
      [
        // Second subrow data for Shop Sr. No. and Axle No.
        { content: handleNullValue(formDataScheduleICF.AxleNumber), rowSpan: 1 }, // Data for Shop Sr. No.
        { content: handleNullValue(formDataScheduleICF.AxleCondition), rowSpan: 1 }, // Data for Axle No.
      ],
      // Subrows for "Disc Particular"
      [
        {
          content: "Disc Particular",
          rowSpan: 2,
          colSpan: 2,
        }, // Main Header for Disc Particular
        { content: "A" }, // Subheader A
        { content: handleNullValue(formDataScheduleICF.DiscParticularA), colSpan: 28 }, // Data for Disc Particular A
      ],
      [
        { content: "B" }, // Subheader B
        { content: handleNullValue(formDataScheduleICF.DiscParticularB), colSpan: 28 }, // Data for Disc Particular B
      ],
      // Subrows for "Roller Bearing"
      // [
      //   {
      //     content: "Radial clearance dismounted condition",
      //     rowSpan: 2,
      //     colSpan: 2,
      //   }, // Main Header for Roller Bearing
      //   { content: "A" }, // Subheader A
      //   { content: handleNullValue(formDataScheduleICF.RCDMA), colSpan: 30 }, // Data for Roller Bearing A
      // ],
      // [
      //   { content: "B" }, // Subheader B
      //   { content: handleNullValue(formDataScheduleICF.RCDMB), colSpan: 30 }, // Data for Roller Bearing B
      // ],
      // [
      //   {
      //     content: "Radial clearance mounted condition",
      //     rowSpan: 2,
      //     colSpan: 2,
      //   }, // Main Header for Roller Bearing
      //   { content: "A" }, // Subheader A
      //   { content: handleNullValue(formDataScheduleICF.RCMA), colSpan: 30 }, // Data for Roller Bearing A
      // ],
      // [
      //   { content: "B" }, // Subheader B
      //   { content: handleNullValue(formDataScheduleICF.RCMB), colSpan: 30 }, // Data for Roller Bearing B
      // ],
    ];

    doc.autoTable({
      head: headers,
      body: body,
      theme: "grid",
      styles: {
        cellPadding: 2,
        fontSize: 5,
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0], // Set the border color to black
        lineWidth: 0.1, // Adjust line thickness (optional)
      },
      headStyles: {
        fillColor: [240, 240, 240], // Light gray background for the header
        textColor: [0, 0, 0], // Black text color for the header
        halign: "center",
        valign: "middle",
      },
      margin: { top: 20, right: 20, bottom: 20, left: 20 }, // Adjusted margins
      didDrawPage: (data) => {
       

        const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

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

    // Save the PDF
    doc.save("ICF Pre-Inspection Form.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Shop Sr. No.",
      "Axle No.",
      "Receive Date",
      "Axle Condition",
      "Coach No.",
      "Diameter IN A",
      "Diameter IN B",
      "Brg Code A Side",
      "Brg Code B Side",
      "Brg Year A Side",
      "Brg Year B Side",
      "Brg Make A Side",
      "Brg Make B Side",
      "Fitment Date",
      "Brg. Initial fitment month A Side",
      "Brg. Initial fitment month B Side",
      "Brg. Service in month A Side",
      "Brg. Service in month B Side",
      "MTN Brg. No. A Side",
      "MTN Brg. No. B Side",
      "Shift",
      "Gang Name A side",
      "Gang Name B side",
      "Rod Gauge IN",
      "Type Of Repair",
      "Matunga Remark",
      "Insp. Name",
      "Insp. T.No.",
      "Disc Particular A",
      "Disc Particular B",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataScheduleICF.ShopSrNumber,
        formDataScheduleICF.AxleNumber,
        formDataScheduleICF.ReceiveDate,
        formDataScheduleICF.AxleCondition,
        formDataScheduleICF.CoachNumber,
        formDataScheduleICF.DiameterINA,
        formDataScheduleICF.DiameterINB,
        formDataScheduleICF.BrgCodeA,
        formDataScheduleICF.BrgCodeB,
        formDataScheduleICF.BrgYearA,
        formDataScheduleICF.BrgYearB,
        formDataScheduleICF.BrgMakeA,
        formDataScheduleICF.BrgMakeB,
        formDataScheduleICF.FitmentDate,
        formDataScheduleICF.BrgFitmentA,
        formDataScheduleICF.BrgFitmentB,
        formDataScheduleICF.BrgServiceA,
        formDataScheduleICF.BrgServiceB,
        formDataScheduleICF.MTNBrgSideA,
        formDataScheduleICF.MTNBrgSideB,
        formDataScheduleICF.Shift,
        formDataScheduleICF.GNameAside,
        formDataScheduleICF.GNameBside,
        formDataScheduleICF.RodGaugeIN,
        formDataScheduleICF.TypeOfRepair,
        formDataScheduleICF.MatungaRemark,
        formDataScheduleICF.InspectorName,
        formDataScheduleICF.InspectorTicketNo,
        formDataScheduleICF.DiscParticularA,
        formDataScheduleICF.DiscParticularB,
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
    link.setAttribute("download", "icfchedulepreinspection.csv");
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
              <th colSpan={1}>Shop Sr. No.</th>
              <th colSpan={1}>Receive Date</th>
              <th rowSpan="2">Coach No.</th>
              <th rowSpan="2">Diameter IN A</th>
              <th rowSpan="2">Diameter IN B</th>
              <th rowSpan="2">Brg Code A Side</th>
              <th rowSpan="2">Brg Code B Side</th>
              <th rowSpan="2">Brg Year A Side</th>
              <th rowSpan="2">Brg Year B Side</th>

              <th rowSpan="2">Brg Make A Side</th>
              <th rowSpan="2">Brg Make B Side</th>
              <th rowSpan="2">Fitment Date</th>
              <th rowSpan="2">Brg. Initial fitment month A Side</th>
              <th rowSpan="2">Brg. Initial fitment month B Side</th>
              <th rowSpan="2">Brg. Service in month A Side</th>
              <th rowSpan="2">Brg. Service in month B Side</th>
              <th rowSpan="2">MTN Brg. No. A Side</th>
              <th rowSpan="2" colSpan={3}>MTN Brg. No. B Side</th>
              {/* <th rowSpan="2" colSpan={3}>Wheel Type</th> */}
              <th rowSpan="2">Shift</th>
              <th rowSpan="2">Gang Name A side</th>
              <th rowSpan="2">Gang Name B side</th>

              <th rowSpan="2">Rod Gauge IN</th>
              {/* <th rowSpan="2">Sound Test IN A</th>
              <th rowSpan="2">Sound Test IN B</th> */}
              <th rowSpan="2">Type Of Repair</th>
              <th rowSpan="2">Matunga Remark</th>
              <th rowSpan="2">Inspector Name</th>
              <th rowSpan="2">Inspector Ticket No.</th>
            </tr>
            <tr>
              <th>Axle No.</th>
              <th>Axle Condition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="">{formDataScheduleICF.ShopSrNumber}</td>
              <td rowSpan="">{formDataScheduleICF.ReceiveDate}</td>
              <td rowSpan="2">{formDataScheduleICF.CoachNumber}</td>
              <td rowSpan="2">{formDataScheduleICF.DiameterINA}</td>
              <td rowSpan="2">{formDataScheduleICF.DiameterINB}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgCodeA}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgCodeB}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgYearA}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgYearB}</td>

              <td rowSpan="2">{formDataScheduleICF.BrgMakeA}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgMakeB}</td>
              {/* <td rowSpan="2">{formDataScheduleICF.RefurbishmentDetailsA}</td>
              <td rowSpan="2">{formDataScheduleICF.RefurbishmentDetailsB}</td> */}
              <td rowSpan="2">{formDataScheduleICF.FitmentDate}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgFitmentA}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgFitmentB}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgServiceA}</td>
              <td rowSpan="2">{formDataScheduleICF.BrgServiceB}</td>
              <td rowSpan="2">{formDataScheduleICF.MTNBrgSideA}</td>
              {/* <td rowSpan="2">{formDataScheduleICF.CTRBStatusA}</td>
              <td rowSpan="2">{formDataScheduleICF.CTRBStatusB}</td> */}
              <td rowSpan="2" colSpan={3}>{formDataScheduleICF.MTNBrgSideB}</td>
              {/* <td rowSpan="2" colSpan={3}>{formDataScheduleICF.WheelType}</td> */}
              <td rowSpan="2">{formDataScheduleICF.Shift}</td>
              <td rowSpan="2">{formDataScheduleICF.GNameAside}</td>
              <td rowSpan="2">{formDataScheduleICF.GNameBside}</td>

              <td rowSpan="2">{formDataScheduleICF.RodGaugeIN}</td>
              {/* <td rowSpan="2">{formDataScheduleICF.SoundTestINA}</td>
              <td rowSpan="2">{formDataScheduleICF.SoundTestINB}</td> */}
              <td rowSpan="2">{formDataScheduleICF.TypeOfRepair}</td>
              <td rowSpan="2">{formDataScheduleICF.MatungaRemark}</td>
              <td rowSpan="2">{formDataScheduleICF.InspectorName}</td>
              <td rowSpan="2">{formDataScheduleICF.InspectorTicketNo}</td>
            </tr>
            <tr>
              <td rowSpan="">{formDataScheduleICF.AxleNumber}</td>
              <td rowSpan="">{formDataScheduleICF.AxleCondition}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>
                Disc Particular
              </th>
              <th colSpan="">A</th>
              <td colSpan="25">{formDataScheduleICF.DiscParticularA}</td>
            </tr>
            <tr>
              <th rowSpan="" colSpan="">
                B
              </th>
              <td colSpan="25">{formDataScheduleICF.DiscParticularB}</td>
            </tr>
            {/* <tr>
              <th rowSpan="2" colSpan={2}>
               Radial clearance dismounted condition
              </th>
              <th colSpan="">A</th>
              <td colSpan="30">{formDataScheduleICF.RCDMA}</td>
            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="30">{formDataScheduleICF.RCDMB}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>
               Radial clearance mounted condition
              </th>
              <th colSpan="">A</th>
              <td colSpan="30">{formDataScheduleICF.RCMA}</td>
            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="30">{formDataScheduleICF.RCMB}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitUpdatedSchedulePreinspection;

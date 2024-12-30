import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntry = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/emu/preinsp/getalldata");
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
    const worksheet = workbook.addWorksheet("EMUPreInspection");

    // Set column widths
    worksheet.getColumn("A").width = 15;
    worksheet.getColumn("B").width = 15;
    worksheet.getColumn("C").width = 15;
    worksheet.getColumn("D").width = 15;
    worksheet.getColumn("E").width = 15;
    worksheet.getColumn("F").width = 15;
    worksheet.getColumn("G").width = 15;
    worksheet.getColumn("H").width = 15;
    worksheet.getColumn("I").width = 15;
    worksheet.getColumn("J").width = 15;
    worksheet.getColumn("K").width = 15;
    worksheet.getColumn("L").width = 15;
    worksheet.getColumn("M").width = 15;
    worksheet.getColumn("N").width = 15;
    worksheet.getColumn("O").width = 15;
    worksheet.getColumn("P").width = 15;
    worksheet.getColumn("Q").width = 15;
    worksheet.getColumn("R").width = 15;
    worksheet.getColumn("S").width = 15;
    worksheet.getColumn("T").width = 15;
    worksheet.getColumn("U").width = 15;
    worksheet.getColumn("V").width = 15;
    worksheet.getColumn("W").width = 15;
    worksheet.getColumn("X").width = 15;
    worksheet.getColumn("Y").width = 15;
    worksheet.getColumn("Z").width = 15;
    worksheet.getColumn("AA").width = 15;
    worksheet.getColumn("AB").width = 15;
    worksheet.getColumn("AC").width = 15;

    // Define border style
    const borderStyle = {
      top: { style: 'thin', color: { argb: '000000' } },
      left: { style: 'thin', color: { argb: '000000' } },
      bottom: { style: 'thin', color: { argb: '000000' } },
      right: { style: 'thin', color: { argb: '000000' } }
    };

    // Define header background color
    const headerFillStyle = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D3D3D3' }
    };

    // Start row index
    let currentRow = 1;

    data.forEach((res, index) => {
      // Merge cells for layout
      worksheet.mergeCells(`W${currentRow}:W${currentRow + 3}`);
      worksheet.mergeCells(`X${currentRow}:X${currentRow + 3}`);
      worksheet.mergeCells(`Y${currentRow}:Y${currentRow + 3}`);
      worksheet.mergeCells(`Z${currentRow}:Z${currentRow + 3}`);
      worksheet.mergeCells(`AA${currentRow}:AA${currentRow + 3}`);
      worksheet.mergeCells(`AB${currentRow}:AB${currentRow + 3}`);
      worksheet.mergeCells(`AC${currentRow}:AC${currentRow + 3}`);
      worksheet.mergeCells(`M${currentRow}:M${currentRow + 3}`);
      worksheet.mergeCells(`N${currentRow}:N${currentRow + 3}`);
      worksheet.mergeCells(`O${currentRow}:O${currentRow + 3}`);
      worksheet.mergeCells(`P${currentRow}:P${currentRow + 3}`);
      worksheet.mergeCells(`Q${currentRow}:Q${currentRow + 3}`);
      worksheet.mergeCells(`R${currentRow}:R${currentRow + 3}`);
      worksheet.mergeCells(`S${currentRow}:S${currentRow + 3}`);
      worksheet.mergeCells(`T${currentRow}:T${currentRow + 3}`);
      worksheet.mergeCells(`U${currentRow}:U${currentRow + 3}`);
      worksheet.mergeCells(`V${currentRow}:V${currentRow + 3}`);
      worksheet.mergeCells(`I${currentRow}:I${currentRow + 3}`);
      worksheet.mergeCells(`J${currentRow}:J${currentRow + 3}`);
      worksheet.mergeCells(`K${currentRow}:K${currentRow + 3}`);
      worksheet.mergeCells(`L${currentRow}:L${currentRow + 3}`);
      worksheet.mergeCells(`D${currentRow}:D${currentRow + 3}`);
      worksheet.mergeCells(`E${currentRow}:E${currentRow + 3}`);
      worksheet.mergeCells(`F${currentRow}:F${currentRow + 3}`);
      worksheet.mergeCells(`G${currentRow}:G${currentRow + 3}`);
      worksheet.mergeCells(`H${currentRow}:H${currentRow + 3}`);
      worksheet.mergeCells(`A${currentRow}:A${currentRow + 1}`);
      worksheet.mergeCells(`B${currentRow}:B${currentRow + 1}`);
      worksheet.mergeCells(`C${currentRow}:C${currentRow + 3}`);
      worksheet.mergeCells(`A${currentRow + 2}:A${currentRow + 3}`);
      worksheet.mergeCells(`B${currentRow + 2}:B${currentRow + 3}`);
      worksheet.mergeCells(`A${currentRow + 4}:A${currentRow + 5}`);
      worksheet.mergeCells(`B${currentRow + 4}:B${currentRow + 5}`);
      worksheet.mergeCells(`C${currentRow + 4}:C${currentRow + 7}`);
      worksheet.mergeCells(`D${currentRow + 4}:D${currentRow + 7}`);
      worksheet.mergeCells(`E${currentRow + 4}:E${currentRow + 7}`);
      worksheet.mergeCells(`F${currentRow + 4}:F${currentRow + 7}`);
      worksheet.mergeCells(`G${currentRow + 4}:G${currentRow + 7}`);
      worksheet.mergeCells(`H${currentRow + 4}:H${currentRow + 7}`);
      worksheet.mergeCells(`I${currentRow + 4}:I${currentRow + 7}`);
      worksheet.mergeCells(`J${currentRow + 4}:J${currentRow + 7}`);
      worksheet.mergeCells(`K${currentRow + 4}:K${currentRow + 7}`);
      worksheet.mergeCells(`L${currentRow + 4}:L${currentRow + 7}`);
      worksheet.mergeCells(`M${currentRow + 4}:M${currentRow + 7}`);
      worksheet.mergeCells(`N${currentRow + 4}:N${currentRow + 7}`);
      worksheet.mergeCells(`O${currentRow + 4}:O${currentRow + 7}`);
      worksheet.mergeCells(`P${currentRow + 4}:P${currentRow + 7}`);
      worksheet.mergeCells(`Q${currentRow + 4}:Q${currentRow + 7}`);
      worksheet.mergeCells(`R${currentRow + 4}:R${currentRow + 7}`);
      worksheet.mergeCells(`S${currentRow + 4}:S${currentRow + 7}`);
      worksheet.mergeCells(`T${currentRow + 4}:T${currentRow + 7}`);
      worksheet.mergeCells(`U${currentRow + 4}:U${currentRow + 7}`);
      worksheet.mergeCells(`V${currentRow + 4}:V${currentRow + 7}`);
      worksheet.mergeCells(`W${currentRow + 4}:W${currentRow + 7}`);
      worksheet.mergeCells(`X${currentRow + 4}:X${currentRow + 7}`);
      worksheet.mergeCells(`Y${currentRow + 4}:Y${currentRow + 7}`);
      worksheet.mergeCells(`Z${currentRow + 4}:Z${currentRow + 7}`);
      worksheet.mergeCells(`AA${currentRow + 4}:AA${currentRow + 7}`);
      worksheet.mergeCells(`AB${currentRow + 4}:AB${currentRow + 7}`);
      worksheet.mergeCells(`AC${currentRow + 4}:AC${currentRow + 7}`);

      worksheet.mergeCells(`A${currentRow + 6}:A${currentRow + 7}`);
      worksheet.mergeCells(`B${currentRow + 6}:B${currentRow + 7}`);

      worksheet.mergeCells(`C${currentRow + 8}:C${currentRow + 9}`);
      worksheet.mergeCells(`C${currentRow + 10}:C${currentRow + 11}`);
      worksheet.mergeCells(`C${currentRow + 12}:C${currentRow + 13}`);
      worksheet.mergeCells(`C${currentRow + 14}:C${currentRow + 15}`);
      worksheet.mergeCells(`C${currentRow + 16}:C${currentRow + 17}`);
      worksheet.mergeCells(`C${currentRow + 18}:C${currentRow + 19}`);

      worksheet.mergeCells(currentRow + 8, 1, currentRow + 11, 2);
      worksheet.mergeCells(currentRow + 12, 1, currentRow + 15, 2);
      worksheet.mergeCells(currentRow + 8, 4, currentRow + 9, 29);
      worksheet.mergeCells(currentRow + 10, 4, currentRow + 11, 29);
      worksheet.mergeCells(currentRow + 12, 4, currentRow + 13, 29);
      worksheet.mergeCells(currentRow + 14, 4, currentRow + 15, 29);
      worksheet.mergeCells(currentRow + 16, 4, currentRow + 19, 29);
      worksheet.mergeCells(currentRow + 16, 1, currentRow + 19, 2);

      // Headers Row
      worksheet.getRow(currentRow).values = [
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
        "Wheel Type",
        "Shift",
        "Gang Name A side",
        "Gang Name B side",
        "Rod Gauge IN",
        "Sound Test IN A",
        "Sound Test IN B",
        "Type Of Repair",
        "Matunga Remark",
        "Inspector Name",
        "Inspector Ticket No.",
      ];

      // Apply borders and header styling to headers
      for (let col = 'A'.charCodeAt(0); col <= 'Z'.charCodeAt(0); col++) {
        const colLetter = String.fromCharCode(col);
        
        const headerCell = worksheet.getCell(`${colLetter}${currentRow}`);
        headerCell.border = borderStyle;
        headerCell.fill = headerFillStyle;
        headerCell.font = { bold: true };
      }
      // Additional columns AA, AB, AC
      ['AA', 'AB', 'AC'].forEach(colLetter => {
        const headerCell = worksheet.getCell(`${colLetter}${currentRow}`);
        headerCell.border = borderStyle;
        headerCell.fill = headerFillStyle;
        headerCell.font = { bold: true };
      });

      worksheet.getRow(currentRow + 2).values = ["Axle No.", "Axle Condition"];

      const additionalStyledCells = [
        `A${currentRow + 2}`,   // A3
        `B${currentRow + 2}`,   // B3
        `A${(currentRow + 8).toString()}`,  // A9
        `A${(currentRow + 12).toString()}`, // A13
        `A${(currentRow + 16).toString()}`  // A17
        // `C${currentRow + 8}`  // C9
        // `C${currentRow + 10}`  // C11
        // `C${currentRow + 12}`  // C13
        // `C${currentRow + 14}`  // C15
       
        // `C${currentRow + 18}`  // C19
      ];

      additionalStyledCells.forEach(cellRef => {
        const cell = worksheet.getCell(cellRef);
        
        // Apply fill (background color)
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'D3D3D3' } // Light gray color
        };
      
        // Apply font styling
        cell.font = { 
          bold: true,
          // You can add more font properties if needed
        };
      
        // Apply border
        cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
        };
      
        // Ensure consistent alignment
        cell.alignment = {
          wrapText: true,
          horizontal: 'center',
          vertical: 'middle'
        };
      });




      worksheet.getRow(currentRow + 4).values = [
        res.ShopSrNumber,
        res.ReceiveDate,
        res.CoachNumber,
        res.DiameterINA,
        res.DiameterINB,
        res.BrgCodeA,
        res.BrgCodeB,
        res.BrgYearA,
        res.BrgYearB,
        res.BrgMakeA,
        res.BrgMakeB,
        res.FitmentDate,
        res.BrgFitmentA,
        res.BrgFitmentB,
        res.BrgServiceA,
        res.BrgServiceB,
        res.MTNBrgSideA,
        res.MTNBrgSideB,
        res.WheelType,
        res.Shift,
        res.GNameAside,
        res.GNameBside,
        res.RodGaugeIN,
        res.SoundTestINA,
        res.SoundTestINB,
        res.TypeOfRepair,
        res.MatungaRemark,
        res.InspectorName,
        res.InspectorTicketNo,
      ];

      worksheet.getRow(currentRow + 6).values = [
        res.AxleNumber,
        res.AxleCondition,
      ];
      worksheet.getRow(currentRow + 8).values = [
        "Disc Particular",
        "",
        "A",
        res.DiscParticularA,
      ];

      worksheet.getRow(currentRow + 10).values = [
        "",
        "",
        "B",
        res.DiscParticularB,
      ];
      worksheet.getRow(currentRow + 12).values = ["Radial clearance dismounted condition", "", "A", res.RCDMA];
      worksheet.getRow(currentRow + 14).values = ["","", "B", res.RCDMB];

      worksheet.getRow(currentRow + 16).values = ["Radial clearance mounted condition", "", "A", res.RCMA];
      worksheet.getRow(currentRow + 18).values = ["", "", "B", res.RCMB];

      const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

      const loginInfo = localStorage.getItem('loggedInUser')
        ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();

      worksheet.getRow(currentRow + 22).values = [
        "Workshop Name",
        workshopName,
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,
      ];

      // Dynamically add borders to all cells
      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.border = borderStyle;
          
          cell.alignment = {
            wrapText: true,
            horizontal: "center",
            vertical: "middle",
          };
        });
      });

      // Move to the next set of rows for the next entry
      currentRow += 30;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "EMUPreInspection.xlsx");
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
        { content: "Wheel Type", rowSpan: 2 },
        { content: "Shift", rowSpan: 2 },
        { content: "Gang Name A side", rowSpan: 2 },
        { content: "Gang Name B side", rowSpan: 2 },
        { content: "Rod Gauge IN", rowSpan: 2 },
        { content: "Sound Test IN A", rowSpan: 2 },
        { content: "Sound Test IN B", rowSpan: 2 },
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
    const body = []
    data.forEach((row) => {
      body.push(
      [
        { content: handleNullValue(row.ShopSrNumber), rowSpan: 1 }, // Data for Shop Sr. No.
        { content: handleNullValue(row.ReceiveDate), rowSpan: 1 }, // All other data with rowSpan 2
        { content: handleNullValue(row.CoachNumber), rowSpan: 2 },
        { content: handleNullValue(row.DiameterINA), rowSpan: 2 },
        { content: handleNullValue(row.DiameterINB), rowSpan: 2 },
        { content: handleNullValue(row.BrgCodeA), rowSpan: 2 },
        { content: handleNullValue(row.BrgCodeB), rowSpan: 2 },
        { content: handleNullValue(row.BrgYearA), rowSpan: 2 },
        { content: handleNullValue(row.BrgYearB), rowSpan: 2 },
        { content: handleNullValue(row.BrgMakeA), rowSpan: 2 },
        { content: handleNullValue(row.BrgMakeB), rowSpan: 2 },
        { content: handleNullValue(row.FitmentDate), rowSpan: 2 },
        { content: handleNullValue(row.BrgFitmentA), rowSpan: 2 },
        { content: handleNullValue(row.BrgFitmentB), rowSpan: 2 },
        { content: handleNullValue(row.BrgServiceA), rowSpan: 2 },
        { content: handleNullValue(row.BrgServiceB), rowSpan: 2 },
        { content: handleNullValue(row.MTNBrgSideA), rowSpan: 2 },
        { content: handleNullValue(row.MTNBrgSideB), rowSpan: 2 },
        { content: handleNullValue(row.WheelType), rowSpan: 2 },
        { content: handleNullValue(row.Shift), rowSpan: 2 },
        { content: handleNullValue(row.GNameAside), rowSpan: 2 },
        { content: handleNullValue(row.GNameBside), rowSpan: 2 },
        { content: handleNullValue(row.RodGaugeIN), rowSpan: 2 },
        { content: handleNullValue(row.SoundTestINA), rowSpan: 2 },
        { content: handleNullValue(row.SoundTestINB), rowSpan: 2 },
        { content: handleNullValue(row.TypeOfRepair), rowSpan: 2 },
        { content: handleNullValue(row.MatungaRemark), rowSpan: 2 },
        { content: handleNullValue(row.InspectorName), rowSpan: 2 },
        { content: handleNullValue(row.InspectorTicketNo), rowSpan: 2 },
      ],
      [
        // Second subrow data for Shop Sr. No. and Axle No.
        { content: handleNullValue(row.AxleNumber), rowSpan: 1 }, // Data for Shop Sr. No.
        { content: handleNullValue(row.AxleCondition), rowSpan: 1 }, // Data for Axle No.
      ],
      // Subrows for "Disc Particular"
      [
        {
          content: "Disc Particular",
          rowSpan: 2,
          colSpan: 2,
        }, // Main Header for Disc Particular
        { content: "A" }, // Subheader A
        { content: handleNullValue(row.DiscParticularA), colSpan: 30 }, // Data for Disc Particular A
      ],
      [
        { content: "B" }, // Subheader B
        { content: handleNullValue(row.DiscParticularB), colSpan: 30 }, // Data for Disc Particular B
      ],
      // Subrows for "Roller Bearing"
      [
        {
          content: "Radial clearance dismounted condition",
          rowSpan: 2,
          colSpan: 2,
        }, // Main Header for Roller Bearing
        { content: "A" }, // Subheader A
        { content: handleNullValue(row.RCDMA), colSpan: 30 }, // Data for Roller Bearing A
      ],
      [
        { content: "B" }, // Subheader B
        { content: handleNullValue(row.RCDMB), colSpan: 30 }, // Data for Roller Bearing B
      ],
      [
        {
          content: "Radial clearance mounted condition",
          rowSpan: 2,
          colSpan: 2,
        }, // Main Header for Roller Bearing
        { content: "A" }, // Subheader A
        { content: handleNullValue(row.RCMA), colSpan: 30 }, // Data for Roller Bearing A
      ],
      [
        { content: "B" }, // Subheader B
        { content: handleNullValue(row.RCMB), colSpan: 30 }, // Data for Roller Bearing B
      ],
      )
    });

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

      margin: { top: 20, right: 20, bottom: 50, left: 20 }, // Adjusted margins
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
    doc.save("EMU Pre-Inspection Form.pdf");
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
      "Wheel Type",
      "Shift",
      "Gang Name A side",
      "Gang Name B side",
      "Rod Gauge IN",
      "Sound Test IN A",
      "Sound Test IN B",
      "Type Of Repair",
      "Matunga Remark",
      "Insp. Name",
      "Insp. T.No.",
      "Disc Particular A",
      "Disc Particular B",
      "Radial clearance dismounted condition A",
      "Radial clearance dismounted condition B",
      "Radial clearance mounted condition A",
      "Radial clearance mounted condition B",
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.ShopSrNumber,
      entry.AxleNumber,
      entry.ReceiveDate,
      entry.AxleCondition,
      entry.CoachNumber,
      entry.DiameterINA,
      entry.DiameterINB,
      entry.BrgCodeA,
      entry.BrgCodeB,
      entry.BrgYearA,
      entry.BrgYearB,
      entry.BrgMakeA,
      entry.BrgMakeB,
      entry.FitmentDate,
      entry.BrgFitmentA,
      entry.BrgFitmentB,
      entry.BrgServiceA,
      entry.BrgServiceB,
      entry.MTNBrgSideA,
      entry.MTNBrgSideB,
      entry.WheelType,
      entry.Shift,
      entry.GNameAside,
      entry.GNameBside,
      entry.RodGaugeIN,
      entry.SoundTestINA,
      entry.SoundTestINB,
      entry.TypeOfRepair,
      entry.MatungaRemark,
      entry.InspectorName,
      entry.InspectorTicketNo,
      entry.DiscParticularA,
      entry.DiscParticularB,
      entry.RCDMA,
      entry.RCDMB,
      entry.RCMA,
      entry.RCMB,
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
    link.setAttribute("download", "EMUSchedulePreInspection.csv");
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
          onClick={() => navigate("/EMUSchedulePreInspection/w1_details")}
        >
          Add New Schedule Pre Inspection Entry
        </button>
        <button
          className="yellow-button"
          onClick={() => navigate("/pending_tasks")}
        >
          Proceed to Next Stage
        </button>
      </div>
      <div id="table-container" className="table_container">
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
              <th rowSpan="2" colSpan={3}>Wheel Type</th>
              <th rowSpan="2">Shift</th>
              <th rowSpan="2">Gang Name A side</th>
              <th rowSpan="2">Gang Name B side</th>

              <th rowSpan="2">Rod Gauge IN</th>
              <th rowSpan="2">Sound Test IN A</th>
              <th rowSpan="2">Sound Test IN B</th>
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

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
              <td rowSpan="">{res.ShopSrNumber}</td>
                <td rowSpan="">{res.ReceiveDate}</td>
                <td rowSpan="2">{res.CoachNumber}</td>
                <td rowSpan="2">{res.DiameterINA}</td>
                <td rowSpan="2">{res.DiameterINB}</td>
                <td rowSpan="2">{res.BrgCodeA}</td>
                <td rowSpan="2">{res.BrgCodeB}</td>
                <td rowSpan="2">{res.BrgYearA}</td>
                <td rowSpan="2">{res.BrgYearB}</td>
                <td rowSpan="2">{res.BrgMakeA}</td>
                <td rowSpan="2">{res.BrgMakeB}</td>
                <td rowSpan="2">{res.FitmentDate}</td>
                <td rowSpan="2">{res.BrgFitmentA}</td>
                <td rowSpan="2">{res.BrgFitmentB}</td>
                <td rowSpan="2">{res.BrgServiceA}</td>
                <td rowSpan="2">{res.BrgServiceB}</td>
                <td rowSpan="2">{res.MTNBrgSideA}</td>
                <td rowSpan="2" colSpan={3}>{res.MTNBrgSideB}</td>
                <td rowSpan="2" colSpan={3}>{res.WheelType}</td>
                <td rowSpan="2">{res.Shift}</td>
                <td rowSpan="2">{res.GNameAside}</td>
                <td rowSpan="2">{res.GNameBside}</td>

                <td rowSpan="2">{res.RodGaugeIN}</td>
                <td rowSpan="2">{res.SoundTestINA}</td>
                <td rowSpan="2">{res.SoundTestINB}</td>
                <td rowSpan="2">{res.TypeOfRepair}</td>
                <td rowSpan="2">{res.MatungaRemark}</td>
                <td rowSpan="2">{res.InspectorName}</td>
                <td rowSpan="2">{res.InspectorTicketNo}</td>
              </tr>
              <tr>
                <td rowSpan="">{res.AxleNumber}</td>
                <td rowSpan="">{res.AxleCondition}</td>
              </tr>
              <tr>
                <th rowSpan="2" colSpan={2}>
                  Disc Particular
                </th>
                <th colSpan="">A</th>
                <td colSpan="30">{res.DiscParticularA}</td>
              </tr>
              <tr>
                <th rowSpan="" colSpan="">
                  B
                </th>
                <td colSpan="30">{res.DiscParticularB}</td>
              </tr>
              <tr>
              <th rowSpan="2" colSpan={2}>
               Radial clearance dismounted condition
              </th>
              <th colSpan="">A</th>
              <td colSpan="30">{res.RCDMA}</td>
            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="30">{res.RCDMB}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>
               Radial clearance mounted condition
              </th>
              <th colSpan="">A</th>
              <td colSpan="30">{res.RCMA}</td>
            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="30">{res.RCMB}</td>
            </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntry;

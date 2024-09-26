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
        const response = await api.get("/prelhb/getalldata");
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
    const worksheet = workbook.addWorksheet("LHBPreInspection");

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
    worksheet.getColumn("AD").width = 15;
    worksheet.getColumn("AE").width = 15;
    worksheet.getColumn("AF").width = 15;
    worksheet.getColumn("AG").width = 15;

    // Start row index
    let currentRow = 1;

    data.forEach((res, index) => {
      // Headers for Wheel Details
      worksheet.mergeCells(`W${currentRow}:W${currentRow + 3}`);
      worksheet.mergeCells(`X${currentRow}:X${currentRow + 3}`);
      worksheet.mergeCells(`Y${currentRow}:Y${currentRow + 3}`);
      worksheet.mergeCells(`Z${currentRow}:Z${currentRow + 3}`);
      worksheet.mergeCells(`AA${currentRow}:AA${currentRow + 3}`);
      worksheet.mergeCells(`AB${currentRow}:AB${currentRow + 3}`);
      worksheet.mergeCells(`AC${currentRow}:AC${currentRow + 3}`);
      worksheet.mergeCells(`AD${currentRow}:AD${currentRow + 3}`);
      worksheet.mergeCells(`AE${currentRow}:AE${currentRow + 3}`);
      worksheet.mergeCells(`AF${currentRow}:AF${currentRow + 3}`);
      worksheet.mergeCells(`AG${currentRow}:AG${currentRow + 3}`);
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
      worksheet.mergeCells(`AD${currentRow + 4}:AD${currentRow + 7}`);
      worksheet.mergeCells(`AE${currentRow + 4}:AE${currentRow + 7}`);
      worksheet.mergeCells(`AF${currentRow + 4}:AF${currentRow + 7}`);
      worksheet.mergeCells(`AG${currentRow + 4}:AG${currentRow + 7}`);

      // worksheet.mergeCells(`F${currentRow + 4}:F${currentRow + 7}`);
      // worksheet.mergeCells(`I${currentRow + 2}:I${currentRow + 3}`);
      // worksheet.mergeCells(`J${currentRow + 4}:J${currentRow + 7}`);
      // worksheet.mergeCells(`K${currentRow + 4}:K${currentRow + 7}`);
      // worksheet.mergeCells(`L${currentRow + 4}:L${currentRow + 7}`);
      worksheet.mergeCells(`A${currentRow + 6}:A${currentRow + 7}`);
      worksheet.mergeCells(`B${currentRow + 6}:B${currentRow + 7}`);

      worksheet.mergeCells(`C${currentRow + 8}:C${currentRow + 9}`);
      worksheet.mergeCells(`C${currentRow + 10}:C${currentRow + 11}`);
      worksheet.mergeCells(`C${currentRow + 12}:C${currentRow + 13}`);
      worksheet.mergeCells(`C${currentRow + 14}:C${currentRow + 15}`);

      worksheet.mergeCells(currentRow + 8, 1, currentRow + 11, 2);
      worksheet.mergeCells(currentRow + 12, 1, currentRow + 15, 2);
      worksheet.mergeCells(currentRow + 8, 4, currentRow + 9, 12);
      worksheet.mergeCells(currentRow + 10, 4, currentRow + 11, 12);
      worksheet.mergeCells(currentRow + 12, 4, currentRow + 13, 12);
      worksheet.mergeCells(currentRow + 14, 4, currentRow + 15, 12);

      worksheet.getRow(currentRow).values = [
        "Shop Sr. No.",
        "Receive Date",
        "Coach No.",
        "Diameter IN A",
        "Diameter IN B",
        "Flage IN",
        "BD No.",
        "BD Make IN",
        "BD Size IN",
        "BD Thickness A",
        "BD Thickness B",
        "BD Defect",
        "CTRB No. A",
        "CTRB No. B",
        "CTRB Make A",
        "CTRB Make B",
        "Refurbishment Details A",
        "Refurbishment Details B",
        "Fitment Date",
        "CTRB Defect",
        "CTRB Defect Name",
        "CTRB Status A",
        "CTRB Status B",
        "CTRB Remaining Life A",
        "CTRB Remaining Life B",
        "CTRB Remark A",
        "CTRB Remark B",
        "Rod Gauge IN",
        "Sound Test IN",
        "Type Of Repair",
        "Matunga Remark",
        "Inspector Name",
        "Inspector Ticket No.",
      ];

      worksheet.getRow(currentRow + 2).values = ["Axle No.", "Axle Condition"];
      worksheet.getRow(currentRow + 4).values = [
        res.ShopSrNumber,
        res.ReceiveDate,
        res.CoachNumber,
        res.DiameterINA,
        res.DiameterINB,
        res.FlageIN,
        res.BDNumber,
        res.BDMakeIN,
        res.BDSizeIN,
        res.BDThicknessA,
        res.BDThicknessB,
        res.BDDefect,
        res.CTRBNumberA,
        res.CTRBNumberB,
        res.CTRBMakeA,
        res.CTRBMakeB,
        res.RefurbishmentDetailsA,
        res.RefurbishmentDetailsB,
        res.FitmentDate,
        res.CTRBDefect,
        res.CTRBDefectName,
        res.CTRBStatusA,
        res.CTRBStatusB,
        res.CTRBRemainingLifeA,
        res.CTRBRemainingLifeB,
        res.CTRBRemarkA,
        res.CTRBRemarkB,
        res.RodGaugeIN,
        res.SoundTestIN,
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
      worksheet.getRow(currentRow + 12).values = ["CTRB", "", "A", res.CTRBA];
      worksheet.getRow(currentRow + 14).values = ["", "", "B", res.CTRBB];
      //Bold Text Headers

      worksheet.getCell(`A${currentRow}`).font = { bold: true };
      worksheet.getCell(`B${currentRow}`).font = { bold: true };
      worksheet.getCell(`C${currentRow}`).font = { bold: true };
      worksheet.getCell(`D${currentRow}`).font = { bold: true };
      worksheet.getCell(`E${currentRow}`).font = { bold: true };
      worksheet.getCell(`F${currentRow}`).font = { bold: true };
      worksheet.getCell(`G${currentRow}`).font = { bold: true };
      worksheet.getCell(`H${currentRow}`).font = { bold: true };
      worksheet.getCell(`I${currentRow}`).font = { bold: true };
      worksheet.getCell(`J${currentRow}`).font = { bold: true };
      worksheet.getCell(`K${currentRow}`).font = { bold: true };
      worksheet.getCell(`L${currentRow}`).font = { bold: true };
      worksheet.getCell(`M${currentRow}`).font = { bold: true };
      worksheet.getCell(`N${currentRow}`).font = { bold: true };
      worksheet.getCell(`O${currentRow}`).font = { bold: true };
      worksheet.getCell(`P${currentRow}`).font = { bold: true };
      worksheet.getCell(`Q${currentRow}`).font = { bold: true };
      worksheet.getCell(`R${currentRow}`).font = { bold: true };
      worksheet.getCell(`S${currentRow}`).font = { bold: true };
      worksheet.getCell(`T${currentRow}`).font = { bold: true };
      worksheet.getCell(`U${currentRow}`).font = { bold: true };
      worksheet.getCell(`V${currentRow}`).font = { bold: true };

      worksheet.getCell(`W${currentRow}`).font = { bold: true };
      worksheet.getCell(`X${currentRow}`).font = { bold: true };
      worksheet.getCell(`Y${currentRow}`).font = { bold: true };
      worksheet.getCell(`Z${currentRow}`).font = { bold: true };
      worksheet.getCell(`AA${currentRow}`).font = { bold: true };
      worksheet.getCell(`AB${currentRow}`).font = { bold: true };
      worksheet.getCell(`AC${currentRow}`).font = { bold: true };
      worksheet.getCell(`AD${currentRow}`).font = { bold: true };
      worksheet.getCell(`AE${currentRow}`).font = { bold: true };
      worksheet.getCell(`AF${currentRow}`).font = { bold: true };
      worksheet.getCell(`AG${currentRow}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`H${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 2}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 12}`).font = { bold: true };

      worksheet.getCell(`C${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 10}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 12}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 14}`).font = { bold: true };

      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.alignment = {
            wrapText: true,
            horizontal: "center",
            vertical: "middle",
          };
        });
      });

      // Move to the next set of rows for the next entry
      currentRow += 21;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBPreInspection.xlsx");
  };

  const exportToPDF = () => {
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
        { content: "Flage IN", rowSpan: 2 },
        { content: "BD No.", rowSpan: 2 },
        { content: "BD Make IN", rowSpan: 2 },
        { content: "BD Size IN", rowSpan: 2 },
        { content: "BD Thickness A", rowSpan: 2 },
        { content: "BD Thickness B", rowSpan: 2 },
        { content: "BD Defect", rowSpan: 2 },
        { content: "CTRB No. A", rowSpan: 2 },
        { content: "CTRB No. B", rowSpan: 2 },
        { content: "CTRB Make A", rowSpan: 2 },
        { content: "CTRB Make B", rowSpan: 2 },
        { content: "Refurbishment Details A", rowSpan: 2 },
        { content: "Refurbishment Details B", rowSpan: 2 },
        { content: "Fitment Date", rowSpan: 2 },
        { content: "CTRB Defect", rowSpan: 2 },
        { content: "CTRB Defect NAME", rowSpan: 2 },
        { content: "CTRB Status A", rowSpan: 2 },
        { content: "CTRB Status B", rowSpan: 2 },
        { content: "CTRB Remaining Life A", rowSpan: 2 },
        { content: "CTRB Remaining Life B", rowSpan: 2 },
        { content: "CTRB Remark A", rowSpan: 2 },
        { content: "CTRB Remark B", rowSpan: 2 },
        { content: "Rod Gauge IN", rowSpan: 2 },
        { content: "Sound Test IN", rowSpan: 2 },
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
    const body = [];

    data.forEach((row) => {
      body.push(
        [
          { content: handleNullValue(row.ShopSrNumber), rowSpan: 1 }, // Data for Shop Sr. No.
          { content: handleNullValue(row.ReceiveDate), rowSpan: 1 }, // All other data with rowSpan 2
          { content: handleNullValue(row.CoachNumber), rowSpan: 2 },
          { content: handleNullValue(row.DiameterINA), rowSpan: 2 },
          { content: handleNullValue(row.DiameterINB), rowSpan: 2 },
          { content: handleNullValue(row.FlageIN), rowSpan: 2 },
          { content: handleNullValue(row.BDNumber), rowSpan: 2 },
          { content: handleNullValue(row.BDMakeIN), rowSpan: 2 },
          { content: handleNullValue(row.BDSizeIN), rowSpan: 2 },
          { content: handleNullValue(row.BDThicknessA), rowSpan: 2 },
          { content: handleNullValue(row.BDThicknessB), rowSpan: 2 },
          { content: handleNullValue(row.BDDefect), rowSpan: 2 },
          { content: handleNullValue(row.CTRBNumberA), rowSpan: 2 },
          { content: handleNullValue(row.CTRBNumberB), rowSpan: 2 },
          { content: handleNullValue(row.CTRBMakeA), rowSpan: 2 },
          { content: handleNullValue(row.CTRBMakeB), rowSpan: 2 },
          { content: handleNullValue(row.RefurbishmentDetailsA), rowSpan: 2 },
          { content: handleNullValue(row.RefurbishmentDetailsB), rowSpan: 2 },
          { content: handleNullValue(row.FitmentDate), rowSpan: 2 },
          { content: handleNullValue(row.CTRBDefect), rowSpan: 2 },
          { content: handleNullValue(row.CTRBDefectName), rowSpan: 2 },
          { content: handleNullValue(row.CTRBStatusA), rowSpan: 2 },
          { content: handleNullValue(row.CTRBStatusB), rowSpan: 2 },
          { content: handleNullValue(row.CTRBRemainingLifeA), rowSpan: 2 },
          { content: handleNullValue(row.CTRBRemainingLifeB), rowSpan: 2 },
          { content: handleNullValue(row.CTRBRemarkA), rowSpan: 2 },
          { content: handleNullValue(row.CTRBRemarkB), rowSpan: 2 },
          { content: handleNullValue(row.RodGaugeIN), rowSpan: 2 },
          { content: handleNullValue(row.SoundTestIN), rowSpan: 2 },
          { content: handleNullValue(row.TypeOfRepair), rowSpan: 2 },
          { content: handleNullValue(row.MatungaRemark), rowSpan: 2 },
          { content: handleNullValue(row.InspectorName), rowSpan: 2 },
          { content: handleNullValue(row.InspectorTicketNo), rowSpan: 2 },
        ],
        [
          { content: handleNullValue(row.AxleNumber), rowSpan: 1 }, // Data for Shop Sr. No.
          { content: handleNullValue(row.AxleCondition), rowSpan: 1 }, // Data for Axle No.
        ],
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
        [
          {
            content: "CTRB",
            rowSpan: 2,
            colSpan: 2,
          }, // Main Header for CTRB
          { content: "A" }, // Subheader A
          { content: handleNullValue(row.CTRBA), colSpan: 30 }, // Data for CTRB A
        ],
        [
          { content: "B" }, // Subheader B
          { content: handleNullValue(row.CTRBB), colSpan: 30 }, // Data for CTRB B
        ]
      );
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
    });

    // Save the PDF
    doc.save("LHB Pre-Inspection Form.pdf");
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
      "BD Make",
      "BD Thickness A",
      "BD Thickness B",
      "BD Defect",
      "CTRB No A",
      "CTRB No B",
      "CTRB Make A",
      "CTRB Make B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "Fitment Date",
      "CTRB Defect A",
      "CTRB Defect B",
      "CTRB Defect Name A",
      "CTRB Defect Name B",
      "CTRB Status A",
      "CTRB Status B",
      "CTRB Remaining Life A",
      "CTRB Remaining Life B",
      "CTRB Remark A",
      "CTRB Remark B",
      "Rod Gauge IN",
      "Sound Test IN A",
      "Sound Test IN B",
      "Type Of Repair",
      "Matunga Remark",
      "Insp. Name",
      "Insp. T.No.",
      "Disc Particular A",
      "Disc Particular B",
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
        entry.BDMakeIN,
        entry.BDThicknessA,
        entry.BDThicknessB,
        entry.BDDefect,
        entry.CTRBNumberA,
        entry.CTRBNumberB,
        entry.CTRBMakeA,
        entry.CTRBMakeB,
        entry.RefurbishmentDetailsA,
        entry.RefurbishmentDetailsB,
        entry.FitmentDate,
        entry.CTRBDefectA,
        entry.CTRBDefectB,
        entry.CTRBDefectNameA,
        entry.CTRBDefectNameB,
        entry.CTRBStatusA,
        entry.CTRBStatusB,
        entry.CTRBRemainingLifeA,
        entry.CTRBRemainingLifeB,
        entry.CTRBRemarkA,
        entry.CTRBRemarkB,
        entry.RodGaugeIN,
        entry.SoundTestINA,
        entry.SoundTestINB,
        entry.TypeOfRepair,
        entry.MatungaRemark,
        entry.InspectorName,
        entry.InspectorTicketNo,
        entry.DiscParticularA,
        entry.DiscParticularB,
       
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
    link.setAttribute("download", "LHBSchedulePreInspection.csv");
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
          onClick={() => navigate("/LHBSchedulePreInspection/details")}
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
              <th rowSpan="2">BD Make IN</th>
              <th rowSpan="2">BD Thickness A</th>
              <th rowSpan="2">BD Thickness B</th>
              <th rowSpan="2">BD Defect</th>

              <th rowSpan="2">CTRB Make A</th>
              <th rowSpan="2">CTRB Make B</th>
              <th rowSpan="2">Refurbishment Details A</th>
              <th rowSpan="2">Refurbishment Details B</th>
              <th rowSpan="2">Fitment Date</th>
              <th rowSpan="2">CTRB Defect A</th>
              <th rowSpan="2">CTRB Defect NAME A</th>
              <th rowSpan="2">CTRB Defect B</th>
              <th rowSpan="2">CTRB Defect NAME B</th>
              <th rowSpan="2">CTRB Status A</th>
              <th rowSpan="2">CTRB Status B</th>
              <th rowSpan="2">CTRB Remaining Life A</th>
              <th rowSpan="2">CTRB Remaining Life B</th>
              <th rowSpan="2">CTRB Remark A</th>
              <th rowSpan="2">CTRB Remark B</th>

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
              <td rowSpan="2">{res.BDMakeIN}</td>
              <td rowSpan="2">{res.BDThicknessA}</td>
              <td rowSpan="2">{res.BDThicknessB}</td>
              <td rowSpan="2">{res.BDDefect}</td>

              <td rowSpan="2">{res.CTRBMakeA}</td>
              <td rowSpan="2">{res.CTRBMakeB}</td>
              <td rowSpan="2">{res.RefurbishmentDetailsA}</td>
              <td rowSpan="2">{res.RefurbishmentDetailsB}</td>
              <td rowSpan="2">{res.FitmentDate}</td>
              <td rowSpan="2">{res.CTRBDefectA}</td>
              <td rowSpan="2">{res.CTRBDefectNameA}</td>
              <td rowSpan="2">{res.CTRBDefectB}</td>
              <td rowSpan="2">{res.CTRBDefectNameB}</td>
              <td rowSpan="2">{res.CTRBStatusA}</td>
              <td rowSpan="2">{res.CTRBStatusB}</td>
              <td rowSpan="2">{res.CTRBRemainingLifeA}</td>
              <td rowSpan="2">{res.CTRBRemainingLifeB}</td>
              <td rowSpan="2">{res.CTRBRemarkA}</td>
              <td rowSpan="2">{res.CTRBRemarkB}</td>

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
              <td colSpan="28">{res.DiscParticularA}</td>
            </tr>
            <tr>
              <th rowSpan="" colSpan="">
                B
              </th>
              <td colSpan="28">{res.DiscParticularB}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>
                CTRB
              </th>
              <th colSpan="">A</th>
              <td colSpan="28">{res.CTRBNumberA}</td>
            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="28">{res.CTRBNumberB}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntry;

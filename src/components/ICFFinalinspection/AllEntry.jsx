import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
// import "../../resources/LHB/finalInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import Breadcrumbs from "./Breadcrumbs";

const AllEntryFinal = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/icf/finalinspection/getalldata");
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


    const setBorderAndBold = (cell, isBold = false) => {
      // Set borders
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } }, // Top border
        bottom: { style: 'thin', color: { argb: '000000' } }, // Bottom border
        left: { style: 'thin', color: { argb: '000000' } }, // Left border
        right: { style: 'thin', color: { argb: '000000' } }, // Right border
      };

      // Set bold font if isBold is true
      if (isBold) {
        cell.font = { bold: true };
      }
    };


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ICFFinalInspection");

    worksheet.getColumn("A").width = 20;
    worksheet.getColumn("B").width = 20;
    worksheet.getColumn("C").width = 20;
    worksheet.getColumn("D").width = 20;
    worksheet.getColumn("E").width = 20;
    worksheet.getColumn("F").width = 20;
    worksheet.getColumn("G").width = 20;
    worksheet.getColumn("H").width = 20;
    worksheet.getColumn("I").width = 20;
    worksheet.getColumn("J").width = 20;
    worksheet.getColumn("K").width = 20;
    worksheet.getColumn("L").width = 20;
    worksheet.getColumn("M").width = 20;
    worksheet.getColumn("N").width = 20;
    worksheet.getColumn("O").width = 20;
    worksheet.getColumn("P").width = 20;
    worksheet.getColumn("Q").width = 20;
    worksheet.getColumn("R").width = 20;
    worksheet.getColumn("S").width = 20;
    worksheet.getColumn("T").width = 20;
    worksheet.getColumn("U").width = 20;
    worksheet.getColumn("V").width = 20;
    worksheet.getColumn("W").width = 20;
    worksheet.getColumn("X").width = 20;
    worksheet.getColumn("Y").width = 20;
    worksheet.getColumn("Z").width = 20;

    worksheet.getColumn("AA").width = 20;
    worksheet.getColumn("AB").width = 20;
    worksheet.getColumn("AC").width = 20;
    worksheet.getColumn("AD").width = 20;
    worksheet.getColumn("AE").width = 20;
    worksheet.getColumn("AF").width = 20;
    worksheet.getColumn("AG").width = 20;
    worksheet.getColumn("AH").width = 20;
    worksheet.getColumn("AI").width = 20;
    worksheet.getColumn("AJ").width = 20;
    worksheet.getColumn("AK").width = 20;
    worksheet.getColumn("AL").width = 20;


    // Start row index
    let currentRow = 1;

    data.forEach((formDataFinalICF, index) => {





      // Headers for Wheel Details
      worksheet.getRow(currentRow + 1).values = [
        "Wheel No",
        "Axle No",
        "Type Of Wheel",
        "Journal Particulars",
        "X", "", "",
        "Taper 0.015/0.010",
        "Y", "", "",
        "Taper 0.015/0.010",
        "Shoulder Size",
        "Ovality 0.015/0.020",
        "Coller Condition",
        "",
        "Axle End Hole Checked Plug Gauge M 16 X 1.5",
        "Brg Code A",
        "Brg Year A",
        "MTN Brg No A",
        "Brg Make A",
        "Radial Clearance Dismounted A",
        "Radial Clearance Mounted A",
        "Brg Initial Fitment Month A",
        "Brg Service In Month A",
        "Brg Code B",
        "Brg Year B",
        "MTN Brg No B",
        "Brg Make B",
        "Radial Clearance Dismounted B",
        "Radial Clearance Mounted B",
        "Brg Initial Fitment Month B",
        "Brg Service In Month B",
        "Fitment Date",
        "Shift",
        "Gang Name A",
        "Gang Name B",
        "Inspector Name",

      ];


      worksheet.getRow(currentRow + 2).values = [
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
        "Wear & Tear",
        "Bend",
      ];


      worksheet.getRow(currentRow + 3).values = [
        formDataFinalICF.WheelNo,
        formDataFinalICF.AxleNo,
        formDataFinalICF.TypeOfWheel,
        "A",
        formDataFinalICF.ParticularAX1,
        formDataFinalICF.ParticularAX2,
        formDataFinalICF.ParticularAX3,
        formDataFinalICF.TaperXA,
        formDataFinalICF.ParticularAY1,
        formDataFinalICF.ParticularAY2,
        formDataFinalICF.ParticularAY3,
        formDataFinalICF.TaperYA,
        formDataFinalICF.ShoulderSizeA,
        formDataFinalICF.OvalityA,
        formDataFinalICF.WearTear,
        formDataFinalICF.Bend,
        formDataFinalICF.AxleEndHole,
        formDataFinalICF.BrgCodeA,
        formDataFinalICF.BrgYearA,
        formDataFinalICF.MTNBrgNoA,
        formDataFinalICF.BrgMakeA,
        formDataFinalICF.RadialClearanceDismountedA,
        formDataFinalICF.RadialClearanceMountedA,
        formDataFinalICF.BrgInitialFitmentMonthA,
        formDataFinalICF.BrgServiceInMonthA,
        formDataFinalICF.BrgCodeB,
        formDataFinalICF.BrgYearB,
        formDataFinalICF.MTNBrgNoB,
        formDataFinalICF.BrgMakeB,
        formDataFinalICF.RadialClearanceDismountedB,
        formDataFinalICF.RadialClearanceMountedB,
        formDataFinalICF.BrgInitialFitmentMonthB,
        formDataFinalICF.BrgServiceInMonthB,
        formDataFinalICF.FitmentDate,
        formDataFinalICF.Shift,
        formDataFinalICF.GangNameA,
        formDataFinalICF.GangNameB,
        formDataFinalICF.InspectorName,


      ];

      worksheet.getRow(currentRow + 4).values = [
        "", "", "", "B",
        formDataFinalICF.ParticularBX1,
        formDataFinalICF.ParticularBX2,
        formDataFinalICF.ParticularBX3,
        formDataFinalICF.TaperXB,
        formDataFinalICF.ParticularBY1,
        formDataFinalICF.ParticularBY2,
        formDataFinalICF.ParticularBY3,
        formDataFinalICF.TaperYB,
        formDataFinalICF.ShoulderSizeB,
        formDataFinalICF.OvalityB,


      ];
      worksheet.mergeCells(`A${currentRow + 3}:A${currentRow + 4}`);
      worksheet.mergeCells(`A${currentRow + 1}:A${currentRow + 2}`);
      worksheet.mergeCells(currentRow + 1, 5, currentRow + 2, 7);
      worksheet.mergeCells(currentRow + 1, 9, currentRow + 2, 11);
      worksheet.mergeCells(currentRow + 1, 17, currentRow + 2, 18);
      worksheet.mergeCells(`C${currentRow + 1}:C${currentRow + 2}`);
      worksheet.mergeCells(`C${currentRow + 3}:C${currentRow + 4}`);
      // worksheet.mergeCells(`G${currentRow + 1}:G${currentRow + 2}`);
      worksheet.mergeCells(`O${currentRow + 3}:O${currentRow + 4}`);
      worksheet.mergeCells(`P${currentRow + 3}:P${currentRow + 4}`);
      worksheet.mergeCells(`B${currentRow + 3}:B${currentRow + 4}`);
      worksheet.mergeCells(`B${currentRow + 1}:B${currentRow + 2}`);
      worksheet.mergeCells(`D${currentRow + 1}:D${currentRow + 2}`);
      worksheet.mergeCells(`H${currentRow + 1}:H${currentRow + 2}`);
      // worksheet.mergeCells(`K${currentRow + 1}:K${currentRow + 2}`);
      worksheet.mergeCells(`L${currentRow + 1}:L${currentRow + 2}`);
      worksheet.mergeCells(`M${currentRow + 1}:M${currentRow + 2}`);
      worksheet.mergeCells(`N${currentRow + 1}:N${currentRow + 2}`);
      worksheet.mergeCells(`O${currentRow + 1}:P${currentRow + 1}`);
      // worksheet.mergeCells(`N${currentRow + 3}:N${currentRow + 4}`);
      // worksheet.mergeCells(`O${currentRow + 3}:O${currentRow + 4}`);
      worksheet.mergeCells(currentRow + 3, 17, currentRow + 4, 18);
      worksheet.mergeCells(`S${currentRow + 1}:S${currentRow + 2}`);
      worksheet.mergeCells(`T${currentRow + 1}:T${currentRow + 2}`);
      worksheet.mergeCells(`U${currentRow + 1}:U${currentRow + 2}`);
      worksheet.mergeCells(`V${currentRow + 1}:V${currentRow + 2}`);
      worksheet.mergeCells(`W${currentRow + 1}:W${currentRow + 2}`);
      worksheet.mergeCells(`X${currentRow + 1}:X${currentRow + 2}`);
      worksheet.mergeCells(`Y${currentRow + 1}:Y${currentRow + 2}`);
      worksheet.mergeCells(`Z${currentRow + 1}:Z${currentRow + 2}`);
      worksheet.mergeCells(`AA${currentRow + 1}:AA${currentRow + 2}`);
      worksheet.mergeCells(`AB${currentRow + 1}:AB${currentRow + 2}`);
      worksheet.mergeCells(`AC${currentRow + 1}:AC${currentRow + 2}`);
      worksheet.mergeCells(`AD${currentRow + 1}:AD${currentRow + 2}`);
      worksheet.mergeCells(`AE${currentRow + 1}:AE${currentRow + 2}`);
      worksheet.mergeCells(`AF${currentRow + 1}:AF${currentRow + 2}`);
      worksheet.mergeCells(`AG${currentRow + 1}:AG${currentRow + 2}`);
      worksheet.mergeCells(`AH${currentRow + 1}:AH${currentRow + 2}`);
      worksheet.mergeCells(`AI${currentRow + 1}:AI${currentRow + 2}`);
      worksheet.mergeCells(`AJ${currentRow + 1}:AJ${currentRow + 2}`);
      worksheet.mergeCells(`AK${currentRow + 1}:AK${currentRow + 2}`);
      worksheet.mergeCells(`AL${currentRow + 1}:AL${currentRow + 2}`);
      worksheet.mergeCells(`S${currentRow + 3}:S${currentRow + 4}`);
      worksheet.mergeCells(`T${currentRow + 3}:T${currentRow + 4}`);
      worksheet.mergeCells(`U${currentRow + 3}:U${currentRow + 4}`);
      worksheet.mergeCells(`V${currentRow + 3}:V${currentRow + 4}`);
      worksheet.mergeCells(`W${currentRow + 3}:W${currentRow + 4}`);
      worksheet.mergeCells(`X${currentRow + 3}:X${currentRow + 4}`);
      worksheet.mergeCells(`Y${currentRow + 3}:Y${currentRow + 4}`);
      worksheet.mergeCells(`Z${currentRow + 3}:Z${currentRow + 4}`);
      worksheet.mergeCells(`AA${currentRow + 3}:AA${currentRow + 4}`);
      worksheet.mergeCells(`AB${currentRow + 3}:AB${currentRow + 4}`);
      worksheet.mergeCells(`AC${currentRow + 3}:AC${currentRow + 4}`);
      worksheet.mergeCells(`AD${currentRow + 3}:AD${currentRow + 4}`);
      worksheet.mergeCells(`AE${currentRow + 3}:AE${currentRow + 4}`);
      worksheet.mergeCells(`AF${currentRow + 3}:AF${currentRow + 4}`);
      worksheet.mergeCells(`AG${currentRow + 3}:AG${currentRow + 4}`);
      worksheet.mergeCells(`AH${currentRow + 3}:AH${currentRow + 4}`);
      worksheet.mergeCells(`AI${currentRow + 3}:AI${currentRow + 4}`);
      worksheet.mergeCells(`AJ${currentRow + 3}:AJ${currentRow + 4}`);
      worksheet.mergeCells(`AK${currentRow + 3}:AK${currentRow + 4}`);
      worksheet.mergeCells(`AL${currentRow + 3}:AL${currentRow + 4}`);




      const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';
      const loginInfo = localStorage.getItem('loggedInUser')
        ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString();


      worksheet.getRow(currentRow + 7).values = [
        "Workshop Name",
        workshopName,
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,


      ];

      worksheet.getCell(`A${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 3}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 4}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`H${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`K${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`L${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`M${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`N${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`N${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`O${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`P${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`Q${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`R${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`S${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`T${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`U${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`V${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`W${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`X${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`Y${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`Z${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AA${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AB${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AC${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AD${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AE${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AF${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AG${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AH${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AI${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AJ${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AK${currentRow + 1}`).font = { bold: true };
      worksheet.getCell(`AL${currentRow + 1}`).font = { bold: true };






      const boldCells = [
        `A${currentRow + 1}`, `B${currentRow + 1}`, `D${currentRow + 3}`, `D${currentRow + 4}`, `C${currentRow + 1}`, `D${currentRow + 1}`,
        `G${currentRow + 1}`, `H${currentRow + 1}`, `K${currentRow + 1}`, `P${currentRow + 2}`,
        `L${currentRow + 1}`, `M${currentRow + 1}`, `N${currentRow + 1}`, `N${currentRow + 2}`, `O${currentRow + 2}`, `P${currentRow + 1}`,
        `S${currentRow + 1}:S${currentRow + 2}`, `Q${currentRow + 1}`,
        `T${currentRow + 1}:T${currentRow + 2}`,
        `U${currentRow + 1}:U${currentRow + 2}`,
        `V${currentRow + 1}:V${currentRow + 2}`,
        `W${currentRow + 1}:W${currentRow + 2}`,
        `X${currentRow + 1}:X${currentRow + 2}`,
        `Y${currentRow + 1}:Y${currentRow + 2}`,
        `Z${currentRow + 1}:Z${currentRow + 2}`,
        `AA${currentRow + 1}:AA${currentRow + 2}`,
        `AB${currentRow + 1}:AB${currentRow + 2}`,
        `AC${currentRow + 1}:AC${currentRow + 2}`,
        `AD${currentRow + 1}:AD${currentRow + 2}`,
        `AE${currentRow + 1}:AE${currentRow + 2}`,
        `AF${currentRow + 1}:AF${currentRow + 2}`,
        `AG${currentRow + 1}:AG${currentRow + 2}`,
        `AH${currentRow + 1}:AH${currentRow + 2}`,
        `AI${currentRow + 1}:AI${currentRow + 2}`,
        `AJ${currentRow + 1}:AJ${currentRow + 2}`,
        `AK${currentRow + 1}:AK${currentRow + 2}`,
        `AL${currentRow + 1}:AL${currentRow + 2}`,


      ];

      boldCells.forEach(cellAddress => {
        const cell = worksheet.getCell(cellAddress);
        cell.font = { bold: true };
        setFaintGreyBackground(cell);
      });

      const startColumn = 1;

      // Apply formatting to each cell in the row
      for (let i = 0; i < 6; i++) {
        const cell = worksheet.getCell(currentRow + 7, startColumn + i);

        // Apply faint grey background
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF0F0F0' } // Light grey color
        };

        // Apply borders
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };

        // Apply bold to label cells (odd-numbered columns)
        if (i % 2 === 0) {
          cell.font = {
            bold: true
          };
        }
      }



      for (let i = 0; i < 6; i++) {
        const cell = worksheet.getCell(currentRow + 36, startColumn + i);

        // Apply faint grey background
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF0F0F0' } // Light grey color
        };

        // Apply borders
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };

        // Apply bold to label cells (odd-numbered columns)
        if (i % 2 === 0) {
          cell.font = {
            bold: true
          };
        }
      }

      //Bold Text Headers


      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          setBorderAndBold(cell);
          cell.alignment = {
            wrapText: true,
            horizontal: "center",
            vertical: "middle",
          };
        });
      });


      // Move to the next set of rows for the next entry
      currentRow += 11;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ICFFinalInspection.xlsx");
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

    // Define the headers, including subheaders for columns with subcolumns
    const tableColumn = [
      [
        { content: "Wheel No.", rowSpan: 2 },
        { content: "Axle No.", rowSpan: 2 },
        { content: "Type of Wheel", rowSpan: 2 },
        { content: "Journal Particulars", rowSpan: 2 },
        { content: "X", rowSpan: 2, colSpan: 3 },
        { content: "Taper 0.015/0.010", rowSpan: 2 },
        { content: "Y", rowSpan: 2, colSpan: 3 },
        { content: "Taper 0.015/0.010", rowSpan: 2 },
        { content: "Shoulder Size", rowSpan: 2 },
        { content: "Ovality", rowSpan: 2 },
        { content: "Coller Condition", colSpan: 2 },
        { content: "Axle End Hole Checked Plug Gauge M 16 X 1.5", rowSpan: 2 },
        { content: "Brg Code A", rowSpan: 2 },
        { content: "Brg Year A", rowSpan: 2 },
        { content: "MTN Brg No A", rowSpan: 2 },
        { content: "Brg Make A", rowSpan: 2 },
        { content: "Radial Clearance Dismounted A", rowSpan: 2 },
        { content: "Radial Clearance Mounted A", rowSpan: 2 },
        { content: "Brg Initial Fitment Month A", rowSpan: 2 },
        { content: "Brg Service In Month A", rowSpan: 2 },
        { content: "Brg Code B", rowSpan: 2 },
        { content: "Brg Year B", rowSpan: 2 },
        { content: "MTN Brg No B", rowSpan: 2 },
        { content: "Brg Make B", rowSpan: 2 },
        { content: "Radial Clearance Dismounted B", rowSpan: 2 },
        { content: "Radial Clearance Mounted B", rowSpan: 2 },
        { content: "Brg Initial Fitment Month B", rowSpan: 2 },
        { content: "Brg Service In Month B", rowSpan: 2 },
        { content: "Fitment Date", rowSpan: 2 },
        { content: "Shift", rowSpan: 2 },
        { content: "Gang Name A", rowSpan: 2 },
        { content: "Gang Name B", rowSpan: 2 },
        { content: "Inspector Name", rowSpan: 2 }
      ],
      [
        { content: "Wear & Tear" },
        { content: "Bend" },
      ],
    ];



    const tableRows = [];

    // Generate rows for each entry
    data.forEach((formDataFinalICF) => {
      const rowA = [
        { content: formDataFinalICF.WheelNo, rowSpan: 2 },
        { content: formDataFinalICF.AxleNo, rowSpan: 2 },
        { content: formDataFinalICF.TypeOfWheel, rowSpan: 2 },
        { content: 'A', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: formDataFinalICF.ParticularAX1, colSpan: 1 },
        { content: formDataFinalICF.ParticularAX2, colSpan: 1 },
        { content: formDataFinalICF.ParticularAX3, colSpan: 1 },
        formDataFinalICF.TaperXA,
        { content: formDataFinalICF.ParticularAY1, colSpan: 1 },
        { content: formDataFinalICF.ParticularAY2, colSpan: 1 },
        { content: formDataFinalICF.ParticularAY3, colSpan: 1 },
        formDataFinalICF.TaperYA,
        formDataFinalICF.ShoulderSizeA,
        formDataFinalICF.OvalityA,
        { content: formDataFinalICF.WearTear, colSpan: 1, rowSpan: 2 },
        { content: formDataFinalICF.Bend, colSpan: 1, rowSpan: 2 },
        { content: formDataFinalICF.AxleEndHole, rowSpan: 2 },
        { content: formDataFinalICF.BrgCodeA, rowSpan: 2 },
        { content: formDataFinalICF.BrgYearA, rowSpan: 2 },
        { content: formDataFinalICF.MTNBrgNoA, rowSpan: 2 },
        { content: formDataFinalICF.BrgMakeA, rowSpan: 2 },
        { content: formDataFinalICF.RadialClearanceDismountedA, rowSpan: 2 },
        { content: formDataFinalICF.RadialClearanceMountedA, rowSpan: 2 },
        { content: formDataFinalICF.BrgInitialFitmentMonthA, rowSpan: 2 },
        { content: formDataFinalICF.BrgServiceInMonthA, rowSpan: 2 },
        { content: formDataFinalICF.BrgCodeB, rowSpan: 2 },
        { content: formDataFinalICF.BrgYearB, rowSpan: 2 },
        { content: formDataFinalICF.MTNBrgNoB, rowSpan: 2 },
        { content: formDataFinalICF.BrgMakeB, rowSpan: 2 },
        { content: formDataFinalICF.RadialClearanceDismountedB, rowSpan: 2 },
        { content: formDataFinalICF.RadialClearanceMountedB, rowSpan: 2 },
        { content: formDataFinalICF.BrgInitialFitmentMonthB, rowSpan: 2 },
        { content: formDataFinalICF.BrgServiceInMonthB, rowSpan: 2 },
        { content: formDataFinalICF.FitmentDate, rowSpan: 2 },
        { content: formDataFinalICF.Shift, rowSpan: 2 },
        { content: formDataFinalICF.GangNameA, rowSpan: 2 },
        { content: formDataFinalICF.GangNameB, rowSpan: 2 },
        { content: formDataFinalICF.InspectorName, rowSpan: 2 }
      ];

      const rowB = [
        { content: 'B', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: formDataFinalICF.ParticularBX1, colSpan: 1 },
        { content: formDataFinalICF.ParticularBX2, colSpan: 1 },
        { content: formDataFinalICF.ParticularBX3, colSpan: 1 },
        formDataFinalICF.TaperXB,
        { content: formDataFinalICF.ParticularBY1, colSpan: 1 },
        { content: formDataFinalICF.ParticularBY2, colSpan: 1 },
        { content: formDataFinalICF.ParticularBY3, colSpan: 1 },
        formDataFinalICF.TaperYB,
        formDataFinalICF.ShoulderSizeB,
        formDataFinalICF.OvalityB,
      ];

      tableRows.push(rowA, rowB);
    });

    // Set autoTable configuration
    doc.autoTable({
      head: tableColumn,
      body: tableRows,
      startX: 10,
      startY: 30,
      tableWidth: "auto",
      theme: "grid",
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        fontSize: 4,
      },
      styles: {
        overflow: "linebreak",
        fontSize: 4,
        cellWidth: "wrap",
        halign: "center",
        valign: "middle",
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
      },
      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 20 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 20 },
        8: { cellWidth: 20 },
        9: { cellWidth: 20 },
        10: { cellWidth: 20 },
        11: { cellWidth: 20 },
        12: { cellWidth: 20 },
        13: { cellWidth: 20 },
        14: { cellWidth: 20 },
        15: { cellWidth: 20 },
        16: { cellWidth: 20 },
        17: { cellWidth: 20 },
        18: { cellWidth: 20 },
        19: { cellWidth: 20 },
        20: { cellWidth: 20 },
        21: { cellWidth: 20 },
        22: { cellWidth: 20 },
        23: { cellWidth: 20 },
        24: { cellWidth: 20 },
        25: { cellWidth: 20 },
        26: { cellWidth: 20 },
        27: { cellWidth: 20 },
        28: { cellWidth: 20 },
        29: { cellWidth: 20 },
        30: { cellWidth: 20 },
        31: { cellWidth: 20 },
        32: { cellWidth: 20 },
      },
      margin: { top: 20, left: 10, right: 10 },
      didDrawPage: (data) => {
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text("ICF Final Inspection Report", data.settings.margin.left, 20);
        }

        const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';
        const SystemName = "Digital Workshop";
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width || pageSize.getWidth();
        const pageHeight = pageSize.height || pageSize.getHeight();

        doc.setFontSize(10);
        const textWidth = doc.getTextWidth(workshopName, SystemName);
        const xCenter = (pageWidth - textWidth) / 2;
        doc.text(workshopName, xCenter, pageHeight - 20);
        doc.text(SystemName, xCenter, pageHeight - 7);

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        doc.text(formattedDate, data.settings.margin.left, pageHeight - 10);

        doc.text(loginInfo, 20, pageHeight - 35);
      },
    });

    const totalPages = doc.internal.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width || pageSize.getWidth();
      const pageHeight = pageSize.height || pageSize.getHeight();
      doc.setFontSize(10);
      const pageNumber = `Page ${i} of ${totalPages}`;
      doc.text(pageNumber, pageWidth - 80, pageHeight - 20);
    }

    doc.save("ICF_Final_Inspection.pdf");
  };




  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Wheel No",
      "Axle No",
      "Type Of Wheel",
      "Particular A X1",
      "Particular A X2",
      "Particular A X3",
      "Particular A Y1",
      "Particular A Y2",
      "Particular A Y3",
      "Taper XA",
      "Taper YA",
      "ShoulderSize A",
      "Ovality A",
      "Particular B X1",
      "Particular B X2",
      "Particular B X3",
      "Particular B Y1",
      "Particular B Y2",
      "Particular B Y3",
      "Taper XB",
      "Taper YB",
      "Shoulder Size B",
      "Ovality B",
      "Wear & Tear",
      "Bend",
      "Axle End Hole",
      "Brg Code A",
      "Brg Year A",
      "MTN Brg No A",
      "Brg Make A",
      "Radial Clearance Dismounted A",
      "Radial Clearance Mounted A",
      "Brg Initial Fitment Month A",
      "Brg Service In Month A",
      "Brg Code B",
      "Brg Year B",
      "MTN Brg No B",
      "Brg Make B",
      "Radial Clearance Dismounted B",
      "Radial Clearance Mounted B",
      "Brg Initial Fitment Month B",
      "Brg Service In Month B",
      "Fitment Date",
      "Shift",
      "Gang Name A",
      "Gang Name B",
      "Inspector Name",
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.WheelNo,
      entry.AxleNo,
      entry.TypeOfWheel,
      entry.ParticularAX1,
      entry.ParticularAX2,
      entry.ParticularAX3,
      entry.ParticularAY1,
      entry.ParticularAY2,
      entry.ParticularAY3,
      entry.TaperXA,
      entry.TaperYA,
      entry.ShoulderSizeA,
      entry.OvalityA,
      entry.ParticularBX1,
      entry.ParticularBX2,
      entry.ParticularBX3,
      entry.ParticularBY1,
      entry.ParticularBY2,
      entry.ParticularBY3,
      entry.TaperXB,
      entry.TaperYB,
      entry.ShoulderSizeB,
      entry.OvalityB,
      entry.WearTear,
      entry.Bend,
      entry.AxleEndHole,
      entry.BrgCodeA,
      entry.BrgYearA,
      entry.MTNBrgNoA,
      entry.BrgMakeA,
      entry.RadialClearanceDismountedA,
      entry.RadialClearanceMountedA,
      entry.BrgInitialFitmentMonthA,
      entry.BrgServiceInMonthA,
      entry.BrgCodeB,
      entry.BrgYearB,
      entry.MTNBrgNoB,
      entry.BrgMakeB,
      entry.RadialClearanceDismountedB,
      entry.RadialClearanceMountedB,
      entry.BrgInitialFitmentMonthB,
      entry.BrgServiceInMonthB,
      entry.FitmentDate,
      entry.Shift,
      entry.GangNameA,
      entry.GangNameB,
      entry.InspectorName,
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
    link.setAttribute("download", "ICFFinalInspection.csv");
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
      <Breadcrumbs />
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
          onClick={() => navigate("/icffinalinspection/wheel_details")}
        >
          Add Entry
        </button>
        <button
          className="yellow-button"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
      <div id="table-container" className="table_container">
        <table>
          <thead className="thead">
            <tr>
              <th rowSpan="2">Wheel No.</th>
              <th rowSpan="2">Axle No.</th>
              <th rowSpan="2">Type of Wheel</th>
              <th rowSpan="2">Journal Particulars</th>
              <th rowSpan="2" colSpan={3}>X</th>
              <th rowSpan="2">Taper 0.015/0.010</th>
              <th rowSpan="2" colSpan={3}>Y</th>
              <th rowSpan="2">Taper 0.015/0.010</th>
              <th rowSpan="2">Shoulder Size</th>
              <th rowSpan="2">Ovality</th>
              <th rowSpan="1" colSpan={2}>Coller Condition</th>
              <th rowSpan="2">Axle End Hole Checked Plug Gauge M 16 X 1.5</th>
              <th rowSpan="2">Brg Code A</th>
              <th rowSpan="2">Brg Year A</th>
              <th rowSpan="2">MTN Brg No. A</th>
              <th rowSpan="2">Brg Make A</th>
              <th rowSpan="2">Radial Clearance in Dismounted Condition A</th>
              <th rowSpan="2">Radial Clearance in Mounted Condition A</th>
              <th rowSpan="2">Brg Initial Fitment Month A</th>
              <th rowSpan="2">Brg Service In Month A</th>
              <th rowSpan="2">Brg Code B</th>
              <th rowSpan="2">Brg Year B</th>
              <th rowSpan="2">MTN Brg No. B</th>
              <th rowSpan="2">Brg Make B</th>
              <th rowSpan="2">Radial Clearance in Dismounted Condition B</th>
              <th rowSpan="2">Radial Clearance in Mounted Condition B</th>
              <th rowSpan="2">Brg Initial Fitment Month B</th>
              <th rowSpan="2">Brg Service In Month B</th>
              <th rowSpan="2">Fitment Date</th>
              <th rowSpan="2">Shift</th>
              <th rowSpan="2">Gang Name A</th>
              <th rowSpan="2">Gang Name B</th>
              <th rowSpan="2">Inspector Name</th>

            </tr>

            <tr>
              <th rowSpan="1" colSpan={1}>Wear & Tear</th>
              <th rowSpan="1" colSpan={1}>Bend</th>
            </tr>
          </thead>

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
                <td rowSpan="2">{res.WheelNo}</td>
                <td rowSpan="2">{res.AxleNo}</td>
                <td rowSpan="2">{res.TypeOfWheel}</td>
                <th rowSpan="1">A</th>
                <td colSpan={1} rowSpan="1">{res.ParticularAX1}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularAX2}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularAX3}</td>
                <td rowSpan="1">{res.TaperXA}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularAY1}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularAY2}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularAY3}</td>
                <td rowSpan="1">{res.TaperXB}</td>
                <td rowSpan="1">{res.ShoulderSizeA}</td>
                <td rowSpan="1">{res.OvalityA}</td>
                <td rowSpan="2" colSpan={1}>{res.WearTear}</td>
                <td rowSpan="2" colSpan={1}>{res.Bend}</td>
                <td rowSpan="2">{res.AxleEndHole}</td>
                <td rowSpan="2">{res.BrgCodeA}</td>
                <td rowSpan="2">{res.BrgYearA}</td>
                <td rowSpan="2">{res.MTNBrgNoA}</td>
                <td rowSpan="2">{res.BrgMakeA}</td>
                <td rowSpan="2">{res.RadialClearanceDismountedA}</td>
                <td rowSpan="2">{res.RadialClearanceMountedA}</td>
                <td rowSpan="2">{res.BrgInitialFitmentMonthA}</td>
                <td rowSpan="2">{res.BrgServiceInMonthA}</td>
                <td rowSpan="2">{res.BrgCodeB}</td>
                <td rowSpan="2">{res.BrgYearB}</td>
                <td rowSpan="2">{res.MTNBrgNoB}</td>
                <td rowSpan="2">{res.BrgMakeB}</td>
                <td rowSpan="2">{res.RadialClearanceDismountedB}</td>
                <td rowSpan="2">{res.RadialClearanceMountedB}</td>
                <td rowSpan="2">{res.BrgInitialFitmentMonthB}</td>
                <td rowSpan="2">{res.BrgServiceInMonthB}</td>
                <td rowSpan="2">{res.FitmentDate}</td>
                <td rowSpan="2">{res.Shift}</td>
                <td rowSpan="2">{res.GangNameA}</td>
                <td rowSpan="2">{res.GangNameB}</td>
                <td rowSpan="2">{res.InspectorName}</td>
              </tr>
              <tr>
                <th rowSpan="1">B</th>
                <td colSpan={1} rowSpan="1">{res.ParticularBX1}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularBX2}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularBX3}</td>
                <td rowSpan="1">{res.TaperXB}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularBY1}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularBY2}</td>
                <td colSpan={1} rowSpan="1">{res.ParticularBY3}</td>
                <td rowSpan="1">{res.TaperYB}</td>
                <td rowSpan="1">{res.ShoulderSizeB}</td>
                <td rowSpan="1">{res.OvalityB}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntryFinal;

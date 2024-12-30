import React from "react";
// import "../../resources/LHB/finalInspectionform/proceedsubmit.css";
import "../../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import api, { postData } from "../../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Breadcrumbs from "./Breadcrumbs";

const ProceedSubmitFinal = ({ formDataFinalEMU, setFormDataFinalEMU }) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/emufinalinspection/editdata/" + formDataFinalEMU.wheelid, formDataFinalEMU); // Use putData for updating

      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);

        // Reset the form
        setFormDataFinalEMU((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 4,
        }));

        // Navigate only after successful update
        navigate("/viewallentryemuFinal");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/emufinalinspection/editdata/" + formDataFinalEMU.wheelid, formDataFinalEMU); // Use putData for updating

      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);

        // Reset the form
        setFormDataFinalEMU((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 4,
        }));

        // Navigate only after successful update
        navigate("/parentedit/edit");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };



  // const exportToExcel = async () => {
  //   const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

  //   const loginInfo = localStorage.getItem('loggedInUser')
  //     ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
  //   const currentDate = new Date();
  //   const formattedDate = currentDate.toLocaleString();
  //   const workbook = new ExcelJS.Workbook();
  //   const worksheet = workbook.addWorksheet("EMUFinalInspection");

  //   // worksheet.addRow(['Workshop Name:', workshopName]);
  //   // worksheet.addRow(['Login Info:', loginInfo]);
  //   // worksheet.addRow(['Date:', formattedDate]);
  //   // worksheet.addRow([]);  // Empty row for spacing





  //   worksheet.columns = [
  //     { header: "Wheel No", key: "WheelNo", width: 10 },
  //     { header: "Type Of Wheel", key: "TypeOfWheel", width: 30 },
  //     { header: "Particular A X1", key: "ParticularAX1", width: 10 },
  //     { header: "Particular A X2", key: "ParticularAX2", width: 10 },
  //     { header: "Particular A X3", key: "ParticularAX3", width: 10 },
  //     { header: "Particular A Y1", key: "ParticularAY1", width: 10 },
  //     { header: "Particular A Y2", key: "ParticularAY2", width: 10 },
  //     { header: "Particular A Y3", key: "ParticularAY3", width: 10 },
  //     { header: "Taper XA", key: "TaperXA", width: 10 },
  //     { header: "Taper YA", key: "TaperYA", width: 10 },
  //     { header: "ShoulderSize A", key: "ShoulderSizeA", width: 15 },
  //     { header: "Ovality A", key: "OvalityA", width: 10 },
  //     { header: "Particular B X1", key: "ParticularBX1", width: 10 },
  //     { header: "Particular B X2", key: "ParticularBX2", width: 10 },
  //     { header: "Particular B X3", key: "ParticularBX3", width: 10 },
  //     { header: "Particular B Y1", key: "ParticularBY1", width: 10 },
  //     { header: "Particular B Y2", key: "ParticularBY2", width: 10 },
  //     { header: "Particular B Y3", key: "ParticularBY3", width: 10 },
  //     { header: "Taper XB", key: "TaperXB", width: 10 },
  //     { header: "Taper YB", key: "TaperYB", width: 10 },
  //     { header: "Shoulder Size B", key: "ShoulderSizeB", width: 15 },
  //     { header: "Ovality B", key: "OvalityB", width: 10 },
  //     { header: "Wear & Tear", key: "WearTear", width: 10 },
  //     { header: "Bend", key: "Bend", width: 10 },
  //     { header: "Journal Particulars", key: "Particulars", width: 10 },
  //     { header: "X", key: "X", width: 10 },
  //     { header: "Axle End Hole", key: "AxleEndHole", width: 10 },
  //     { header: "Workshop Name", key: "workshopName", width: 10 },
  //     { header: "Logged in as", key: "loginInfo", width: 10 },
  //     { header: "Time of Export", key: "formattedDate", width: 10 },

  //   ];

  //   // Add the header rows
  //   worksheet.getRow(1).values = [
  //     "Wheel No",
  //     "Type Of Wheel",
  //     "Journal Particulars",
  //     "X",
  //     "",
  //     "",
  //     "Taper 0.015/0.010",
  //     "Y",
  //     "",
  //     "",
  //     "Taper 0.015/0.010",
  //     "Shoulder Size",
  //     "Ovality",
  //     "Coller Condition",
  //     "",
  //     "Axle End Hole Checked Plug Gauge M 16 X 1.5",


  //   ];

  //   worksheet.getRow(2).values = [
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "",
  //    "Wear & Tear",
  //    "Bend",
  //    "",
  //    "",
  //    "",
  //    "",


  //    ];

  //   // worksheet.getRow(3).values = [
  //   //   "",
  //   //   "",
  //   //   "A",

  //   // ];
  //   // worksheet.getRow(4).values = [
  //   //   "",
  //   //   "",
  //   //   "B",

  //   // ];

  //   // Define the main headers and subheaders (optional for visual layout)
  //   worksheet.mergeCells("A1:A2");
  //   worksheet.mergeCells("B1:B2");
  //   worksheet.mergeCells("C1:C2");
  //   worksheet.mergeCells("A3:A4");
  //   worksheet.mergeCells("B3:B4");
  //   worksheet.mergeCells(1, 4, 2, 6);
  //   worksheet.mergeCells(1,8,2,10);
  //   worksheet.mergeCells("N1:O1");
  //   // worksheet.mergeCells("O1:O2");
  //   worksheet.mergeCells(1,16,2,17);
  //   worksheet.mergeCells("M1:M2");
  //   worksheet.mergeCells("L1:L2");
  //   worksheet.mergeCells("K1:K2");
  //   worksheet.mergeCells("G1:G2");


  //   // Apply styles to headers
  //   worksheet.getRow(1).font = { bold: true };
  //   worksheet.getRow(2).font = { bold: true };
  //   worksheet.getRow(1).alignment = {
  //     horizontal: "center",
  //     vertical: "middle",
  //   };
  //   worksheet.getRow(2).alignment = {
  //     horizontal: "center",
  //     vertical: "middle",
  //   };
  //   worksheet.getRow(3).alignment = {
  //     horizontal: "center",
  //     vertical: "middle",
  //   };
  //   worksheet.getRow(4).alignment = {
  //     horizontal: "center",
  //     vertical: "middle",
  //   };
  //   worksheet.getRow(1).fill = {
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "D3D3D3" },
  //   };
  //   worksheet.getRow(2).fill = {
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "D3D3D3" },
  //   };
  //   worksheet.getCell("C3").fill = {
  //     horizontal: "center",
  //     vertical: "middle",
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "D3D3D3" },
  //   };
  //   worksheet.getCell("C4").fill = {
  //     horizontal: "center",
  //     vertical: "middle",
  //     type: "pattern",
  //     pattern: "solid",
  //     fgColor: { argb: "D3D3D3" },
  //   };

  //   const borderStyle = {
  //     top: { style: "thin" },
  //     left: { style: "thin" },
  //     bottom: { style: "thin" },
  //     right: { style: "thin" },
  //   };

  //   // Apply border style to header row 1
  //   worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
  //     cell.border = borderStyle;
  //   });

  //   // Apply border style to header row 2
  //   worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell) => {
  //     cell.border = borderStyle;
  //   });
  //   worksheet.getRow(3).eachCell({ includeEmpty: false }, (cell) => {
  //     cell.border = borderStyle;
  //   });
  //   worksheet.getRow(4).eachCell({ includeEmpty: false }, (cell) => {
  //     cell.border = borderStyle;
  //   });

  //   worksheet.columns.forEach((column) => {
  //     column.width = column.header.length < 12 ? 12 : column.header.length + 5;
  //   });

  //   // Adjust row height
  //   worksheet.getRow(1).height = 20;
  //   worksheet.getRow(2).height = 20;



  //   // Add data to worksheet
  //   worksheet.addRow({
  //     WheelNo: formDataFinalEMU.WheelNo,
  //     TypeOfWheel: formDataFinalEMU.TypeOfWheel,
  //     Particulars: "A",
  //     X: formDataFinalEMU.ParticularAX1,
  //     WheelRG: formDataFinalEMU.WheelFLG,
  //     WheelFLG: formDataFinalEMU.SizeA,

  //   });

  //   // Generate Excel file
  //   const buffer = await workbook.xlsx.writeBuffer();
  //   const blob = new Blob([buffer], {
  //     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  //   });
  //   saveAs(blob, "EMUFinalInspection.xlsx");
  // };

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


    const setborder = (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } }, // Black border color
        bottom: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    }



    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("EMUFinalInspectionForm");

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


    // Headers for Wheel Details

    worksheet.getRow(1).values = [
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
      "",
      "",
      "",
      "Wear & Tear",
      "Bend",
    ];

    worksheet.getRow(3).values = [
      formDataFinalEMU.WheelNo,
      formDataFinalEMU.AxleNo,
      formDataFinalEMU.TypeOfWheel,
      "A",
      formDataFinalEMU.ParticularAX1,
      formDataFinalEMU.ParticularAX2,
      formDataFinalEMU.ParticularAX3,
      formDataFinalEMU.TaperXA,
      formDataFinalEMU.ParticularAY1,
      formDataFinalEMU.ParticularAY2,
      formDataFinalEMU.ParticularAY3,
      formDataFinalEMU.TaperYA,
      formDataFinalEMU.ShoulderSizeA,
      formDataFinalEMU.OvalityA,
      formDataFinalEMU.WearTear,
      formDataFinalEMU.Bend,
      formDataFinalEMU.AxleEndHole,
      formDataFinalEMU.BrgCodeA,
      formDataFinalEMU.BrgYearA,
      formDataFinalEMU.MTNBrgNoA,
      formDataFinalEMU.BrgMakeA,
      formDataFinalEMU.RadialClearanceDismountedA,
      formDataFinalEMU.RadialClearanceMountedA,
      formDataFinalEMU.BrgInitialFitmentMonthA,
      formDataFinalEMU.BrgServiceInMonthA,
      formDataFinalEMU.BrgCodeB,
      formDataFinalEMU.BrgYearB,
      formDataFinalEMU.MTNBrgNoB,
      formDataFinalEMU.BrgMakeB,
      formDataFinalEMU.RadialClearanceDismountedB,
      formDataFinalEMU.RadialClearanceMountedB,
      formDataFinalEMU.BrgInitialFitmentMonthB,
      formDataFinalEMU.BrgServiceInMonthB,
      formDataFinalEMU.FitmentDate,
      formDataFinalEMU.Shift,
      formDataFinalEMU.GangNameA,
      formDataFinalEMU.GangNameB,
      formDataFinalEMU.InspectorName,


    ];

    worksheet.getRow(4).values = [
      "", "", "", "B",
      formDataFinalEMU.ParticularBX1,
      formDataFinalEMU.ParticularBX2,
      formDataFinalEMU.ParticularBX3,
      formDataFinalEMU.TaperXB,
      formDataFinalEMU.ParticularBY1,
      formDataFinalEMU.ParticularBY2,
      formDataFinalEMU.ParticularBY3,
      formDataFinalEMU.TaperYB,
      formDataFinalEMU.ShoulderSizeB,
      formDataFinalEMU.OvalityB,


    ];





    const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';
    const loginInfo = localStorage.getItem('loggedInUser')
      ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();


    worksheet.getRow(7).values = [
      "Workshop Name",
      workshopName,
      "Logged in as",
      loginInfo,
      "Time of Export",
      formattedDate,


    ];

    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C2");
    worksheet.mergeCells("C3:C4");
    worksheet.mergeCells("D1:D2");
    worksheet.mergeCells("H1:H2");
    worksheet.mergeCells("A3:A4");
    worksheet.mergeCells("B3:B4");
    worksheet.mergeCells("Q1:Q2");
    worksheet.mergeCells("R1:R2");
    worksheet.mergeCells("S1:S2");
    worksheet.mergeCells("T1:T2");
    worksheet.mergeCells("U1:U2");
    worksheet.mergeCells("V1:V2");
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
    worksheet.mergeCells("Q3:Q4");
    worksheet.mergeCells("R3:R4");
    worksheet.mergeCells("S3:S4");
    worksheet.mergeCells("T3:T4");
    worksheet.mergeCells("U3:U4");
    worksheet.mergeCells("V3:V4");
    worksheet.mergeCells("W3:W4");
    worksheet.mergeCells("X3:X4");
    worksheet.mergeCells("Y3:Y4");
    worksheet.mergeCells("Z3:Z4");

    worksheet.mergeCells("AA3:AA4");
    worksheet.mergeCells("AB3:AB4");
    worksheet.mergeCells("AC3:AC4");
    worksheet.mergeCells("AD3:AD4");
    worksheet.mergeCells("AE3:AE4");
    worksheet.mergeCells("AF3:AF4");
    worksheet.mergeCells("AG3:AG4");
    worksheet.mergeCells("AH3:AH4");
    worksheet.mergeCells("AI3:AI4");
    worksheet.mergeCells("AJ3:AJ4");
    worksheet.mergeCells("AK3:AK4");
    worksheet.mergeCells("AL3:AL4");

    worksheet.mergeCells(1, 5, 2, 7);
    worksheet.mergeCells(1, 9, 2, 11);
    worksheet.mergeCells("N1:N2");
    worksheet.mergeCells("O1:P1");
    // worksheet.mergeCells(1, 17, 2, 18);
    worksheet.mergeCells("M1:M2");
    worksheet.mergeCells("L1:L2");
    // worksheet.mergeCells("K1:K2");
    // worksheet.mergeCells("G1:G2");
    // worksheet.mergeCells("N3:N4");
    worksheet.mergeCells("O3:O4");
    worksheet.mergeCells("P3:P4");
    // worksheet.mergeCells(3, 17, 4, 18);




    // Section for Wheel Disc 'B' Side



    // worksheet.getRow(34).values = [
    //   "Logged in as",
    //   loginInfo,
    //   "Time of Export",
    //   formattedDate,
    // ];

    for (let i = 1; i <= 51; i++) {
      worksheet.getRow(i).eachCell(setborder);
    }

    worksheet.getCell("A1").font = { bold: true };
    worksheet.getCell("B1").font = { bold: true };
    worksheet.getCell("C1").font = { bold: true };
    worksheet.getCell("D1").font = { bold: true };
    worksheet.getCell("G1").font = { bold: true };
    worksheet.getCell("H1").font = { bold: true };
    worksheet.getCell("K1").font = { bold: true };
    worksheet.getCell("L1").font = { bold: true };
    worksheet.getCell("M1").font = { bold: true };
    worksheet.getCell("N1").font = { bold: true };
    worksheet.getCell("N2").font = { bold: true };
    worksheet.getCell("O2").font = { bold: true };
    worksheet.getCell("P2").font = { bold: true };
    worksheet.getCell("C4").font = { bold: true };
    worksheet.getCell("A7").font = { bold: true };
    worksheet.getCell("C7").font = { bold: true };
    worksheet.getCell("E7").font = { bold: true };
    worksheet.getCell("P1").font = { bold: true };
    worksheet.getCell("Q1").font = { bold: true };
    worksheet.getCell("R1").font = { bold: true };
    worksheet.getCell("S1").font = { bold: true };
    worksheet.getCell("T1").font = { bold: true };
    worksheet.getCell("U1").font = { bold: true };
    worksheet.getCell("V1").font = { bold: true };
    worksheet.getCell("W1").font = { bold: true };
    worksheet.getCell("X1").font = { bold: true };
    worksheet.getCell("Y1").font = { bold: true };
    worksheet.getCell("Z1").font = { bold: true };

    worksheet.getCell("AA1").font = { bold: true };
    worksheet.getCell("AB1").font = { bold: true };
    worksheet.getCell("AC1").font = { bold: true };
    worksheet.getCell("AD1").font = { bold: true };
    worksheet.getCell("AE1").font = { bold: true };
    worksheet.getCell("AF1").font = { bold: true };
    worksheet.getCell("AG1").font = { bold: true };
    worksheet.getCell("AH1").font = { bold: true };
    worksheet.getCell("AI1").font = { bold: true };
    worksheet.getCell("AJ1").font = { bold: true };
    worksheet.getCell("AK1").font = { bold: true };
    worksheet.getCell("AL1").font = { bold: true };



    const cellsToFormat = [
      'A1', 'B1', 'C1', 'D1', 'G1', 'H1', 'K1', 'L1', 'M1', 'N1', 'N2', 'O2', 'P2', 'D3', 'D4', 'A7', 'C7', 'E7',
      'P1', 'Q1', 'R1', 'S1', 'T1', 'U1', 'V1', 'W1', 'X1', 'Y1', 'Z1', 'AA1', 'AB1', 'AC1', 'AD1', 'AE1', 'AF1',
      'AG1', 'AH1', 'AI1', 'AJ1', 'AK1', 'AL1'

    ];

    cellsToFormat.forEach(cell => {
      setFaintGreyBackground(worksheet.getCell(cell));

    });

    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = {
          wrapText: true,
          horizontal: "center",
          vertical: "middle",
        };
      });
    });

    // Save Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "EMUFinalInspectionForm.xlsx");
    });
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

    // Define your table data. For demonstration, we will use dummy data.
    const tableRows = [
      [
        { content: formDataFinalEMU.WheelNo, rowSpan: 2 },
        { content: formDataFinalEMU.AxleNo, rowSpan: 2 },
        { content: formDataFinalEMU.TypeOfWheel, rowSpan: 2 },
        { content: 'A', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: formDataFinalEMU.ParticularAX1, colSpan: 1 },
        { content: formDataFinalEMU.ParticularAX2, colSpan: 1 },
        { content: formDataFinalEMU.ParticularAX3, colSpan: 1 },
        formDataFinalEMU.TaperXA,
        { content: formDataFinalEMU.ParticularAY1, colSpan: 1 },
        { content: formDataFinalEMU.ParticularAY2, colSpan: 1 },
        { content: formDataFinalEMU.ParticularAY3, colSpan: 1 },
        formDataFinalEMU.TaperYA,
        formDataFinalEMU.ShoulderSizeA,
        formDataFinalEMU.OvalityA,
        { content: formDataFinalEMU.WearTear, colSpan: 1, rowSpan: 2 },
        { content: formDataFinalEMU.Bend, colSpan: 1, rowSpan: 2 },
        { content: formDataFinalEMU.AxleEndHole, rowSpan: 2 },
        { content: formDataFinalEMU.BrgCodeA, rowSpan: 2 },
        { content: formDataFinalEMU.BrgYearA, rowSpan: 2 },
        { content: formDataFinalEMU.MTNBrgNoA, rowSpan: 2 },
        { content: formDataFinalEMU.BrgMakeA, rowSpan: 2 },
        { content: formDataFinalEMU.RadialClearanceDismountedA, rowSpan: 2 },
        { content: formDataFinalEMU.RadialClearanceMountedA, rowSpan: 2 },
        { content: formDataFinalEMU.BrgInitialFitmentMonthA, rowSpan: 2 },
        { content: formDataFinalEMU.BrgServiceInMonthA, rowSpan: 2 },
        { content: formDataFinalEMU.BrgCodeB, rowSpan: 2 },
        { content: formDataFinalEMU.BrgYearB, rowSpan: 2 },
        { content: formDataFinalEMU.MTNBrgNoB, rowSpan: 2 },
        { content: formDataFinalEMU.BrgMakeB, rowSpan: 2 },
        { content: formDataFinalEMU.RadialClearanceDismountedB, rowSpan: 2 },
        { content: formDataFinalEMU.RadialClearanceMountedB, rowSpan: 2 },
        { content: formDataFinalEMU.BrgInitialFitmentMonthB, rowSpan: 2 },
        { content: formDataFinalEMU.BrgServiceInMonthB, rowSpan: 2 },
        { content: formDataFinalEMU.FitmentDate, rowSpan: 2 },
        { content: formDataFinalEMU.Shift, rowSpan: 2 },
        { content: formDataFinalEMU.GangNameA, rowSpan: 2 },
        { content: formDataFinalEMU.GangNameB, rowSpan: 2 },
        { content: formDataFinalEMU.InspectorName, rowSpan: 2 }


      ],
      [

        { content: 'B', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: formDataFinalEMU.ParticularBX1, colSpan: 1 },
        { content: formDataFinalEMU.ParticularBX2, colSpan: 1 },
        { content: formDataFinalEMU.ParticularBX3, colSpan: 1 },
        formDataFinalEMU.TaperXB,
        { content: formDataFinalEMU.ParticularBY1, colSpan: 1 },
        { content: formDataFinalEMU.ParticularBY2, colSpan: 1 },
        { content: formDataFinalEMU.ParticularBY3, colSpan: 1 },
        formDataFinalEMU.TaperYB,
        formDataFinalEMU.ShoulderSizeB,
        formDataFinalEMU.OvalityB,


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
      margin: { top: 20, left: 10, right: 10 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "EMU Final Inspection Report",
            data.settings.margin.left,
            20
          );
        }

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

    doc.save("EMU_Final_Inspection.pdf");
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
    const rows = [
      [
        formDataFinalEMU.WheelNo,
        formDataFinalEMU.AxleNo,
        formDataFinalEMU.TypeOfWheel,
        formDataFinalEMU.ParticularAX1,
        formDataFinalEMU.ParticularAX2,
        formDataFinalEMU.ParticularAX3,
        formDataFinalEMU.ParticularAY1,
        formDataFinalEMU.ParticularAY2,
        formDataFinalEMU.ParticularAY3,
        formDataFinalEMU.TaperXA,
        formDataFinalEMU.TaperYA,
        formDataFinalEMU.ShoulderSizeA,
        formDataFinalEMU.OvalityA,
        formDataFinalEMU.ParticularBX1,
        formDataFinalEMU.ParticularBX2,
        formDataFinalEMU.ParticularBX3,
        formDataFinalEMU.ParticularBY1,
        formDataFinalEMU.ParticularBY2,
        formDataFinalEMU.ParticularBY3,
        formDataFinalEMU.TaperXB,
        formDataFinalEMU.TaperYB,
        formDataFinalEMU.ShoulderSizeB,
        formDataFinalEMU.OvalityB,
        formDataFinalEMU.WearTear,
        formDataFinalEMU.Bend,
        formDataFinalEMU.AxleEndHole,
        formDataFinalEMU.BrgCodeA,
        formDataFinalEMU.BrgYearA,
        formDataFinalEMU.MTNBrgNoA,
        formDataFinalEMU.BrgMakeA,
        formDataFinalEMU.RadialClearanceDismountedA,
        formDataFinalEMU.RadialClearanceMountedA,
        formDataFinalEMU.BrgInitialFitmentMonthA,
        formDataFinalEMU.BrgServiceInMonthA,
        formDataFinalEMU.BrgCodeB,
        formDataFinalEMU.BrgYearB,
        formDataFinalEMU.MTNBrgNoB,
        formDataFinalEMU.BrgMakeB,
        formDataFinalEMU.RadialClearanceDismountedB,
        formDataFinalEMU.RadialClearanceMountedB,
        formDataFinalEMU.BrgInitialFitmentMonthB,
        formDataFinalEMU.BrgServiceInMonthB,
        formDataFinalEMU.FitmentDate,
        formDataFinalEMU.Shift,
        formDataFinalEMU.GangNameA,
        formDataFinalEMU.GangNameB,
        formDataFinalEMU.InspectorName,
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
    link.setAttribute("download", "EMUFinalInspection.csv");
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
          Update
        </button>
        <button className="blue_button" onClick={handleNext}>
          Update & View All Entries
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
            <tr>
              <td rowSpan="2">{formDataFinalEMU.WheelNo}</td>
              <td rowSpan="2">{formDataFinalEMU.AxleNo}</td>
              <td rowSpan="2">{formDataFinalEMU.TypeOfWheel}</td>
              <th rowSpan="1">A</th>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularAX1}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularAX2}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularAX3}</td>
              <td rowSpan="1">{formDataFinalEMU.TaperXA}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularAY1}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularAY2}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularAY3}</td>
              <td rowSpan="1">{formDataFinalEMU.TaperXB}</td>
              <td rowSpan="1">{formDataFinalEMU.ShoulderSizeA}</td>
              <td rowSpan="1">{formDataFinalEMU.OvalityA}</td>
              <td rowSpan="2" colSpan={1}>{formDataFinalEMU.WearTear}</td>
              <td rowSpan="2" colSpan={1}>{formDataFinalEMU.Bend}</td>
              <td rowSpan="2">{formDataFinalEMU.AxleEndHole}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgCodeA}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgYearA}</td>
              <td rowSpan="2">{formDataFinalEMU.MTNBrgNoA}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgMakeA}</td>
              <td rowSpan="2">{formDataFinalEMU.RadialClearanceDismountedA}</td>
              <td rowSpan="2">{formDataFinalEMU.RadialClearanceMountedA}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgInitialFitmentMonthA}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgServiceInMonthA}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgCodeB}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgYearB}</td>
              <td rowSpan="2">{formDataFinalEMU.MTNBrgNoB}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgMakeB}</td>
              <td rowSpan="2">{formDataFinalEMU.RadialClearanceDismountedB}</td>
              <td rowSpan="2">{formDataFinalEMU.RadialClearanceMountedB}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgInitialFitmentMonthB}</td>
              <td rowSpan="2">{formDataFinalEMU.BrgServiceInMonthB}</td>
              <td rowSpan="2">{formDataFinalEMU.FitmentDate}</td>
              <td rowSpan="2">{formDataFinalEMU.Shift}</td>
              <td rowSpan="2">{formDataFinalEMU.GangNameA}</td>
              <td rowSpan="2">{formDataFinalEMU.GangNameB}</td>
              <td rowSpan="2">{formDataFinalEMU.InspectorName}</td>
            </tr>
            <tr>
              <th rowSpan="1">B</th>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularBX1}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularBX2}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularBX3}</td>
              <td rowSpan="1">{formDataFinalEMU.TaperXB}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularBY1}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularBY2}</td>
              <td colSpan={1} rowSpan="1">{formDataFinalEMU.ParticularBY3}</td>
              <td rowSpan="1">{formDataFinalEMU.TaperYB}</td>
              <td rowSpan="1">{formDataFinalEMU.ShoulderSizeB}</td>
              <td rowSpan="1">{formDataFinalEMU.OvalityB}</td>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitFinal;

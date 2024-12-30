import React from "react";
// import "../../resources/LHB/lhbpressonform/proceedsubmit.css";
import "../../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import api, { postData } from "../../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmitPressOn = ({
  formDataPressOnLHB,
  setFormDataPressOnLHB,
}) => {
  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/presson/editdata/" + formDataPressOnLHB.wheelid, formDataPressOnLHB); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataPressOnLHB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 1,
        }));
  
        // Navigate only after successful update
        navigate("/viewallentrylhbpresson");
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
      const response = await api.put("/presson/editdata/" + formDataPressOnLHB.wheelid, formDataPressOnLHB); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataPressOnLHB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 1,
        }));
  
        // Navigate only after successful update
        navigate("/edit");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
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


    const setborder = (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } }, // Black border color
        bottom: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    }



    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBPressOnForm");





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

    // Headers for Wheel Details
    worksheet.mergeCells(1, 2, 2, 3);
    worksheet.mergeCells(1, 4, 2, 5);
    worksheet.mergeCells(1, 6, 2, 7);
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("A3:A4");
    worksheet.mergeCells("H3:H4");
    worksheet.mergeCells("I3:I4");
    worksheet.mergeCells("J3:J4");

    worksheet.mergeCells(3, 2, 4, 3);
    worksheet.mergeCells(3, 4, 4, 5);
    worksheet.mergeCells(3, 6, 4, 7);

    worksheet.mergeCells("H1:H2");
    worksheet.mergeCells("I1:I2");
    worksheet.mergeCells("J1:J2");
    worksheet.mergeCells("A5:A6");
    worksheet.mergeCells("B5:B6");
    worksheet.mergeCells("C5:C6");

    worksheet.mergeCells("A7:A8");
    worksheet.mergeCells("B7:B8");
    worksheet.mergeCells("C7:C8");
    worksheet.mergeCells("D7:D8");
    worksheet.mergeCells("E7:E8");
    worksheet.mergeCells("F7:F8");
    worksheet.mergeCells("G7:G8");
    worksheet.mergeCells("H7:H8");
    worksheet.mergeCells("I7:I8");
    worksheet.mergeCells("J7:J8");

    worksheet.mergeCells("D13:D14");
    worksheet.mergeCells("E13:E14");
    worksheet.mergeCells("F13:F14");
    worksheet.mergeCells(13, 7, 14, 8);
    worksheet.mergeCells(13, 9, 14, 10);
    worksheet.mergeCells(13, 1, 14, 3);


    worksheet.getRow(1).values = [

      "Wheel Activities",
      "Axle Wheel Seat Size",
      "",
      "Wheel Disc Bore Size",
      "",
      "Wheel Disc Stamping Particulars",
      "",
      "Press-On No.",
      "BD Thickness	",
      "BD Make",


    ]

    worksheet.getRow(3).values = [

      formDataPressOnLHB.WheelActivities,
      formDataPressOnLHB.AxleWheelSeatSize,
      "",
      formDataPressOnLHB.WheelDiscBoreSize,
      "",
      formDataPressOnLHB.wheelDiscStampingParticulars,
      "",
      formDataPressOnLHB.PressOnNumber,
      formDataPressOnLHB.WheelActivityBDThickness,
      formDataPressOnLHB.WheelActivityBDMake,

    ]

    worksheet.getRow(5).values = [
      "Wheel No.",
      formDataPressOnLHB.WheelNo,
      "Axle No.",
      formDataPressOnLHB.AxleNo,
    ];
    worksheet.mergeCells(5, 4, 6, 10);
    worksheet.getRow(7).values = [
      "ATL No.",
      formDataPressOnLHB.ATLNo,
      "Wheel Seat Size",
      formDataPressOnLHB.WheelSeatSize,
      "BD Seat Size",
      formDataPressOnLHB.BDSeatSize,
      "RA Value",
      formDataPressOnLHB.RAValue,
      "Operator Name",
      "",
      formDataPressOnLHB.OperatorName,
    ];

    // Section for Wheel Disc 'A' Side
    worksheet.addRow([]);
    worksheet.getRow(10).values = ["Wheel Disc 'A' Side"];
    worksheet.mergeCells("A10:J10");
    worksheet.getRow(10).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(5, 6).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(8, 9).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(13, 14).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(10).font = { bold: true };
    worksheet.getRow(11).values = [
      "VTL No.",
      formDataPressOnLHB.WheelDiscAVTLNO,
      "Bore Size By Operator",
      formDataPressOnLHB.WheelDiscABoreSizeByOperator,
      "RA Value",
      formDataPressOnLHB.WheelDiscARAValue,
      "Operator Name",
      formDataPressOnLHB.WheelDiscAOperatorName,
    ];
    worksheet.mergeCells("A11:A12");
    worksheet.mergeCells("B11:B12");
    worksheet.mergeCells("C11:C12");
    worksheet.mergeCells("D11:D12");
    worksheet.mergeCells("E11:E12");
    worksheet.mergeCells("F11:F12");
    worksheet.mergeCells(11, 7, 12, 8);
    worksheet.mergeCells(11, 9, 12, 10);
    worksheet.getRow(13).values = [
      "A' Bore Size",
      "",
      "",
      "B' Wheel Seat Size (192-195mm)",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "RD No.",
      "",
      "Wheel Disc Particulars",
    ];

    worksheet.getRow(15).values = [
      "Insp.",
      "X-axis",
      "Y-axis",
      formDataPressOnLHB.WheelDiscABWheelSeatSize,
      formDataPressOnLHB.WheelDiscAAllow,
      formDataPressOnLHB.WheelDiscAPressOnPressure,
      formDataPressOnLHB.WheelDiscARDNo,
      "",
      formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
    ];

    worksheet.getRow(16).values = [
      "Top",
      formDataPressOnLHB.WheelDiscATopXAxis,
      formDataPressOnLHB.WheelDiscATopYAxis,
    ];
    worksheet.getRow(17).values = [
      "Middle",
      formDataPressOnLHB.WheelDiscAMiddleXAxis,
      formDataPressOnLHB.WheelDiscAMiddleYAxis,
    ];
    worksheet.getRow(18).values = [
      "Lower",
      formDataPressOnLHB.WheelDiscALowerXAxis,
      formDataPressOnLHB.WheelDiscALowerYAxis,
    ];
    worksheet.getRow(19).values = [
      "Avg.",
      formDataPressOnLHB.WheelDiscAAvgXAxis,
      formDataPressOnLHB.WheelDiscAAvgYAxis,
    ];
    worksheet.mergeCells("D15:D19");
    worksheet.mergeCells("E15:E19");
    worksheet.mergeCells("F15:F19");
    worksheet.mergeCells(15, 7, 19, 8);
    worksheet.mergeCells(15, 9, 19, 10);

    // Section for Wheel Disc 'B' Side
    worksheet.addRow([]);
    worksheet.mergeCells("A21:J21");
    worksheet.getCell("A21").value = "Wheel Disc 'B' Side";
    worksheet.getCell("A21").font = { bold: true };

    worksheet.getRow(22).values = [
      "VTL No.",
      formDataPressOnLHB.WheelDiscBVTLNo,
      "Bore Size By Operator",
      formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
      "RA Value",
      formDataPressOnLHB.WheelDiscBRAValue,
      "Operator Name",
      "",
      formDataPressOnLHB.WheelDiscBOperatorName,
    ];
    worksheet.mergeCells("A22:A23");
    worksheet.mergeCells("B22:B23");
    worksheet.mergeCells("C22:C23");
    worksheet.mergeCells("D22:D23");
    worksheet.mergeCells("E22:E23");
    worksheet.mergeCells("F22:F23");
    worksheet.mergeCells(22, 7, 23, 8);
    worksheet.mergeCells(22, 9, 23, 10);


    worksheet.getRow(24).values = [
      "A' Bore Size",
      "",
      "",
      "B' Wheel Seat Size (192-195mm)",
      "C=B-A int Allow (0.240-0.300mm)",
      "Press-On Pressure (69T-109T)",
      "RD No.",
      "",
      "Wheel Disc Particulars",
    ];
    worksheet.mergeCells("A24:C24");
    worksheet.mergeCells("G24:H24");
    worksheet.mergeCells("I24:J24");

    worksheet.getRow(25).values = [
      "Insp.",
      "X-axis",
      "Y-axis",
      formDataPressOnLHB.WheelDiscBBWheelSeatSize,
      formDataPressOnLHB.WheelDiscBAllow,
      formDataPressOnLHB.WheelDiscBPressOnPressure,
      formDataPressOnLHB.WheelDiscBRDNo,
      "",
      formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
    ];

    worksheet.getRow(26).values = [
      "Top",
      formDataPressOnLHB.WheelDiscBTopXAxis,
      formDataPressOnLHB.WheelDiscBTopYAxis,
    ];
    worksheet.getRow(27).values = [
      "Middle",
      formDataPressOnLHB.WheelDiscBMiddleXAxis,
      formDataPressOnLHB.WheelDiscBMiddleYAxis,
    ];
    worksheet.getRow(28).values = [
      "Lower",
      formDataPressOnLHB.WheelDiscBLowerXAxis,
      formDataPressOnLHB.WheelDiscBLowerYAxis,
    ];
    worksheet.getRow(29).values = [
      "Avg.",
      formDataPressOnLHB.WheelDiscBAvgXAxis,
      formDataPressOnLHB.WheelDiscBAvgYAxis,
    ];
    worksheet.mergeCells("D25:D29");
    worksheet.mergeCells("E25:E29");
    worksheet.mergeCells("F25:F29");
    worksheet.mergeCells(25, 7, 29, 8);
    worksheet.mergeCells(25, 9, 29, 10);

    // Section for Brake Disc 'A' Side
    worksheet.addRow([]);
    worksheet.mergeCells("A31:J31");
    worksheet.getCell("A31").value = "Brake Disc 'A' Side";
    worksheet.getCell("A31").font = { bold: true };




    worksheet.getRow(32).values = [
      "A' Bore Size",
      "",
      "",
      "B' BD Seat Size (199.230-199.260mm)",
      "C=B-A int Allow (0.230-0.260mm)",
      "Press-On Pressure (69T-109T)",
      "BD Thickness",
      "",
      "Brake Disc make & Particulars",
    ];
    worksheet.mergeCells("A32:C32");
    worksheet.mergeCells("G32:H32");
    worksheet.mergeCells("I32:J32");

    worksheet.getRow(33).values = [
      "Insp.",
      "X-axis",
      "Y-axis",
      formDataPressOnLHB.BrakeDiscABBDSeatSize,
      formDataPressOnLHB.BrakeDiscAAllow,
      formDataPressOnLHB.BrakeDiscAPressOnPressure,
      formDataPressOnLHB.BrakeDiscABDThickness,
      "",
      formDataPressOnLHB.BrakeDiscABrakeDiscParticulars,
    ];



    worksheet.getRow(34).values = [
      "Top",
      formDataPressOnLHB.BrakeDiscATopXAxis,
      formDataPressOnLHB.BrakeDiscATopYAxis,
    ];
    worksheet.getRow(35).values = [
      "Middle",
      formDataPressOnLHB.BrakeDiscAMiddleXAxis,
      formDataPressOnLHB.BrakeDiscAMiddleYAxis,
    ];
    worksheet.getRow(36).values = [
      "Lower",
      formDataPressOnLHB.BrakeDiscALowerXAxis,
      formDataPressOnLHB.BrakeDiscALowerYAxis,
    ];
    worksheet.getRow(37).values = [
      "Avg.",
      formDataPressOnLHB.BrakeDiscAAvgXAxis,
      formDataPressOnLHB.BrakeDiscAAvgYAxis,
    ];
    worksheet.mergeCells("D33:D37");
    worksheet.mergeCells("E33:E37");
    worksheet.mergeCells("F33:F37");
    worksheet.mergeCells(33, 7, 37, 8);
    worksheet.mergeCells(33, 9, 37, 10);

    // Section for Brake Disc 'B' Side
    worksheet.addRow([]);
    worksheet.mergeCells("A39:J39");
    worksheet.getCell("A39").value = "Brake Disc 'B' Side";
    worksheet.getCell("A39").font = { bold: true };





    worksheet.getRow(40).values = [
      "A' Bore Size",
      "",
      "",
      "B' BD Seat Size (199.230-199.260mm)",
      "C=B-A int Allow (0.230-0.260mm)",
      "Press-On Pressure (69T-109T)",
      "BD Thickness",
      "",
      "Brake Disc make & Particulars",
    ];
    worksheet.mergeCells("A40:C40");
    worksheet.mergeCells("G40:H40");
    worksheet.mergeCells("I40:J40");


    worksheet.getRow(41).values = [
      "Insp.",
      "X-axis",
      "Y-axis",
      formDataPressOnLHB.BrakeDiscBBBDSeatSize,
      formDataPressOnLHB.BrakeDiscBAllow,
      formDataPressOnLHB.BrakeDiscBPressOnPressure,
      formDataPressOnLHB.BrakeDiscBBDThickness,
      "",
      formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars,
    ];


    worksheet.getRow(42).values = [
      "Top",
      formDataPressOnLHB.BrakeDiscBTopXAxis,
      formDataPressOnLHB.BrakeDiscBTopYAxis,
    ];
    worksheet.getRow(43).values = [
      "Middle",
      formDataPressOnLHB.BrakeDiscBMiddleXAxis,
      formDataPressOnLHB.BrakeDiscBMiddleYAxis,
    ];
    worksheet.getRow(44).values = [
      "Lower",
      formDataPressOnLHB.BrakeDiscBLowerXAxis,
      formDataPressOnLHB.BrakeDiscBLowerYAxis,
    ];
    worksheet.getRow(45).values = [
      "Avg.",
      formDataPressOnLHB.BrakeDiscBAvgXAxis,
      formDataPressOnLHB.BrakeDiscBAvgYAxis,
    ];
    worksheet.mergeCells("D41:D45");
    worksheet.mergeCells("E41:E45");
    worksheet.mergeCells("F41:F45");
    worksheet.mergeCells(41, 7, 45, 8);
    worksheet.mergeCells(41, 9, 45, 10);


    worksheet.getRow(49).values = [
      "M/C No.",
      formDataPressOnLHB.MCNo,
      "Operator Name",
      formDataPressOnLHB.OperatorNameFinal,
      "Operator No.",
      formDataPressOnLHB.OperatorNo,
      "Inspector Name",
      formDataPressOnLHB.InspectorName,
      "Inspector No.",
      formDataPressOnLHB.InspectorNo,
    ];

    const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

          const loginInfo = localStorage.getItem('loggedInUser')
            ? `${localStorage.getItem('loggedInUser')}`: 'Unknown';
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

      worksheet.getRow(51).values = [
        "Workshop Name",
        workshopName,
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,
      ];

    for (let i = 1; i <= 51; i++) {
      worksheet.getRow(i).eachCell(setborder);
    }
    worksheet.getCell("A51").font = { bold: true };
    worksheet.getCell("C51").font = { bold: true };
    worksheet.getCell("E51").font = { bold: true };
    worksheet.getCell("A1").font = { bold: true };
    worksheet.getCell("A5").font = { bold: true };
    worksheet.getCell("C5").font = { bold: true };
    worksheet.getCell("B1").font = { bold: true };
    worksheet.getCell("C1").font = { bold: true };
    worksheet.getCell("D1").font = { bold: true };
    worksheet.getCell("E1").font = { bold: true };
    worksheet.getCell("F1").font = { bold: true };
    worksheet.getCell("G1").font = { bold: true };
    worksheet.getCell("H1").font = { bold: true };
    worksheet.getCell("I1").font = { bold: true };
    worksheet.getCell("J1").font = { bold: true };
    worksheet.getCell("C3").font = { bold: true };
    worksheet.getCell("E3").font = { bold: true };
    worksheet.getCell("A7").font = { bold: true };
    worksheet.getCell("I7").font = { bold: true };
    worksheet.getCell("C7").font = { bold: true };
    worksheet.getCell("E7").font = { bold: true };
    worksheet.getCell("G7").font = { bold: true };
    worksheet.getCell("A9").font = { bold: true };
    worksheet.getCell("D9").font = { bold: true };
    worksheet.getCell("E9").font = { bold: true };
    worksheet.getCell("F9").font = { bold: true };
    worksheet.getCell("G9").font = { bold: true };
    worksheet.getCell("H9").font = { bold: true };
    worksheet.getCell("A11").font = { bold: true };
    worksheet.getCell("C11").font = { bold: true };
    worksheet.getCell("E11").font = { bold: true };
    worksheet.getCell("G11").font = { bold: true };
    worksheet.getCell("A12").font = { bold: true };
    worksheet.getCell("A13").font = { bold: true };
    worksheet.getCell("D13").font = { bold: true };
    worksheet.getCell("E13").font = { bold: true };
    worksheet.getCell("F13").font = { bold: true };
    worksheet.getCell("G13").font = { bold: true };
    worksheet.getCell("H13").font = { bold: true };
    worksheet.getCell("A14").font = { bold: true };
    worksheet.getCell("A15").font = { bold: true };
    worksheet.getCell("B15").font = { bold: true };
    worksheet.getCell("C15").font = { bold: true };
    worksheet.getCell("A17").font = { bold: true };
    worksheet.getCell("A16").font = { bold: true };
    worksheet.getCell("A19").font = { bold: true };
    worksheet.getCell("A18").font = { bold: true };
    worksheet.getCell("A20").font = { bold: true };
    worksheet.getCell("D20").font = { bold: true };
    worksheet.getCell("E20").font = { bold: true };
    worksheet.getCell("F20").font = { bold: true };
    worksheet.getCell("G20").font = { bold: true };
    worksheet.getCell("H20").font = { bold: true };
    worksheet.getCell("A21").font = { bold: true };
    worksheet.getCell("B21").font = { bold: true };
    worksheet.getCell("C21").font = { bold: true };
    worksheet.getCell("A22").font = { bold: true };
    worksheet.getCell("C22").font = { bold: true };
    worksheet.getCell("E22").font = { bold: true };
    worksheet.getCell("G22").font = { bold: true };
    worksheet.getCell("A23").font = { bold: true };
    worksheet.getCell("A24").font = { bold: true };
    worksheet.getCell("D24").font = { bold: true };
    worksheet.getCell("E24").font = { bold: true };
    worksheet.getCell("F24").font = { bold: true };
    worksheet.getCell("G24").font = { bold: true };
    worksheet.getCell("H24").font = { bold: true };
    worksheet.getCell("A25").font = { bold: true };
    worksheet.getCell("B25").font = { bold: true };
    worksheet.getCell("C25").font = { bold: true };
    worksheet.getCell("A26").font = { bold: true };
    worksheet.getCell("A27").font = { bold: true };
    worksheet.getCell("A28").font = { bold: true };
    worksheet.getCell("A29").font = { bold: true };
    worksheet.getCell("A30").font = { bold: true };
    worksheet.getCell("A31").font = { bold: true };
    worksheet.getCell("A32").font = { bold: true };
    worksheet.getCell("D32").font = { bold: true };
    worksheet.getCell("E32").font = { bold: true };
    worksheet.getCell("F32").font = { bold: true };
    worksheet.getCell("G32").font = { bold: true };
    worksheet.getCell("H32").font = { bold: true };
    worksheet.getCell("A33").font = { bold: true };
    worksheet.getCell("B33").font = { bold: true };
    worksheet.getCell("C33").font = { bold: true };
    worksheet.getCell("A35").font = { bold: true };
    worksheet.getCell("A34").font = { bold: true };
    worksheet.getCell("A36").font = { bold: true };
    worksheet.getCell("A37").font = { bold: true };
    worksheet.getCell("A38").font = { bold: true };
    worksheet.getCell("A39").font = { bold: true };
    worksheet.getCell("A40").font = { bold: true };
    worksheet.getCell("D40").font = { bold: true };
    worksheet.getCell("E40").font = { bold: true };
    worksheet.getCell("F40").font = { bold: true };
    worksheet.getCell("G40").font = { bold: true };
    worksheet.getCell("H40").font = { bold: true };
    worksheet.getCell("A41").font = { bold: true };
    worksheet.getCell("B41").font = { bold: true };
    worksheet.getCell("C41").font = { bold: true };
    worksheet.getCell("A45").font = { bold: true };
    worksheet.getCell("A43").font = { bold: true };
    worksheet.getCell("A42").font = { bold: true };
    worksheet.getCell("A44").font = { bold: true };
    worksheet.getCell("A49").font = { bold: true };
    worksheet.getCell("C49").font = { bold: true };
    worksheet.getCell("E49").font = { bold: true };
    worksheet.getCell("G49").font = { bold: true };
    worksheet.getCell("I49").font = { bold: true };
    worksheet.getCell("I24").font = { bold: true };
    worksheet.getCell("I32").font = { bold: true };
    worksheet.getCell("I40").font = { bold: true };
    worksheet.getCell("I13").font = { bold: true };





    const cellsToFormat = [
      'A10', 'A1', 'A5', 'C5', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'I24', 'I32', 'I40',
      'C3', 'E3', 'A7', 'I7', 'C7', 'E7', 'G7', 'A11', 'C11', 'E11', 'G11', 'A12', 'A13', 'D13', 'E13', 'F13', 'G13', 'I13',
      'H13', 'A14', 'A15', 'B15', 'C15', 'A17', 'A16', 'A19', 'A18', 'A21', 'B21', 'C21', 'A22', 'C22', 'E22', 'G22',
      'A23', 'A24', 'D24', 'E24', 'F24', 'G24', 'H24', 'A25', 'B25', 'C25', 'A26',
      'A27', 'A28', 'A29', 'A31', 'A32', 'D32', 'E32', 'F32', 'G32', 'H32',
      'A33', 'B33', 'C33', 'A35', 'A34', 'A36', 'A37', 'A39', 'A40', 'D40',
      'E40', 'F40', 'G40', 'H40', 'A41', 'B41', 'C41', 'A45', 'A43', 'A42', 'A44',
      'A49', 'C49', 'E49', 'G49', 'I49','A51','C51','E51'
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
      saveAs(blob, "LHBPressOnForm.xlsx");
    });
  };



  const exportToPDF = () => {
    const loginInfo = localStorage.getItem('loggedInUser')
      ? `Logged in as: ${localStorage.getItem('loggedInUser')}`
      : 'Logged in as: Unknown';
    const doc = new jsPDF({

      orientation: "portrait",
      unit: "pt",
      format: "a4",
      // putOnlyUsedFonts: true,

    });



    // Table headers
    const tableColumn = [
      [

        { content: "Wheel Activities", rowSpan: 1, colSpan: 1 },
        { content: "Axle Wheel Seat Size", rowSpan: 1, colSpan: 2 },
        { content: "Wheel Disc Bore Size", rowSpan: 1, colSpan: 2 },
        { content: "Wheel Disc Stamping Particulars", rowSpan: 1, colSpan: 2 },
        { content: "Press-On No.", rowSpan: 1, colSpan: 1 },
        { content: "BD Thickness", rowSpan: 1, colSpan: 1 },
        { content: "BD Make", rowSpan: 1, colSpan: 1 },
      ],
      [
        { content: formDataPressOnLHB.WheelActivities, colSpan: 1 },
        { content: formDataPressOnLHB.AxleWheelSeatSize, colSpan: 2 },
        { content: formDataPressOnLHB.WheelDiscBoreSize, colSpan: 2 },
        { content: formDataPressOnLHB.wheelDiscStampingParticulars, colSpan: 2 },
        { content: formDataPressOnLHB.PressOnNumber, colSpan: 1 },
        { content: formDataPressOnLHB.WheelActivityBDThickness, colSpan: 1 },
        { content: formDataPressOnLHB.WheelActivityBDMake, colSpan: 1 },
      ],
      [
        { content: "Wheel No.", rowSpan: 1, colSpan: 3 },
        { content: formDataPressOnLHB.WheelNo, colSpan: 3 },
        { content: "Axle No.", rowSpan: 1, colSpan: 2 },
        { content: formDataPressOnLHB.AxleNo, colSpan: 2 },
      ],
      [
        { content: "ATL No.", rowSpan: 1, colSpan: 1 },
        {
          content: formDataPressOnLHB.ATLNo,
          rowSpan: 1,
          colSpan: 1,
        },
        { content: "Wheel Seat Size", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.WheelSeatSize, rowSpan: 1, colSpan: 1 },
        { content: "BD Seat Size", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.BDSeatSize, rowSpan: 1, colSpan: 1 },
        { content: "RA Value(1.6 Max)", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.RAValue, rowSpan: 1, colSpan: 1 },
        { content: "Operator Name", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.OperatorName, rowSpan: 1, colSpan: 1 },
      ],
      [{ content: "Wheel Disc 'A' Side", colSpan: 10 }],
      [
        { content: "VTL No.", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscAVTLNO, rowSpan: 1 },
        { content: "Bore Size By Operator", colSpan: 1 },
        {
          content: formDataPressOnLHB.WheelDiscABoreSizeByOperator,
          rowSpan: 1,
          colSpan: 2,
        },
        { content: "RA Value", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscARAValue, rowSpan: 1 },
        { content: "Operator Name", colSpan: 1 },
        {
          content: formDataPressOnLHB.WheelDiscAOperatorName,
          rowSpan: 1,
          colSpan: 2,
        },
      ],
      [
        { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
        { content: "B' Wheel Seat Size(192-195)mm", colSpan: 2, rowSpan: 2 },
        { content: "C=B-A int Allow(0.240-0.300)mm", rowSpan: 2 },
        { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 2 },
        { content: "RD No.", rowSpan: 2 },
        { content: "Wheel Disc Particulars", colSpan: 2, rowSpan: 2 },
      ],

      [
        { content: "Insp.", rowSpan: 1, colSpan: 1 },
        { content: "X-axis", rowSpan: 1, colSpan: 1 },
        { content: "Y-axis", rowSpan: 1, colSpan: 1 },
      ],

      [
        { content: "Top", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscATopXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscATopYAxis, rowSpan: 1 },
        {
          content: formDataPressOnLHB.WheelDiscABWheelSeatSize,
          colSpan: 2,
          rowSpan: 4,
        },
        { content: formDataPressOnLHB.WheelDiscAAllow, rowSpan: 4 },
        { content: formDataPressOnLHB.WheelDiscAPressOnPressure, rowSpan: 4 },
        { content: formDataPressOnLHB.WheelDiscARDNo, rowSpan: 4 },
        {
          content: formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
          colSpan: 2,
          rowSpan: 4,
        },
      ],
      [
        { content: "Middle", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscAMiddleXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscAMiddleYAxis, rowSpan: 1 },
      ],
      [
        { content: "Lower", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscALowerXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscALowerYAxis, rowSpan: 1 },
      ],
      [
        { content: "Avg.", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscAAvgXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscAAvgYAxis, rowSpan: 1 },
      ],
      [{ content: "Wheel Disc 'B' Side", colSpan: 10 }],
      [
        { content: "VTL No.", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBVTLNo, rowSpan: 1 },
        { content: "Bore Size By Operator", colSpan: 1 },
        {
          content: formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
          rowSpan: 1,
          colSpan: 2,
        },
        { content: "RA Value", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBRAValue, rowSpan: 1 },
        { content: "Operator Name", colSpan: 1 },
        {
          content: formDataPressOnLHB.WheelDiscBOperatorName,
          rowSpan: 1,
          colSpan: 2,
        },
      ],
      [
        { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
        { content: "B' Wheel Seat Size(192-195)mm", colSpan: 2, rowSpan: 2 },
        { content: "C=B-A int Allow(0.240-0.300)mm", rowSpan: 2 },
        { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 2 },
        { content: "RD No.", rowSpan: 2 },
        { content: "Wheel Disc Particulars", colSpan: 2, rowSpan: 2 },
      ],

      [
        { content: "Insp.", rowSpan: 1, colSpan: 1 },
        { content: "X-axis", rowSpan: 1, colSpan: 1 },
        { content: "Y-axis", rowSpan: 1, colSpan: 1 },
      ],
      [
        { content: "Top", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBTopXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBTopYAxis, rowSpan: 1 },
        {
          content: formDataPressOnLHB.WheelDiscBBWheelSeatSize,
          colSpan: 2,
          rowSpan: 4,
        },
        { content: formDataPressOnLHB.WheelDiscBAllow, rowSpan: 4 },
        { content: formDataPressOnLHB.WheelDiscBPressOnPressure, rowSpan: 4 },
        { content: formDataPressOnLHB.WheelDiscBRDNo, rowSpan: 4 },
        {
          content: formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
          colSpan: 2,
          rowSpan: 4,
        },
      ],
      [
        { content: "Middle", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBMiddleXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBMiddleYAxis, rowSpan: 1 },
      ],
      [
        { content: "Lower", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBLowerXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBLowerYAxis, rowSpan: 1 },
      ],
      [
        { content: "Avg.", rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBAvgXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.WheelDiscBAvgYAxis, rowSpan: 1 },
      ],
      [{ content: "Brake Disc 'A' Side", colSpan: 10 }],
      [
        { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
        {
          content: "B' BD Seat Size(199.230-199.260)mm",
          colSpan: 2,
          rowSpan: 2,
        },
        { content: "C=B-A int Allow(0.230-0.260)mm", rowSpan: 2 },
        { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 2 },
        { content: "BD Thickness", rowSpan: 2 },
        { content: "Brake Disc make & Particulars", colSpan: 2, rowSpan: 2 },
      ],

      [
        { content: "Insp.", rowSpan: 1, colSpan: 1 },
        { content: "X-axis", rowSpan: 1, colSpan: 1 },
        { content: "Y-axis", rowSpan: 1, colSpan: 1 },
      ],
      [
        { content: "Top", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscATopXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscATopYAxis, rowSpan: 1 },
        {
          content: formDataPressOnLHB.BrakeDiscABBDSeatSize,
          colSpan: 2,
          rowSpan: 4,
        },
        { content: formDataPressOnLHB.BrakeDiscAAllow, rowSpan: 4 },
        { content: formDataPressOnLHB.BrakeDiscAPressOnPressure, rowSpan: 4 },
        { content: formDataPressOnLHB.BrakeDiscABDThickness, rowSpan: 4 },
        {
          content: formDataPressOnLHB.BrakeDiscABrakeDiscParticulars,
          colSpan: 2,
          rowSpan: 4,
        },
      ],
      [
        { content: "Middle", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscAMiddleXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscAMiddleYAxis, rowSpan: 1 },
      ],
      [
        { content: "Lower", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscALowerXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscALowerYAxis, rowSpan: 1 },
      ],
      [
        { content: "Avg.", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscAAvgXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscAAvgYAxis, rowSpan: 1 },
      ],
      [{ content: "Brake Disc 'B' Side", colSpan: 10 }],
      [
        { content: "A' Bore Size", colSpan: 3, rowSpan: 1 },
        {
          content: "B' BD Seat Size(199.230-199.260)mm",
          colSpan: 2,
          rowSpan: 2,
        },
        { content: "C=B-A int Allow(0.230-0.260)mm", rowSpan: 2 },
        { content: "Press-On Pressure in Ton(69T-109T)", rowSpan: 2 },
        { content: "BD Thickness", rowSpan: 2 },
        { content: "Brake Disc make & Particulars", colSpan: 2, rowSpan: 2 },
      ],

      [
        { content: "Insp.", rowSpan: 1, colSpan: 1 },
        { content: "X-axis", rowSpan: 1, colSpan: 1 },
        { content: "Y-axis", rowSpan: 1, colSpan: 1 },
      ],
      [
        { content: "Top", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBTopXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBTopYAxis, rowSpan: 1 },
        {
          content: formDataPressOnLHB.BrakeDiscBBBDSeatSize,
          colSpan: 2,
          rowSpan: 4,
        },
        { content: formDataPressOnLHB.BrakeDiscBAllow, rowSpan: 4 },
        { content: formDataPressOnLHB.BrakeDiscBPressOnPressure, rowSpan: 4 },
        { content: formDataPressOnLHB.BrakeDiscBBDThickness, rowSpan: 4 },
        {
          content: formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars,
          colSpan: 2,
          rowSpan: 4,
        },
      ],
      [
        { content: "Middle", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBMiddleXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBMiddleYAxis, rowSpan: 1 },
      ],
      [
        { content: "Lower", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBLowerXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBLowerYAxis, rowSpan: 1 },
      ],
      [
        { content: "Avg.", rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBAvgXAxis, rowSpan: 1 },
        { content: formDataPressOnLHB.BrakeDiscBAvgYAxis, rowSpan: 1 },
      ],
      [
        { content: "Machine No.", rowSpan: 1, colSpan: 1 },
        {
          content: formDataPressOnLHB.MCNo,
          rowSpan: 1,
          colSpan: 1,
        },
        { content: "Operator Name", rowSpan: 1, colSpan: 1 },
        {
          content: formDataPressOnLHB.OperatorNameFinal,
          rowSpan: 1,
          colSpan: 1,
        },
        { content: "Opertaor No.", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.OperatorNo, rowSpan: 1, colSpan: 1 },
        { content: "Inspector Name", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.InspectorName, rowSpan: 1, colSpan: 1 },
        { content: "Inspector No.", rowSpan: 1, colSpan: 1 },
        { content: formDataPressOnLHB.InspectorNo, rowSpan: 1, colSpan: 1 },
      ],
    ];

    // Generate the table
    doc.autoTable({

      head: tableColumn,
      body: [],
      startX: 10,
      startY: 10,
      tableWidth: "auto", // Automatically adjusts the width to fit the page
      // tableHeight: doc.internal.pageSize.getHeight() - 10,
      theme: "grid",

      headStyles: {
        fillColor: [255, 255, 255], // Light gray background for the header
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
      pageBreak: "auto", // Add automatic page breaks
      didParseCell: (data) => {
        const hardcodedCells = [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
          [0, 5],
          [0, 6],
          [0, 7],
          [0, 8],
          [0, 9],
          [2, 0],
          [2, 6],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8],
          [4, 0],
          [5, 0],
          [5, 2],
          [5, 5],
          [5, 7],
          [6, 0],
          [6, 3],
          [6, 5],
          [6, 6],
          [6, 7],
          [6, 8],
          [7, 0],
          [7, 1],
          [7, 2],
          [8, 0],
          [9, 0],
          [10, 0],
          [11, 0],
          [11, 5],
          [11, 7],
          [12, 0],
          [13, 0],
          [13, 2],
          [13, 5],
          [13, 7],
          [14, 0],
          [14, 3],
          [14, 5],
          [14, 6],
          [14, 7],
          [14, 8],
          [15, 0],
          [15, 1],
          [15, 2],
          [16, 0],
          [17, 0],
          [18, 0],
          [19, 0],
          [19, 3],
          [19, 5],
          [19, 6],
          [19, 7],
          [19, 8],
          [20, 0],
          [21, 0],
          [21, 3],
          [21, 5],
          [21, 6],
          [21, 7],
          [21, 8],
          [22, 0],
          [22, 1],
          [22, 2],
          [23, 0],
          [24, 0],
          [25, 0],
          [26, 0],
          [26, 3],
          [26, 5],
          [26, 6],
          [26, 7],
          [26, 8],
          [27, 0],
          [28, 0],
          [28, 3],
          [28, 5],
          [28, 6],
          [28, 7],
          [28, 8],
          [29, 0],
          [29, 1],
          [29, 2],
          [30, 0],
          [31, 0],
          [32, 0],
          [33, 0],
          [34, 0],
          [34, 2],
          [34, 4],
          [34, 6],
          [34, 8],
        ];

        if (
          hardcodedCells.some(
            ([row, col]) => data.row.index === row && data.column.index === col
          )
        ) {
          data.cell.styles.fillColor = [240, 240, 240]; // White background
          data.cell.styles.textColor = [0, 0, 0]; // Black text
          data.cell.styles.fontStyle = "bold"; // Make text bold
        }
      },

      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 35 },
        2: { cellWidth: 10 },
        3: { cellWidth: 30 },
        4: { cellWidth: 15 },
        5: { cellWidth: 10 },
        6: { cellWidth: 10 },
        // 7: { cellWidth: 10 },
        8: { cellWidth: 10 },
        9: { cellWidth: 35 },
        // 10: { cellWidth: 10 },
        // 11: { cellWidth: 10 },
        // 12: { cellWidth: 10 },
        // 13: { cellWidth: 10 },
        // 14: { cellWidth: 10 },
        // 15: { cellWidth: 10 },
        // 16: { cellWidth: 10 },
        // 17: { cellWidth: 10 },
        // 18: { cellWidth: 10 },
        // 19: { cellWidth: 10 },
        // 20: { cellWidth: 10 },
        // 21: { cellWidth: 10 },
        // 22: { cellWidth: 10 },
        // 23: { cellWidth: 10 },
        // 24: { cellWidth: 10 },
        // 25: { cellWidth: 10 },
        // 26: { cellWidth: 10 },
        // 27: { cellWidth: 10 },
        // 28: { cellWidth: 10 },
        // 29: { cellWidth: 10 },
        // 30: { cellWidth: 10 },
        // 31: { cellWidth: 10 },
        // 32: { cellWidth: 10 },
        // 33: { cellWidth: 10 },
        // 34: { cellWidth: 10 },
        // 35: { cellWidth: 10 },
        // 36: { cellWidth: 10 },
        // 37: { cellWidth: 10 },
        // 38: { cellWidth: 10 },
        // 39: { cellWidth: 10 },
        // 40: { cellWidth: 10 },
        // 41: { cellWidth: 10 },
        // 42: { cellWidth: 10 },
        // 43: { cellWidth: 10 },
        // 44: { cellWidth: 10 },
        // 45: { cellWidth: 10 },
        // 46: { cellWidth: 10 },
        // 47: { cellWidth: 10 },
        // 48: { cellWidth: 10 },
        // 49: { cellWidth: 10 },
        // 50: { cellWidth: 10 },
        // 51: { cellWidth: 10 },
        // 52: { cellWidth: 10 },
        // 53: { cellWidth: 10 },
        // 54: { cellWidth: 10 },
        // 55: { cellWidth: 10 },
        // 56: { cellWidth: 10 },
        // 57: { cellWidth: 10 },
        // 58: { cellWidth: 10 },
        // 59: { cellWidth: 10 },
        // 60: { cellWidth: 10 },
        // 61: { cellWidth: 10 },
        // 62: { cellWidth: 10 },
        // 63: { cellWidth: 10 },
        // 64: { cellWidth: 10 },
        // 65: { cellWidth: 10 },
        // 66: { cellWidth: 10 },
      },
      margin: { top: 20, right: 20, bottom: 20, left: 20 }, // Adjusted margins
      didDrawPage: (data) => {
        // Add a title on the first page
        // if (data.pageNumber === 1) {
        // doc.setFontSize(12);
        // doc.text(
        //   "LHB Final Inspection Report",
        //   data.settings.margin.left,
        //   20
        // );
        // }

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

    doc.save("LHB Press-On Form.pdf");
  };






  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Wheel Activities",
      "Axle Wheel Seat Size",
      "Wheel Disc Bore Size",
      "Wheel Disc Stamping Particulars",
      "Press-On No.",
      "BD Thickness",
      "BD Make",
      "Wheel No",
      "Axle No",
      "ATL No",
      "Wheel Seat Size",
      "BD Seat Size",
      "RA Value",
      "Operator Name",
      "Wheel Disc A VTL NO",
      "Wheel Disc A Bore Size By Operator",
      "Wheel Disc A RA Value",
      "Wheel Disc A Operator Name",
      "Wheel Disc A B' Wheel Seat Size",
      "Wheel Disc A Allow",
      "Wheel Disc A Press On Pressure",
      "Wheel Disc A RD No",
      "Wheel Disc A Wheel Disc Particulars",
      "Wheel Disc A Top X Axis",
      "Wheel Disc A Top Y Axis",
      "Wheel Disc A Middle X Axis",
      "Wheel Disc A Middle Y Axis",
      "Wheel Disc A Lower X Axis",
      "Wheel Disc A Lower Y Axis",
      "Wheel Disc A Avg X Axis",
      "Wheel Disc A Avg Y Axis",
      "Wheel Disc B VTL No",
      "Wheel Disc B Bore Size By Operator",
      "Wheel Disc B RA Value",
      "Wheel Disc B Operator Name",
      "Wheel Disc B A' Bore Size",
      "Wheel Disc B B Wheel Seat Size",
      "Wheel Disc B Allow",
      "Wheel Disc B Press On Pressure",
      "Wheel Disc B RD No",
      "Wheel Disc B Wheel Disc Particulars",
      "Wheel Disc B Top X Axis",
      "Wheel Disc B Top Y Axis",
      "Wheel Disc B Middle X Axis",
      "Wheel Disc B Middle Y Axis",
      "Wheel Disc B Lower X Axis",
      "Wheel Disc B Lower Y Axis",
      "Wheel Disc B Avg X Axis",
      "Wheel Disc B Avg Y Axis",
      "Brake Disc A B' BD Seat Size",
      "Brake Disc A Allow",
      "Brake Disc A Press On Pressure",
      "Brake Disc A BD Thickness",
      "Brake Disc A Brake Disc Particulars",
      "Brake Disc A Top X Axis",
      "Brake Disc A Top Y Axis",
      "Brake Disc A Middle X Axis",
      "Brake Disc A Middle Y Axis",
      "Brake Disc A Lower X Axis",
      "Brake Disc A Lower Y Axis",
      "Brake Disc A Avg X Axis",
      "Brake Disc A Avg Y Axis",
      "Brake Disc B B' BD Seat Size",
      "Brake Disc B Allow",
      "Brake Disc B Press On Pressure",
      "Brake Disc B BD Thickness",
      "Brake Disc B Brake Disc Particulars",
      "Brake Disc B Top X Axis",
      "Brake Disc B Top Y Axis",
      "Brake Disc B Middle X Axis",
      "Brake Disc B Middle Y Axis",
      "Brake Disc B Lower X Axis",
      "Brake Disc B Lower Y Axis",
      "Brake Disc B Avg X Axis",
      "Brake Disc B Avg Y Axis",
      "MC No",
      "OperatorName",
      "OperatorTicketNo",
      "InspectorName",
      "InspectorTicketNo",
    ];

    // Construct the CSV rows with form data
    const rows = [
      [
        formDataPressOnLHB.WheelActivities,
        formDataPressOnLHB.AxleWheelSeatSize,
        formDataPressOnLHB.WheelDiscBoreSize,
        formDataPressOnLHB.wheelDiscStampingParticulars,
        formDataPressOnLHB.PressOnNumber,
        formDataPressOnLHB.WheelActivityBDThickness,
        formDataPressOnLHB.WheelActivityBDMake,
        formDataPressOnLHB.WheelNo,
        formDataPressOnLHB.AxleNo,
        formDataPressOnLHB.ATLNo,
        formDataPressOnLHB.WheelSeatSize,
        formDataPressOnLHB.BDSeatSize,
        formDataPressOnLHB.RAValue,
        formDataPressOnLHB.OperatorName,
        formDataPressOnLHB.WheelDiscAVTLNO,
        formDataPressOnLHB.WheelDiscABoreSizeByOperator,
        formDataPressOnLHB.WheelDiscARAValue,
        formDataPressOnLHB.WheelDiscAOperatorName,
        formDataPressOnLHB.WheelDiscABWheelSeatSize,
        formDataPressOnLHB.WheelDiscAAllow,
        formDataPressOnLHB.WheelDiscAPressOnPressure,
        formDataPressOnLHB.WheelDiscARDNo,
        formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
        formDataPressOnLHB.WheelDiscATopXAxis,
        formDataPressOnLHB.WheelDiscATopYAxis,
        formDataPressOnLHB.WheelDiscAMiddleXAxis,
        formDataPressOnLHB.WheelDiscAMiddleYAxis,
        formDataPressOnLHB.WheelDiscALowerXAxis,
        formDataPressOnLHB.WheelDiscALowerYAxis,
        formDataPressOnLHB.WheelDiscAAvgXAxis,
        formDataPressOnLHB.WheelDiscAAvgYAxis,
        formDataPressOnLHB.WheelDiscBVTLNo,
        formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
        formDataPressOnLHB.WheelDiscBRAValue,
        formDataPressOnLHB.WheelDiscBOperatorName,
        formDataPressOnLHB.WheelDiscBBWheelSeatSize,
        formDataPressOnLHB.WheelDiscBAllow,
        formDataPressOnLHB.WheelDiscBPressOnPressure,
        formDataPressOnLHB.WheelDiscBRDNo,
        formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
        formDataPressOnLHB.WheelDiscBTopXAxis,
        formDataPressOnLHB.WheelDiscBTopYAxis,
        formDataPressOnLHB.WheelDiscBMiddleXAxis,
        formDataPressOnLHB.WheelDiscBMiddleYAxis,
        formDataPressOnLHB.WheelDiscBLowerXAxis,
        formDataPressOnLHB.WheelDiscBLowerYAxis,
        formDataPressOnLHB.WheelDiscBAvgXAxis,
        formDataPressOnLHB.WheelDiscBAvgYAxis,
        formDataPressOnLHB.BrakeDiscABBDSeatSize,
        formDataPressOnLHB.BrakeDiscAAllow,
        formDataPressOnLHB.BrakeDiscAPressOnPressure,
        formDataPressOnLHB.BrakeDiscABDThickness,
        formDataPressOnLHB.BrakeDiscABrakeDiscParticulars,
        formDataPressOnLHB.BrakeDiscATopXAxis,
        formDataPressOnLHB.BrakeDiscATopYAxis,
        formDataPressOnLHB.BrakeDiscAMiddleXAxis,
        formDataPressOnLHB.BrakeDiscAMiddleYAxis,
        formDataPressOnLHB.BrakeDiscALowerXAxis,
        formDataPressOnLHB.BrakeDiscALowerYAxis,
        formDataPressOnLHB.BrakeDiscAAvgXAxis,
        formDataPressOnLHB.BrakeDiscAAvgYAxis,
        formDataPressOnLHB.BrakeDiscBBBDSeatSize,
        formDataPressOnLHB.BrakeDiscBAllow,
        formDataPressOnLHB.BrakeDiscBPressOnPressure,
        formDataPressOnLHB.BrakeDiscBBDThickness,
        formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars,
        formDataPressOnLHB.BrakeDiscBTopXAxis,
        formDataPressOnLHB.BrakeDiscBTopYAxis,
        formDataPressOnLHB.BrakeDiscBMiddleXAxis,
        formDataPressOnLHB.BrakeDiscBMiddleYAxis,
        formDataPressOnLHB.BrakeDiscBLowerXAxis,
        formDataPressOnLHB.BrakeDiscBLowerYAxis,
        formDataPressOnLHB.BrakeDiscBAvgXAxis,
        formDataPressOnLHB.BrakeDiscBAvgYAxis,
        formDataPressOnLHB.MCNo,
        formDataPressOnLHB.OperatorNameFinal,
        formDataPressOnLHB.OperatorNo,
        formDataPressOnLHB.InspectorName,
        formDataPressOnLHB.InspectorNo,
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
    link.setAttribute("download", "LHBPressOnForm.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  const navigate = useNavigate();
  return (
    <div className="main_div">
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
          <thead>
            <tr>
              <th>Wheel Activities</th>
              <th colSpan={2}>Axle Wheel Seat Size</th>
              <th colSpan={2}>Wheel Disc Bore Size</th>
              <th colSpan={2}>Wheel Disc Stamping Particulars</th>
              <th>Press-On No.</th>
              <th>BD Thickness</th>
              <th>BD Make</th>
            </tr>
            <tr>
              <td>{formDataPressOnLHB.WheelActivities}</td>
              <td colSpan={2}>{formDataPressOnLHB.AxleWheelSeatSize}</td>
              <td colSpan={2}>{formDataPressOnLHB.WheelDiscBoreSize}</td>
              <td colSpan={2}>{formDataPressOnLHB.wheelDiscStampingParticulars}</td>
              <td>{formDataPressOnLHB.PressOnNumber}</td>
              <td>{formDataPressOnLHB.WheelActivityBDThickness}</td>
              <td>{formDataPressOnLHB.WheelActivityBDMake}</td>
            </tr>
            <tr>
              <th>Wheel No.</th>
              <td colSpan={2}>{formDataPressOnLHB.WheelNo}</td>
              <th>Axle No.</th>
              <td colSpan={6}>{formDataPressOnLHB.AxleNo}</td>
            </tr>
            <tr>
              <th>ATL No.</th>
              <td>{formDataPressOnLHB.ATLNo}</td>
              <th>Wheel Seat Size</th>
              <td>{formDataPressOnLHB.WheelSeatSize}</td>
              <th>BD Seat Size</th>
              <td>{formDataPressOnLHB.BDSeatSize}</td>
              <th>RA Value(1.6 Max)</th>
              <td>{formDataPressOnLHB.RAValue}</td>
              <th>Operator Name</th>
              <td>{formDataPressOnLHB.OperatorName}</td>
            </tr>

            {/* WHEEL DISC A */}
            <tr>
              <th colSpan={10}>Wheel Disc 'A' Side</th>
            </tr>
            <tr>
              <th>VTL No.</th>
              <td>{formDataPressOnLHB.WheelDiscAVTLNO}</td>
              <th colSpan={2}>Bore Size By Operator</th>
              <td>{formDataPressOnLHB.WheelDiscABoreSizeByOperator}</td>
              <th>RA Value</th>
              <td>{formDataPressOnLHB.WheelDiscARAValue}</td>
              <th colSpan={2}>Operator Name</th>
              <td>{formDataPressOnLHB.WheelDiscAOperatorName}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>
                A' Bore Size
              </th>
              <th rowSpan="3" colSpan={2}>
                B' Wheel Seat Size(192-195)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                C=B-A int Allow(0.240-0.300)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                Press-On Pressure in Ton(69T-109T)
              </th>
              <th rowSpan="3" colSpan={1}>
                RD No.
              </th>
              <th rowSpan="3" colSpan={2}>
                Wheel Disc Particulars
              </th>
            </tr>

            <tr></tr>
            <tr>
              <th>Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.WheelDiscATopXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscATopYAxis}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.WheelDiscABWheelSeatSize}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscAAllow}</td>
              <td rowSpan={4}>
                {formDataPressOnLHB.WheelDiscAPressOnPressure}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscARDNo}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.WheelDiscAWheelDiscParticulars}
              </td>
            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.WheelDiscAMiddleXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscAMiddleYAxis}</td>
            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.WheelDiscALowerXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscALowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.WheelDiscAAvgXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscAAvgYAxis}</td>
            </tr>
            <br></br>

            {/* WHEEL DISC B */}
            <tr>
              <th colSpan={10}>Wheel Disc 'B' Side</th>
            </tr>
            <tr>
              <th>VTL No.</th>
              <td>{formDataPressOnLHB.WheelDiscBVTLNo}</td>
              <th colSpan={2}>Bore Size By Operator</th>
              <td>{formDataPressOnLHB.WheelDiscBBoreSizeByOperator}</td>
              <th>RA Value</th>
              <td>{formDataPressOnLHB.WheelDiscBRAValue}</td>
              <th colSpan={2}>Operator Name</th>
              <td>{formDataPressOnLHB.WheelDiscBOperatorName}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>
                A' Bore Size
              </th>
              <th rowSpan="3" colSpan={2}>
                B' Wheel Seat Size(192-195)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                C=B-A int Allow(0.240-0.300)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                Press-On Pressure in Ton(69T-109T)
              </th>
              <th rowSpan="3" colSpan={1}>
                RD No.
              </th>
              <th rowSpan="3" colSpan={2}>
                Wheel Disc Particulars
              </th>
            </tr>

            <tr></tr>
            <tr>
              <th>Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.WheelDiscBTopXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBTopYAxis}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.WheelDiscBBWheelSeatSize}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscBAllow}</td>
              <td rowSpan={4}>
                {formDataPressOnLHB.WheelDiscBPressOnPressure}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.WheelDiscBRDNo}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.WheelDiscBWheelDiscParticulars}
              </td>
            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.WheelDiscBMiddleXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBMiddleYAxis}</td>
            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.WheelDiscBLowerXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBLowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.WheelDiscBAvgXAxis}</td>
              <td>{formDataPressOnLHB.WheelDiscBAvgYAxis}</td>
            </tr>

            <br />
            {/* BRAKE DISC A */}
            <tr>
              <th colSpan={10}>Brake Disc 'A' Side</th>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>
                A' Bore Size
              </th>
              <th rowSpan="3" colSpan={2}>
                B' BD Seat Size(199.230-199.260)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                C=B-A int Allow(0.230-0.260)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                Press-On Pressure in Ton(69T-109T)
              </th>
              <th rowSpan="3" colSpan={1}>
                BD Thickness
              </th>
              <th rowSpan="3" colSpan={2}>
                Brake Disc make & Particulars
              </th>
            </tr>

            <tr></tr>
            <tr>
              <th>Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.BrakeDiscATopXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscATopYAxis}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.BrakeDiscABBDSeatSize}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscAAllow}</td>
              <td rowSpan={4}>
                {formDataPressOnLHB.BrakeDiscAPressOnPressure}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscABDThickness}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.BrakeDiscABrakeDiscParticulars}
              </td>
            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.BrakeDiscAMiddleXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscAMiddleYAxis}</td>
            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.BrakeDiscALowerXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscALowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.BrakeDiscAAvgXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscAAvgYAxis}</td>
            </tr>
            <br></br>

            {/* Brake DISC B  */}
            <tr>
              <th colSpan={10}>Brake Disc 'B' Side</th>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={3}>
                A' Bore Size
              </th>
              <th rowSpan="3" colSpan={2}>
                B' BD Seat Size(199.230-199.260)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                C=B-A int Allow(0.230-0.260)mm
              </th>
              <th rowSpan="3" colSpan={1}>
                Press-On Pressure in Ton(69T-109T)
              </th>
              <th rowSpan="3" colSpan={1}>
                BD Thickness
              </th>
              <th rowSpan="3" colSpan={2}>
                Brake Disc make & Particulars
              </th>
            </tr>

            <tr></tr>
            <tr>
              <th>Insp.</th>
              <th>X-axis</th>
              <th>Y-axis</th>
            </tr>
            <tr>
              <th>Top</th>
              <td>{formDataPressOnLHB.BrakeDiscBTopXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBTopYAxis}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.BrakeDiscBBBDSeatSize}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscBAllow}</td>
              <td rowSpan={4}>
                {formDataPressOnLHB.BrakeDiscBPressOnPressure}
              </td>
              <td rowSpan={4}>{formDataPressOnLHB.BrakeDiscBBDThickness}</td>
              <td rowSpan={4} colSpan={2}>
                {formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars}
              </td>
            </tr>
            <tr>
              <th>Middle</th>
              <td>{formDataPressOnLHB.BrakeDiscBMiddleXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBMiddleYAxis}</td>
            </tr>
            <tr>
              <th>Lower</th>
              <td>{formDataPressOnLHB.BrakeDiscBLowerXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBLowerYAxis}</td>
            </tr>
            <tr>
              <th>Avg.</th>
              <td>{formDataPressOnLHB.BrakeDiscBAvgXAxis}</td>
              <td>{formDataPressOnLHB.BrakeDiscBAvgYAxis}</td>
            </tr>
          </thead>
          <br></br>
          <div className="footerProceedSubmit">
            <div>
              <b> M/C No.: </b>
              {formDataPressOnLHB.MCNo}
            </div>

            <div>
              <b> Operator Name : </b>
              {formDataPressOnLHB.OperatorNameFinal}
            </div>
            <div>
              <b> Operator No. : </b>
              {formDataPressOnLHB.OperatorNo}
            </div>
            <div>
              <b> Inspector Name: </b>
              {formDataPressOnLHB.InspectorName}
            </div>
            <div>
              <b> Inspector No.: </b>
              {formDataPressOnLHB.InspectorNo}
            </div>
          </div>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitPressOn;

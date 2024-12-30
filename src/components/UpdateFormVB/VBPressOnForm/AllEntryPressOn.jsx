import React, { useEffect, useState } from "react";
// import "../../resources/LHB/lhbpressonform/proceedsubmit.css";
// import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryPressOn = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/vb/presson/getalldata");
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


    const setBorder = (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } }, // Black border color
        bottom: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    }


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("VBPressOnForm");

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

    // Start row index
    let currentRow = 5;

    data.forEach((formDataPressOnVB, index) => {
      // Headers for Wheel Details
      worksheet.mergeCells(`A${currentRow - 4}:A${currentRow - 3}`);
      worksheet.mergeCells(`H${currentRow - 4}:H${currentRow - 3}`);
      worksheet.mergeCells(`I${currentRow - 4}:I${currentRow - 3}`);
      worksheet.mergeCells(`J${currentRow - 4}:J${currentRow - 3}`);
      worksheet.mergeCells(`A${currentRow - 2}:A${currentRow - 1}`);
      worksheet.mergeCells(`H${currentRow - 2}:H${currentRow - 1}`);
      worksheet.mergeCells(`I${currentRow - 2}:I${currentRow - 1}`);
      worksheet.mergeCells(`J${currentRow - 2}:J${currentRow - 1}`);
      worksheet.mergeCells(`A${currentRow}:A${currentRow + 1}`);
      worksheet.mergeCells(`B${currentRow}:B${currentRow + 1}`);
      worksheet.mergeCells(`C${currentRow}:C${currentRow + 1}`);
      worksheet.mergeCells(`A${currentRow + 2}:A${currentRow + 3}`);
      worksheet.mergeCells(`B${currentRow + 2}:B${currentRow + 3}`);
      worksheet.mergeCells(`C${currentRow + 2}:C${currentRow + 3}`);
      worksheet.mergeCells(`D${currentRow + 2}:D${currentRow + 3}`);
      worksheet.mergeCells(`E${currentRow + 2}:E${currentRow + 3}`);
      worksheet.mergeCells(`F${currentRow + 2}:F${currentRow + 3}`);
      worksheet.mergeCells(`G${currentRow + 2}:G${currentRow + 3}`);
      worksheet.mergeCells(`H${currentRow + 2}:H${currentRow + 3}`);
      worksheet.mergeCells(`I${currentRow + 2}:I${currentRow + 3}`);
      worksheet.mergeCells(`J${currentRow + 2}:J${currentRow + 3}`);


      worksheet.getRow(currentRow - 4).values = [
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
      ];
      worksheet.mergeCells(currentRow - 4, 2, currentRow - 3, 3);
      worksheet.mergeCells(currentRow - 4, 4, currentRow - 3, 5);
      worksheet.mergeCells(currentRow - 4, 6, currentRow - 3, 7);


      worksheet.getRow(currentRow - 2).values = [

        formDataPressOnVB.WheelActivities,
        formDataPressOnVB.AxleWheelSeatSize,
        "",
        formDataPressOnVB.WheelDiscBoreSize,
        "",
        formDataPressOnVB.wheelDiscStampingParticulars,
        "",
        formDataPressOnVB.PressOnNumber,
        formDataPressOnVB.WheelActivityBDThickness,
        formDataPressOnVB.WheelActivityBDMake,

      ];
      worksheet.mergeCells(currentRow - 2, 2, currentRow - 1, 3);
      worksheet.mergeCells(currentRow - 2, 6, currentRow - 1, 7);
      worksheet.mergeCells(currentRow - 2, 4, currentRow - 1, 5);

      worksheet.getRow(currentRow).values = [
        "Wheel No.",
        formDataPressOnVB.WheelNo,
        "Axle No.",
        formDataPressOnVB.AxleNo,
      ];
      worksheet.mergeCells(currentRow, 4, currentRow + 1, 10);

      worksheet.getRow(currentRow + 2).values = [
        "ATL No.",
        formDataPressOnVB.ATLNo,
        "Wheel Seat Size",
        formDataPressOnVB.WheelSeatSize,
        "BD Seat Size",
        formDataPressOnVB.BDSeatSize,
        "RA Value",
        formDataPressOnVB.RAValue,
        "Operator Name",
        formDataPressOnVB.OperatorName,
      ];

      // Section for Wheel Disc 'A' Side
      worksheet.addRow([]);
      worksheet.getRow(currentRow + 5).values = ["Wheel Disc 'A' Side"];
      worksheet.getCell(`A${currentRow + 5}`).font = { bold: true };
      worksheet.mergeCells(`A${currentRow + 5}:J${currentRow + 5}`);
      worksheet.getRow(currentRow + 5).alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      worksheet.getRow(currentRow).alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      worksheet.getRow(currentRow + 2).alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      worksheet.getRow(currentRow + 6).values = [
        "VTL No.",
        formDataPressOnVB.WheelDiscAVTLNO,
        "Bore Size By Operator",
        formDataPressOnVB.WheelDiscABoreSizeByOperator,
        "RA Value",
        formDataPressOnVB.WheelDiscARAValue,
        "Operator Name",
        "",
        formDataPressOnVB.WheelDiscAOperatorName,
      ];

      worksheet.mergeCells(`A${currentRow + 6}:A${currentRow + 7}`);
      worksheet.mergeCells(`B${currentRow + 6}:B${currentRow + 7}`);
      worksheet.mergeCells(`C${currentRow + 6}:C${currentRow + 7}`);
      worksheet.mergeCells(`D${currentRow + 6}:D${currentRow + 7}`);
      worksheet.mergeCells(`E${currentRow + 6}:E${currentRow + 7}`);
      worksheet.mergeCells(`F${currentRow + 6}:F${currentRow + 7}`);
      worksheet.mergeCells(currentRow+6, 7, currentRow + 7, 8);
      worksheet.mergeCells(currentRow+6, 9, currentRow + 7, 10);
      worksheet.mergeCells(`A${currentRow + 8}:C${currentRow + 9}`);
      worksheet.mergeCells(`D${currentRow + 8}:D${currentRow + 9}`);
      worksheet.mergeCells(`E${currentRow + 8}:E${currentRow + 9}`);
      worksheet.mergeCells(`F${currentRow + 8}:F${currentRow + 9}`);
      worksheet.mergeCells(currentRow+8, 7, currentRow + 9, 8);
      worksheet.mergeCells(currentRow+8, 9, currentRow + 9, 10);

      worksheet.getRow(currentRow + 8).values = [
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

      worksheet.getRow(currentRow + 10).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnVB.WheelDiscABWheelSeatSize,
        formDataPressOnVB.WheelDiscAAllow,
        formDataPressOnVB.WheelDiscAPressOnPressure,
        formDataPressOnVB.WheelDiscARDNo,
        "",
        formDataPressOnVB.WheelDiscAWheelDiscParticulars,
      ];

      worksheet.getRow(currentRow + 11).values = [
        "Top",
        formDataPressOnVB.WheelDiscATopXAxis,
        formDataPressOnVB.WheelDiscATopYAxis,
      ];
      worksheet.getRow(currentRow + 12).values = [
        "Middle",
        formDataPressOnVB.WheelDiscAMiddleXAxis,
        formDataPressOnVB.WheelDiscAMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 13).values = [
        "Lower",
        formDataPressOnVB.WheelDiscALowerXAxis,
        formDataPressOnVB.WheelDiscALowerYAxis,
      ];
      worksheet.getRow(currentRow + 14).values = [
        "Avg.",
        formDataPressOnVB.WheelDiscAAvgXAxis,
        formDataPressOnVB.WheelDiscAAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 10}:D${currentRow + 14}`);
      worksheet.mergeCells(`E${currentRow + 10}:E${currentRow + 14}`);
      worksheet.mergeCells(`F${currentRow + 10}:F${currentRow + 14}`);
      worksheet.mergeCells(currentRow+10, 7, currentRow + 14, 8);
      worksheet.mergeCells(currentRow+10, 9, currentRow + 14, 10);

      // Section for Wheel Disc 'B' Side
      worksheet.addRow([]);
      worksheet.mergeCells(`A${currentRow + 16}:J${currentRow + 16}`);
      worksheet.getCell(`A${currentRow + 16}`).value = "Wheel Disc 'B' Side";
      worksheet.getCell(`A${currentRow + 16}`).font = { bold: true };

      worksheet.getRow(currentRow + 17).values = [
        "VTL No.",
        formDataPressOnVB.WheelDiscBVTLNo,
        "Bore Size By Operator",
        formDataPressOnVB.WheelDiscBBoreSizeByOperator,
        "RA Value",
        formDataPressOnVB.WheelDiscBRAValue,
        "Operator Name",
        "",
        formDataPressOnVB.WheelDiscBOperatorName,
      ];

      worksheet.mergeCells(`A${currentRow + 17}:A${currentRow + 18}`);
      worksheet.mergeCells(`B${currentRow + 17}:B${currentRow + 18}`);
      worksheet.mergeCells(`C${currentRow + 17}:C${currentRow + 18}`);
      worksheet.mergeCells(`D${currentRow + 17}:D${currentRow + 18}`);
      worksheet.mergeCells(`E${currentRow + 17}:E${currentRow + 18}`);
      worksheet.mergeCells(`F${currentRow + 17}:F${currentRow + 18}`);
      worksheet.mergeCells(currentRow+17, 7, currentRow + 18, 8);
      worksheet.mergeCells(currentRow+17, 9, currentRow + 18, 10);

      worksheet.mergeCells(`A${currentRow + 19}:C${currentRow + 20}`);
      worksheet.mergeCells(`D${currentRow + 19}:D${currentRow + 20}`);
      worksheet.mergeCells(`E${currentRow + 19}:E${currentRow + 20}`);
      worksheet.mergeCells(`F${currentRow + 19}:F${currentRow + 20}`);
      worksheet.mergeCells(currentRow+19, 7, currentRow + 20, 8);
      worksheet.mergeCells(currentRow+19, 9, currentRow + 20, 10);

      worksheet.getRow(currentRow + 19).values = [
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

      worksheet.getRow(currentRow + 21).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnVB.WheelDiscBBWheelSeatSize,
        formDataPressOnVB.WheelDiscBAllow,
        formDataPressOnVB.WheelDiscBPressOnPressure,
        formDataPressOnVB.WheelDiscBRDNo,
        "",
        formDataPressOnVB.WheelDiscBWheelDiscParticulars,
      ];

      worksheet.getRow(currentRow + 22).values = [
        "Top",
        formDataPressOnVB.WheelDiscBTopXAxis,
        formDataPressOnVB.WheelDiscBTopYAxis,
      ];
      worksheet.getRow(currentRow + 23).values = [
        "Middle",
        formDataPressOnVB.WheelDiscBMiddleXAxis,
        formDataPressOnVB.WheelDiscBMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 24).values = [
        "Lower",
        formDataPressOnVB.WheelDiscBLowerXAxis,
        formDataPressOnVB.WheelDiscBLowerYAxis,
      ];
      worksheet.getRow(currentRow + 25).values = [
        "Avg.",
        formDataPressOnVB.WheelDiscBAvgXAxis,
        formDataPressOnVB.WheelDiscBAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 21}:D${currentRow + 25}`);
      worksheet.mergeCells(`E${currentRow + 21}:E${currentRow + 25}`);
      worksheet.mergeCells(`F${currentRow + 21}:F${currentRow + 25}`);
      worksheet.mergeCells(currentRow+21, 7, currentRow + 25, 8);
      worksheet.mergeCells(currentRow+21, 9, currentRow + 25, 10);

      // Section for Brake Disc 'A' Side
      worksheet.addRow([]);
      worksheet.mergeCells(`A${currentRow + 27}:J${currentRow + 27}`);
      worksheet.getCell(`A${currentRow + 27}`).value = "Brake Disc 'A' Side";
      worksheet.getCell(`A${currentRow + 27}`).font = { bold: true };

      worksheet.mergeCells(`A${currentRow + 28}:C${currentRow + 29}`);
      worksheet.mergeCells(`D${currentRow + 28}:D${currentRow + 29}`);
      worksheet.mergeCells(`E${currentRow + 28}:E${currentRow + 29}`);
      worksheet.mergeCells(`F${currentRow + 28}:F${currentRow + 29}`);
      worksheet.mergeCells(currentRow+28, 7, currentRow + 29, 8);
      worksheet.mergeCells(currentRow+28, 9, currentRow + 29, 10);

      worksheet.getRow(currentRow + 28).values = [
        "A' Bore Size",
        "",
        "",
        "B' BD Seat Size(199.230-199.260)mm",
        "C=B-A int Allow (0.240-0.300mm)",
        "Press-On Pressure (69T-109T)",
        "BD Thickness",
        "",
        "Brake Disc make & Particulars",
      ];

      worksheet.getRow(currentRow + 30).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnVB.BrakeDiscABBDSeatSize,
        formDataPressOnVB.BrakeDiscAAllow,
        formDataPressOnVB.BrakeDiscAPressOnPressure,
        formDataPressOnVB.BrakeDiscABDThickness,
        "",
        formDataPressOnVB.BrakeDiscABrakeDiscParticulars,
      ];
      worksheet.getRow(currentRow + 31).values = [
        "Top",
        formDataPressOnVB.BrakeDiscATopXAxis,
        formDataPressOnVB.BrakeDiscATopYAxis,
      ];
      worksheet.getRow(currentRow + 32).values = [
        "Middle",
        formDataPressOnVB.BrakeDiscAMiddleXAxis,
        formDataPressOnVB.BrakeDiscAMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 33).values = [
        "Lower",
        formDataPressOnVB.BrakeDiscALowerXAxis,
        formDataPressOnVB.BrakeDiscALowerYAxis,
      ];
      worksheet.getRow(currentRow + 34).values = [
        "Avg.",
        formDataPressOnVB.BrakeDiscAAvgXAxis,
        formDataPressOnVB.BrakeDiscAAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 30}:D${currentRow + 34}`);
      worksheet.mergeCells(`E${currentRow + 30}:E${currentRow + 34}`);
      worksheet.mergeCells(`F${currentRow + 30}:F${currentRow + 34}`);
      worksheet.mergeCells(currentRow+30, 7, currentRow + 34, 8);
      worksheet.mergeCells(currentRow+30, 9, currentRow + 34, 10);

      // Section for Brake Disc 'B' Side
      worksheet.addRow([]);
      worksheet.mergeCells(`A${currentRow + 36}:J${currentRow + 36}`);
      worksheet.getCell(`A${currentRow + 36}`).value = "Brake Disc 'B' Side";
      worksheet.getCell(`A${currentRow + 36}`).font = { bold: true };

      worksheet.mergeCells(`A${currentRow + 37}:C${currentRow + 38}`);
      worksheet.mergeCells(`D${currentRow + 37}:D${currentRow + 38}`);
      worksheet.mergeCells(`E${currentRow + 37}:E${currentRow + 38}`);
      worksheet.mergeCells(`F${currentRow + 37}:F${currentRow + 38}`);
      worksheet.mergeCells(currentRow+37, 7, currentRow + 38, 8);
      worksheet.mergeCells(currentRow+37, 9, currentRow + 38, 10);

      worksheet.getRow(currentRow + 37).values = [
        "A' Bore Size",
        "",
        "",
        "B' BD Seat Size(199.230-199.260)mm",
        "C=B-A int Allow (0.240-0.300mm)",
        "Press-On Pressure (69T-109T)",
        "BD Thickness",
        "",
        "Brake Disc make & Particulars",
      ];

      worksheet.getRow(currentRow + 39).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnVB.BrakeDiscBBBDSeatSize,
        formDataPressOnVB.BrakeDiscBAllow,
        formDataPressOnVB.BrakeDiscBPressOnPressure,
        formDataPressOnVB.BrakeDiscBBDThickness,
        "",
        formDataPressOnVB.BrakeDiscBBrakeDiscParticulars,
      ];

      worksheet.getRow(currentRow + 40).values = [
        "Top",
        formDataPressOnVB.BrakeDiscBTopXAxis,
        formDataPressOnVB.BrakeDiscBTopYAxis,
      ];
      worksheet.getRow(currentRow + 41).values = [
        "Middle",
        formDataPressOnVB.BrakeDiscBMiddleXAxis,
        formDataPressOnVB.BrakeDiscBMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 42).values = [
        "Lower",
        formDataPressOnVB.BrakeDiscBLowerXAxis,
        formDataPressOnVB.BrakeDiscBLowerYAxis,
      ];
      worksheet.getRow(currentRow + 43).values = [
        "Avg.",
        formDataPressOnVB.BrakeDiscBAvgXAxis,
        formDataPressOnVB.BrakeDiscBAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 39}:D${currentRow + 43}`);
      worksheet.mergeCells(`E${currentRow + 39}:E${currentRow + 43}`);
      worksheet.mergeCells(`F${currentRow + 39}:F${currentRow + 43}`);
      worksheet.mergeCells(currentRow+39, 7, currentRow + 43, 8);
      worksheet.mergeCells(currentRow+39, 9, currentRow + 43, 10);

      // Section for M/C No, Operator, Inspector
      worksheet.getRow(currentRow + 46).values = [
        "M/C No.",
        formDataPressOnVB.MCNo,
        "Operator Name",
        formDataPressOnVB.OperatorNameFinal,
        "Operator No.",
        formDataPressOnVB.OperatorNo,
        "Inspector Name",
        formDataPressOnVB.InspectorName,
        "Inspector No",
        formDataPressOnVB.InspectorNo,
      ];

      const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

          const loginInfo = localStorage.getItem('loggedInUser')
            ? `${localStorage.getItem('loggedInUser')}`
            : 'Unknown';
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

      worksheet.getRow(currentRow + 48).values = [
        "Workshop Name",
        workshopName,
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,
      ];

      //Bold Text Headers
      worksheet.getCell(`A${currentRow+48}`).font = { bold: true };
      worksheet.getCell(`C${currentRow+48}`).font = { bold: true };
      worksheet.getCell(`E${currentRow+48}`).font = { bold: true };
      worksheet.getCell(`A${currentRow}`).font = { bold: true };
      worksheet.getCell(`C${currentRow}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 2}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 6}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 6}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 6}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 6}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`F${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 8}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 10}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 10}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 10}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 11}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 12}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 13}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 14}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 17}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 17}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 17}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 17}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`F${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 21}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 21}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 21}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 22}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 23}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 24}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 25}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 28}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 28}`).font = { bold: true };
      worksheet.getCell(`F${currentRow + 28}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 28}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 28}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 32}`).font = { bold: true };
      
      worksheet.getCell(`A${currentRow + 33}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 34}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 35}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 36}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 37}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 37}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 37}`).font = { bold: true };
      worksheet.getCell(`F${currentRow + 37}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 37}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 37}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 43}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 39}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 39}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 39}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 40}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 42}`).font = { bold: true };
      

      worksheet.getCell(`A${currentRow + 54}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 54}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 54}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 54}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 54}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 46}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 46}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 46}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 46}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 46}`).font = { bold: true };

      worksheet.getCell(`A${currentRow - 4}`).font = { bold: true };
      worksheet.getCell(`B${currentRow - 4}`).font = { bold: true };
      worksheet.getCell(`D${currentRow - 4}`).font = { bold: true };
      worksheet.getCell(`F${currentRow - 4}`).font = { bold: true };
      worksheet.getCell(`H${currentRow - 4}`).font = { bold: true };
      worksheet.getCell(`I${currentRow - 4}`).font = { bold: true };
      worksheet.getCell(`J${currentRow - 4}`).font = { bold: true };

      const boldCells = [
        `A${currentRow}`, `C${currentRow}`,
        `A${currentRow + 2}`, `C${currentRow + 2}`, `E${currentRow + 2}`, `G${currentRow + 2}`, `I${currentRow + 2}`,
        `A${currentRow + 6}`, `C${currentRow + 6}`, `E${currentRow + 6}`, `G${currentRow + 6}`,`A${currentRow+48}`,
        `A${currentRow + 8}`, `D${currentRow + 8}`, `E${currentRow + 8}`, `F${currentRow + 8}`, `G${currentRow + 8}`, `H${currentRow + 8}`,
        `A${currentRow + 10}`, `B${currentRow + 10}`, `C${currentRow + 10}`,`A${currentRow + 37}`,`A${currentRow + 42}`,
        `A${currentRow + 11}`, `A${currentRow + 12}`, `A${currentRow + 13}`, `A${currentRow + 14}`,`A${currentRow + 5}`,`A${currentRow + 16}`,`A${currentRow + 27}`,
        `A${currentRow + 17}`, `C${currentRow + 17}`, `E${currentRow + 17}`, `G${currentRow + 17}`,`E${currentRow + 46}`,
        `A${currentRow + 19}`, `D${currentRow + 19}`, `E${currentRow + 19}`, `F${currentRow + 19}`, `G${currentRow + 19}`, `H${currentRow + 19}`,
        `A${currentRow + 21}`, `B${currentRow + 21}`, `C${currentRow + 21}`,`A${currentRow + 46}`,`G${currentRow + 46}`,
        `A${currentRow + 22}`, `A${currentRow + 23}`, `A${currentRow + 24}`, `A${currentRow + 25}`,`C${currentRow + 46}`,
        `A${currentRow + 28}`, `D${currentRow + 28}`, `E${currentRow + 28}`, `F${currentRow + 28}`, `G${currentRow + 28}`, `I${currentRow + 28}`,
        `A${currentRow + 32}`, `B${currentRow + 30}`, `C${currentRow + 30}`,`I${currentRow + 46}`,`C${currentRow+48}`,
        `A${currentRow + 33}`, `A${currentRow + 34}`, `A${currentRow + 31}`, `A${currentRow + 36}`,`E${currentRow+48}`,
        `A${currentRow + 30}`, `A${currentRow + 34}`, `A${currentRow + 31}`, `A${currentRow + 36}`,
        `A${currentRow + 41}`, `D${currentRow + 37}`, `E${currentRow + 37}`, `F${currentRow + 37}`, `G${currentRow + 37}`, `I${currentRow + 37}`,
        `A${currentRow + 43}`, `B${currentRow + 39}`, `C${currentRow + 39}`,`A${currentRow + 39}`,`A${currentRow + 40}`,`I${currentRow + 8}`,`I${currentRow + 19}`,
       
        `A${currentRow + 54}`, `C${currentRow + 54}`, `E${currentRow + 54}`, `G${currentRow + 54}`, `I${currentRow + 54}`,
        `A${currentRow - 4}`, `B${currentRow - 4}`, `D${currentRow - 4}`, `F${currentRow - 4}`, `H${currentRow - 4}`, `I${currentRow - 4}`, `J${currentRow - 4}`
      ];

      boldCells.forEach(cellAddress => {
        const cell = worksheet.getCell(cellAddress);
        cell.font = { bold: true };
        setFaintGreyBackground(cell);
      });

      worksheet.eachRow({ includeEmpty: true }, (row) => {
        row.eachCell({ includeEmpty: true }, (cell) => {
          setBorder(cell);
          cell.alignment = {
            wrapText: true,
            horizontal: "center",
            vertical: "middle",
          };
        });
      });

      // Move to the next set of rows for the next entry
      currentRow += 57;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "VBPressOnForm.xlsx");
  };



  const exportToPDF = () => {
   

    
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const handleNullValue = (value) =>
      value === null || value === undefined ? "" : value;

    data.forEach((row, index) => {
      // Table headers
      const tableColumn = [];
      const body = [];

      body.push(
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
          { content: row.WheelActivities, colSpan: 1 },
          { content: row.AxleWheelSeatSize, colSpan: 2 },
          { content: row.WheelDiscBoreSize, colSpan: 2 },
          { content: row.wheelDiscStampingParticulars, colSpan: 2 },
          { content: row.PressOnNumber, colSpan: 1 },
          { content: row.WheelActivityBDThickness, colSpan: 1 },
          { content: row.WheelActivityBDMake, colSpan: 1 },
        ],
        [
          { content: "Wheel No.", rowSpan: 1, colSpan: 3 },
          { content: handleNullValue(row.WheelNo), colSpan: 3 },
          { content: "Axle No.", rowSpan: 1, colSpan: 2 },
          { content: handleNullValue(row.AxleNo), colSpan: 2 },
        ],
        [
          { content: "ATL No.", rowSpan: 1, colSpan: 1 },
          {
            content: handleNullValue(row.ATLNo),
            rowSpan: 1,
            colSpan: 1,
          },
          { content: "Wheel Seat Size", rowSpan: 1, colSpan: 1 },
          {
            content: handleNullValue(row.WheelSeatSize),
            rowSpan: 1,
            colSpan: 1,
          },
          { content: "BD Seat Size", rowSpan: 1, colSpan: 1 },
          { content: handleNullValue(row.BDSeatSize), rowSpan: 1, colSpan: 1 },
          { content: "RA Value(1.6 Max)", rowSpan: 1, colSpan: 1 },
          { content: handleNullValue(row.RAValue), rowSpan: 1, colSpan: 1 },
          { content: "Operator Name", rowSpan: 1, colSpan: 1 },
          {
            content: handleNullValue(row.OperatorName),
            rowSpan: 1,
            colSpan: 1,
          },
        ],
        [{ content: "Wheel Disc 'A' Side", colSpan: 10 }],
        [
          { content: "VTL No.", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscAVTLNO), rowSpan: 1 },
          { content: "Bore Size By Operator", colSpan: 1 },
          {
            content: handleNullValue(row.WheelDiscABoreSizeByOperator),
            rowSpan: 1,
            colSpan: 2,
          },
          { content: "RA Value", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscARAValue), rowSpan: 1 },
          { content: "Operator Name", colSpan: 1 },
          {
            content: handleNullValue(row.WheelDiscAOperatorName),
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
          { content: handleNullValue(row.WheelDiscATopXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscATopYAxis), rowSpan: 1 },
          {
            content: handleNullValue(row.WheelDiscABWheelSeatSize),
            colSpan: 2,
            rowSpan: 4,
          },
          { content: handleNullValue(row.WheelDiscAAllow), rowSpan: 4 },
          {
            content: handleNullValue(row.WheelDiscAPressOnPressure),
            rowSpan: 4,
          },
          { content: handleNullValue(row.WheelDiscARDNo), rowSpan: 4 },
          {
            content: handleNullValue(row.WheelDiscAWheelDiscParticulars),
            colSpan: 2,
            rowSpan: 4,
          },
        ],
        [
          { content: "Middle", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscAMiddleXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscAMiddleYAxis), rowSpan: 1 },
        ],
        [
          { content: "Lower", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscALowerXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscALowerYAxis), rowSpan: 1 },
        ],
        [
          { content: "Avg.", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscAAvgXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscAAvgYAxis), rowSpan: 1 },
        ],
        [{ content: "Wheel Disc 'B' Side", colSpan: 10 }],
        [
          { content: "VTL No.", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBVTLNo), rowSpan: 1 },
          { content: "Bore Size By Operator", colSpan: 1 },
          {
            content: handleNullValue(row.WheelDiscBBoreSizeByOperator),
            rowSpan: 1,
            colSpan: 2,
          },
          { content: "RA Value", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBRAValue), rowSpan: 1 },
          { content: "Operator Name", colSpan: 1 },
          {
            content: handleNullValue(row.WheelDiscBOperatorName),
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
          { content: handleNullValue(row.WheelDiscBTopXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBTopYAxis), rowSpan: 1 },
          {
            content: handleNullValue(row.WheelDiscBBWheelSeatSize),
            colSpan: 2,
            rowSpan: 4,
          },
          { content: handleNullValue(row.WheelDiscBAllow), rowSpan: 4 },
          {
            content: handleNullValue(row.WheelDiscBPressOnPressure),
            rowSpan: 4,
          },
          { content: handleNullValue(row.WheelDiscBRDNo), rowSpan: 4 },
          {
            content: handleNullValue(row.WheelDiscBWheelDiscParticulars),
            colSpan: 2,
            rowSpan: 4,
          },
        ],
        [
          { content: "Middle", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBMiddleXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBMiddleYAxis), rowSpan: 1 },
        ],
        [
          { content: "Lower", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBLowerXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBLowerYAxis), rowSpan: 1 },
        ],
        [
          { content: "Avg.", rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBAvgXAxis), rowSpan: 1 },
          { content: handleNullValue(row.WheelDiscBAvgYAxis), rowSpan: 1 },
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
          { content: handleNullValue(row.BrakeDiscATopXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscATopYAxis), rowSpan: 1 },
          {
            content: handleNullValue(row.BrakeDiscABBDSeatSize),
            colSpan: 2,
            rowSpan: 4,
          },
          { content: handleNullValue(row.BrakeDiscAAllow), rowSpan: 4 },
          {
            content: handleNullValue(row.BrakeDiscAPressOnPressure),
            rowSpan: 4,
          },
          { content: handleNullValue(row.BrakeDiscABDThickness), rowSpan: 4 },
          {
            content: handleNullValue(row.BrakeDiscABrakeDiscParticulars),
            colSpan: 2,
            rowSpan: 4,
          },
        ],
        [
          { content: "Middle", rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscAMiddleXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscAMiddleYAxis), rowSpan: 1 },
        ],
        [
          { content: "Lower", rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscALowerXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscALowerYAxis), rowSpan: 1 },
        ],
        [
          { content: "Avg.", rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscAAvgXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscAAvgYAxis), rowSpan: 1 },
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
          { content: handleNullValue(row.BrakeDiscBTopXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBTopYAxis), rowSpan: 1 },
          {
            content: handleNullValue(row.BrakeDiscBBBDSeatSize),
            colSpan: 2,
            rowSpan: 4,
          },
          { content: handleNullValue(row.BrakeDiscBAllow), rowSpan: 4 },
          {
            content: handleNullValue(row.BrakeDiscBPressOnPressure),
            rowSpan: 4,
          },
          { content: handleNullValue(row.BrakeDiscBBDThickness), rowSpan: 4 },
          {
            content: handleNullValue(row.BrakeDiscBBrakeDiscParticulars),
            colSpan: 2,
            rowSpan: 4,
          },
        ],
        [
          { content: "Middle", rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBMiddleXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBMiddleYAxis), rowSpan: 1 },
        ],
        [
          { content: "Lower", rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBLowerXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBLowerYAxis), rowSpan: 1 },
        ],
        [
          { content: "Avg.", rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBAvgXAxis), rowSpan: 1 },
          { content: handleNullValue(row.BrakeDiscBAvgYAxis), rowSpan: 1 },
        ],
        [
          { content: "Machine No.", rowSpan: 1, colSpan: 1 },
          {
            content: handleNullValue(row.MCNo),
            rowSpan: 1,
            colSpan: 1,
          },
          { content: "Operator Name", rowSpan: 1, colSpan: 1 },
          {
            content: handleNullValue(row.OperatorNameFinal),
            rowSpan: 1,
            colSpan: 1,
          },
          { content: "Opertaor No.", rowSpan: 1, colSpan: 1 },
          { content: handleNullValue(row.OperatorNo), rowSpan: 1, colSpan: 1 },
          { content: "Inspector Name", rowSpan: 1, colSpan: 1 },
          {
            content: handleNullValue(row.InspectorName),
            rowSpan: 1,
            colSpan: 1,
          },
          { content: "Inspector No.", rowSpan: 1, colSpan: 1 },
          { content: handleNullValue(row.InspectorNo), rowSpan: 1, colSpan: 1 },
        ]
      );

      // Generate the table
      doc.autoTable({
        head: tableColumn,
        body: body,
        startX: 10,
        startY: 30,
        tableWidth: "auto", // Automatically adjusts the width to fit the page
        tableHeight: doc.internal.pageSize.getHeight() - 20,
        theme: "grid",

        headStyles: {
          fillColor: [255, 255, 255], // Light gray background for the header
          textColor: [0, 0, 0], // Black text color for the header
          halign: "center",
          valign: "middle",
          fontSize: 5, // Adjusted to fit more content
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
              ([row, col]) =>
                data.row.index === row && data.column.index === col
            )
          ) {
            data.cell.styles.fillColor = [240, 240, 240]; // White background
            data.cell.styles.textColor = [0, 0, 0]; // Black text
            data.cell.styles.fontStyle = "bold"; // Make text bold
          }
        },
        columnStyles: {
          1: { cellWidth: 40 },
          3: { cellWidth: 50 },
          9: { cellWidth: 35 },
        },
        margin: { top: 20, right: 20, bottom: 20, left: 20 }, // Adjusted margins
        // margin: { top: 10 }, // Adjusted margins
        didDrawPage: (data) => {
          // Add a title on the first page
          // if (data.pageNumber === 1) {
          // doc.setFontSize(12);
          // doc.text(
          //   "VB Final Inspection Report",
          //   data.settings.margin.left,
          //   20
          // );
          // }

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
      if (index < data.length - 1) {
        doc.addPage(); // This ensures the next entry starts on a fresh page
      }
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
    doc.save("VB Press-On Form.pdf");
  };

  const exportToCSV = () => {
    
    // Define headers and subheaders
    const headers = [
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
      "Wheel Disc A B Wheel Seat Size",
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
      "Brake Disc A B BD Seat Size",
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
      "Brake Disc B B BD Seat Size",
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
      "OperatorNo.",
      "InspectorName",
      "InspectorNo.",
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.WheelNo,
      entry.AxleNo,
      entry.ATLNo,
      entry.WheelSeatSize,
      entry.BDSeatSize,
      entry.RAValue,
      entry.OperatorName,
      entry.WheelDiscAVTLNO,
      entry.WheelDiscABoreSizeByOperator,
      entry.WheelDiscARAValue,
      entry.WheelDiscAOperatorName,
      entry.WheelDiscABWheelSeatSize,
      entry.WheelDiscAAllow,
      entry.WheelDiscAPressOnPressure,
      entry.WheelDiscARDNo,
      entry.WheelDiscAWheelDiscParticulars,
      entry.WheelDiscATopXAxis,
      entry.WheelDiscATopYAXis,
      entry.WheelDiscAMiddleXAxis,
      entry.WheelDiscAMiddleYAxis,
      entry.WheelDiscALowerXAxis,
      entry.WheelDiscALowerYAxis,
      entry.WheelDiscAAvgXAxis,
      entry.WheelDiscAAvgYAxis,
      entry.WheelDiscBVTLNo,
      entry.WheelDiscBBoreSizeByOperator,
      entry.WheelDiscBRAValue,
      entry.WheelDiscBOperatorName,
      entry.WheelDiscBABoreSize,
      entry.WheelDiscBBWheelSeatSize,
      entry.WheelDiscBAllow,
      entry.WheelDiscBPressOnPressure,
      entry.WheelDiscBRDNo,
      entry.WheelDiscBWheelDiscParticulars,
      entry.WheelDiscBTopXAxis,
      entry.WheelDiscBTopYAxis,
      entry.WheelDiscBMiddleXAxis,
      entry.WheelDiscBMiddleYAxis,
      entry.WheelDiscBLowerXAxis,
      entry.WheelDiscBLowerYAxis,
      entry.WheelDiscBAvgXAxis,
      entry.WheelDiscBAvgYAxis,
      entry.BrakeDiscABBDSeatSize,
      entry.BrakeDiscAAllow,
      entry.BrakeDiscAPressOnPressure,
      entry.BrakeDiscABDThickness,
      entry.BrakeDiscABrakeDiscParticulars,
      entry.BrakeDiscATopXAxis,
      entry.BrakeDiscATopYAxis,
      entry.BrakeDiscAMiddleXAxis,
      entry.BrakeDiscAMiddleYAxis,
      entry.BrakeDiscALowerXAxis,
      entry.BrakeDiscALowerYAxis,
      entry.BrakeDiscAAvgXAxis,
      entry.BrakeDiscAAvgYAxis,
      entry.BrakeDiscBABoreSize,
      entry.BrakeDiscBBBDSeatSize,
      entry.BrakeDiscBAllow,
      entry.BrakeDiscBPressOnPressure,
      entry.BrakeDiscBBDThickness,
      entry.BrakeDiscBBrakeDiscParticulars,
      entry.BrakeDiscBTopXAxis,
      entry.BrakeDiscBTopYAxis,
      entry.BrakeDiscBMiddleXAxis,
      entry.BrakeDiscBMiddleYAxis,
      entry.BrakeDiscBLowerXAxis,
      entry.BrakeDiscBLowerYAxis,
      entry.BrakeDiscBAvgXAxis,
      entry.BrakeDiscBAvgYAxis,
      entry.MCNo,
      entry.OperatorNameFinal,
      entry.OperatorNo,
      entry.InspectorName,
      entry.InspectorNo,
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
    link.setAttribute("download", "VBPressOnForm.csv");
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
          Proceed to Pending Tasks
        </button>
      </div>
      <div id="table-container" className="table_container">
        {data.map((res, index) => (
          <table>
            <thead className="thead">
              <tbody name="tbody" key={`tbody-${res.id}+${index}`}>
                <tr name="tr" key={`tr-${res.id}`}>

                  <th>Wheel Activities</th>
                  <th colSpan={2}>Axle Wheel Seat Size</th>
                  <th colSpan={2}>Wheel Disc Bore Size</th>
                  <th colSpan={2}>Wheel Disc Stamping Particulars</th>
                  <th>Press-On No.</th>
                  <th>BD Thickness</th>
                  <th>BD Make</th>
                </tr>
                <tr>
                  <td>{res.WheelActivities}</td>
                  <td colSpan={2}>{res.AxleWheelSeatSize}</td>
                  <td colSpan={2}>{res.WheelDiscBoreSize}</td>
                  <td colSpan={2}>{res.wheelDiscStampingParticulars}</td>
                  <td>{res.PressOnNumber}</td>
                  <td>{res.WheelActivityBDThickness}</td>
                  <td>{res.WheelActivityBDMake}</td>
                </tr>
                <tr>
                  <th>Wheel No.</th>
                  <td colSpan={2}>{res.WheelNo}</td>
                  <th>Axle No.</th>
                  <td colSpan={6}>{res.AxleNo}</td>
                </tr>
                <tr>
                  <th>ATL No.</th>
                  <td>{res.ATLNo}</td>
                  <th>Wheel Seat Size</th>
                  <td>{res.WheelSeatSize}</td>
                  <th>BD Seat Size</th>
                  <td>{res.BDSeatSize}</td>
                  <th>RA Value(1.6 Max)</th>
                  <td>{res.RAValue}</td>
                  <th>Operator Name</th>
                  <td>{res.OperatorName}</td>
                </tr>

                {/* WHEEL DISC A */}
                <tr>
                  <th colSpan={10}>Wheel Disc 'A' Side</th>
                </tr>
                <tr>
                  <th>VTL No.</th>
                  <td>{res.WheelDiscAVTLNO}</td>
                  <th colSpan={2}>Bore Size By Operator</th>
                  <td>{res.WheelDiscABoreSizeByOperator}</td>
                  <th>RA Value</th>
                  <td>{res.WheelDiscARAValue}</td>
                  <th colSpan={2}>Operator Name</th>
                  <td>{res.WheelDiscAOperatorName}</td>
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
                  <td>{res.WheelDiscATopXAxis}</td>
                  <td>{res.WheelDiscATopYAxis}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.WheelDiscABWheelSeatSize}
                  </td>
                  <td rowSpan={4}>{res.WheelDiscAAllow}</td>
                  <td rowSpan={4}>{res.WheelDiscAPressOnPressure}</td>
                  <td rowSpan={4}>{res.WheelDiscARDNo}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.WheelDiscAWheelDiscParticulars}
                  </td>
                </tr>
                <tr>
                  <th>Middle</th>
                  <td>{res.WheelDiscAMiddleXAxis}</td>
                  <td>{res.WheelDiscAMiddleYAxis}</td>
                </tr>
                <tr>
                  <th>Lower</th>
                  <td>{res.WheelDiscALowerXAxis}</td>
                  <td>{res.WheelDiscALowerYAxis}</td>
                </tr>
                <tr>
                  <th>Avg.</th>
                  <td>{res.WheelDiscAAvgXAxis}</td>
                  <td>{res.WheelDiscAAvgYAxis}</td>
                </tr>
                <br></br>

                {/* WHEEL DISC B */}
                <tr>
                  <th colSpan={10}>Wheel Disc 'B' Side</th>
                </tr>
                <tr>
                  <th>VTL No.</th>
                  <td>{res.WheelDiscBVTLNo}</td>
                  <th colSpan={2}>Bore Size By Operator</th>
                  <td>{res.WheelDiscBBoreSizeByOperator}</td>
                  <th>RA Value</th>
                  <td>{res.WheelDiscBRAValue}</td>
                  <th colSpan={2}>Operator Name</th>
                  <td>{res.WheelDiscBOperatorName}</td>
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
                  <td>{res.WheelDiscBTopXAxis}</td>
                  <td>{res.WheelDiscBTopYAxis}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.WheelDiscBBWheelSeatSize}
                  </td>
                  <td rowSpan={4}>{res.WheelDiscBAllow}</td>
                  <td rowSpan={4}>{res.WheelDiscBPressOnPressure}</td>
                  <td rowSpan={4}>{res.WheelDiscBRDNo}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.WheelDiscBWheelDiscParticulars}
                  </td>
                </tr>
                <tr>
                  <th>Middle</th>
                  <td>{res.WheelDiscBMiddleXAxis}</td>
                  <td>{res.WheelDiscBMiddleYAxis}</td>
                </tr>
                <tr>
                  <th>Lower</th>
                  <td>{res.WheelDiscBLowerXAxis}</td>
                  <td>{res.WheelDiscBLowerYAxis}</td>
                </tr>
                <tr>
                  <th>Avg.</th>
                  <td>{res.WheelDiscBAvgXAxis}</td>
                  <td>{res.WheelDiscBAvgYAxis}</td>
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
                  <td>{res.BrakeDiscATopXAxis}</td>
                  <td>{res.BrakeDiscATopYAxis}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.BrakeDiscABBDSeatSize}
                  </td>
                  <td rowSpan={4}>{res.BrakeDiscAAllow}</td>
                  <td rowSpan={4}>{res.BrakeDiscAPressOnPressure}</td>
                  <td rowSpan={4}>{res.BrakeDiscABDThickness}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.BrakeDiscABrakeDiscParticulars}
                  </td>
                </tr>
                <tr>
                  <th>Middle</th>
                  <td>{res.BrakeDiscAMiddleXAxis}</td>
                  <td>{res.BrakeDiscAMiddleYAxis}</td>
                </tr>
                <tr>
                  <th>Lower</th>
                  <td>{res.BrakeDiscALowerXAxis}</td>
                  <td>{res.BrakeDiscALowerYAxis}</td>
                </tr>
                <tr>
                  <th>Avg.</th>
                  <td>{res.BrakeDiscAAvgXAxis}</td>
                  <td>{res.BrakeDiscAAvgYAxis}</td>
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
                  <td>{res.BrakeDiscBTopXAxis}</td>
                  <td>{res.BrakeDiscBTopYAxis}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.BrakeDiscBBBDSeatSize}
                  </td>
                  <td rowSpan={4}>{res.BrakeDiscBAllow}</td>
                  <td rowSpan={4}>{res.BrakeDiscBPressOnPressure}</td>
                  <td rowSpan={4}>{res.BrakeDiscBBDThickness}</td>
                  <td rowSpan={4} colSpan={2}>
                    {res.BrakeDiscBBrakeDiscParticulars}
                  </td>
                </tr>
                <tr>
                  <th>Middle</th>
                  <td>{res.BrakeDiscBMiddleXAxis}</td>
                  <td>{res.BrakeDiscBMiddleYAxis}</td>
                </tr>
                <tr>
                  <th>Lower</th>
                  <td>{res.BrakeDiscBLowerXAxis}</td>
                  <td>{res.BrakeDiscBLowerYAxis}</td>
                </tr>
                <tr>
                  <th>Avg.</th>
                  <td>{res.BrakeDiscBAvgXAxis}</td>
                  <td>{res.BrakeDiscBAvgYAxis}</td>
                </tr>
              </tbody>
            </thead>
            <br></br>
            <div className="footerProceedSubmit">
              <div>
                <b> M/C No.: </b>
                {res.MCNo}
              </div>

              <div>
                <b> Operator Name: </b>
                {res.OperatorName}
              </div>
              <div>
                <b> Operator No.: </b>
                {res.OperatorNo}
              </div>

              <div>
                <b> Inspector Name: </b>
                {res.InspectorName}
              </div>
              <div>
                <b> Inspector No.: </b>
                {res.InspectorNo}
              </div>
            </div>
            <br></br>
            <br></br>
          </table>
        ))}
      </div>
    </div>
  );
};

export default AllEntryPressOn;

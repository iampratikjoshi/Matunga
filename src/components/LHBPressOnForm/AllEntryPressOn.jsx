import React, { useEffect, useState } from "react";
// import "../../resources/LHB/lhbpressonform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
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
        const response = await api.get("/pressonlhb/getalldata");
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

    // Start row index
    let currentRow = 1;

    data.forEach((formDataPressOnLHB, index) => {
      // Headers for Wheel Details
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
      // worksheet.mergeCells(currentRow + 2, 1, currentRow + 3, 3);

      worksheet.getRow(currentRow).values = [
        "Wheel No.",
        formDataPressOnLHB.WheelNo,
        "Axle No.",
        formDataPressOnLHB.AxleNo,
      ];
      worksheet.mergeCells(currentRow, 4, currentRow + 1, 10);

      worksheet.getRow(currentRow + 2).values = [
        "ATL No.",
        formDataPressOnLHB.ATLNo,
        "Wheel Seat Size",
        formDataPressOnLHB.WheelSeatSize,
        "BD Seat Size",
        formDataPressOnLHB.BDSeatSize,
        "RA Value",
        formDataPressOnLHB.RAValue,
        "Operator Name",
        formDataPressOnLHB.OperatorName,
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
        formDataPressOnLHB.WheelDiscAVTLNO,
        "Bore Size By Operator",
        formDataPressOnLHB.WheelDiscABoreSizeByOperator,
        "RA Value",
        formDataPressOnLHB.WheelDiscARAValue,
        "Operator Name",
        formDataPressOnLHB.WheelDiscAOperatorName,
      ];

      worksheet.mergeCells(`A${currentRow + 6}:A${currentRow + 7}`);
      worksheet.mergeCells(`B${currentRow + 6}:B${currentRow + 7}`);
      worksheet.mergeCells(`C${currentRow + 6}:C${currentRow + 7}`);
      worksheet.mergeCells(`D${currentRow + 6}:D${currentRow + 7}`);
      worksheet.mergeCells(`E${currentRow + 6}:E${currentRow + 7}`);
      worksheet.mergeCells(`F${currentRow + 6}:F${currentRow + 7}`);
      worksheet.mergeCells(`G${currentRow + 6}:G${currentRow + 7}`);
      worksheet.mergeCells(`H${currentRow + 6}:H${currentRow + 7}`);
      worksheet.mergeCells(`A${currentRow + 8}:C${currentRow + 9}`);
      worksheet.mergeCells(`D${currentRow + 8}:D${currentRow + 9}`);
      worksheet.mergeCells(`E${currentRow + 8}:E${currentRow + 9}`);
      worksheet.mergeCells(`F${currentRow + 8}:F${currentRow + 9}`);
      worksheet.mergeCells(`G${currentRow + 8}:G${currentRow + 9}`);
      worksheet.mergeCells(`H${currentRow + 8}:H${currentRow + 9}`);
      // worksheet.mergeCells(`${currentRow + 8}`,1,`${currentRow + 9}`,3);

      worksheet.getRow(currentRow + 8).values = [
        "A' Bore Size",
        "",
        "",
        "B' Wheel Seat Size (192-195mm)",
        "C=B-A int Allow (0.240-0.300mm)",
        "Press-On Pressure (69T-109T)",
        "RD No.",
        "Wheel Disc Particulars",
      ];

      worksheet.getRow(currentRow + 10).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnLHB.WheelDiscABWheelSeatSize,
        formDataPressOnLHB.WheelDiscAAllow,
        formDataPressOnLHB.WheelDiscAPressOnPressure,
        formDataPressOnLHB.WheelDiscARDNo,
        formDataPressOnLHB.WheelDiscAWheelDiscParticulars,
      ];

      worksheet.getRow(currentRow + 11).values = [
        "Top",
        formDataPressOnLHB.WheelDiscATopXAxis,
        formDataPressOnLHB.WheelDiscATopYAxis,
      ];
      worksheet.getRow(currentRow + 12).values = [
        "Middle",
        formDataPressOnLHB.WheelDiscAMiddleXAxis,
        formDataPressOnLHB.WheelDiscAMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 13).values = [
        "Lower",
        formDataPressOnLHB.WheelDiscALowerXAxis,
        formDataPressOnLHB.WheelDiscALowerYAxis,
      ];
      worksheet.getRow(currentRow + 14).values = [
        "Avg.",
        formDataPressOnLHB.WheelDiscAAvgXAxis,
        formDataPressOnLHB.WheelDiscAAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 10}:D${currentRow + 14}`);
      worksheet.mergeCells(`E${currentRow + 10}:E${currentRow + 14}`);
      worksheet.mergeCells(`F${currentRow + 10}:F${currentRow + 14}`);
      worksheet.mergeCells(`G${currentRow + 10}:G${currentRow + 14}`);
      worksheet.mergeCells(`H${currentRow + 10}:H${currentRow + 14}`);

      // Section for Wheel Disc 'B' Side
      worksheet.addRow([]);
      worksheet.mergeCells(`A${currentRow + 16}:J${currentRow + 16}`);
      worksheet.getCell(`A${currentRow + 16}`).value = "Wheel Disc 'B' Side";
      worksheet.getCell(`A${currentRow + 16}`).font = { bold: true };

      worksheet.getRow(currentRow + 17).values = [
        "VTL No.",
        formDataPressOnLHB.WheelDiscBVTLNo,
        "Bore Size By Operator",
        formDataPressOnLHB.WheelDiscBBoreSizeByOperator,
        "RA Value",
        formDataPressOnLHB.WheelDiscBRAValue,
        "Operator Name",
        formDataPressOnLHB.WheelDiscBOperatorName,
      ];

      worksheet.mergeCells(`A${currentRow + 17}:A${currentRow + 18}`);
      worksheet.mergeCells(`B${currentRow + 17}:B${currentRow + 18}`);
      worksheet.mergeCells(`C${currentRow + 17}:C${currentRow + 18}`);
      worksheet.mergeCells(`D${currentRow + 17}:D${currentRow + 18}`);
      worksheet.mergeCells(`E${currentRow + 17}:E${currentRow + 18}`);
      worksheet.mergeCells(`F${currentRow + 17}:F${currentRow + 18}`);
      worksheet.mergeCells(`G${currentRow + 17}:G${currentRow + 18}`);
      worksheet.mergeCells(`H${currentRow + 17}:H${currentRow + 18}`);

      worksheet.mergeCells(`A${currentRow + 19}:C${currentRow + 20}`);
      worksheet.mergeCells(`D${currentRow + 19}:D${currentRow + 20}`);
      worksheet.mergeCells(`E${currentRow + 19}:E${currentRow + 20}`);
      worksheet.mergeCells(`F${currentRow + 19}:F${currentRow + 20}`);
      worksheet.mergeCells(`G${currentRow + 19}:G${currentRow + 20}`);
      worksheet.mergeCells(`H${currentRow + 19}:H${currentRow + 20}`);

      worksheet.getRow(currentRow + 19).values = [
        "A' Bore Size",
        "",
        "",
        "B' Wheel Seat Size (192-195mm)",
        "C=B-A int Allow (0.240-0.300mm)",
        "Press-On Pressure (69T-109T)",
        "RD No.",
        "Wheel Disc Particulars",
      ];

      worksheet.getRow(currentRow + 21).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnLHB.WheelDiscBBWheelSeatSize,
        formDataPressOnLHB.WheelDiscBAllow,
        formDataPressOnLHB.WheelDiscBPressOnPressure,
        formDataPressOnLHB.WheelDiscBRDNo,
        formDataPressOnLHB.WheelDiscBWheelDiscParticulars,
      ];

      worksheet.getRow(currentRow + 22).values = [
        "Top",
        formDataPressOnLHB.WheelDiscBTopXAxis,
        formDataPressOnLHB.WheelDiscBTopYAxis,
      ];
      worksheet.getRow(currentRow + 23).values = [
        "Middle",
        formDataPressOnLHB.WheelDiscBMiddleXAxis,
        formDataPressOnLHB.WheelDiscBMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 24).values = [
        "Lower",
        formDataPressOnLHB.WheelDiscBLowerXAxis,
        formDataPressOnLHB.WheelDiscBLowerYAxis,
      ];
      worksheet.getRow(currentRow + 25).values = [
        "Avg.",
        formDataPressOnLHB.WheelDiscBAvgXAxis,
        formDataPressOnLHB.WheelDiscBAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 21}:D${currentRow + 25}`);
      worksheet.mergeCells(`E${currentRow + 21}:E${currentRow + 25}`);
      worksheet.mergeCells(`F${currentRow + 21}:F${currentRow + 25}`);
      worksheet.mergeCells(`G${currentRow + 21}:G${currentRow + 25}`);
      worksheet.mergeCells(`H${currentRow + 21}:H${currentRow + 25}`);

      // Section for Brake Disc 'A' Side
      worksheet.addRow([]);
      worksheet.mergeCells(`A${currentRow + 27}:J${currentRow + 29}`);
      worksheet.getCell(`A${currentRow + 27}`).value = "Brake Disc 'A' Side";
      worksheet.getCell(`A${currentRow + 27}`).font = { bold: true };

      worksheet.mergeCells(`A${currentRow + 30}:C${currentRow + 31}`);
      worksheet.mergeCells(`D${currentRow + 30}:D${currentRow + 31}`);
      worksheet.mergeCells(`E${currentRow + 30}:E${currentRow + 31}`);
      worksheet.mergeCells(`F${currentRow + 30}:F${currentRow + 31}`);
      worksheet.mergeCells(`G${currentRow + 30}:G${currentRow + 31}`);
      worksheet.mergeCells(`H${currentRow + 30}:H${currentRow + 31}`);

      worksheet.getRow(currentRow + 30).values = [
        "A' Bore Size",
        "",
        "",
        "B' BD Seat Size(199.230-199.260)mm",
        "C=B-A int Allow (0.240-0.300mm)",
        "Press-On Pressure (69T-109T)",
        "BD Thickness",
        "Brake Disc make & Particulars",
      ];

      worksheet.getRow(currentRow + 32).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnLHB.BrakeDiscABWheelSeatSize,
        formDataPressOnLHB.BrakeDiscAAllow,
        formDataPressOnLHB.BrakeDiscAPressOnPressure,
        formDataPressOnLHB.BrakeDiscARDNo,
        formDataPressOnLHB.BrakeDiscAWheelDiscParticulars,
      ];

      worksheet.getRow(currentRow + 33).values = [
        "Top",
        formDataPressOnLHB.BrakeDiscATopXAxis,
        formDataPressOnLHB.BrakeDiscATopYAxis,
      ];
      worksheet.getRow(currentRow + 34).values = [
        "Middle",
        formDataPressOnLHB.BrakeDiscAMiddleXAxis,
        formDataPressOnLHB.BrakeDiscAMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 35).values = [
        "Lower",
        formDataPressOnLHB.BrakeDiscALowerXAxis,
        formDataPressOnLHB.BrakeDiscALowerYAxis,
      ];
      worksheet.getRow(currentRow + 36).values = [
        "Avg.",
        formDataPressOnLHB.BrakeDiscAAvgXAxis,
        formDataPressOnLHB.BrakeDiscAAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 32}:D${currentRow + 36}`);
      worksheet.mergeCells(`E${currentRow + 32}:E${currentRow + 36}`);
      worksheet.mergeCells(`F${currentRow + 32}:F${currentRow + 36}`);
      worksheet.mergeCells(`G${currentRow + 32}:G${currentRow + 36}`);
      worksheet.mergeCells(`H${currentRow + 32}:H${currentRow + 36}`);

      // Section for Brake Disc 'B' Side
      worksheet.addRow([]);
      worksheet.mergeCells(`A${currentRow + 38}:J${currentRow + 40}`);
      worksheet.getCell(`A${currentRow + 38}`).value = "Brake Disc 'B' Side";
      worksheet.getCell(`A${currentRow + 38}`).font = { bold: true };

      worksheet.mergeCells(`A${currentRow + 41}:C${currentRow + 42}`);
      worksheet.mergeCells(`D${currentRow + 41}:D${currentRow + 42}`);
      worksheet.mergeCells(`E${currentRow + 41}:E${currentRow + 42}`);
      worksheet.mergeCells(`F${currentRow + 41}:F${currentRow + 42}`);
      worksheet.mergeCells(`G${currentRow + 41}:G${currentRow + 42}`);
      worksheet.mergeCells(`H${currentRow + 41}:H${currentRow + 42}`);

      worksheet.getRow(currentRow + 41).values = [
        "A' Bore Size",
        "",
        "",
        "B' BD Seat Size(199.230-199.260)mm",
        "C=B-A int Allow (0.240-0.300mm)",
        "Press-On Pressure (69T-109T)",
        "BD Thickness",
        "Brake Disc make & Particulars",
      ];

      worksheet.getRow(currentRow + 43).values = [
        "Insp.",
        "X-axis",
        "Y-axis",
        formDataPressOnLHB.BrakeDiscBBWheelSeatSize,
        formDataPressOnLHB.BrakeDiscBAllow,
        formDataPressOnLHB.BrakeDiscBPressOnPressure,
        formDataPressOnLHB.BrakeDiscBRDNo,
        formDataPressOnLHB.BrakeDiscBWheelDiscParticulars,
      ];

      worksheet.getRow(currentRow + 44).values = [
        "Top",
        formDataPressOnLHB.BrakeDiscBTopXAxis,
        formDataPressOnLHB.BrakeDiscBTopYAxis,
      ];
      worksheet.getRow(currentRow + 45).values = [
        "Middle",
        formDataPressOnLHB.BrakeDiscBMiddleXAxis,
        formDataPressOnLHB.BrakeDiscBMiddleYAxis,
      ];
      worksheet.getRow(currentRow + 46).values = [
        "Lower",
        formDataPressOnLHB.BrakeDiscBLowerXAxis,
        formDataPressOnLHB.BrakeDiscBLowerYAxis,
      ];
      worksheet.getRow(currentRow + 47).values = [
        "Avg.",
        formDataPressOnLHB.BrakeDiscBAvgXAxis,
        formDataPressOnLHB.BrakeDiscBAvgYAxis,
      ];

      worksheet.mergeCells(`D${currentRow + 43}:D${currentRow + 47}`);
      worksheet.mergeCells(`E${currentRow + 43}:E${currentRow + 47}`);
      worksheet.mergeCells(`F${currentRow + 43}:F${currentRow + 47}`);
      worksheet.mergeCells(`G${currentRow + 43}:G${currentRow + 47}`);
      worksheet.mergeCells(`H${currentRow + 43}:H${currentRow + 47}`);

      // Section for M/C No, Operator, Inspector
      worksheet.getRow(currentRow + 50).values = [
        "M/C No.",
        formDataPressOnLHB.MCNo,

        "Operator Name",
        formDataPressOnLHB.OperatorNameFinal,

        "Operator No.",
        formDataPressOnLHB.OperatorNo,

        "Inspector Name",
        formDataPressOnLHB.InspectorName,

        "Inspector No",
        formDataPressOnLHB.InspectorNo,
      ];
      //Bold Text Headers

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
      worksheet.getCell(`H${currentRow + 8}`).font = { bold: true };
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
      worksheet.getCell(`H${currentRow + 19}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 21}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 21}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 21}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 22}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 23}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 24}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 25}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`F${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`H${currentRow + 30}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 32}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 32}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 32}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 33}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 34}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 35}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 36}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`D${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`F${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`H${currentRow + 41}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 43}`).font = { bold: true };
      worksheet.getCell(`B${currentRow + 43}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 43}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 44}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 45}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 46}`).font = { bold: true };
      worksheet.getCell(`A${currentRow + 47}`).font = { bold: true };

      worksheet.getCell(`A${currentRow + 50}`).font = { bold: true };
      worksheet.getCell(`G${currentRow + 50}`).font = { bold: true };
      worksheet.getCell(`C${currentRow + 50}`).font = { bold: true };
      worksheet.getCell(`E${currentRow + 50}`).font = { bold: true };
      worksheet.getCell(`I${currentRow + 50}`).font = { bold: true };

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
      currentRow += 53;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBPressOnForm.xlsx");
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
            [0, 0], // "Wheel No."
            [0, 6], // "Axle No."
            [1, 0], // "ATL No."
            [1, 2], // "Wheel Seat Size"
            [1, 4], // "BD Seat Size"
            [1, 6], // "RA Value(1.6 Max)"
            [1, 8], // "Operator Name"
            [2, 0], // "Wheel Disc 'A' Side"
            [3, 0], // "VTL No."
            [3, 2], // "Bore Size By Operator"
            [3, 5], // "RA Value"
            [3, 7], // "Operator Name"
            [4, 0], // "A' Bore Size"
            [4, 3], // "B' Wheel Seat Size(192-195)mm"
            [4, 5], // "C=B-A int Allow(0.240-0.300)mm"
            [4, 6], // "Press-On Pressure in Ton(69T-109T)"
            [4, 7], // "RD No."
            [4, 8], // "Wheel Disc Particulars"
            [5, 0], // "Insp."
            [5, 1], // "X-axis"
            [5, 2], // "Y-axis"
            [6, 0], // "Top"
            [7, 0], // "Middle"
            [8, 0], // "Lower"
            [9, 0], // "Avg."
            [10, 0], // "Wheel Disc 'B' Side"
            [11, 0], // "VTL No."
            [11, 2], // "Bore Size By Operator"
            [11, 5], // "RA Value"
            [11, 7], // "Operator Name"
            [12, 0], // "A' Bore Size"
            [12, 3], // "B' Wheel Seat Size(192-195)mm"
            [12, 5], // "C=B-A int Allow(0.240-0.300)mm"
            [12, 6], // "Press-On Pressure in Ton(69T-109T)"
            [12, 7], // "RD No."
            [12, 8], // "Wheel Disc Particulars"
            [13, 0], // "Insp."
            [13, 1], // "X-axis"
            [13, 2], // "Y-axis"
            [14, 0], // "Top"
            [15, 0], // "Middle"
            [16, 0], // "Lower"
            [17, 0], // "Avg."
            [18, 0], // "Brake Disc 'A' Side"
            [19, 0], // "A' Bore Size"
            [19, 3], // "B' BD Seat Size(199.230-199.260)mm"
            [19, 5], // "C=B-A int Allow(0.230-0.260)mm"
            [19, 6], // "Press-On Pressure in Ton(69T-109T)"
            [19, 7], // "BD Thickness"
            [19, 8], // "Brake Disc make & Particulars"
            [20, 0], // "Insp."
            [20, 1], // "X-axis"
            [20, 2], // "Y-axis"
            [21, 0], // "Top"
            [22, 0], // "Middle"
            [23, 0], // "Lower"
            [24, 0], // "Avg."
            [25, 0], // "Brake Disc 'B' Side"
            [26, 0], // "A' Bore Size"
            [26, 3], // "B' BD Seat Size(199.230-199.260)mm"
            [26, 5], // "C=B-A int Allow(0.230-0.260)mm"
            [26, 6], // "Press-On Pressure in Ton(69T-109T)"
            [26, 7], // "BD Thickness"
            [26, 8], // "Brake Disc make & Particulars"
            [27, 0], // "Insp."
            [27, 1], // "X-axis"
            [27, 2], // "Y-axis"
            [28, 0], // "Top"
            [29, 0], // "Middle"
            [30, 0], // "Lower"
            [31, 0], // "Avg."
            [32, 0], // "Machine No."
            [32, 2], // "Operator Name"
            [32, 4], // "Opertaor No."
            [32, 6], // "Inspector Name"
            [32, 8], // "Inspector No."
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
          9: { cellWidth: 40 },
        },
        margin: { top: 10 }, // Adjusted margins
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
    doc.save("LHB Press-On Form.pdf");
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
    link.setAttribute("download", "LHBPressOnForm.csv");
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

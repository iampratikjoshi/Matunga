import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryPressOnICF = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/icf/presson/getalldata");
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
    const worksheet = workbook.addWorksheet("ICFPressOn");

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
   

    // Start row index
    let currentRow = 1;

    data.forEach((formDataProceedSubmitPressOnICF, index) => {
      // Headers for Wheel Details
      worksheet.mergeCells(`A${currentRow}:A${currentRow + 1}`);
      worksheet.getCell(`A${currentRow}`).value = "Wheel No";
      setFaintGreyBackground(worksheet.getCell('A1'));
      setBorderAndBold(worksheet.getCell(`A${currentRow}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`B${currentRow}:C${currentRow + 1}`);
      worksheet.getCell(`B${currentRow}`).value = formDataProceedSubmitPressOnICF.WheelNo;

      worksheet.mergeCells(`D${currentRow}:D${currentRow + 1}`);
      worksheet.getCell(`D${currentRow}`).value = "Wheel Type";
      setFaintGreyBackground(worksheet.getCell(`D${currentRow}`));
      setBorderAndBold(worksheet.getCell(`D${currentRow}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`E${currentRow}:G${currentRow + 1}`);
      worksheet.getCell(`E${currentRow}`).value = formDataProceedSubmitPressOnICF.WheelType;

      worksheet.mergeCells(`H${currentRow}:H${currentRow + 1}`);
      worksheet.getCell(`H${currentRow}`).value = "Axle No";
      setFaintGreyBackground(worksheet.getCell(`H${currentRow}`));
      setBorderAndBold(worksheet.getCell(`H${currentRow}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`I${currentRow}:K${currentRow + 1}`);
      worksheet.getCell(`I${currentRow}`).value = formDataProceedSubmitPressOnICF.AxleNo;



      worksheet.mergeCells(`A${currentRow + 2}:B${currentRow + 3}`);
      worksheet.getCell(`A${currentRow + 2}`).value = "ATL No:";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 2}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 2}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`A${currentRow + 4}:B${currentRow + 7}`);
      worksheet.getCell(`A${currentRow + 4}`).value = formDataProceedSubmitPressOnICF.ATLNo;

      worksheet.mergeCells(`C${currentRow + 2}:E${currentRow + 3}`);
      worksheet.getCell(`D${currentRow + 2}`).value = "Wheel Seat size by operator :";
      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 2}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 2}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`C${currentRow + 4}:C${currentRow + 5}`);
      worksheet.getCell(`C${currentRow + 4}`).value = "A Side";
      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 4}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`C${currentRow + 6}:C${currentRow + 7}`);
      worksheet.getCell(`C${currentRow + 6}`).value = "B Side";
      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 6}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 6}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`D${currentRow + 4}:E${currentRow + 5}`);
      worksheet.getCell(`D${currentRow + 4}`).value = formDataProceedSubmitPressOnICF.AWheelSide;
      worksheet.mergeCells(`D${currentRow + 6}:E${currentRow + 7}`);
      worksheet.getCell(`D${currentRow + 6}`).value = formDataProceedSubmitPressOnICF.BWheelSide;

      worksheet.mergeCells(`F${currentRow + 2}:H${currentRow + 3}`);
      worksheet.getCell(`F${currentRow + 2}`).value = "RA Value(1.6 MAX)";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 2}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 2}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`F${currentRow + 4}:F${currentRow + 5}`);
      worksheet.getCell(`F${currentRow + 4}`).value = "A Side";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 4}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`F${currentRow + 6}:F${currentRow + 7}`);
      worksheet.getCell(`F${currentRow + 6}`).value = "B Side";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 6}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 6}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`G${currentRow + 4}:H${currentRow + 5}`);
      worksheet.getCell(`G${currentRow + 4}`).value = formDataProceedSubmitPressOnICF.ARASide;
      worksheet.mergeCells(`G${currentRow + 6}:H${currentRow + 7}`);
      worksheet.getCell(`G${currentRow + 6}`).value = formDataProceedSubmitPressOnICF.BRASide;


      worksheet.mergeCells(`I${currentRow + 2}:K${currentRow + 3}`);
      worksheet.getCell(`I${currentRow + 2}`).value = "Operator Name:";
      setFaintGreyBackground(worksheet.getCell(`I${currentRow + 2}`));
      setBorderAndBold(worksheet.getCell(`I${currentRow + 2}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`I${currentRow + 4}:K${currentRow + 7}`);
      worksheet.getCell(`I${currentRow + 4}`).value = formDataProceedSubmitPressOnICF.OperatorNamePrimary


      // Add this after the initial wheel details section (after the OperatorNamePrimary cell)
      // and before the "Wheel Disc 'A' Side" section

        // For header "Wheel Activities"
          worksheet.mergeCells(`A${currentRow + 8}:F${currentRow + 8}`);
          worksheet.getCell(`A${currentRow + 8}`).value = "Wheel Activities";
          setFaintGreyBackground(worksheet.getCell(`A${currentRow + 8}`));
          setBorderAndBold(worksheet.getCell(`A${currentRow + 8}`), true);

          // For the value from formDataProceedSubmitPressOnICF
          worksheet.mergeCells(`G${currentRow + 8}:K${currentRow + 8}`);
          worksheet.getCell(`G${currentRow + 8}`).value = formDataProceedSubmitPressOnICF.WheelActivities;

          // Conditional rendering based on Wheel Activities
         if (formDataProceedSubmitPressOnICF.WheelActivities === "RA" || 
            formDataProceedSubmitPressOnICF.WheelActivities === "RD" || 
            formDataProceedSubmitPressOnICF.WheelActivities === "NAND" || 
            formDataProceedSubmitPressOnICF.WheelActivities === "OAOD") {
            
            // Axle Wheel Seat Size
            worksheet.mergeCells(`A${currentRow + 9}:C${currentRow + 9}`);
            worksheet.getCell(`A${currentRow + 9}`).value = "Axle Wheel Seat Size";
            setFaintGreyBackground(worksheet.getCell(`A${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`A${currentRow + 9}`), true);
            
            // Wheel Disc Bore Size
            worksheet.mergeCells(`D${currentRow + 9}:F${currentRow + 9}`);
            worksheet.getCell(`D${currentRow + 9}`).value = "Wheel Disc Bore Size";
            setFaintGreyBackground(worksheet.getCell(`D${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`D${currentRow + 9}`), true);
            
            // Wheel Disc Stamping Particulars
            worksheet.mergeCells(`G${currentRow + 9}:I${currentRow + 9}`);
            worksheet.getCell(`G${currentRow + 9}`).value = "Wheel Disc Stamping Particulars";
            setFaintGreyBackground(worksheet.getCell(`G${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`G${currentRow + 9}`), true);
            
            // Press On No
            worksheet.mergeCells(`J${currentRow + 9}:K${currentRow + 9}`);
            worksheet.getCell(`J${currentRow + 9}`).value = "Press On No";
            setFaintGreyBackground(worksheet.getCell(`J${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`J${currentRow + 9}`), true);


            // Axle Wheel Seat Size value
            worksheet.mergeCells(`A${currentRow + 10}:C${currentRow + 10}`);
            worksheet.getCell(`A${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.AxleWheelSeatSize;

            // Wheel Disc Bore Size value
            worksheet.mergeCells(`D${currentRow + 10}:F${currentRow + 10}`);
            worksheet.getCell(`D${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.WheelDiscBoreSize;

            // Wheel Disc Stamping Particulars value
            worksheet.mergeCells(`G${currentRow + 10}:I${currentRow + 10}`);
            worksheet.getCell(`G${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars;

            // Press On Number value
            worksheet.mergeCells(`J${currentRow + 10}:K${currentRow + 10}`);
            worksheet.getCell(`J${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.PressOnNumber;

              

          } else if (formDataProceedSubmitPressOnICF.WheelActivities === "Shift") {
              
          
            // Inspector Name header
            worksheet.mergeCells(`A${currentRow + 9}:E${currentRow + 9}`);
            worksheet.getCell(`A${currentRow + 9}`).value = "Inspector Name";
            setFaintGreyBackground(worksheet.getCell(`A${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`A${currentRow + 9}`), true);

            // Ticket No header
            worksheet.mergeCells(`F${currentRow + 9}:K${currentRow + 9}`);
            worksheet.getCell(`F${currentRow + 9}`).value = "Ticket No";
            setFaintGreyBackground(worksheet.getCell(`F${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`F${currentRow + 9}`), true);

            // Values row
            // Inspector Name value
            worksheet.mergeCells(`A${currentRow + 10}:E${currentRow + 10}`);
            worksheet.getCell(`A${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.InspectorNameActivities;

            // Ticket No value
            worksheet.mergeCells(`F${currentRow + 10}:K${currentRow + 10}`);
            worksheet.getCell(`F${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.TicketNo;


          } else if (formDataProceedSubmitPressOnICF.WheelActivities === "Machine") {
             
            // Ticket No header
            worksheet.mergeCells(`A${currentRow + 9}:E${currentRow + 9}`);
            worksheet.getCell(`A${currentRow + 9}`).value = "Ticket No";
            setFaintGreyBackground(worksheet.getCell(`A${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`A${currentRow + 9}`), true);

            // Operator No header
            worksheet.mergeCells(`F${currentRow + 9}:K${currentRow + 9}`);
            worksheet.getCell(`F${currentRow + 9}`).value = "Operator No";
            setFaintGreyBackground(worksheet.getCell(`F${currentRow + 9}`));
            setBorderAndBold(worksheet.getCell(`F${currentRow + 9}`), true);

            // Values row
            // Ticket No value
            worksheet.mergeCells(`A${currentRow + 10}:E${currentRow + 10}`);
            worksheet.getCell(`A${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.TicketNo;

            // Operator No value
            worksheet.mergeCells(`F${currentRow + 10}:K${currentRow + 10}`);
            worksheet.getCell(`F${currentRow + 10}`).value = formDataProceedSubmitPressOnICF.OperatorNo;
          }

      // Section for Wheel Disc 'A' Side
      worksheet.addRow([]); // Add an empty row
      worksheet.getRow(currentRow + 11).values = ["Wheel Disc 'A' Side"]; // Set value for row 9
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 11}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 11}`), true); // Pass true for bold if needed

      worksheet.mergeCells(currentRow + 11, 1, currentRow + 12, 11); // Merge cells A9 to K10

      // Set alignment for specific rows
      worksheet.getRow(currentRow + 4).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      worksheet.getRow(currentRow + 5).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      worksheet.getRow(currentRow + 7).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      worksheet.getRow(currentRow + 8).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      worksheet.getRow(currentRow + 12).alignment = {
        horizontal: "center",
        vertical: "middle",
    };
    worksheet.getRow(currentRow + 13).alignment = {
        horizontal: "center",
        vertical: "middle",
    };

      // Make the font bold for row 10
      worksheet.getRow(currentRow + 9).font = { bold: true };

      // Headers row - merged vertically across rows 14 and 15
      // VTL No header
      worksheet.mergeCells(`A${currentRow + 13}:B${currentRow + 14}`);
      worksheet.getCell(`A${currentRow + 13}`).value = "VTL No.";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 13}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 13}`), true);

      // Bore size header
      worksheet.mergeCells(`C${currentRow + 13}:E${currentRow + 14}`);
      worksheet.getCell(`C${currentRow + 13}`).value = "Bore size By Operator :";
      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 13}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 13}`), true);

      // RA Value header
      worksheet.mergeCells(`F${currentRow + 13}:H${currentRow + 14}`);
      worksheet.getCell(`F${currentRow + 13}`).value = "RA Value(1.6 MAX)";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 13}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 13}`), true);

      // Operator Name header
      worksheet.mergeCells(`I${currentRow + 13}:K${currentRow + 14}`);
      worksheet.getCell(`I${currentRow + 13}`).value = "Operator Name";
      setFaintGreyBackground(worksheet.getCell(`I${currentRow + 13}`));
      setBorderAndBold(worksheet.getCell(`I${currentRow + 13}`), true);

      // Values row
      // VTL No value
      worksheet.mergeCells(`A${currentRow + 15}:B${currentRow + 15}`);
      worksheet.getCell(`A${currentRow + 15}`).value = formDataProceedSubmitPressOnICF.VTLNo;

      // Bore size value
      worksheet.mergeCells(`C${currentRow + 15}:E${currentRow + 15}`);
      worksheet.getCell(`C${currentRow + 15}`).value = formDataProceedSubmitPressOnICF.BoreSize;

      // RA Value value
      worksheet.mergeCells(`F${currentRow + 15}:H${currentRow + 15}`);
      worksheet.getCell(`F${currentRow + 15}`).value = formDataProceedSubmitPressOnICF.RAValue;

      // Operator Name value
      worksheet.mergeCells(`I${currentRow + 15}:K${currentRow + 15}`);
      worksheet.getCell(`I${currentRow + 15}`).value = formDataProceedSubmitPressOnICF.OperatorNameA;


      // Merging cells
      // Headers in row 17
      // A' Bore Size header
      worksheet.mergeCells(`A${currentRow + 16}:C${currentRow + 16}`);
      worksheet.getCell(`A${currentRow + 16}`).value = "A' Bore Size";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 16}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 16}`), true);

      // B' Wheel Seat Size header
      worksheet.getCell(`D${currentRow + 16}`).value = "B' Wheel Seat Size (190-195)mm";
      setFaintGreyBackground(worksheet.getCell(`D${currentRow + 16}`));
      setBorderAndBold(worksheet.getCell(`D${currentRow + 16}`), true);

      // C=B-A interference allowance header
      worksheet.getCell(`E${currentRow + 16}`).value = "C=B-A int Allow (0.240-0.300mm)";
      setFaintGreyBackground(worksheet.getCell(`E${currentRow + 16}`));
      setBorderAndBold(worksheet.getCell(`E${currentRow + 16}`), true);

      // Press-On Pressure header
      worksheet.mergeCells(`F${currentRow + 16}:G${currentRow + 16}`);
      worksheet.getCell(`F${currentRow + 16}`).value = "Press-On Pressure (69T-109T)";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 16}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 16}`), true);

      // RD No header
      worksheet.getCell(`H${currentRow + 16}`).value = "RD No.";
      setFaintGreyBackground(worksheet.getCell(`H${currentRow + 16}`));
      setBorderAndBold(worksheet.getCell(`H${currentRow + 16}`), true);

      // Wheel Disc Particulars header
      worksheet.mergeCells(`I${currentRow + 16}:K${currentRow + 16}`);
      worksheet.getCell(`I${currentRow + 16}`).value = "Wheel Disc Particulars";
      setFaintGreyBackground(worksheet.getCell(`I${currentRow + 16}`));
      setBorderAndBold(worksheet.getCell(`I${currentRow + 16}`), true);     



      // Setting values for row 15
      worksheet.getRow(currentRow + 17).values = [
          "Insp.",
          "X-axis",
          "Y-axis",
      ];
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 17}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 17}`), true); // Pass true for bold if needed

      setFaintGreyBackground(worksheet.getCell(`B${currentRow + 17}`));
      setBorderAndBold(worksheet.getCell(`B${currentRow + 17}`), true); // Pass true for bold if needed

      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 17}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 17}`), true); // Pass true for bold if needed

      // Setting values for cells A16 to A19
      // Position labels
      worksheet.getCell(`A${currentRow + 18}`).value = "Top";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 18}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 18}`), true);

      worksheet.getCell(`A${currentRow + 19}`).value = "Middle";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 19}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 19}`), true);

      worksheet.getCell(`A${currentRow + 20}`).value = "Lower";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 20}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 20}`), true);

      worksheet.getCell(`A${currentRow + 21}`).value = "Avg";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 21}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 21}`), true);

      // X Values
      worksheet.getCell(`B${currentRow + 18}`).value = formDataProceedSubmitPressOnICF.TopX;
      worksheet.getCell(`B${currentRow + 19}`).value = formDataProceedSubmitPressOnICF.MiddleX;
      worksheet.getCell(`B${currentRow + 20}`).value = formDataProceedSubmitPressOnICF.LowerX;
      worksheet.getCell(`B${currentRow + 21}`).value = formDataProceedSubmitPressOnICF.AvgX;

      // Y Values
      worksheet.getCell(`C${currentRow + 18}`).value = formDataProceedSubmitPressOnICF.TopY;
      worksheet.getCell(`C${currentRow + 19}`).value = formDataProceedSubmitPressOnICF.MiddleY;
      worksheet.getCell(`C${currentRow + 20}`).value = formDataProceedSubmitPressOnICF.LowerY;
      worksheet.getCell(`C${currentRow + 21}`).value = formDataProceedSubmitPressOnICF.AvgY;

      // B Wheel Seat Size value - merged vertically
      worksheet.mergeCells(`D${currentRow + 17}:D${currentRow + 21}`);
      worksheet.getCell(`D${currentRow + 17}`).value = formDataProceedSubmitPressOnICF.BWheelSeatSize;

      // C-B-A Int Allow value - merged vertically
      worksheet.mergeCells(`E${currentRow + 17}:E${currentRow + 21}`);
      worksheet.getCell(`E${currentRow + 17}`).value = formDataProceedSubmitPressOnICF.CBAIntAllow;

      // Pressure In Ton value - merged vertically
      worksheet.mergeCells(`F${currentRow + 17}:G${currentRow + 21}`);
      worksheet.getCell(`F${currentRow + 17}`).value = formDataProceedSubmitPressOnICF.PressureInTon;

      // RD No value - merged vertically
      worksheet.mergeCells(`H${currentRow + 17}:H${currentRow + 21}`);
      worksheet.getCell(`H${currentRow + 17}`).value = formDataProceedSubmitPressOnICF.RDNo;

      // Wheel Disc Particulars value - merged vertically
      worksheet.mergeCells(`I${currentRow + 17}:K${currentRow + 21}`);
      worksheet.getCell(`I${currentRow + 17}`).value = formDataProceedSubmitPressOnICF.WheelDiscAParticulars;

      // Section for Wheel Disc 'B' Side
      worksheet.addRow([]);
      worksheet.addRow([]);

      // Merging cells for Wheel Disc B Side and setting the value
      worksheet.mergeCells(`A${currentRow + 23}:K${currentRow + 24}`);
      worksheet.getCell(`A${currentRow + 23}`).value = "Wheel Disc 'B' Side";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 23}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 23}`), true); // Pass true for bold if needed
      worksheet.getCell(`A${currentRow + 23}`).font = { bold: true };

      worksheet.mergeCells(`A${currentRow + 25}:B${currentRow + 26}`);
      worksheet.getCell(`A${currentRow + 25}`).value = "VTL No.";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 25}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 25}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`C${currentRow + 25}:E${currentRow + 26}`);
      worksheet.getCell(`C${currentRow + 25}`).value = "Bore size By Operator :";
      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 25}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 25}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`F${currentRow + 25}:H${currentRow + 26}`);
      worksheet.getCell(`F${currentRow + 25}`).value = "RA Value(1.6 MAX)";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 25}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 25}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`I${currentRow + 25}:K${currentRow + 26}`);
      worksheet.getCell(`I${currentRow + 25}`).value = "Operator Name";
      setFaintGreyBackground(worksheet.getCell(`I${currentRow + 25}`));
      setBorderAndBold(worksheet.getCell(`I${currentRow + 25}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`A${currentRow + 27}:B${currentRow + 27}`);
      worksheet.getCell(`A${currentRow + 27}`).value = formDataProceedSubmitPressOnICF.VTLNoB;

      worksheet.mergeCells(`C${currentRow + 27}:E${currentRow + 27}`);
      worksheet.getCell(`C${currentRow + 27}`).value = formDataProceedSubmitPressOnICF.BoreSizeB;

      worksheet.mergeCells(`F${currentRow + 27}:H${currentRow + 27}`);
      worksheet.getCell(`F${currentRow + 27}`).value = formDataProceedSubmitPressOnICF.RAValueB;

      worksheet.mergeCells(`I${currentRow + 27}:K${currentRow + 27}`);
      worksheet.getCell(`I${currentRow + 27}`).value = formDataProceedSubmitPressOnICF.OperatorNameB;

      worksheet.getRow(currentRow + 29).values = [
          "Insp.",
          "X-axis",
          "Y-axis",
      ];
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 29}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 29}`), true); // Pass true for bold if needed

      setFaintGreyBackground(worksheet.getCell(`B${currentRow + 29}`));
      setBorderAndBold(worksheet.getCell(`B${currentRow + 29}`), true); // Pass true for bold if needed

      setFaintGreyBackground(worksheet.getCell(`C${currentRow + 29}`));
      setBorderAndBold(worksheet.getCell(`C${currentRow + 29}`), true); // Pass true for bold if needed


      worksheet.getCell(`A${currentRow + 30}`).value = "Top";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 30}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 30}`), true); // Pass true for bold if needed

      worksheet.getCell(`A${currentRow + 31}`).value = "Middle";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 31}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 31}`), true); // Pass true for bold if needed

      worksheet.getCell(`A${currentRow + 32}`).value = "Lower";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 32}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 32}`), true); // Pass true for bold if needed

      worksheet.getCell(`A${currentRow + 33}`).value = "Avg";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 33}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 33}`), true); // Pass true for bold if needed


      worksheet.getCell(`B${currentRow + 30}`).value = formDataProceedSubmitPressOnICF.BTopX;
      worksheet.getCell(`C${currentRow + 30}`).value = formDataProceedSubmitPressOnICF.BTopY;
      worksheet.getCell(`B${currentRow + 31}`).value = formDataProceedSubmitPressOnICF.BMiddleX;
      worksheet.getCell(`C${currentRow + 31}`).value = formDataProceedSubmitPressOnICF.BMiddleY;
      worksheet.getCell(`B${currentRow + 32}`).value = formDataProceedSubmitPressOnICF.BLowerX;
      worksheet.getCell(`C${currentRow + 32}`).value = formDataProceedSubmitPressOnICF.BLowerY;
      worksheet.getCell(`B${currentRow + 33}`).value = formDataProceedSubmitPressOnICF.BAvgX;
      worksheet.getCell(`C${currentRow + 33}`).value = formDataProceedSubmitPressOnICF.BAvgY;

      worksheet.mergeCells(`A${currentRow + 28}:C${currentRow + 28}`);
      worksheet.getCell(`A${currentRow + 28}`).value = "A' Bore Size";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 28}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 28}`), true); // Pass true for bold if needed

      // worksheet.mergeCells(`D${currentRow + 28}:D${currentRow + 28}`);
      worksheet.getCell(`D${currentRow + 28}`).value = "B' Wheel Seat Size (190-195)mm";
      setFaintGreyBackground(worksheet.getCell(`D${currentRow + 28}`));
      setBorderAndBold(worksheet.getCell(`D${currentRow + 28}`), true); // Pass true for bold if needed

      // worksheet.mergeCells(`E${currentRow + 28}:E${currentRow + 28}`);
      worksheet.getCell(`E${currentRow + 28}`).value = "C=B-A int Allow (0.200-0.300mm)";
      setFaintGreyBackground(worksheet.getCell(`E${currentRow + 28}`));
      setBorderAndBold(worksheet.getCell(`E${currentRow + 28}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`F${currentRow + 28}:G${currentRow + 28}`);
      worksheet.getCell(`F${currentRow + 28}`).value = "Press-On Pressure (69T-109T)";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow + 28}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow + 28}`), true); // Pass true for bold if needed

      worksheet.getCell(`H${currentRow + 28}`).value = "RD No.";
      setFaintGreyBackground(worksheet.getCell(`H${currentRow + 28}`));
      setBorderAndBold(worksheet.getCell(`H${currentRow + 28}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`I${currentRow + 28}:K${currentRow + 28}`);
      worksheet.getCell(`I${currentRow + 28}`).value = "Wheel Disc Particulars";
      setFaintGreyBackground(worksheet.getCell(`I${currentRow + 28}`));
      setBorderAndBold(worksheet.getCell(`I${currentRow + 28}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`D${currentRow + 29}:D${currentRow + 33}`);
      worksheet.getCell(`D${currentRow + 29}`).value = formDataProceedSubmitPressOnICF.BWheelSeatSizeB;
      worksheet.mergeCells(`E${currentRow + 29}:E${currentRow + 33}`);
      worksheet.getCell(`E${currentRow + 29}`).value = formDataProceedSubmitPressOnICF.CBAIntAllowB;
      worksheet.mergeCells(`F${currentRow + 29}:G${currentRow + 33}`);
      worksheet.getCell(`F${currentRow + 29}`).value = formDataProceedSubmitPressOnICF.PressureInTonB;
      worksheet.mergeCells(`H${currentRow + 29}:H${currentRow + 33}`);
      worksheet.getCell(`H${currentRow + 29}`).value = formDataProceedSubmitPressOnICF.RDNoB;
      worksheet.mergeCells(`I${currentRow + 29}:K${currentRow + 33}`);
      worksheet.getCell(`I${currentRow + 29}`).value = formDataProceedSubmitPressOnICF.WheelDiscAParticularsB;

      worksheet.getRow(currentRow + 36).values = [
        "M/C No.",
        formDataProceedSubmitPressOnICF.MCNo,
        "Operator Name",
        formDataProceedSubmitPressOnICF.OperatorNameFinal,
        "Inspector Name",
        formDataProceedSubmitPressOnICF.InspectorNameFinal,
      ];

      const startColumn = 1;

// Apply formatting to each cell in the row
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

const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

          const loginInfo = localStorage.getItem('loggedInUser')
            ? `${localStorage.getItem('loggedInUser')}`
            : 'Unknown';
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

      worksheet.getRow(currentRow + 39).values = [
        "Workshop Name",
        workshopName,
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,
      ];

      for (let i = 0; i < 6; i++) {
          const cell = worksheet.getCell(currentRow + 39, startColumn + i);
          
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
      currentRow += 43;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "ICFPressOn.xlsx");
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

    const handleNullValue = (value) =>
      value === null || value === undefined ? "" : value;


    data.forEach((formDataProceedSubmitPressOnICF, index) => {
      // Table headers
      const tableColumn = [];
      const body = [];
    // Define the headers and subheaders similar to your table
    const wheelInfoHeaders = [
      [
        { content: 'Press On of ICF Wheel', colSpan: 11, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: 'Wheel No.', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.WheelNo), colSpan: 2, },
        { content: 'Wheel type:', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.WheelType), colSpan: 3 },
        { content: 'Axle No.', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.AxleNo), colSpan: 3 }
      ],
      [
        { content: 'ATL No:', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Wheel Seat size by operator:', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'RA Value(1.6 MAX)', colSpan: 4, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Operator Name:', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: handleNullValue(formDataProceedSubmitPressOnICF.ATLNo), colSpan: 2, rowSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255] } },
        { content: 'A Side:', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.AWheelSide), colSpan: 1 },
        { content: 'A Side', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.ARASide), colSpan: 3 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.OperatorNamePrimary), colSpan: 3, rowSpan: 2 }
      ],
      [
        { content: 'B Side:', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BWheelSide), colSpan: 1 },
        { content: 'B Side:', colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BRASide), colSpan: 3 }
      ],
      [
        { content: "Wheel Activities", colSpan: 6, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.WheelActivities), colSpan: 5 },
      ],
      // Conditional rendering based on WheelActivities value
      ...(formDataProceedSubmitPressOnICF.WheelActivities === "RA" || 
          formDataProceedSubmitPressOnICF.WheelActivities === "RD" || 
          formDataProceedSubmitPressOnICF.WheelActivities === "NAND" || 
          formDataProceedSubmitPressOnICF.WheelActivities === "OAOD" ? [
        [
          { content: "Axle Wheel Seat Size", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: "Wheel Disc Bore Size", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: "Wheel Disc Stamping Particulars", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: "Press On No", colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } }
        ],
        [
          { content: handleNullValue(formDataProceedSubmitPressOnICF.AxleWheelSeatSize), colSpan: 3 },
          { content: handleNullValue(formDataProceedSubmitPressOnICF.WheelDiscBoreSize), colSpan: 3 },
          { content: handleNullValue(formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars), colSpan: 3 },
          { content: handleNullValue(formDataProceedSubmitPressOnICF.PressOnNumber), colSpan: 2 }
        ]
      ] : formDataProceedSubmitPressOnICF.WheelActivities === "Shift" ? [
        [
          { content: "Inspector Name", colSpan: 5, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: "Ticket No", colSpan: 6, styles: { halign: 'center', fillColor: [240, 240, 240] } }
        ],
        [
          { content: handleNullValue(formDataProceedSubmitPressOnICF.InspectorNameActivities), colSpan: 5 },
          { content: handleNullValue(formDataProceedSubmitPressOnICF.TicketNo), colSpan: 6 }
        ]
      ] : formDataProceedSubmitPressOnICF.WheelActivities === "Machine" ? [
        [
          { content: "Ticket No", colSpan: 5, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: "Operator No", colSpan: 6, styles: { halign: 'center', fillColor: [240, 240, 240] } }
        ],
        [
          { content: handleNullValue(formDataProceedSubmitPressOnICF.TicketNo), colSpan: 5 },
          { content: handleNullValue(formDataProceedSubmitPressOnICF.OperatorNo), colSpan: 6 }
        ]
      ] : []),
      [
        { content: "Wheel disc 'A' side", colSpan: 11, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: 'VTL No:', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Bore size By Operator:', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'RA Value(1.6 MAX)', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Operator Name:', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: handleNullValue(formDataProceedSubmitPressOnICF.VTLNo), colSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BoreSize), colSpan: 3, styles: { halign: 'center', fillColor: [255, 255, 255] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.RAValue), colSpan: 3 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.OperatorNameA), colSpan: 3 }
      ],
      [
        { content: "A' Bore Size:", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "B' Wheel Seat Size (190-195)mm", styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "C=B-A Int. Allow(0.240-0.260)mm", styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "Press-On-Pressure In Ton(77T-108T)", colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "RD No.", styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "Wheel Disc Particulars", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: 'Insp.', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'X-axis', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Y-axis', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BWheelSeatSize), rowSpan: 5 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.CBAIntAllow), rowSpan: 5 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.PressureInTon), colSpan: 2, rowSpan: 5 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.RDNo), rowSpan: 5 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.WheelDiscAParticulars), colSpan: 3, rowSpan: 5 }
      ],
      [
        { content: 'Top', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.TopX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.TopY) }
      ],
      [
        { content: 'Middle', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.MiddleX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.MiddleY) }
      ],
      [
        { content: 'Lower', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.LowerX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.LowerY) }
      ],
      [
        { content: 'Avg', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.AvgX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.AvgY), styles: { halign: 'center', fillColor: [255, 255, 255] } }
      ],
    ];

    doc.autoTable({
      head: wheelInfoHeaders,
      theme: 'grid',
      startX: 10,
      startY: 10,
      tableWidth: "auto",

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
      margin: { top: 20 },

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
          [3, 2],
          [3, 4],
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
          [8, 0],
          [9, 0],
          // [10, 0],
          // [11, 0],
          [11, 5],
          [11, 7],
          [12, 0],
          [13, 0],
          [13, 5],
          [13, 7],
          [14, 0],
          [14, 3],
          [14, 5],
          [14, 6],
          [14, 7],
          [14, 8],
          [15, 0],
          // [15, 1],
          // [15, 2],
          [16, 0],
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


    const wheelDiscBHeaders = [
      [
        { content: "Wheel disc 'B' side", colSpan: 11, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: 'VTL No:', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Bore size By Operator:', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'RA Value(1.6 MAX)', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Operator Name:', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: handleNullValue(formDataProceedSubmitPressOnICF.VTLNoB), colSpan: 2, styles: { halign: 'center', fillColor: [255, 255, 255] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BoreSizeB), colSpan: 3 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.RAValueB), colSpan: 3 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.OperatorNameB), colSpan: 3 }
      ],
      [
        { content: "A' Bore Size:", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "B' Wheel Seat Size (190-195)mm", styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "C=B-A Int. Allow(0.240-0.260)mm", styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "Press-On-Pressure In Ton(77T-108T)", colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "RD No.", styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: "Wheel Disc Particulars", colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } }
      ],
      [
        { content: 'Insp.', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'X-axis', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: 'Y-axis', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BWheelSeatSizeB), rowSpan: 6 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.CBAIntAllowB), rowSpan: 6 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.PressureInTonB), colSpan: 2, rowSpan: 6 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.RDNoB), rowSpan: 6 },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.WheelDiscAParticularsB), colSpan: 3, rowSpan: 6 }
      ],
      [
        { content: 'Top', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BTopX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BTopY), styles: { halign: 'center', fillColor: [255, 255, 255] } }
      ],
      [
        { content: 'Middle', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BMiddleX), styles: { halign: 'center', fillColor: [255, 255, 255] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BMiddleY), styles: { halign: 'center', fillColor: [255, 255, 255] } }
      ],
      [
        { content: 'Lower', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BLowerX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BLowerY), styles: { halign: 'center', fillColor: [255, 255, 255] } }
      ],
      [
        { content: 'Avg', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BAvgX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BAvgY) }
      ],
      [
        { content: 'Avg', styles: { halign: 'center', fillColor: [240, 240, 240] } },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BAvgX) },
        { content: handleNullValue(formDataProceedSubmitPressOnICF.BAvgY) }
      ],
      [
        { content: "M/C No.", rowSpan: 1, colSpan: 1 },
        {
          content: handleNullValue(formDataProceedSubmitPressOnICF.MCNo),
          rowSpan: 1,
          colSpan: 2,

        },
        { content: "Operator Name", rowSpan: 1, colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        {
          content: handleNullValue(formDataProceedSubmitPressOnICF.OperatorNameFinal),
          rowSpan: 1,
          colSpan: 4,

        },
        { content: "Inspector Name", rowSpan: 1, colSpan: 1, styles: { halign: 'center', fillColor: [240, 240, 240] } },
        {
          content: handleNullValue(formDataProceedSubmitPressOnICF.InspectorNameFinal),
          rowSpan: 1,
          colSpan: 2,
        },
      ]
    ];




    // Add Wheel Disc B table
    doc.autoTable({
      head: wheelDiscBHeaders,
      theme: 'grid',


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
      startY: doc.lastAutoTable.finalY + 10,

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
          // [2, 0],
          [2, 6],
          [3, 0],
          [3, 2],
          [3, 4],
          [3, 6],
          [3, 8],
          [4, 0],
          [5, 0],
          // [5, 2],
          [5, 5],
          [5, 7],
          [6, 0],
          [6, 3],
          [6, 5],
          [6, 6],
          [6, 7],
          [6, 8],
          [7, 0],
          // [7, 1],
          // [7, 2],
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

    


    // Save the PDF
    doc.save("ICFPressOnForm.pdf");
  };

  

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Wheel No.",
      "Wheel type:",
      "Axle No.",
      "ATL No:",
      "Operator Name",
      "A Side",
      "B Side",
      "A Side",
      "B Side",
      "WheelActivities",
      "AxleWheelSeatSize",
      "WheelDiscBoreSize",
      "wheelDiscStampingParticulars",
      "PressOnNumber",
      "InspectorNameActivities",
      "TicketNo",
      "OperatorNo",
      "VTL No",
      "Bore size By Operator",
      "RA Value(1.6 MAX)",
      "Operator Name",
      "B' Wheel Seat Size (190-195)mm",
      "C = B - A Int. Allow (0.200-0.260)mm",
      "Press-On-Pressure In Ton (77T-108T)",
      "RD No.",
      "Wheel Disc Particulars",
      "Top-X",
      "Top-Y",
      "Middle-X",
      "Middle-Y",
      "Lower-X",
      "Lower-Y",
      "Avg-X",
      "Avg-Y",
      "VTL No",
      "Bore size By Operator",
      "RA Value(1.6 MAX)",
      "Operator Name",
      "B' Wheel Seat Size (190-195)mm",
      "C = B - A Int. Allow (0.200-0.260)mm",
      "Press-On-Pressure In Ton (77T-108T)",
      "RD No.",
      "Wheel Disc Particulars",
      "Top-X",
      "Top-Y",
      "Middle-X",
      "Middle-Y",
      "Lower-X",
      "Lower-Y",
      "Avg-X",
      "Avg-Y",
      "M/C No",
      "Operator",
      "Inspector"
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.WheelNo,
      entry.WheelType,
      entry.AxleNo,
      entry.ATLNo,
      entry.OperatorNamePrimary,
      entry.AWheelSide,
      entry.BWheelSide,
      entry.ARASide,
      entry.BRASide,
      entry.WheelActivities,
      entry.AxleWheelSeatSize,
      entry.WheelDiscBoreSize,
      entry.wheelDiscStampingParticulars,
      entry.PressOnNumber,
      entry.InspectorNameActivities,
      entry.TicketNo,
      entry.OperatorNo,
      entry.VTLNo,
      entry.BoreSize,
      entry.RAValue,
      entry.OperatorNameA,
      entry.BWheelSeatSize,
      entry.CBAIntAllow,
      entry.PressureInTon,
      entry.RDNo,
      entry.WheelDiscAParticulars,
      entry.TopX,
      entry.TopY,
      entry.MiddleX,
      entry.MiddleY,
      entry.LowerX,
      entry.LowerY,
      entry.AvgX,
      entry.AvgY,
      entry.VTLNoB,
      entry.BoreSizeB,
      entry.RAValueB,
      entry.OperatorNameB,
      entry.BWheelSeatSizeB,
      entry.CBAIntAllowB,
      entry.PressureInTonB,
      entry.RDNoB,
      entry.WheelDiscAParticularsB,
      entry.BTopX,
      entry.BTopY,
      entry.BMiddleX,
      entry.BMiddleY,
      entry.BLowerX,
      entry.BLowerY,
      entry.BAvgX,
      entry.BAvgY,
      entry.MCNo,
      entry.OperatorNameFinal,
      entry.InspectorNameFinal,
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
    link.setAttribute("download", "EMUPressOn.csv");
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
      <div id="table-container">
        {data.map((formDataProceedSubmitPressOnICF) => (
          <table key={formDataProceedSubmitPressOnICF.id}>
            <thead className="thead">
              <tr>
                <th colSpan={1}>Wheel No.</th>
                <td colSpan={2}>{formDataProceedSubmitPressOnICF.WheelNo}</td>
                <th colSpan={1}>Wheel type:</th>
                <td colSpan={3}>{formDataProceedSubmitPressOnICF.WheelType}</td>
                <th colSpan={1}>Axle No.</th>
                <td colSpan={3}>{formDataProceedSubmitPressOnICF.AxleNo}</td>
              </tr>
            </thead>
            
            <tbody>
              {/* ATL Section */}
              <tr>
                <th colSpan={2}>ATL No:</th>
                <th colSpan={3}>Wheel Seat size by operator :</th>
                <th colSpan={3}>RA Value(1.6 MAX)</th>
                <th colSpan={3}>Operator Name:</th>
              </tr>
              <tr>
                <td colSpan={2} rowSpan={2}>{formDataProceedSubmitPressOnICF.ATLNo}</td>
                <th colSpan={1}>A Side:</th>
                <td colSpan={2}>{formDataProceedSubmitPressOnICF.AWheelSide}</td>
                <th colSpan={1}>A Side</th>
                <td colSpan={2}>{formDataProceedSubmitPressOnICF.ARASide}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.OperatorNamePrimary}</td>
              </tr>
              <tr>
                <th colSpan={1}>B Side:</th>
                <td colSpan={2}>{formDataProceedSubmitPressOnICF.BWheelSide}</td>
                <th colSpan={1}>B Side:</th>
                <td colSpan={2}>{formDataProceedSubmitPressOnICF.BRASide}</td>
              </tr>
              <tr></tr>
              <tr>
              <th colSpan={6}>Wheel Activities</th>
              <td colSpan={5}>{formDataProceedSubmitPressOnICF.WheelActivities}</td>
            </tr>
            {/* <tr>
              //Wheel Activities form Logic in such way that i should get selected fields here with headers in single line (create heading tags for that) and below their data (call each of their data in thier respective fields)
            </tr> */}
            <tr>
              {/* Conditional rendering based on selected Wheel Activities */}
              {formDataProceedSubmitPressOnICF.WheelActivities === "RA" && (
                <>
                  <th colSpan={3}>Axle Wheel Seat Size</th>
                  <th colSpan={3}>Wheel Disc Bore Size</th>
                  <th colSpan={3}>Wheel Disc Stamping Particulars</th>
                  <th colSpan={2}>Press On No</th>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "RD" && (
                <>
                  <th colSpan={3}>Axle Wheel Seat Size</th>
                  <th colSpan={3}>Wheel Disc Bore Size</th>
                  <th colSpan={3}>Wheel Disc Stamping Particulars</th>
                  <th colSpan={2}>Press On No</th>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "NAND" && (
                <>
                  <th colSpan={3}>Axle Wheel Seat Size</th>
                  <th colSpan={3}>Wheel Disc Bore Size</th>
                  <th colSpan={3}>Wheel Disc Stamping Particulars</th>
                  <th colSpan={2}>Press On No</th>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "OAOD" && (
                <>
                  <th colSpan={3}>Axle Wheel Seat Size</th>
                  <th colSpan={3}>Wheel Disc Bore Size</th>
                  <th colSpan={3}>Wheel Disc Stamping Particulars</th>
                  <th colSpan={2}>Press On No</th>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "Shift" && (
                <>
                  <th colSpan={5}>Inspector Name</th>
                  <th colSpan={6}>Ticket No</th>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "Machine" && (
                <>
                  <th colSpan={5}>Ticket No</th>
                  <th colSpan={6}>Operator No</th>
                </>
              )}
            </tr>
            <tr>
              {/* Corresponding data rendering */}
              {formDataProceedSubmitPressOnICF.WheelActivities === "RA" && (
                <>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.AxleWheelSeatSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.WheelDiscBoreSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars}</td>
                  <td colSpan={2}>{formDataProceedSubmitPressOnICF.PressOnNumber}</td>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "RD" && (
                <>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.AxleWheelSeatSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.WheelDiscBoreSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars}</td>
                  <td colSpan={2}>{formDataProceedSubmitPressOnICF.PressOnNumber}</td>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "NAND" && (
                <>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.AxleWheelSeatSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.WheelDiscBoreSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars}</td>
                  <td colSpan={2}>{formDataProceedSubmitPressOnICF.PressOnNumber}</td>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "OAOD" && (
                <>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.AxleWheelSeatSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.WheelDiscBoreSize}</td>
                  <td colSpan={3}>{formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars}</td>
                  <td colSpan={2}>{formDataProceedSubmitPressOnICF.PressOnNumber}</td>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "Shift" && (
                <>
                  <td colSpan={5}>{formDataProceedSubmitPressOnICF.InspectorNameActivities}</td>
                  <td colSpan={6}>{formDataProceedSubmitPressOnICF.TicketNo}</td>
                </>
              )}
              {formDataProceedSubmitPressOnICF.WheelActivities === "Machine" && (
                <>
                  <td colSpan={5}>{formDataProceedSubmitPressOnICF.TicketNo}</td>
                  <td colSpan={6}>{formDataProceedSubmitPressOnICF.OperatorNo}</td>
                </>
              )}
            </tr>
              {/* Wheel disc A side section */}
              <tr>
                <th colSpan={11}>Wheel disc 'A' side</th>
              </tr>
              <tr>
                <th colSpan={2}>VTL No:</th>
                <th colSpan={3}>Bore size By Operator :</th>
                <th colSpan={3}>RA Value(1.6 MAX)</th>
                <th colSpan={3}>Operator Name:</th>
              </tr>
              <tr></tr>
              <tr>
                <td colSpan={2} rowSpan={2}>{formDataProceedSubmitPressOnICF.VTLNo}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.BoreSize}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.RAValue}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.OperatorNameA}</td>
              </tr>
              <tr></tr>
              <tr></tr>

              {/* A side measurements section */}
              <tr>
                <th colSpan={3} rowSpan={3}>A' Bore Size:</th>
                <th colSpan={1} rowSpan={3}>B' Wheel Seat Size (190-195)mm</th>
                <th colSpan={1} rowSpan={3}>C=B-A Int. Allow(0.200-0.260)mm</th>
                <th colSpan={2} rowSpan={3}>Press-On-Pressure In Ton(77T-108T)</th>
                <th colSpan={1} rowSpan={3}>RD No.</th>
                <th colSpan={3} rowSpan={3}>Wheel Disc Particulars</th>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <th colSpan={1}>Insp.</th>
                <th colSpan={1}>X-axis</th>
                <th colSpan={1}>Y-axis</th>
                <td colSpan={1} rowSpan={5}>{formDataProceedSubmitPressOnICF.BWheelSeatSize}</td>
                <td colSpan={1} rowSpan={5}>{formDataProceedSubmitPressOnICF.CBAIntAllow}</td>
                <td colSpan={2} rowSpan={5}>{formDataProceedSubmitPressOnICF.PressureInTon}</td>
                <td colSpan={1} rowSpan={5}>{formDataProceedSubmitPressOnICF.RDNo}</td>
                <td colSpan={3} rowSpan={5}>{formDataProceedSubmitPressOnICF.WheelDiscAParticulars}</td>
              </tr>
              <tr>
                <th colSpan={1}>Top</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.TopX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.TopY}</td>
              </tr>
              <tr>
                <th colSpan={1}>Middle</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.MiddleX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.MiddleY}</td>
              </tr>
              <tr>
                <th colSpan={1}>Lower</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.LowerX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.LowerY}</td>
              </tr>
              <tr>
                <th colSpan={1}>Avg</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.AvgX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.AvgY}</td>
              </tr>
              <tr></tr>

              {/* Wheel disc B side section */}
              <tr>
                <th colSpan={11}>Wheel disc 'B' side</th>
              </tr>
              <tr>
                <th colSpan={2}>VTL No:</th>
                <th colSpan={3}>Bore size By Operator :</th>
                <th colSpan={3}>RA Value(1.6 MAX)</th>
                <th colSpan={3}>Operator Name:</th>
              </tr>
              <tr></tr>
              
              <tr>
                <td colSpan={2} rowSpan={2}>{formDataProceedSubmitPressOnICF.VTLNoB}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.BoreSizeB}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.RAValueB}</td>
                <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.OperatorNameB}</td>
              </tr>
              <tr></tr>
              <tr></tr>
              {/* B side measurements section */}
              <tr>
                <th colSpan={3} rowSpan={3}>A' Bore Size:</th>
                <th colSpan={1} rowSpan={3}>B' Wheel Seat Size (190-195)mm</th>
                <th colSpan={1} rowSpan={3}>C=B-A Int. Allow(0.200-0.260)mm</th>
                <th colSpan={2} rowSpan={3}>Press-On-Pressure In Ton(77T-108T)</th>
                <th colSpan={1} rowSpan={3}>RD No.</th>
                <th colSpan={3} rowSpan={3}>Wheel Disc Particulars</th>
              </tr>
              <tr></tr>
              <tr></tr>
              <tr>
                <th colSpan={1}>Insp.</th>
                <th colSpan={1}>X-axis</th>
                <th colSpan={1}>Y-axis</th>
                <td colSpan={1} rowSpan={5}>{formDataProceedSubmitPressOnICF.BWheelSeatSizeB}</td>
                <td colSpan={1} rowSpan={5}>{formDataProceedSubmitPressOnICF.CBAIntAllowB}</td>
                <td colSpan={2} rowSpan={5}>{formDataProceedSubmitPressOnICF.PressureInTonB}</td>
                <td colSpan={1} rowSpan={5}>{formDataProceedSubmitPressOnICF.RDNoB}</td>
                <td colSpan={3} rowSpan={5}>{formDataProceedSubmitPressOnICF.WheelDiscAParticularsB}</td>
              </tr>
              <tr>
                <th colSpan={1}>Top</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BTopX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BTopY}</td>
              </tr>
              <tr>
                <th colSpan={1}>Middle</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BMiddleX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BMiddleY}</td>
              </tr>
              <tr>
                <th colSpan={1}>Lower</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BLowerX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BLowerY}</td>
              </tr>
              <tr>
                <th colSpan={1}>Avg</th>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BAvgX}</td>
                <td colSpan={1}>{formDataProceedSubmitPressOnICF.BAvgY}</td>
              </tr>
              <tr></tr>
              <br />
              <br />
            <div className="footerProceedSubmit">
              <div>
                <b> M/C No.: </b>
                {formDataProceedSubmitPressOnICF.MCNo}
              </div>

              <div>
                <b> Operator: </b>
                {formDataProceedSubmitPressOnICF.OperatorNameFinal}
              </div>
              <div>
                <b> Inspector: </b>
                {formDataProceedSubmitPressOnICF.InspectorNameFinal}
              </div>
            </div>
            </tbody>
            <br /><br />
          </table>
        ))}
      </div>
    </div>
  );
};

export default AllEntryPressOnICF;

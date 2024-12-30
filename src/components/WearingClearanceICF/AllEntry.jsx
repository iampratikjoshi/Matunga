import React, { useEffect, useState } from "react";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const AllEntryWearingClearanceICF  = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/wearingclricf/getalldata");
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
    const worksheet = workbook.addWorksheet("WearingClearanceICF");

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

    data.forEach((formDataProceedSubmitICFWearingClearance , index) => {
      // Headers for Wheel Details
      worksheet.mergeCells(`A${currentRow}:A${currentRow + 2}`);
      worksheet.getCell(`A${currentRow}`).value = "Index No.";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow}`), true);
  
      // Wheel No | Type | Diameter
      worksheet.mergeCells(`B${currentRow}:C${currentRow + 2}`);
      worksheet.getCell(`B${currentRow}`).value = "Wheel No | Type | Diameter";
      setFaintGreyBackground(worksheet.getCell(`B${currentRow}`));
      setBorderAndBold(worksheet.getCell(`B${currentRow}`), true);
  
      // Axle No | Year
      worksheet.mergeCells(`D${currentRow}:E${currentRow + 2}`);
      worksheet.getCell(`D${currentRow}`).value = "Axle No | Year";
      setFaintGreyBackground(worksheet.getCell(`D${currentRow}`));
      setBorderAndBold(worksheet.getCell(`D${currentRow}`), true);

      worksheet.mergeCells(`F${currentRow}:G${currentRow + 2}`);
      worksheet.getCell(`F${currentRow}`).value = "Bearing Code No | Year";
      setFaintGreyBackground(worksheet.getCell(`F${currentRow}`));
      setBorderAndBold(worksheet.getCell(`F${currentRow}`), true);

      worksheet.mergeCells(`H${currentRow}:I${currentRow + 2}`);
      worksheet.getCell(`H${currentRow}`).value = "Matunga V. No.";
      setFaintGreyBackground(worksheet.getCell(`H${currentRow}`));
      setBorderAndBold(worksheet.getCell(`H${currentRow}`), true);

      worksheet.mergeCells(`J${currentRow}:J${currentRow + 2}`);
      worksheet.getCell(`J${currentRow}`).value = "V | Make";
      setFaintGreyBackground(worksheet.getCell(`J${currentRow}`));
      setBorderAndBold(worksheet.getCell(`J${currentRow}`), true);     

      worksheet.mergeCells(`K${currentRow}:L${currentRow + 1}`);
      worksheet.getCell(`K${currentRow}`).value = "Clearance";
      worksheet.getCell(`K${currentRow + 2}`).value = "D.MA.";
      worksheet.getCell(`L${currentRow + 2}`).value = "MA.";
      setFaintGreyBackground(worksheet.getCell(`K${currentRow}`));
      setBorderAndBold(worksheet.getCell(`K${currentRow}`), true);
      setFaintGreyBackground(worksheet.getCell(`K${currentRow+2}`));
      setBorderAndBold(worksheet.getCell(`K${currentRow+2}`), true);
      setFaintGreyBackground(worksheet.getCell(`L${currentRow+2}`));
      setBorderAndBold(worksheet.getCell(`L${currentRow+2}`), true);

      worksheet.mergeCells(`M${currentRow}:N${currentRow + 2}`);
      worksheet.getCell(`M${currentRow}`).value = "Initial Fitting Month";
      setFaintGreyBackground(worksheet.getCell(`M${currentRow}`));
      setBorderAndBold(worksheet.getCell(`M${currentRow}`), true);

      worksheet.mergeCells(`O${currentRow}:P${currentRow + 2}`);
      worksheet.getCell(`O${currentRow}`).value = "Bearing Service Month";
      setFaintGreyBackground(worksheet.getCell(`O${currentRow}`));
      setBorderAndBold(worksheet.getCell(`O${currentRow}`), true);

      worksheet.mergeCells(`Q${currentRow}:R${currentRow + 2}`);
      worksheet.getCell(`Q${currentRow}`).value = "Tag Status";
      setFaintGreyBackground(worksheet.getCell(`Q${currentRow}`));
      setBorderAndBold(worksheet.getCell(`Q${currentRow}`), true);

      worksheet.mergeCells(`S${currentRow}:T${currentRow + 2}`);
      worksheet.getCell(`S${currentRow}`).value = "Front Cover";
      setFaintGreyBackground(worksheet.getCell(`S${currentRow}`));
      setBorderAndBold(worksheet.getCell(`S${currentRow}`), true);

      worksheet.mergeCells(`U${currentRow}:V${currentRow + 2}`);
      worksheet.getCell(`U${currentRow}`).value = "Staff T. No.";
      setFaintGreyBackground(worksheet.getCell(`U${currentRow}`));
      setBorderAndBold(worksheet.getCell(`U${currentRow}`), true);

      // Set alignment for specific rows
      worksheet.getRow(currentRow + 2).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      worksheet.getRow(currentRow + 4).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      worksheet.getRow(currentRow + 7).alignment = {
          horizontal: "center",
          vertical: "middle",
      };
      // worksheet.getRow(currentRow + 12).alignment = {
      //     horizontal: "center",
      //     vertical: "middle",
      // };

      // Make the font bold for row 10
      worksheet.getRow(currentRow + 3).font = { bold: true };

      worksheet.mergeCells(`A${currentRow + 3}:A${currentRow + 4}`);
      worksheet.getCell(`A${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .IndxNo;
      setBorderAndBold(worksheet.getCell(`A${currentRow + 3}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`B${currentRow + 3}:C${currentRow + 3}`);
      worksheet.getCell(`B${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .WheelNo;
      setBorderAndBold(worksheet.getCell(`B${currentRow + 3}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`D${currentRow + 3}:E${currentRow + 3}`);
      worksheet.getCell(`D${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .AxleNo;
      setBorderAndBold(worksheet.getCell(`D${currentRow + 3}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`F${currentRow + 3}:G${currentRow + 3}`);
      worksheet.getCell(`F${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .WearingCodeNo;
      setBorderAndBold(worksheet.getCell(`F${currentRow + 3}`), true); // Pass true for bold if needed


      worksheet.mergeCells(`H${currentRow + 3}:I${currentRow + 3}`);
      worksheet.getCell(`H${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .MatungaWNo;
      setBorderAndBold(worksheet.getCell(`H${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`J${currentRow + 3}:J${currentRow + 3}`);
      worksheet.getCell(`J${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .V;
      setBorderAndBold(worksheet.getCell(`J${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`K${currentRow + 3}:K${currentRow + 3}`);
      worksheet.getCell(`K${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .DMA;
      setBorderAndBold(worksheet.getCell(`K${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`L${currentRow + 3}:L${currentRow + 3}`);
      worksheet.getCell(`L${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .MA;
      setBorderAndBold(worksheet.getCell(`L${currentRow + 3}`), true); // Pass true for bold if needed


      // Merging cells
      worksheet.mergeCells(`M${currentRow + 3}:N${currentRow + 3}`);
      worksheet.getCell(`M${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .InitialFittings;
      setBorderAndBold(worksheet.getCell(`M${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`O${currentRow + 3}:P${currentRow + 3}`);
      worksheet.getCell(`O${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .WearingService;
      setBorderAndBold(worksheet.getCell(`O${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`Q${currentRow + 3}:R${currentRow + 3}`);
      worksheet.getCell(`Q${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .TagStatus;
      setBorderAndBold(worksheet.getCell(`Q${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`S${currentRow + 3}:T${currentRow + 3}`);
      worksheet.getCell(`S${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .FrontCover;
      setBorderAndBold(worksheet.getCell(`S${currentRow + 3}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`U${currentRow + 3}:V${currentRow + 3}`);
      worksheet.getCell(`U${currentRow + 3}`).value = formDataProceedSubmitICFWearingClearance .StaffTNo;
      setBorderAndBold(worksheet.getCell(`U${currentRow + 3}`), true); // Pass true for bold if needed

      // Setting value for another cell
      

      // Setting value for E14
      worksheet.getCell(`B${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .WheelType;
      setBorderAndBold(worksheet.getCell(`B${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.getCell(`C${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .WheelDiameter;
      setBorderAndBold(worksheet.getCell(`C${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`D${currentRow + 4}:E${currentRow + 4}`);
      worksheet.getCell(`D${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .AxleYear;
      setBorderAndBold(worksheet.getCell(`D${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`F${currentRow + 4}:G${currentRow + 4}`);
      worksheet.getCell(`F${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .WearingCodeYear;
      setBorderAndBold(worksheet.getCell(`D${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`H${currentRow + 4}:I${currentRow + 4}`);
      worksheet.getCell(`H${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .MatungaWNo;
      setBorderAndBold(worksheet.getCell(`H${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.getCell(`J${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .Make;
      setBorderAndBold(worksheet.getCell(`J${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.getCell(`K${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .DMA;
      setBorderAndBold(worksheet.getCell(`K${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.getCell(`L${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .MA;
      setBorderAndBold(worksheet.getCell(`L${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`M${currentRow + 4}:N${currentRow + 4}`);
      worksheet.getCell(`M${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .InitialFittings;
      setBorderAndBold(worksheet.getCell(`M${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`O${currentRow + 4}:P${currentRow + 4}`);
      worksheet.getCell(`O${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .WearingService;
      setBorderAndBold(worksheet.getCell(`O${currentRow + 4}`), true); // Pass true for bold if needed
      
      worksheet.mergeCells(`Q${currentRow + 4}:R${currentRow + 4}`);
      worksheet.getCell(`Q${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .TagStatus;
      setBorderAndBold(worksheet.getCell(`Q${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`S${currentRow + 4}:T${currentRow + 4}`);
      worksheet.getCell(`S${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .FrontCover;
      setBorderAndBold(worksheet.getCell(`S${currentRow + 4}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`U${currentRow + 4}:V${currentRow + 4}`);
      worksheet.getCell(`U${currentRow + 4}`).value = formDataProceedSubmitICFWearingClearance .StaffTNo;
      setBorderAndBold(worksheet.getCell(`U${currentRow + 4}`), true); // Pass true for bold if needed



      // Merging cells for F14 and setting value
      worksheet.mergeCells(`A${currentRow + 5}:F${currentRow + 6}`);
      worksheet.getCell(`A${currentRow+5}`).value = "Inspector Name";
      setFaintGreyBackground(worksheet.getCell(`A${currentRow + 5}:F${currentRow + 6}`));
      setBorderAndBold(worksheet.getCell(`A${currentRow + 5}:F${currentRow + 6}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`G${currentRow + 5}:K${currentRow + 6}`);
      worksheet.getCell(`G${currentRow+5}`).value = formDataProceedSubmitICFWearingClearance .InspName;
      setBorderAndBold(worksheet.getCell(`G${currentRow + 5}:K${currentRow + 6}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`L${currentRow + 5}:Q${currentRow + 6}`);
      worksheet.getCell(`L${currentRow+5}`).value = "Inspector Ticket No";
      setFaintGreyBackground(worksheet.getCell(`L${currentRow + 5}:Q${currentRow + 6}`));
      setBorderAndBold(worksheet.getCell(`L${currentRow + 5}:Q${currentRow + 6}`), true); // Pass true for bold if needed

      worksheet.mergeCells(`R${currentRow + 5}:V${currentRow + 6}`);
      worksheet.getCell(`R${currentRow+5}`).value = formDataProceedSubmitICFWearingClearance .InspTicket;
      setBorderAndBold(worksheet.getCell(`R${currentRow + 5}:V${currentRow + 6}`), true); // Pass true for bold if needed

    
      const startColumn = 1;

// Apply formatting to each cell in the row
    // for (let i = 0; i < 6; i++) {
    //   const cell = worksheet.getCell(currentRow + 33, startColumn + i);
      
    //   // Apply faint grey background
    //   cell.fill = {
    //     type: 'pattern',
    //     pattern: 'solid',
    //     fgColor: { argb: 'FFF0F0F0' } // Light grey color
    //   };
      
    //   // Apply borders
    //   cell.border = {
    //     top: { style: 'thin' },
    //     left: { style: 'thin' },
    //     bottom: { style: 'thin' },
    //     right: { style: 'thin' }
    //   };
      
    //   // Apply bold to label cells (odd-numbered columns)
    //   if (i % 2 === 0) {
    //     cell.font = {
    //       bold: true
    //     };
    //   }
    // }

const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

          const loginInfo = localStorage.getItem('loggedInUser')
            ? `${localStorage.getItem('loggedInUser')}`
            : 'Unknown';
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();

      worksheet.getRow(currentRow + 8).values = [
        "Workshop Name",
        workshopName,
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,
      ];

      for (let i = 0; i < 6; i++) {
          const cell = worksheet.getCell(currentRow + 8, startColumn + i);
          
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
      currentRow += 15;
    });

    // Save Excel file
    const uint8Array = await workbook.xlsx.writeBuffer();
    const blob = new Blob([uint8Array], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "WearingClearanceICF.xlsx");
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


    data.forEach((formDataProceedSubmitICFWearingClearance , index) => {
      // Table headers
      const headers = [
        [
          { content: 'Index No.', rowSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Wheel No | Type | Diameter', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Axle No | Year', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Bearing Code No | Year', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Matunga V. No.', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'V | Make', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Clearance', colSpan: 2, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Initial Fitting Month', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Bearing Service Month', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Tag Status', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Front Cover', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'Staff T. No.', styles: { halign: 'center', fillColor: [240, 240, 240] } }
        ],
        [
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WheelNo), colSpan:2, styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.AxleNo),colSpan:2, styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WearingCodeNo), styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.MatungaWNo), styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.V), styles: { halign: 'center' } },
          { content: 'D.MA.', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: 'MA.', styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.InitialFittings), colSpan:2, styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WearingService),colSpan:2, styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.TagStatus), styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.FrontCover), styles: { halign: 'center' } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.StaffTNo), styles: { halign: 'center' } },
        ]
      ];
    
      const data = [
        [
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.IndxNo)},
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WheelType) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WheelDiameter) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.AxleYear),colSpan:2 },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WearingCodeYear) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.MatungaWNo) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.Make) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.DMA) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.MA) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.InitialFittings) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.WearingService) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.TagStatus) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.FrontCover) },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.StaffTNo) }
        ],
        [
          { content: 'Inspector Name', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.InspName),colSpan:5 },
          { content: 'Inspector Ticket No.', colSpan: 3, styles: { halign: 'center', fillColor: [240, 240, 240] } },
          { content: handleNullValue(formDataProceedSubmitICFWearingClearance.InspTicket), colSpan: 4 }
        ]
      ];
  
    
    
    
      doc.autoTable({
        head: headers,
        body: data,
        theme: 'grid',
        startY: 20,
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          halign: 'center',
          valign: 'middle',
          fontSize: 8,
          cellPadding: 3,
        },
        styles: {
          overflow: 'linebreak',
          fontSize: 8,
          cellWidth: 'wrap',
          halign: 'center',
          valign: 'middle',
          lineColor: [0, 0, 0],
          lineWidth: 0.1,
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 60 },
          2: { cellWidth: 60 },
          3: { cellWidth: 60 },
          4: { cellWidth: 60 },
          5: { cellWidth: 60 },
          6: { cellWidth: 60 },
          7: { cellWidth: 60 },
          8: { cellWidth: 40 },
          9: { cellWidth: 40 },
          10: { cellWidth: 60 },
          11: { cellWidth: 60 },
          12: { cellWidth: 50 },
          13: { cellWidth: 50 },
          14: { cellWidth: 50 }
        },
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        didDrawPage: (data) => {
          const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';
          const SystemName = "Digital Workshop";
          const pageSize = doc.internal.pageSize;
          const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
          const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          
          doc.setFontSize(10);
          const textWidth = doc.getTextWidth(workshopName);
          const xCenter = (pageWidth - textWidth) / 2;
          
          doc.text(workshopName, xCenter, pageHeight - 20);
          doc.text(SystemName, xCenter, pageHeight - 7);
          
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleString();
          doc.text(formattedDate, data.settings.margin.left, pageHeight - 10);
          doc.text(loginInfo, 20, pageHeight - 35);
    
          // Add Inspector signature line
          doc.line(pageWidth - 120, pageHeight - 30, pageWidth - 20, pageHeight - 30);
        }
      });

          if (index < data.length - 1) {
      doc.addPage(); // This ensures the next entry starts on a fresh page
    }
  });

  const totalPages = doc.internal.getNumberOfPages();
   
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.setFontSize(10);
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - 80, pageHeight - 20);
      }
    
      doc.save("WearingPositionReport.pdf");
    };
  
  

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
    "Index No.",
    "Wheel No",
    "Wheel Type",
    "Wheel Diameter",
    "Axle No",
    "Axle Year",
    "Bearing Code No",
    "Bearing Code Year", 
    "Matunga V. No.",
    "V Make",
    "Clearance D.MA.",
    "Clearance MA.",
    "Initial Fitting Month",
    "Bearing Service Month",
    "Tag Status",
    "Front Cover",
    "Staff T. No.",
    "Inspector Name",
    "Inspector Ticket No."
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.IndxNo,
      entry.WheelNo,
      entry.WheelType,
      entry.WheelDiameter,
      entry.AxleNo,
      entry.AxleYear,
      entry.WearingCodeNo,
      entry.WearingCodeYear,
      entry.MatungaWNo,
      entry.Make,
      entry.DMA,
      entry.MA,
      entry.InitialFittings,
      entry.WearingService,
      entry.TagStatus,
      entry.FrontCover,
      entry.StaffTNo,
      entry.InspName,
      entry.InspTicket
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
    link.setAttribute("download", "WearingClearanceICF.csv");
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
        {data.map((formDataProceedSubmitICFWearingClearance ) => (
          <table key={formDataProceedSubmitICFWearingClearance .id}>
            <thead className="thead">
            <tr>
              <th colSpan={1} rowSpan={3}>Index No.</th>
              <th colSpan={2} rowSpan={3}> Wheel No | Type | Diameter </th>
              <th colSpan={2} rowSpan={3}>Axle No | Year </th>
              <th colSpan={2} rowSpan={3}>Bearing Code No | Year</th>
              <th colSpan={2} rowSpan={3}>Matunga V. No.</th>
              <th colSpan={1} rowSpan={3}> V | Make</th>
              <th colSpan={2} rowSpan={2}>Clearance</th>
              <th colSpan={2} rowSpan={3}>Initial Fitting Month</th>
              <th colSpan={2} rowSpan={3}>Bearing Service Month</th>
              <th colSpan={2} rowSpan={3}>Tag Status</th>
              <th colSpan={2} rowSpan={3}>Front Cover</th>
              <th colSpan={2} rowSpan={3}>Staff T. No.</th>
            </tr>
            <tr></tr>
            <tr>
              <th>D.MA.</th>
              <th>MA.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan={2}></td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance.WheelNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance.AxleNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .WearingCodeNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .MatungaWNo}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .VMake}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .DMA}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .MA}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .InitialFittings}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .WearingService}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .TagStatus}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .FrontCover}</td>
              <td colSpan={2} rowSpan={2}>{formDataProceedSubmitICFWearingClearance .StaffTNo}</td>
            </tr>
            <tr>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .WheelType}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .WheelDiameter}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance.AxleYear}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .WearingCodeNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .MatungaWNo}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .Make}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .DMA}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .MA}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .InitialFittings}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .WearingService}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .TagStatus}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .FrontCover}</td>
            </tr>
            <tr>
              <th colSpan={6}>Inspector Name :</th>
              <td colSpan={5}>{formDataProceedSubmitICFWearingClearance .InspName}</td>
              <th colSpan={6}>Inspector Ticket No :</th>
              <td colSpan={5}>{formDataProceedSubmitICFWearingClearance .InspTicket}</td>
            </tr>
              <tr></tr>
              <br />
              <br />
            {/* <div className="footerProceedSubmit">
              <div>
                <b> M/C No.: </b>
                {formDataProceedSubmitICFWearingClearance .MCNo}
              </div>

              <div>
                <b> Operator: </b>
                {formDataProceedSubmitICFWearingClearance .OperatorNameFinal}
              </div>
              <div>
                <b> Inspector: </b>
                {formDataProceedSubmitICFWearingClearance .InspectorNameFinal}
              </div>
            </div> */}
            </tbody>
            <br /><br />
          </table>
        ))}
      </div>
    </div>
  );
};

export default AllEntryWearingClearanceICF ;

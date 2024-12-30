import React from "react";
// import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { color } from "framer-motion";

const ProceedSubmitWearingClearanceICF  = ({ formDataProceedSubmitICFWearingClearance , setformDataProceedSubmitICFWearingClearance  }) => {
  console.log("formDataProceedSubmitICFWearingClearance :", formDataProceedSubmitICFWearingClearance );

  const handleNullValue = (value) =>
    value === null || value === undefined ? "" : value;

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/wearingclricf/data", formDataProceedSubmitICFWearingClearance );
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setformDataProceedSubmitICFWearingClearance ((prevformDataProceedSubmitICF) => ({
          ...Object.keys(prevformDataProceedSubmitICF).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 3,
          WheeltypeID: 2,
        }));

        navigate("/wearingclearanceicfviewallentry");
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
      const response = await postData("/wearingclricf/data", formDataProceedSubmitICFWearingClearance );
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setformDataProceedSubmitICFWearingClearance ((prevformDataProceedSubmitICF) => ({
          ...Object.keys(prevformDataProceedSubmitICF).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionID: 1,
          DepartmentID: 3,
          WheeltypeID: 2,
        }));

        navigate("/wearingclearanceicf/wheel_details");
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
        fgColor: { argb: 'D3D3D3' }
      };
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    };
  
    const setborder = (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: '000000' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: '000000' } },
      };
    };
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ICFWearingClearance");
  
    // Set column widths
    for (let i = 1; i <= 20; i++) {
      worksheet.getColumn(i).width = 15;
    }
  
    // Merge cells and set headers
    worksheet.mergeCells(1, 1, 3, 1);
    worksheet.getCell('A1').value = "Index No.";
  
    worksheet.mergeCells(1, 2, 3, 3);
    worksheet.getCell('B1').value = "Wheel No | Type | Diameter";
  
    worksheet.mergeCells(1, 4, 3, 5);
    worksheet.getCell('D1').value = "Axle No | Year";
  
    worksheet.mergeCells(1, 6, 3, 7);
    worksheet.getCell('F1').value = "Bearing Code No | Year";
  
    worksheet.mergeCells(1, 8, 3, 9);
    worksheet.getCell('H1').value = "Matunga V. No.";
  
    worksheet.mergeCells(1, 10, 3, 10);
    worksheet.getCell('J1').value = "V | Make";
  
    worksheet.mergeCells(1, 11, 2, 12);
    worksheet.getCell('K1').value = "Clearance";
    worksheet.getCell('K3').value = "D.MA.";
    worksheet.getCell('L3').value = "MA.";
  
    worksheet.mergeCells(1, 13, 3, 14);
    worksheet.getCell('M1').value = "Initial Fitting Month";
  
    worksheet.mergeCells(1, 15, 3, 16);
    worksheet.getCell('O1').value = "Bearing Service Month";
  
    worksheet.mergeCells(1, 17, 3, 18);
    worksheet.getCell('Q1').value = "Tag Status";
  
    worksheet.mergeCells(1, 19, 3, 20);
    worksheet.getCell('S1').value = "Front Cover";
  
    worksheet.mergeCells(1, 21, 3, 22);
    worksheet.getCell('U1').value = "Staff T. No.";
  
    // Data rows
    const row4 = worksheet.getRow(4);
    worksheet.mergeCells(4, 1, 5, 1);
    row4.getCell(1).value = "";
    worksheet.mergeCells(4, 2, 4, 3);
    row4.getCell(2).value = formDataProceedSubmitICFWearingClearance.WheelNo;
    worksheet.mergeCells(4, 4, 4, 5);
    row4.getCell(4).value = formDataProceedSubmitICFWearingClearance.AxleNo;
    worksheet.mergeCells(4, 6, 4, 7);
    row4.getCell(6).value = formDataProceedSubmitICFWearingClearance.WearingCodeNo;
    worksheet.mergeCells(4, 8, 4, 9);
    row4.getCell(8).value = formDataProceedSubmitICFWearingClearance.MatungaWNo;
    row4.getCell(10).value = formDataProceedSubmitICFWearingClearance.V;
    row4.getCell(11).value = formDataProceedSubmitICFWearingClearance.DMA;
    row4.getCell(12).value = formDataProceedSubmitICFWearingClearance.MA;
    worksheet.mergeCells(4, 13, 4, 14);
    row4.getCell(13).value = formDataProceedSubmitICFWearingClearance.InitialFittings;
    worksheet.mergeCells(4, 15, 4, 16);
    row4.getCell(15).value = formDataProceedSubmitICFWearingClearance.WearingService;
    worksheet.mergeCells(4, 17, 4, 18);
    row4.getCell(17).value = formDataProceedSubmitICFWearingClearance.TagStatus;
    worksheet.mergeCells(4, 19, 4, 20);
    row4.getCell(19).value = formDataProceedSubmitICFWearingClearance.FrontCover;
    worksheet.mergeCells(4, 21, 5, 22);
    row4.getCell(21).value = formDataProceedSubmitICFWearingClearance.StaffTNo;
  
    // Second data row
    const row5 = worksheet.getRow(5);
    row5.getCell(2).value = formDataProceedSubmitICFWearingClearance.WheelType;
    row5.getCell(3).value = formDataProceedSubmitICFWearingClearance.WheelDiameter;
    worksheet.mergeCells(5, 4, 5, 5);
    row5.getCell(4).value = formDataProceedSubmitICFWearingClearance.AxleYear;
    worksheet.mergeCells(5, 6, 5, 7);
    row5.getCell(6).value = formDataProceedSubmitICFWearingClearance.WearingCodeNo;
    worksheet.mergeCells(5, 8, 5, 9);
    row5.getCell(8).value = formDataProceedSubmitICFWearingClearance.MatungaWNo;
    row5.getCell(10).value = formDataProceedSubmitICFWearingClearance.Make;
    row5.getCell(11).value = formDataProceedSubmitICFWearingClearance.DMA;
    row5.getCell(12).value = formDataProceedSubmitICFWearingClearance.MA;
    worksheet.mergeCells(5, 13, 5, 14);
    row5.getCell(13).value = formDataProceedSubmitICFWearingClearance.InitialFittings;
    worksheet.mergeCells(5, 15, 5, 16);
    row5.getCell(15).value = formDataProceedSubmitICFWearingClearance.WearingService;
    worksheet.mergeCells(5, 17, 5, 18);
    row5.getCell(17).value = formDataProceedSubmitICFWearingClearance.TagStatus;
    worksheet.mergeCells(5, 19, 5, 20);
    row5.getCell(19).value = formDataProceedSubmitICFWearingClearance.FrontCover;
  


 // Add footer (starting at row 7 to leave some space)
const row6 = worksheet.getRow(6);
const footerRow = 6;

// First footer item
worksheet.mergeCells(footerRow, 1, footerRow, 6);
const wearingCell = worksheet.getCell(footerRow, 1);
worksheet.getCell('A6').value = "Inspector Name:";
worksheet.mergeCells(footerRow,7,footerRow,11);
row6.getCell(7).value = formDataProceedSubmitICFWearingClearance.InspName;
wearingCell.font = { bold: true };
setFaintGreyBackground(wearingCell);

// // Second footer item
worksheet.mergeCells(footerRow, 12, footerRow, 17);
const measurementsCell = worksheet.getCell(footerRow, 12);
worksheet.getCell('L6').value = "Inspector Ticket No:";
worksheet.mergeCells(footerRow,18,footerRow,22);
row6.getCell(19).value = formDataProceedSubmitICFWearingClearance.InspTicket;
measurementsCell.font = { bold: true };
setFaintGreyBackground(measurementsCell);


const loginInfo = localStorage.getItem('loggedInUser')
  ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
const currentDate = new Date();
const formattedDate = currentDate.toLocaleString();

// Add login info and export time to row 10
const row10 = worksheet.getRow(10);
row10.values = [
  "Logged in as",
  loginInfo,
  "Time of Export",
  formattedDate,
];

// Apply faint grey background to specific cells in row 10
setFaintGreyBackground(row10.getCell(1)); // "Logged in as"
setFaintGreyBackground(row10.getCell(2)); // loginInfo
setFaintGreyBackground(row10.getCell(3)); // "Time of Export"
setFaintGreyBackground(row10.getCell(4)); // formattedDate

// Make these cells bold
row10.getCell(1).font = { bold: true }; // "Logged in as"
row10.getCell(2).font = { bold: true }; // loginInfo
row10.getCell(3).font = { bold: true }; // "Time of Export"
row10.getCell(4).font = { bold: true }; // formattedDate

// Rest of the existing code remains the same...
// Shift all existing content down by one row
// Update all your existing cell references to start from row 2 instead of row 1


// Apply the same cell alignment as headers
[wearingCell, measurementsCell].forEach(cell => {
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true
  };
});


    // Apply styling
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        setborder(cell);
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true
        };
      });
    });
  
    // Apply background to header cells
    for (let i = 1; i <= 22; i++) {
      setFaintGreyBackground(worksheet.getCell(1, i));
      setFaintGreyBackground(worksheet.getCell(2, i));
      setFaintGreyBackground(worksheet.getCell(3, i));
    }
  
    // Make headers bold
    for (let row = 1; row <= 3; row++) {
      for (let col = 1; col <= 22; col++) {
        worksheet.getCell(row, col).font = { bold: true };
      }
    }
  
    // Save Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      saveAs(blob, "ICFWearingClearance.xlsx");
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
  
    // Add page numbers
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
  // Define headers matching the PDF export structure
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
    "V",
    "Make",
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

  // Prepare data row using the same form data
  const rows = [
    [
      handleNullValue(formDataProceedSubmitICFWearingClearance.IndxNo),
      formDataProceedSubmitICFWearingClearance.WheelNo,
      handleNullValue(formDataProceedSubmitICFWearingClearance.WheelType),
      handleNullValue(formDataProceedSubmitICFWearingClearance.WheelDiameter),
      handleNullValue(formDataProceedSubmitICFWearingClearance.AxleNo),
      handleNullValue(formDataProceedSubmitICFWearingClearance.AxleYear),
      handleNullValue(formDataProceedSubmitICFWearingClearance.WearingCodeNo),
      handleNullValue(formDataProceedSubmitICFWearingClearance.WearingCodeYear),
      handleNullValue(formDataProceedSubmitICFWearingClearance.MatungaWNo),
      handleNullValue(formDataProceedSubmitICFWearingClearance.V),
      handleNullValue(formDataProceedSubmitICFWearingClearance.Make),
      handleNullValue(formDataProceedSubmitICFWearingClearance.DMA),
      handleNullValue(formDataProceedSubmitICFWearingClearance.MA),
      handleNullValue(formDataProceedSubmitICFWearingClearance.InitialFittings),
      handleNullValue(formDataProceedSubmitICFWearingClearance.WearingService),
      handleNullValue(formDataProceedSubmitICFWearingClearance.TagStatus),
      handleNullValue(formDataProceedSubmitICFWearingClearance.FrontCover),
      handleNullValue(formDataProceedSubmitICFWearingClearance.StaffTNo),
      handleNullValue(formDataProceedSubmitICFWearingClearance.InspName),
      handleNullValue(formDataProceedSubmitICFWearingClearance.InspTicket)
    ]
  ];

  // Create CSV content
  let csvContent = 
    "data:text/csv;charset=utf-8," + 
    headers.join(",") + 
    "\n" + 
    rows.map(e => e.join(",")).join("\n");

  // Encode URI and trigger download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "WearingPositionReport.csv");
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
              <td rowSpan={2}>1</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance.WheelNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance.AxleNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .WearingCodeNo}</td>
              <td colSpan={2}>{formDataProceedSubmitICFWearingClearance .MatungaWNo}</td>
              <td colSpan={1}>{formDataProceedSubmitICFWearingClearance .V}</td>
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
            <br /><br />
            <div className="footerProceedSubmitWearing">
              <div>
              
              </div>

              <div>
               
              </div>
              <div>
              </div>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitWearingClearanceICF ;

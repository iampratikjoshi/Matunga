import React from "react";
// import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import "../../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import api from "../../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { color } from "framer-motion";

const ProceedSubmitUpdatedPressOnICF = ({ formDataProceedSubmitPressOnICF, setformDataProceedSubmitPressOnICF }) => {
  console.log("formDataProceedSubmitPressOnICF:", formDataProceedSubmitPressOnICF);
  const navigate = useNavigate();
  const handleNullValue = (value) => 
    value === null || value === undefined ? "" : value;

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/icfpresson/editdata/", formDataProceedSubmitPressOnICF);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setformDataProceedSubmitPressOnICF((prevformDataProceedSubmitICF) => ({
          ...Object.keys(prevformDataProceedSubmitICF).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 2,
        }));

        navigate("/icfpresson_viewallentry");
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
      const response = await api.put("/icfpresson/editdata/", formDataProceedSubmitPressOnICF);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setformDataProceedSubmitPressOnICF((prevformDataProceedSubmitICF) => ({
          ...Object.keys(prevformDataProceedSubmitICF).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 2,
        }));

        navigate("/parentediticf/editicf");
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
    const worksheet = workbook.addWorksheet("ICFPressOnForm");
    
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
    worksheet.mergeCells(1,1,2,1)
    worksheet.getCell('A1').value = "Wheel No"
    worksheet.mergeCells(1,2,2,3)
    worksheet.getCell('B1').value = formDataProceedSubmitPressOnICF.WheelNo;
    worksheet.mergeCells(1,4,2,4)
    worksheet.getCell('D1').value = "Wheel Type"
    worksheet.mergeCells(1,5,2,7)
    worksheet.getCell('E1').value = formDataProceedSubmitPressOnICF.WheelType
    worksheet.mergeCells(1,8,2,8)
    worksheet.getCell('H1').value = "Axle No"
    worksheet.mergeCells(1,9,2,11)
    worksheet.getCell('I1').value = formDataProceedSubmitPressOnICF.AxleNo
    
    worksheet.mergeCells(3,1,4,2)
    worksheet.getCell('A3').value = "ATL No:"
    worksheet.mergeCells(5,1,8,2)
    worksheet.getCell('A5').value = formDataProceedSubmitPressOnICF.ATLNo;
    worksheet.mergeCells(3,3,4,5)
    worksheet.getCell('D3').value = "Wheel Seat size by operator :"
    worksheet.mergeCells(5,3,6,3)
    worksheet.getCell('C5').value = "A Side"
    worksheet.mergeCells(7,3,8,3)
    worksheet.getCell('C7').value = "B Side"
    worksheet.mergeCells(5,4,6,5)
    worksheet.getCell('D5').value = formDataProceedSubmitPressOnICF.AWheelSide;
    worksheet.mergeCells(7,4,8,5)
    worksheet.getCell('D7').value = formDataProceedSubmitPressOnICF.BWheelSide;
    worksheet.mergeCells(3,6,4,8)
    worksheet.getCell('F3').value = "RA Value(1.6 MAX)"
    worksheet.mergeCells(5,6,6,6)
    worksheet.getCell('F5').value = "A Side"
    worksheet.mergeCells(7,6,8,6)
    worksheet.getCell('F7').value = "B Side"
    worksheet.mergeCells(5,7,6,8)
    worksheet.getCell('G5').value = formDataProceedSubmitPressOnICF.ARASide;
    worksheet.mergeCells(7,7,8,8)
    worksheet.getCell('G7').value = formDataProceedSubmitPressOnICF.BRASide;
    worksheet.mergeCells(3,9,4,11)
    worksheet.getCell('I3').value = "Operator Name:"
     worksheet.mergeCells(5,9,8,11)
    worksheet.getCell('I5').value = formDataProceedSubmitPressOnICF.OperatorNamePrimary;
    
    
    worksheet.mergeCells(9,1,9,6);
    worksheet.getCell('A9').value = "Wheel Activities";
    worksheet.mergeCells(9,7,9,11);
    worksheet.getCell('I9').value = formDataProceedSubmitPressOnICF.WheelActivities;
    
    // Conditional rendering for Wheel Activities row
    if (formDataProceedSubmitPressOnICF.WheelActivities === "RA" || 
        formDataProceedSubmitPressOnICF.WheelActivities === "RD" || 
        formDataProceedSubmitPressOnICF.WheelActivities === "NAND" || 
        formDataProceedSubmitPressOnICF.WheelActivities === "OAOD") {
      
      worksheet.mergeCells(10,1,10,3);
      worksheet.getCell('A10').value = "Axle Wheel Seat Size";
      worksheet.mergeCells(10,4,10,6);
      worksheet.getCell('D10').value = "Wheel Disc Bore Size";
      worksheet.mergeCells(10,7,10,9);
      worksheet.getCell('G10').value = "Wheel Disc Stamping Particulars";
      worksheet.mergeCells(10,10,10,11);
      worksheet.getCell('J10').value = "Press On No";
    
      worksheet.mergeCells(11,1,11,3);
      worksheet.getCell('A11').value = formDataProceedSubmitPressOnICF.AxleWheelSeatSize;
      worksheet.mergeCells(11,4,11,6);
      worksheet.getCell('D11').value = formDataProceedSubmitPressOnICF.WheelDiscBoreSize;
      worksheet.mergeCells(11,7,11,9);
      worksheet.getCell('G11').value = formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars;
      worksheet.mergeCells(11,10,11,11);
      worksheet.getCell('J11').value = formDataProceedSubmitPressOnICF.PressOnNumber;
    
    } else if (formDataProceedSubmitPressOnICF.WheelActivities === "Shift") {
      
      worksheet.mergeCells(10,1,10,5);
      worksheet.getCell('A10').value = "Inspector Name";
      worksheet.mergeCells(10,6,10,11);
      worksheet.getCell('F10').value = "Ticket No";
    
      worksheet.mergeCells(11,1,11,5);
      worksheet.getCell('A11').value = formDataProceedSubmitPressOnICF.InspectorNameActivities;
      worksheet.mergeCells(11,6,11,11);
      worksheet.getCell('F11').value = formDataProceedSubmitPressOnICF.TicketNo;
    
    } else if (formDataProceedSubmitPressOnICF.WheelActivities === "Machine") {
      
      worksheet.mergeCells(10,1,10,5);
      worksheet.getCell('A10').value = "Ticket No";
      worksheet.mergeCells(10,6,10,11);
      worksheet.getCell('F10').value = "Operator No";
    
      worksheet.mergeCells(11,1,11,5);
      worksheet.getCell('A11').value = formDataProceedSubmitPressOnICF.TicketNo;
      worksheet.mergeCells(11,6,11,11);
      worksheet.getCell('F11').value = formDataProceedSubmitPressOnICF.OperatorNo;
    }
    
    // Section for Wheel Disc 'A' Side
    worksheet.addRow([]);
    worksheet.getRow(12).values = ["Wheel Disc 'A' Side"];
    worksheet.mergeCells(12,1,13,11);
    worksheet.getRow(3).alignment = {
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
    
    worksheet.mergeCells(14,1,15,2);
    worksheet.getCell('A14').value = "VTL No."
    worksheet.mergeCells(14,3,15,5);
    worksheet.getCell('C14').value = "Bore size By Operator :"
    worksheet.mergeCells(14,6,15,8);
    worksheet.getCell('F14').value = "RA Value(1.6 MAX)"
    worksheet.mergeCells(14,9,15,11);
    worksheet.getCell('I14').value = "Operator Name"
    
    worksheet.mergeCells("A16:B16");
    worksheet.getCell('A16').value = formDataProceedSubmitPressOnICF.VTLNo;
    worksheet.mergeCells("C16:E16");
    worksheet.getCell('C16').value = formDataProceedSubmitPressOnICF.BoreSize;
    worksheet.mergeCells("F16:H16");
    worksheet.getCell('F16').value = formDataProceedSubmitPressOnICF.RAValue;
    worksheet.mergeCells("I16:K16");
    worksheet.getCell('I16').value = formDataProceedSubmitPressOnICF.OperatorNameA;
    
    
    worksheet.mergeCells(17,1,17,3);
    worksheet.getCell('A17').value = "A' Bore Size"
    worksheet.getCell("D17");
    worksheet.getCell('D17').value = "B' Wheel Seat Size (190-195)mm"
    worksheet.getCell("E17");
    worksheet.getCell('E17').value = "C=B-A int Allow (0.240-0.300mm)"
    worksheet.mergeCells(17,6,17,7);
    worksheet.getCell('F17').value = "Press-On Pressure (69T-109T)"
    worksheet.getCell('H17').value = "RD No."
    worksheet.mergeCells(17,9,17,11);
    worksheet.getCell('I17').value = "Wheel Disc Particulars"
    
    
    
    worksheet.getRow(18).values = [
      "Insp.",
      "X-axis",
      "Y-axis",
    ];
    worksheet.getCell('A19').value = "Top"
    worksheet.getCell('A20').value = "Middle"
    worksheet.getCell('A21').value = "Lower"
    worksheet.getCell('A22').value = "Avg"
    
    worksheet.getCell('B19').value = formDataProceedSubmitPressOnICF.TopX;
    worksheet.getCell('C19').value = formDataProceedSubmitPressOnICF.TopY;
    worksheet.getCell('B20').value = formDataProceedSubmitPressOnICF.MiddleX;
    worksheet.getCell('C20').value = formDataProceedSubmitPressOnICF.MiddleY;
    worksheet.getCell('B21').value = formDataProceedSubmitPressOnICF.LowerX;
    worksheet.getCell('C21').value = formDataProceedSubmitPressOnICF.LowerY;
    worksheet.getCell('B22').value = formDataProceedSubmitPressOnICF.AvgX;
    worksheet.getCell('C22').value = formDataProceedSubmitPressOnICF.AvgY;
    
    worksheet.mergeCells(18,4,22,4);
    worksheet.getCell('D18').value = formDataProceedSubmitPressOnICF.BWheelSeatSize;
    worksheet.mergeCells(18,5,22,5);
    worksheet.getCell('E18').value = formDataProceedSubmitPressOnICF.CBAIntAllow;
    worksheet.mergeCells(18,6,22,7);
    worksheet.getCell('F18').value = formDataProceedSubmitPressOnICF.PressureInTon;
    worksheet.mergeCells(18,8,22,8);
    worksheet.getCell('H18').value = formDataProceedSubmitPressOnICF.RDNo;
    worksheet.mergeCells(18,9,22,11);
    worksheet.getCell('I18').value = formDataProceedSubmitPressOnICF.WheelDiscAParticulars;
    
    
    // Section for Wheel Disc 'B' Side
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.mergeCells(24,1,25,11);
    worksheet.getCell("A24").value = "Wheel Disc 'B' Side";
    worksheet.getCell("A24").font = { bold: true };
    
    
    worksheet.mergeCells(26,1,27,2);
    worksheet.getCell('A26').value = "VTL No."
    worksheet.mergeCells(26,3,27,5);
    worksheet.getCell('C26').value = "Bore size By Operator :"
    worksheet.mergeCells(26,6,27,8);
    worksheet.getCell('F26').value = "RA Value(1.6 MAX)"
    worksheet.mergeCells(26,9,27,11);
    worksheet.getCell('I26').value = "Operator Name"
    
    worksheet.mergeCells("A28:B28");
    worksheet.getCell('A28').value = formDataProceedSubmitPressOnICF.VTLNoB;
    worksheet.mergeCells("C28:E28");
    worksheet.getCell('C28').value = formDataProceedSubmitPressOnICF.BoreSizeB;
    worksheet.mergeCells("F28:H28");
    worksheet.getCell('F28').value = formDataProceedSubmitPressOnICF.RAValueB;
    worksheet.mergeCells("I28:K28");
    worksheet.getCell('I28').value = formDataProceedSubmitPressOnICF.OperatorNameB;
    
    
    worksheet.getRow(30).values = [
      "Insp.",
      "X-axis",
      "Y-axis",
    ];
    
    worksheet.getCell('A31').value = "Top"
    worksheet.getCell('A32').value = "Middle"
    worksheet.getCell('A33').value = "Lower"
    worksheet.getCell('A34').value = "Avg"
    
    worksheet.getCell('B31').value = formDataProceedSubmitPressOnICF.BTopX;
    worksheet.getCell('C31').value = formDataProceedSubmitPressOnICF.BTopY;
    worksheet.getCell('B32').value = formDataProceedSubmitPressOnICF.BMiddleX;
    worksheet.getCell('C32').value = formDataProceedSubmitPressOnICF.BMiddleY;
    worksheet.getCell('B33').value = formDataProceedSubmitPressOnICF.BLowerX;
    worksheet.getCell('C33').value = formDataProceedSubmitPressOnICF.BLowerY;
    worksheet.getCell('B34').value = formDataProceedSubmitPressOnICF.BAvgX;
    worksheet.getCell('C34').value = formDataProceedSubmitPressOnICF.BAvgY;
    
    
     worksheet.mergeCells(29,1,29,3);
    worksheet.getCell('A29').value = "A' Bore Size"
    worksheet.getCell('D29').value = "B' Wheel Seat Size (190-195)mm"
    worksheet.getCell("E29");
    worksheet.getCell('E29').value = "C=B-A int Allow (0.240-0.300mm)"
    worksheet.mergeCells(29,6,29,7);
    worksheet.getCell('F29').value = "Press-On Pressure (69T-109T)"
    worksheet.getCell('H29').value = "RD No."
    worksheet.mergeCells(29,9,29,11);
    worksheet.getCell('I29').value = "Wheel Disc Particulars"
    
    worksheet.mergeCells(30,4,34,4);
    worksheet.getCell('D30').value = formDataProceedSubmitPressOnICF.BWheelSeatSizeB;
    worksheet.mergeCells(30,5,34,5);
    worksheet.getCell('E30').value = formDataProceedSubmitPressOnICF.CBAIntAllowB;
    worksheet.mergeCells(30,6,34,7);
    worksheet.getCell('F30').value = formDataProceedSubmitPressOnICF.PressureInTonB;
    worksheet.mergeCells(30,8,34,8);
    worksheet.getCell('H30').value = formDataProceedSubmitPressOnICF.RDNoB;
    worksheet.mergeCells(30,9,34,11);
    worksheet.getCell('I30').value = formDataProceedSubmitPressOnICF.WheelDiscAParticularsB;
    
          const loginInfo = localStorage.getItem('loggedInUser')
            ? `${localStorage.getItem('loggedInUser')}`: 'Unknown';
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();
    
      worksheet.getRow(36).values = [
        "Logged in as",
        loginInfo,
        "Time of Export",
        formattedDate,
      ];
    
    for (let i = 1; i <= 51; i++) {
      worksheet.getRow(i).eachCell(setborder);
    }
    worksheet.getCell("A51").font = { bold: true };
    worksheet.getCell("F3").font = { bold: true };
    worksheet.getCell("F5").font = { bold: true };
    worksheet.getCell("F7").font = { bold: true };
    worksheet.getCell("I3").font = { bold: true };
    // worksheet.getCell("I11").font = { bold: true };
    worksheet.getCell("C51").font = { bold: true };
    worksheet.getCell("E51").font = { bold: true };
    worksheet.getCell("A1").font = { bold: true };
    // worksheet.getCell("A5").font = { bold: true };
    worksheet.getCell("C5").font = { bold: true };
    // worksheet.getCell("B1").font = { bold: true };
    // worksheet.getCell("C1").font = { bold: true };
    worksheet.getCell("D1").font = { bold: true };
    // worksheet.getCell("E1").font = { bold: true };
    // worksheet.getCell("F1").font = { bold: true };
    // worksheet.getCell("G1").font = { bold: true };
    worksheet.getCell("H1").font = { bold: true };
    // worksheet.getCell("I1").font = { bold: true };
    // worksheet.getCell("J1").font = { bold: true };
    worksheet.getCell("C3").font = { bold: true };
    worksheet.getCell("E3").font = { bold: true };
    // worksheet.getCell("A7").font = { bold: true };
    // worksheet.getCell("I7").font = { bold: true };
    worksheet.getCell("C7").font = { bold: true };
    // worksheet.getCell("E7").font = { bold: true };
    // worksheet.getCell("G7").font = { bold: true };
    worksheet.getCell("A9").font = { bold: true };
    worksheet.getCell("D9").font = { bold: true };
    worksheet.getCell("E9").font = { bold: true };
    worksheet.getCell("F9").font = { bold: true };
    worksheet.getCell("G9").font = { bold: true };
    worksheet.getCell("H9").font = { bold: true };
    // worksheet.getCell("A11").font = { bold: true };
    // worksheet.getCell("C11").font = { bold: true };
    // worksheet.getCell("E11").font = { bold: true };
    // worksheet.getCell("G11").font = { bold: true };
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
    // worksheet.getCell("A16").font = { bold: true };
    worksheet.getCell("A19").font = { bold: true };
    worksheet.getCell("A18").font = { bold: true };
    worksheet.getCell("A20").font = { bold: true };
    // worksheet.getCell("D20").font = { bold: true };
    // worksheet.getCell("E20").font = { bold: true };
    // worksheet.getCell("F20").font = { bold: true };
    // worksheet.getCell("G20").font = { bold: true };
    // worksheet.getCell("H20").font = { bold: true };
    worksheet.getCell("A21").font = { bold: true };
    // worksheet.getCell("B21").font = { bold: true };
    // worksheet.getCell("C21").font = { bold: true };
    worksheet.getCell("A22").font = { bold: true };
    // worksheet.getCell("C22").font = { bold: true };
    // worksheet.getCell("E22").font = { bold: true };
    // worksheet.getCell("G22").font = { bold: true };
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
    // worksheet.getCell("A28").font = { bold: true };
    worksheet.getCell("A29").font = { bold: true };
    worksheet.getCell("A30").font = { bold: true };
    worksheet.getCell("B27").font = { bold: true };
    worksheet.getCell("C27").font = { bold: true };
    worksheet.getCell("I24").font = { bold: true };
    worksheet.getCell("I13").font = { bold: true };
    worksheet.getCell("A3").font = { bold: true };
    worksheet.getCell("D14").font = { bold: true };
    worksheet.getCell("E14").font = { bold: true };
    worksheet.getCell("F14").font = { bold: true };
    worksheet.getCell("H14").font = { bold: true };
    worksheet.getCell("I14").font = { bold: true };
    worksheet.getCell("D26").font = { bold: true };
    worksheet.getCell("E26").font = { bold: true };
    worksheet.getCell("F26").font = { bold: true };
    worksheet.getCell("G26").font = { bold: true };
    worksheet.getCell("H26").font = { bold: true };
    worksheet.getCell("I26").font = { bold: true };
    worksheet.getCell("A34").font = { bold: true };
    // worksheet.getCell("B34").font = { bold: true };
    // worksheet.getCell("C34").font = { bold: true };
    // worksheet.getCell("D34").font = { bold: true };
    worksheet.getCell("A31").font = { bold: true };
    worksheet.getCell("A32").font = { bold: true };
    worksheet.getCell("A33").font = { bold: true };
     worksheet.getCell("A36").font = { bold: true };
     worksheet.getCell("B36").font = { bold: true };
     worksheet.getCell("C36").font = { bold: true };
     worksheet.getCell("D36").font = { bold: true };
    
    const cellsToFormat = [
      'A1', 'D1', 'H1', 'I24','A3','A4','B3','B4','C3','C4','D3','D4','E3','E4','F3','F4','G3','G4','H3','H4',
      'I3','I4','J3','J4','K3','K4','C5','C6','C7','C8','F5','F7','A9','A10','B9','B10','C9','C10','D9','D10','E9','E10',
      'F9','F10','G9','G10','H9','H10','I9','I10','J9','J10','K9','K10','I12','J12','K12',
      'A12', 'D14','E14','F14','H14','I14','B27','C27','A30','A31','A34','F29','E29','D29','H29','I29',
      'A14', 'A15', 'B15', 'C15', 'A17', 'A20', 'A19', 'A18', 'A21', 'A22','D17','E17','F17','H17','I17','B18','C18',
      'A24', 'D24', 'E24', 'F24', 'G24', 'H24', 'A26','D26','E26','F26','G26','H26','I26',
      'A27', 'A32','A33', 'A29', 'A36', 'B36','C36', 'D36', 
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
      saveAs(blob, "ICFPressOnForm.xlsx");
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
        const rows = [
          [
            formDataProceedSubmitPressOnICF.WheelNo,
            formDataProceedSubmitPressOnICF.WheelType,
            formDataProceedSubmitPressOnICF.AxleNo,
            formDataProceedSubmitPressOnICF.ATLNo,
            formDataProceedSubmitPressOnICF.OperatorNamePrimary,
            formDataProceedSubmitPressOnICF.AWheelSide,
            formDataProceedSubmitPressOnICF.BWheelSide,
            formDataProceedSubmitPressOnICF.ARASide,
            formDataProceedSubmitPressOnICF.BRASide,
            formDataProceedSubmitPressOnICF.AxleWheelSeatSize,
            formDataProceedSubmitPressOnICF.WheelDiscBoreSize,
            formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars,
            formDataProceedSubmitPressOnICF.PressOnNumber,
            formDataProceedSubmitPressOnICF.InspectorNameActivities,
            formDataProceedSubmitPressOnICF.TicketNo,
            formDataProceedSubmitPressOnICF.OperatorNo,
            formDataProceedSubmitPressOnICF.VTLNo,
            formDataProceedSubmitPressOnICF.BoreSize,
            formDataProceedSubmitPressOnICF.RAValue,
            formDataProceedSubmitPressOnICF.OperatorNameA,
            formDataProceedSubmitPressOnICF.BWheelSeatSize,
            formDataProceedSubmitPressOnICF.CBAIntAllow,
            formDataProceedSubmitPressOnICF.PressureInTon,
            formDataProceedSubmitPressOnICF.RDNo,
            formDataProceedSubmitPressOnICF.WheelDiscAParticulars,
            formDataProceedSubmitPressOnICF.TopX,
            formDataProceedSubmitPressOnICF.TopY,
            formDataProceedSubmitPressOnICF.MiddleX,
            formDataProceedSubmitPressOnICF.MiddleY,
            formDataProceedSubmitPressOnICF.LowerX,
            formDataProceedSubmitPressOnICF.LowerY,
            formDataProceedSubmitPressOnICF.AvgX,
            formDataProceedSubmitPressOnICF.AvgY,
            formDataProceedSubmitPressOnICF.VTLNoB,
            formDataProceedSubmitPressOnICF.BoreSizeB,
            formDataProceedSubmitPressOnICF.RAValueB,
            formDataProceedSubmitPressOnICF.OperatorNameB,
            formDataProceedSubmitPressOnICF.BWheelSeatSizeB,
            formDataProceedSubmitPressOnICF.CBAIntAllowB,
            formDataProceedSubmitPressOnICF.PressureInTonB,
            formDataProceedSubmitPressOnICF.RDNoB,
            formDataProceedSubmitPressOnICF.WheelDiscAParticularsB,
            formDataProceedSubmitPressOnICF.BTopX,
            formDataProceedSubmitPressOnICF.BTopY,
            formDataProceedSubmitPressOnICF.BMiddleX,
            formDataProceedSubmitPressOnICF.BMiddleY,
            formDataProceedSubmitPressOnICF.BLowerX,
            formDataProceedSubmitPressOnICF.BLowerY,
            formDataProceedSubmitPressOnICF.BAvgX,
            formDataProceedSubmitPressOnICF.BAvgY,
            formDataProceedSubmitPressOnICF.MCNo,
            formDataProceedSubmitPressOnICF.OperatorNameFinal,
            formDataProceedSubmitPressOnICF.InspectorNameFinal,
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
        link.setAttribute("download", "ICFPressOn.csv");
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
      };

  
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
              <th colSpan={1}>Wheel No.</th>
              <td colSpan={2}>{formDataProceedSubmitPressOnICF.WheelNo}</td>
              <th colSpan={1}>Wheel type:</th>
              <td colSpan={3}>{formDataProceedSubmitPressOnICF.WheelType}</td>
              <th colSpan={1}>Axle No.</th>
              <td colSpan={3}>{formDataProceedSubmitPressOnICF.AxleNo}</td>
            </tr>
          </thead>
          <tbody>
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
            <tr>
              <th colSpan={11}>Wheel disc 'A' side</th>
            </tr>
            <tr>
              <th colSpan={2}>VTL No:</th>
              <th colSpan={3}>Bore size By Operator :</th>
              <th colSpan={3}>RA Value(1.6 MAX)</th>
              <th colSpan={3}>Operator Name:</th>
            </tr>
            <tr>
              <td colSpan={2} rowSpan={2}>{formDataProceedSubmitPressOnICF.VTLNo}</td>
              <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.BoreSize}</td>
              <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.RAValue}</td>
              <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.OperatorNameA}</td>
            </tr>
            <tr></tr>
            <tr></tr>
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
            <tr></tr>
            <br></br>
            <tr>
              <th colSpan={11}>Wheel disc 'B' side</th>
            </tr>
            <tr>
              <th colSpan={2}>VTL No:</th>
              <th colSpan={3}>Bore size By Operator :</th>
              <th colSpan={3}>RA Value(1.6 MAX)</th>
              <th colSpan={3}>Operator Name:</th>
            </tr>
            <tr>
              <td colSpan={2} rowSpan={2}>{formDataProceedSubmitPressOnICF.VTLNoB}</td>
              <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.BoreSizeB}</td>
              <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.RAValueB}</td>
              <td colSpan={3} rowSpan={2}>{formDataProceedSubmitPressOnICF.OperatorNameB}</td>
            </tr>
            <tr></tr>
            <tr></tr>
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
            <br /><br />
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
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmitUpdatedPressOnICF;

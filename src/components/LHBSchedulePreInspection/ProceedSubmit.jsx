import React from "react";
// import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import "../../resources/LHB/preInspectionform/proceedsubmit.css";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ProceedSubmit = ({ formData, setFormData }) => {
  console.log("formdata:", formData);

  const handleNext = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/prelhb/data", formData);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormData((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 1,
        }));

        navigate("/viewallentry");
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
      const response = await postData("/prelhb/data", formData);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormData((prevformData) => ({
          ...Object.keys(prevformData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 1,
        }));

        navigate("/LHBSchedulePreInspection/details");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

    // Headers for Wheel Details
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:B2");
    worksheet.mergeCells("C1:C4");
    worksheet.mergeCells("D1:D4");
    worksheet.mergeCells("E1:E4");
    worksheet.mergeCells("F1:F4");
    worksheet.mergeCells("G1:G4");
    worksheet.mergeCells("H1:H4");
    worksheet.mergeCells("I1:I4");
    worksheet.mergeCells("J1:J4");
    worksheet.mergeCells("K1:K4");
    worksheet.mergeCells("L1:L4");

    worksheet.mergeCells("M1:M4");
    worksheet.mergeCells("N1:N4");
    worksheet.mergeCells("O1:O4");
    worksheet.mergeCells("P1:P4");
    worksheet.mergeCells("Q1:Q4");
    worksheet.mergeCells("R1:R4");
    worksheet.mergeCells("S1:S4");
    worksheet.mergeCells("T1:T4");
    worksheet.mergeCells("U1:U4");
    worksheet.mergeCells("V1:V4");
    worksheet.mergeCells("W1:W4");
    worksheet.mergeCells("X1:X4");
    worksheet.mergeCells("Y1:Y4");
    worksheet.mergeCells("Z1:Z4");
    worksheet.mergeCells("AA1:AA4");
    worksheet.mergeCells("AB1:AB4");
    worksheet.mergeCells("AC1:AC4");
    worksheet.mergeCells("AD1:AD4");
    worksheet.mergeCells("AE1:AE4");
    worksheet.mergeCells("AF1:AF4");
    worksheet.mergeCells("AG1:AG4");

    worksheet.mergeCells("M5:M8");
    worksheet.mergeCells("N5:N8");
    worksheet.mergeCells("O5:O8");
    worksheet.mergeCells("P5:P8");
    worksheet.mergeCells("Q5:Q8");
    worksheet.mergeCells("R5:R8");
    worksheet.mergeCells("S5:S8");
    worksheet.mergeCells("T5:T8");
    worksheet.mergeCells("U5:U8");
    worksheet.mergeCells("V5:V8");
    worksheet.mergeCells("W5:W8");
    worksheet.mergeCells("X5:X8");
    worksheet.mergeCells("Y5:Y8");
    worksheet.mergeCells("Z5:Z8");
    worksheet.mergeCells("AA5:AA8");
    worksheet.mergeCells("AB5:AB8");
    worksheet.mergeCells("AC5:AC8");
    worksheet.mergeCells("AD5:AD8");
    worksheet.mergeCells("AE5:AE8");
    worksheet.mergeCells("AF5:AF8");
    worksheet.mergeCells("AG5:AG8");

    worksheet.mergeCells("A3:A4");
    worksheet.mergeCells("B3:B4");
    worksheet.mergeCells("A5:A6");
    worksheet.mergeCells("B5:B6");
    worksheet.mergeCells("D5:D8");
    worksheet.mergeCells("E5:E8");
    worksheet.mergeCells("G5:G8");
    worksheet.mergeCells("H5:H8");
    worksheet.mergeCells("I5:I8");
    worksheet.mergeCells("A7:A8");
    worksheet.mergeCells("B7:B8");
    worksheet.mergeCells("C5:C8");
    worksheet.mergeCells("F5:F8");
    worksheet.mergeCells("J5:J8");
    worksheet.mergeCells("K5:K8");
    worksheet.mergeCells("L5:L8");
    worksheet.mergeCells(9, 1, 12, 2);
    worksheet.mergeCells("C9:C10");
    worksheet.mergeCells("C11:C12");
    worksheet.mergeCells(9, 4, 10, 32);
    worksheet.mergeCells(11, 4, 12, 32);
    worksheet.mergeCells(13, 1, 16, 2);
    worksheet.mergeCells(13, 4, 14, 32);
    worksheet.mergeCells("C13:C14");
    worksheet.mergeCells("C15:C16");
    worksheet.mergeCells(15, 4, 16, 32);

    worksheet.getRow(1).values = [
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
    worksheet.getRow(3).values = ["Axle No.", "Axle Condition"];
    worksheet.getRow(5).values = [
      formData.ShopSrNumber,
      formData.ReceiveDate,
      formData.CoachNumber,
      formData.DiameterINA,
      formData.DiameterINB,
      formData.FlageIN,
      formData.BDNumber,
      formData.BDMakeIN,
      formData.BDSizeIN,
      formData.BDThicknessA,
      formData.BDThicknessB,
      formData.BDDefect,
      formData.CTRBNumberA,
      formData.CTRBNumberB,
      formData.CTRBMakeA,
      formData.CTRBMakeB,
      formData.RefurbishmentDetailsA,
      formData.RefurbishmentDetailsB,
      formData.FitmentDate,
      formData.CTRBDefect,
      formData.CTRBDefectName,
      formData.CTRBStatusA,
      formData.CTRBStatusB,
      formData.CTRBRemainingLifeA,
      formData.CTRBRemainingLifeB,
      formData.CTRBRemarkA,
      formData.CTRBRemarkB,
      formData.RodGaugeIN,
      formData.SoundTestIN,
      formData.TypeOfRepair,
      formData.MatungaRemark,
      formData.InspectorName,
      formData.InspectorTicketNo,
    ];
    worksheet.getRow(7).values = [formData.AxleNumber, formData.AxleCondition];
    worksheet.getRow(9).values = [
      "Disc Particular",
      "",
      "A",
      formData.DiscParticularA,
    ];

    worksheet.getRow(11).values = ["", "", "B", formData.DiscParticularB];
    worksheet.getRow(13).values = ["CTRB", "", "A", formData.CTRBA];
    worksheet.getRow(15).values = ["", "", "B", formData.CTRBB];
    worksheet.eachRow({ includeEmpty: true }, (row) => {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = {
          wrapText: true,
          horizontal: "center",
          vertical: "middle",
        };
      });
    });

    //Bold Text

    worksheet.getCell("A1").font = { bold: true };
    worksheet.getCell("B1").font = { bold: true };
    worksheet.getCell("B3").font = { bold: true };
    worksheet.getCell("D1").font = { bold: true };
    worksheet.getCell("D3").font = { bold: true };
    worksheet.getCell("E1").font = { bold: true };
    worksheet.getCell("E3").font = { bold: true };
    worksheet.getCell("G1").font = { bold: true };
    worksheet.getCell("G3").font = { bold: true };
    worksheet.getCell("H1").font = { bold: true };
    worksheet.getCell("H3").font = { bold: true };
    worksheet.getCell("I1").font = { bold: true };
    worksheet.getCell("I3").font = { bold: true };
    worksheet.getCell("F1").font = { bold: true };
    worksheet.getCell("C1").font = { bold: true };
    worksheet.getCell("J1").font = { bold: true };
    worksheet.getCell("K1").font = { bold: true };
    worksheet.getCell("L1").font = { bold: true };

    worksheet.getCell("M1").font = { bold: true };
    worksheet.getCell("N1").font = { bold: true };
    worksheet.getCell("O1").font = { bold: true };
    worksheet.getCell("P1").font = { bold: true };
    worksheet.getCell("Q1").font = { bold: true };
    worksheet.getCell("R1").font = { bold: true };
    worksheet.getCell("S1").font = { bold: true };
    worksheet.getCell("T1").font = { bold: true };
    worksheet.getCell("U1").font = { bold: true };
    worksheet.getCell("V1").font = { bold: true };

    worksheet.getCell("A3").font = { bold: true };
    worksheet.getCell("C3").font = { bold: true };
    worksheet.getCell("E3").font = { bold: true };
    worksheet.getCell("G3").font = { bold: true };
    worksheet.getCell("I3").font = { bold: true };

    worksheet.getCell("A9").font = { bold: true };
    worksheet.getCell("A13").font = { bold: true };
    worksheet.getCell("C9").font = { bold: true };
    worksheet.getCell("C11").font = { bold: true };
    worksheet.getCell("C13").font = { bold: true };
    worksheet.getCell("C15").font = { bold: true };
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
    const body = [
      [
        { content: handleNullValue(formData.ShopSrNumber), rowSpan: 1 }, // Data for Shop Sr. No.
        { content: handleNullValue(formData.ReceiveDate), rowSpan: 1 }, // All other data with rowSpan 2
        { content: handleNullValue(formData.CoachNumber), rowSpan: 2 },
        { content: handleNullValue(formData.DiameterINA), rowSpan: 2 },
        { content: handleNullValue(formData.DiameterINB), rowSpan: 2 },
        { content: handleNullValue(formData.FlageIN), rowSpan: 2 },
        { content: handleNullValue(formData.BDNumber), rowSpan: 2 },
        { content: handleNullValue(formData.BDMakeIN), rowSpan: 2 },
        { content: handleNullValue(formData.BDSizeIN), rowSpan: 2 },
        { content: handleNullValue(formData.BDThicknessA), rowSpan: 2 },
        { content: handleNullValue(formData.BDThicknessB), rowSpan: 2 },
        { content: handleNullValue(formData.BDDefect), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBNumberA), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBNumberB), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBMakeA), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBMakeB), rowSpan: 2 },
        {
          content: handleNullValue(formData.RefurbishmentDetailsA),
          rowSpan: 2,
        },
        {
          content: handleNullValue(formData.RefurbishmentDetailsB),
          rowSpan: 2,
        },
        { content: handleNullValue(formData.FitmentDate), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBDefect), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBDefectName), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBStatusA), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBStatusB), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBRemainingLifeA), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBRemainingLifeB), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBRemarkA), rowSpan: 2 },
        { content: handleNullValue(formData.CTRBRemarkB), rowSpan: 2 },
        { content: handleNullValue(formData.RodGaugeIN), rowSpan: 2 },
        { content: handleNullValue(formData.SoundTestIN), rowSpan: 2 },
        { content: handleNullValue(formData.TypeOfRepair), rowSpan: 2 },
        { content: handleNullValue(formData.MatungaRemark), rowSpan: 2 },
        { content: handleNullValue(formData.InspectorName), rowSpan: 2 },
        { content: handleNullValue(formData.InspectorTicketNo), rowSpan: 2 },
      ],
      [
        // Second subrow data for Shop Sr. No. and Axle No.
        { content: handleNullValue(formData.AxleNumber), rowSpan: 1 }, // Data for Shop Sr. No.
        { content: handleNullValue(formData.AxleCondition), rowSpan: 1 }, // Data for Axle No.
      ],
      // Subrows for "Disc Particular"
      [
        {
          content: "Disc Particular",
          rowSpan: 2,
          colSpan: 2,
        }, // Main Header for Disc Particular
        { content: "A" }, // Subheader A
        { content: handleNullValue(formData.DiscParticularA), colSpan: 30 }, // Data for Disc Particular A
      ],
      [
        { content: "B" }, // Subheader B
        { content: handleNullValue(formData.DiscParticularB), colSpan: 30 }, // Data for Disc Particular B
      ],
      // Subrows for "CTRB"
      [
        {
          content: "CTRB",
          rowSpan: 2,
          colSpan: 2,
        }, // Main Header for CTRB
        { content: "A" }, // Subheader A
        { content: handleNullValue(formData.CTRBA), colSpan: 30 }, // Data for CTRB A
      ],
      [
        { content: "B" }, // Subheader B
        { content: handleNullValue(formData.CTRBB), colSpan: 30 }, // Data for CTRB B
      ],
    ];

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
    const rows = [
      [
        formData.ShopSrNumber,
        formData.AxleNumber,
        formData.ReceiveDate,
        formData.AxleCondition,
        formData.CoachNumber,
        formData.DiameterINA,
        formData.DiameterINB,
        formData.BDMakeIN,
        formData.BDThicknessA,
        formData.BDThicknessB,
        formData.BDDefect,
        formData.CTRBNumberA,
        formData.CTRBNumberB,
        formData.CTRBMakeA,
        formData.CTRBMakeB,
        formData.RefurbishmentDetailsA,
        formData.RefurbishmentDetailsB,
        formData.FitmentDate,
        formData.CTRBDefectA,
        formData.CTRBDefectB,
        formData.CTRBDefectNameA,
        formData.CTRBDefectNameB,
        formData.CTRBStatusA,
        formData.CTRBStatusB,
        formData.CTRBRemainingLifeA,
        formData.CTRBRemainingLifeB,
        formData.CTRBRemarkA,
        formData.CTRBRemarkB,
        formData.RodGaugeIN,
        formData.SoundTestINA,
        formData.SoundTestINB,
        formData.TypeOfRepair,
        formData.MatungaRemark,
        formData.InspectorName,
        formData.InspectorTicketNo,
        formData.DiscParticularA,
        formData.DiscParticularB,
       
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
    link.setAttribute("download", "LHBSchedulePreInspection.csv");
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
          <tbody>
            <tr>
              <td rowSpan="">{formData.ShopSrNumber}</td>
              <td rowSpan="">{formData.ReceiveDate}</td>
              <td rowSpan="2">{formData.CoachNumber}</td>
              <td rowSpan="2">{formData.DiameterINA}</td>
              <td rowSpan="2">{formData.DiameterINB}</td>
              <td rowSpan="2">{formData.BDMakeIN}</td>
              <td rowSpan="2">{formData.BDThicknessA}</td>
              <td rowSpan="2">{formData.BDThicknessB}</td>
              <td rowSpan="2">{formData.BDDefect}</td>

              <td rowSpan="2">{formData.CTRBMakeA}</td>
              <td rowSpan="2">{formData.CTRBMakeB}</td>
              <td rowSpan="2">{formData.RefurbishmentDetailsA}</td>
              <td rowSpan="2">{formData.RefurbishmentDetailsB}</td>
              <td rowSpan="2">{formData.FitmentDate}</td>
              <td rowSpan="2">{formData.CTRBDefectA}</td>
              <td rowSpan="2">{formData.CTRBDefectNameA}</td>
              <td rowSpan="2">{formData.CTRBDefectB}</td>
              <td rowSpan="2">{formData.CTRBDefectNameB}</td>
              <td rowSpan="2">{formData.CTRBStatusA}</td>
              <td rowSpan="2">{formData.CTRBStatusB}</td>
              <td rowSpan="2">{formData.CTRBRemainingLifeA}</td>
              <td rowSpan="2">{formData.CTRBRemainingLifeB}</td>
              <td rowSpan="2">{formData.CTRBRemarkA}</td>
              <td rowSpan="2">{formData.CTRBRemarkB}</td>

              <td rowSpan="2">{formData.RodGaugeIN}</td>
              <td rowSpan="2">{formData.SoundTestINA}</td>
              <td rowSpan="2">{formData.SoundTestINB}</td>
              <td rowSpan="2">{formData.TypeOfRepair}</td>
              <td rowSpan="2">{formData.MatungaRemark}</td>
              <td rowSpan="2">{formData.InspectorName}</td>
              <td rowSpan="2">{formData.InspectorTicketNo}</td>
            </tr>
            <tr>
              <td rowSpan="">{formData.AxleNumber}</td>
              <td rowSpan="">{formData.AxleCondition}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>
                Disc Particular
              </th>
              <th colSpan="">A</th>
              <td colSpan="28">{formData.DiscParticularA}</td>
            </tr>
            <tr>
              <th rowSpan="" colSpan="">
                B
              </th>
              <td colSpan="28">{formData.DiscParticularB}</td>
            </tr>
            <tr>
              <th rowSpan="2" colSpan={2}>
                CTRB
              </th>
              <th colSpan="">A</th>
              <td colSpan="28">{formData.CTRBNumberA}</td>
            </tr>
            <tr>
              <th rowSpan="">B</th>
              <td colSpan="28">{formData.CTRBNumberB}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProceedSubmit;

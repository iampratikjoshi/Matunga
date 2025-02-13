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
        const response = await api.get("/api/getalldata");
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
    const workshopName = localStorage.getItem('selectedWorkshop') || 'Unknown Workshop';

    const loginInfo = localStorage.getItem('loggedInUser')
      ? `${localStorage.getItem('loggedInUser')}` : 'Unknown';
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBFinalInspection");

    worksheet.columns = [
      { header: "Axle No.", key: "AxleNo", width: 10 },
      { header: "Wheel Size", key: "WheelSize", width: 30 },
      { header: "Wheel Dia A", key: "WheelDiaA", width: 10 },
      { header: "Wheel Dia B", key: "WheelDiaB", width: 10 },
      { header: "RG", key: "WheelRG", width: 10 },
      { header: "FLG", key: "WheelFLG", width: 10 },
      { header: "Journal Size", key: "JournalSize", width: 30 },
      { header: "Jr.Size A", key: "SizeA", width: 10 },
      { header: "Jr.Size B", key: "SizeB", width: 10 },
      { header: "Jr.Oval A", key: "OvalA", width: 10 },
      { header: "Jr.Oval B", key: "OvalB", width: 10 },
      { header: "Jr.Tap A", key: "TapA", width: 10 },
      { header: "Jr.Tap B", key: "TapB", width: 10 },
      { header: "Shoulder Size A", key: "ShoulderSizeA", width: 15 },
      { header: "Shoulder Size B", key: "ShoulderSizeB", width: 15 },
      { header: "Jr. Waiviness A", key: "JrWaivinessA", width: 15 },
      { header: "Jr. Waiviness A", key: "JrWaivinessB", width: 15 },
      { header: "Disc Particular A", key: "DiscParticularA", width: 10 },
      { header: "Disc Particular B", key: "DiscParticularB", width: 10 },
      { header: "BD Make", key: "BDMake", width: 15 },
      { header: "BD Size A", key: "BDSizeA", width: 10 },
      { header: "BD Size B", key: "BDSizeB", width: 10 },
      { header: "End Hole A", key: "EndHoleA", width: 10 },
      { header: "End Hole B", key: "EndHoleB", width: 10 },
      { header: "MEP A", key: "MEPA", width: 10 },
      { header: "MEP B", key: "MEPB", width: 10 },
      { header: "UST Name", key: "USTName", width: 15 },
      { header: "Fitting Dt.", key: "FittingDt", width: 15 },
      { header: "ECA Test", key: "ECATest", width: 10 },
      { header: "Insp. Name", key: "InspectorName", width: 15 },
      { header: "Insp. Ticket No", key: "InspectorTicketNo", width: 15 },
      { header: "Shift", key: "Shift", width: 10 },
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "CTRB No. A", key: "CTRBNumberA", width: 10 },
      { header: "CTRB No. B", key: "CTRBNumberB", width: 10 },
      { header: "CTRB Make A", key: "CTRBMakeA", width: 10 },
      { header: "CTRB Make B", key: "CTRBMakeB", width: 10 },
      { header: "CTRB Status A", key: "CTRBStatusA", width: 10 },
      { header: "CTRB Status B", key: "CTRBStatusB", width: 10 },
      { header: "CTRB Remark A", key: "CTRBRemarkA", width: 10 },
      { header: "CTRB Remark B", key: "CTRBRemarkB", width: 10 },
      { header: "CTRB Defect A", key: "CTRBDefectA", width: 10 },
      { header: "CTRB Defect B", key: "CTRBDefectB", width: 10 },
      { header: "CTRB Defect Name A", key: "CTRBDefectNameA", width: 10 },
      { header: "CTRB Defect Name B", key: "CTRBDefectNameB", width: 10 },
      { header: "Refurbishment Details A", key: "RefurbishmentDetailsA", width: 10 },
      { header: "Refurbishment Details B", key: "RefurbishmentDetailsB", width: 10 },
      { header: "CTRB Remaining Life A", key: "CTRBRemainingLifeA", width: 10 },
      { header: "CTRB Remaining Life B", key: "CTRBRemainingLifeB", width: 10 },
      { header: "Wheel Tread UST", key: "WheelTreadUST", width: 10 },
      { header: "Workshop Name", key: "workshopName", width: 10 },
      { header: "Logged in as", key: "loginInfo", width: 10 },
      { header: "Time of Export", key: "formattedDate", width: 10 },
    ];

    // Add the header rows
    worksheet.getRow(1).values = [
      "Axle No.",
      "Wheel Size",
      "",
      "",
      "",
      "Journal Size",
      "",
      "",
      "",
      "",
      "",
      "Shoulder Size A",
      "Shoulder Size B",
      "Jr. Waiviness A",
      "Jr. Waiviness B",
      "Disc Particular A",
      "Disc Particular B",
      "BD Make",
      "BD Size A",
      "BD Size B",
      "End Hole A",
      "End Hole B",
      "MEP A",
      "MEP B",
      "UST Name",
      "Fitting Dt.",
      "ECA Test",
      "Insp. Name",
      "Insp. Ticket No.",
      "Shift",
      "Wheel No.",
      "CTRB No. A",
      "CTRB No. B",
      "CTRB Make A",
      "CTRB Make B",
      "CTRB Status A",
      "CTRB Status B",
      "CTRB Defect A",
      "CTRB Defect B",
      "CTRB Defect Name A",
      "CTRB Defect Name B",
      "CTRB Remark A",
      "CTRB Remark B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "CTRB Remaining Life A",
      "CTRB Remaining Life B",
      "Wheel Tread UST",
      "Workshop Name",
      "Logged in as",
      "Time of Export",
    ];

    worksheet.getRow(2).values = [
      "",
      "Wheel Dia A",
      "Wheel Dia B",
      "RG",
      "FLG",
      "Jr. Size A",
      "Jr. Size B",
      "Jr. Oval A",
      "Jr. Oval B",
      "Jr. Tap A",
      "Jr. Tap B",
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
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    // Define the main headers and subheaders (optional for visual layout)
    worksheet.mergeCells("A1:A2");
    worksheet.mergeCells("B1:E1");
    worksheet.mergeCells("F1:K1");
    worksheet.mergeCells("L1:L2");
    worksheet.mergeCells("M1:M2");
    worksheet.mergeCells("N1:N2");
    worksheet.mergeCells("O1:O2");
    worksheet.mergeCells("P1:P2");
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
    worksheet.mergeCells("AM1:AM2");
    worksheet.mergeCells("AN1:AN2");
    worksheet.mergeCells("AO1:AO2");
    worksheet.mergeCells("AP1:AP2");
    worksheet.mergeCells("AQ1:AQ2");
    worksheet.mergeCells("AR1:AR2");
    worksheet.mergeCells("AS1:AS2");
    worksheet.mergeCells("AT1:AT2");
    worksheet.mergeCells("AU1:AU2");
    worksheet.mergeCells("AV1:AV2");
    worksheet.mergeCells("AW1:AW2");
    worksheet.mergeCells("AX1:AX2");
    worksheet.mergeCells("AY1:AY2");
    // Apply styles to headers
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(2).font = { bold: true };
    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(2).alignment = {
      horizontal: "center",
      vertical: "middle",
    };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };
    worksheet.getRow(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D3D3D3" },
    };

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    // Apply border style to header row 1
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    // Apply border style to header row 2
    worksheet.getRow(2).eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length + 5;
    });

    // Adjust row height
    worksheet.getRow(1).height = 20;
    worksheet.getRow(2).height = 20;

    // Add data to worksheet
    data.forEach((item) => {
      worksheet.addRow({
        AxleNo: item.AxleNo,
        WheelSize: item.WheelDiaA,
        WheelDiaA: item.WheelDiaB,
        WheelDiaB: item.WheelRG,
        WheelRG: item.WheelFLG,
        WheelFLG: item.SizeA,
        JournalSize: item.SizeB,
        SizeA: item.OvalA,
        SizeB: item.OvalB,
        OvalA: item.TapA,
        OvalB: item.TapB,
        TapA: item.ShoulderSizeA,
        TapB: item.ShoulderSizeB,
        ShoulderSizeA: item.JrWaivinessA,
        ShoulderSizeB: item.JrWaivinessB,
        JrWaivinessA: item.DiscParticularA,
        JrWaivinessB: item.DiscParticularB,
        DiscParticularA: item.BDMake,
        DiscParticularB: item.BDSizeA,
        BDMake: item.BDSizeB,
        BDSizeA: item.EndHoleA,
        BDSizeB: item.EndHoleB,
        EndHoleA: item.MEPA,
        EndHoleB: item.MEPB,
        MEPA: item.USTName,
        MEPB: item.FittingDt,
        USTName: item.ECATest,
        FittingDt: item.InspectorName,
        ECATest: item.InspectorTicketNo,
        InspectorName: item.Shift,
        InspectorTicketNo: item.WheelNo,
        Shift: item.CTRBNumberA,
        WheelNo: item.CTRBNumberB,
        CTRBNumberA: item.CTRBMakeA,
        CTRBNumberB: item.CTRBMakeB,
        CTRBMakeA: item.CTRBStatusA,
        CTRBMakeB: item.CTRBStatusB,
        CTRBStatusA: item.RefurbishmentDetailsA,
        CTRBStatusB: item.RefurbishmentDetailsB,
        RefurbishmentDetailsA: item.CTRBDefectA,
        RefurbishmentDetailsB: item.CTRBDefectB,
        CTRBDefectA: item.CTRBDefectNameA,
        CTRBDefectB: item.CTRBDefectNameB,
        CTRBDefectNameA: item.CTRBRemarkA,
        CTRBDefectNameB: item.CTRBRemarkB,
        CTRBRemarkA: item.CTRBRemainingLifeA,
        CTRBRemarkB: item.CTRBRemainingLifeB,
        CTRBRemainingLifeA: item.WheelTreadUST,
        CTRBRemainingLifeB: workshopName,
        WheelTreadUST: loginInfo,
        workshopName: formattedDate,
      });
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "LHBFinalInspection.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const tableColumn = [
      [
        { content: "Wheel No.", rowSpan: 2 },
        { content: "Axle No.", rowSpan: 2 },
        { content: "Wheel Size", colSpan: 4 },
        { content: "Journal Size", colSpan: 6 },
        { content: "Shoulder Size A", rowSpan: 2 },
        { content: "Shoulder Size B", rowSpan: 2 },
        { content: "Jr. Waiviness A", rowSpan: 2 },
        { content: "Jr. Waiviness B", rowSpan: 2 },
        { content: "Disc Particular A", rowSpan: 2 },
        { content: "Disc Particular B", rowSpan: 2 },
        { content: "BD Make", rowSpan: 2 },
        { content: "BD Size A", rowSpan: 2 },
        { content: "BD Size B", rowSpan: 2 },
        { content: "End Hole A", rowSpan: 2 },
        { content: "End Hole B", rowSpan: 2 },
        { content: "MEP A", rowSpan: 2 },
        { content: "MEP B", rowSpan: 2 },
        { content: "UST Name", rowSpan: 2 },
        { content: "Fitting Dt.", rowSpan: 2 },
        { content: "ECA Test", rowSpan: 2 },
        { content: "Insp. Name", rowSpan: 2 },
        { content: "Insp. Ticket No.", rowSpan: 2 },
        { content: "Shift", rowSpan: 2 },
        { content: "CTRB No. A", rowSpan: 2 },
        { content: "CTRB No. B", rowSpan: 2 },
        { content: "CTRB Make A", rowSpan: 2 },
        { content: "CTRB Make B", rowSpan: 2 },
        { content: "CTRB Status A", rowSpan: 2 },
        { content: "CTRB Status B", rowSpan: 2 },
        { content: "CTRB Defect A", rowSpan: 2 },
        { content: "CTRB Defect B", rowSpan: 2 },
        { content: "CTRB Defect Name A", rowSpan: 2 },
        { content: "CTRB Defect Name A B", rowSpan: 2 },
        { content: "CTRB Remark A", rowSpan: 2 },
        { content: "CTRB Remark B", rowSpan: 2 },
        { content: "Refurbishment Details A", rowSpan: 2 },
        { content: "Refurbishment Details B", rowSpan: 2 },
        { content: "CTRB Remaining Life A", rowSpan: 2 },
        { content: "CTRB Remaining Life B", rowSpan: 2 },
        { content: "Wheel Tread UST", rowSpan: 2 },
      ],
      [
        { content: "Dia A" },
        { content: "Dia B" },
        { content: "RG" },
        { content: "FLG" },
        { content: "Jr. Size A" },
        { content: "Jr. Size B" },
        { content: "Jr. Oval A" },
        { content: "Jr. Oval B" },
        { content: "Jr. Tap A" },
        { content: "Jr. Tap B" },
      ],
    ];

    const tableRows = data;

    // AutoTable configuration 
    doc.autoTable({
      head: tableColumn,
      body: tableRows.map((row) => [
        row.WheelNo,
        row.AxleNo,
        row.WheelDiaA,
        row.WheelDiaB,
        row.WheelRG,
        row.WheelFLG,
        row.SizeA,
        row.SizeB,
        row.OvalA,
        row.OvalB,
        row.TapA,
        row.TapB,
        row.ShoulderSizeA,
        row.ShoulderSizeB,
        row.JrWaivinessA,
        row.JrWaivinessB,
        row.DiscParticularA,
        row.DiscParticularB,
        row.BDMake,
        row.BDSizeA,
        row.BDSizeB,
        row.EndHoleA,
        row.EndHoleB,
        row.MEPA,
        row.MEPB,
        row.USTName,
        row.FittingDt,
        row.ECATest,
        row.InspectorName,
        row.InspectorTicketNo,
        row.Shift,
        row.CTRBNumberA,
        row.CTRBNumberB,
        row.CTRBMakeA,
        row.CTRBMakeB,
        row.CTRBStatusA,
        row.CTRBStatusB,
        row.CTRBDefectA,
        row.CTRBDefectB,
        row.CTRBDefectNameA,
        row.CTRBDefectNameB,
        row.CTRBRemarkA,
        row.CTRBRemarkB,
        row.RefurbishmentDetailsA,
        row.RefurbishmentDetailsB,
        row.CTRBRemainingLifeA,
        row.CTRBRemainingLifeB,
        row.WheelTreadUST,
      ]),
      startX: 10,
      startY: 30,
      tableWidth: "auto",
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
        // Adjusting column widths to ensure the table fits on the page
        0: { cellWidth: 22 },
        1: { cellWidth: 18 },
        2: { cellWidth: 18 },
        3: { cellWidth: 18 },
        4: { cellWidth: 16 },
        5: { cellWidth: 16 },
        6: { cellWidth: 16 },
        7: { cellWidth: 16 },
        8: { cellWidth: 16 },
        9: { cellWidth: 16 },
        10: { cellWidth: 16 },
        11: { cellWidth: 16 },
        12: { cellWidth: 16 },
        13: { cellWidth: 16 },
        14: { cellWidth: 18 },
        15: { cellWidth: 18 },
        16: { cellWidth: 18 },
        17: { cellWidth: 16 },
        18: { cellWidth: 16 },
        19: { cellWidth: 16 },
        20: { cellWidth: 18 },
        21: { cellWidth: 18 },
        22: { cellWidth: 16 },
        23: { cellWidth: 16 },
        24: { cellWidth: 16 },
        25: { cellWidth: 22 },
        26: { cellWidth: 18 },
        27: { cellWidth: 16 },
        28: { cellWidth: 16 },
        29: { cellWidth: 16 },
        30: { cellWidth: 16 },
        31: { cellWidth: 16 },
        32: { cellWidth: 16 },
        33: { cellWidth: 16 },
        34: { cellWidth: 16 },
        35: { cellWidth: 16 },
        36: { cellWidth: 16 },
        37: { cellWidth: 16 },
        38: { cellWidth: 16 },
        39: { cellWidth: 16 },
        40: { cellWidth: 16 },
        41: { cellWidth: 16 },
        42: { cellWidth: 16 },
        43: { cellWidth: 16 },
        44: { cellWidth: 16 },
        45: { cellWidth: 16 },
        46: { cellWidth: 16 },
        47: { cellWidth: 16 },
      },
      margin: { top: 20, left: 10, right: 10 },
      didDrawPage: (data) => {
        // Add a title on the first page
        if (data.pageNumber === 1) {
          doc.setFontSize(12);
          doc.text(
            "LHB Final Inspection Report",
            data.settings.margin.left,
            20
          );
        }
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

    doc.save("LHB Final Inspection Form.pdf");
  };

  const exportToCSV = () => {
    // Define headers and subheaders
    const headers = [
      "Axle No.",
      "Wheel Dia A",
      "Wheel Dia A",
      "RG",
      "FLG",
      "Jr. Size A",
      "Jr. Size B",
      "Jr. Oval A",
      "Jr. Oval B",
      "Jr. Tap A",
      "Jr. Tap B",
      "Shoulder Size A",
      "Shoulder Size B",
      "Jr. Waiviness A",
      "Jr. Waiviness B",
      "Disc Particular A",
      "Disc Particular B",
      "BD Make",
      "BD Size A",
      "BD Size B",
      "End Hole A",
      "End Hole B",
      "MEP A",
      "MEP B",
      "UST Name",
      "Fitting Dt.",
      "ECA Test",
      "Insp. Name",
      "Insp. Ticket No.",
      "Shift",
      "Wheel No.",
      "CTRB No A",
      "CTRB No B",
      "CTRB Make A",
      "CTRB Make B",
      "CTRB Status A",
      "CTRB Status B",
      "CTRB Defect A",
      "CTRB Defect B",
      "CTRB Defect Name A",
      "CTRB Defect Name B",
      "CTRB Remark A",
      "CTRB Remark B",
      "Refurbishment Details A",
      "Refurbishment Details B",
      "CTRB Remaining Life A",
      "CTRB Remaining Life B",
      "Wheel Tread UST",
    ];

    // Construct the CSV rows with form data
    const rows = data.map((entry) => [
      entry.AxleNo,
      entry.WheelDiaA,
      entry.WheelDiaB,
      entry.WheelRG,
      entry.WheelFLG,
      entry.SizeA,
      entry.SizeB,
      entry.OvalA,
      entry.OvalB,
      entry.TapA,
      entry.TapB,
      entry.ShoulderSizeA,
      entry.ShoulderSizeB,
      entry.JrWaivinessA,
      entry.JrWaivinessB,
      entry.DiscParticularA,
      entry.DiscParticularB,
      entry.BDMake,
      entry.BDSizeA,
      entry.BDSizeB,
      entry.EndHoleA,
      entry.EndHoleB,
      entry.MEPA,
      entry.MEPB,
      entry.USTName,
      entry.FittingDt,
      entry.ECATest,
      entry.InspectorName,
      entry.InspectorTicketNo,
      entry.Shift,
      entry.WheelNo,
      entry.CTRBNumberA,
      entry.CTRBNumberB,
      entry.CTRBMakeA,
      entry.CTRBMakeB,
      entry.CTRBStatusA,
      entry.CTRBStatusB,
      entry.CTRBDefectA,
      entry.CTRBDefectB,
      entry.CTRBDefectNameA,
      entry.CTRBDefectNameB,
      entry.CTRBRemarkA,
      entry.CTRBRemarkB,
      entry.RefurbishmentDetailsA,
      entry.RefurbishmentDetailsB,
      entry.CTRBRemainingLifeA,
      entry.CTRBRemainingLifeB,
      entry.WheelTreadUST,
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
    link.setAttribute("download", "LHBFinalInspection.csv");
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
          onClick={() => navigate("/lhbfinalinspection/axle_details")}
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
              <th rowSpan="2">Axle No.</th>
              <th colSpan={4}>Wheel Size</th>
              <th colSpan={6}>Journal Size</th>
              <th rowSpan="2">Shoulder Size A</th>
              <th rowSpan="2">Shoulder Size B</th>
              <th rowSpan="2">Jr. Waiviness A</th>
              <th rowSpan="2">Jr. Waiviness B</th>
              <th rowSpan="2">Disc Particular A</th>
              <th rowSpan="2">Disc Particular B</th>
              <th rowSpan="2">BD Make</th>
              <th rowSpan="2">BD Size A</th>
              <th rowSpan="2">BD Size B</th>
              <th rowSpan="2">End Hole A</th>
              <th rowSpan="2">End Hole B</th>

              <th rowSpan="2">MEP A</th>
              <th rowSpan="2">MEP B</th>
              <th rowSpan="2">UST Name</th>
              <th rowSpan="2">Fitting Dt.</th>
              <th rowSpan="2">ECA Test</th>
              <th rowSpan="2">Insp. Name</th>
              <th rowSpan="2">Insp. Ticket No</th>
              <th rowSpan="2">Shift</th>
              <th rowSpan="2">Wheel No.</th>
              <th rowSpan="2">CTRB No. A</th>
              <th rowSpan="2">CTRB No. B</th>
              <th rowSpan="2">CTRB Make A</th>
              <th rowSpan="2">CTRB Make B</th>
              <th rowSpan="2">CTRB Status A</th>
              <th rowSpan="2">CTRB Status B</th>
              <th rowSpan="2">CTRB Defect A</th>
              <th rowSpan="2">CTRB Defect B</th>
              <th rowSpan="2">CTRB Defect Name A</th>
              <th rowSpan="2">CTRB Defect Name B</th>
              <th rowSpan="2">CTRB Remark A</th>
              <th rowSpan="2">CTRB Remark B</th>
              <th rowSpan="2">Refurbishment Details A</th>
              <th rowSpan="2">Refurbishment Details B</th>
              <th rowSpan="2">CTRB Remaining Life A</th>
              <th rowSpan="2">CTRB Remaining Life B</th>
              <th rowSpan="2">Wheel Tread UST</th>
            </tr>
            <tr>
              <th>Wheel Dia A</th>
              <th>Wheel Dia B</th>
              <th>RG</th>
              <th>FLG</th>
              <th>Jr. Size A</th>
              <th>Jr. Size B</th>
              <th>Jr. Oval A</th>
              <th>Jr. Oval B</th>
              <th>Jr. Tap A</th>
              <th>Jr. Tap B</th>
            </tr>
          </thead>

          {data.map((res) => (
            <tbody name="tbody" key={`tbody-${res.id}`}>
              <tr name="tr" key={`tr-${res.id}`}>
                <td rowSpan="2">{res.AxleNo}</td>
                <td colSpan={1}>{res.WheelDiaA}</td>
                <td colSpan={1}>{res.WheelDiaB}</td>
                <td colSpan={1}>{res.WheelRG}</td>
                <td colSpan={1}>{res.WheelFLG}</td>
                <td colSpan={1}>{res.SizeA}</td>
                <td colSpan={1}>{res.SizeB}</td>
                <td colSpan={1}>{res.OvalA}</td>
                <td colSpan={1}>{res.OvalB}</td>
                <td colSpan={1}>{res.TapA}</td>
                <td colSpan={1}>{res.TapB}</td>
                <td rowSpan="2">{res.ShoulderSizeA}</td>
                <td rowSpan="2">{res.ShoulderSizeB}</td>
                <td rowSpan="2">{res.JrWaivinessA}</td>
                <td rowSpan="2">{res.JrWaivinessB}</td>
                <td rowSpan="2">{res.DiscParticularA}</td>
                <td rowSpan="2">{res.DiscParticularB}</td>
                <td rowSpan="2">{res.BDMake}</td>
                <td rowSpan="2">{res.BDSizeA}</td>
                <td rowSpan="2">{res.BDSizeB}</td>
                <td rowSpan="2">{res.EndHoleA}</td>
                <td rowSpan="2">{res.EndHoleB}</td>

                <td rowSpan="2">{res.MEPA}</td>
                <td rowSpan="2">{res.MEPB}</td>
                <td rowSpan="2">{res.USTName}</td>
                <td rowSpan="2">{res.FittingDt}</td>
                <td rowSpan="2">{res.ECATest}</td>
                <td rowSpan="2">{res.InspectorName}</td>
                <td rowSpan="2">{res.InspectorTicketNo}</td>
                <td rowSpan="2">{res.Shift}</td>
                <td rowSpan="2">{res.WheelNo}</td>
                <td rowSpan="2">{res.CTRBNumberA}</td>
                <td rowSpan="2">{res.CTRBNumberB}</td>
                <td rowSpan="2">{res.CTRBMakeA}</td>
                <td rowSpan="2">{res.CTRBMakeB}</td>
                <td rowSpan="2">{res.CTRBStatusA}</td>
                <td rowSpan="2">{res.CTRBStatusB}</td>
                <td rowSpan="2">{res.CTRBDefectA}</td>
                <td rowSpan="2">{res.CTRBDefectB}</td>
                <td rowSpan="2">{res.CTRBDefectNameA}</td>
                <td rowSpan="2">{res.CTRBDefectNameB}</td>
                <td rowSpan="2">{res.CTRBRemarkA}</td>
                <td rowSpan="2">{res.CTRBRemarkB}</td>
                <td rowSpan="2">{res.RefurbishmentDetailsA}</td>
                <td rowSpan="2">{res.RefurbishmentDetailsB}</td>
                <td rowSpan="2">{res.CTRBRemainingLifeA}</td>
                <td rowSpan="2">{res.CTRBRemainingLifeB}</td>
                <td rowSpan="2">{res.WheelTreadUST}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default AllEntryFinal;

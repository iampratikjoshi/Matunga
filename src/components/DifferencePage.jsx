// import React, { useState } from "react";
// import "../resources/Search/search.css";
// import api from "./Axios/AxiosConnection";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";
// import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// // Register chart.js components
// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   CategoryScale,
//   LinearScale
// );

// const DifferencePage = () => {
//   // States to manage search input and results
//   const [differenceRange, setDifferenceRange] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [wheelTypeId, setWheelTypeId] = useState("");
//   const [results, setResults] = useState([]);
//   const [count0_0_2, setCount0_0_2] = useState(0);
//   const [count0_2_0_5, setCount0_2_0_5] = useState(0);
//   const [count0_5_above, setCount0_5_above] = useState(0);
//   const [totalForms, setTotalForms] = useState(0);

//   // Function to handle search button click
//   const handleSearch = async () => {
//     try {
//       setResults([]);
//       const params = {};
//       if (differenceRange) params.diffRange = differenceRange;
//       if (startDate) params.startDate = startDate;
//       if (endDate) params.endDate = endDate;
//       // if (stageName) params.stageName = stageName;

//       let apiEndpoint = ""; // Default API endpoint

//       if (wheelTypeId === "1") {
//         apiEndpoint = "/api/lhb/getdiameterdifferences";
//       } else if (wheelTypeId === "2") {
//         apiEndpoint = "/api/icf/getdiameterdifferences";
//       } else if (wheelTypeId === "4") {
//         apiEndpoint = "/api/emu/getdiameterdifferences";
//       }

//       // Call the API and pass the selected parameters
//       const response = await api.get(apiEndpoint, {
//         params,
//       });
//       console.log("Response :", response.data);

//       if (response.data) {
//         setResults(response.data.data); // Assign the data to results
//         setCount0_0_2(response.data.count_0_0_2);
//         setCount0_2_0_5(response.data.count_0_2_0_5);
//         setCount0_5_above(response.data.count_0_5_above);
//         setTotalForms(response.data.totalForms);

//         console.log("Result :", results);
//       } else {
//         setResults([]); // Clear the results if no data is found
//         setCount0_0_2(0);
//         setCount0_2_0_5(0);
//         setCount0_5_above(0);
//         setTotalForms(0);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setResults([]); // Clear results on error
//       setCount0_0_2(0);
//       setCount0_2_0_5(0);
//       setCount0_5_above(0);
//       setTotalForms(0);
//     }
//   };

//   // Prepare the chart data
//   const chartDataRange1 = {
//     labels: ["0 - 0.2 mm"],
//     datasets: [
//       {
//         data: [count0_0_2, totalForms - count0_0_2], // Count and the remaining total
//         backgroundColor: [
//           count0_0_2 === 0 ? "#D3D3D3" : "#36A2EB", // Gray if zero, blue if non-zero
//           "#E9E9E9", // Light gray for the remaining portion
//         ],
//         borderColor: ["#FFFFFF", "#FFFFFF"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartDataRange2 = {
//     labels: ["0.2 - 0.5 mm"],
//     datasets: [
//       {
//         data: [count0_2_0_5, totalForms - count0_2_0_5], // Count and the remaining total
//         backgroundColor: [
//           count0_2_0_5 === 0 ? "#D3D3D3" : "#FF6384", // Gray if zero, red if non-zero
//           "#E9E9E9", // Light gray for the remaining portion
//         ],
//         borderColor: ["#FFFFFF", "#FFFFFF"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartDataRange3 = {
//     labels: ["0.5 mm and above"],
//     datasets: [
//       {
//         data: [count0_5_above, totalForms - count0_5_above], // Count and the remaining total
//         backgroundColor: [
//           count0_5_above === 0 ? "#D3D3D3" : "#FFCD56", // Gray if zero, yellow if non-zero
//           "#E9E9E9", // Light gray for the remaining portion
//         ],
//         borderColor: ["#FFFFFF", "#FFFFFF"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart options
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const total = context.dataset.data.reduce(
//               (acc, value) => acc + value,
//               0
//             );
//             const percentage = ((context.raw / total) * 100).toFixed(2);
//             return `${context.label}: ${context.raw} (${percentage}%)`;
//           },
//         },
//       },
//     },
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF({
//       orientation: "landscape",
//       unit: "pt",
//       format: "a4",
//     });

//     const tableColumn = [
//       "Sr. No.",
//       "Wheel No.",
//       "Pre Inspection Diameter A",
//       "Final Inspection Diameter A",
//       "Difference of Diameter A",
//       "Pre Inspection Diameter B",
//       "Final Inspection Diameter B",
//       "Difference of Diameter B",
//       "Timestamp",
//     ];

//     const tableRows = results.map((item, index) => {
//       const [datePart, timePart] = item.createdDate.split("T");
//       const formattedDate = datePart.split("-").reverse().join("-");
//       const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

//       return [
//         index + 1,
//         item.WheelNo || item.ShopSrNumber,
//         item.DiameterINA,
//         item.WheelDiaA,
//         item.diffA,
//         item.DiameterINB,
//         item.WheelDiaB,
//         item.diffB,
//         formattedTimestamp,
//       ];
//     });

//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startX: 10,
//       startY: 30,
//       theme: "grid",
//       headStyles: {
//         fillColor: [240, 240, 240],
//         textColor: [0, 0, 0],
//         halign: "center",
//         valign: "middle",
//         fontSize: 6,
//         lineColor: [0, 0, 0],
//         lineWidth: 0.5,
//       },
//       styles: {
//         overflow: "linebreak",
//         fontSize: 6,
//         cellWidth: "wrap",
//         lineColor: [0, 0, 0],
//         lineWidth: 0.5,
//       },
//     });

//     doc.save("Diameter Difference Result.pdf");
//   };

//   const exportToExcel = async () => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("LHBFinalInspection");

//     worksheet.columns = [
//       { header: "Sr. No.", key: "SrNo", width: 10 },
//       { header: "Wheel No.", key: "WheelNo", width: 10 },
//       { header: "Pre Inspection Diameter A", key: "DiameterINA", width: 20 },
//       { header: "Final Inspection Diameter A", key: "WheelDiaA", width: 20 },
//       { header: "Difference of Diameter A", key: "diffA", width: 20 },
//       { header: "Pre Inspection Diameter B", key: "DiameterINB", width: 20 },
//       { header: "Final Inspection Diameter B", key: "WheelDiaB", width: 20 },
//       { header: "Difference of Diameter B", key: "diffB", width: 20 },
//       { header: "Timestamp", key: "Timestamp", width: 20 },
//     ];

//     const headerRow = worksheet.getRow(1);
//     headerRow.font = { bold: true };
//     headerRow.fill = {
//       type: "pattern",
//       pattern: "solid",
//       fgColor: { argb: "F0F0F0" },
//     };
//     headerRow.alignment = { horizontal: "center", vertical: "middle" };

//     const borderStyle = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };

//     headerRow.eachCell({ includeEmpty: true }, (cell) => {
//       cell.border = borderStyle;
//     });

//     results.forEach((item, index) => {
//       const [datePart, timePart] = item.createdDate.split("T");
//       const formattedDate = datePart.split("-").reverse().join("-");
//       const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

//       const row = worksheet.addRow({
//         SrNo: index + 1,
//         WheelNo: item.WheelNo || item.ShopSrNumber,
//         DiameterINA: item.DiameterINA,
//         WheelDiaA: item.WheelDiaA,
//         diffA: item.diffA,
//         DiameterINB: item.DiameterINB,
//         WheelDiaB: item.WheelDiaB,
//         diffB: item.diffB,
//         Timestamp: formattedTimestamp,
//       });

//       row.eachCell({ includeEmpty: true }, (cell) => {
//         cell.alignment = { horizontal: "center", vertical: "middle" };
//         cell.border = borderStyle;
//       });
//     });

//     const buffer = await workbook.xlsx.writeBuffer();
//     const blob = new Blob([buffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });
//     saveAs(blob, "Diameter Difference Result.xlsx");
//   };

//   const exportToCSV = async () => {
//     const headers = [
//       "Sr. No.",
//       "Wheel No.",
//       "Pre Inspection Diameter A",
//       "Final Inspection Diameter A",
//       "Difference of Diameter A",
//       "Pre Inspection Diameter B",
//       "Final Inspection Diameter B",
//       "Difference of Diameter B",
//       "Timestamp",
//     ];

//     let csvContent = headers.join(",") + "\n";

//     results.forEach((item, index) => {
//       const [datePart, timePart] = item.createdDate.split("T");
//       const formattedDate = datePart.split("-").reverse().join("-");
//       const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

//       const row = [
//         index + 1,
//         item.WheelNo || item.ShopSrNumber,
//         item.DiameterINA,
//         item.WheelDiaA,
//         item.diffA,
//         item.DiameterINB,
//         item.WheelDiaB,
//         item.diffB,
//         formattedTimestamp,
//       ];

//       csvContent += row.map((value) => `"${value}"`).join(",") + "\n";
//     });

//     const blob = new Blob([csvContent], {
//       type: "text/csv;charset=utf-8;",
//     });
//     saveAs(blob, "Diameter Difference Result.csv");
//   };

//   return (
//     <div>
//       <div className="search-div">
//         <div className="search-diff-container">
//           <label>Difference Range</label>
//           <select onChange={(e) => setDifferenceRange(e.target.value)}>
//             <option value="">Select Difference Range</option>
//             <option value="1">0 mm - 0.2 mm</option>
//             <option value="2">0.2 mm - 0.5 mm</option>
//             <option value="3">0.5 mm and above</option>
//           </select>
//         </div>
//         <div className="search-diff-container">
//           <label>Start Date</label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>
//         <div className="search-diff-container">
//           <label>End Date</label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>
//         <div className="search-diff-container">
//           <label>Type of Wheel :</label>
//           <select
//             value={wheelTypeId}
//             onChange={(e) => setWheelTypeId(e.target.value)}
//           >
//             <option value="">Select Type Of Wheel</option>
//             <option value="1">LHB</option>
//             <option value="4">EMU</option>
//             <option value="2">ICF</option>
//           </select>
//         </div>
//         <div>
//           <button className="search-btn" onClick={handleSearch}>
//             Search
//           </button>
//         </div>
//       </div>

//       <h1>Diameter Difference of Wheels</h1>
//       <div className="table-container">
//         {results.length > 0 ? (
//           <div className="table_div">
//             <div className="button_div">
//               <button
//                 className="export-btn"
//                 onClick={exportToPDF}
//                 disabled={results.length === 0}
//               >
//                 Export to PDF
//               </button>
//               <button
//                 className="export-btn"
//                 onClick={exportToExcel}
//                 disabled={results.length === 0}
//               >
//                 Export to Excel
//               </button>
//               <button
//                 className="export-btn"
//                 onClick={exportToCSV}
//                 disabled={results.length === 0}
//               >
//                 Export to CSV
//               </button>
//             </div>
//             <table className="results-table">
//               <thead>
//                 <tr>
//                   <th>Wheel No.</th>
//                   <th>Pre Inspection Diameter A</th>
//                   <th>Final Inspection Diameter A</th>
//                   <th>Difference of Diameter A</th>
//                   <th>Pre Inspection Diameter B</th>
//                   <th>Final Inspection Diameter B</th>
//                   <th>Difference of Diameter B</th>
//                   <th>TimeStamp</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {results.map((item, index) => {
//                   const [datePart, timePart] = item.createdDate.split("T");
//                   const formattedDate = datePart.split("-").reverse().join("-");
//                   const formattedTimestamp = `${formattedDate} ${timePart.slice(
//                     0,
//                     8
//                   )}`;

//                   return (
//                     <tr key={item.wheelid}>
//                       <td>{item.WheelNo}</td>
//                       <td>{item.DiameterINA}</td>
//                       <td>{item.WheelDiaA}</td>
//                       <td style={{ backgroundColor: "#a3b8f1" }}>
//                         {item.diffA}
//                       </td>
//                       <td>{item.DiameterINB}</td>
//                       <td>{item.WheelDiaB}</td>
//                       <td style={{ backgroundColor: "#a3b8f1" }}>
//                         {item.diffB}
//                       </td>
//                       <td>{formattedTimestamp}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p style={{ textAlign: "center" }}>No results found</p>
//         )}
//       </div>
//       {results.length > 0 ? (
//         <div
//           className="chart-container"
//           style={{
//             display: "flex",
//             justifyContent: "space-around",
//             alignItems: "center", // Vertically center the content in the container
//           }}
//         >
//           <div
//             className="chart-box"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <h3>0 - 0.2 mm</h3>
//             <Doughnut data={chartDataRange1} options={chartOptions} />
//           </div>
//           <div
//             className="chart-box"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <h3>0.2 mm - 0.5 mm</h3>
//             <Doughnut data={chartDataRange2} options={chartOptions} />
//           </div>
//           <div
//             className="chart-box"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <h3>0.5 mm and above</h3>
//             <Doughnut data={chartDataRange3} options={chartOptions} />
//           </div>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default DifferencePage;

import React, { useState } from "react";
import "../resources/differencePage/differencePage.css";
import api from "./Axios/AxiosConnection";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const DifferencePage = () => {
  const [differenceRange, setDifferenceRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [wheelTypeId, setWheelTypeId] = useState("1");
  const [results, setResults] = useState([]);
  const [count0_0_2, setCount0_0_2] = useState(0);
  const [count0_2_0_5, setCount0_2_0_5] = useState(0);
  const [count0_5_above, setCount0_5_above] = useState(0);
  const [totalForms, setTotalForms] = useState(0);

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      setResults([]);
      const params = {};
      if (differenceRange) params.diffRange = differenceRange;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      let apiEndpoint = ""; // Default API endpoint

      if (wheelTypeId === "1") {
        apiEndpoint = "/api/lhb/getdiameterdifferences";
      } else if (wheelTypeId === "2") {
        apiEndpoint = "/api/icf/getdiameterdifferences";
      } else if (wheelTypeId === "4") {
        apiEndpoint = "/api/emu/getdiameterdifferences";
      }else if (wheelTypeId === "3") {
        apiEndpoint = "/api/vb/getdiameterdifferences";
      }

      // Call the API and pass the selected parameters
      const response = await api.get(apiEndpoint, {
        params,
      });
      console.log("Response :", response.data);

      if (response.data) {
        setResults(response.data.data); // Assign the data to results
        setCount0_0_2(response.data.count_0_0_2);
        setCount0_2_0_5(response.data.count_0_2_0_5);
        setCount0_5_above(response.data.count_0_5_above);
        setTotalForms(response.data.totalForms);

        console.log("Result :", results);
      } else {
        setResults([]); // Clear the results if no data is found
        setCount0_0_2(0);
        setCount0_2_0_5(0);
        setCount0_5_above(0);
        setTotalForms(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]); // Clear results on error
      setCount0_0_2(0);
      setCount0_2_0_5(0);
      setCount0_5_above(0);
      setTotalForms(0);
    }
  };

  // Prepare the chart data
  const chartDataRange1 = {
    labels: ["0 - 0.2 mm"],
    datasets: [
      {
        data: [count0_0_2, totalForms - count0_0_2],
        backgroundColor: [
          count0_0_2 === 0 ? "#D3D3D3" : "#36A2EB",
          "#E9E9E9",
        ],
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          ticks: {
            color: "#FFFFFF", // White color for the x-axis tick labels
          },
          grid: {
            color: "#FFFFFF", // White grid lines
          },
        },
        y: {
          ticks: {
            color: "#FFFFFF", // White color for the y-axis tick labels
          },
          grid: {
            color: "#FFFFFF", // White grid lines
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#FFFFFF", // White color for the legend labels
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce(
                (acc, value) => acc + value,
                0
              );
              const percentage = ((context.raw / total) * 100).toFixed(2);
              return `${context.label}: ${context.raw} (${percentage}%)`;
            },
          },
        },
      },
    },
  };
  
  const chartDataRange2 = {
    labels: ["0.2 - 0.5 mm"],
    datasets: [
      {
        data: [count0_2_0_5, totalForms - count0_2_0_5],
        backgroundColor: [
          count0_2_0_5 === 0 ? "#D3D3D3" : "#FF6384",
          "#E9E9E9",
        ],
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          ticks: {
            color: "#FFFFFF", // White color for the x-axis tick labels
          },
          grid: {
            color: "#FFFFFF", // White grid lines
          },
        },
        y: {
          ticks: {
            color: "#FFFFFF", // White color for the y-axis tick labels
          },
          grid: {
            color: "#FFFFFF", // White grid lines
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#FFFFFF", // White color for the legend labels
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce(
                (acc, value) => acc + value,
                0
              );
              const percentage = ((context.raw / total) * 100).toFixed(2);
              return `${context.label}: ${context.raw} (${percentage}%)`;
            },
          },
        },
      },
    },
  };
  
  const chartDataRange3 = {
    labels: ["0.5 mm and above"],
    datasets: [
      {
        data: [count0_5_above, totalForms - count0_5_above],
        backgroundColor: [
          count0_5_above === 0 ? "#D3D3D3" : "#FFCD56",
          "#E9E9E9",
        ],
        borderColor: ["#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          ticks: {
            color: "#FFFFFF", // White color for the x-axis tick labels
          },
          grid: {
            color: "#FFFFFF", // White grid lines
          },
        },
        y: {
          ticks: {
            color: "#FFFFFF", // White color for the y-axis tick labels
          },
          grid: {
            color: "#FFFFFF", // White grid lines
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#FFFFFF", // White color for the legend labels
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const total = context.dataset.data.reduce(
                (acc, value) => acc + value,
                0
              );
              const percentage = ((context.raw / total) * 100).toFixed(2);
              return `${context.label}: ${context.raw} (${percentage}%)`;
            },
          },
        },
      },
    },
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#FFFFFF", // White color for the legend labels
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce(
              (acc, value) => acc + value,
              0
            );
            const percentage = ((context.raw / total) * 100).toFixed(2);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          },
        },
      },
    },
  };
  

  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    const tableColumn = [
      "Sr. No.",
      "Wheel No.",
      "Pre Inspection Diameter A",
      "Final Inspection Diameter A",
      "Difference of Diameter A",
      "Pre Inspection Diameter B",
      "Final Inspection Diameter B",
      "Difference of Diameter B",
      "Timestamp",
    ];

    const tableRows = results.map((item, index) => {
      const [datePart, timePart] = item.createdDate.split("T");
      const formattedDate = datePart.split("-").reverse().join("-");
      const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

      return [
        index + 1,
        item.WheelNo || item.ShopSrNumber,
        item.DiameterINA,
        item.WheelDiaA,
        item.diffA,
        item.DiameterINB,
        item.WheelDiaB,
        item.diffB,
        formattedTimestamp,
      ];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startX: 10,
      startY: 30,
      theme: "grid",
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: [0, 0, 0],
        halign: "center",
        valign: "middle",
        fontSize: 6,
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
      },
      styles: {
        overflow: "linebreak",
        fontSize: 6,
        cellWidth: "wrap",
        lineColor: [0, 0, 0],
        lineWidth: 0.5,
      },
    });

    doc.save("Diameter Difference Result.pdf");
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("LHBFinalInspection");

    worksheet.columns = [
      { header: "Sr. No.", key: "SrNo", width: 10 },
      { header: "Wheel No.", key: "WheelNo", width: 10 },
      { header: "Pre Inspection Diameter A", key: "DiameterINA", width: 20 },
      { header: "Final Inspection Diameter A", key: "WheelDiaA", width: 20 },
      { header: "Difference of Diameter A", key: "diffA", width: 20 },
      { header: "Pre Inspection Diameter B", key: "DiameterINB", width: 20 },
      { header: "Final Inspection Diameter B", key: "WheelDiaB", width: 20 },
      { header: "Difference of Diameter B", key: "diffB", width: 20 },
      { header: "Timestamp", key: "Timestamp", width: 20 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "F0F0F0" },
    };
    headerRow.alignment = { horizontal: "center", vertical: "middle" };

    const borderStyle = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };

    headerRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = borderStyle;
    });

    results.forEach((item, index) => {
      const [datePart, timePart] = item.createdDate.split("T");
      const formattedDate = datePart.split("-").reverse().join("-");
      const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

      const row = worksheet.addRow({
        SrNo: index + 1,
        WheelNo: item.WheelNo || item.ShopSrNumber,
        DiameterINA: item.DiameterINA,
        WheelDiaA: item.WheelDiaA,
        diffA: item.diffA,
        DiameterINB: item.DiameterINB,
        WheelDiaB: item.WheelDiaB,
        diffB: item.diffB,
        Timestamp: formattedTimestamp,
      });

      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = borderStyle;
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Diameter Difference Result.xlsx");
  };

  const exportToCSV = async () => {
    const headers = [
      "Sr. No.",
      "Wheel No.",
      "Pre Inspection Diameter A",
      "Final Inspection Diameter A",
      "Difference of Diameter A",
      "Pre Inspection Diameter B",
      "Final Inspection Diameter B",
      "Difference of Diameter B",
      "Timestamp",
    ];

    let csvContent = headers.join(",") + "\n";

    results.forEach((item, index) => {
      const [datePart, timePart] = item.createdDate.split("T");
      const formattedDate = datePart.split("-").reverse().join("-");
      const formattedTimestamp = `${formattedDate} ${timePart.slice(0, 8)}`;

      const row = [
        index + 1,
        item.WheelNo || item.ShopSrNumber,
        item.DiameterINA,
        item.WheelDiaA,
        item.diffA,
        item.DiameterINB,
        item.WheelDiaB,
        item.diffB,
        formattedTimestamp,
      ];

      csvContent += row.map((value) => `"${value}"`).join(",") + "\n";
    });

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, "Diameter Difference Result.csv");
  };

  const formatedDate = (isoDate) => {
    // Split the date and time
    const [date, time] = isoDate.split("T");

    // Format the date to dd-mm-yyyy
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year}`;

    // Get the time without seconds
    const formattedTime = time.split(":").slice(0, 2).join(":");

    console.log(formattedDate + " " + formattedTime);
    const fullFormattedDateTime = `${formattedDate} ${formattedTime}`;

    return fullFormattedDateTime;
  };

  return (
    <div className="difference-page">
      <div className="search-div">
        <div className="search-diff-container search-diff-container-difference-range">
          <label htmlFor="difference-range">Difference Range</label>
          <select
            id="difference-range"
            onChange={(e) => setDifferenceRange(e.target.value)}
          >
            <option value="">Select Difference Range</option>
            <option value="1">0 mm - 0.2 mm</option>
            <option value="2">0.2 mm - 0.5 mm</option>
            <option value="3">0.5 mm and above</option>
          </select>
        </div>
        <div className="search-diff-container search-diff-container-start-date">
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="search-diff-container search-diff-container-end-date">
          <label htmlFor="end-date">End Date</label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="search-diff-container search-diff-container-wheel-type">
          <label htmlFor="wheel-type">Type of Wheel :</label>
          <select
            id="wheel-type"
            value={wheelTypeId}
            onChange={(e) => setWheelTypeId(e.target.value)}
          >
            <option value="1">LHB</option>
            <option value="2">ICF</option>
            <option value="4">EMU</option>
            <option value="3">VB</option>
          </select>
        </div>
        <div className="search-diff-container">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <h1 className="difference-title">Wheel Diameter Difference Page</h1>
      {results.length > 0 ? (
        <>
          <div className="export-buttons">
            <button onClick={exportToPDF}>Export to PDF</button>
            <button onClick={exportToExcel}>Export to Excel</button>
            <button onClick={exportToCSV}>Export to CSV</button>
          </div>
          <div className="table-div">
            <table className="table-container">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Wheel No.</th>
                  <th>Pre Inspection Diameter A</th>
                  <th>Final Inspection Diameter A</th>
                  <th>Difference of Diameter A</th>
                  <th>Pre Inspection Diameter B</th>
                  <th>Final Inspection Diameter B</th>
                  <th>Difference of Diameter B</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.WheelNo || item.ShopSrNumber}</td>
                    <td>{item.DiameterINA}</td>
                    <td>{item.WheelDiaA}</td>
                    <td>{item.diffA}</td>
                    <td>{item.DiameterINB}</td>
                    <td>{item.WheelDiaB}</td>
                    <td>{item.diffB}</td>
                    <td>{formatedDate(item.createdDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="chart-div">
            <div className="chart-container chart-container-range1">
              <Doughnut data={chartDataRange1} options={chartOptions} />
            </div>
            <div className="chart-container chart-container-range2">
              <Doughnut data={chartDataRange2} options={chartOptions} />
            </div>
            <div className="chart-container chart-container-range3">
              <Doughnut data={chartDataRange3} options={chartOptions} />
            </div>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>No results found</p>
      )}
    </div>
  );
};

export default DifferencePage;

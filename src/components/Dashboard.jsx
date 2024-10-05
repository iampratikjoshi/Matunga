import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "../resources/Dashboard/dashboard.css";
import "react-datepicker/dist/react-datepicker.css";
import api from "./Axios/AxiosConnection";
import Chart from "chart.js/auto";
import Plotly from "plotly.js-dist-min";

function Dashboard() {
  // State for managing date selections
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [rangeDataPreInspection, setRangeDataPreInspection] = useState([]);
  const [rangeDataFinalInspection, setRangeDataFinalInspection] = useState([]);
  const [filteredCountPreInspection, setFilteredCountPreInspection] =
    useState(0);
  const [filteredCountFinalInspection, setFilteredCountFinalInspection] =
    useState(0);
  const [dateRange, setDateRange] = useState("7-days");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePreInpsection = await api.get("/prelhb/getalldata");
        setRangeDataPreInspection(responsePreInpsection.data); // Store the full data
        const responseFinalInpsection = await api.get("/api/getalldata");
        setRangeDataFinalInspection(responseFinalInpsection.data); // Store the full data

        filterData(
          responsePreInpsection.data,
          responseFinalInpsection.data,
          "7-days"
        ); // Default filter for the last 7 days
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = (preInspectionData, finalInspectionData, range) => {
    const currentDate = new Date();
    let filteredPreInspection;
    let filteredFinalInspection;
    const parseDateWithoutTimezone = (dateString) => {
      const datePart = dateString.split("T")[0]; // Get the date part only
      return new Date(datePart); // Create a Date object with the date part
    };
    console.log("PreInspection All Data:", preInspectionData);

    switch (range) {
      case "7-days":
        filteredPreInspection = preInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          const daysDifference =
            (currentDate - createdDate) / (1000 * 3600 * 24);
          return daysDifference <= 7;
        });
        filteredFinalInspection = finalInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          const daysDifference =
            (currentDate - createdDate) / (1000 * 3600 * 24);
          return daysDifference <= 7;
        });
        break;
      case "15-days":
        filteredPreInspection = preInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          const daysDifference =
            (currentDate - createdDate) / (1000 * 3600 * 24);
          return daysDifference <= 15;
        });
        filteredFinalInspection = finalInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          const daysDifference =
            (currentDate - createdDate) / (1000 * 3600 * 24);
          return daysDifference <= 15;
        });
        break;
      case "1-year":
        filteredPreInspection = preInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          return currentDate.getFullYear() - createdDate.getFullYear() <= 1;
        });
        filteredFinalInspection = finalInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          return currentDate.getFullYear() - createdDate.getFullYear() <= 1;
        });
        break;
      case "5-year":
        filteredPreInspection = preInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          return currentDate.getFullYear() - createdDate.getFullYear() <= 5;
        });
        filteredFinalInspection = finalInspectionData.filter((item) => {
          const createdDate = parseDateWithoutTimezone(item.createdDate);
          return currentDate.getFullYear() - createdDate.getFullYear() <= 5;
        });
        break;
      default:
        filteredPreInspection = preInspectionData;
        filteredFinalInspection = finalInspectionData;
    }
    setFilteredCountFinalInspection(filteredFinalInspection.length);
    setFilteredCountPreInspection(filteredPreInspection.length); // Set the count of filtered data
  };

  const handleRangeChange = (e) => {
    const selectedRange = e.target.value;
    setDateRange(selectedRange);
    filterData(rangeDataPreInspection, rangeDataFinalInspection, selectedRange); // Filter data based on selected range
  };

  // Handle start date change
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Filter data by date range
  useEffect(() => {
    const filterDataByDateRange = (
      startDate,
      endDate,
      rangeDataPreInspection,
      rangeDataFinalInspection
    ) => {
      let filteredDataPreInspection = [];
      let filteredDataFinalInspection = [];
      // Function to parse the date string to only the date part
      const parseDateWithoutTimezone = (dateString) => {
        const datePart = dateString.split("T")[0]; // Get the date part only
        return new Date(datePart); // Create a Date object with the date part
      };

      if (startDate && endDate) {
        // Filter data between selected 'from' and 'to' dates
        const normalizedStartDate = new Date(startDate);
        const normalizedEndDate = new Date(endDate);

        normalizedStartDate.setHours(0, 0, 0, 0);
        normalizedEndDate.setHours(23, 59, 59, 999); // Set endDate to the end of the day

        // Filter data between selected 'from' and 'to' dates
        filteredDataPreInspection = rangeDataPreInspection.filter((item) => {
          const createddate = parseDateWithoutTimezone(item.createdDate);
          return (
            createddate >= normalizedStartDate &&
            createddate <= normalizedEndDate
          );
        });

        filteredDataFinalInspection = rangeDataFinalInspection.filter(
          (item) => {
            const createddate = parseDateWithoutTimezone(item.createdDate);
            return (
              createddate >= normalizedStartDate &&
              createddate <= normalizedEndDate
            );
          }
        );
      }
      // Store the count of filtered data
      setFilteredCountPreInspection(filteredDataPreInspection.length);
      setFilteredCountFinalInspection(filteredDataFinalInspection.length);
    };

    filterDataByDateRange(
      startDate,
      endDate,
      rangeDataPreInspection,
      rangeDataFinalInspection
    );
  }, [startDate, endDate]);

  // Refs to store Chart instances and canvas elements
  const radarChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barCanvasRef = useRef(null);
  const pieCanvasRef = useRef(null);
  const radarCanvasRef = useRef(null);

  useEffect(() => {
    // Fetch data from the server API
    api
      .get("/api/dashboard-data")
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (data) {
      const { labels, sources, targets, values, stageCounts } = data;

      // Plotly Sankey Diagram
      const sankeyData = {
        type: "sankey",
        orientation: "h",
        node: {
          pad: 15,
          thickness: 20,
          line: {
            color: "black",
            width: 0.5,
          },
          label: labels,
        },
        link: {
          source: sources,
          target: targets,
          value: values,
        },
      };

      const sankeyLayout = {
        title: "Sankey Diagram of Wheel Stages",
        font: {
          size: 10,
        },
      };

      Plotly.newPlot("sankeyChart", [sankeyData], sankeyLayout);

      const radarLabels = Object.keys(stageCounts);
      const radarData = Object.values(stageCounts);

      // Radar Chart
      if (radarCanvasRef.current) {
        if (radarChartRef.current) {
          radarChartRef.current.destroy();
        }
        const radarCtx = radarCanvasRef.current.getContext("2d");

        radarChartRef.current = new Chart(radarCtx, {
          type: "radar",
          data: {
            labels: radarLabels,
            datasets: [
              {
                label: "Number of Wheels",
                data: radarData,
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            scale: {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          },
        });
      }

      // Bar Chart
      if (barCanvasRef.current) {
        if (barChartRef.current) {
          barChartRef.current.destroy();
        }
        const barCtx = barCanvasRef.current.getContext("2d");
        barChartRef.current = new Chart(barCtx, {
          type: "bar",
          data: {
            labels: radarLabels,
            datasets: [
              {
                label: "Number of Wheels",
                data: radarData,
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }

      // Pie Chart
      if (pieCanvasRef.current) {
        if (pieChartRef.current) {
          pieChartRef.current.destroy();
        }
        const pieCtx = pieCanvasRef.current.getContext("2d");
        pieChartRef.current = new Chart(pieCtx, {
          type: "pie",
          data: {
            labels: radarLabels,
            datasets: [
              {
                label: "Number of Wheels",
                data: radarData,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          },
        });
      }
      // Cleanup on component unmount
      return () => {
        if (radarChartRef.current) radarChartRef.current.destroy();
        if (barChartRef.current) barChartRef.current.destroy();
        if (pieChartRef.current) pieChartRef.current.destroy();
      };
    }
  }, [data]);

  // State and options for multi-select dropdowns
  const [isOpen, setIsOpen] = useState({
    department: false,
    section: false,
    stage: false,
  });

  // Initialize selectedOptions with all options selected by default
  const departmentOptions = [
    "All",
    "Inward",
    "Pre-Inspection",
    "Operations",
    "Final Inspection",
    "Dispatch",
  ];
  const sectionOptions = [
    "All",
    "Wheel Shop",
    "Bogies",
    "Brakes",
    "Suspension",
  ];
  const stageOptions = [
    "All",
    "Pre-Inspection",
    "Final Inspection",
    "Assembly",
    "Dispatch",
  ];

  const [selectedOptions, setSelectedOptions] = useState({
    department: ["Pre-Inspection", "Final Inspection"],  // Default selections
    section: ["Wheel Shop"],  // Default selection
    stage: ["Pre-Inspection", "Final Inspection"],  // Default selections
  });

  const toggleDropdown = (key) => {
    setIsOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = (key, option) => {
    setSelectedOptions((prev) => {
      let updatedOptions;

      if (option === "All") {
        if (prev[key].includes("All")) {
          // Deselect "All" and all other options
          updatedOptions = [];
        } else {
          // Select "All" and all other options
          updatedOptions = [
            ...(key === "department"
              ? departmentOptions
              : key === "section"
              ? sectionOptions
              : stageOptions),
          ];
        }
      } else {
        if (prev[key].includes(option)) {
          // Deselect specific option
          updatedOptions = prev[key].filter((o) => o !== option);
        } else {
          // Select specific option
          updatedOptions = [...prev[key], option];
        }

        // If all other options are selected, automatically select "All"
        if (
          updatedOptions.length ===
          (key === "department"
            ? departmentOptions.length
            : key === "section"
            ? sectionOptions.length
            : stageOptions.length) -
            1
        ) {
          updatedOptions.push("All");
        } else {
          // Otherwise, if "All" was selected, remove it
          updatedOptions = updatedOptions.filter((o) => o !== "All");
        }
      }

      return {
        ...prev,
        [key]: updatedOptions,
      };
    });
  };

  return (
    <div className="page-content">
      <div className="filter-bar">
        <div className="filter">
          <label htmlFor="date-range">DATE RANGE</label>
          <select id="date-range" onChange={handleRangeChange}>
            <option value="7-days">Last 7 Days</option>
            <option value="15-days">Last 15 Days</option>
            <option value="1-year">Last 1 Year</option>
            <option value="5-year">Last 5 Years</option>
          </select>
        </div>

        <div className="filter-container">
          <div className="filter-box">
            <h2 className="from-label">From</h2>
            <div className="datepicker-container">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select Date"
                className="date-input from-date-input"
              />
            </div>
          </div>

          <div className="filter-box">
            <h2 className="to-label">To</h2>
            <div className="datepicker-container">
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select Date"
                className="date-input to-date-input"
              />
            </div>
          </div>
        </div>

        {/* Multi-select dropdown for Department //, display: "inline-block" */}
        <div className="filter"  style={{ position: "relative" }}>
        {/* <div className="filter" > */}
          <label htmlFor="department">DEPARTMENT</label>
          <button id="department" onClick={() => toggleDropdown("department")}>
            {selectedOptions.department.length
              ? selectedOptions.department.join(", ")
              : "Select"}
          </button>

          {isOpen.department && (
            <div className="dropdown-options">
              {departmentOptions.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.department.includes(option)}
                      onChange={() =>
                        handleCheckboxChange("department", option)
                      }
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Multi-select dropdown for Section */}
        <div className="filter" style={{ position: "relative" }}>
          <label htmlFor="section">SECTION</label>
          <button id="section" onClick={() => toggleDropdown("section")}>
            {selectedOptions.section.length
              ? selectedOptions.section.join(", ")
              : "Select"}
          </button>

          {isOpen.section && (
            <div className="dropdown-options">
              {sectionOptions.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.section.includes(option)}
                      onChange={() => handleCheckboxChange("section", option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Multi-select dropdown for Stage */}
        <div className="filter" style={{ position: "relative" }}>
          <label htmlFor="stage">STAGE</label>
          <button id="stage" onClick={() => toggleDropdown("stage")}>
            {selectedOptions.stage.length
              ? selectedOptions.stage.join(", ")
              : "Select"}
          </button>

          {isOpen.stage && (
            <div className="dropdown-options">
              {stageOptions.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedOptions.stage.includes(option)}
                      onChange={() => handleCheckboxChange("stage", option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The rest of your content remains unchanged */}
      <div className="summary-boxes">
        {/* <div className="summary-box box1">
          <div className="text">
            <h3>Inward</h3>
            <div className="inspection-items">
              <p className="lhb">LHB: XX Nos</p>
              <p className="icf">ICF: XX Nos</p>
              <p className="emu">EMU: XX Nos</p>
              <p className="vb">VB: XX Nos</p>
            </div>
            <div className="number">
              <p>0000</p>
            </div>
          </div>
        </div> */}

        <div className="summary-box box2">
          <div className="text">
            <h3>Pre-Inspection</h3>
            <div className="inspection-items">
              <p className="lhb">LHB: {filteredCountPreInspection} Nos</p>
              <p className="icf">ICF: XX Nos</p>
              <p className="emu">EMU: XX Nos</p>
              <p className="vb">VB: XX Nos</p>
            </div>
            <div className="number">
              <p>{filteredCountPreInspection}</p>
            </div>
          </div>
        </div>

        <div className="summary-box box3">
          <div className="text">
            <h3>Final Inspection</h3>
            <div className="inspection-items">
              <p className="lhb">LHB: {filteredCountFinalInspection} Nos</p>
              <p className="icf">ICF: XX Nos</p>
              <p className="emu">EMU: XX Nos</p>
              <p className="vb">VB: XX Nos</p>
            </div>
            <div className="number">
              <p>{filteredCountFinalInspection}</p>
            </div>
          </div>
        </div>

        {/* <div className="summary-box box4">
          <div className="text">
            <h3>Dispatch</h3>
            <div className="inspection-items">
              <p className="lhb">LHB: XX Nos</p>
              <p className="icf">ICF: XX Nos</p>
              <p className="emu">EMU: XX Nos</p>
              <p className="vb">VB: XX Nos</p>
            </div>
            <div className="number">
              <p>0000</p>
            </div>
          </div>
        </div> */}
      </div>

      <div className="workflow">
        <div className="workflow-step pre-inspection">
          <div id="sankeyChart"></div>
        </div>
      </div>

      <div className="charts">
        <div className="chart barChart">
          {/* Add sales by value chart here */}
          <canvas ref={barCanvasRef} id="barChart"></canvas>
        </div>
        <div className="chart pieChart">
          {/* Add sales by quantity chart here */}
          <canvas ref={pieCanvasRef} id="pieChart"></canvas>
        </div>
        <div className="chart radarChart">
          {/* Add sales by cash/credit chart here */}
          <canvas ref={radarCanvasRef} id="radarChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

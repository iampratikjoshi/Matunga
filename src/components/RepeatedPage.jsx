import React, { useEffect, useState } from "react";
import api from "./Axios/AxiosConnection";
import { Atom } from "react-loading-indicators";
import "../resources/repeatedPage/repeatedPage.css";

const RepeatedPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [wheelType, setWheelType] = useState(""); // Wheel Type
  const [timeRange, setTimeRange] = useState(""); // Time Range
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Time range options
  const timeRanges = [
    { label: "Last 7 Days", value: "7" },
    { label: "Last 1 Month", value: "30" },
    { label: "Last 3 Months", value: "90" },
    { label: "Last 6 Months", value: "180" },
    { label: "Last 1 Year", value: "365" },
  ];

  const wheelTypes = [
    { label: "LHB", value: "1" },
    { label: "ICF", value: "2" },
    { label: "EMU", value: "4" },
    { label: "VB", value: "3" },
  ];

  useEffect(() => {
    if (timeRange) {
      // Set start date based on the selected time range
      const now = new Date();
      const pastDate = new Date(now);
      pastDate.setDate(now.getDate() - parseInt(timeRange));

      setStartDate(pastDate);
      setEndDate(now);
    }
  }, [timeRange]); // Run when the time range changes

  const handleSearch = async () => {
    if (!startDate || !endDate || !wheelType) {
      setError("Please select both time range and wheel type.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch data from the API
      const response = await api.get("/repeated-wheels", {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          wheelTypeId: wheelType,
        },
      });

      setData(response.data.repeatedWheelData);
    } catch (err) {
      setError("Error fetching data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Atom color="#3155cc" size="small" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const formatDate = (date) => {
    if (date) {
      return date.toString().slice(0, 15); // "Sat Jan 03 1970 05:30:00"
    }
    return "Not provided";
  };

  const getWheelTypeLabel = (typeId) => {
    const wheelTypeObj = wheelTypes.find((type) => type.value === typeId);
    return wheelTypeObj ? wheelTypeObj.label : "Not selected";
  };

  const formatedDate = (isoDate) => {
    const [date, time] = isoDate.split("T");
    const [year, month, day] = date.split("-");
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = time.split(":").slice(0, 2).join(":");
    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <div className="repeated-page-container">
      <div className="form-container">
        <div className="form-div">
          <label>Time Range :</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="">Select Time Range</option>
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-div">
          <label>Wheel Type :</label>
          <select
            value={wheelType}
            onChange={(e) => setWheelType(e.target.value)}
            className="wheel-type-select"
          >
            <option value="">Select Wheel Type</option>
            {wheelTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <h1 className="page-title">RETT</h1>
      {data && data.length > 0 ? (
        <>
          <div className="report-info">
            <p>
              <b>Time Range :</b>{" "}
              {timeRange ? `${timeRange} Days` : "Not selected"}
            </p>
            <p>
              <b>Wheel Type :</b> {getWheelTypeLabel(wheelType)}
            </p>
            <p>
              <b>Start Date :</b>{" "}
              {startDate ? formatDate(startDate) : "Not provided"}
            </p>
            <p>
              <b>End Date :</b> {endDate ? formatDate(endDate) : "Not provided"}
            </p>
          </div>
          <table className="repeated-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Wheel No</th>
                <th>Repeat Times</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="highlighted-cell">{item.WheelNo}</td>
                  <td>
                    {item.repeatTimes.map((time, i) => (
                      <div key={i}>{formatedDate(time)}</div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="no-data">No data available</div>
      )}
    </div>
  );
};

export default RepeatedPage;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "./Axios/AxiosConnection";
import { Atom } from "react-loading-indicators";
import "../resources/reportPage/reportPage.css"

const ReportPage = () => {
  const location = useLocation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tableName, setTableName] = useState("");
  const [data, setData] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Parse the query string from the URL
    const params = new URLSearchParams(location.search);

    // Extract the startdate, enddate, and tablename from the query string
    const start = params.get("startdate");
    const end = params.get("enddate");
    const table = params.get("tablename");

    // Update state with the extracted values
    if (start) {
      setStartDate(new Date(start));
    }
    if (end) {
      setEndDate(new Date(end));
    }
    if (table) {
      setTableName(table);
    }
  }, [location.search]); // Re-run effect when the search (query parameters) changes

  useEffect(() => {
    if (startDate && endDate && tableName) {
      // Only fetch data if all parameters are available
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          // Replace this URL with your actual API endpoint
          const response = await api.get("/fetchData", {
            params: {
              startdate: startDate.toISOString(),
              enddate: endDate.toISOString(),
              tablename: tableName,
            },
          });

          // Set the response data in the state
          setData(response.data);
        } catch (err) {
          setError("Error fetching data.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [startDate, endDate, tableName]); // Trigger API call when startDate, endDate, or tableName changes

  if (loading) {
    return (
      <div className="report-loading">
        <Atom color="#3155cc" size="small" text="" textColor="" />
      </div>
    );
  }
  if (error) {
    return <div className="report-error">{error}</div>;
  }

  const formatDate = (date) => {
    if (date) {
      // Convert the date to a string and remove the timezone part (after the space)
      return date.toString().slice(0, 15); // "Sat Jan 03 1970 05:30:00"
    }
    return "Not provided";
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
    <div className="report-container">
      <h1 className="report-title">Report Page</h1>
      <p className="report-info">
        Start Date: {startDate ? formatDate(startDate) : "Not provided"}
      </p>
      <p className="report-info">
        End Date: {endDate ? formatDate(endDate) : "Not provided"}
      </p>
      <p className="report-info">
        Stage Name: {tableName ? tableName : "Not provided"}
      </p>

      {/* Render fetched data in a table */}
      {data && data.length > 0 ? (
        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>WheelNo</th>
                <th>TimeStamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.WheelId || index}>
                  <td>{index + 1}</td>
                  <td>{item.ShopSrNumber || item.WheelNo}</td>
                  <td>{formatedDate(item.createdDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );
};

export default ReportPage;

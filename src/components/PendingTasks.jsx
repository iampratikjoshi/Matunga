import React, { useState, useEffect } from "react";
import "../resources/pendingtasks/pendingtasks.css";
import { useNavigate } from "react-router-dom";
import api from "./Axios/AxiosConnection.js";

function PendingTasks() {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [fromDate, setFromDate] = useState(""); // From date state
  const [toDate, setToDate] = useState(""); // To date state
  const [selectedFields, setSelectedFields] = useState({
    All: true,
    "Pre-Inspection": true,
    "Press-Off": true,
    "Final Inspection": true,
    // Dispatch: true,
    "Press-On": true,
  });

  const [preInspectionData, setPreInspectionData] = useState([]);
  const [filteredPreInspectionData, setFilteredPreInspectionData] = useState(
    []
  );
  const [pressOffData, setPressOffData] = useState([]);
  const [pressOnPendingData, setpressOnPendingData] = useState([]);
  const [dispatchPendingData, setdispatchPendingData] = useState([]);
  const [finalInspectionData, setfinalInspectionData] = useState([]);
  const [finalInspectionData2, setfinalInspectionData2] = useState([]);
  const [filteredPressOffData, setFilteredPressOffData] = useState([]);
  const [filteredPressOnData, setFilteredPressOnData] = useState([]);
  const [filteredfinalInspectionData, setFilteredfinalInspectionData] =
    useState([]);
  const [filteredfinalInspectionData2, setFilteredfinalInspectionData2] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreInspectionData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/pendingdataof/preinspectiontable"
        );
        console.log("Pre Inspection response: ", response.data);
        setPreInspectionData(response.data);
      } catch (error) {
        console.error("Error fetching Pre-Inspection data:", error);
      }
    };

    fetchPreInspectionData();
  }, []);

  useEffect(() => {
    const fetchPressOffData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/heavyrepair/pressofftable"
        );
        console.log("Press Off response: ", response.data);
        setPressOffData(response.data);
      } catch (error) {
        console.error("Error fetching press-off data:", error);
      }
    };

    fetchPressOffData();
  }, []);

  useEffect(() => {
    const finalInspectionData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/normalrepair/finalinspectiontable"
        );
        console.log("final inspection response: ", response);
        setfinalInspectionData(response.data);
      } catch (error) {
        console.error("Error fetching final-Inspection data: ", error);
      }
    };

    finalInspectionData();

    const PressOnApprovedfinalInspectionData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/dataComingFromPressOn/finalinspectiontable"
        );
        console.log("Press On Appr. final inspection response: ", response);
        setfinalInspectionData2(response.data);
      } catch (error) {
        console.error("Error fetching final-Inspection data: ", error);
      }
    };

    PressOnApprovedfinalInspectionData();
  }, []);

  useEffect(() => {
    const pressOnPendingData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/pendingdataof/pressontable"
        );
        console.log("pending data for press on response: ", response);
        setpressOnPendingData(response.data);
      } catch (error) {
        console.error("Error fetching  press on pending data: ", error);
      }
    };

    pressOnPendingData();
  }, []);

  useEffect(() => {
    const dispatchPendingData = async () => {
      try {
        const response = await api.get(
          "/summaryreport/pendingdataof/dispatchtable"
        );
        console.log("pending data for dispatch response: ", response);
        setdispatchPendingData(response.data);
      } catch (error) {
        console.error("Error fetching  dispatch pending data: ", error);
      }
    };

    dispatchPendingData();
  }, []);

  useEffect(() => {
    // if (pressOnPendingData.length && pressOffData.length) {
    const filteredData = preInspectionData.filter(
      (preInspectionItem) =>
        !pressOffData.some(
          (pressOffItem) => pressOffItem.WheelNo === preInspectionItem.WheelNo
        )
    );
    const filteredDataAgain = filteredData.filter(
      (filteredItem) =>
        !finalInspectionData.some(
          (finalInspectionItem) =>
            finalInspectionItem.WheelNo === filteredItem.WheelNo
        )
    );
    setFilteredPreInspectionData(filteredDataAgain);
    // }
  }, [preInspectionData, pressOffData, finalInspectionData]);

  useEffect(() => {
    // if (pressOnPendingData.length && pressOffData.length) {
    const filteredData = pressOffData.filter(
      (pressOffItem) =>
        !pressOnPendingData.some(
          (pressOnItem) => pressOnItem.WheelID === pressOffItem.WheelID
        )
    );
    setFilteredPressOffData(filteredData);
    // }
  }, [pressOnPendingData, pressOffData]);

  useEffect(() => {
    const filteredData = pressOnPendingData.filter(
      (pressOnItem) =>
        !finalInspectionData2.some(
          (pressonApprovedItem) =>
            pressonApprovedItem.WheelID === pressOnItem.WheelID
        )
    );
    setFilteredPressOnData(filteredData);
  }, [finalInspectionData2, pressOnPendingData]);

  useEffect(() => {
    const filteredData = finalInspectionData.filter(
      (finalInspectionItem) =>
        !dispatchPendingData.some(
          (dispatchItem) => dispatchItem.WheelID === finalInspectionItem.WheelID
        )
    );
    setFilteredfinalInspectionData(filteredData);

    const filteredData2 = finalInspectionData2.filter(
      (finalInspectionItem2) =>
        !dispatchPendingData.some(
          (dispatchItem) =>
            dispatchItem.WheelID === finalInspectionItem2.WheelID
        )
    );
    setFilteredfinalInspectionData2(filteredData2);
  }, [dispatchPendingData, finalInspectionData, finalInspectionData2]);

  const handleFieldChange = (field) => {
    const newSelectedFields = { ...selectedFields };

    if (field === "All") {
      const newValue = !selectedFields.All;
      Object.keys(newSelectedFields).forEach((key) => {
        newSelectedFields[key] = newValue;
      });
    } else {
      newSelectedFields[field] = !selectedFields[field];
      newSelectedFields.All = Object.values(newSelectedFields).every(
        (value) => value
      );
    }

    setSelectedFields(newSelectedFields);
  };

  // const formatDate = (isoDate) => {
  //   const date = new Date(isoDate);
  //   return date.toLocaleDateString();
  // };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  // Helper function to filter data based on search term
   const filteredDataBySearch = (data) => {
    return data.filter((item) => {
      // Check if search term matches
      const matchesSearchTerm = searchTerm
        ? item.WheelNo.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      // Normalize dates to remove time for accurate comparison
      const itemDate = new Date(item.WheelStageEnrtyTimestamp).setHours(
        0,
        0,
        0,
        0
      );
      const fromDateNormalized = fromDate
        ? new Date(fromDate).setHours(0, 0, 0, 0)
        : null;
      const toDateNormalized = toDate
        ? new Date(toDate).setHours(0, 0, 0, 0)
        : null;

      // Check if the item matches the date range
      let matchesDateRange = true;
      if (fromDateNormalized && toDateNormalized) {
        if (fromDateNormalized === toDateNormalized) {
          // Exact date match when both fromDate and toDate are the same
          matchesDateRange = itemDate === fromDateNormalized;
        } else {
          // Regular range check for different fromDate and toDate
          matchesDateRange =
            itemDate >= fromDateNormalized && itemDate <= toDateNormalized;
        }
      } else if (fromDateNormalized) {
        // If only fromDate is set, check that itemDate is after or on fromDate
        matchesDateRange = itemDate >= fromDateNormalized;
      } else if (toDateNormalized) {
        // If only toDate is set, check that itemDate is before or on toDate
        matchesDateRange = itemDate <= toDateNormalized;
      }

      return matchesSearchTerm && matchesDateRange;
    });
  };

  return (
    <>
      <div className="pending-tasks-container">
        <div className="search-div">
          <div className="search-container">
            <label>Seach By Wheel No. :</label>
            <input
              type="text"
              placeholder="Search by Wheel No."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="search-container">
            <label>From Date :</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="search-container">
            <label>To Date:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="search-container">
            <label>Search By Wheel Type :</label>
            <select>
              <option value="">Search By Wheel Type</option>
              <option>LHB</option>
              <option>ICF</option>
              <option>EMU</option>
              <option>VB</option>
            </select>
          </div>
        </div>
        <h1>Jobs Pending For LHB</h1>

        <div className="cont">
          <div className="sidebar2">
            <div>
              <ul className="sidebarlist2">
                {Object.keys(selectedFields).map((field) => (
                  <li key={field} onClick={() => handleFieldChange(field)}>
                    <input
                      type="checkbox"
                      checked={selectedFields[field]}
                      onChange={() => handleFieldChange(field)}
                      style={{ marginRight: "8px" }}
                    />
                    {field}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="vertical"></div>
            </div>
          </div>
          <div className="tt">
            {selectedFields.All && <></>}
            {selectedFields["Pre-Inspection"] &&
              filteredDataBySearch(preInspectionData).length > 0 && (
                <div className="tred-turning">
                  <h3>Wheels Pending for Pre-Inspection</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(filteredPreInspectionData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/LHBSchedulePreInspection/details",
                                    {
                                      state: {
                                        WheelNo: item.WheelNo,
                                      },
                                    }
                                  )
                                }
                              >
                                Proceed
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedFields["Press-Off"] &&
              filteredDataBySearch(filteredPressOffData).length > 0 && (
                <div className="tred-turning">
                  <h3>Wheels Pending for Press-Off</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(filteredPressOffData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            {/* <td>{item.WheelStageEnrtyTimestamp}</td> */}
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/LHBPressOffForm/identification_details",
                                    {
                                      state: {
                                        WheelNo: item.WheelNo,
                                        wheelid: item.WheelID,
                                      },
                                    }
                                  )
                                }
                              >
                                Proceed
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedFields["Final Inspection"] &&
              (filteredDataBySearch(filteredfinalInspectionData).length > 0 ||
                filteredDataBySearch(filteredfinalInspectionData2).length >
                0) && (
                <div className="wheel-assembly">
                  <h3>Wheels Pending for Final Inspection</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(filteredfinalInspectionData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate("/lhbfinalinspection/axle_details", {
                                    state: {
                                      WheelNo: item.WheelNo,
                                      wheelid: item.WheelID,
                                    },
                                  })
                                }
                              >
                                Proceed
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                      {filteredDataBySearch(filteredfinalInspectionData2).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate("/lhbfinalinspection/axle_details", {
                                    state: {
                                      WheelNo: item.WheelNo,
                                      wheelid: item.WheelID,
                                    },
                                  })
                                }
                              >
                                Proceed
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedFields["Dispatch"] &&
              filteredDataBySearch(dispatchPendingData).length > 0 && (
                <div className="roller-bearing">
                  <h3>Wheels Pending for Dispatch</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(dispatchPendingData).map((item) => (
                        <tr key={item.WheelID}>
                          <td>{item.WheelNo}</td>
                          <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  "/wheelsdispatchrecordform/divisionorcarshed_details",
                                  {
                                    state: {
                                      WheelNo: item.WheelNo,
                                      wheelid: item.WheelID,
                                    },
                                  }
                                )
                              }
                            >
                              Proceed
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedFields["Press-On"] &&
              filteredDataBySearch(filteredPressOnData).length > 0 && (
                <div className="press-on">
                  <h3>Wheels Pending for Press-On</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(filteredPressOnData).map((item) => (
                        <tr key={item.WheelID}>
                          <td>{item.WheelNo}</td>
                          <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate("/LHBPressOnForm/wheel_details", {
                                  state: {
                                    WheelNo: item.WheelNo,
                                    wheelid: item.WheelID,
                                  },
                                })
                              }
                            >
                              Proceed
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingTasks;

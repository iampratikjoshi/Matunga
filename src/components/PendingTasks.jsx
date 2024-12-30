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
  const [selectedWheelType, setSelectedWheelType] = useState("LHB"); // Store the selected wheel type

  const [emuData, setEmuData] = useState([]);
  const [icfData, setIcfData] = useState([]);
  const [vbData, setVbData] = useState([]);
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
    if (selectedWheelType === "LHB") {
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
    } else if (selectedWheelType === "EMU") {
      const emuData = async () => {
        try {
          const response = await api.get("/emu/summaryreport/combineddata");
          setEmuData(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      emuData();
    } else if (selectedWheelType === "ICF") {
      const icfData = async () => {
        try {
          const response = await api.get("/icf/summaryreport/combineddata");
          console.log("icf Data response: ", response.data);
          setIcfData(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      icfData();
    } else if (selectedWheelType === "VB") {
      const vbData = async () => {
        try {
          const response = await api.get("/vb/summaryreport/combineddata");
          console.log("vb Data response: ", response.data);
          setVbData(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      vbData();
    }
  }, [selectedWheelType]);

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
    if (!data || data.length === 0) {
      // If data is not available or is empty, return an empty array
      return [];
    }

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
      <div className="report-container">
        <div className="search-div-pending">
          <div className="search-container">
            <label>Wheel No. :</label>
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
            <label>To Date :</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="search-container">
            <label>Wheel Type :</label>
            <select
              value={selectedWheelType}
              onChange={(e) => setSelectedWheelType(e.target.value)}
            >
              <option value="">Select Wheel Type</option>
              <option value="LHB">LHB</option>
              <option value="ICF">ICF</option>
              <option value="EMU">EMU</option>
              <option value="VB">VB</option>
            </select>
          </div>
        </div>
        <h1 className="report-title">Jobs Pending</h1>

        <div className="pending-container">
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
          <div className="report-table-container">
            {selectedFields.All && <></>}
            {selectedWheelType === "LHB" &&
              selectedFields["Pre-Inspection"] &&
              filteredDataBySearch(preInspectionData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for LHB Pre-Inspection
                  </h3>
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
            {selectedWheelType === "LHB" &&
              selectedFields["Press-Off"] &&
              filteredDataBySearch(filteredPressOffData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for LHB Press-Off
                  </h3>
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

            {selectedWheelType === "LHB" &&
              selectedFields["Press-On"] &&
              filteredDataBySearch(filteredPressOnData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for LHB Press-On
                  </h3>
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

            {selectedWheelType === "LHB" &&
              selectedFields["Final Inspection"] &&
              (filteredDataBySearch(filteredfinalInspectionData).length > 0 ||
                filteredDataBySearch(filteredfinalInspectionData2).length >
                  0) && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for LHB Final Inspection
                  </h3>
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
            {selectedWheelType === "LHB" &&
              selectedFields["Dispatch"] &&
              filteredDataBySearch(dispatchPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for LHB Dispatch
                  </h3>
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

            {selectedFields.All && <></>}
            {selectedWheelType === "EMU" &&
              selectedFields["Pre-Inspection"] &&
              filteredDataBySearch(emuData.preinspectionPendingData).length >
                0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for EMU Pre-Inspection
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(
                        emuData.preinspectionPendingData
                      ).map((item) => (
                        <tr key={item.WheelID}>
                          <td>{item.WheelNo}</td>
                          <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  "/emuschedulepreinspectionform/w1_details",
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
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedWheelType === "EMU" &&
              selectedFields["Press-Off"] &&
              filteredDataBySearch(emuData.heavyRepairData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for EMU Press-Off
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(emuData.heavyRepairData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            {/* <td>{item.WheelStageEnrtyTimestamp}</td> */}
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/emupressoffForm/identification_details",
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

            {selectedWheelType === "EMU" &&
              selectedFields["Press-On"] &&
              filteredDataBySearch(emuData.pressOnPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for EMU Press-On
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(emuData.pressOnPendingData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate("/emu_presson/emu_details", {
                                    state: {
                                      WheelNo: item.WheelNo,
                                      WheelID: item.WheelID,
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

            {selectedWheelType === "EMU" &&
              selectedFields["Final Inspection"] &&
              (filteredDataBySearch(emuData.normalRepairData).length > 0 ||
                filteredDataBySearch(emuData.pressOnApprovedData).length >
                  0) && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for EMU Final Inspection
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(emuData.normalRepairData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/emufinalinspection/wheel_details",
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
                      {filteredDataBySearch(emuData.pressOnApprovedData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/emufinalinspection/wheel_details",
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
            {selectedWheelType === "EMU" &&
              selectedFields["Dispatch"] &&
              filteredDataBySearch(emuData.dispatchPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for EMU Dispatch
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(emuData.dispatchPendingData).map(
                        (item) => (
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
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            {selectedFields.All && <></>}
            {selectedWheelType === "ICF" &&
              selectedFields["Pre-Inspection"] &&
              filteredDataBySearch(icfData.preinspectionPendingData).length >
                0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Pre-Inspection
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(
                        icfData.preinspectionPendingData
                      ).map((item) => (
                        <tr key={item.WheelID}>
                          <td>{item.WheelNo}</td>
                          <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  "/icfschedulepreinspectionform/w1_details",
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
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedWheelType === "ICF" &&
              selectedFields["Press-Off"] &&
              filteredDataBySearch(icfData.heavyRepairData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Press-Off
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(icfData.heavyRepairData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            {/* <td>{item.WheelStageEnrtyTimestamp}</td> */}
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/icfpressoffForm/identification_details",
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

            {selectedWheelType === "ICF" &&
              selectedFields["Press-On"] &&
              filteredDataBySearch(icfData.pressOnPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Press-On
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(icfData.pressOnPendingData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate("/icf_presson/icf_details", {
                                    state: {
                                      WheelNo: item.WheelNo,
                                      WheelID: item.WheelID,
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

            {selectedWheelType === "ICF" &&
              selectedFields["Final Inspection"] &&
              (filteredDataBySearch(icfData.normalRepairData).length > 0 ||
                filteredDataBySearch(icfData.pressOnApprovedData).length >
                  0) && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Final Inspection
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(icfData.normalRepairData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/icffinalinspection/wheel_details",
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
                      {filteredDataBySearch(icfData.pressOnApprovedData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/icffinalinspection/wheel_details",
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
            {selectedWheelType === "ICF" &&
              selectedFields["Dispatch"] &&
              filteredDataBySearch(icfData.dispatchPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Dispatch
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(icfData.dispatchPendingData).map(
                        (item) => (
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
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

            {selectedFields.All && <></>}
            {selectedWheelType === "VB" &&
              selectedFields["Pre-Inspection"] &&
              filteredDataBySearch(vbData.preinspectionPendingData).length >
                0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for VB Pre-Inspection
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(
                        vbData.preinspectionPendingData
                      ).map((item) => (
                        <tr key={item.WheelID}>
                          <td>{item.WheelNo}</td>
                          <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                          <td>
                            <button
                              onClick={() =>
                                navigate(
                                  "/VBSchedulePreInspection/details",
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
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            {selectedWheelType === "VB" &&
              selectedFields["Press-Off"] &&
              filteredDataBySearch(vbData.heavyRepairData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for VB Press-Off
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(vbData.heavyRepairData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            {/* <td>{item.WheelStageEnrtyTimestamp}</td> */}
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/VBPressOffForm/identification_details",
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

            {selectedWheelType === "VB" &&
              selectedFields["Press-On"] &&
              filteredDataBySearch(vbData.pressOnPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Press-On
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(vbData.pressOnPendingData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate("/VBPressOnForm/wheel_details", {
                                    state: {
                                      WheelNo: item.WheelNo,
                                      WheelID: item.WheelID,
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

            {selectedWheelType === "VB" &&
              selectedFields["Final Inspection"] &&
              (filteredDataBySearch(vbData.normalRepairData).length > 0 ||
                filteredDataBySearch(vbData.pressOnApprovedData).length >
                  0) && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Final Inspection
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(vbData.normalRepairData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/VBfinalinspection/axle_details",
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
                      {filteredDataBySearch(vbData.pressOnApprovedData).map(
                        (item) => (
                          <tr key={item.WheelID}>
                            <td>{item.WheelNo}</td>
                            <td>{formatDate(item.WheelStageEnrtyTimestamp)}</td>
                            <td>
                              <button
                                onClick={() =>
                                  navigate(
                                    "/VBfinalinspection/axle_details",
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
            {selectedWheelType === "VB" &&
              selectedFields["Dispatch"] &&
              filteredDataBySearch(vbData.dispatchPendingData).length > 0 && (
                <div className="report-table">
                  <h3 className="report-title">
                    Wheels Pending for ICF Dispatch
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Wheel No.</th>
                        <th>Date of Entry</th>
                        <th>Proceed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDataBySearch(vbData.dispatchPendingData).map(
                        (item) => (
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
                        )
                      )}
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

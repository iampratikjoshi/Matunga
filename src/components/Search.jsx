import React, { useState } from "react";
import "../resources/Search/search.css";
import api from "./Axios/AxiosConnection";

const Search = () => {
  // States to manage search input and results
  const [wheelNo, setWheelNo] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [defectName, setDefectName] = useState("");
  const [stageName, setStageName] = useState("");
  const [results, setResults] = useState([]);

  // Function to handle search button click
  const handleSearch = async () => {
    try {
      const params = {};
      if (wheelNo) params.wheelNo = wheelNo;
      if (timeRange) params.timeRange = timeRange;
      if (defectName) params.defectName = defectName;
      if (stageName) params.stageName = stageName;

      // Call the API and pass the selected parameters
      const response = await api.get("/lhbinspection/getalldata", {
        params,
      });

      if (response.data && response.data.length > 0) {
        setResults(response.data);
      } else {
        setResults([]); // Clear the results if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    }
  };

  return (
    <div>
      <div className="search-div">
        <div className="search-container">
          <label>Search By Wheel No. :</label>
          <input
            type="text"
            placeholder="Search by Wheel No."
            value={wheelNo}
            onChange={(e) => setWheelNo(e.target.value)}
          />
        </div>
        <div className="search-container">
          <label>Time Range :</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="">Select Time Range</option>
            <option value="7">7 Days</option>
            <option value="15">15 Days</option>
            <option value="30">1  Month</option>
            <option value="365">1 Year</option>
          </select>
        </div>
        <div className="search-container">
          <label>Search By Defect :</label>
          <select
            value={defectName}
            onChange={(e) => setDefectName(e.target.value)}
          >
            <option value="">Select Defect</option>
            <option value="ST">ST</option>
            <option value="HEAT CHECK">HEAT CHECK</option>
            <option value="RIM FLAW">RIM FLAW</option>
            <option value="BEARING SOUND">BEARING SOUND</option>
            <option value="HOT AXEL">HOT AXEL</option>
            <option value="WHEEL SHEELING">WHEEL SHEELING</option>
            <option value="SHATTERED RIM">SHATTERED RIM</option>
            <option value="METAL CHIP OFF">METAL CHIP OFF</option>
            <option value="SKIDDED">SKIDDED</option>
            <option value="FLAT TYRE">FLAT TYRE</option>
            <option value="SEAL DENT">SEAL DENT</option>
            <option value="SEAL DAMAGE">SEAL DAMAGE</option>
            <option value="BEARING JAM">BEARING JAM</option>
            <option value="SPREAD RIM">SPREAD RIM</option>
            <option value="GREASE OOZING">GREASE OOZING</option>
            <option value="OMRS">OMRS</option>
            <option value="WILD">WILD</option>
          </select>
        </div>
        <div className="search-container">
          <label>Search By Stage :</label>
          <select
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
          >
            <option value="">Select Stage</option>
            <option value="LHBDivisionPreInspection">
              LHB Division Pre-Inspection
            </option>
            <option value="LHBPreInspection">
              LHB Schedule Pre-Inspection
            </option>
            {/* Add other stage options */}
          </select>
        </div>
        <div>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <h1>History of Wheels</h1>
      {results.length > 0 ? (
        <table className="results-table">
          <thead>
            <tr>
              <th>Wheel No.</th>
              <th>CTRB Number A</th>
              <th>CTRB Number B</th>
              <th>CTRB Make A</th>
              <th>CTRB Make B</th>
              <th>CTRB Status A</th>
              <th>CTRB Status B</th>
              <th>Division Report</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item) => (
              <tr key={item.WheelId || item.wheelid}>
                <td>{item.WheelNo || item.ShopSrNumber}</td>
                <td>{item.CTRBNumberA}</td>
                <td>{item.CTRBNumberB}</td>
                <td>{item.CTRBMakeA}</td>
                <td>{item.CTRBMakeB}</td>
                <td>{item.CTRBStatusA}</td>
                <td>{item.CTRBStatusB}</td>
                <td>{item.divisionreport}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;

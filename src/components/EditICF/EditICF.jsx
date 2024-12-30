import React, { useState } from "react";
import "../../resources/Search/search.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../../resources/pendingtasks/pendingtasks.css";

const EditICF = () => {

    const navigate = useNavigate();// States to manage search input and results

    const formatDate = (isoDate) => {
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

    const handleDeleteDivisionICF = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/icfdivision/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/editicf");
                    // Optionally, refresh the list after deletion
                    // Fetch updated data or remove the item from local state
                } else {
                    alert("Failed to delete the item. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting the item:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            // User canceled the deletion
            console.log("Delete action canceled.");
        }
    };

    const handleDeleteFinalICF = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/icffinalinspection/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/editicf");
                    // Optionally, refresh the list after deletion
                    // Fetch updated data or remove the item from local state
                } else {
                    alert("Failed to delete the item. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting the item:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            // User canceled the deletion
            console.log("Delete action canceled.");
        }
    };

    const handleDeletePressOffICF = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/icfpressoff/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/editicf");
                    // Optionally, refresh the list after deletion
                    // Fetch updated data or remove the item from local state
                } else {
                    alert("Failed to delete the item. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting the item:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            // User canceled the deletion
            console.log("Delete action canceled.");
        }
    };

    const handleDeletePressOnICF = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/icfpresson/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");

                    // Optionally, refresh the list after deletion
                    // Fetch updated data or remove the item from local state
                } else {
                    alert("Failed to delete the item. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting the item:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            // User canceled the deletion
            console.log("Delete action canceled.");
        }
    };

    const handleDeletePreInspectionICF = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/icfschedule/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/editicf");
                    // Optionally, refresh the list after deletion
                    // Fetch updated data or remove the item from local state
                } else {
                    alert("Failed to delete the item. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting the item:", error);
                alert("An error occurred. Please try again.");
            }
        } else {
            // User canceled the deletion
            console.log("Delete action canceled.");
        }
    };



 
    const [wheelNo, setWheelNo] = useState("");

    const [results, setResults] = useState([]);

    const [formType, setFormType] = useState("ICF");

    // Function to handle search button click
    const handleSearch = async () => {
        try {
            // Call the API and pass the selected parameters
            const response = await api.get("/lhb/search", { params: { wheelNo } }); // Passing wheelNo as a query parameter
            console.log("wheelNo", wheelNo);

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

    const handleSearchICF = async () => {
        try {
            const response = await api.get("/icf/search", { params: { wheelNo } });
            console.log("wheelNo", wheelNo);

            if (response.data) {
                setResults(response.data);
            } else {
                setResults({ preInspection: [], divisionPreInspection: [], finalInspection: [], pressOff: [], pressOn: [] });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults({ preInspection: [], divisionPreInspection: [], finalInspection: [], pressOff: [], pressOn: [] });
        }
    };

    const hasNoResults =
        (!results.preInspection || results.preInspection.length === 0) &&
        (!results.finalInspection || results.finalInspection.length === 0) &&
        (!results.divisionPreInspection || results.divisionPreInspection.length === 0) &&
        (!results.pressOff || results.pressOff.length === 0) &&
        (!results.pressOn || results.pressOn.length === 0);

    return (
        <div className="pending-tasks-container">
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

                <div>
                    <button className="search-btn" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            <h1>Edit/Delete ICF Form</h1>
            <div className="tt">
                {formType === "ICF" && results.preInspection && results.preInspection.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>ICF Pre-Inspection</h3>
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Wheel No.</th>
                                        <th>Date of Entry</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.preInspection.map((item) => (
                                        <tr key={item.WheelId}>
                                            <td>{item.WheelNo || item.ShopSrNumber}</td>
                                            <td>{formatDate(item.createdDate)}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPen}
                                                    onClick={() =>
                                                        navigate(
                                                            "/parentediticf/UpdateICFSchedulePreInspection/details",
                                                            {
                                                                state: {
                                                                    WheelNo: item.WheelNo || item.ShopSrNumber,
                                                                    WheelId: item.WheelId,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="icon-hover"
                                                />
                                                &nbsp;&nbsp; {/* Add space between the icons */}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => handleDeletePreInspectionICF(item.WheelId || item.wheelid)}
                                                    className="icon-hover"
                                                    style={{ color: 'red' }} // Optional: style for the delete icon
                                                />


                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}

                {formType === "ICF" && results.finalInspection && results.finalInspection.length > 0 ? (
                    <div className="tred-turning">
                        <> <h3>ICF Final Inspection</h3>
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Wheel No.</th>
                                        <th>Date of Entry</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.finalInspection.map((item) => (
                                        <tr key={item.WheelId || item.wheelid}>
                                            <td>{item.WheelNo || item.ShopSrNumber}</td>
                                            <td>{formatDate(item.createdDate)}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPen}

                                                    onClick={() =>
                                                        navigate(
                                                            "/parentediticf/UpdateICFfinalinspection/axle_details",
                                                            {
                                                                state: {
                                                                    WheelNo: item.WheelNo || item.ShopSrNumber,
                                                                    wheelid: item.WheelId || item.wheelid,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="icon-hover"
                                                />
                                                &nbsp;&nbsp; {/* Add space between the icons */}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => handleDeleteFinalICF(item.WheelId || item.wheelid)}
                                                    className="icon-hover"
                                                    style={{ color: 'red' }} // Optional: style for the delete icon
                                                />


                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    </div>
                ) : null}


                {formType === "ICF" && results.pressOn && results.pressOn.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>ICF PressOn</h3>
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Wheel No.</th>
                                        <th>Date of Entry</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.pressOn.map((item) => (
                                        <tr key={item.WheelId || item.wheelid}>
                                            <td>{item.WheelNo || item.ShopSrNumber}</td>
                                            <td>{formatDate(item.createdDate)}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPen}

                                                    onClick={() =>
                                                        navigate(
                                                            "/parentediticf/UpdateICFPressOnForm/icf_details",
                                                            {
                                                                state: {
                                                                    WheelNo: item.WheelNo || item.ShopSrNumber,
                                                                    wheelid: item.WheelId || item.wheelid,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="icon-hover"
                                                />
                                                &nbsp;&nbsp; {/* Add space between the icons */}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => handleDeletePressOnICF(item.WheelId || item.wheelid)}
                                                    className="icon-hover"
                                                    style={{ color: 'red' }} // Optional: style for the delete icon
                                                />


                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}

                {formType === "ICF" && results.pressOff && results.pressOff.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>ICF PressOff</h3>
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Wheel No.</th>
                                        <th>Date of Entry</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.pressOff.map((item) => (
                                        <tr key={item.WheelId || item.wheelid}>
                                            <td>{item.WheelNo || item.ShopSNo}</td>
                                            <td>{formatDate(item.createdDate)}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPen}

                                                    onClick={() =>
                                                        navigate(
                                                            "/parentediticf/UpdateICFPressOffForm/identification_details",
                                                            {
                                                                state: {
                                                                    WheelNo: item.WheelNo || item.ShopSNo,
                                                                    wheelid: item.WheelId || item.wheelid,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="icon-hover"
                                                />

                                                &nbsp;&nbsp; {/* Add space between the icons */}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => handleDeletePressOffICF(item.WheelId || item.wheelid)}
                                                    className="icon-hover"
                                                    style={{ color: 'red' }} // Optional: style for the delete icon
                                                />

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}

                {formType === "ICF" && results.divisionPreInspection && results.divisionPreInspection.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>ICF Division PreInspection</h3>
                            <table className="results-table">
                                <thead>
                                    <tr>
                                        <th>Wheel No.</th>
                                        <th>Date of Entry</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.divisionPreInspection.map((item) => (
                                        <tr key={item.WheelId || item.wheelid}>
                                            <td>{item.WheelNo || item.ShopSrNumber}</td>
                                            <td>{formatDate(item.createdDate)}</td>
                                            <td>
                                                <FontAwesomeIcon
                                                    icon={faPen}

                                                    onClick={() =>
                                                        navigate(
                                                            "/parentediticf/UpdateICFDivisionPreInspectionForm/wheel_details",
                                                            {
                                                                state: {
                                                                    WheelNo: item.WheelNo || item.ShopSrNumber,
                                                                    wheelid: item.WheelId || item.wheelid,
                                                                },
                                                            }
                                                        )
                                                    }
                                                    className="icon-hover"
                                                />
                                                &nbsp;&nbsp; {/* Add space between the icons */}
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    onClick={() => handleDeleteDivisionICF(item.WheelId || item.wheelid)}
                                                    className="icon-hover"
                                                    style={{ color: 'red' }} // Optional: style for the delete icon
                                                />

                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : null}
                {hasNoResults && <p>No results found for the specified Wheel No.</p>}
            </div>
        </div>
    );
};

export default EditICF;


import React, { useState } from "react";
import "../../resources/Search/search.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../../resources/pendingtasks/pendingtasks.css";

const Edit = () => {

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

    const handleDeleteDivision = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/division/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/edit");
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

    const handleDeleteFinal = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/finalinspection/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/edit");
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

    const handleDeletePressOff = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/pressoff/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/edit");
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

    const handleDeletePressOn = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/presson/deletedata/${wheelId}`, {
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

    const handleDeletePreInspection = async (wheelId) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");

        if (confirmDelete) {
            try {
                // Make an API call to delete the item
                const response = await api.delete(`/schedule/deletedata/${wheelId}`, {
                    method: "DELETE",
                });

                if (response.status === 200 || response.status === 204) {
                    alert("Item deleted successfully!");
                    navigate("/edit");
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

    // Function to handle search button click
    // const handleSearch = async () => {
    //     try {
    //         // Call the API and pass the selected parameters
    //         const response = await api.get("/lhb/search", { params: { wheelNo } }); // Passing wheelNo as a query parameter
    //         console.log("wheelNo", wheelNo);

    //         if (response.data && response.data.length > 0) {
    //             setResults(response.data);
    //         } else {
    //             setResults([]); // Clear the results if no data is found
    //         }
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //         setResults([]);
    //     }
    // };

    const handleSearch = async () => {
        try {
            const response = await api.get("/lhb/search", { params: { wheelNo } });
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

            <h1>Edit/Delete Form</h1>
            <div className="tt">
                {results.preInspection && results.preInspection.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>Pre-Inspection</h3>
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
                                                            "/parentedit/UpdateLHBSchedulePreInspection/details",
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
                                                    onClick={() => handleDeletePreInspection(item.WheelId || item.wheelid)}
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

                {results.finalInspection && results.finalInspection.length > 0 ? (
                    <div className="tred-turning">
                        <> <h3>Final Inspection</h3>
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
                                                            "/parentedit/Updatelhbfinalinspection/axle_details",
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
                                                    onClick={() => handleDeleteFinal(item.WheelId || item.wheelid)}
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


                {results.pressOn && results.pressOn.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>PressOn</h3>
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
                                                            "/parentedit/UpdateLHBPressOnForm/wheel_details",
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
                                                    onClick={() => handleDeletePressOn(item.WheelId || item.wheelid)}
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

                {results.pressOff && results.pressOff.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>PressOff</h3>
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
                                                            "/parentedit/UpdateLHBPressOffForm/identification_details",
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
                                                    onClick={() => handleDeletePressOff(item.WheelId || item.wheelid)}
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

                {results.divisionPreInspection && results.divisionPreInspection.length > 0 ? (
                    <>
                        <div className="tred-turning">
                            <h3>Division PreInspection</h3>
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
                                                            "/parentedit/UpdateLHBDivisionPreInspectionForm/wheel_details",
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
                                                    onClick={() => handleDeleteDivision(item.WheelId || item.wheelid)}
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

export default Edit;

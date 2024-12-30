import React, { useState } from "react";
import "../../resources/Search/search.css";
import api from "../Axios/AxiosConnection";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../resources/pendingtasks/pendingtasks.css";

const Edit = () => {
  const navigate = useNavigate(); // States to manage search input and results

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/division/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/finalinspection/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/pressoff/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/presson/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/schedule/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  //---------------------------------------------------VB HandleDelete---------------------------------------------------------------



  const handleDeleteDivisionVB = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/vbdivision/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeleteFinalVB = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/vbfinalinspection/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeletePressOffVB = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/vbpressoff/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeletePressOnVB = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/vbpresson/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeletePreInspectionVB = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/vbscheduledpreinspection/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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





  //---------------------------------------------------EMU HandleDelete---------------------------------------------------------------

  const handleDeleteDivisionEMU = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/emudivision/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeleteFinalEMU = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/emufinalinspection/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeletePressOffEMU = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/emupressoff/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeletePressOnEMU = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/emupresson/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const handleDeletePreInspectionEMU = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/emuscheduledpreinspection/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  //----------------------------------------------ICF HandleDelete-------------------------------------------------------------------

  const handleDeleteDivisionICF = async (wheelId) => {
    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/icfdivision/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/icffinalinspection/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/icfpressoff/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(`/icfpresson/deletedata/${wheelId}`, {
          method: "DELETE",
        });

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirmDelete) {
      try {
        // Make an API call to delete the item
        const response = await api.delete(
          `/icfschedule/deletedata/${wheelId}`,
          {
            method: "DELETE",
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("Item deleted successfully!");
          navigate("/parentedit/edit");
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

  const [results, setResults] = useState({
    preInspection: [],
    divisionPreInspection: [],
    finalInspection: [],
    pressOff: [],
    pressOn: [],
  });
  const [resultsEMU, setResultsEMU] = useState({
    preInspection: [],
    divisionPreInspection: [],
    finalInspection: [],
    pressOff: [],
    pressOn: [],
  });
  const [resultsICF, setResultsICF] = useState({
    preInspection: [],
    divisionPreInspection: [],
    finalInspection: [],
    pressOff: [],
    pressOn: [],
  });
  const [resultsVB, setResultsVB] = useState({
    preInspection: [],
    divisionPreInspection: [],
    finalInspection: [],
    pressOff: [],
    pressOn: [],
  });

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
    console.log("formType:", formType);

    try {
      setResults({
        preInspection: [],
        divisionPreInspection: [],
        finalInspection: [],
        pressOff: [],
        pressOn: [],
      });
      setResultsEMU({
        preInspection: [],
        divisionPreInspection: [],
        finalInspection: [],
        pressOff: [],
        pressOn: [],
      });
      setResultsICF({
        preInspection: [],
        divisionPreInspection: [],
        finalInspection: [],
        pressOff: [],
        pressOn: [],
      });
      setResultsVB({
        preInspection: [],
        divisionPreInspection: [],
        finalInspection: [],
        pressOff: [],
        pressOn: [],
      });

      if (formType === "LHB") {
        const response = await api.get("/lhb/search", { params: { wheelNo } });
        console.log("wheelNo", wheelNo);
        if (response.data) {
          setResults(response.data);
        } else {
          setResults({
            preInspection: [],
            divisionPreInspection: [],
            finalInspection: [],
            pressOff: [],
            pressOn: [],
          });
        }
      }
      if (formType === "EMU") {
        const response = await api.get("/emu/search", { params: { wheelNo } });
        console.log("wheelNo", wheelNo);
        if (response.data) {
          setResultsEMU(response.data);
        } else {
          setResultsEMU({
            preInspection: [],
            divisionPreInspection: [],
            finalInspection: [],
            pressOff: [],
            pressOn: [],
          });
        }
      }
      if (formType === "ICF") {
        const response = await api.get("/icf/search", { params: { wheelNo } });
        console.log("wheelNo", wheelNo);
        if (response.data) {
          setResultsICF(response.data);
        } else {
          setResultsICF({
            preInspection: [],
            divisionPreInspection: [],
            finalInspection: [],
            pressOff: [],
            pressOn: [],
          });
        }
      }
      if (formType === "VB") {
        const response = await api.get("/vb/search", { params: { wheelNo } });
        console.log("wheelNo", wheelNo);
        if (response.data) {
          setResultsVB(response.data);
        } else {
          setResultsVB({
            preInspection: [],
            divisionPreInspection: [],
            finalInspection: [],
            pressOff: [],
            pressOn: [],
          });
        }
      }

      // Set search flag to true after search is done
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults({
        preInspection: [],
        divisionPreInspection: [],
        finalInspection: [],
        pressOff: [],
        pressOn: [],
      });
      // Set search flag to true even on error
    }
  };
  // const handleSearch = async () => {
  //     try {
  //         const response = await api.get("/lhb/search", { params: { wheelNo } });
  //         console.log("wheelNo", wheelNo);

  //         if (response.data) {
  //             setResults(response.data);
  //         } else {
  //             setResults({ preInspection: [], divisionPreInspection: [], finalInspection: [], pressOff: [], pressOn: [] });
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //         setResults({ preInspection: [], divisionPreInspection: [], finalInspection: [], pressOff: [], pressOn: [] });
  //     }
  // };

  const hasNoResults =
    (!results.preInspection || results.preInspection.length === 0) &&
    (!results.finalInspection || results.finalInspection.length === 0) &&
    (!results.divisionPreInspection ||
      results.divisionPreInspection.length === 0) &&
    (!results.pressOff || results.pressOff.length === 0) &&
    (!results.pressOn || results.pressOn.length === 0);

  const [formType, setFormType] = useState("Select Wheel Type"); // Default to LHB

  return (
    <div className="difference-page">
      <div className="search-div-edit">
        <div className="search-diff-container">
          <label>Search By Wheel No. :</label>
          <input
            type="text"
            placeholder="Search by Wheel No."
            value={wheelNo}
            onChange={(e) => setWheelNo(e.target.value)}
          />
        </div>
        <div className="search-diff-container">
          <label>Filter By Form:</label>
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="form-filter-dropdown"
          >
            <option value="">Select Wheel Type</option>
            <option value="LHB">LHB</option>
            <option value="EMU">EMU</option>
            <option value="ICF">ICF</option>
            <option value="VB">VB</option>
          </select>
        </div>

        <div className="search-diff-container">
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <h1 className="difference-title">Edit/Delete Form</h1>
      <div className="tt">
        {formType === "LHB" &&
          results.preInspection &&
          results.preInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>LHB Pre-Inspection</h3>
              <table className="table-container">
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
                          onClick={() =>
                            handleDeletePreInspection(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "LHB" &&
          results.finalInspection &&
          results.finalInspection.length > 0 ? (
          <div className="tred-turning">
            <>
              <h3 style={{ backgroundColor: "#0B1D5E" }}>LHB Final Inspection</h3>
              <table className="table-container">
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
                          onClick={() =>
                            handleDeleteFinal(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
        ) : null}

        {formType === "LHB" && results.pressOn && results.pressOn.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>LHB PressOn</h3>
              <table className="table-container">
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
                          onClick={() =>
                            handleDeletePressOn(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "LHB" &&
          results.pressOff &&
          results.pressOff.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>LHB PressOff</h3>
              <table className="table-container">
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
                          onClick={() =>
                            handleDeletePressOff(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "LHB" &&
          results.divisionPreInspection &&
          results.divisionPreInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>LHB Division PreInspection</h3>
              <table className="table-container">
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
                          onClick={() =>
                            handleDeleteDivision(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {/* --------------------------VB-------------------------------- */}




        {formType === "VB" &&
          resultsVB.preInspection &&
          resultsVB.preInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>VB Pre-Inspection</h3>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsVB.preInspection.map((item) => (
                    <tr key={item.WheelId}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parenteditvb/UpdateVBSchedulePreInspection/details",
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
                          onClick={() =>
                            handleDeletePreInspectionVB(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "VB" &&
          resultsVB.finalInspection &&
          resultsVB.finalInspection.length > 0 ? (
          <div className="tred-turning">
            <>
              <h3 style={{ backgroundColor: "#0B1D5E" }}>VB Final Inspection</h3>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsVB.finalInspection.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parenteditvb/UpdateVBfinalinspection/axle_details",
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
                          onClick={() =>
                            handleDeleteFinalVB(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
        ) : null}

        {formType === "VB" && resultsVB.pressOn && resultsVB.pressOn.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>VB PressOn</h3>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsVB.pressOn.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parenteditvb/UpdateVBPressOnForm/wheel_details",
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
                          onClick={() =>
                            handleDeletePressOnVB(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "VB" &&
          resultsVB.pressOff &&
          resultsVB.pressOff.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>VB PressOff</h3>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsVB.pressOff.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSNo}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parenteditvb/UpdateVBPressOffForm/identification_details",
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
                          onClick={() =>
                            handleDeletePressOffVB(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "VB" &&
          resultsVB.divisionPreInspection &&
          resultsVB.divisionPreInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>VB Division PreInspection</h3>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsVB.divisionPreInspection.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parenteditvb/UpdateVBDivisionPreInspectionForm/wheel_details",
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
                          onClick={() =>
                            handleDeleteDivisionVB(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}





        {/* --------------------------EMU-------------------------------- */}

        {formType === "EMU" &&
          resultsEMU.divisionPreInspection &&
          resultsEMU.divisionPreInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>EMU Division PreInspection</h3>
              <table className="table-container">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsEMU.divisionPreInspection.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentemuedit/UpdateEMUDivisionPreInspectionForm/wheel_details",
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
                          onClick={() =>
                            handleDeleteDivisionEMU(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "EMU" &&
          resultsEMU.preInspection &&
          resultsEMU.preInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>EMU Pre-Inspection</h3>
              <table className="resultsEMU-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsEMU.preInspection.map((item) => (
                    <tr key={item.WheelId}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentemuedit/UpdateEMUSchedulePreInspectionForm/w1_details",
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
                          onClick={() =>
                            handleDeletePreInspectionEMU(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "EMU" &&
          resultsEMU.finalInspection &&
          resultsEMU.finalInspection.length > 0 ? (
          <div className="tred-turning">
            <>
              <h3 style={{ backgroundColor: "#0B1D5E" }}>EMU Final Inspection</h3>
              <table className="resultsEMU-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsEMU.finalInspection.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentemuedit/UpdateEMUFinalInspection/wheel_details",
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
                          onClick={() =>
                            handleDeleteFinalEMU(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
        ) : null}

        {formType === "EMU" &&
          resultsEMU.pressOn &&
          resultsEMU.pressOn.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>EMU PressOn</h3>
              <table className="resultsEMU-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsEMU.pressOn.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentemuedit/UpdateEMUPressOn/emu_details",
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
                          onClick={() =>
                            handleDeletePressOnEMU(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "EMU" &&
          resultsEMU.pressOff &&
          resultsEMU.pressOff.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>EMU PressOff</h3>
              <table className="resultsEMU-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsEMU.pressOff.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSNo}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentemuedit/UpdateEMUPressOffForm/identification_details",
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
                          onClick={() =>
                            handleDeletePressOffEMU(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {/*----------------------------------ICF FORM----------------------------------------------------------------------- */}

        {formType === "ICF" &&
          resultsICF.preInspection &&
          resultsICF.preInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>ICF Pre-Inspection</h3>
              <table className="resultsICF-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsICF.preInspection.map((item) => (
                    <tr key={item.WheelId}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentediticf/UpdateICFSchedulePreInspection/w1_details",
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
                          onClick={() =>
                            handleDeletePreInspectionICF(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "ICF" &&
          resultsICF.finalInspection &&
          resultsICF.finalInspection.length > 0 ? (
          <div className="tred-turning">
            <>
              {" "}
              <h3 style={{ backgroundColor: "#0B1D5E" }}>ICF Final Inspection</h3>
              <table className="resultsICF-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsICF.finalInspection.map((item) => (
                    <tr key={item.WheelId || item.wheelid}>
                      <td>{item.WheelNo || item.ShopSrNumber}</td>
                      <td>{formatDate(item.createdDate)}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faPen}
                          onClick={() =>
                            navigate(
                              "/parentediticf/UpdateICFfinalinspection/wheel_details",
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
                          onClick={() =>
                            handleDeleteFinalICF(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          </div>
        ) : null}

        {formType === "ICF" &&
          resultsICF.pressOn &&
          resultsICF.pressOn.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>ICF PressOn</h3>
              <table className="resultsICF-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsICF.pressOn.map((item) => (
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
                          onClick={() =>
                            handleDeletePressOnICF(item.WheelId || item.wheelid)
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "ICF" &&
          resultsICF.pressOff &&
          resultsICF.pressOff.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>ICF PressOff</h3>
              <table className="resultsICF-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsICF.pressOff.map((item) => (
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
                          onClick={() =>
                            handleDeletePressOffICF(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {formType === "ICF" &&
          resultsICF.divisionPreInspection &&
          resultsICF.divisionPreInspection.length > 0 ? (
          <>
            <div className="tred-turning">
              <h3 style={{ backgroundColor: "#0B1D5E" }}>ICF Division PreInspection</h3>
              <table className="resultsICF-table">
                <thead>
                  <tr>
                    <th>Wheel No.</th>
                    <th>Date of Entry</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {resultsICF.divisionPreInspection.map((item) => (
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
                          onClick={() =>
                            handleDeleteDivisionICF(
                              item.WheelId || item.wheelid
                            )
                          }
                          className="icon-hover"
                          style={{ color: "red" }} // Optional: style for the delete icon
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {hasNoResults && (
          <p style={{ textAlign: "center" }}>
            No results found for the specified Wheel No.
          </p>
        )}
      </div>
    </div>
  );
};

export default Edit;

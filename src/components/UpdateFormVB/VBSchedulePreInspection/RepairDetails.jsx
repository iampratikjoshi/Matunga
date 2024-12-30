import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../../../resources/LHB/NewPreInspectionForm/newpreinspectionform.css";
import api from "../../Axios/AxiosConnection";

function RepairDetails({
  formDataVB,
  setFormDataVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null); // Single file state
  const [isBackNavigation, setIsBackNavigation] = useState(false); // State to track back navigation
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file); // Set the single file to state
      }
    },
  });

  const [showHeavyRepairFields, setshowHeavyRepairFields] = useState(false);

  useEffect(() => {
    if (formDataVB.TypeOfRepair === "HeavyRepair") {
      setshowHeavyRepairFields(true);
    } else {
      setshowHeavyRepairFields(false);
    }
  }, [formDataVB.TypeOfRepair]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataVB);
  };

  const handleCancel = () => {
    setFormDataVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 3,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBSchedulePreInspection/details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/parenteditvb/UpdateVBSchedulePreInspection/ctrbb_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.put("/vbscheduledpreinspection/editdata/" + formDataVB.WheelId, formDataVB); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataVB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 3,
        }));
  
        // Navigate only after successful update
        navigate("/parentedit/edit");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <div className="componentPreInspection">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        VB PRE INSPECTION FORM{" "}
      </h2>
      <h2>Repair Details for VB PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentLHB">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1" style={{ columnGap: "33px" }}>
              <div>
                <label>Type of Repair:</label>
                <select
                  name="TypeOfRepair"
                  value={formDataVB.TypeOfRepair}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Type of Repair</option>
                  <option value="NormalRepair">Normal Repair</option>
                  <option value="HeavyRepair">Heavy Repair</option>
                </select>
              </div>
              {showHeavyRepairFields && (
                <div className="row">
                  <div>
                    <label>
                      <input type="checkbox" name="rd" defaultChecked /> RD
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" name="ra" defaultChecked /> RA
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" name="bdd" defaultChecked /> BDD
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label>Matunga Remark:</label>
                <input
                  type="text"
                  name="MatungaRemark"
                  value={formDataVB.MatungaRemark}
                  onChange={handleChange}
                  placeholder="Enter Matunga Remark"
                />
              </div>
            </div>
            <div className="PreInspectionrow-2">
              <div>
                <label>Inspector Ticket No.:</label>
                <input
                  type="text"
                  name="InspectorTicketNo"
                  value={formDataVB.InspectorTicketNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector Ticket No."
                />
              </div>
              <div>
                <label>Fitment Date:</label>
                <input
                  type="date"
                  name="FitmentDate"
                  value={formDataVB.FitmentDate}
                  onChange={handleChange}
                />
              </div>
              <div className="file-container">
                <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Upload Image:
                </span>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="upload-icon">
                    <IoCloudUploadOutline />
                  </span>
                  <span className="drag-drop">Drag & drop files</span>
                  <span className="drag-or">---------- or ----------</span>
                  <button className="browse-button">Browse</button>
                </div>
                <div className="uploading-section">
                  {file ? (
                    <div className="file-row">
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <span style={{ marginTop: "5px" }}>
                      No image uploaded yet.
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="PreInspectionrow-3">
              <div>
                <label>Inspector Name:</label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataVB.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
              </div>
              <div>
                <label>In Date:</label>
                <input
                  type="date"
                  name="createdDate"
                  value={
                    formDataVB.createdDate
                      ? formDataVB.createdDate
                      : new Date().toISOString().split("T")[0]
                  } // Default to current date if null
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormDataVB((prev) => ({
                      ...prev,
                      [name]: value ? value : new Date().toISOString().split("T")[0],
                    }));
                  }}
                />
              </div>
              
            </div>
            <div className="PreInspectionrow-3">
            <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataPressOffLHB.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>
              <div></div>
            </div>

            <div className="btn-containerPreInspection">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/parenteditvb/updateproceedsubmitvbschedule");
                  }}
                >
                  Preview for Submission
                </button>
              </div>
              <div>
                <button onClick={handleBack}>Back</button>
              </div>
              <div>
                <button className="red_btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepairDetails;

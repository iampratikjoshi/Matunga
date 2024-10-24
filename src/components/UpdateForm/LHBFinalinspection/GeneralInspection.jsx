import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { postData } from "../../Axios/AxiosConnection";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

function GeneralInspection({
  formDataFinal,
  setFormDataFinal,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null); // Single file state
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
    // console.log(formDataFinal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/finalinspection/editdata/" + formDataFinal.wheelid, formDataFinal); // Use putData for updating

      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);

        // Reset the form
        setFormDataFinal((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 1,
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


  const handleCancel = () => {
    setFormDataFinal((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 4,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parentedit/Updatelhbfinalinspection/axle_details");
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/parentedit/Updatelhbfinalinspection/ctrbb_details");
  };

  const navigate = useNavigate();

  return (
    <div className="component">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        LHB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>General Inspection for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>UST Name:</label>
                <input
                  type="text"
                  name="USTName"
                  value={formDataFinal.USTName}
                  onChange={handleChange}
                  placeholder="Enter UST Name"
                />
              </div>
              <div>
                <label>Wheel Tread UST:</label>
                <input
                  type="text"
                  name="WheelTreadUST"
                  value={formDataFinal.WheelTreadUST}
                  onChange={handleChange}
                  placeholder="Enter Wheel Tread UST"
                />
              </div>
              <div>
                <label>Fitting Date:</label>
                <input
                  type="date"
                  name="FittingDt"
                  value={formDataFinal.FittingDt}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>ECA Test:</label>
                {/* <input
                  type="text"
                  name="ECATest"
                  value={formDataFinal.ECATest}
                  onChange={handleChange}
                  placeholder="Enter ECA Test Result"
                /> */}
                <select
                  name="ECATest"
                  value={formDataFinal.ECATest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select ECA Test</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
              </div>

              <div>
                <label>Inspector Name:</label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataFinal.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
              </div>
              <div>
                <label>Inspector Ticket No.:</label>
                <input
                  type="text"
                  name="InspectorTicketNo"
                  value={formDataFinal.InspectorTicketNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector Ticket No."
                />
              </div>
            </div>
            <div className="row-3">
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
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Update
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/parentedit/updateproceedsubmitFinal");
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

export default GeneralInspection;
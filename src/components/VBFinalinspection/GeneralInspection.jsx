import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function GeneralInspection({
  formDataFinalVB,
  setFormDataFinalVB,
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
    // console.log(formDataFinalVB);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/vb/finalinspection/data", formDataFinalVB);
      console.log(response.AxleNo);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataFinalVB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 1,
        }));

        navigate("/VBfinalinspection/axle_details");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = () => {
    setFormDataFinalVB((prevFormData) => ({
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
    navigate("/VBfinalinspection/axle_details");
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/VBfinalinspection/ctrbb_details");
  };

  const navigate = useNavigate();

  return (
    <div className="componentFinal">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        VB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>General Inspection for VB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              <div>
                <label>UST Name:</label>
                <input
                  type="text"
                  name="USTName"
                  value={formDataFinalVB.USTName}
                  onChange={handleChange}
                  placeholder="Enter UST Name"
                />
              </div>
              <div>
                <label>Wheel Tread UST:</label>
                <input
                  type="text"
                  name="WheelTreadUST"
                  value={formDataFinalVB.WheelTreadUST}
                  onChange={handleChange}
                  placeholder="Enter Wheel Tread UST"
                />
              </div>
              <div>
                <label>Fitting Date:</label>
                <input
                  type="date"
                  name="FittingDt"
                  value={formDataFinalVB.FittingDt}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="Finalrow-2">
              <div>
                <label>ECA Test:</label>
                {/* <input
                  type="text"
                  name="ECATest"
                  value={formDataFinalVB.ECATest}
                  onChange={handleChange}
                  placeholder="Enter ECA Test Result"
                /> */}
                <select
                  name="ECATest"
                  value={formDataFinalVB.ECATest}
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
                  value={formDataFinalVB.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
              </div>
              <div>
                <label>Inspector Ticket No.:</label>
                <input
                  type="text"
                  name="InspectorTicketNo"
                  value={formDataFinalVB.InspectorTicketNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector Ticket No."
                />
              </div>
            </div>
            <div className="Finalrow-3">
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
              <div>
                <label>In Date:</label>
                <input
                  type="date"
                  name="createdDate"
                  value={
                    formDataFinalVB.createdDate
                      ? formDataFinalVB.createdDate
                      : new Date().toISOString().split("T")[0]
                  } // Default to current date if null
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormDataFinalVB((prev) => ({
                      ...prev,
                      [name]: value ? value : new Date().toISOString().split("T")[0],
                    }));
                  }}
                />
              </div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerFinal">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/proceedsubmitFinalVB");
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

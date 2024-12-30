import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { postData } from "../Axios/AxiosConnection";

function Details({
  formDataRejectionSheetEMU,
  setFormDataRejectionSheetEMU,
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
    if (formDataRejectionSheetEMU.TypeOfRepair === "HeavyRepair") {
      setshowHeavyRepairFields(true);
    } else {
      setshowHeavyRepairFields(false);
    }
  }, [formDataRejectionSheetEMU.TypeOfRepair]);

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
    console.log(formDataRejectionSheetEMU);
  };

  const handleCancel = () => {
    setFormDataRejectionSheetEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 6,
      WheeltypeId: 4,
    }));
    onResetStep();
    navigate("/emurejectionsheetform/bearing_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/emurejectionsheetform/bearing_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postData("/bearingrejectionemu/data", formDataRejectionSheetEMU);
      console.log(response.AxleNumber);
      if (response) {
        const data = await response; // Get JSON from the response
        console.log("Form submitted successfully:", data);
        setFormDataRejectionSheetEMU((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 6,
          WheeltypeId: 4,
        }));

        navigate("/emurejectionsheetform/bearing_details");
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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
        EMU Bearing Rejection Sheet FORM{" "}
      </h2>
      <h2>Details for EMU Bearing Rejection Sheet Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
        <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Date Last Inspection:
                </label>
                <input
                  type="date"
                  name="DateLastInspection"
                  value={formDataRejectionSheetEMU.DateLastInspection}
                  onChange={handleChange}
                />

              </div>
              <div>
                <label>
                  Life Of Bearing:
                </label>
                <input
                  type="text"
                  name="LifeOfBearing"
                  value={formDataRejectionSheetEMU.LifeOfBearing}
                  onChange={handleChange}
                  placeholder="Enter Life Of Bearing."
                />

              </div>
              <div>
                <label>
                  Date Of Initial Fitment:
                </label>
                <input
                  type="date"
                  name="DateOfInitialFitment"
                  value={formDataRejectionSheetEMU.DateOfInitialFitment}
                  onChange={handleChange}
                />

              </div>

            </div>
            <div className="row-2">

              <div>
                <label>
                  Cause Of Rejection:
                </label>
                <input
                  type="text"
                  name="CauseOfRejection"
                  value={formDataRejectionSheetEMU.CauseOfRejection}
                  onChange={handleChange}
                  placeholder="Enter Cause Of Rejection"
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
            <div className="row-3">
              <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataRejectionSheetEMU.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>
              
            </div>
            <div className="row-3"></div>
            <div></div>
            <div></div>
            <div className="btn-container">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate("/proceedsubmitEMUrejectionsheet");
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

export default Details;

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import api, { postData } from "../../Axios/AxiosConnection";

function InspectorDetails({ formDataPressOffLHB, setFormDataPressOffLHB, onInputChange,
  onNextStep,
  onResetStep, }) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [file, setFile] = useState(null); // Single file state
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file); // Set the single file to state
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleBack = () => {
    navigate("/parentedit/UpdateLHBPressOffForm/wheel_details");
  };
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
    console.log(formDataPressOffLHB);
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formDataPressOffLHB.OperatorTNo) {
      newErrors.OperatorTNo = "Operator T.No. is required.";
    }

    if (!formDataPressOffLHB.InspectorTNo) {
      newErrors.InspectorTNo = "Inspector T.No. is required.";
    }

    if (!formDataPressOffLHB.OperatorName) {
      newErrors.OperatorName = "Inspector Name is required.";
    }

    if (!formDataPressOffLHB.InspectorName) {
      newErrors.InspectorName = "Inspector Name is required.";
    }

    if (!formDataPressOffLHB.MachineNumber) {
      newErrors.MachineNumber = "Machine No. is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormDataPressOffLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 1,
    }));
    onResetStep();
    navigate("/parentedit/UpdateLHBPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.put("/pressoff/editdata/" + formDataPressOffLHB.wheelid, formDataPressOffLHB); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataPressOffLHB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 5,
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

  return (
    <div className="componentPressonoff">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "black",
          opacity: 1,
        }}
      >
        PRESS-OFF OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Wheel Details For PRESS-OFF OF LHB WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">

              <div>
                <label>Operator T.No.<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="OperatorTNo"
                  value={formDataPressOffLHB.OperatorTNo}
                  onChange={handleChange}
                  placeholder="Enter Operator T.No."
                />
                {errors.OperatorTNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.OperatorTNo}</p>
                )}
              </div>
              <div>
                <label>
                  Operator Name:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="OperatorName"
                  value={formDataPressOffLHB.OperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />
                {errors.OperatorName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.OperatorName}
                  </p>
                )}
              </div>
              <div>
                <label>Inspector T.No.<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="InspectorTNo"
                  value={formDataPressOffLHB.InspectorTNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector T.No."
                />
                {errors.InspectorTNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.InspectorTNo}</p>
                )}
              </div>



            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Inspector Name:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataPressOffLHB.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
                {errors.InspectorName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.InspectorName}
                  </p>
                )}
              </div>

              <div>
              <label>
                  Machine No.<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="MachineNumber"
                  value={formDataPressOffLHB.MachineNumber}
                  onChange={handleChange}
                  placeholder="Enter Machine No."
                />
                {errors.MachineNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.MachineNumber}
                  </p>
                )}
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
            <div className="Pressonoffrow-3">
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

            </div>
            <div className="btn-containerPressonoff">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Update
                </button>
              </div>
              <div>
                <button onClick={() => { if (validateForm()) { navigate("/parentedit/updateproceedsubmitpressoff") } }}>
                  Preview for Submission
                </button>
              </div>
              <div>
                <button className="back_btn" onClick={handleBack}>Back</button>
              </div>
              <div>
                <button className="red_btn" onClick={handleCancel}>Cancel</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectorDetails;

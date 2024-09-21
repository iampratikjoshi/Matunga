import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../Axios/AxiosConnection";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";

function GeneralInspection({
  formDataFinal,
  setFormDataFinal,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [remark, setRemark] = useState(""); // State for remark dropdown
  const [otherRemark, setOtherRemark] = useState(""); // State for other remark input
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

  const handleRemarkChange = (event) => {
    const selectedRemark = event.target.value;
    setRemark(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(remark);

      setFormDataFinal((prevData) => ({
        ...prevData,
        FinalInspectionRemark: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        FinalInspectionRemark: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherRemarkChange = (event) => {
    const { value } = event.target;
    setOtherRemark(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      FinalInspectionRemark: value,
    }));

    console.log(formDataFinal.FinalInspectionRemark);
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
    // console.log(formDataFinal);
  };

  const handleSubmit = async (e) => {
    if (validateForm()) {
      e.preventDefault();

      try {
        const response = await postData("/api/data", formDataFinal);
        console.log(response.AxleNo);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
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

          navigate("/lhbfinalinspection/axle_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
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
    navigate("/lhbfinalinspection/axle_details");
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/brg_details");
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};


    if (!formDataFinal.USTName) {
      newErrors.USTName = "USTName is required.";
    }

    if (!formDataFinal.WheelTreadUST) {
      newErrors.WheelTreadUST = "Wheel Tread UST is required.";
    }

    if (!formDataFinal.FittingDt) {
      newErrors.FittingDt = "Fitting Date is required.";
    }

    if (!formDataFinal.ECATest) {
      newErrors.ECATest = "ECA Test is required.";
    }

    if (!formDataFinal.InspectorName) {
      newErrors.InspectorName = "Inspector Name is required.";
    }
    if (!formDataFinal.InspectorTicketNo) {
      newErrors.InspectorTicketNo = "Inspector Ticket No. is required.";
    }

    if (!formDataFinal.FinalInspectionRemark) {
      newErrors.FinalInspectionRemark = "Remark is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        LHB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>General Inspection for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">

              <div>
                <label>
                  UST Name:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="USTName"
                  value={formDataFinal.USTName}
                  onChange={handleChange}
                  placeholder="Enter UST Name"
                />
                {errors.USTName && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.USTName}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Wheel Tread UST:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelTreadUST"
                  value={formDataFinal.WheelTreadUST}
                  onChange={handleChange}
                  placeholder="Enter Wheel Tread UST"
                />
                {errors.WheelTreadUST && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelTreadUST}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Fitting Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="FittingDt"
                  value={formDataFinal.FittingDt}
                  onChange={handleChange}
                />
                {errors.FittingDt && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FittingDt}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  ECA Test:<span className="required-asterisk">*</span>
                </label>
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
                {errors.ECATest && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ECATest}
                  </p>
                )}
              </div>
              
              <div>
                <label>
                  Inspector Name:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataFinal.InspectorName}
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
                  Inspector Ticket No.:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="InspectorTicketNo"
                  value={formDataFinal.InspectorTicketNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector Ticket No."
                />
                {errors.InspectorTicketNo && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.InspectorTicketNo}
                  </p>
                )}
              </div>
            </div>
            <div className="row-3">
              <div>
                <label>Remark:<span className="required-asterisk">*</span></label>
                <select
                  name="FinalInspectionRemark"
                  value={remark}
                  onChange={handleRemarkChange}
                  required
                >
                  <option value="">Select Remark</option>
                  <option value="JUS">JUS</option>
                  <option value="SUS">SUS</option>
                  <option value="others">OTHERS</option>
                </select>
                {errors.FinalInspectionRemark && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FinalInspectionRemark}
                  </p>
                )}
              </div>
              {remark === "others" && (
                <div>
                  <label>Enter Specific Remark:</label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={otherRemark}
                    onChange={handleOtherRemarkChange}
                    placeholder="Enter Specific Remark"
                    // Adjust spacing
                  />
                </div>
              )}
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
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    if (validateForm()) {
                      navigate("/proceedsubmitFinal");
                    }
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

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function BDDetails({
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
    // console.log(formData);
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

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formDataFinal.BDMake) {
      newErrors.BDMake = "BD Make is required.";
    }

    if (!formDataFinal.BDSize) {
      newErrors.BDSize = "BD Size is required.";
    }

    if (!formDataFinal.ShoulderSize) {
      newErrors.ShoulderSize = "Shoulder Size is required.";
    }else if (isNaN(formDataFinal.ShoulderSize) || formDataFinal.ShoulderSize < 160.134 || formDataFinal.ShoulderSize > 160.174) {
      newErrors.ShoulderSize = "Shoulder Size must be between 160.134 and 160.174.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/ctrb_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/journal_details");
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
        LHB FINAL INSPECTION FORM
      </h2>
      <h2>BD Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  BD Make:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="BDMake"
                  value={formData.BDMake}
                  onChange={handleChange}
                  placeholder="Enter BD Make"
                /> */}
                <select
                  name="BDMake"
                  value={formDataFinal.BDMake}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select BD Make</option>
                  <option value="KNORR">KNORR</option>
                  <option value="FAIVELEY">FAIVELEY</option>
                  <option value="JWL">JWL</option>
                  <option value="PIONEER">PIONEER</option>
                </select>
                {errors.BDMake && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDMake}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDSize"
                  value={formDataFinal.BDSize}
                  onChange={handleChange}
                  placeholder="Enter BD Size"
                />
                {errors.BDSize && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDSize}
                  </p>
                )}
              </div>
              <div>
              <label>
                  Shoulder Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="ShoulderSize"
                  value={formDataFinal.ShoulderSize}
                  onChange={handleChange}
                  placeholder="Enter Shoulder Size"
                />
                {errors.ShoulderSize && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ShoulderSize}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div></div>
              <div></div>
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button onClick={handleBack}>Back</button>
              <button className="red_btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BDDetails;

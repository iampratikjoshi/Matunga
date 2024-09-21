import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function JournalDetails({
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
    console.log(formDataFinal);
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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formDataFinal.EndHole) {
      newErrors.EndHole = "End Hole is required.";
    }

    if (!formDataFinal.Size) {
      newErrors.Size = "Jr Size is required.";
    }else if (isNaN(formDataFinal.Size) || formDataFinal.Size < 130.043 || formDataFinal.Size > 130.068) {
      newErrors.Size = "Jr Size must be between 130.043 and 130.068.";
    }

    if (!formDataFinal.Oval) {
      newErrors.Oval = "Jr Oval is required.";
    }else if (isNaN(formDataFinal.Oval) || formDataFinal.Oval < 0 || formDataFinal.Oval > 0.015) {
      newErrors.Oval = "Jr Tap must be between 0 and 0.015.";
    }

    if (!formDataFinal.Tap) {
      newErrors.Tap = "Jr Tap is required.";
    }else if (isNaN(formDataFinal.Tap) || formDataFinal.Tap < 0 || formDataFinal.Tap > 0.020) {
      newErrors.Tap = "Jr Tap must be between 0 and 0.020.";
    }

    
    if (!formDataFinal.JrWaiviness) {
      newErrors.JrWaiviness = "Jr Waiviness is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/bd_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/wheel_details");
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
      <h2>Journal Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              
              <div>
                <label>
                  Jr. Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Size"
                  value={formDataFinal.Size}
                  onChange={handleChange}
                  placeholder="Enter Size"
                />
                {errors.Size && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.Size}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Jr. Oval:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Oval"
                  value={formDataFinal.Oval}
                  onChange={handleChange}
                  placeholder="Enter Oval"
                />
                {errors.Oval && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.Oval}
                  </p>
                )}
              </div>
              <div>
              <label>
                  Jr. Waiviness:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="JrWaiviness"
                  value={formDataFinal.JrWaiviness}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Jr. Waiviness</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                {errors.JrWaiviness && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.JrWaiviness}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Jr. Tap:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Tap"
                  value={formDataFinal.Tap}
                  onChange={handleChange}
                  placeholder="Enter Tap"
                />
                {errors.Tap && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.Tap}
                  </p>
                )}
              </div>
              
              <div>
                <label>
                  End Hole:<span className="required-asterisk">*</span>
                </label>
                
                <select
                  name="EndHole"
                  value={formDataFinal.EndHole}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select End Hole</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                {errors.EndHole && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.EndHole}
                  </p>
                )}
              </div>
              
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="row-2">
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

export default JournalDetails;

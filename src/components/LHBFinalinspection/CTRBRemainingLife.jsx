import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function CTRBRemainingLife({
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
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
    if (!formDataFinal.MEPA) {
        newErrors.MEPA = "MEP A is required.";
      } 
      
      if (!formDataFinal.MEPB) {
        newErrors.MEPB = "MEP B is required.";
      } 

      if (!formDataFinal.CTRBRemainingLifeA) {
        newErrors.CTRBRemainingLifeA= "CTRB Remaining Life A is required.";
      } 

      if (!formDataFinal.CTRBRemainingLifeB) {
        newErrors.CTRBRemainingLifeB = "CTRB Remaining Life B is required.";
      } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/brg_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/ctrb_details");
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
      <h2>CTRB Remaining Life Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>
                  MEP A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="MEPA"
                  value={formDataFinal.MEPA}
                  onChange={handleChange}
                  placeholder="Enter MEP A"
                />
                {errors.MEPA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.MEPA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  MEP B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="MEPB"
                  value={formDataFinal.MEPB}
                  onChange={handleChange}
                  placeholder="Enter MEP B"
                />
                {errors.MEPB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.MEPB}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
            <div>
                <label>
                  CTRB Remaining Life A(Months):<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBRemainingLifeA"
                  value={formDataFinal.CTRBRemainingLifeA}
                  onChange={handleChange}
                  placeholder="Enter CTRB Remaining Life A"
                />
                {errors.CTRBRemainingLifeA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBRemainingLifeA}
                  </p>
                )}
              </div>
            <div>
                <label>
                  CTRB Remaining Life B(Months):<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBRemainingLifeB"
                  value={formDataFinal.CTRBRemainingLifeB}
                  onChange={handleChange}
                  placeholder="Enter CTRB Remaining Life B"
                />
                {errors.CTRBRemainingLifeB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBRemainingLifeB}
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

export default CTRBRemainingLife;

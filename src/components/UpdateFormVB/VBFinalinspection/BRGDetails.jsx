import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function BRGDetails({
  formDataFinalVB,
  setFormDataFinalVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
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
    navigate("/parenteditvb/UpdateVBfinalinspection/axle_details");
  };

  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    if (!formDataFinalVB.BRGRemainLife) {
      newErrors.BRGRemainLife = "BRG Remain Life is required.";
    }

    if (!formDataFinalVB.BRGMake) {
      newErrors.BRGMake = "BRG Make is required.";
    }

    if (!formDataFinalVB.BRGNo) {
      newErrors.BRGNo = "BRG No is required.";
    }




    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/parenteditvb/UpdateVBfinalinspection/general_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/parenteditvb/UpdateVBfinalinspection/ctrbremaininglife_details");
  };

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
      <h2>BRG Details for VB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              <div>
                <label>
                  BRG No.:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BRGNo"
                  value={formDataFinalVB.BRGNo}
                  onChange={handleChange}
                  placeholder="Enter BRG No."
                />
                {errors.BRGNo && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BRGNo}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BRG Make:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="BRGMake"
                  value={formDataFinalVB.BRGMake}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select BRG Make</option>
                  <option value="SKF">SKF</option>
                  <option value="TIM">TIM</option>
                  <option value="NBC">NBC</option>
                </select>
                {errors.BRGMake && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BRGMake}
                  </p>
                )}
              </div>

              <div>
                <label>
                  BRG Remain Life:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BRGRemainLife"
                  value={formDataFinalVB.BRGRemainLife}
                  onChange={handleChange}
                  placeholder="Enter BRG Remain Life"
                />
                {errors.BRGRemainLife && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BRGRemainLife}
                  </p>
                )}
              </div>

            </div>
            <div className="Finalrow-2">
              <div></div>
              <div></div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerFinal">
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

export default BRGDetails;

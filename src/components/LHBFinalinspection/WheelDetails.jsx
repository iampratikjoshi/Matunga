import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function Wheeldetails({
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
    if (!formDataFinal.WheelDiaA) {
      newErrors.WheelDiaA = "Wheel Dia A is required.";
    }

    if (!formDataFinal.WheelDiaB) {
      newErrors.WheelDiaB = "Wheel Dia B is required.";
    }

    if (!formDataFinal.WheelRG) {
      newErrors.WheelRG = "Wheel RG is required.";
    }else if (isNaN(formDataFinal.WheelRG) || formDataFinal.WheelRG < 1599 || formDataFinal.WheelRG > 1602) {
      newErrors.WheelRG = "Wheel RG must be between 1599 and 1602.";
    }

    if (!formDataFinal.WheelFLG) {
      newErrors.WheelFLG = "Wheel FLG is required.";
    }

    if (!formDataFinal.DiscParticularA) {
      newErrors.DiscParticularA = "Disc Particular A is required.";
    }


    if (!formDataFinal.DiscParticularB) {
      newErrors.DiscParticularB = "Disc Particular B is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/journal_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/axle_details");
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
      <h2>Wheel Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
            <div>
                <label>
                  Wheel Dia A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiaA"
                  value={formDataFinal.WheelDiaA}
                  onChange={handleChange}
                  placeholder="Enter A/B Side"
                />
                {errors.WheelDiaA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiaA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Wheel Dia B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiaB"
                  value={formDataFinal.WheelDiaB}
                  onChange={handleChange}
                  placeholder="Enter Wheel Dia"
                />
                {errors.WheelDiaB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiaB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Wheel RG:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelRG"
                  value={formDataFinal.WheelRG}
                  onChange={handleChange}
                  placeholder="Enter Wheel RG"
                />
                {errors.WheelRG && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelRG}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Wheel FLG:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelFLG"
                  value={formDataFinal.WheelFLG}
                  onChange={handleChange}
                  placeholder="Enter Wheel FLG"
                />
                {errors.WheelFLG && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelFLG}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Disc Particular A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiscParticularA"
                  value={formDataFinal.DiscParticularA}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular A"
                />
                {errors.DiscParticularA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiscParticularA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Disc Particular B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiscParticularB"
                  value={formDataFinal.DiscParticularB}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular B"
                />
                {errors.DiscParticularB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiscParticularB}
                  </p>
                )}
              </div>
            </div>
            <div className="row-3">
              <div> </div>
              <div> </div>
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

export default Wheeldetails;

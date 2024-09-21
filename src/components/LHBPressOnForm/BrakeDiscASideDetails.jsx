import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscASideDetails({
  formDataPressOnLHB,
  setFormDataPressOnLHB,
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
    console.log(formDataPressOnLHB);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formDataPressOnLHB.BrakeDiscABBDSeatSize) {
      newErrors.BrakeDiscABBDSeatSize = "B' BD Seat Size is required.";
    } 

    if (!formDataPressOnLHB.BrakeDiscAAllow) {
      newErrors.BrakeDiscAAllow = "Allow is required.";
    } 

    if (!formDataPressOnLHB.BrakeDiscAPressOnPressure) {
      newErrors.BrakeDiscAPressOnPressure = "Press-On Pressure is required.";
    }

    if (!formDataPressOnLHB.BrakeDiscABDThickness) {
      newErrors.BrakeDiscABDThickness = "BD Thickness is required.";
    } 

    if (!formDataPressOnLHB.BrakeDiscABrakeDiscParticulars) {
      newErrors.BrakeDiscABrakeDiscParticulars =
        "Brake Disc make & Particulars is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormDataPressOnLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
    }));
    onResetStep();
    navigate("/LHBPressOnForm/wheel_details");
  };

  useEffect(() => {
    const calculateAllowance = () => {
      const { BrakeDiscABBDSeatSize, BrakeDiscAAvgXAxis, BrakeDiscAAvgYAxis } =
        formDataPressOnLHB;

      const avgX = parseFloat(BrakeDiscAAvgXAxis) || 0;
      const avgY = parseFloat(BrakeDiscAAvgYAxis) || 0;
      const WheelSeatSize = parseFloat(BrakeDiscABBDSeatSize) || 0;

      // const topY = parseFloat(WheelDiscATopYAxis) || 0;
      // const middleY = parseFloat(WheelDiscAMiddleYAxis) || 0;
      // const lowerY = parseFloat(WheelDiscALowerYAxis) || 0;

      // Calculate average
      const avgXY = ((avgX + avgY) / 2).toFixed(2);
      const allow = Math.abs(WheelSeatSize - avgXY).toFixed(2);

      // Update the formDataPressOnLHB with the calculated average
      setFormDataPressOnLHB((prevData) => ({
        ...prevData,
        BrakeDiscAAllow: allow,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAllowance();
  }, [
    formDataPressOnLHB.BrakeDiscAAvgXAxis,
    formDataPressOnLHB.BrakeDiscAAvgYAxis,
    formDataPressOnLHB.BrakeDiscABBDSeatSize,
    setFormDataPressOnLHB,
  ]);

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/LHBPressOnForm/brakediscBBoresize_details");
    }
  };

  const handleBack = () => {
    navigate("/LHBPressOnForm/brakediscABoresize_details");
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
        PRESS-ON OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Brake Disc A Side Details for PRESS-ON OF LHB WHEEL Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  B' BD Seat Size:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BrakeDiscABBDSeatSize"
                  value={formDataPressOnLHB.BrakeDiscABBDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' BD Seat Size"
                />
                {errors.BrakeDiscABBDSeatSize && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BrakeDiscABBDSeatSize}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Allow:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BrakeDiscAAllow"
                  value={formDataPressOnLHB.BrakeDiscAAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                  disabled
                />
                {errors.BrakeDiscAAllow && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BrakeDiscAAllow}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Press-On Pressure in Ton:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BrakeDiscAPressOnPressure"
                  value={formDataPressOnLHB.BrakeDiscAPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />
                {errors.BrakeDiscAPressOnPressure && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BrakeDiscAPressOnPressure}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  BD Thickness:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BrakeDiscABDThickness"
                  value={formDataPressOnLHB.BrakeDiscABDThickness}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness"
                />
                {errors.BrakeDiscABDThickness && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BrakeDiscABDThickness}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Brake Disc make & Particulars:
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BrakeDiscABrakeDiscParticulars"
                  value={formDataPressOnLHB.BrakeDiscABrakeDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc make & Particulars"
                />
                {errors.BrakeDiscABrakeDiscParticulars && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BrakeDiscABrakeDiscParticulars}
                  </p>
                )}
              </div>
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
              <div>
                <button className="back_btn" onClick={handleBack}>
                  Back
                </button>
              </div>
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

export default BrakeDiscASideDetails;

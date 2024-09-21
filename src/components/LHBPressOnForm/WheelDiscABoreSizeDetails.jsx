import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelDiscABoreSizeDetails({
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
    multiple: false, // Lower Y-axis only one file
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

  // Use useEffect to recalculate the average whenever any relevant X-axis value changes
  useEffect(() => {
    const calculateAverageXAxis = () => {
      const { WheelDiscATopXAxis, WheelDiscAMiddleXAxis, WheelDiscALowerXAxis, WheelDiscATopYAxis,WheelDiscAMiddleYAxis,WheelDiscALowerYAxis  } =
        formDataPressOnLHB;

      const topX = parseFloat(WheelDiscATopXAxis) || 0;
      const middleX = parseFloat(WheelDiscAMiddleXAxis) || 0;
      const lowerX = parseFloat(WheelDiscALowerXAxis) || 0;
      
      const topY = parseFloat(WheelDiscATopYAxis) || 0;
      const middleY = parseFloat(WheelDiscAMiddleYAxis) || 0;
      const lowerY = parseFloat(WheelDiscALowerYAxis) || 0;

      // Calculate average
      const avgX = ((topX + middleX + lowerX) / 3).toFixed(2);
      const avgY = ((topY + middleY + lowerY) / 3).toFixed(2);

      // Update the formDataPressOnLHB with the calculated average
      setFormDataPressOnLHB((prevData) => ({
        ...prevData,
        WheelDiscAAvgXAxis: avgX,
        WheelDiscAAvgYAxis:avgY,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAverageXAxis();
  }, [
    formDataPressOnLHB.WheelDiscATopXAxis,
    formDataPressOnLHB.WheelDiscAMiddleXAxis,
    formDataPressOnLHB.WheelDiscALowerXAxis,
    formDataPressOnLHB.WheelDiscATopYAxis,
    formDataPressOnLHB.WheelDiscAMiddleYAxis,
    formDataPressOnLHB.WheelDiscALowerYAxis,
    setFormDataPressOnLHB,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formDataPressOnLHB.WheelDiscATopXAxis) {
      newErrors.WheelDiscATopXAxis = "Top X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscATopYAxis) {
      newErrors.WheelDiscATopYAxis = "Top Y-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscAMiddleXAxis) {
      newErrors.WheelDiscAMiddleXAxis = "Middle X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscAMiddleYAxis) {
      newErrors.WheelDiscAMiddleYAxis = "Middle Y-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscALowerXAxis) {
      newErrors.WheelDiscALowerXAxis = "Lower X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscALowerYAxis) {
      newErrors.WheelDiscALowerYAxis = "Lower Y-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscAAvgXAxis) {
      newErrors.WheelDiscAAvgXAxis = "Average X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscAAvgYAxis) {
      newErrors.WheelDiscAAvgYAxis = "Average Y-Axis is required.";
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

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/LHBPressOnForm/wheeldiscA_details");
      // navigate("/LHBPressOnForm/wheeldiscB_details");
    }
  };

  const handleBack = () => {
    navigate("/LHBPressOnForm/wheel_details");
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
      <h2>Wheel Disc A Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Top X-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscATopXAxis"
                  value={formDataPressOnLHB.WheelDiscATopXAxis}
                  onChange={handleChange}
                  placeholder="Enter Top X-axis"
                />
                {errors.WheelDiscATopXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscATopXAxis}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Top Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscATopYAxis"
                  value={formDataPressOnLHB.WheelDiscATopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />
                {errors.WheelDiscATopYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscATopYAxis}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Middle X-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscAMiddleXAxis"
                  value={formDataPressOnLHB.WheelDiscAMiddleXAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle X-axis"
                />
                {errors.WheelDiscAMiddleXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscAMiddleXAxis}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Middle Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscAMiddleYAxis"
                  value={formDataPressOnLHB.WheelDiscAMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />
                {errors.WheelDiscAMiddleYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscAMiddleYAxis}
                  </p>
                )}
              </div>
            </div>

            <div className="row-3">
              <div>
                <label>
                  Lower X-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscALowerXAxis"
                  value={formDataPressOnLHB.WheelDiscALowerXAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower X-axis"
                />
                {errors.WheelDiscALowerXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscALowerXAxis}
                  </p>
                )}
              </div>

              <div>
                <label>
                  Lower Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscALowerYAxis"
                  value={formDataPressOnLHB.WheelDiscALowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />
                {errors.WheelDiscALowerYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscALowerYAxis}
                  </p>
                )}
              </div>
            </div>
            <div className="row-3">
              <div>
                <label>
                  Avg X-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscAAvgXAxis"
                  value={formDataPressOnLHB.WheelDiscAAvgXAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg X-axis"
                  disabled
                />
                {errors.WheelDiscAAvgXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscAAvgXAxis}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Avg Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscAAvgYAxis"
                  value={formDataPressOnLHB.WheelDiscAAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                  disabled
                />
                {errors.WheelDiscAAvgYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscAAvgYAxis}
                  </p>
                )}
              </div>
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

export default WheelDiscABoreSizeDetails;

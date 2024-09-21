import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheeldiscBBoresizeDetails({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataPressOnLHB);
  };

  // Use useEffect to recalculate the average whenever any relevant X-axis value changes
  useEffect(() => {
    const calculateAverageXAxis = () => {
      const { WheelDiscBTopXAxis, WheelDiscBMiddleXAxis, WheelDiscBLowerXAxis, WheelDiscBTopYAxis,WheelDiscBMiddleYAxis,WheelDiscBLowerYAxis  } =
        formDataPressOnLHB;

      const topX = parseFloat(WheelDiscBTopXAxis) || 0;
      const middleX = parseFloat(WheelDiscBMiddleXAxis) || 0;
      const lowerX = parseFloat(WheelDiscBLowerXAxis) || 0;
      
      const topY = parseFloat(WheelDiscBTopYAxis) || 0;
      const middleY = parseFloat(WheelDiscBMiddleYAxis) || 0;
      const lowerY = parseFloat(WheelDiscBLowerYAxis) || 0;

      // Calculate average
      const avgX = ((topX + middleX + lowerX) / 3).toFixed(2);
      const avgY = ((topY + middleY + lowerY) / 3).toFixed(2);

      // Update the formDataPressOnLHB with the calculated average
      setFormDataPressOnLHB((prevData) => ({
        ...prevData,
        WheelDiscBAvgXAxis: avgX,
        WheelDiscBAvgYAxis:avgY,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAverageXAxis();
  }, [
    formDataPressOnLHB.WheelDiscBTopXAxis,
    formDataPressOnLHB.WheelDiscBMiddleXAxis,
    formDataPressOnLHB.WheelDiscBLowerXAxis,
    formDataPressOnLHB.WheelDiscBTopYAxis,
    formDataPressOnLHB.WheelDiscBMiddleYAxis,
    formDataPressOnLHB.WheelDiscBLowerYAxis,
    setFormDataPressOnLHB,
  ]);

  const validateForm = () => {
    const newErrors = {};

    if (!formDataPressOnLHB.WheelDiscBTopXAxis) {
      newErrors.WheelDiscBTopXAxis = "Top X-Axis is required.";
    }

    if (!formDataPressOnLHB.WheelDiscBTopYAxis) {
      newErrors.WheelDiscBTopYAxis = "Top Y-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscBMiddleXAxis) {
      newErrors.WheelDiscBMiddleXAxis = "Middle X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscBMiddleYAxis) {
      newErrors.WheelDiscBMiddleYAxis = "Middle Y-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscBLowerXAxis) {
      newErrors.WheelDiscBLowerXAxis = "Lower X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscBLowerYAxis) {
      newErrors.WheelDiscBLowerYAxis = "Lower Y-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscBAvgXAxis) {
      newErrors.WheelDiscBAvgXAxis = "Average X-Axis is required.";
    } 

    if (!formDataPressOnLHB.WheelDiscBAvgYAxis) {
      newErrors.WheelDiscBAvgYAxis = "Average Y-Axis is required.";
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

  const handleBack = () => {
    navigate("/LHBPressOnForm/wheeldiscA_details");
  };

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/LHBPressOnForm/wheeldiscB_details");
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
        PRESS-ON OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Wheel Disc B Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>

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
                  name="WheelDiscBTopXAxis"
                  value={formDataPressOnLHB.WheelDiscBTopXAxis}
                  onChange={handleChange}
                  placeholder="Enter Top X-axis"
                />
                {errors.WheelDiscBTopXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBTopXAxis}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Top Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscBTopYAxis"
                  value={formDataPressOnLHB.WheelDiscBTopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />
                {errors.WheelDiscBTopYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBTopYAxis}
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
                  name="WheelDiscBMiddleXAxis"
                  value={formDataPressOnLHB.WheelDiscBMiddleXAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle X-axis"
                />
                {errors.WheelDiscBMiddleXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBMiddleXAxis}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Middle Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscBMiddleYAxis"
                  value={formDataPressOnLHB.WheelDiscBMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />
                {errors.WheelDiscBMiddleYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBMiddleYAxis}
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
                  name="WheelDiscBLowerXAxis"
                  value={formDataPressOnLHB.WheelDiscBLowerXAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower X-axis"
                />
                {errors.WheelDiscBLowerXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBLowerXAxis}
                  </p>
                )}
              </div>

              <div>
                <label>
                  Lower Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscBLowerYAxis"
                  value={formDataPressOnLHB.WheelDiscBLowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />
                {errors.WheelDiscBLowerYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBLowerYAxis}
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
                  name="WheelDiscBAvgXAxis"
                  value={formDataPressOnLHB.WheelDiscBAvgXAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg X-axis"
                  disabled
                />
                {errors.WheelDiscBAvgXAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBAvgXAxis}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Avg Y-axis:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="WheelDiscBAvgYAxis"
                  value={formDataPressOnLHB.WheelDiscBAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                  disabled
                />
                {errors.WheelDiscBAvgYAxis && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelDiscBAvgYAxis}
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

export default WheeldiscBBoresizeDetails;
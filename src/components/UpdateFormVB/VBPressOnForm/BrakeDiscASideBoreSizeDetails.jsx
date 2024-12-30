import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscASideBoreSizeDetails({
  formDataPressOnVB,
  setFormDataPressOnVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);

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
    console.log(formDataPressOnVB);
  };

  // Use useEffect to recalculate the average whenever any relevant X-axis value changes
  useEffect(() => {
    const calculateAverageXAxis = () => {
      const {
        BrakeDiscALowerXAxis,
        BrakeDiscALowerYAxis,
        BrakeDiscAMiddleXAxis,
        BrakeDiscAMiddleYAxis,
        BrakeDiscATopXAxis,
        BrakeDiscATopYAxis,
      } = formDataPressOnVB;

      const topX = parseFloat(BrakeDiscATopXAxis) || 0;
      const middleX = parseFloat(BrakeDiscAMiddleXAxis) || 0;
      const lowerX = parseFloat(BrakeDiscALowerXAxis) || 0;

      const topY = parseFloat(BrakeDiscATopYAxis) || 0;
      const middleY = parseFloat(BrakeDiscAMiddleYAxis) || 0;
      const lowerY = parseFloat(BrakeDiscALowerYAxis) || 0;

      // Calculate average
      const avgX = ((topX + middleX + lowerX) / 3).toFixed(2);
      const avgY = ((topY + middleY + lowerY) / 3).toFixed(2);

      // Update the formDataPressOnVB with the calculated average
      setFormDataPressOnVB((prevData) => ({
        ...prevData,
        BrakeDiscAAvgXAxis: avgX,
        BrakeDiscAAvgYAxis: avgY,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAverageXAxis();
  }, [
    formDataPressOnVB.BrakeDiscALowerXAxis,
    formDataPressOnVB.BrakeDiscALowerYAxis,
    formDataPressOnVB.BrakeDiscAMiddleXAxis,
    formDataPressOnVB.BrakeDiscAMiddleYAxis,
    formDataPressOnVB.BrakeDiscATopXAxis,
    formDataPressOnVB.BrakeDiscATopYAxis,
    setFormDataPressOnVB,
  ]);

  // else if (!/^[a-zA-Z0-9.]+$/.test(formDataPressOnVB.WheelDiscBWheelDiscParticulars)) {
  //   newErrors.WheelDiscBWheelDiscParticulars = "Wheel Disc Particulars must be alphanumeric.";
  // }



  const handleCancel = () => {
    setFormDataPressOnVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 3,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBPressOnForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/parenteditvb/UpdateVBPressOnForm/brakediscA_Bdetails");

  };

  const handleBack = () => {
    navigate("/parenteditvb/UpdateVBPressOnForm/wheeldiscB_details");
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
        PRESS-ON OF VB WHEEL FORM{" "}
      </h2>
      <h2>Brake Disc A Bore Size Details for PRESS-ON OF VB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  Top X-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscATopXAxis"
                  value={formDataPressOnVB.BrakeDiscATopXAxis}
                  onChange={handleChange}
                  placeholder="Enter Top X-axis"
                />

              </div>
              <div>
                <label>
                  Top Y-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscATopYAxis"
                  value={formDataPressOnVB.BrakeDiscATopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />

              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Middle X-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscAMiddleXAxis"
                  value={formDataPressOnVB.BrakeDiscAMiddleXAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle X-axis"
                />

              </div>
              <div>
                <label>
                  Middle Y-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscAMiddleYAxis"
                  value={formDataPressOnVB.BrakeDiscAMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />

              </div>
            </div>
            <div className="row-3">
              <div>
                <label>
                  Lower X-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscALowerXAxis"
                  value={formDataPressOnVB.BrakeDiscALowerXAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower X-axis"
                />

              </div>

              <div>
                <label>
                  Lower Y-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscALowerYAxis"
                  value={formDataPressOnVB.BrakeDiscALowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />

              </div>
            </div>
            <div className="row-3">
              <div>
                <label>
                  Avg X-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscAAvgXAxis"
                  value={formDataPressOnVB.BrakeDiscAAvgXAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg X-axis"
                  disabled
                />

              </div>
              <div>
                <label>
                  Avg Y-axis:
                </label>
                <input
                  type="text"
                  name="BrakeDiscAAvgYAxis"
                  value={formDataPressOnVB.BrakeDiscAAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                  disabled
                />

              </div>
          
            <div></div>
            </div>
            <div></div>
            <div></div>
            
            <div className="btn-containerPressonoff">
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

export default BrakeDiscASideBoreSizeDetails;

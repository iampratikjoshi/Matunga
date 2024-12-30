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

 

  const handleCancel = () => {
    setFormDataPressOnLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parentedit/UpdateLHBPressOnForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/parentedit/UpdateLHBPressOnForm/wheeldiscA_details");
      // navigate("/parentedit/UpdateLHBPressOnForm/wheeldiscB_details");
    
  };

  const handleBack = () => {
    navigate("/parentedit/UpdateLHBPressOnForm/wheelactivities_details");
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
        PRESS-ON OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Wheel Disc A Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>

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
                  name="WheelDiscATopXAxis"
                  value={formDataPressOnLHB.WheelDiscATopXAxis}
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
                  name="WheelDiscATopYAxis"
                  value={formDataPressOnLHB.WheelDiscATopYAxis}
                  onChange={handleChange}
                  placeholder="Enter Top Y-axis"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Middle X-axis:
                </label>
                <input
                  type="text"
                  name="WheelDiscAMiddleXAxis"
                  value={formDataPressOnLHB.WheelDiscAMiddleXAxis}
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
                  name="WheelDiscAMiddleYAxis"
                  value={formDataPressOnLHB.WheelDiscAMiddleYAxis}
                  onChange={handleChange}
                  placeholder="Enter Middle Y-axis"
                />
                
              </div>
            </div>

            <div className="Pressonoffrow-3">
              <div>
                <label>
                  Lower X-axis:
                </label>
                <input
                  type="text"
                  name="WheelDiscALowerXAxis"
                  value={formDataPressOnLHB.WheelDiscALowerXAxis}
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
                  name="WheelDiscALowerYAxis"
                  value={formDataPressOnLHB.WheelDiscALowerYAxis}
                  onChange={handleChange}
                  placeholder="Enter Lower Y-axis"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
                <label>
                  Avg X-axis:
                </label>
                <input
                  type="text"
                  name="WheelDiscAAvgXAxis"
                  value={formDataPressOnLHB.WheelDiscAAvgXAxis}
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
                  name="WheelDiscAAvgYAxis"
                  value={formDataPressOnLHB.WheelDiscAAvgYAxis}
                  onChange={handleChange}
                  placeholder="Enter Avg Y-axis"
                  disabled
                />
                
              </div>
            </div>
             <div></div>
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

export default WheelDiscABoreSizeDetails;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscBSideBoreSizeDetails({
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataPressOnLHB);
  };

  // Use useEffect to recalculate the average whenever any relevant X-axis value changes
  useEffect(() => {
    const calculateAverageXAxis = () => {
      const {
        BrakeDiscBLowerXAxis,
        BrakeDiscBLowerYAxis,
        BrakeDiscBMiddleXAxis,
        BrakeDiscBMiddleYAxis,
        BrakeDiscBTopXAxis,
        BrakeDiscBTopYAxis,
      } = formDataPressOnLHB;

      const topX = parseFloat(BrakeDiscBTopXAxis) || 0;
      const middleX = parseFloat(BrakeDiscBMiddleXAxis) || 0;
      const lowerX = parseFloat(BrakeDiscBLowerXAxis) || 0;

      const topY = parseFloat(BrakeDiscBTopYAxis) || 0;
      const middleY = parseFloat(BrakeDiscBMiddleYAxis) || 0;
      const lowerY = parseFloat(BrakeDiscBLowerYAxis) || 0;

      // Calculate average
      const avgX = ((topX + middleX + lowerX) / 3).toFixed(2);
      const avgY = ((topY + middleY + lowerY) / 3).toFixed(2);

      // Update the formDataPressOnLHB with the calculated average
      setFormDataPressOnLHB((prevData) => ({
        ...prevData,
        BrakeDiscBAvgXAxis: avgX,
        BrakeDiscBAvgYAxis: avgY,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAverageXAxis();
  }, [
    formDataPressOnLHB.BrakeDiscBLowerXAxis,
    formDataPressOnLHB.BrakeDiscBLowerYAxis,
    formDataPressOnLHB.BrakeDiscBMiddleXAxis,
    formDataPressOnLHB.BrakeDiscBMiddleYAxis,
    formDataPressOnLHB.BrakeDiscBTopXAxis,
    formDataPressOnLHB.BrakeDiscBTopYAxis,
    setFormDataPressOnLHB,
  ]);

  

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
      navigate("/parentedit/UpdateLHBPressOnForm/operator_details");
    
  };

  const handleBack = () => {
    navigate("/parentedit/UpdateLHBPressOnForm/brakediscA_Bdetails");
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
      <h2>Brake Disc B Bore Size Details for PRESS-ON OF LHB WHEEL Form</h2>

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
                  name="BrakeDiscBTopXAxis"
                  value={formDataPressOnLHB.BrakeDiscBTopXAxis}
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
                  name="BrakeDiscBTopYAxis"
                  value={formDataPressOnLHB.BrakeDiscBTopYAxis}
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
                  name="BrakeDiscBMiddleXAxis"
                  value={formDataPressOnLHB.BrakeDiscBMiddleXAxis}
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
                  name="BrakeDiscBMiddleYAxis"
                  value={formDataPressOnLHB.BrakeDiscBMiddleYAxis}
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
                  name="BrakeDiscBLowerXAxis"
                  value={formDataPressOnLHB.BrakeDiscBLowerXAxis}
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
                  name="BrakeDiscBLowerYAxis"
                  value={formDataPressOnLHB.BrakeDiscBLowerYAxis}
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
                  name="BrakeDiscBAvgXAxis"
                  value={formDataPressOnLHB.BrakeDiscBAvgXAxis}
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
                  name="BrakeDiscBAvgYAxis"
                  value={formDataPressOnLHB.BrakeDiscBAvgYAxis}
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

export default BrakeDiscBSideBoreSizeDetails;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscBsideDetails({
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

  useEffect(() => {
    const calculateAllowance = () => {
      const {
        BrakeDiscBBBDSeatSize,
        BrakeDiscBAvgXAxis,
        BrakeDiscBAvgYAxis,
      } = formDataPressOnLHB;

      const avgX = parseFloat(BrakeDiscBAvgXAxis) || 0;
      const avgY = parseFloat(BrakeDiscBAvgYAxis) || 0;
      const WheelSeatSize = parseFloat(BrakeDiscBBBDSeatSize) || 0;

      // const topY = parseFloat(WheelDiscATopYAxis) || 0;
      // const middleY = parseFloat(WheelDiscAMiddleYAxis) || 0;
      // const lowerY = parseFloat(WheelDiscALowerYAxis) || 0;

      // Calculate average
      const avgXY = ((avgX + avgY) / 2).toFixed(2);
      const allow = Math.abs(WheelSeatSize - avgXY).toFixed(2);


      // Update the formDataPressOnLHB with the calculated average
      setFormDataPressOnLHB((prevData) => ({
        ...prevData,
        BrakeDiscBAllow: allow,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAllowance();
  }, [
    formDataPressOnLHB.BrakeDiscBAvgXAxis,
    formDataPressOnLHB.BrakeDiscBAvgYAxis,
    formDataPressOnLHB.BrakeDiscBBBDSeatSize,
    setFormDataPressOnLHB,
  ]);

  const navigate = useNavigate();

  const saveandcontinue = () => {
   
      onNextStep();
      navigate("/parentedit/UpdateLHBPressOnForm/operator_details");
    
  };

  const handleBack = () => {
    navigate("/parentedit/UpdateLHBPressOnForm/brakediscBBoresize_details");
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
      <h2>Brake Disc B Side Details for PRESS-ON OF LHB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  B' BD Seat Size:
                </label>
                <input
                  type="text"
                  name="BrakeDiscBBBDSeatSize"
                  value={formDataPressOnLHB.BrakeDiscBBBDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' BD Seat Size"
                />
                
              </div>
              <div>
                <label>
                  Allow:
                </label>
                <input
                  type="text"
                  name="BrakeDiscBAllow"
                  value={formDataPressOnLHB.BrakeDiscBAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                  disabled
                />
                
              </div>
              <div>
                <label>
                  Press-On Pressure in Ton:
                  
                </label>
                <input
                  type="text"
                  name="BrakeDiscBPressOnPressure"
                  value={formDataPressOnLHB.BrakeDiscBPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  BD Thickness:
                </label>
                <input
                  type="text"
                  name="BrakeDiscBBDThickness"
                  value={formDataPressOnLHB.BrakeDiscBBDThickness}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness"
                />
                
              </div>
              <div>
                <label>
                  Brake Disc make & Particulars:
                  
                </label>
                <input
                  type="text"
                  name="BrakeDiscBBrakeDiscParticulars"
                  value={formDataPressOnLHB.BrakeDiscBBrakeDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc make & Particulars"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
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

export default BrakeDiscBsideDetails;

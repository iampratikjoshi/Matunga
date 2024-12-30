import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelsDiscAsideDetails({
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

  useEffect(() => {
    const calculateAllowance = () => {
      const {
        WheelDiscABWheelSeatSize,
        WheelDiscAAvgXAxis,
        WheelDiscAAvgYAxis,
      } = formDataPressOnLHB;

      const avgX = parseFloat(WheelDiscAAvgXAxis) || 0;
      const avgY = parseFloat(WheelDiscAAvgYAxis) || 0;
      const WheelSeatSize = parseFloat(WheelDiscABWheelSeatSize) || 0;

      // const topY = parseFloat(WheelDiscATopYAxis) || 0;
      // const middleY = parseFloat(WheelDiscAMiddleYAxis) || 0;
      // const lowerY = parseFloat(WheelDiscALowerYAxis) || 0;

      // Calculate average
      const avgXY = ((avgX + avgY) / 2).toFixed(2);
      const allow = Math.abs(WheelSeatSize - avgXY).toFixed(2);


      // Update the formDataPressOnLHB with the calculated average
      setFormDataPressOnLHB((prevData) => ({
        ...prevData,
        WheelDiscAAllow: allow,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAllowance();
  }, [
    formDataPressOnLHB.WheelDiscAAvgXAxis,
    formDataPressOnLHB.WheelDiscAAvgYAxis,
    formDataPressOnLHB.WheelDiscABWheelSeatSize,
    setFormDataPressOnLHB,
  ]);

  const handleBack = () => {
    navigate("/LHBPressOnForm/wheeldiscABoresize_details");
  };

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
    navigate("/LHBPressOnForm/wheel_details");
  };



  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/LHBPressOnForm/wheeldiscBBoresize_details");

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
      <h2>Wheel Disc A Side Details for PRESS-ON OF LHB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  VTL No.:
                </label>
                <input
                  type="text"
                  name="WheelDiscAVTLNO"
                  value={formDataPressOnLHB.WheelDiscAVTLNO}
                  onChange={handleChange}
                  placeholder="Enter VTL No."
                />

              </div>
              <div>
                <label>
                  Bore Size By Operator:

                </label>
                <input
                  type="text"
                  name="WheelDiscABoreSizeByOperator"
                  value={formDataPressOnLHB.WheelDiscABoreSizeByOperator}
                  onChange={handleChange}
                  placeholder="Enter Bore Size By Operator"
                />

              </div>
              <div>
                <label>
                  RA Value:
                </label>
                <input
                  type="text"
                  name="WheelDiscARAValue"
                  value={formDataPressOnLHB.WheelDiscARAValue}
                  onChange={handleChange}
                  placeholder="Enter RA Value"
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Operator Name:
                </label>
                <input
                  type="text"
                  name="WheelDiscAOperatorName"
                  value={formDataPressOnLHB.WheelDiscAOperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />

              </div>
              <div>
                <label>
                  B' Wheel Seat Size:

                </label>
                <input
                  type="text"
                  name="WheelDiscABWheelSeatSize"
                  value={formDataPressOnLHB.WheelDiscABWheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' Wheel Seat Size"
                />

              </div>

              <div>
                <label>
                  Allow:
                </label>
                <input
                  type="text"
                  name="WheelDiscAAllow"
                  value={formDataPressOnLHB.WheelDiscAAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                  disabled
                />

              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
                <label>
                  Press-On Pressure in Ton:

                </label>
                <input
                  type="text"
                  name="WheelDiscAPressOnPressure"
                  value={formDataPressOnLHB.WheelDiscAPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />

              </div>
              <div>
                <label>
                  RD No.:
                </label>
                <input
                  type="text"
                  name="WheelDiscARDNo"
                  value={formDataPressOnLHB.WheelDiscARDNo}
                  onChange={handleChange}
                  placeholder="Enter RD No."
                />

              </div>
              <div>
                <label>
                  Wheel Disc Particulars:

                </label>
                <input
                  type="text"
                  name="WheelDiscAWheelDiscParticulars"
                  value={formDataPressOnLHB.WheelDiscAWheelDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Particulars"
                />

              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
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

export default WheelsDiscAsideDetails;

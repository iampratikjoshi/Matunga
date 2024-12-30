import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BrakeDiscABSideDetails({
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
    console.log(formDataPressOnVB);
  };



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

  useEffect(() => {
    const calculateAllowance = () => {
      const { BrakeDiscABBDSeatSize, BrakeDiscAAvgXAxis, BrakeDiscAAvgYAxis } =
        formDataPressOnVB;

      const avgX = parseFloat(BrakeDiscAAvgXAxis) || 0;
      const avgY = parseFloat(BrakeDiscAAvgYAxis) || 0;
      const WheelSeatSize = parseFloat(BrakeDiscABBDSeatSize) || 0;

      // const topY = parseFloat(WheelDiscATopYAxis) || 0;
      // const middleY = parseFloat(WheelDiscAMiddleYAxis) || 0;
      // const lowerY = parseFloat(WheelDiscALowerYAxis) || 0;

      // Calculate average
      const avgXY = ((avgX + avgY) / 2).toFixed(2);
      const allow = Math.abs(WheelSeatSize - avgXY).toFixed(2);

      // Update the formDataPressOnVB with the calculated average
      setFormDataPressOnVB((prevData) => ({
        ...prevData,
        BrakeDiscAAllow: allow,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAllowance();
  }, [
    formDataPressOnVB.BrakeDiscAAvgXAxis,
    formDataPressOnVB.BrakeDiscAAvgYAxis,
    formDataPressOnVB.BrakeDiscABBDSeatSize,
    setFormDataPressOnVB,
  ]);

  useEffect(() => {
    const calculateAllowance = () => {
      const { BrakeDiscBBBDSeatSize, BrakeDiscBAvgXAxis, BrakeDiscBAvgYAxis } =
        formDataPressOnVB;

      const avgX = parseFloat(BrakeDiscBAvgXAxis) || 0;
      const avgY = parseFloat(BrakeDiscBAvgYAxis) || 0;
      const WheelSeatSize = parseFloat(BrakeDiscBBBDSeatSize) || 0;

      // const topY = parseFloat(WheelDiscATopYAxis) || 0;
      // const middleY = parseFloat(WheelDiscAMiddleYAxis) || 0;
      // const lowerY = parseFloat(WheelDiscALowerYAxis) || 0;

      // Calculate average
      const avgXY = ((avgX + avgY) / 2).toFixed(2);
      const allow = Math.abs(WheelSeatSize - avgXY).toFixed(2);

      // Update the formDataPressOnVB with the calculated average
      setFormDataPressOnVB((prevData) => ({
        ...prevData,
        BrakeDiscBAllow: allow,
      }));
    };

    // Trigger the average calculation whenever these fields change
    calculateAllowance();
  }, [
    formDataPressOnVB.BrakeDiscBAvgXAxis,
    formDataPressOnVB.BrakeDiscBAvgYAxis,
    formDataPressOnVB.BrakeDiscBBBDSeatSize,
    setFormDataPressOnVB,
  ]);

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/parenteditvb/UpdateVBPressOnForm/brakediscBBoresize_details");

  };

  const handleBack = () => {
    navigate("/parenteditvb/UpdateVBPressOnForm/brakediscABoresize_details");
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
      <h2>Brake Disc A & B Side Details for PRESS-ON OF VB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  A B' BD Seat Size:
                </label>
                <input
                  type="text"
                  name="BrakeDiscABBDSeatSize"
                  value={formDataPressOnVB.BrakeDiscABBDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' BD Seat Size"
                />

              </div>
              <div>
                <label>
                  A Allow:
                </label>
                <input
                  type="text"
                  name="BrakeDiscAAllow"
                  value={formDataPressOnVB.BrakeDiscAAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                  disabled
                />

              </div>
              <div>
                <label>
                  A Press-On Pressure in Ton:

                </label>
                <input
                  type="text"
                  name="BrakeDiscAPressOnPressure"
                  value={formDataPressOnVB.BrakeDiscAPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  A BD Thickness:
                </label>
                <input
                  type="text"
                  name="BrakeDiscABDThickness"
                  value={formDataPressOnVB.BrakeDiscABDThickness}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness"
                />

              </div>
              <div>
                <label>
                  A Brake Disc make & Particulars:

                </label>
                <input
                  type="text"
                  name="BrakeDiscABrakeDiscParticulars"
                  value={formDataPressOnVB.BrakeDiscABrakeDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc make & Particulars"
                />

              </div>
            </div>
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  B B' BD Seat Size:
                </label>
                <input
                  type="text"
                  name="BrakeDiscBBBDSeatSize"
                  value={formDataPressOnVB.BrakeDiscBBBDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' BD Seat Size"
                />

              </div>
              <div>
                <label>
                  B Allow:
                </label>
                <input
                  type="text"
                  name="BrakeDiscBAllow"
                  value={formDataPressOnVB.BrakeDiscBAllow}
                  onChange={handleChange}
                  placeholder="Enter Allow"
                  disabled
                />

              </div>
              <div>
                <label>
                  B Press-On Pressure in Ton:

                </label>
                <input
                  type="text"
                  name="BrakeDiscBPressOnPressure"
                  value={formDataPressOnVB.BrakeDiscBPressOnPressure}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure in Ton"
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  B BD Thickness:
                </label>
                <input
                  type="text"
                  name="BrakeDiscBBDThickness"
                  value={formDataPressOnVB.BrakeDiscBBDThickness}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness"
                />

              </div>
              <div>
                <label>
                  B Brake Disc make & Particulars:

                </label>
                <input
                  type="text"
                  name="BrakeDiscBBrakeDiscParticulars"
                  value={formDataPressOnVB.BrakeDiscBBrakeDiscParticulars}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc make & Particulars"
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

export default BrakeDiscABSideDetails;

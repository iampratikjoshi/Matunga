import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelDetails({
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

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOnVB((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOnVB]);

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
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/VBPressOnForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/VBPressOnForm/wheelactivities_details");

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
      <h2>Wheel Details for PRESS-ON OF VB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  Wheel No.:
                </label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataPressOnVB.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No."
                />

              </div>
              <div>
                <label>
                  Axle No:
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOnVB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No"
                />

              </div>
              <div>
                <label>
                  ATL No.:
                </label>
                <input
                  type="text"
                  name="ATLNo"
                  value={formDataPressOnVB.ATLNo}
                  onChange={handleChange}
                  placeholder="Enter ATL No."
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Wheel Seat Size:
                </label>
                <input
                  type="text"
                  name="WheelSeatSize"
                  value={formDataPressOnVB.WheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter Wheel Seat Size"
                />

              </div>
              <div>
                <label>
                  BD Seat Size:
                </label>
                <input
                  type="text"
                  name="BDSeatSize"
                  value={formDataPressOnVB.BDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter BD Seat Size"
                />

              </div>

              <div>
                <label>
                  RA Value(1.6 Max):
                </label>
                <input
                  type="text"
                  name="RAValue"
                  value={formDataPressOnVB.RAValue}
                  onChange={handleChange}
                  placeholder="Enter RA Value"
                />

              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
                <label>
                  Operator Name:
                </label>
                <input
                  type="text"
                  name="OperatorName"
                  value={formDataPressOnVB.OperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
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

export default WheelDetails;

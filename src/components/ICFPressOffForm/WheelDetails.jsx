import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function WheelDetails({ formDataPressOffICF, setFormDataPressOffICF, onInputChange,
  onNextStep,
  onResetStep, }) {
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
        setFile(file);  // Set the single file to state
      }
    },
  });

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffICF((prevFormData) => ({
        ...prevFormData,
        ShopSNo: WheelNo,
        wheelid: wheelid
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffICF]);


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
    console.log(formDataPressOffICF);
  };




  const handleBack = () => {
    navigate("/icfpressoffForm/wheelcondition_details");
  };

  const handleCancel = () => {
    setFormDataPressOffICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 2,
    }));
    onResetStep();
    navigate("/icfpressoffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    onNextStep();
    navigate("/icfpressoffForm/inspector_details");
  };

  return (
    <div className="componentPressonoff">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "black", opacity: 1 }}>PRESS-OFF OF ICF WHEEL FORM </h2>
      <h2> Wheel Details For PRESS-OFF OF ICF WHEEL FORM</h2>

     <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>Type Of Wheel:</label>
                <input
                  type="text"
                  name="TypeOfWheel"
                  value={formDataPressOffICF.TypeOfWheel}
                  onChange={handleChange}
                  placeholder="Enter Type Of Wheel"
                />

              </div>
              <div>
                <label>Wheel Pressed Off for RA/RD/RG</label>
                <input
                  type="text"
                  name="WheelPressedOff"
                  value={formDataPressOffICF.WheelPressedOff}
                  onChange={handleChange}
                  placeholder="Enter Wheel PressedOff for RA/RD/RG"
                />

              </div>
              <div>
                <label>
                  Reason:
                </label>
                <input
                  type="text"
                  name="Reason"
                  value={formDataPressOffICF.Reason}
                  onChange={handleChange}
                  placeholder="Enter Reason"
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Pressed Off Remark:
                </label>
                <input
                  type="text"
                  name="PressedOffRemark"
                  value={formDataPressOffICF.PressedOffRemark}
                  onChange={handleChange}
                  placeholder="Enter Pressed Off Remark"
                />

              </div>



              <div className="file-container">

              </div>
            </div>
            <div className="row-3">



              <div>

              </div>
            </div>
            <div className="btn-containerPressonoff">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button className="back_btn" onClick={handleBack}>Back</button>
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

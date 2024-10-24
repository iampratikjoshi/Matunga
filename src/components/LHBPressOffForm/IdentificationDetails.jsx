import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function IdentificationDetails({
  formDataPressOffLHB,
  setFormDataPressOffLHB,
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

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffLHB((prevFormData) => ({
        ...prevFormData,
        ShopSNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffLHB]);

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
    console.log(formDataPressOffLHB);
  };

  

  const handleCancel = () => {
    setFormDataPressOffLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 2,
      WheeltypeID: 1,
    }));
    onResetStep();
    navigate("/LHBPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/LHBPressOffForm/wheelcondition_details");
    
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
        PRESS-OFF OF LHB WHEEL FORM{" "}
      </h2>
      <h2> Wheel Details For PRESS-OFF OF LHB WHEEL FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Shop Sr.No. (Wheel No.):
                  
                </label>
                <input
                  type="text"
                  name="ShopSNo"
                  value={formDataPressOffLHB.ShopSNo}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr.No."
                />
               
              </div>
              <div>
                <label>
                  Axle No.:
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOffLHB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No."
                />
                
              </div>
              <div>
                <label>
                  Disc Sr.No.:
                </label>
                <input
                  type="text"
                  name="DiscSrNo"
                  value={formDataPressOffLHB.DiscSrNo}
                  onChange={handleChange}
                  placeholder="Enter Disc Sr.No."
                />
                
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Date:
                </label>
                <input
                  type="date"
                  name="Date"
                  value={formDataPressOffLHB.Date}
                  onChange={handleChange}
                />
                
              </div>
              <div>
                <label>
                  Shift No.:
                </label>
                <select
                  id="dropdown"
                  name="ShiftNumber"
                  value={formDataPressOffLHB.ShiftNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="Shift 1">Shift 1</option>
                  <option value="Shift 2">Shift 2</option>
                  <option value="Shift 3">Shift 3</option>
                </select>
                
              </div>
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
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

export default IdentificationDetails;

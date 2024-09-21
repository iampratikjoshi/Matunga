import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function IdentificationDetails({ formDataPressOffLHB, setFormDataPressOffLHB, onInputChange,
  onNextStep,
  onResetStep, }) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
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
      setFormDataPressOffLHB((prevFormData) => ({
        ...prevFormData,
        ShopSNo: WheelNo,
        wheelid: wheelid
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


  const validateForm = () => {
    const newErrors = {};
    if (!formDataPressOffLHB.Date) {
      newErrors.Date = "Date is required.";
    }



    if (!formDataPressOffLHB.ShopSNo) {
      newErrors.ShopSNo = "Shop Sr.No. is required.";
    }

    if (!formDataPressOffLHB.DiscSrNo) {
      newErrors.DiscSrNo = "Disc Sr.No. is required.";
    }
    if (!formDataPressOffLHB.ShiftNumber) {
      newErrors.ShiftNumber = "Shift No. is required.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (validateForm()) {
      onNextStep();
      navigate("/LHBPressOffForm/wheelcondition_details");
    }
  };

  return (
    <div className="component">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "white", opacity: 1 }}>PRESS-OFF OF LHB WHEEL FORM </h2>
      <h2> Wheel Details For PRESS-OFF OF LHB WHEEL FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">

          <div className="wheel-page-main-content">
            <div className="row-1">

              <div>
                <label>Shop Sr.No. (Wheel No.):<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="ShopSNo"
                  value={formDataPressOffLHB.ShopSNo}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr.No."
                />
                {errors.ShopSNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.ShopSNo}</p>
                )}
              </div>
              <div>
                <label>Axle No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOffLHB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No."
                />
                {errors.AxleNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.AxleNo}</p>
                )}
              </div>
              <div>
                <label>Disc Sr.No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="DiscSrNo"
                  value={formDataPressOffLHB.DiscSrNo}
                  onChange={handleChange}
                  placeholder="Enter Disc Sr.No."
                />
                {errors.DiscSrNo && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.DiscSrNo}</p>
                )}
              </div>

            </div>
            <div className="row-2">

              <div>
                <label>Date:<span className="required-asterisk">*</span></label>
                <input
                  type="date"
                  name="Date"
                  value={formDataPressOffLHB.Date}
                  onChange={handleChange}
                />
                {errors.Date && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.Date}</p>
                )}
              </div>
              <div>
                <label>Shift No.:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="ShiftNumber"
                  value={formDataPressOffLHB.ShiftNumber}
                  onChange={handleChange}
                  placeholder="Enter Shift No."
                />
                {errors.ShiftNumber && (
                  <p style={{ color: "red", fontSize: "small", margin: 0, marginTop: "2px", marginLeft: "2px" }}>{errors.ShiftNumber}</p>
                )}
              </div>

              <div className="file-container">

              </div>
            </div>
            <div className="row-3">



              <div>

              </div>
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

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function WheelDetails({ formDataPressOffLHB, setFormDataPressOffLHB, onInputChange,
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
        if (!formDataPressOffLHB.TypeOfWheel) {
          newErrors.TypeOfWheel = "Type Of Wheel is required.";
        }
    
        if (!formDataPressOffLHB.WheelPressedOff) {
          newErrors.WheelPressedOff = "Wheel Pressed Off is required.";
        }
    
        if (!formDataPressOffLHB.Reason) {
          newErrors.Reason = "Reason is required.";
        }
    
        if (!formDataPressOffLHB.PressedOffRemark) {
          newErrors.PressedOffRemark = "Pressed Off Remark is required.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };


      const handleBack = () => {
        navigate("/parentedit/UpdateLHBPressOffForm/wheelcondition_details");
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
        navigate("/parentedit/UpdateLHBPressOffForm/identification_details");
    };

    const navigate = useNavigate();

    const saveandcontinue = () => {
        if (validateForm()) {
            onNextStep();
            navigate("/parentedit/UpdateLHBPressOffForm/inspector_details");
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
                <label>Type Of Wheel:<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="TypeOfWheel"
                  value={formDataPressOffLHB.TypeOfWheel}
                  onChange={handleChange}
                  placeholder="Enter Type Of Wheel"
                />
                {errors.TypeOfWheel && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.TypeOfWheel}</p>
                )}
              </div>
              <div>
                <label>Wheel Pressed Off for RA/RD/RG<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  name="WheelPressedOff"
                  value={formDataPressOffLHB.WheelPressedOff}
                  onChange={handleChange}
                  placeholder="Enter Wheel PressedOff for RA/RD/RG"
                />
                {errors.WheelPressedOff && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.WheelPressedOff}</p>
                )}
              </div>
              <div>
                <label>
                Reason:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="Reason"
                  value={formDataPressOffLHB.Reason}
                  onChange={handleChange}
                  placeholder="Enter Reason"
                />
                {errors.Reason && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.Reason}</p>
                )}
              </div>
                        </div>
                        <div className="row-2">
                        <div>
                <label>
                Pressed Off Remark:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="PressedOffRemark"
                  value={formDataPressOffLHB.PressedOffRemark}
                  onChange={handleChange}
                  placeholder="Enter Pressed Off Remark"
                />
                {errors.PressedOffRemark && (
                  <p style={{ color: "red",fontSize:"small",margin:0, marginTop:"2px" , marginLeft:"2px" }}>{errors.PressedOffRemark}</p>
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

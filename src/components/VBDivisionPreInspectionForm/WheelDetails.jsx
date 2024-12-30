import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import "../../resources/LHB/NewPreInspectionForm/newpreinspectionform.css";

function WheelDetails({
  formDataDivisionVB,
  setFormDataDivision,
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
    // console.log(formData);
  };



  const handleCancel = () => {
    setFormDataDivision((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 1,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/VBDivisionPreInspectionForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/VBDivisionPreInspectionForm/report_details");

  };

  return (
    <div className="componentPreInspection">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        VB DIVISION PRE INSPECTION FORM{" "}
      </h2>
      <h2> Wheel Details For VB Division Pre Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentLHB">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
                <label>
                  Wheel No:
                </label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataDivisionVB.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No."
                />

              </div>

              <div>
                <label>
                  Loory No:
                </label>
                <input
                  type="text"
                  name="LooryNo"
                  value={formDataDivisionVB.LooryNo}
                  onChange={handleChange}
                  placeholder="Enter Loory No."
                />

              </div>

              <div className="file-container">

              </div>
            </div>
            <div className="PreInspectionrow-2">
              <div>

              </div>
            </div>

            <div className="PreInspectionrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="PreInspectionrow-3"></div>
            <div className="PreInspectionrow-3"></div>
            <div className="PreInspectionrow-3"></div>
            <div className="btn-containerPreInspection">
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

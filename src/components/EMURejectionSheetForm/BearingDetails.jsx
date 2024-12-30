import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BearingDetails({
  formDataRejectionSheetEMU,
  setFormDataRejectionSheetEMU,
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
    setFormDataRejectionSheetEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 6,
      WheeltypeId: 4,
    }));
    onResetStep();
    navigate("/emurejectionsheetform/bearing_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/emurejectionsheetform/report_details");
    
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
        EMU Bearing Rejection Sheet FORM{" "}
      </h2>
      <h2> Bearing Details For EMU Bearing Rejection Sheet Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Bearing No:
                </label>
                <input
                  type="text"
                  name="BearingNo"
                  value={formDataRejectionSheetEMU.BearingNo}
                  onChange={handleChange}
                  placeholder="Enter Bearing No."
                />
                
              </div>

              <div>
                <label>
                  Make:
                </label>
                <input
                  type="text"
                  name="Make"
                  value={formDataRejectionSheetEMU.Make}
                  onChange={handleChange}
                  placeholder="Enter Make."
                />
                
              </div>
              <div>
                <label>
                  Code/Year of MFG:
                </label>
                <input
                  type="text"
                  name="CodeorYearofMFG"
                  value={formDataRejectionSheetEMU.CodeorYearofMFG}
                  onChange={handleChange}
                  placeholder="Enter Code/Year of MFG."
                />
                
              </div>

              <div className="file-container">
                
              </div>
            </div>
            <div className="row-2">
            <div>
                <label>
                  Date of Rejection:
                </label>
                <input
                  type="date"
                  name="DateofRejection"
                  value={formDataRejectionSheetEMU.DateofRejection}
                  onChange={handleChange}
                />

              </div>
            </div>

            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="row-3"></div>
            <div className="row-3"></div>
            <div className="row-3"></div>
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

export default BearingDetails;

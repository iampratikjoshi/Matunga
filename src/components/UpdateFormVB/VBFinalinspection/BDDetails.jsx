import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function BDDetails({
  formDataFinalVB,
  setFormDataFinalVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [BDMake, setBDMake] = useState(formDataFinalVB.BDMake); 
  const [OtherBDMake, setOtherBDMake] = useState("");
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

  

  const handleBDMakeChange = (event) => {
    const selectedRemark = event.target.value;
    setBDMake(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinalVB((prevData) => ({
        ...prevData,
        BDMake: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinalVB((prevData) => ({
        ...prevData,
        BDMake: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDMakeChange = (event) => {
    const { value } = event.target;
    setOtherBDMake(value);
    setFormDataFinalVB((prevData) => ({
      ...prevData,
      BDMake: value,
    }));

    console.log(formDataFinalVB.BDMake);
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
    // console.log(formData);
  };

  const handleCancel = () => {
    setFormDataFinalVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 4,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBfinalinspection/axle_details");
  };

  const navigate = useNavigate();

 

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/parenteditvb/UpdateVBfinalinspection/ctrba_details");
    
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/parenteditvb/UpdateVBfinalinspection/journal_details");
  };

  return (
    <div className="componentFinal">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        VB FINAL INSPECTION FORM
      </h2>
      <h2>BD Details for VB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              <div>
                <label>
                  BD Make:
                </label>
                
                <select
                  name="BDMake"
                  value={BDMake}
                  onChange={handleBDMakeChange}
                  required
                >
                  <option value="">Select BD Make</option>
                  <option value="KNORR">KNORR</option>
                  <option value="FAIVELEY">FAIVELEY</option>
                  <option value="JWL">JWL</option>
                  <option value="PIONEER">PIONEER</option>
                  <option value="others">Others</option>
                </select>
                
              </div>
              {BDMake === "others" && (
                <div>
                  <label>
                    Enter Specific BD Make:
                    
                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherBDMake}
                    onChange={handleOtherBDMakeChange}
                    placeholder="Enter Specific BD Make"
                  // Adjust spacing
                  />
                  
                </div>
              )}
              <div>
                <label>
                  BD Size A:
                </label>
                <input
                  type="text"
                  name="BDSizeA"
                  value={formDataFinalVB.BDSizeA}
                  onChange={handleChange}
                  placeholder="Enter BD Size A"
                />
                
              </div>
              
              
            </div>
            <div className="Finalrow-2">
            <div>
                <label>
                  BD Size B:
                </label>
                <input
                  type="text"
                  name="BDSizeB"
                  value={formDataFinalVB.BDSizeB}
                  onChange={handleChange}
                  placeholder="Enter BD Size B"
                />
                
              </div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerFinal">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button onClick={handleBack}>Back</button>
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

export default BDDetails;

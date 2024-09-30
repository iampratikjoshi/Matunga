import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function BDDetails({
  formDataFinal,
  setFormDataFinal,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [BDMake, setBDMake] = useState(formDataFinal.BDMake); 
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
      setFormDataFinal((prevData) => ({
        ...prevData,
        BDMake: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        BDMake: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDMakeChange = (event) => {
    const { value } = event.target;
    setOtherBDMake(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      BDMake: value,
    }));

    console.log(formDataFinal.BDMake);
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
    setFormDataFinal((prevFormData) => ({
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
    navigate("/lhbfinalinspection/axle_details");
  };

  const navigate = useNavigate();

 

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/lhbfinalinspection/ctrba_details");
    
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/journal_details");
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
        LHB FINAL INSPECTION FORM
      </h2>
      <h2>BD Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
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
                  value={formDataFinal.BDSizeA}
                  onChange={handleChange}
                  placeholder="Enter BD Size A"
                />
                
              </div>
              
              
            </div>
            <div className="row-2">
            <div>
                <label>
                  BD Size B:
                </label>
                <input
                  type="text"
                  name="BDSizeB"
                  value={formDataFinal.BDSizeB}
                  onChange={handleChange}
                  placeholder="Enter BD Size B"
                />
                
              </div>
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
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

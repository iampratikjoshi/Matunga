import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api, { postData } from "../../Axios/AxiosConnection";

function OperatorDetails({
  formDataPressOnLHB,
  setFormDataPressOnLHB,
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
    console.log(formDataPressOnLHB);
  };

 
  const handleCancel = () => {
    setFormDataPressOnLHB((prevFormData) => ({
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
    navigate("/parentedit/UpdateLHBPressOnForm/wheel_details");
  };

  const handleBack = () => {
    navigate("/parentedit/UpdateLHBPressOnForm/brakediscBBoresize_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.put("/presson/editdata/" + formDataPressOnLHB.wheelid, formDataPressOnLHB); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataPressOnLHB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 1,
        }));
  
        // Navigate only after successful update
        navigate("/parentedit/edit");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
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
        PRESS-ON OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Operator Details for PRESS-ON OF LHB WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  M/C No.:
                </label>
                <input
                  type="text"
                  name="MCNo"
                  value={formDataPressOnLHB.MCNo}
                  onChange={handleChange}
                  placeholder="Enter M/C No."
                />
                
              </div>
              <div>
                <label>
                  Operator Name:
                </label>
                <input
                  type="text"
                  name="OperatorNameFinal"
                  value={formDataPressOnLHB.OperatorNameFinal}
                  onChange={handleChange}
                  placeholder="Enter Operator"
                />
                
              </div>
              <div>
                <label>
                  Operator No.:
                </label>
                <input
                  type="text"
                  name="OperatorNo"
                  value={formDataPressOnLHB.OperatorNo}
                  onChange={handleChange}
                  placeholder="Enter Operator"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
                <label>
                  Inspector Name:
                </label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataPressOnLHB.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
                
              </div>
              <div>
                <label>
                  Inspector No:
                </label>
                <input
                  type="text"
                  name="InspectorNo"
                  value={formDataPressOnLHB.InspectorNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector No."
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataPressOnLHB.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>

              <div className="file-container">
                <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Upload Image:
                </span>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="upload-icon">
                    <IoCloudUploadOutline />
                  </span>
                  <span className="drag-drop">Drag & drop files</span>
                  <span className="drag-or">--------- or ---------</span>
                  <button className="browse-button">Browse</button>
                </div>
                <div className="uploading-section">
                  {file ? (
                    <div className="file-row">
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <span style={{ marginTop: "5px" }}>
                      No image uploaded yet.
                    </span>
                  )}
                </div>
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
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Update
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                   
                      navigate("/parentedit/updateproceedsubmitlhbpresson");
                    
                  }}
                >
                  Preview for Submission
                </button>
              </div>
              <div>
                <button className="back_btn" onClick={handleBack}>
                  Back
                </button>
              </div>
              <div>
                <button className="red_btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperatorDetails;

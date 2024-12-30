import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function Status({
  formDataProceedSubmitEMUWearingClearance ,
  setformDataProceedSubmitEMUWearingClearance ,
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
    console.log(formDataProceedSubmitEMUWearingClearance );
  };

 
  const handleCancel = () => {
    setformDataProceedSubmitEMUWearingClearance ((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 3,
      WheeltypeID: 2,
    }));
    onResetStep();
    navigate("/wearingclearanceemu/wheel_details");
  };

  const handleBack = () => {
    navigate("/wearingclearanceemu/servicesbymonth");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await postData("/wearingclremu/data", formDataProceedSubmitEMUWearingClearance );
        console.log(response.AxleNumber);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setformDataProceedSubmitEMUWearingClearance ((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 2,
            WheeltypeId: 1,
          }));

          navigate("/wearingclearanceemu/wheel_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    
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
        Bearing Clearance Statement FORM
      </h2>
      <h2>Tag Status for Bearing Clearance Statement FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                Tag Status :
                </label>
                <input
                  type="text"
                  name="TagStatus"
                  value={formDataProceedSubmitEMUWearingClearance .TagStatus}
                  onChange={handleChange}
                  placeholder="Enter Tag Status"
                />
                
              </div>
             
              <div>
              <label>
                Front Cover :
                </label>
                <input
                  type="text"
                  name="FrontCover"
                  value={formDataProceedSubmitEMUWearingClearance .FrontCover}
                  onChange={handleChange}
                  placeholder="Enter Front Cover"
                />
              </div>
              <div>
              <label>
                Staff T. No. :
                </label>
                <input
                  type="text"
                  name="StaffTNo"
                  value={formDataProceedSubmitEMUWearingClearance .StaffTNo}
                  onChange={handleChange}
                  placeholder="Enter Staff T. No"
                />
              </div>
              
            </div>
            <div className="row-3">
              <div>
              <label>
                Inspector Name :
                </label>
                <input
                  type="text"
                  name="InspName"
                  value={formDataProceedSubmitEMUWearingClearance .InspName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
              </div>
              
              <div>
              <label>
                Inspector Ticket No :
                </label>
                <input
                  type="text"
                  name="InspTicket"
                  value={formDataProceedSubmitEMUWearingClearance .InspTicket}
                  onChange={handleChange}
                  placeholder="Enter Inspector Ticket No"
                />
              </div>
              <div>
              <label>
                Remark :
                </label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataProceedSubmitEMUWearingClearance .InspName}
                  onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>

              

              
            </div>
            <div className="row-2">
            <div className="file-container">
                <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Upload Image :
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

            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                   
                      navigate("/proceedsubmitemuwearingclearance");
                    
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

export default Status;

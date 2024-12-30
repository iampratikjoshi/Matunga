import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function Clearance({
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

  const saveandcontinue = () => {
    onNextStep();
    navigate("/wearingclearanceemu/servicesbymonth");
  };

  const back = () => {
    navigate("/wearingclearanceemu/wheel_details");
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

          navigate("/wearingclearanceemu/clearance");
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
{" "}
      </h2>
      <h2>Clearance for Bearing Clearance Statement FORM</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  D.MA.:
                </label>
                <input
                  type="text"
                  name="DMA"
                  value={formDataProceedSubmitEMUWearingClearance.DMA}
                  onChange={handleChange}
                  placeholder="Enter D. MA."
                />
                
                
              </div>
              <div>
                <label>
                  MA. :
                </label>
                <input
                  type="text"
                  name="MA"
                  value={formDataProceedSubmitEMUWearingClearance .MA}
                  onChange={handleChange}
                  placeholder="Enter MA"
                />
                
              </div>
              <div>
              
              </div>
            </div>
            <div className="row-3">
              <div>
              {/* <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataProceedSubmitEMUWearingClearance .EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                /> */}
              </div>

              <div>
                
              </div>
            </div>
            <div className="row-2">
              <div className="file-container">
                {/* <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
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
                </div> */}
              </div>
            </div>

            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
              <div>
              <button onClick={back}>Back</button>
              <button onClick={saveandcontinue}>Save & Continue</button>
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

export default Clearance;

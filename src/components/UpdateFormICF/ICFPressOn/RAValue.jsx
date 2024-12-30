import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api from "../../Axios/AxiosConnection";

function RAValue({
  formDataProceedSubmitPressOnICF,
  setformDataProceedSubmitPressOnICF,
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
    console.log(formDataProceedSubmitPressOnICF);
  };

 
  const handleCancel = () => {
    setformDataProceedSubmitPressOnICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 2,
    }));
    onResetStep();
    navigate("/parentediticf/UpdateICFPressOnForm/icf_details");
  };

  const saveandcontinue = () => {
    onNextStep();
    navigate("/parentediticf/UpdateICFPressOnForm/operator");
  };

  const back = () => {
    navigate("/parentediticf/UpdateICFPressOnForm/wheel_size");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await api.put("/icfpresson/editdata/", formDataProceedSubmitPressOnICF);
        console.log(response.AxleNumber);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setformDataProceedSubmitPressOnICF((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 3,
            WheeltypeId: 2,
          }));

          navigate("/parentediticf/UpdateICFPressOnForm/icf_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
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
        PRESS-ON OF ICF WHEEL FORM{" "}
      </h2>
      <h2>Wheel RA Value (1.6 max)</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  A Side :
                </label>
                <input
                  type="text"
                  name="ARASide"
                  value={formDataProceedSubmitPressOnICF.ARASide}
                  onChange={handleChange}
                  placeholder="Enter A Side"
                />
                
              </div>
              <div>
                <label>
                  B Side :
                </label>
                <input
                  type="text"
                  name="BRASide"
                  value={formDataProceedSubmitPressOnICF.BRASide}
                  onChange={handleChange}
                  placeholder="Enter B Side"
                />
                
              </div>
              <div>
              
              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
              {/* <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataProceedSubmitPressOnICF.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                /> */}
              </div>

              <div>
                
              </div>
            </div>
            <div className="Pressonoffrow-2">
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

            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerPressonoff">
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

export default RAValue;

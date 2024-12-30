import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function WheelB3({
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
      SectionID: 1,
      DepartmentID: 3,
      WheeltypeID: 2,
    }));
    onResetStep();
    navigate("/icf_presson/icf_details");
  };

  const saveandcontinue = () => {
    onNextStep();
    navigate("/icf_presson/operator_details");
  };

  const back = () => {
    navigate("/icf_presson/wheel_b2_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await postData("/icf/presson/data", formDataProceedSubmitPressOnICF);
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
            DepartmentId: 2,
            WheeltypeId: 1,
          }));

          navigate("/icf_presson/icf_details");
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
        PRESS-ON OF ICF WHEEL FORM
{" "}
      </h2>
      <h2>Wheel disc 'A' Side</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  B' Wheel Seat Size(190-195)mm 
                </label>
                <input
                  type="text"
                  name="BWheelSeatSizeB"
                  value={formDataProceedSubmitPressOnICF.BWheelSeatSizeB}
                  onChange={handleChange}
                  placeholder="Enter B' Wheel Seat Size(190-195)mm "
                />
                
              </div>
              <div>
                <label>
                  C=B-A Int. Allow (0.200-0.260)mm :
                </label>
                <input
                  type="text"
                  name="CBAIntAllowB"
                  value={formDataProceedSubmitPressOnICF.CBAIntAllowB}
                  onChange={handleChange}
                  placeholder="Enter C=B-A Int. Allow (0.200-0.260)mm"
                />
                
              </div>
              <div>
              <label>
                  Press-On Pressure In Ton(77T-108T)
                </label>
                <input
                  type="text"
                  name="PressureInTonB"
                  value={formDataProceedSubmitPressOnICF.PressureInTonB}
                  onChange={handleChange}
                  placeholder="Enter Press-On Pressure In Ton(77T-108T)"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
              <label>RD No:</label>
                <input
                  type="text"
                  name="RDNoB"
                  value={formDataProceedSubmitPressOnICF.RDNoB}
                  onChange={handleChange}
                  placeholder="Enter RD No"
                />
              </div>

              <div>
              <label>
                  Wheel Disc Particulars 
                </label>
                <input
                  type="text"
                  name="WheelDiscAParticularsB"
                  value={formDataProceedSubmitPressOnICF.WheelDiscAParticularsB}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Particulars "
                />
              </div>
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
                </div> */}
                {/* <div className="uploading-section">
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
              <div>
              
              </div>
              <div></div>
            </div>
            <div></div>
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

export default WheelB3;

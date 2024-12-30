import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function WheelA3({
  formDataProceedSubmitEMU,
  setformDataProceedSubmitEMU,
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
    console.log(formDataProceedSubmitEMU);
  };

 
  const handleCancel = () => {
    setformDataProceedSubmitEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 3,
      WheeltypeID: 4,
    }));
    onResetStep();
    navigate("/emu_presson/emu_details");
  };

  const saveandcontinue = () => {
    onNextStep();
    navigate("/emu_presson/wheel_b1_details");
  };

  const back = () => {
    navigate("/emu_presson/wheel_a2_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await postData("/emu/presson/data", formDataProceedSubmitEMU);
        console.log(response.AxleNumber);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setformDataProceedSubmitEMU((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 3,
            WheeltypeId: 4,
          }));

          navigate("/emu_presson/emu_details");
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
        PRESS-ON OF EMU WHEEL FORM{" "}
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
                  name="BWheelSeatSize"
                  value={formDataProceedSubmitEMU.BWheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter B' Wheel Seat Size(190-195)mm"
                />
                
              </div>
              <div>
                <label>
                  C=B-A Int. Allow (0.200-0.260)mm :
                </label>
                <input
                  type="text"
                  name="CBAIntAllow"
                  value={formDataProceedSubmitEMU.CBAIntAllow}
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
                  name="PressureInTon"
                  value={formDataProceedSubmitEMU.PressureInTon}
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
                  name="RDNo"
                  value={formDataProceedSubmitEMU.RDNo}
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
                  name="WheelDiscAParticulars"
                  value={formDataProceedSubmitEMU.WheelDiscAParticulars}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Particulars"
                />
              </div>
              <div>
              {/* <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataProceedSubmitEMU.EndHole}
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
              <div>
              
              </div>
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

export default WheelA3;

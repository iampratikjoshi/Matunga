import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import api from "../../Axios/AxiosConnection";

function InspectorDetails({ formDataPressOffVB, setFormDataPressOffVB, onInputChange,
  onNextStep,
  onResetStep, }) {
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleBack = () => {
    navigate("/parenteditvb/UpdateVBPressOffForm/wheel_details");
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
    console.log(formDataPressOffVB);
  };




  const handleCancel = () => {
    setFormDataPressOffVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 3,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.put("/vbpressoff/editdata/" + formDataPressOffVB.wheelid, formDataPressOffVB); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataPressOffVB((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 5,
          WheeltypeId: 3,
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
        PRESS-OFF OF VB WHEEL FORM{" "}
      </h2>
      <h2>Wheel Details For PRESS-OFF OF VB WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">

              <div>
                <label>Operator T.No.</label>
                <input
                  type="text"
                  name="OperatorTNo"
                  value={formDataPressOffVB.OperatorTNo}
                  onChange={handleChange}
                  placeholder="Enter Operator T.No."
                />

              </div>
              <div>
                <label>
                  Operator Name:
                </label>
                <input
                  type="text"
                  name="OperatorName"
                  value={formDataPressOffVB.OperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />

              </div>
              <div>
                <label>Inspector T.No.</label>
                <input
                  type="text"
                  name="InspectorTNo"
                  value={formDataPressOffVB.InspectorTNo}
                  onChange={handleChange}
                  placeholder="Enter Inspector T.No."
                />

              </div>



            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Inspector Name:
                </label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataPressOffVB.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />

              </div>

              <div>
                <label>
                  Machine No.
                </label>
                <input
                  type="text"
                  name="MachineNumber"
                  value={formDataPressOffVB.MachineNumber}
                  onChange={handleChange}
                  placeholder="Enter Machine No."
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
                  <span className="drag-or">---------- or ----------</span>
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
              <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataPressOffVB.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>

            </div>
            <div className="btn-containerPressonoff">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
              <div>
                <button onClick={() => { navigate("/parenteditvb/updateproceedsubmitVBpressoff") }}>
                  Preview for Submission
                </button>
              </div>
              <div>
                <button className="back_btn" onClick={handleBack}>Back</button>
              </div>
              <div>
                <button className="red_btn" onClick={handleCancel}>Cancel</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectorDetails;

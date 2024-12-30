import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function BDDetails({
  formDataFinalEMU,
  setFormDataFinalEMU,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [BDMake, setBDMake] = useState(formDataFinalEMU.BDMake); 
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
    setFormDataFinalEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
          DepartmentId: 4,
          WheeltypeId: 4,
    }));
    onResetStep();
    navigate("/parentemuedit/UpdateEMUFinalInspection/wheel_details");
  };

  const navigate = useNavigate();

 

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/parentemuedit/UpdateEMUFinalInspection/Brg_detailsA");
    
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/parentemuedit/UpdateEMUFinalInspection/journalA_details");
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
        EMU FINAL INSPECTION FORM
      </h2>
      <h2>Journal B Details for EMU Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              
            <div>
                <label>
                  Journal Particular B X1:
                </label>
                <input
                  type="text"
                  name="ParticularBX1"
                  value={formDataFinalEMU.ParticularBX1}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular B X1"
                />

              </div>

              <div>
                <label>
                  Journal Particular B X2:
                </label>
                <input
                  type="text"
                  name="ParticularBX2"
                  value={formDataFinalEMU.ParticularBX2}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular B X2"
                />

              </div>

              <div>
                <label>
                  Journal Particular B X3:
                </label>
                <input
                  type="text"
                  name="ParticularBX3"
                  value={formDataFinalEMU.ParticularBX3}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular B X3"
                />

              </div>
              
            </div>
            <div className="Finalrow-2">
            <div>
                <label>
                  Journal Particular B Y1:
                </label>
                <input
                  type="text"
                  name="ParticularBY1"
                  value={formDataFinalEMU.ParticularBY1}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular B Y1"
                />

              </div>

              <div>
                <label>
                  Journal Particular B Y2:
                </label>
                <input
                  type="text"
                  name="ParticularBY2"
                  value={formDataFinalEMU.ParticularBY2}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular B Y2"
                />

              </div>

              <div>
                <label>
                  Journal Particular B Y3:
                </label>
                <input
                  type="text"
                  name="ParticularBY3"
                  value={formDataFinalEMU.ParticularBY3}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular B Y3"
                />

              </div>
            </div>
            <div className="Finalrow-3">
            <div>
                <label>
                  TaperX B:
                </label>
                <input
                  type="text"
                  name="TaperXB"
                  value={formDataFinalEMU.TaperXB}
                  onChange={handleChange}
                  placeholder="Enter TaperX B"
                />

              </div>

              <div>
                <label>
                  TaperY B:
                </label>
                <input
                  type="text"
                  name="TaperYB"
                  value={formDataFinalEMU.TaperYB}
                  onChange={handleChange}
                  placeholder="Enter TaperY B"
                />

              </div>

              <div>
                <label>
                  Shoulder Size B:
                </label>
                <input
                  type="text"
                  name="ShoulderSizeB"
                  value={formDataFinalEMU.ShoulderSizeB}
                  onChange={handleChange}
                  placeholder="Enter Shoulder Size B"
                />

              </div>
            </div>
            <div className="Finalrow-3">
            <div>
                <label>
                 Ovality B:
                </label>
                <input
                  type="text"
                  name="OvalityB"
                  value={formDataFinalEMU.OvalityB}
                  onChange={handleChange}
                  placeholder="Enter Ovality B"
                />

              </div>
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

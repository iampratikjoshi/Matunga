import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function JournalDetailsA({
  formDataFinalEMU,
  setFormDataFinalEMU,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
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
    console.log(formDataFinalEMU);
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
    navigate("/emufinalinspection/wheel_details");
  };

  const validateForm = () => {
    const newErrors = {};


    if (isNaN(formDataFinalEMU.ShoulderSizeA) || formDataFinalEMU.ShoulderSizeA < 160.134 || formDataFinalEMU.ShoulderSizeA > 160.174) {
      newErrors.ShoulderSizeA = "Shoulder Size must be between 160.134 and 160.174.";
    }

    if (isNaN(formDataFinalEMU.SizeA) || formDataFinalEMU.SizeA < 140.043 || formDataFinalEMU.SizeA > 140.068) {
      newErrors.SizeA = "Jr Size must be between 140.043 and 140.068.";
    }

    if (isNaN(formDataFinalEMU.OvalA) || formDataFinalEMU.OvalA < 0 || formDataFinalEMU.OvalA > 0.015) {
      newErrors.OvalA = "Jr Tap must be between 0 and 0.015.";
    }

    if (isNaN(formDataFinalEMU.TapA) || formDataFinalEMU.TapA < 0 || formDataFinalEMU.TapA > 0.020) {
      newErrors.TapA = "Jr Tap must be between 0 and 0.020.";
    }

    if (isNaN(formDataFinalEMU.ShoulderSizeB) || formDataFinalEMU.ShoulderSizeB < 160.134 || formDataFinalEMU.ShoulderSizeB > 160.174) {
      newErrors.ShoulderSizeB = "Shoulder Size must be between 160.134 and 160.174.";
    }

    if (isNaN(formDataFinalEMU.SizeB) || formDataFinalEMU.SizeB < 130.043 || formDataFinalEMU.SizeB > 130.068) {
      newErrors.SizeB = "Jr Size must be between 130.043 and 130.068.";
    }

    if (isNaN(formDataFinalEMU.OvalB) || formDataFinalEMU.OvalB < 0 || formDataFinalEMU.OvalB > 0.015) {
      newErrors.OvalB = "Jr Tap must be between 0 and 0.015.";
    }

    if (isNaN(formDataFinalEMU.TapB) || formDataFinalEMU.TapB < 0 || formDataFinalEMU.TapB > 0.020) {
      newErrors.TapB = "Jr Tap must be between 0 and 0.020.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
      onNextStep();
      navigate("/emufinalinspection/journalB_details");
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/emufinalinspection/wheel_details");
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
        EMU FINAL INSPECTION FORM{" "}
      </h2>
      <h2>Journal A Details for EMU Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">

              <div>
                <label>
                  Journal Particular A X1:
                </label>
                <input
                  type="text"
                  name="ParticularAX1"
                  value={formDataFinalEMU.ParticularAX1}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular A X1"
                />

              </div>

              <div>
                <label>
                  Journal Particular A X2:
                </label>
                <input
                  type="text"
                  name="ParticularAX2"
                  value={formDataFinalEMU.ParticularAX2}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular A X2"
                />

              </div>

              <div>
                <label>
                  Journal Particular A X3:
                </label>
                <input
                  type="text"
                  name="ParticularAX3"
                  value={formDataFinalEMU.ParticularAX3}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular A X3"
                />

              </div>

            </div>
            <div className="Finalrow-2">

            <div>
                <label>
                  Journal Particular A Y1:
                </label>
                <input
                  type="text"
                  name="ParticularAY1"
                  value={formDataFinalEMU.ParticularAY1}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular A Y1"
                />

              </div>

              <div>
                <label>
                  Journal Particular A Y2:
                </label>
                <input
                  type="text"
                  name="ParticularAY2"
                  value={formDataFinalEMU.ParticularAY2}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular A Y2"
                />

              </div>

              <div>
                <label>
                  Journal Particular A Y3:
                </label>
                <input
                  type="text"
                  name="ParticularAY3"
                  value={formDataFinalEMU.ParticularAY3}
                  onChange={handleChange}
                  placeholder="Enter Journal Particular A Y3"
                />

              </div>


            </div>
            <div className="Finalrow-3">
              <div>
                <label>
                  TaperX A:
                </label>
                <input
                  type="text"
                  name="TaperXA"
                  value={formDataFinalEMU.TaperXA}
                  onChange={handleChange}
                  placeholder="Enter TaperX A"
                />

              </div>

              <div>
                <label>
                  TaperY A:
                </label>
                <input
                  type="text"
                  name="TaperYA"
                  value={formDataFinalEMU.TaperYA}
                  onChange={handleChange}
                  placeholder="Enter TaperY A"
                />

              </div>

              <div>
                <label>
                  Shoulder Size A:
                </label>
                <input
                  type="text"
                  name="ShoulderSizeA"
                  value={formDataFinalEMU.ShoulderSizeA}
                  onChange={handleChange}
                  placeholder="Enter Shoulder Size A"
                />

              </div>

            </div>
            <div className="Finalrow-2">
           

              <div>
                <label>
                 Ovality A:
                </label>
                <input
                  type="text"
                  name="OvalityA"
                  value={formDataFinalEMU.OvalityA}
                  onChange={handleChange}
                  placeholder="Enter Ovality A"
                />

              </div>
              
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

export default JournalDetailsA;

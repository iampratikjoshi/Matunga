import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function Wheeldetails({
  formDataFinalVB,
  setFormDataFinalVB,
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
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
    // console.log(formDataFinalVB);
  };

  const handleCancel = () => {
    setFormDataFinalVB((prevFormData) => ({
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
    navigate("/parenteditvb/UpdateVBfinalinspection/axle_details");
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    

    if (isNaN(formDataFinalVB.WheelRG) || formDataFinalVB.WheelRG < 1599 || formDataFinalVB.WheelRG > 1602) {
      newErrors.WheelRG = "Wheel RG must be between 1599 and 1602.";
    }

  

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/parenteditvb/UpdateVBfinalinspection/journal_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/parenteditvb/UpdateVBfinalinspection/axle_details");
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
        VB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>Wheel Details for VB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
            <div>
                <label>
                  Wheel Dia A:
                </label>
                <input
                  type="text"
                  name="WheelDiaA"
                  value={formDataFinalVB.WheelDiaA}
                  onChange={handleChange}
                  placeholder="Enter A/B Side"
                />
                
              </div>
              <div>
                <label>
                  Wheel Dia B:
                </label>
                <input
                  type="text"
                  name="WheelDiaB"
                  value={formDataFinalVB.WheelDiaB}
                  onChange={handleChange}
                  placeholder="Enter Wheel Dia"
                />
                
              </div>
              <div>
                <label>
                  Wheel RG:
                </label>
                <input
                  type="text"
                  name="WheelRG"
                  value={formDataFinalVB.WheelRG}
                  onChange={handleChange}
                  placeholder="Enter Wheel RG"
                />
                {errors.WheelRG && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.WheelRG}
                  </p>
                )}
              </div>
            </div>
            <div className="Finalrow-2">
              <div>
                <label>
                  Wheel FLG:
                </label>
                <input
                  type="text"
                  name="WheelFLG"
                  value={formDataFinalVB.WheelFLG}
                  onChange={handleChange}
                  placeholder="Enter Wheel FLG"
                />
                
              </div>
              <div>
                <label>
                  Disc Particular A:
                </label>
                <input
                  type="text"
                  name="DiscParticularA"
                  value={formDataFinalVB.DiscParticularA}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular A"
                />
                
              </div>
              <div>
                <label>
                  Disc Particular B:
                </label>
                <input
                  type="text"
                  name="DiscParticularB"
                  value={formDataFinalVB.DiscParticularB}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular B"
                />
                
              </div>
            </div>
            <div className="Finalrow-3">
              <div> </div>
              <div> </div>
            </div>
            <div className="Finalrow-2">
              <div></div>
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

export default Wheeldetails;

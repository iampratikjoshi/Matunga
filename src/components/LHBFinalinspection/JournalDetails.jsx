import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function JournalDetails({
  formDataFinal,
  setFormDataFinal,
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
    console.log(formDataFinal);
  };

  const handleCancel = () => {
    setFormDataFinal((prevFormData) => ({
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
    navigate("/lhbfinalinspection/axle_details");
  };

  const validateForm = () => {
    const newErrors = {};


    if (isNaN(formDataFinal.ShoulderSizeA) || formDataFinal.ShoulderSizeA < 160.134 || formDataFinal.ShoulderSizeA > 160.174) {
      newErrors.ShoulderSizeA = "Shoulder Size must be between 160.134 and 160.174.";
    }

    if (isNaN(formDataFinal.SizeA) || formDataFinal.SizeA < 130.043 || formDataFinal.SizeA > 130.068) {
      newErrors.SizeA = "Jr Size must be between 130.043 and 130.068.";
    }

    if (isNaN(formDataFinal.OvalA) || formDataFinal.OvalA < 0 || formDataFinal.OvalA > 0.015) {
      newErrors.OvalA = "Jr Tap must be between 0 and 0.015.";
    }

    if (isNaN(formDataFinal.TapA) || formDataFinal.TapA < 0 || formDataFinal.TapA > 0.020) {
      newErrors.TapA = "Jr Tap must be between 0 and 0.020.";
    }

    if (isNaN(formDataFinal.ShoulderSizeB) || formDataFinal.ShoulderSizeB < 160.134 || formDataFinal.ShoulderSizeB > 160.174) {
      newErrors.ShoulderSizeB = "Shoulder Size must be between 160.134 and 160.174.";
    }

    if (isNaN(formDataFinal.SizeB) || formDataFinal.SizeB < 130.043 || formDataFinal.SizeB > 130.068) {
      newErrors.SizeB = "Jr Size must be between 130.043 and 130.068.";
    }

    if (isNaN(formDataFinal.OvalB) || formDataFinal.OvalB < 0 || formDataFinal.OvalB > 0.015) {
      newErrors.OvalB = "Jr Tap must be between 0 and 0.015.";
    }

    if (isNaN(formDataFinal.TapB) || formDataFinal.TapB < 0 || formDataFinal.TapB > 0.020) {
      newErrors.TapB = "Jr Tap must be between 0 and 0.020.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/lhbfinalinspection/bd_details");
    }
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/wheel_details");
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
        LHB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>Journal Details for LHB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">

              <div>
                <label>
                  Jr. Size A:
                </label>
                <input
                  type="text"
                  name="SizeA"
                  value={formDataFinal.SizeA}
                  onChange={handleChange}
                  placeholder="Enter Jr. Size A"
                />
                {errors.SizeA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.SizeA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Jr. Size B:
                </label>
                <input
                  type="text"
                  name="SizeB"
                  value={formDataFinal.SizeB}
                  onChange={handleChange}
                  placeholder="Enter Size Jr. B"
                />
                {errors.SizeB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.SizeB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Jr. Oval A:
                </label>
                <input
                  type="text"
                  name="OvalA"
                  value={formDataFinal.OvalA}
                  onChange={handleChange}
                  placeholder="Enter Jr. Oval A"
                />
                {errors.OvalA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.OvalA}
                  </p>
                )}
              </div>

            </div>
            <div className="Finalrow-2">
              <div>
                <label>
                  Jr. Oval B:
                </label>
                <input
                  type="text"
                  name="OvalB"
                  value={formDataFinal.OvalB}
                  onChange={handleChange}
                  placeholder="Enter  Jr. Oval B"
                />
                {errors.OvalB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.OvalB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Jr. Waiviness A:
                </label>
                <select
                  name="JrWaivinessA"
                  value={formDataFinal.JrWaivinessA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Jr. Waiviness A</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>

              </div>
              <div>
                <label>
                  Jr. Waiviness B:
                </label>
                <select
                  name="JrWaivinessB"
                  value={formDataFinal.JrWaivinessB}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Jr. Waiviness B</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>

              </div>





            </div>
            <div className="Finalrow-3">
              <div>
                <label>
                  Jr. Tap A:
                </label>
                <input
                  type="text"
                  name="TapA"
                  value={formDataFinal.TapA}
                  onChange={handleChange}
                  placeholder="Enter Jr. Tap A"
                />
                {errors.TapA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.TapA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Jr. Tap B:
                </label>
                <input
                  type="text"
                  name="TapB"
                  value={formDataFinal.TapB}
                  onChange={handleChange}
                  placeholder="Enter  Jr. Tap B"
                />
                {errors.TapB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.TapB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  End Hole A:
                </label>

                <select
                  name="EndHoleA"
                  value={formDataFinal.EndHoleA}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select End Hole A</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                
              </div>
            </div>
            <div className="Finalrow-2">
              <div>
                <label>
                  End Hole B:
                </label>

                <select
                  name="EndHoleB"
                  value={formDataFinal.EndHoleB}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select End Hole B</option>
                  <option value="Ok">Ok</option>
                  <option value="Not Ok">Not Ok</option>
                </select>
                
              </div>
              <div>
                <label>
                  Shoulder Size A:
                </label>
                <input
                  type="text"
                  name="ShoulderSizeA"
                  value={formDataFinal.ShoulderSizeA}
                  onChange={handleChange}
                  placeholder="Enter Shoulder Size A"
                />
                {errors.ShoulderSizeA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ShoulderSizeA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Shoulder Size B:
                </label>
                <input
                  type="text"
                  name="ShoulderSizeB"
                  value={formDataFinal.ShoulderSizeB}
                  onChange={handleChange}
                  placeholder="Enter Shoulder Size B"
                />
                {errors.ShoulderSizeB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ShoulderSizeB}
                  </p>
                )}
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

export default JournalDetails;

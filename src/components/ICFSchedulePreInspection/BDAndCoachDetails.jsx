import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import "../../resources/LHB/NewPreInspectionForm/newpreinspectionform.css";

function BDAndCoachDetails({
  formDataScheduleICF,
  setFormDataScheduleICF,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [BDDefect, setBDDefect] = useState(formDataScheduleICF.BDDefect); // State for BDDefect dropdown
  const [OtherBDDefect, setOtherBDDefect] = useState(""); // State for other BDDefect input

  const [BDMakeIN, setBDMakeIN] = useState(formDataScheduleICF.BDMakeIN); // State for CTRBMakeB dropdown
  const [OtherBDMakeIN, setOtherBDMakeIN] = useState(""); // State for other CTRBMakeB input

  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
  const [file, setFile] = useState(null); // Single file state
  const [isBackNavigation, setIsBackNavigation] = useState(false); // State to track back navigation
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

  const handleBDDefectChange = (event) => {
    const selectedRemark = event.target.value;
    setBDDefect(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(BDDefect);

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        BDDefect: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        BDDefect: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDDefectChange = (event) => {
    const { value } = event.target;
    setOtherBDDefect(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      BDDefect: value,
    }));

    console.log(formDataScheduleICF.BDDefect);
  };

  const handleBDMakeINChange = (event) => {
    const selectedRemark = event.target.value;
    setBDMakeIN(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(BDMakeIN);

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        BDMakeIN: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        BDMakeIN: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDMakeINChange = (event) => {
    const { value } = event.target;
    setOtherBDMakeIN(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      BDMakeIN: value,
    }));

    console.log(formDataScheduleICF.BDMakeIN);
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
    console.log(formDataScheduleICF);
  };

  const handleCancel = () => {
    setFormDataScheduleICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 2,
    }));
    onResetStep();
    navigate("/icfschedulepreinspectionform/details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/icfschedulepreinspectionform/details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // setIsBackNavigation(false); // Reset flag after proceeding to next step
    navigate("/icfschedulepreinspectionform/ctrba_details");
  };

  return (
    <div className="componentPreInspection">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        ICF PRE INSPECTION FORM
      </h2>
      <h2>BD And COACH Details for ICF PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentLHB">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
                <label>BD Make:</label>
                {/* <input
                  type="text"
                  name="BDMakeIN"
                  value={formDataScheduleICF.BDMakeIN}
                  onChange={handleChange}
                  placeholder="Enter BD Make"
                /> */}
                <select
                  name="BDMakeIN"
                  value={BDMakeIN}
                  onChange={handleBDMakeINChange}
                >
                  <option value="">Choose BD Make</option>
                  <option value="Knorr">Knorr</option>
                  <option value="Faiveley">Faiveley</option>
                  <option value="JWL">JWL</option>
                  <option value="Pioneer">Pioneer</option>
                  <option value="others">Others</option>
                </select>
              </div>
              {BDMakeIN === "others" && (
                <div>
                  <label>Enter Specific BD Make:</label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherBDMakeIN}
                    onChange={handleOtherBDMakeINChange}
                    placeholder="Enter Specific BD Make"
                  // Adjust spacing
                  />
                </div>
              )}
              <div>
                <label>Coach No.:</label>
                <input
                  type="text"
                  name="CoachNumber"
                  value={formDataScheduleICF.CoachNumber}
                  onChange={handleChange}
                  placeholder="Enter Coach No."
                />
              </div>
            </div>
            <div className="PreInspectionrow-2">
              <div>
                <label>BD Thickness A:</label>
                <input
                  type="text"
                  name="BDThicknessA"
                  value={formDataScheduleICF.BDThicknessA}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness A"
                />
              </div>
              <div>
                <label>BD Thickness B:</label>
                <input
                  type="text"
                  name="BDThicknessB"
                  value={formDataScheduleICF.BDThicknessB}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness B"
                />
              </div>
            </div>

            <div className="PreInspectionrow-3">
              <div>
                <label>BD Defect:</label>
                <select
                  name="BDDefect"
                  value={BDDefect}
                  onChange={handleBDDefectChange}
                  required
                >
                  <option value="">Choose BD Defect</option>
                  <option value="ThermalCrack">Thermal Crack</option>
                  <option value="IncipientCrack">Incipient Crack</option>
                  <option value="ConcaveWear/HollowWear">
                    Concave Wear/ Hollow Wear
                  </option>
                  <option value="FinsBroken">Fins Broken</option>
                  <option value="EdgeBroken">Edge Broken</option>
                  <option value="Scoring">Scoring</option>
                  <option value="SharpEdge">Sharp Edge</option>
                  <option value="BlackSpot">Black Spot</option>
                  <option value="HairLineCrack">Hair Line Crack</option>
                  <option value="others">Others</option>
                  {/* <input
                  type="text"
                  name="BDDefect"
                  value={formDataScheduleICF.BDDefect}
                  onChange={handleChange}
                  placeholder="Enter BD Defect"
                /> */}
                </select>
              </div>
              {BDDefect === "others" && (
                <div>
                  <label>Enter Specific BD Defect:</label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherBDDefect}
                    onChange={handleOtherBDDefectChange}
                    placeholder="Enter Specific BD Defect"
                  // Adjust spacing
                  />
                </div>
              )}
            </div>
            <div className="PreInspectionrow-3">
              <div></div>
              <div></div>
            </div>

            <div className="btn-containerPreInspection">
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

export default BDAndCoachDetails;

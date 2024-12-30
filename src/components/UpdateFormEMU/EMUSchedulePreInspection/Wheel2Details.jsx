import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BDAndCoachDetails({
  formDataScheduleEMU,
  setFormDataScheduleEMU,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [WheelType, setCTRBMakeA] = useState(formDataScheduleEMU.WheelType); // State for WheelType dropdown
  const [OtherTypeOfWheel, setOtherCTRBMakeA] = useState(""); // State for other WheelType input
  const [BDDefect, setBDDefect] = useState(formDataScheduleEMU.BDDefect); // State for BDDefect dropdown
  const [OtherBDDefect, setOtherBDDefect] = useState(""); // State for other BDDefect input

  const [BDMakeIN, setBDMakeIN] = useState(formDataScheduleEMU.BDMakeIN); // State for CTRBMakeB dropdown
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

  const handleOtherTypeOfWheelChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      WheelType: value,
    }));

    console.log(formDataScheduleEMU.WheelType);
  };

  const handleTypeOfWheelChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        WheelType: selectedRemark,
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        WheelType: "", // Clear out the Remark field
      }));
    }
  };

  const handleBDDefectChange = (event) => {
    const selectedRemark = event.target.value;
    setBDDefect(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(BDDefect);

      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        BDDefect: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        BDDefect: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDDefectChange = (event) => {
    const { value } = event.target;
    setOtherBDDefect(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      BDDefect: value,
    }));

    console.log(formDataScheduleEMU.BDDefect);
  };

  const handleBDMakeINChange = (event) => {
    const selectedRemark = event.target.value;
    setBDMakeIN(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(BDMakeIN);

      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        BDMakeIN: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        BDMakeIN: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDMakeINChange = (event) => {
    const { value } = event.target;
    setOtherBDMakeIN(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      BDMakeIN: value,
    }));

    console.log(formDataScheduleEMU.BDMakeIN);
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
    console.log(formDataScheduleEMU);
  };

  const handleCancel = () => {
    setFormDataScheduleEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 4,
    }));
    onResetStep();
    navigate("/parentemuedit/UpdateEMUSchedulePreInspectionForm/w1_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/parentemuedit/UpdateEMUSchedulePreInspectionForm/w1_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // setIsBackNavigation(false); // Reset flag after proceeding to next step
    navigate("/parentemuedit/UpdateEMUSchedulePreInspectionForm/brg_details");
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
        EMU PRE INSPECTION FORM
      </h2>
      <h2>Wheel Details for EMU PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentPreInspection">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
                <label>Coach No.:</label>
                <input
                  type="text"
                  name="CoachNumber"
                  value={formDataScheduleEMU.CoachNumber}
                  onChange={handleChange}
                  placeholder="Enter Coach No."
                />
              </div>
              <div>
                <label>
                  Type Of Wheel:
                </label>
                <select
                  name="WheelType"
                  value={WheelType}
                  onChange={handleTypeOfWheelChange}
                  required
                >
                  <option value="">Choose Type Of Wheel</option>
                  <option value="HCCorTRL">HCC/TRL</option>
                  <option value="ICFOrTRL">ICF/TRL</option>
                  <option value="ACDCSiemens">ACDC Siemens</option>
                  <option value="ACBhel">AC BHEL</option>
                  <option value="ACDCBombardier">ACDC BOMBARDIER</option>
                  <option value="ACMC">ACMC</option>
                  <option value="ACDCMEDHA">ACDC MEDHA</option>
                  <option value="ACMEMU">AC MEMU</option>
                  <option value="others">Others</option>
                </select>


              </div>
              {WheelType === "others" && (
                <div>
                  <label>
                    Enter Type Of Wheel:

                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherTypeOfWheel}
                    onChange={handleOtherTypeOfWheelChange}
                    placeholder="Enter Specific Type Of Wheel"
                  // Adjust spacing
                  />

                </div>
              )}
            </div>
            <div className="PreInspectionrow-2">
              <div>
              
              </div>
              <div>
               
              </div>
            </div>

            <div className="PreInspectionrow-3">
              <div>
               
              </div>
              
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

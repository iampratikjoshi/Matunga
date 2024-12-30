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
    navigate("/icfschedulepreinspectionform/w1_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/icfschedulepreinspectionform/w1_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // setIsBackNavigation(false); // Reset flag after proceeding to next step
    navigate("/icfschedulepreinspectionform/brg_details");
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
      <h2>Wheel Details for ICF PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentLHB">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
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
              <div>
              {/* <label>Wheel Type :</label>
                <input
                  type="text"
                  name="WheelType"
                  value={formDataScheduleICF.WheelType}
                  onChange={handleChange}
                  placeholder="Enter Wheel Type"
                /> */}
              </div>
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

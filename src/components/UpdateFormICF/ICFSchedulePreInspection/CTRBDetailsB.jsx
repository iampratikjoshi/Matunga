import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function CTRBDetailsB({
  formDataScheduleICF,
  setFormDataScheduleICF,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [CTRBStatusB, setCTRBStatusB] = useState(formDataScheduleICF.CTRBStatusB);
  const [RefurbishmentDetailsB, setRefurbishmentDetailsB] = useState(
    formDataScheduleICF.RefurbishmentDetailsB
  );

  const [CTRBMakeB, setCTRBMakeB] = useState(formDataScheduleICF.CTRBMakeB); // State for CTRBMakeB dropdown
  const [OtherCTRBMakeB, setOtherCTRBMakeB] = useState(""); // State for other CTRBMakeB input
  const [CTRBRemarkB, setRemarkB] = useState(formDataScheduleICF.CTRBRemarkB);
  const [otherRemarkB, setOtherRemarkB] = useState("");
  const [ctrbdefectB, setctrbdefectB] = useState(formDataScheduleICF.CTRBDefectB);
  const [CTRBDefectNameB, setCTRBDefectNameB] = useState(
    formDataScheduleICF.CTRBDefectNameB
  );
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
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

  const handleCTRBStatusB = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBStatusB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBStatusB: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetails = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsB(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      RefurbishmentDetailsB: value,
    }));

    console.log(formDataScheduleICF.RefurbishmentDetailsB);
  };

  const handleCTRBMakeChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBMakeB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBMakeB: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeB(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      CTRBMakeB: value,
    }));

    console.log(formDataScheduleICF.CTRBMakeB);
  };

  const CTRBRemainingLifehandleChangeB = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataScheduleICF);

    if (name === "CTRBRemainingLifeB") {
      const updatedValue = parseFloat(value); // Ensure it's treated as a number

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBRemarkB: updatedValue < 4 ? "PRESS-OFF" : "",
      }));
      updatedValue < 4 ? setRemarkB("PRESS-OFF") : setRemarkB("");
    }
  };

  const handleRemarkChangeB = (event) => {
    const selectedRemark = event.target.value;
    setRemarkB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(CTRBRemarkB);

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBRemarkB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBRemarkB: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherRemarkChangeB = (event) => {
    const { value } = event.target;
    setOtherRemarkB(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      CTRBRemarkB: value,
    }));

    console.log(formDataScheduleICF.Remark);
  };

  const handleCTRBDefectBChange = (event) => {
    const selectedRemark = event.target.value;
    setctrbdefectB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "yes") {
      // console.log(selectedRemark);
      // console.log(ctrbdefectB);

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBDefectB: selectedRemark,
        CTRBDefectNameB: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setCTRBDefectNameB("");
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBDefectB: "yes", // Clear out the Remark field
      }));
    }
  };

  const handleCTRBDefectBNameChange = (event) => {
    const { value } = event.target;
    setCTRBDefectNameB(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      CTRBDefectNameB: value,
    }));

    console.log(formDataScheduleICF.CTRBDefectNameB);
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
    navigate("/parentediticf/UpdateICFSchedulePreInspection/w1_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/parentediticf/UpdateICFSchedulePreInspection/brg_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // Reset flag after proceeding to next step
    navigate("/parentediticf/UpdateICFSchedulePreInspection/repair_details");
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
        ICF PRE INSPECTION FORM{" "}
      </h2>
      <h2>Radical Clearance Details for ICF PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentPreInspection">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
                <label>Radial clearance in dismounted condition A side :</label>
                  <input
                    type="text"
                    name="RCDMA"
                    value={formDataScheduleICF.RCDMA}
                    onChange={handleChange}
                    placeholder="Enter Radial clearance in dismounted condition A side"
                  />
                {/* <label>Roller Bearing No. B:</label>
                <input
                  type="text"
                  name="CTRBNumberB"
                  value={formDataScheduleICF.CTRBNumberB}
                  onChange={handleChange}
                  placeholder="Enter Roller Bearing No. B"
                /> */}
              </div>
              <div>
              <label>Radial clearance in dismounted condition B side :</label>
                  <input
                    type="text"
                    name="RCDMB"
                    value={formDataScheduleICF.RCDMB}
                    onChange={handleChange}
                    placeholder="Enter Radial clearance in dismounted condition B side"
                  />
              </div>
              {/* <div>
                <label>Roller Bearing Status B:</label>
                <select
                  name="CTRBStatusB"
                  value={formDataScheduleICF.CTRBStatusB}
                  onChange={handleCTRBStatusB}
                  required
                >
                  <option value="">Choose Roller Bearing Status B</option>
                  <option value="NEW">NEW</option>
                  <option value="REFURBISHED">REFURBISHED</option>
                </select>
              </div>
              {CTRBStatusB === "REFURBISHED" && (
                <div>
                  <label>Refurbishment Details B:</label>
                  <input
                    type="text"
                    name="RefurbishmentDetailsB"
                    value={RefurbishmentDetailsB}
                    onChange={handleRefurbishmentDetails}
                    placeholder="Enter Refurbishment Details B"
                  />
                </div>
              )} */}
            </div>
            <div className="PreInspectionrow-2">
              <div>
                <label>Radial clearance in mounted condition A side : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input
                    type="text"
                    name="RCMA"
                    value={formDataScheduleICF.RCMA}
                    onChange={handleChange}
                    placeholder="Enter Radial clearance in mounted condition A side"
                  />
                {/* <label>Roller Bearing Make B:</label>
                <select
                  name="CTRBMakeB"
                  value={CTRBMakeB}
                  onChange={handleCTRBMakeChange}
                  required
                >
                  <option value="">Choose Roller Bearing Make B</option>
                  <option value="SKF">SKF</option>
                  <option value="TIMKEN">TIMKEN</option>
                  <option value="NBC">NBC</option>
                  <option value="others">Others</option>
                </select> */}
              </div>
              {/* {CTRBMakeB === "others" && (
                <div>
                  <label>Enter Specific Roller Bearing Make B:</label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeB}
                    onChange={handleOtherCTRBMakeChange}
                    placeholder="Enter Specific Remark"
                    // Adjust spacing
                  />
                </div>
              )} */}
              <div>
                <label>Radial clearance in mounted condition B side :</label>
                  <input
                    type="text"
                    name="RCMB"
                    value={formDataScheduleICF.RCMB}
                    onChange={handleChange}
                    placeholder="Enter Radial clearance in mounted condition B side"
                  />
                {/* <label>Roller Bearing Remaining Life B(Months):</label>
                <input
                  type="text"
                  name="CTRBRemainingLifeB"
                  value={formDataScheduleICF.CTRBRemainingLifeB}
                  onChange={CTRBRemainingLifehandleChangeB}
                  placeholder="Enter Roller Bearing Remaining Life B"
                /> */}
              </div>
            </div>
            <div className="PreInspectionrow-3">
              <div>
                {/* <label>Roller Bearing Remark B:</label>
                <select
                  name="CTRBRemarkB"
                  value={CTRBRemarkB}
                  onChange={handleRemarkChangeB}
                  required
                >
                  <option value="">Choose Roller Bearing Remark B</option>
                  <option value="PRESS-OFF">PRESS-OFF</option>
                  <option value="IN POSITION">IN POSITION</option>
                  <option value="others">OTHERS</option>
                </select> */}
              </div>
              {/* {CTRBRemarkB === "others" && (
                <div>
                  <label>Enter Specific Remark B:</label>
                  <input
                    type="text"
                    name="OtherRemarkB"
                    value={otherRemarkB}
                    onChange={handleOtherRemarkChangeB}
                    placeholder="Enter Specific Remark B"
                    // Adjust spacing
                  />
                </div>
              )} */}
              <div>
                {/* <label>Roller Bearing Defect B:</label>
                <select
                  name="CTRBDefectB"
                  value={ctrbdefectB}
                  onChange={handleCTRBDefectBChange}
                  required
                >
                  <option value="">Choose Roller Bearing Defect B</option>

                  <option value="NO">NO</option>
                  <option value="yes">YES</option>
                </select> */}
              </div>
            </div>
            <div className="PreInspectionrow-3">
              {/* {ctrbdefectB === "yes" && (
                <div>
                  <label>Choose Roller Bearing Defect Name B:</label>
                  <select
                    name="CTRBDefectNameB"
                    value={CTRBDefectNameB}
                    onChange={handleCTRBDefectBNameChange}
                    required
                  >
                    <option value="">Choose Roller Bearing Defect Name B</option>
                    <option value="greaseOozing">Grease Oozing</option>
                    <option value="omrs">OMRS</option>
                    <option value="anyAbnormalSound">Any Abnormal Sound</option>
                    <option value="wildMsg">Wild MSG</option>
                    <option value="sealDamage">Seal Damage</option>
                    <option value="outreCupCrackBroken">
                      Outre Cup Crack/Broken
                    </option>
                    <option value="ctrbJam">Roller Bearing Jam</option>
                    <option value="outerCupPittedCorroded">
                      Outer Cup Pitted/Corroded
                    </option>
                  </select>
                </div>
              )} */}
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

export default CTRBDetailsB;

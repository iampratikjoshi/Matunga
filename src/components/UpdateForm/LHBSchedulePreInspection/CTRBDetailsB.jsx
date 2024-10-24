import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function CTRBDetailsB({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [CTRBStatusB, setCTRBStatusB] = useState(formData.CTRBStatusB);
  const [RefurbishmentDetailsB, setRefurbishmentDetailsB] = useState(
    formData.RefurbishmentDetailsB
  );

  const [CTRBMakeB, setCTRBMakeB] = useState(formData.CTRBMakeB); // State for CTRBMakeB dropdown
  const [OtherCTRBMakeB, setOtherCTRBMakeB] = useState(""); // State for other CTRBMakeB input
  const [CTRBRemarkB, setRemarkB] = useState(formData.CTRBRemarkB);
  const [otherRemarkB, setOtherRemarkB] = useState("");
  const [ctrbdefectB, setctrbdefectB] = useState(formData.CTRBDefectB);
  const [CTRBDefectNameB, setCTRBDefectNameB] = useState(
    formData.CTRBDefectNameB
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
      setFormData((prevData) => ({
        ...prevData,
        CTRBStatusB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBStatusB: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetails = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsB(value);
    setFormData((prevData) => ({
      ...prevData,
      RefurbishmentDetailsB: value,
    }));

    console.log(formData.RefurbishmentDetailsB);
  };

  const handleCTRBMakeChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormData((prevData) => ({
        ...prevData,
        CTRBMakeB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBMakeB: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeB(value);
    setFormData((prevData) => ({
      ...prevData,
      CTRBMakeB: value,
    }));

    console.log(formData.CTRBMakeB);
  };

  const CTRBRemainingLifehandleChangeB = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formData);

    if (name === "CTRBRemainingLifeB") {
      const updatedValue = parseFloat(value); // Ensure it's treated as a number

      setFormData((prevData) => ({
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

      setFormData((prevData) => ({
        ...prevData,
        CTRBRemarkB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBRemarkB: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherRemarkChangeB = (event) => {
    const { value } = event.target;
    setOtherRemarkB(value);
    setFormData((prevData) => ({
      ...prevData,
      CTRBRemarkB: value,
    }));

    console.log(formData.Remark);
  };

  const handleCTRBDefectBChange = (event) => {
    const selectedRemark = event.target.value;
    setctrbdefectB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "yes") {
      // console.log(selectedRemark);
      // console.log(ctrbdefectB);

      setFormData((prevData) => ({
        ...prevData,
        CTRBDefectB: selectedRemark,
        CTRBDefectNameB: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setCTRBDefectNameB("");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBDefectB: "yes", // Clear out the Remark field
      }));
    }
  };

  const handleCTRBDefectBNameChange = (event) => {
    const { value } = event.target;
    setCTRBDefectNameB(value);
    setFormData((prevData) => ({
      ...prevData,
      CTRBDefectNameB: value,
    }));

    console.log(formData.CTRBDefectNameB);
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
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parentedit/UpdateLHBSchedulePreInspection/details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/parentedit/UpdateLHBSchedulePreInspection/ctrba_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // Reset flag after proceeding to next step
    navigate("/parentedit/UpdateLHBSchedulePreInspection/repair_details");
  };

  return (
    <div className="component">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        LHB PRE INSPECTION FORM{" "}
      </h2>
      <h2>CTRB B Details for LHB PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>CTRB No. B:</label>
                <input
                  type="text"
                  name="CTRBNumberB"
                  value={formData.CTRBNumberB}
                  onChange={handleChange}
                  placeholder="Enter CTRB No. B"
                />
              </div>
              {/* <div>
                <label>CTRB Status B:</label>
                <select
                  name="CTRBStatusB"
                  value={formData.CTRBStatusB}
                  onChange={handleCTRBStatusB}
                  required
                >
                  <option value="">Choose CTRB Status B</option>
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
            <div className="row-2">
              <div>
                <label>CTRB Make B:</label>
                <select
                  name="CTRBMakeB"
                  value={CTRBMakeB}
                  onChange={handleCTRBMakeChange}
                  required
                >
                  <option value="">Choose CTRB Make B</option>
                  <option value="SKF">SKF</option>
                  <option value="TIMKEN">TIMKEN</option>
                  <option value="NBC">NBC</option>
                  <option value="others">Others</option>
                </select>
              </div>
              {CTRBMakeB === "others" && (
                <div>
                  <label>Enter Specific CTRB Make B:</label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeB}
                    onChange={handleOtherCTRBMakeChange}
                    placeholder="Enter Specific Remark"
                    // Adjust spacing
                  />
                </div>
              )}
              <div>
                <label>CTRB Remaining Life B(Months):</label>
                <input
                  type="text"
                  name="CTRBRemainingLifeB"
                  value={formData.CTRBRemainingLifeB}
                  onChange={CTRBRemainingLifehandleChangeB}
                  placeholder="Enter CTRB Remaining Life B"
                />
              </div>
            </div>
            <div className="row-3">
              <div>
                <label>CTRB Remark B:</label>
                <select
                  name="CTRBRemarkB"
                  value={CTRBRemarkB}
                  onChange={handleRemarkChangeB}
                  required
                >
                  <option value="">Choose CTRB Remark B</option>
                  <option value="PRESS-OFF">PRESS-OFF</option>
                  <option value="IN POSITION">IN POSITION</option>
                  <option value="others">OTHERS</option>
                </select>
              </div>
              {CTRBRemarkB === "others" && (
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
              )}
              <div>
                <label>CTRB Defect B:</label>
                <select
                  name="CTRBDefectB"
                  value={ctrbdefectB}
                  onChange={handleCTRBDefectBChange}
                  required
                >
                  <option value="">Choose CTRB Defect B</option>

                  <option value="NO">NO</option>
                  <option value="yes">YES</option>
                </select>
              </div>
            </div>
            <div className="row-3">
              {ctrbdefectB === "yes" && (
                <div>
                  <label>Choose CTRB Defect Name B:</label>
                  <select
                    name="CTRBDefectNameB"
                    value={CTRBDefectNameB}
                    onChange={handleCTRBDefectBNameChange}
                    required
                  >
                    <option value="">Choose CTRB Defect Name B</option>
                    <option value="greaseOozing">Grease Oozing</option>
                    <option value="omrs">OMRS</option>
                    <option value="anyAbnormalSound">Any Abnormal Sound</option>
                    <option value="wildMsg">Wild MSG</option>
                    <option value="sealDamage">Seal Damage</option>
                    <option value="outreCupCrackBroken">
                      Outre Cup Crack/Broken
                    </option>
                    <option value="ctrbJam">CTRB Jam</option>
                    <option value="outerCupPittedCorroded">
                      Outer Cup Pitted/Corroded
                    </option>
                  </select>
                </div>
              )}
            </div>

            <div className="btn-container">
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function RodGaugeAndSoundDetails({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [CTRBRemarkA, setRemarkA] = useState(formData.CTRBRemarkA);
  const [otherRemarkA, setOtherRemarkA] = useState("");
  const [CTRBRemarkB, setRemarkB] = useState(formData.CTRBRemarkB);
  const [otherRemarkB, setOtherRemarkB] = useState("");
  const [ctrbdefect, setctrbdefect] = useState(formData.CTRBDefect);
  const [CTRBDefectName, setCTRBDefectName] = useState(formData.CTRBDefectName);
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
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

  const CTRBRemainingLifehandleChangeA = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formData);

    if (name === "CTRBRemainingLifeA") {
      const updatedValue = parseFloat(value); // Ensure it's treated as a number

      setFormData((prevData) => ({
        ...prevData,
        CTRBRemarkA: updatedValue < 4 ? "PRESS-OFF" : "",
      }));
      updatedValue < 4 ? setRemarkA("PRESS-OFF") : setRemarkA("");
    }
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

  const handleRemarkChangeA = (event) => {
    const selectedRemark = event.target.value;
    setRemarkA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(CTRBRemarkA);

      setFormData((prevData) => ({
        ...prevData,
        CTRBRemarkA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBRemarkA: "", // Clear out the Remark field
      }));
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

  const handleOtherRemarkChangeA = (event) => {
    const { value } = event.target;
    setOtherRemarkA(value);
    setFormData((prevData) => ({
      ...prevData,
      CTRBRemarkA: value,
    }));

    console.log(formData.Remark);
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

  const handleCTRBDefectChange = (event) => {
    const selectedRemark = event.target.value;
    setctrbdefect(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "yes") {
      // console.log(selectedRemark);
      // console.log(ctrbdefect);

      setFormData((prevData) => ({
        ...prevData,
        CTRBDefect: selectedRemark,
        CTRBDefectName: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setCTRBDefectName("");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBDefect: "yes", // Clear out the Remark field
      }));
    }
  };

  const handleCTRBDefectNameChange = (event) => {
    const { value } = event.target;
    setCTRBDefectName(value);
    setFormData((prevData) => ({
      ...prevData,
      CTRBDefectName: value,
    }));

    console.log(formData.CTRBDefectName);
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

  const validateForm = () => {
    const newErrors = {};
    // if (!formData.FitmentDate) {
    //   newErrors.FitmentDate = "Fitment Date is required.";
    // }

    if (!formData.CTRBA) {
      newErrors.CTRBA = "CTRB A is required.";
    }
    if (!formData.CTRBB) {
      newErrors.CTRBB = "CTRB B is required.";
    }

    if (!formData.SoundTestIN) {
      newErrors.SoundTestIN = "Sound Test IN is required.";
    }

    if (!formData.CTRBDefect) {
      newErrors.CTRBDefect = "CTRB Defect is required.";
    } else if (formData.CTRBDefect === "yes" && !formData.CTRBDefectName) {
      newErrors.CTRBDefectName = "CTRB Defect Name is required.";
    }

    if (!formData.CTRBRemarkA) {
      newErrors.CTRBRemarkA = "CTRB Remark A is required.";
    } else if (formData.CTRBRemarkA === "others" && !otherRemarkA) {
      newErrors.CTRBRemarkA = "CTRB Remark A is required.";
    }
    if (!formData.CTRBRemarkB) {
      newErrors.CTRBRemarkB = "CTRB Remark B is required.";
    } else if (formData.CTRBRemarkA === "others" && !otherRemarkB) {
      newErrors.CTRBRemarkB = "CTRB Remark B is required.";
    }

    if (!formData.CTRBRemainingLifeA) {
      newErrors.CTRBRemainingLifeA = "CTRB Remaining Life A is required.";
    }
    if (!formData.CTRBRemainingLifeB) {
      newErrors.CTRBRemainingLifeB = "CTRB Remaining Life B is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    navigate("/LHBSchedulePreInspection/details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/LHBSchedulePreInspection/bdandcoach_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
      // Reset flag after proceeding to next step
      navigate("/LHBSchedulePreInspection/ctrb_details");
    }
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
      <h2>CTRB and Sound Details for LHB PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Sound Test IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="SoundTestIN"
                  value={formData.SoundTestIN}
                  onChange={handleChange}
                  placeholder="Enter Sound Test IN"
                />
                {errors.SoundTestIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.SoundTestIN}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBA"
                  value={formData.CTRBA}
                  onChange={handleChange}
                  placeholder="Enter CTRB A"
                />
                {errors.CTRBA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBB"
                  value={formData.CTRBB}
                  onChange={handleChange}
                  placeholder="Enter CTRB B"
                />
                {errors.CTRBB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBB}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Fitment Date:
                </label>
                <input
                  type="date"
                  name="FitmentDate"
                  value={formData.FitmentDate}
                  onChange={handleChange}
                />
                {errors.FitmentDate && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FitmentDate}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB Defect:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="CTRBDefect"
                  value={ctrbdefect}
                  onChange={handleCTRBDefectChange}
                  required
                >
                  <option value="">Choose CTRB Defect</option>
                  {/* <option value="RA">RA</option>
                  <option value="RD">RD</option>
                  <option value="TT">TT</option>
                  <option value="BD">BD</option>
                  <option value="CRACK">CRACK</option> */}
                  <option value="NO">NO</option>
                  <option value="yes">YES</option>
                </select>
                {/* <input
                  type="text"
                  name="CTRBDefect"
                  value={formData.CTRBDefect}
                  onChange={handleChange}
                  placeholder="EnterCTRB Defect"
                /> */}
                {errors.CTRBDefect && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBDefect}
                  </p>
                )}
              </div>
              {ctrbdefect === "yes" && (
                <div>
                  <label>
                    Choose CTRB Defect Name:
                    <span className="required-asterisk">*</span>
                  </label>
                  <select
                    name="CTRBDefectName"
                    value={CTRBDefectName}
                    onChange={handleCTRBDefectNameChange}
                    required
                  >
                    <option value="">Choose CTRB Defect Name</option>
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
                  {errors.CTRBDefectName && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.CTRBDefectName}
                    </p>
                  )}
                  {/* <input
                    type="text"
                    name="CTRBDefectName"
                    value={CTRBDefectName}
                    onChange={handleCTRBDefectNameChange}
                    placeholder="Enter Specific Remark"
                    // Adjust spacing
                  /> */}
                </div>
              )}

              <div className="file-container"></div>
            </div>
            <div className="row-3">
              <div>
                <label>
                  CTRB Remaining Life A(Months):
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBRemainingLifeA"
                  value={formData.CTRBRemainingLifeA}
                  onChange={CTRBRemainingLifehandleChangeA}
                  placeholder="Enter CTRB Remaining Life A"
                />
                {errors.CTRBRemainingLifeA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBRemainingLifeA}
                  </p>
                )}
              </div>

              <div>
                <label>
                  CTRB Remark A:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="CTRBRemarkA"
                  value={CTRBRemarkA}
                  onChange={handleRemarkChangeA}
                  required
                >
                  <option value="">Choose CTRB Remark A</option>
                  <option value="PRESS-OFF">PRESS-OFF</option>
                  <option value="IN POSITION">IN POSITION</option>
                  <option value="others">OTHERS</option>
                </select>

                {CTRBRemarkA !== "others" && errors.CTRBRemarkA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBRemarkA}
                  </p>
                )}
              </div>
              {CTRBRemarkA === "others" && (
                <div>
                  <label>
                    Enter Specific Remark A:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemarkA"
                    value={otherRemarkA}
                    onChange={handleOtherRemarkChangeA}
                    placeholder="Enter Specific Remark A"
                    // Adjust spacing
                  />
                  {CTRBRemarkA === "others" && errors.CTRBRemarkA && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.CTRBRemarkA}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="row-3">
              <div>
                <label>
                  CTRB Remaining Life B(Months):
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBRemainingLifeB"
                  value={formData.CTRBRemainingLifeB}
                  onChange={CTRBRemainingLifehandleChangeB}
                  placeholder="Enter CTRB Remaining Life B"
                />
                {errors.CTRBRemainingLifeB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBRemainingLifeB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB Remark B:<span className="required-asterisk">*</span>
                </label>
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

                {CTRBRemarkB !== "others" && errors.CTRBRemarkB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBRemarkB}
                  </p>
                )}
              </div>
              {CTRBRemarkB === "others" && (
                <div>
                  <label>
                    Enter Specific Remark:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemarkB"
                    value={otherRemarkB}
                    onChange={handleOtherRemarkChangeB}
                    placeholder="Enter Specific Remark B"
                    // Adjust spacing
                  />
                  {CTRBRemarkB === "others" && errors.CTRBRemarkB && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.CTRBRemarkB}
                    </p>
                  )}
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

export default RodGaugeAndSoundDetails;

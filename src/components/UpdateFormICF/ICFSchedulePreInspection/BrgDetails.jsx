import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BRGDetails({
  formDataScheduleICF,
  setFormDataScheduleICF,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [ctrbdefectA, setctrbdefectA] = useState(formDataScheduleICF.CTRBDefectA);
  const [CTRBDefectNameA, setCTRBDefectNameA] = useState(
    formDataScheduleICF.CTRBDefectNameA
  );
  const [CTRBRemarkA, setRemarkA] = useState(formDataScheduleICF.CTRBRemarkA);
  const [otherRemarkA, setOtherRemarkA] = useState("");
  const [CTRBStatusB, setCTRBStatusB] = useState(formDataScheduleICF.CTRBStatusB);
  const [RefurbishmentDetailsB, setRefurbishmentDetailsB] = useState(
    formDataScheduleICF.RefurbishmentDetailsB
  );

  const [CTRBMakeB, setCTRBMakeB] = useState(formDataScheduleICF.CTRBMakeB); // State for CTRBMakeB dropdown
  const [OtherCTRBMakeB, setOtherCTRBMakeB] = useState(""); // State for other CTRBMakeB input
  const [CTRBStatusA, setCTRBStatusA] = useState(formDataScheduleICF.CTRBStatusA);
  const [RefurbishmentDetailsA, setRefurbishmentDetailsA] = useState(
    formDataScheduleICF.RefurbishmentDetailsA
  );

  const [CTRBMakeA, setCTRBMakeA] = useState(formDataScheduleICF.CTRBMakeA); // State for CTRBMakeA dropdown
  const [OtherCTRBMakeA, setOtherCTRBMakeA] = useState(""); // State for other CTRBMakeA input

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

  const handleCTRBDefectAChange = (event) => {
    const selectedRemark = event.target.value;
    setctrbdefectA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "yes") {
      // console.log(selectedRemark);
      // console.log(ctrbdefectA);

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBDefectA: selectedRemark,
        CTRBDefectNameA: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setCTRBDefectNameA("");
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBDefectA: "yes", // Clear out the Remark field
      }));
    }
  };

  const handleCTRBDefectANameChange = (event) => {
    const { value } = event.target;
    setCTRBDefectNameA(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      CTRBDefectNameA: value,
    }));

    console.log(formDataScheduleICF.CTRBDefectNameA);
  };

  const CTRBRemainingLifehandleChangeA = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataScheduleICF);

    if (name === "CTRBRemainingLifeA") {
      const updatedValue = parseFloat(value); // Ensure it's treated as a number

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBRemarkA: updatedValue < 4 ? "PRESS-OFF" : "",
      }));
      updatedValue < 4 ? setRemarkA("PRESS-OFF") : setRemarkA("");
    }
  };

  const handleRemarkChangeA = (event) => {
    const selectedRemark = event.target.value;
    setRemarkA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(CTRBRemarkA);

      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBRemarkA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBRemarkA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherRemarkChangeA = (event) => {
    const { value } = event.target;
    setOtherRemarkA(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      CTRBRemarkA: value,
    }));

    console.log(formDataScheduleICF.Remark);
  };

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

  const handleCTRBStatusA = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBStatusA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBStatusA: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetailsA = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsA(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      RefurbishmentDetailsA: value,
    }));

    console.log(formDataScheduleICF.RefurbishmentDetailsA);
  };

  const handleCTRBMakeAChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBMakeA: selectedRemark,
      }));
    } else {
      setFormDataScheduleICF((prevData) => ({
        ...prevData,
        CTRBMakeA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeAChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormDataScheduleICF((prevData) => ({
      ...prevData,
      CTRBMakeA: value,
    }));

    console.log(formDataScheduleICF.CTRBMakeA);
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
    navigate("/parentediticf/UpdateICFSchedulePreInspection/w2_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // setIsBackNavigation(false); // Reset flag after proceeding to next step
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
      <h2>BRG Details for ICF PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentPreInspection">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
              <label>Brg Code A Side</label>
                <input
                  type="text"
                  name="BrgCodeA"
                  value={formDataScheduleICF.BrgCodeA}
                  onChange={handleChange}
                  placeholder="Enter Brg Code A Side"
                />
                {/* <label>Roller Bearing No. A:</label>
                <input
                  type="text"
                  name="CTRBNumberA"
                  value={formDataScheduleICF.CTRBNumberA}
                  onChange={handleChange}
                  placeholder="Enter Roller Bearing No. A"
                /> */}
              </div>
              <div>
              <label>Brg Code B Side</label>
                <input
                  type="text"
                  name="BrgCodeB"
                  value={formDataScheduleICF.BrgCodeB}
                  onChange={handleChange}
                  placeholder="Enter Brg Code B Side"
                />
              </div>
              <div>
              <label>Brg Year A Side</label>
                <input
                  type="text"
                  name="BrgYearA"
                  value={formDataScheduleICF.BrgYearA}
                  onChange={handleChange}
                  placeholder="Enter Brg Year A Side"
                />
              </div>
              {/* <div>
                <label>Roller Bearing Status A:</label>
                <select
                  name="CTRBStatusA"
                  value={formDataScheduleICF.CTRBStatusA}
                  onChange={handleCTRBStatusA}
                  required
                >
                  <option value="">Choose Roller Bearing Status A</option>
                  <option value="NEW">NEW</option>
                  <option value="REFURBISHED">REFURBISHED</option>
                </select>
              </div>
              {CTRBStatusA === "REFURBISHED" && (
                <div>
                  <label>Refurbishment Details A:</label>
                  <input
                    type="text"
                    name="RefurbishmentDetailsA"
                    value={RefurbishmentDetailsA}
                    onChange={handleRefurbishmentDetailsA}
                    placeholder="Enter Refurbishment Details A"
                  />
                </div>
              )} */}
            </div>
            <div className="PreInspectionrow-2">
            <div>
              <label>Brg Year B Side</label>
                <input
                  type="text"
                  name="BrgYearB"
                  value={formDataScheduleICF.BrgYearB}
                  onChange={handleChange}
                  placeholder="Enter Brg Year B Side"
                />
            </div>
              
              {/* <div>
                <label>Roller Bearing Make A:</label>
                <select
                  name="CTRBMakeA"
                  value={CTRBMakeA}
                  onChange={handleCTRBMakeAChange}
                  required
                >
                  <option value="">Choose Roller Bearing Make A</option>
                  <option value="SKF">SKF</option>
                  <option value="TIMKEN">TIMKEN</option>
                  <option value="NBC">NBC</option>
                  <option value="others">Others</option>
                </select>
              </div>
              {CTRBMakeA === "others" && (
                <div>
                  <label>Enter Roller Bearing Make A:</label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeA}
                    onChange={handleOtherCTRBMakeAChange}
                    placeholder="Enter Specific Remark"
                    // Adjust spacing
                  />
                </div>
              )} */}
              <div>
                <label>Brg Make A Side</label>
                <input
                  type="text"
                  name="BrgMakeA"
                  value={formDataScheduleICF.BrgMakeA}
                  onChange={handleChange}
                  placeholder="Enter Brg Make A Side"
                />
                {/* <label>Roller Bearing Remaining Life A(Months):</label>
                <input
                  type="text"
                  name="CTRBRemainingLifeA"
                  value={formDataScheduleICF.CTRBRemainingLifeA}
                  onChange={CTRBRemainingLifehandleChangeA}
                  placeholder="Enter Roller Bearing Remaining Life A"
                /> */}
              </div>
              <div>
              <label>Brg Make B Side</label>
                <input
                  type="text"
                  name="BrgMakeB"
                  value={formDataScheduleICF.BrgMakeB}
                  onChange={handleChange}
                  placeholder="Enter Brg Make B Side"
                />
              </div>
            </div>

            <div className="PreInspectionrow-3">
              <div>
                <label>Brg. Initial fitment month A Side</label>
                <input
                  type="text"
                  name="BrgFitmentA"
                  value={formDataScheduleICF.BrgFitmentA}
                  onChange={handleChange}
                  placeholder="Enter Brg. Initial fitment month A Side"
                />
              </div>
              {/* <div>
                <label>Roller Bearing Remark A:</label>
                <select
                  name="CTRBRemarkA"
                  value={CTRBRemarkA}
                  onChange={handleRemarkChangeA}
                  required
                >
                  <option value="">Choose Roller Bearing Remark A</option>
                  <option value="PRESS-OFF">PRESS-OFF</option>
                  <option value="IN POSITION">IN POSITION</option>
                  <option value="others">OTHERS</option>
                </select>
              </div>
              {CTRBRemarkA === "others" && (
                <div>
                  <label>Enter Specific Remark A:</label>
                  <input
                    type="text"
                    name="OtherRemarkA"
                    value={otherRemarkA}
                    onChange={handleOtherRemarkChangeA}
                    placeholder="Enter Specific Remark A"
                    // Adjust spacing
                  />
                </div>
              )} */}

              <div>
                <label>Brg. Initial fitment month B Side</label>
                <input
                  type="text"
                  name="BrgFitmentB"
                  value={formDataScheduleICF.BrgFitmentB}
                  onChange={handleChange}
                  placeholder="Enter Brg. Initial fitment month B Side"
                />
                {/* <label>Roller Bearing Defect A:</label>
                <select
                  name="CTRBDefectA"
                  value={ctrbdefectA}
                  onChange={handleCTRBDefectAChange}
                  required
                >
                  <option value="">Choose Roller Bearing Defect A</option>

                  <option value="NO">NO</option>
                  <option value="yes">YES</option>
                </select> */}
              </div>
              <div>
              <label>Brg. Service in month A Side</label>
                <input
                  type="text"
                  name="BrgServiceA"
                  value={formDataScheduleICF.BrgServiceA}
                  onChange={handleChange}
                  placeholder="Brg. Service in month A side"
                />
              </div>
            </div>
            <div className="PreInspectionrow-3">
              {/* {ctrbdefectA === "yes" && (
                <div>
                  <label>Choose Roller Bearing Defect Name A:</label>
                  <select
                    name="CTRBDefectNameA"
                    value={CTRBDefectNameA}
                    onChange={handleCTRBDefectANameChange}
                    required
                  >
                    <option value="">Choose Roller Bearing Defect Name A</option>
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
              <div>
              <label>Brg. Service in month B Side</label>
                <input
                  type="text"
                  name="BrgServiceB"
                  value={formDataScheduleICF.BrgServiceB}
                  onChange={handleChange}
                  placeholder="Brg. Service in month B side"
                />
              </div>
              <div>
                <label>MTN Brg. No. A Side</label>
                  <input
                    type="text"
                    name="MTNBrgSideA"
                    value={formDataScheduleICF.MTNBrgSideA}
                    onChange={handleChange}
                    placeholder="Enter MTN Brg. No. A Side"
                  />
              </div>
              <div>
                <label>MTN Brg. No. B Side</label>
                  <input
                    type="text"
                    name="MTNBrgSideB"
                    value={formDataScheduleICF.MTNBrgSideB}
                    onChange={handleChange}
                    placeholder="Enter MTN Brg. No. B Side"
                  />
              </div>
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

export default BRGDetails;

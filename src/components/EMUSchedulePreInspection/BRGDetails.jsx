import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import "../../resources/LHB/NewPreInspectionForm/newpreinspectionform.css";

function CTRBDetailsA({
  formDataScheduleEMU,
  setFormDataScheduleEMU,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [ctrbdefectA, setctrbdefectA] = useState(formDataScheduleEMU.CTRBDefectA);
  const [CTRBDefectNameA, setCTRBDefectNameA] = useState(
    formDataScheduleEMU.CTRBDefectNameA
  );
  const [CTRBRemarkA, setRemarkA] = useState(formDataScheduleEMU.CTRBRemarkA);
  const [otherRemarkA, setOtherRemarkA] = useState("");
  const [CTRBStatusB, setCTRBStatusB] = useState(formDataScheduleEMU.CTRBStatusB);
  const [RefurbishmentDetailsB, setRefurbishmentDetailsB] = useState(
    formDataScheduleEMU.RefurbishmentDetailsB
  );

  const [CTRBMakeB, setCTRBMakeB] = useState(formDataScheduleEMU.CTRBMakeB); // State for CTRBMakeB dropdown
  const [OtherCTRBMakeB, setOtherCTRBMakeB] = useState(""); // State for other CTRBMakeB input
  const [CTRBStatusA, setCTRBStatusA] = useState(formDataScheduleEMU.CTRBStatusA);
  const [RefurbishmentDetailsA, setRefurbishmentDetailsA] = useState(
    formDataScheduleEMU.RefurbishmentDetailsA
  );

  const [CTRBMakeA, setCTRBMakeA] = useState(formDataScheduleEMU.CTRBMakeA); // State for CTRBMakeA dropdown
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

      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBDefectA: selectedRemark,
        CTRBDefectNameA: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setCTRBDefectNameA("");
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBDefectA: "yes", // Clear out the Remark field
      }));
    }
  };

  const handleCTRBDefectANameChange = (event) => {
    const { value } = event.target;
    setCTRBDefectNameA(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      CTRBDefectNameA: value,
    }));

    console.log(formDataScheduleEMU.CTRBDefectNameA);
  };

  const CTRBRemainingLifehandleChangeA = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataScheduleEMU);

    if (name === "CTRBRemainingLifeA") {
      const updatedValue = parseFloat(value); // Ensure it's treated as a number

      setFormDataScheduleEMU((prevData) => ({
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

      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBRemarkA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBRemarkA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherRemarkChangeA = (event) => {
    const { value } = event.target;
    setOtherRemarkA(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      CTRBRemarkA: value,
    }));

    console.log(formDataScheduleEMU.Remark);
  };

  const handleCTRBStatusB = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBStatusB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBStatusB: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetails = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsB(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      RefurbishmentDetailsB: value,
    }));

    console.log(formDataScheduleEMU.RefurbishmentDetailsB);
  };

  const handleCTRBMakeChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBMakeB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBMakeB: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeB(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      CTRBMakeB: value,
    }));

    console.log(formDataScheduleEMU.CTRBMakeB);
  };

  const handleCTRBStatusA = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBStatusA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBStatusA: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetailsA = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsA(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      RefurbishmentDetailsA: value,
    }));

    console.log(formDataScheduleEMU.RefurbishmentDetailsA);
  };

  const handleCTRBMakeAChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBMakeA: selectedRemark,
      }));
    } else {
      setFormDataScheduleEMU((prevData) => ({
        ...prevData,
        CTRBMakeA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeAChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormDataScheduleEMU((prevData) => ({
      ...prevData,
      CTRBMakeA: value,
    }));

    console.log(formDataScheduleEMU.CTRBMakeA);
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
    navigate("/emuschedulepreinspectionform/w1_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/emuschedulepreinspectionform/w2_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // setIsBackNavigation(false); // Reset flag after proceeding to next step
    navigate("/emuschedulepreinspectionform/repair_details");
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
        EMU PRE INSPECTION FORM{" "}
      </h2>
      <h2>BRG Details for EMU PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentLHB">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
              <label>Brg Code A Side</label>
                <input
                  type="text"
                  name="BrgCodeA"
                  value={formDataScheduleEMU.BrgCodeA}
                  onChange={handleChange}
                  placeholder="Enter Brg Code A Side"
                />
                {/* <label>Roller Bearing No. A:</label>
                <input
                  type="text"
                  name="CTRBNumberA"
                  value={formDataScheduleEMU.CTRBNumberA}
                  onChange={handleChange}
                  placeholder="Enter Roller Bearing No. A"
                /> */}
              </div>
              <div>
              <label>Brg Code B Side</label>
                <input
                  type="text"
                  name="BrgCodeB"
                  value={formDataScheduleEMU.BrgCodeB}
                  onChange={handleChange}
                  placeholder="Enter Brg Code B Side"
                />
              </div>
              <div>
              <label>Brg Year A Side</label>
                <input
                  type="text"
                  name="BrgYearA"
                  value={formDataScheduleEMU.BrgYearA}
                  onChange={handleChange}
                  placeholder="Enter Brg Year A Side"
                />
              </div>
              {/* <div>
                <label>Roller Bearing Status A:</label>
                <select
                  name="CTRBStatusA"
                  value={formDataScheduleEMU.CTRBStatusA}
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
                  value={formDataScheduleEMU.BrgYearB}
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
                  value={formDataScheduleEMU.BrgMakeA}
                  onChange={handleChange}
                  placeholder="Enter Brg Make A Side"
                />
                {/* <label>Roller Bearing Remaining Life A(Months):</label>
                <input
                  type="text"
                  name="CTRBRemainingLifeA"
                  value={formDataScheduleEMU.CTRBRemainingLifeA}
                  onChange={CTRBRemainingLifehandleChangeA}
                  placeholder="Enter Roller Bearing Remaining Life A"
                /> */}
              </div>
              <div>
              <label>Brg Make B Side</label>
                <input
                  type="text"
                  name="BrgMakeB"
                  value={formDataScheduleEMU.BrgMakeB}
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
                  value={formDataScheduleEMU.BrgFitmentA}
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
                  value={formDataScheduleEMU.BrgFitmentB}
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
                  value={formDataScheduleEMU.BrgServiceA}
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
                  value={formDataScheduleEMU.BrgServiceB}
                  onChange={handleChange}
                  placeholder="Brg. Service in month B side"
                />
              </div>
              <div>
                <label>MTN Brg. No. A Side</label>
                  <input
                    type="text"
                    name="MTNBrgSideA"
                    value={formDataScheduleEMU.MTNBrgSideA}
                    onChange={handleChange}
                    placeholder="Enter MTN Brg. No. A Side"
                  />
              </div>
              <div>
                <label>MTN Brg. No. B Side</label>
                  <input
                    type="text"
                    name="MTNBrgSideB"
                    value={formDataScheduleEMU.MTNBrgSideB}
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

export default CTRBDetailsA;

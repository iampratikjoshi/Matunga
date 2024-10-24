import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function CTRBDetailsA({
  formDataFinal,
  setFormDataFinal,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [ctrbdefectA, setctrbdefectA] = useState(formDataFinal.CTRBDefectA);
  const [CTRBDefectNameA, setCTRBDefectNameA] = useState(formDataFinal.CTRBDefectNameA);
  const [CTRBRemarkA, setRemarkA] = useState(formDataFinal.CTRBRemarkA);
  const [otherRemarkA, setOtherRemarkA] = useState("");
  const [CTRBStatusB, setCTRBStatusB] = useState(formDataFinal.CTRBStatusB);
  const [RefurbishmentDetailsB, setRefurbishmentDetailsB] = useState(
    formDataFinal.RefurbishmentDetailsB
  );

  const [CTRBMakeB, setCTRBMakeB] = useState(formDataFinal.CTRBMakeB); // State for CTRBMakeB dropdown
  const [OtherCTRBMakeB, setOtherCTRBMakeB] = useState(""); // State for other CTRBMakeB input
  const [CTRBStatusA, setCTRBStatusA] = useState(formDataFinal.CTRBStatusA);
  const [RefurbishmentDetailsA, setRefurbishmentDetailsA] = useState(
    formDataFinal.RefurbishmentDetailsA
  );

  const [CTRBMakeA, setCTRBMakeA] = useState(formDataFinal.CTRBMakeA); // State for CTRBMakeA dropdown
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

      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBDefectA: selectedRemark,
        CTRBDefectNameA: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setCTRBDefectNameA("");
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBDefectA: "yes", // Clear out the Remark field
      }));
    }
  };

  const handleCTRBDefectANameChange = (event) => {
    const { value } = event.target;
    setCTRBDefectNameA(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      CTRBDefectNameA: value,
    }));

    console.log(formDataFinal.CTRBDefectNameA);
  };



  const CTRBRemainingLifehandleChangeA = (event) => {
    const { name, value } = event.target;
    onInputChange(name, value);
    console.log(formDataFinal);

    if (name === "CTRBRemainingLifeA") {
      const updatedValue = parseFloat(value); // Ensure it's treated as a number

      setFormDataFinal((prevData) => ({
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

      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBRemarkA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBRemarkA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherRemarkChangeA = (event) => {
    const { value } = event.target;
    setOtherRemarkA(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      CTRBRemarkA: value,
    }));

    console.log(formDataFinal.Remark);
  };

  const handleCTRBStatusB = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBStatusB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBStatusB: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetails = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsB(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      RefurbishmentDetailsB: value,
    }));

    console.log(formDataFinal.RefurbishmentDetailsB);
  };

  const handleCTRBMakeChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBMakeB: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBMakeB: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeB(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      CTRBMakeB: value,
    }));

    console.log(formDataFinal.CTRBMakeB);
  };

  const handleCTRBStatusA = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBStatusA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBStatusA: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetailsA = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsA(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      RefurbishmentDetailsA: value,
    }));

    console.log(formDataFinal.RefurbishmentDetailsA);
  };

  const handleCTRBMakeAChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBMakeA: selectedRemark,
      }));
    } else {
      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBMakeA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeAChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormDataFinal((prevData) => ({
      ...prevData,
      CTRBMakeA: value,
    }));

    console.log(formDataFinal.CTRBMakeA);
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
      DepartmentId: 2,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parentedit/Updatelhbfinalinspection/axle_details");
  };

  const handleBack = () => {
    setIsBackNavigation(true); // Set flag when navigating back
    navigate("/parentedit/Updatelhbfinalinspection/bd_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    if (!isBackNavigation) {
      onNextStep();
      setIsBackNavigation(false);
    }
    // setIsBackNavigation(false); // Reset flag after proceeding to next step
    navigate("/parentedit/Updatelhbfinalinspection/ctrbb_details");
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
        LHB Final INSPECTION FORM{" "}
      </h2>
      <h2>CTRB A Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  CTRB No. A:
                </label>
                <input
                  type="text"
                  name="CTRBNumberA"
                  value={formDataFinal.CTRBNumberA}
                  onChange={handleChange}
                  placeholder="Enter CTRB No. A"
                />

              </div>
              <div>
                <label>
                  CTRB Status A:
                </label>
                <select
                  name="CTRBStatusA"
                  value={formDataFinal.CTRBStatusA}
                  onChange={handleCTRBStatusA}
                  required
                >
                  <option value="">Choose CTRB Status A</option>
                  <option value="NEW">NEW</option>
                  <option value="REFURBISHED">REFURBISHED</option>
                </select>


              </div>
              {CTRBStatusA === "REFURBISHED" && (
                <div>
                  <label>
                    Refurbishment Details A:

                  </label>
                  <input
                    type="text"
                    name="RefurbishmentDetailsA"
                    value={RefurbishmentDetailsA}
                    onChange={handleRefurbishmentDetailsA}
                    placeholder="Enter Refurbishment Details A"
                  />

                </div>
              )}

            </div>
            <div className="row-2">
              <div>
                <label>
                  CTRB Make A:
                </label>
                <select
                  name="CTRBMakeA"
                  value={CTRBMakeA}
                  onChange={handleCTRBMakeAChange}
                  required
                >
                  <option value="">Choose CTRB Make A</option>
                  <option value="SKF">SKF</option>
                  <option value="TIMKEN">TIMKEN</option>
                  <option value="NBC">NBC</option>
                  <option value="others">Others</option>
                </select>


              </div>
              {CTRBMakeA === "others" && (
                <div>
                  <label>
                    Enter CTRB Make A:

                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeA}
                    onChange={handleOtherCTRBMakeAChange}
                    placeholder="Enter Specific Remark"
                  // Adjust spacing
                  />

                </div>
              )}
              <div>
                <label>
                  MEP A:
                </label>
                <input
                  type="text"
                  name="MEPA"
                  value={formDataFinal.MEPA}
                  onChange={handleChange}
                  placeholder="Enter MEP A"
                />
                
              </div>
             


            </div>

            <div className="row-3">
              <div>
                <label>
                  CTRB Remark A:
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


              </div>
              {CTRBRemarkA === "others" && (
                <div>
                  <label>
                    Enter Specific Remark A:

                  </label>
                  <input
                    type="text"
                    name="OtherRemarkA"
                    value={otherRemarkA}
                    onChange={handleOtherRemarkChangeA}
                    placeholder="Enter Specific Remark A"
                  // Adjust spacing
                  />

                </div>
              )}

              <div>
                <label>
                  CTRB Defect A:
                </label>
                <select
                  name="CTRBDefectA"
                  value={ctrbdefectA}
                  onChange={handleCTRBDefectAChange}
                  required
                >
                  <option value="">Choose CTRB Defect A</option>

                  <option value="NO">NO</option>
                  <option value="yes">YES</option>
                </select>


              </div>

            </div>
            <div className="row-3">
              {ctrbdefectA === "yes" && (
                <div>
                  <label>
                    Choose CTRB Defect Name A:

                  </label>
                  <select
                    name="CTRBDefectNameA"
                    value={CTRBDefectNameA}
                    onChange={handleCTRBDefectANameChange}
                    required
                  >
                    <option value="">Choose CTRB Defect Name A</option>
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
                <div>
                <label>
                  CTRB Remaining Life A(Months):

                </label>
                <input
                  type="text"
                  name="CTRBRemainingLifeA"
                  value={formDataFinal.CTRBRemainingLifeA}
                  onChange={CTRBRemainingLifehandleChangeA}
                  placeholder="Enter CTRB Remaining Life A"
                />

              </div>
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

export default CTRBDetailsA;
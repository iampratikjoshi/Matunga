import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function CTRBDetails({
  formDataFinal,
  setFormDataFinal,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
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

  const handleCTRBStatusB = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusB(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

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
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

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
      // console.log(selectedRemark);
      // console.log(CTRBMakeA);

      setFormDataFinal((prevData) => ({
        ...prevData,
        CTRBMakeA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
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

  const validateForm = () => {
    const newErrors = {};
    if (!formDataFinal.CTRBNumberA) {
      newErrors.CTRBNumberA = "CTRB No A is required.";
    }

    if (!formDataFinal.CTRBStatusA) {
      newErrors.CTRBStatusA = "CTRB Status A is required.";
    } else if (
      formDataFinal.CTRBStatusA === "REFURBISHED" &&
      !formDataFinal.RefurbishmentDetailsA
    ) {
      newErrors.RefurbishmentDetailsA = "Refurbishment Details A is required.";
    }

    if (!formDataFinal.CTRBMakeA) {
      newErrors.CTRBMakeA = "CTRB Make A is required.";
    }

    if (!formDataFinal.CTRBNumberB) {
      newErrors.CTRBNumberB = "CTRB No B is required.";
    }

    if (!formDataFinal.CTRBStatusB) {
      newErrors.CTRBStatusB = "CTRB Status B is required.";
    } else if (
      formDataFinal.CTRBStatusB === "REFURBISHED" &&
      !formDataFinal.RefurbishmentDetailsB
    ) {
      newErrors.RefurbishmentDetailsB = "Refurbishment Details B is required.";
    }

    if (!formDataFinal.CTRBMakeB) {
      newErrors.CTRBMakeB = "CTRB Make B is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/lhbfinalinspection/bd_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
      // setIsBackNavigation(false); // Reset flag after proceeding to next step
      navigate("/lhbfinalinspection/ctrbremaininglife_details");
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
        LHB FINAL INSPECTION FORM{" "}
      </h2>
      <h2>CTRB Details for LHB Final Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  CTRB No. A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBNumberA"
                  value={formDataFinal.CTRBNumberA}
                  onChange={handleChange}
                  placeholder="Enter CTRB No. A"
                />
                {errors.CTRBNumberA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBNumberA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB Make A:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="CTRBMakeA"
                  value={CTRBMakeA}
                  onChange={handleCTRBMakeAChange}
                  required
                >
                  <option value="">Choose Make</option>
                  <option value="SKF">SKF</option>
                  <option value="TIMKEN">TIMKEN</option>
                  <option value="NBC">NBC</option>
                  <option value="others">Others</option>
                </select>

                {CTRBMakeA !== "others" && errors.CTRBMakeA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBMakeA}
                  </p>
                )}
              </div>
              {CTRBMakeA === "others" && (
                <div>
                  <label>
                    Enter Specific CTRB Make A:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeA}
                    onChange={handleOtherCTRBMakeAChange}
                    placeholder="Enter Specific CTRB Make A"
                    // Adjust spacing
                  />
                  {errors.CTRBMakeA && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.CTRBMakeA}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="row-2">
              <div>
                <label>
                  CTRB Status A:<span className="required-asterisk">*</span>
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

                {errors.CTRBStatusA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBStatusA}
                  </p>
                )}
              </div>
              {CTRBStatusA === "REFURBISHED" && (
                <div>
                  <label>
                    Refurbishment Details A:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="RefurbishmentDetailsA"
                    value={RefurbishmentDetailsA}
                    onChange={handleRefurbishmentDetailsA}
                    placeholder="Enter Refurbishment Details A"
                  />
                  {errors.RefurbishmentDetailsA && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.RefurbishmentDetailsA}
                    </p>
                  )}
                </div>
              )}

              {/* <div>
                <label>
                  Refurbishment Details:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="RefurbishmentDetailsA"
                  value={formDataFinal.RefurbishmentDetailsA}
                  onChange={handleChange}
                  placeholder="Enter Refurbishment Details"
                />
                {errors.RefurbishmentDetailsA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.RefurbishmentDetailsA}
                  </p>
                )}

              </div> */}
            </div>

            <div className="row-3">
              <div>
                <label>
                  CTRB No. B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBNumberB"
                  value={formDataFinal.CTRBNumberB}
                  onChange={handleChange}
                  placeholder="Enter CTRB No. B"
                />
                {errors.CTRBNumberB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBNumberB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  CTRB Make B:<span className="required-asterisk">*</span>
                </label>
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

                {CTRBMakeB !== "others" && errors.CTRBMakeB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBMakeB}
                  </p>
                )}
              </div>
              {CTRBMakeB === "others" && (
                <div>
                  <label>
                    Enter Specific CTRB Make B:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeB}
                    onChange={handleOtherCTRBMakeChange}
                    placeholder="Enter Specific CTRB Make B"
                    // Adjust spacing
                  />
                  {errors.CTRBMakeB && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.CTRBMakeB}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="row-3">
              <div>
                <label>
                  CTRB Status B:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="CTRBStatusB"
                  value={formDataFinal.CTRBStatusB}
                  onChange={handleCTRBStatusB}
                  required
                >
                  <option value="">Choose CTRB Status B</option>
                  <option value="NEW">NEW</option>
                  <option value="REFURBISHED">REFURBISHED</option>
                </select>

                {errors.CTRBStatusB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CTRBStatusB}
                  </p>
                )}
              </div>
              {CTRBStatusB === "REFURBISHED" && (
                <div>
                  <label>
                    Refurbishment Details B:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="RefurbishmentDetailsB"
                    value={RefurbishmentDetailsB}
                    onChange={handleRefurbishmentDetails}
                    placeholder="Enter Refurbishment Details B"
                  />
                  {errors.RefurbishmentDetailsB && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.RefurbishmentDetailsB}
                    </p>
                  )}
                </div>
              )}

              {/* <div>
                <label>
                  Refurbishment Details:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="RefurbishmentDetailsB"
                  value={formDataFinal.RefurbishmentDetailsB}
                  onChange={handleChange}
                  placeholder="Enter Refurbishment Details"
                />
                {errors.RefurbishmentDetailsB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.RefurbishmentDetailsB}
                  </p>
                )}

              </div> */}
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

export default CTRBDetails;

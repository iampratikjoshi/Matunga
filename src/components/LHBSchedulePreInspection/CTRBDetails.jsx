import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function CTRBDetails({
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
  const [CTRBStatusA, setCTRBStatusA] = useState(formData.CTRBStatusA);
  const [RefurbishmentDetailsA, setRefurbishmentDetailsA] = useState(
    formData.RefurbishmentDetailsA
  );

  const [CTRBMakeA, setCTRBMakeA] = useState(formData.CTRBMakeA); // State for CTRBMakeA dropdown
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

  const handleCTRBStatusA = (event) => {
    const selectedRemark = event.target.value;
    setCTRBStatusA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormData((prevData) => ({
        ...prevData,
        CTRBStatusA: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBStatusA: "", // Clear out the Remark field
      }));
    }
  };

  const handleRefurbishmentDetailsA = (event) => {
    const { value } = event.target;
    setRefurbishmentDetailsA(value);
    setFormData((prevData) => ({
      ...prevData,
      RefurbishmentDetailsA: value,
    }));

    console.log(formData.RefurbishmentDetailsA);
  };

  const handleCTRBMakeAChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormData((prevData) => ({
        ...prevData,
        CTRBMakeA: selectedRemark,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        CTRBMakeA: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherCTRBMakeAChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormData((prevData) => ({
      ...prevData,
      CTRBMakeA: value,
    }));

    console.log(formData.CTRBMakeA);
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
    if (!formData.CTRBNumberA) {
      newErrors.CTRBNumberA = "CTRB No A is required.";
    }
    if (!formData.CTRBStatusA) {
      newErrors.CTRBStatusA = "CTRB Status A is required.";
    } else if (
      formData.CTRBStatusA === "REFURBISHED" &&
      !formData.RefurbishmentDetailsA
    ) {
      newErrors.RefurbishmentDetailsA = "Refurbishment Details A is required.";
    }

    if (!formData.CTRBMakeA) {
      newErrors.CTRBMakeA = "CTRB Make A is required.";
    }

    if (!formData.CTRBNumberB) {
      newErrors.CTRBNumberB = "CTRB No B is required.";
    }

    if (!formData.CTRBStatusB) {
      newErrors.CTRBStatusB = "CTRB Status B is required.";
    } else if (
      formData.CTRBStatusB === "REFURBISHED" &&
      !formData.RefurbishmentDetailsB
    ) {
      newErrors.RefurbishmentDetailsB = "Refurbishment Details B is required.";
    }

    if (!formData.CTRBMakeB) {
      newErrors.CTRBMakeB = "CTRB Make B is required.";
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
    navigate("/LHBSchedulePreInspection/ctrbrodgaugeandsound_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
      // setIsBackNavigation(false); // Reset flag after proceeding to next step
      navigate("/LHBSchedulePreInspection/repair_details");
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
      <h2>CTRB Details for LHB PRE Inspection Form</h2>

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
                  value={formData.CTRBNumberA}
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
                    Enter CTRB Make A:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherCTRBMakeA}
                    onChange={handleOtherCTRBMakeAChange}
                    placeholder="Enter Specific Remark"
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
                  value={formData.CTRBStatusA}
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
            </div>

            <div className="row-3">
              <div>
                <label>
                  CTRB No. B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CTRBNumberB"
                  value={formData.CTRBNumberB}
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
                    placeholder="Enter Specific Remark"
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
                  value={formData.CTRBStatusB}
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

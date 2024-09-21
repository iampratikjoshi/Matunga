import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function BDAndCoachDetails({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [BDDefect, setBDDefect] = useState(formData.BDDefect); // State for BDDefect dropdown
  const [OtherBDDefect, setOtherBDDefect] = useState(""); // State for other BDDefect input

  const [BDMakeIN, setBDMakeIN] = useState(formData.BDMakeIN); // State for CTRBMakeB dropdown
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

      setFormData((prevData) => ({
        ...prevData,
        BDDefect: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        BDDefect: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDDefectChange = (event) => {
    const { value } = event.target;
    setOtherBDDefect(value);
    setFormData((prevData) => ({
      ...prevData,
      BDDefect: value,
    }));

    console.log(formData.BDDefect);
  };

  const handleBDMakeINChange = (event) => {
    const selectedRemark = event.target.value;
    setBDMakeIN(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(BDMakeIN);

      setFormData((prevData) => ({
        ...prevData,
        BDMakeIN: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        BDMakeIN: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherBDMakeINChange = (event) => {
    const { value } = event.target;
    setOtherBDMakeIN(value);
    setFormData((prevData) => ({
      ...prevData,
      BDMakeIN: value,
    }));

    console.log(formData.BDMakeIN);
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
    if (!formData.BDNumber) {
      newErrors.BDNumber = "BD No is required.";
    }

    if (!formData.BDMakeIN) {
      newErrors.BDMakeIN = "BD Make is required.";
    }

    if (!formData.BDSizeIN) {
      newErrors.BDSizeIN = "BD Size IN is required.";
    }

    if (!formData.CoachNumber) {
      newErrors.CoachNumber = "Coach Number is required.";
    }

    if (!formData.DiameterINA) {
      newErrors.DiameterINA = "Diameter IN A is required.";
    }
    if (!formData.DiameterINB) {
      newErrors.DiameterINB = "Diameter IN B is required.";
    }
    if (!formData.BDDefect) {
      newErrors.BDDefect = "BD Defect is required.";
    }

    if (!formData.FlageIN) {
      newErrors.FlageIN = "Flage IN is required.";
    }
    if (!formData.BDThicknessA) {
      newErrors.BDThicknessA = "BD Thickness A is required.";
    }
    if (!formData.BDThicknessB) {
      newErrors.BDThicknessB = "BD Thickness B is required.";
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
    navigate("/LHBSchedulePreInspection/details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      if (!isBackNavigation) {
        onNextStep();
        setIsBackNavigation(false);
      }
      // setIsBackNavigation(false); // Reset flag after proceeding to next step
      navigate("/LHBSchedulePreInspection/ctrbrodgaugeandsound_details");
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
        LHB PRE INSPECTION FORM
      </h2>
      <h2>BD And COACH Details for LHB PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  BD No.:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDNumber"
                  value={formData.BDNumber}
                  onChange={handleChange}
                  placeholder="Enter BD No."
                />
                {errors.BDNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDNumber}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Make:<span className="required-asterisk">*</span>
                </label>
                {/* <input
                  type="text"
                  name="BDMakeIN"
                  value={formData.BDMakeIN}
                  onChange={handleChange}
                  placeholder="Enter BD Make"
                /> */}
                <select
                  name="BDMakeIN"
                  value={BDMakeIN}
                  onChange={handleBDMakeINChange}
                >
                  <option value="">Choose BD Make</option>
                  <option value="Knorr">Knorr</option>
                  <option value="Faiveley">Faiveley</option>
                  <option value="JWL">JWL</option>
                  <option value="Pioneer">Pioneer</option>
                  <option value="others">Others</option>
                </select>
                {BDMakeIN !== "others" && errors.BDMakeIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDMakeIN}
                  </p>
                )}
              </div>
              {BDMakeIN === "others" && (
                <div>
                  <label>
                    Enter Specific BD Make:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherBDMakeIN}
                    onChange={handleOtherBDMakeINChange}
                    placeholder="Enter Specific BD Make"
                  // Adjust spacing
                  />
                  {errors.BDMakeIN && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.BDMakeIN}
                    </p>
                  )}
                </div>
              )}

            </div>
            <div className="row-2">
              <div>
                <label>
                  BD Defect:<span className="required-asterisk">*</span>
                </label>
                <select
                  name="BDDefect"
                  value={BDDefect}
                  onChange={handleBDDefectChange}
                  required
                >
                  <option value="">Choose BD Defect</option>
                  <option value="ShelledTreadORMetalChippedOff">
                    Shelled Tread/Metal chipped off
                  </option>
                  <option value="SpreadRim">Spread Rim</option>
                  <option value="HeatCheck">Heat Check</option>
                  <option value="ThermalCrack">Thermal crack</option>
                  <option value="ShatteredRim">Shattered rim</option>
                  <option value="FlatPlacesOrFlatTyre">
                    Flat Places/ Flat tyre
                  </option>
                  <option value="RootRadiusTooSmall">
                    Root radius too small
                  </option>
                  <option value="DeepFlange">Deep Flange</option>
                  <option value="ThinFlange">Thin Flange</option>
                  <option value="SharpFlange">Sharp Flange</option>
                  <option value="WidthLess">Width-less</option>
                  <option value="others">Others</option>
                  {/* <input
                  type="text"
                  name="BDDefect"
                  value={formData.BDDefect}
                  onChange={handleChange}
                  placeholder="Enter BD Defect"
                /> */}
                </select>
                {BDDefect !== "others" && errors.BDDefect && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDDefect}
                  </p>
                )}
              </div>
              {BDDefect === "others" && (
                <div>
                  <label>
                    Enter Specific BD Defect:
                    <span className="required-asterisk">*</span>
                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherBDDefect}
                    onChange={handleOtherBDDefectChange}
                    placeholder="Enter Specific BD Defect"
                  // Adjust spacing
                  />
                  {errors.BDDefect && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "small",
                        margin: 0,
                        marginTop: "2px",
                        marginLeft: "2px",
                      }}
                    >
                      {errors.BDDefect}
                    </p>
                  )}
                </div>
              )}
              <div>
                <label>
                  Coach No.:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="CoachNumber"
                  value={formData.CoachNumber}
                  onChange={handleChange}
                  placeholder="Enter Coach No."
                />
                {errors.CoachNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.CoachNumber}
                  </p>
                )}
              </div>

            </div>
            <div className="row-3">
              <div>
                <label>
                  Diameter IN A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiameterINA"
                  value={formData.DiameterINA}
                  onChange={handleChange}
                  placeholder="Enter Diameter IN A"
                />
                {errors.DiameterINA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiameterINA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Diameter IN B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiameterINB"
                  value={formData.DiameterINB}
                  onChange={handleChange}
                  placeholder="Enter Diameter IN B"
                />
                {errors.DiameterINB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiameterINB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Size IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDSizeIN"
                  value={formData.BDSizeIN}
                  onChange={handleChange}
                  placeholder="Enter BD Size IN"
                />
                {errors.BDSizeIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDSizeIN}
                  </p>
                )}
              </div>
            </div>
            <div className="row-3">
              <div>
                <label>
                  BD Thickness A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDThicknessA"
                  value={formData.BDThicknessA}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness A"
                />
                {errors.BDThicknessA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDThicknessA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  BD Thickness B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="BDThicknessB"
                  value={formData.BDThicknessB}
                  onChange={handleChange}
                  placeholder="Enter BD Thickness B"
                />
                {errors.BDThicknessB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.BDThicknessB}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Flage IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="FlageIN"
                  value={formData.FlageIN}
                  onChange={handleChange}
                  placeholder="Enter Flage IN"
                />
                {errors.FlageIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.FlageIN}
                  </p>
                )}
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

export default BDAndCoachDetails;
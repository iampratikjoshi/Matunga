import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function WheelConditionDetails({ formDataPressOffEMU, setFormDataPressOffEMU, onInputChange,
  onNextStep,
  onResetStep, }) {
  const [BrakeDiscConditionReason, setBrakeDiscConditionReason] = useState(formDataPressOffEMU.BrakeDiscConditionReason);
  const [BrakeDiscConditionCause, setBrakeDiscConditionCause] = useState(formDataPressOffEMU.BrakeDiscConditionCause);

  const [WheelConditionReason, setWheelDiscConditionReason] = useState(formDataPressOffEMU.WheelConditionReason);
  const [WheelDiscConditionCause, setWheelDiscConditionCause] = useState(formDataPressOffEMU.WheelDiscConditionCause);
  const [serviceablediscidnumber, setserviceablediscidnumber] = useState(formDataPressOffEMU.serviceablediscidnumber);

  const [AxleConditionReason, setAxleConditionReason] = useState(formDataPressOffEMU.AxleConditionReason);
  const [AxleConditionCause, setAxleConditionCause] = useState(formDataPressOffEMU.AxleConditionCause);
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null); // Single file state
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file);  // Set the single file to state
      }
    },
  });

  const handleAxleConditionReason = (event) => {
    const selectedRemark = event.target.value;
    setAxleConditionReason(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "CONDEMN") {
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

      setFormDataPressOffEMU((prevData) => ({
        ...prevData,
        AxleConditionReason: selectedRemark,
        AxleConditionCause: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setAxleConditionCause("");
    } else {
      setFormDataPressOffEMU((prevData) => ({
        ...prevData,
        AxleConditionReason: "CONDEMN", // Clear out the Remark field
      }));
    }
  };


  const handleBrakeDiscConditionReason = (event) => {
    const selectedRemark = event.target.value;
    setBrakeDiscConditionReason(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "CONDEMN") {
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

      setFormDataPressOffEMU((prevData) => ({
        ...prevData,
        BrakeDiscConditionReason: selectedRemark,
        BrakeDiscConditionCause: ""
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setBrakeDiscConditionCause("");
    } else {
      setFormDataPressOffEMU((prevData) => ({
        ...prevData,
        BrakeDiscConditionReason: "CONDEMN", // Clear out the Remark field
      }));
    }
  };

  const handleAxleConditionCause = (event) => {
    const { value } = event.target;
    setAxleConditionCause(value);
    setFormDataPressOffEMU((prevData) => ({
      ...prevData,
      AxleConditionCause: value,
    }));

    console.log(formDataPressOffEMU.AxleConditionCause);
  };

  const handleBrakeDiscConditionCause = (event) => {
    const { value } = event.target;
    setBrakeDiscConditionCause(value);
    setFormDataPressOffEMU((prevData) => ({
      ...prevData,
      BrakeDiscConditionCause: value,
    }));

    console.log(formDataPressOffEMU.BrakeDiscConditionCause);
  };
  const handleserviceablediscidnumber = (event) => {
    const { value } = event.target;
    setserviceablediscidnumber(value);
    setFormDataPressOffEMU((prevData) => ({
      ...prevData,
      serviceablediscidnumber: value,
    }));

    console.log(formDataPressOffEMU.serviceablediscidnumber);
  };

  const handleWheelDiscConditionReason = (event) => {
    const selectedRemark = event.target.value;
    setWheelDiscConditionReason(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "CONDEMN") {
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

      setFormDataPressOffEMU((prevData) => ({
        ...prevData,
        WheelConditionReason: selectedRemark,
        WheelDiscConditionCause: ""
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setserviceablediscidnumber("");
    } else if (selectedRemark === "CONDEMN") {
      setFormDataPressOffEMU((prevData) => ({
        ...prevData,
        WheelConditionReason: "CONDEMN", // Clear out the Remark field
        serviceablediscidnumber: ""
      }));
      setWheelDiscConditionCause("");
    }
  };

  const handleWheelDiscConditionCause = (event) => {
    const { value } = event.target;
    setWheelDiscConditionCause(value);
    setFormDataPressOffEMU((prevData) => ({
      ...prevData,
      WheelDiscConditionCause: value,
    }));

    console.log(formDataPressOffEMU.WheelDiscConditionCause);
  };

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  // Set the WheelNo in WheelDiscCondition when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffEMU((prevFormData) => ({
        ...prevFormData,
        WheelDiscCondition: WheelNo,
        wheelid: wheelid
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffEMU]);


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
    console.log(formDataPressOffEMU);
  };





  const handleBack = () => {
    navigate("/parentemuedit/UpdateEMUPressOffForm/identification_details");
  };

  const handleCancel = () => {
    setFormDataPressOffEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 4,
    }));
    onResetStep();
    navigate("/parentemuedit/UpdateEMUPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/parentemuedit/UpdateEMUPressOffForm/wheel_details");

  };

  return (
    <div className="componentPressonoff">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "black", opacity: 1 }}>PRESS-OFF OF EMU WHEEL FORM </h2>
      <h2> Wheel Condition Details For PRESS-OFF OF EMU WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">


              <div>
                <label>Axle Condition</label>
                <input
                  type="text"
                  name="AxleCondition"
                  value={formDataPressOffEMU.AxleCondition}
                  onChange={handleChange}
                  placeholder="Enter Axle Condition"
                />

              </div>
              <div>
                <label>
                  Axle Condition Reason:
                </label>
                <select
                  name="AxleConditionReason"
                  value={formDataPressOffEMU.AxleConditionReason}
                  onChange={handleAxleConditionReason}
                  required
                >
                  <option value="">Choose Axle Condition Reason</option>
                  <option value="SERVICEABLE">SERVICEABLE</option>
                  <option value="CONDEMN">CONDEMN</option>
                </select>


              </div>
              {AxleConditionReason === "CONDEMN" && (
                <div>
                  <label>Axle Cause Of Condemn:</label>
                  <select
                    name="AxleConditionCause"
                    value={AxleConditionCause}
                    onChange={handleAxleConditionCause}
                    required
                  >

                    <option value="">Choose Axle Cause Of Condemn</option>
                    <option value="JUS">JUS</option>
                    <option value="SUS">SUS</option>
                    <option value="DENT">DENT</option>
                    <option value="SUR">SUR</option>
                    <option value="CORRODED">CORRODED</option>
                    <option value="WSUS">WSUS</option>
                    <option value="WSS">WSS</option>
                    <option value="HOLE SLACK">HOLE SLACK</option>
                    <option value="CENTRE OUT">CENTRE OUT</option>
                    <option value="JOURNAL OUT">JOURNAL OUT</option>
                    <option value="AXLE BEND">AXLE BEND</option>
                  </select>

                </div>
              )}

            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>Brake Disc Condition</label>
                <input
                  type="text"
                  name="BrakeDiscCondition"
                  value={formDataPressOffEMU.BrakeDiscCondition}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc Condition"
                />

              </div>
              <div>
                <label>
                  Brake Disc Condition Reason:
                </label>
                <select
                  name="BrakeDiscConditionReason"
                  value={formDataPressOffEMU.BrakeDiscConditionReason}
                  onChange={handleBrakeDiscConditionReason}
                  required
                >
                  <option value="">Choose Brake Disc Condition Reason</option>
                  <option value="SERVICEABLE">SERVICEABLE</option>
                  <option value="CONDEMN">CONDEMN</option>
                </select>


              </div>

              {BrakeDiscConditionReason === "CONDEMN" && (
                <div>
                  <label>Brake Disc Cause Of Condemn:</label>
                  <input
                    type="text"
                    name="BrakeDiscConditionCause"
                    value={BrakeDiscConditionCause}
                    onChange={handleBrakeDiscConditionCause}
                    placeholder="Enter Brake Disc Cause Of Condemn"
                  />

                </div>
              )}

              <div className="file-container">

              </div>
            </div>
            <div className="Pressonoffrow-3">

              <div>
                <label>Wheel Disc Condition:</label>
                <input
                  type="text"
                  name="WheelDiscCondition"
                  value={formDataPressOffEMU.WheelDiscCondition}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Condition"
                />

              </div>

              <div>
                <label>
                  Wheel Condition Reason:
                </label>
                <select
                  name="WheelConditionReason"
                  value={formDataPressOffEMU.WheelConditionReason}
                  onChange={handleWheelDiscConditionReason}
                  required
                >
                  <option value="">Choose Wheel Condition Reason</option>
                  <option value="SERVICEABLE">SERVICEABLE</option>
                  <option value="CONDEMN">CONDEMN</option>
                </select>


              </div>
              {WheelConditionReason === "SERVICEABLE" && (
                <div>
                  <label>Serviceable Disc ID No.:</label>
                  <input
                    type="text"
                    name="serviceablediscidnumber"
                    value={serviceablediscidnumber}
                    onChange={handleserviceablediscidnumber}
                    placeholder="Enter Serviceable Disc ID No."
                  />

                </div>
              )}

              {WheelConditionReason === "CONDEMN" && (
                <div>
                  <label>Wheel Disc Cause Of Condemn:</label>
                  <select
                    name="WheelDiscConditionCause"
                    value={WheelDiscConditionCause}
                    onChange={handleWheelDiscConditionCause}
                    required
                  >

                    <option value="">Wheel Disc Cause Of Condemn</option>
                    <option value="LOW DIA">LOW DIA</option>
                    <option value="DiscOut">DISC OUT</option>
                    <option value="OverBoreSize">OVER BORE SIZE</option>
                    <option value="ScoringOfHubBore">SCORING OF HUB BORE</option>

                  </select>


                </div>
              )}
            </div>
            <div className="btn-containerPressonoff">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button className="back_btn" onClick={handleBack}>Back</button>
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

export default WheelConditionDetails;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function WheelConditionDetails({ formDataPressOffLHB, setFormDataPressOffLHB, onInputChange,
  onNextStep,
  onResetStep, }) {
  const [BrakeDiscConditionReason, setBrakeDiscConditionReason] = useState(formDataPressOffLHB.BrakeDiscConditionReason);
  const [BrakeDiscConditionCause, setBrakeDiscConditionCause] = useState(formDataPressOffLHB.BrakeDiscConditionCause);

  const [WheelConditionReason, setWheelDiscConditionReason] = useState(formDataPressOffLHB.WheelConditionReason);
  const [WheelDiscConditionCause, setWheelDiscConditionCause] = useState(formDataPressOffLHB.WheelDiscConditionCause);
  const [serviceablediscidnumber, setserviceablediscidnumber] = useState(formDataPressOffLHB.serviceablediscidnumber);

  const [AxleConditionReason, setAxleConditionReason] = useState(formDataPressOffLHB.AxleConditionReason);
  const [AxleConditionCause, setAxleConditionCause] = useState(formDataPressOffLHB.AxleConditionCause);
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

      setFormDataPressOffLHB((prevData) => ({
        ...prevData,
        AxleConditionReason: selectedRemark,
        AxleConditionCause: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setAxleConditionCause("");
    } else {
      setFormDataPressOffLHB((prevData) => ({
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

      setFormDataPressOffLHB((prevData) => ({
        ...prevData,
        BrakeDiscConditionReason: selectedRemark,
        BrakeDiscConditionCause: ""
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setBrakeDiscConditionCause("");
    } else {
      setFormDataPressOffLHB((prevData) => ({
        ...prevData,
        BrakeDiscConditionReason: "CONDEMN", // Clear out the Remark field
      }));
    }
  };

  const handleAxleConditionCause = (event) => {
    const { value } = event.target;
    setAxleConditionCause(value);
    setFormDataPressOffLHB((prevData) => ({
      ...prevData,
      AxleConditionCause: value,
    }));

    console.log(formDataPressOffLHB.AxleConditionCause);
  };

  const handleBrakeDiscConditionCause = (event) => {
    const { value } = event.target;
    setBrakeDiscConditionCause(value);
    setFormDataPressOffLHB((prevData) => ({
      ...prevData,
      BrakeDiscConditionCause: value,
    }));

    console.log(formDataPressOffLHB.BrakeDiscConditionCause);
  };
  const handleserviceablediscidnumber = (event) => {
    const { value } = event.target;
    setserviceablediscidnumber(value);
    setFormDataPressOffLHB((prevData) => ({
      ...prevData,
      serviceablediscidnumber: value,
    }));

    console.log(formDataPressOffLHB.serviceablediscidnumber);
  };

  const handleWheelDiscConditionReason = (event) => {
    const selectedRemark = event.target.value;
    setWheelDiscConditionReason(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "CONDEMN") {
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

      setFormDataPressOffLHB((prevData) => ({
        ...prevData,
        WheelConditionReason: selectedRemark,
        WheelDiscConditionCause: ""
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setserviceablediscidnumber("");
    } else if (selectedRemark === "CONDEMN") {
      setFormDataPressOffLHB((prevData) => ({
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
    setFormDataPressOffLHB((prevData) => ({
      ...prevData,
      WheelDiscConditionCause: value,
    }));

    console.log(formDataPressOffLHB.WheelDiscConditionCause);
  };

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  // Set the WheelNo in WheelDiscCondition when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffLHB((prevFormData) => ({
        ...prevFormData,
        WheelDiscCondition: WheelNo,
        wheelid: wheelid
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffLHB]);


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
    console.log(formDataPressOffLHB);
  };





  const handleBack = () => {
    navigate("/LHBPressOffForm/identification_details");
  };

  const handleCancel = () => {
    setFormDataPressOffLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 1,
    }));
    onResetStep();
    navigate("/LHBPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/LHBPressOffForm/wheel_details");

  };

  return (
    <div className="componentPressonoff">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "black", opacity: 1 }}>PRESS-OFF OF LHB WHEEL FORM </h2>
      <h2> Wheel Condition Details For PRESS-OFF OF LHB WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">


              <div>
                <label>Axle Condition</label>
                <input
                  type="text"
                  name="AxleCondition"
                  value={formDataPressOffLHB.AxleCondition}
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
                  value={formDataPressOffLHB.AxleConditionReason}
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
                  value={formDataPressOffLHB.BrakeDiscCondition}
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
                  value={formDataPressOffLHB.BrakeDiscConditionReason}
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
                  value={formDataPressOffLHB.WheelDiscCondition}
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
                  value={formDataPressOffLHB.WheelConditionReason}
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

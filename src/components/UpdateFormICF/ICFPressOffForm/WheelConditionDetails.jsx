import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";

function WheelConditionDetails({ formDataPressOffICF, setFormDataPressOffICF, onInputChange,
  onNextStep,
  onResetStep, }) {
  const [BrakeDiscConditionReason, setBrakeDiscConditionReason] = useState(formDataPressOffICF.BrakeDiscConditionReason);
  const [BrakeDiscConditionCause, setBrakeDiscConditionCause] = useState(formDataPressOffICF.BrakeDiscConditionCause);

  const [WheelConditionReason, setWheelDiscConditionReason] = useState(formDataPressOffICF.WheelConditionReason);
  const [WheelDiscConditionCause, setWheelDiscConditionCause] = useState(formDataPressOffICF.WheelDiscConditionCause);
  const [serviceablediscidnumber, setserviceablediscidnumber] = useState(formDataPressOffICF.serviceablediscidnumber);

  const [AxleConditionReason, setAxleConditionReason] = useState(formDataPressOffICF.AxleConditionReason);
  const [AxleConditionCause, setAxleConditionCause] = useState(formDataPressOffICF.AxleConditionCause);
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

      setFormDataPressOffICF((prevData) => ({
        ...prevData,
        AxleConditionReason: selectedRemark,
        AxleConditionCause: "",
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setAxleConditionCause("");
    } else {
      setFormDataPressOffICF((prevData) => ({
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

      setFormDataPressOffICF((prevData) => ({
        ...prevData,
        BrakeDiscConditionReason: selectedRemark,
        BrakeDiscConditionCause: ""
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setBrakeDiscConditionCause("");
    } else {
      setFormDataPressOffICF((prevData) => ({
        ...prevData,
        BrakeDiscConditionReason: "CONDEMN", // Clear out the Remark field
      }));
    }
  };

  const handleAxleConditionCause = (event) => {
    const { value } = event.target;
    setAxleConditionCause(value);
    setFormDataPressOffICF((prevData) => ({
      ...prevData,
      AxleConditionCause: value,
    }));

    console.log(formDataPressOffICF.AxleConditionCause);
  };

  const handleBrakeDiscConditionCause = (event) => {
    const { value } = event.target;
    setBrakeDiscConditionCause(value);
    setFormDataPressOffICF((prevData) => ({
      ...prevData,
      BrakeDiscConditionCause: value,
    }));

    console.log(formDataPressOffICF.BrakeDiscConditionCause);
  };
  const handleserviceablediscidnumber = (event) => {
    const { value } = event.target;
    setserviceablediscidnumber(value);
    setFormDataPressOffICF((prevData) => ({
      ...prevData,
      serviceablediscidnumber: value,
    }));

    console.log(formDataPressOffICF.serviceablediscidnumber);
  };

  const handleWheelDiscConditionReason = (event) => {
    const selectedRemark = event.target.value;
    setWheelDiscConditionReason(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "CONDEMN") {
      // console.log(selectedRemark);
      // console.log(AxleConditionReason);

      setFormDataPressOffICF((prevData) => ({
        ...prevData,
        WheelConditionReason: selectedRemark,
        WheelDiscConditionCause: ""
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
      setserviceablediscidnumber("");
    } else if (selectedRemark === "CONDEMN") {
      setFormDataPressOffICF((prevData) => ({
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
    setFormDataPressOffICF((prevData) => ({
      ...prevData,
      WheelDiscConditionCause: value,
    }));

    console.log(formDataPressOffICF.WheelDiscConditionCause);
  };

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  // Set the WheelNo in WheelDiscCondition when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffICF((prevFormData) => ({
        ...prevFormData,
        WheelDiscCondition: WheelNo,
        wheelid: wheelid
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffICF]);


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
    console.log(formDataPressOffICF);
  };





  const handleBack = () => {
    navigate("/parentediticf/UpdateICFPressOffForm/identification_details");
  };

  const handleCancel = () => {
    setFormDataPressOffICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 2,
    }));
    onResetStep();
    navigate("/parentediticf/UpdateICFPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/parentediticf/UpdateICFPressOffForm/wheel_details");

  };

  return (
    <div className="componentPressonoff">
      <h2 style={{ textAlign: "center", backgroundColor: "black", color: "black", opacity: 1 }}>PRESS-OFF OF ICF WHEEL FORM </h2>
      <h2> Wheel Condition Details For PRESS-OFF OF ICF WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">


              <div>
                <label>Axle Condition</label>
                <input
                  type="text"
                  name="AxleCondition"
                  value={formDataPressOffICF.AxleCondition}
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
                  value={formDataPressOffICF.AxleConditionReason}
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

              <div>
                 <label>Brake Disc Condition</label>
                <input
                  type="text"
                  name="BrakeDiscCondition"
                  value={formDataPressOffICF.BrakeDiscCondition}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc Condition"
                />
              </div>

            </div>
            <div className="Pressonoffrow-2">
              {/* <div>
                <label>Brake Disc Condition</label>
                <input
                  type="text"
                  name="BrakeDiscCondition"
                  value={formDataPressOffICF.BrakeDiscCondition}
                  onChange={handleChange}
                  placeholder="Enter Brake Disc Condition"
                />

              </div> */}
              <div>
                <label>
                  Brake Disc Condition Reason:
                </label>
                <select
                  name="BrakeDiscConditionReason"
                  value={formDataPressOffICF.BrakeDiscConditionReason}
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

               <div>
                <label>Wheel Disc Condition:</label>
                <input
                  type="text"
                  name="WheelDiscCondition"
                  value={formDataPressOffICF.WheelDiscCondition}
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
                  value={formDataPressOffICF.WheelConditionReason}
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
            <div className="Pressonoffrow-3">

              <div>

              </div>
              <div>
              
              </div>
              <div>
              
              </div>
              {/* <div>
                <label>Wheel Disc Condition:</label>
                <input
                  type="text"
                  name="WheelDiscCondition"
                  value={formDataPressOffICF.WheelDiscCondition}
                  onChange={handleChange}
                  placeholder="Enter Wheel Disc Condition"
                />
              </div> */}

              {/* <div>
                <label>
                  Wheel Condition Reason:
                </label>
                <select
                  name="WheelConditionReason"
                  value={formDataPressOffICF.WheelConditionReason}
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
              )} */}
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

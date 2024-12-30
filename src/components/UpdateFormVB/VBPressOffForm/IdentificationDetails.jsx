import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import api from "../../Axios/AxiosConnection";

function IdentificationDetails({
  formDataPressOffVB,
  setFormDataPressOffVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
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
        setFile(file); // Set the single file to state
      }
    },
  });

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (wheelid) {
          const response = await api.get(`/vbpressoff/getdata/` + wheelid); // Assuming your API needs the wheelid in the endpoint
          console.log("vbpressoff", response.data);

          // Assuming response.data contains the data you want to set in the form
          setFormDataPressOffVB((prevFormData) => ({
            ...prevFormData,
            Date: response.data[0].Date,
            OperatorName: response.data[0].OperatorName,
            OperatorTNo: response.data[0].OperatorTNo,
            InspectorName: response.data[0].InspectorName,
            InspectorTNo: response.data[0].InspectorTNo,
            ShopSNo: response.data[0].ShopSNo,
            MachineNumber: response.data[0].MachineNumber,
            ShiftNumber: response.data[0].ShiftNumber,
            TypeOfWheel: response.data[0].TypeOfWheel,
            WheelPressedOff: response.data[0].WheelPressedOff,
            DiscSrNo: response.data[0].DiscSrNo,
            AxleNo: response.data[0].AxleNo,
            AxleCondition: response.data[0].AxleCondition,
            AxleConditionReason: response.data[0].AxleConditionReason,
            AxleConditionCause: response.data[0].AxleConditionCause,
            BrakeDiscCondition: response.data[0].BrakeDiscCondition,
            BrakeDiscConditionReason: response.data[0].BrakeDiscConditionReason,
            BrakeDiscConditionCause: response.data[0].BrakeDiscConditionCause,
            WheelDiscCondition: response.data[0].WheelDiscCondition,
            WheelConditionReason: response.data[0].WheelConditionReason,
            WheelDiscConditionCause: response.data[0].WheelDiscConditionCause,
            serviceablediscidnumber: response.data[0].serviceablediscidnumber,
            Reason: response.data[0].Reason,
            PressedOffRemark: response.data[0].PressedOffRemark

          }));
          console.log("DiscParticularA:", response.data[0].DiscParticularA)
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [wheelid, setFormDataPressOffVB]);

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffVB((prevFormData) => ({
        ...prevFormData,
        ShopSNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffVB]);

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
    console.log(formDataPressOffVB);
  };



  const handleCancel = () => {
    setFormDataPressOffVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 5,
      WheeltypeID: 3,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBPressOffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/parenteditvb/UpdateVBPressOffForm/wheelcondition_details");

  };

  return (
    <div className="componentPressonoff">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "black",
          opacity: 1,
        }}
      >
        PRESS-OFF OF VB WHEEL FORM{" "}
      </h2>
      <h2> Wheel Details For PRESS-OFF OF VB WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  Shop Sr.No. (Wheel No.):

                </label>
                <input
                  type="text"
                  name="ShopSNo"
                  value={formDataPressOffVB.ShopSNo}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr.No."
                />

              </div>
              <div>
                <label>
                  Axle No.:
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOffVB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No."
                />

              </div>
              <div>
                <label>
                  Disc Sr.No.:
                </label>
                <input
                  type="text"
                  name="DiscSrNo"
                  value={formDataPressOffVB.DiscSrNo}
                  onChange={handleChange}
                  placeholder="Enter Disc Sr.No."
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Date:
                </label>
                <input
                  type="date"
                  name="Date"
                  value={formDataPressOffVB.Date}
                  onChange={handleChange}
                />

              </div>
              <div>
                <label>
                  Shift No.:
                </label>
                <select
                  id="dropdown"
                  name="ShiftNumber"
                  value={formDataPressOffVB.ShiftNumber}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="Shift 1">Shift 1</option>
                  <option value="Shift 2">Shift 2</option>
                  <option value="Shift 3">Shift 3</option>
                </select>

              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerPressonoff">
              <button onClick={saveandcontinue}>Save & Continue</button>
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

export default IdentificationDetails;

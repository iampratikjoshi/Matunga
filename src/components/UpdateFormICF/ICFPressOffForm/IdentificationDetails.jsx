import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import api from '../../Axios/AxiosConnection';
import "../../../resources/Assembly/PressOn&Off.css";


function IdentificationDetails({
  formDataPressOffICF,
  setFormDataPressOffICF,
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
    const fetchPressOffData = async () => {
      try {
        if (wheelid) {
          const response = await api.get(`/icfpressoff/getdata/${wheelid}`);
          console.log("icfpressof", response.data);
          
          // Update the form data with the fetched values
          setFormDataPressOffICF((prevFormData) => ({
            ...prevFormData,
            wheelid: response.data[0].wheelid,
            ShopSNo: response.data[0].ShopSNo,
            AxleNo: response.data[0].AxleNo,
            DiscSrNo: response.data[0].DiscSrNo,
            Date: response.data[0].Date,
            ShiftNumber: response.data[0].ShiftNumber,

           // Wheel Condition Details
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

           // Wheel Details (New fields)
          TypeOfWheel: response.data[0].TypeOfWheel,
          WheelPressedOff: response.data[0].WheelPressedOff,
          Reason: response.data[0].Reason,
          PressedOffRemark: response.data[0].PressedOffRemark,


           // Adding new Inspector Details fields
           OperatorTNo: response.data[0].OperatorTNo,
           OperatorName: response.data[0].OperatorName,
           InspectorTNo: response.data[0].InspectorTNo,
           InspectorName: response.data[0].InspectorName,
           MachineNumber: response.data[0].MachineNumber,
           Remark: response.data[0].Remark,

 
           // Preserve default values
           createdBy: prevFormData.createdBy || "ADMIN",
           SectionID: prevFormData.SectionID || 1,
           DepartmentID: prevFormData.DepartmentID || 5,
           WheeltypeID: prevFormData.WheeltypeID || 2
         }));
 
         // Update the local state variables
        //  setBrakeDiscConditionReason(response.data[0].BrakeDiscConditionReason);
        //  setBrakeDiscConditionCause(response.data[0].BrakeDiscConditionCause);
        //  setWheelDiscConditionReason(response.data[0].WheelConditionReason);
        //  setWheelDiscConditionCause(response.data[0].WheelDiscConditionCause);
        //  setserviceablediscidnumber(response.data[0].serviceablediscidnumber);
        //  setAxleConditionReason(response.data[0].AxleConditionReason);
        //  setAxleConditionCause(response.data[0].AxleConditionCause);
       }
     } catch (error) {
       console.error("Error fetching press-off ICF data: ", error);
     }
   };
 
   fetchPressOffData();
 }, [wheelid, setFormDataPressOffICF]);



  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffICF((prevFormData) => ({
        ...prevFormData,
        ShopSNo: WheelNo,
        wheelid: wheelid,
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
      navigate("/parentediticf/UpdateICFPressOffForm/wheelcondition_details");
    
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
        PRESS-OFF OF ICF WHEEL FORM{" "}
      </h2>
      <h2> Wheel Details For PRESS-OFF OF ICF WHEEL FORM</h2>

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
                  value={formDataPressOffICF.ShopSNo}
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
                  value={formDataPressOffICF.AxleNo}
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
                  value={formDataPressOffICF.DiscSrNo}
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
                  value={formDataPressOffICF.Date}
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
                  value={formDataPressOffICF.ShiftNumber}
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

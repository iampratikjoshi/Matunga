import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api from "../../Axios/AxiosConnection";

function WheelDetails({
  formDataPressOnLHB,
  setFormDataPressOnLHB,
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
          const response = await api.get(`/presson/getdata/` + wheelid); // Assuming your API needs the wheelid in the endpoint
          console.log("presson", response.data);

          // Assuming response.data contains the data you want to set in the form
          setFormDataPressOnLHB((prevFormData) => ({
            ...prevFormData,
            WheelNo: response.data[0].WheelNo,
            AxleNo: response.data[0].AxleNo,
            ATLNo: response.data[0].ATLNo,
            WheelSeatSize: response.data[0].WheelSeatSize,
            BDSeatSize: response.data[0].BDSeatSize,
            RAValue: response.data[0].RAValue,
            OperatorName: response.data[0].OperatorName,
            WheelDiscAVTLNO: response.data[0].WheelDiscAVTLNO,
            WheelDiscABoreSizeByOperator: response.data[0].WheelDiscABoreSizeByOperator,
            WheelDiscARAValue: response.data[0].WheelDiscARAValue,
            WheelDiscAOperatorName: response.data[0].WheelDiscAOperatorName,
            WheelDiscAABoreSize: response.data[0].WheelDiscAABoreSize,
            WheelDiscABWheelSeatSize: response.data[0].WheelDiscABWheelSeatSize,
            WheelDiscAAllow: response.data[0].WheelDiscAAllow,
            WheelDiscAPressOnPressure: response.data[0].WheelDiscAPressOnPressure,
            WheelDiscARDNo: response.data[0].WheelDiscARDNo,
            WheelDiscAWheelDiscParticulars: response.data[0].WheelDiscAWheelDiscParticulars,
            WheelDiscATopXAxis: response.data[0].WheelDiscATopXAxis,
            WheelDiscATopYAxis: response.data[0].WheelDiscATopYAxis,
            WheelDiscAMiddleXAxis: response.data[0].WheelDiscAMiddleXAxis,
            WheelDiscAMiddleYAxis: response.data[0].WheelDiscAMiddleYAxis,
            WheelDiscALowerXAxis: response.data[0].WheelDiscALowerXAxis,
            WheelDiscALowerYAxis: response.data[0].WheelDiscALowerYAxis,
            WheelDiscAAvgXAxis: response.data[0].WheelDiscAAvgXAxis,
            WheelDiscAAvgYAxis: response.data[0].WheelDiscAAvgYAxis,
            WheelDiscBVTLNo: response.data[0].WheelDiscBVTLNo,
            WheelDiscBBoreSizeByOperator: response.data[0].WheelDiscBBoreSizeByOperator,
            WheelDiscBRAValue: response.data[0].WheelDiscBRAValue,
            WheelDiscBOperatorName: response.data[0].WheelDiscBOperatorName,
            WheelDiscBABoreSize: response.data[0].WheelDiscBABoreSize,
            WheelDiscBBWheelSeatSize: response.data[0].WheelDiscBBWheelSeatSize,
            WheelDiscBAllow: response.data[0].WheelDiscBAllow,
            WheelDiscBPressOnPressure: response.data[0].WheelDiscBPressOnPressure,
            WheelDiscBRDNo: response.data[0].WheelDiscBRDNo,
            WheelDiscBWheelDiscParticulars: response.data[0].WheelDiscBWheelDiscParticulars,
            WheelDiscBTopXAxis: response.data[0].WheelDiscBTopXAxis,
            WheelDiscBTopYAxis: response.data[0].WheelDiscBTopYAxis,
            WheelDiscBMiddleXAxis: response.data[0].WheelDiscBMiddleXAxis,
            WheelDiscBMiddleYAxis: response.data[0].WheelDiscBMiddleYAxis,
            WheelDiscBLowerXAxis: response.data[0].WheelDiscBLowerXAxis,
            WheelDiscBLowerYAxis: response.data[0].WheelDiscBLowerYAxis,
            WheelDiscBAvgXAxis: response.data[0].WheelDiscBAvgXAxis,
            WheelDiscBAvgYAxis: response.data[0].WheelDiscBAvgYAxis,
            BrakeDiscAABoreSize: response.data[0].BrakeDiscAABoreSize,
            BrakeDiscABBDSeatSize: response.data[0].BrakeDiscABBDSeatSize,
            BrakeDiscAAllow: response.data[0].BrakeDiscAAllow,
            BrakeDiscAPressOnPressure: response.data[0].BrakeDiscAPressOnPressure,
            BrakeDiscABDThickness: response.data[0].BrakeDiscABDThickness,
            BrakeDiscABrakeDiscParticulars: response.data[0].BrakeDiscABrakeDiscParticulars,
            BrakeDiscATopXAxis: response.data[0].BrakeDiscATopXAxis,
            BrakeDiscATopYAxis: response.data[0].BrakeDiscATopYAxis,
            BrakeDiscAMiddleXAxis: response.data[0].BrakeDiscAMiddleXAxis,
            BrakeDiscAMiddleYAxis: response.data[0].BrakeDiscAMiddleYAxis,
            BrakeDiscALowerXAxis: response.data[0].BrakeDiscALowerXAxis,
            BrakeDiscALowerYAxis: response.data[0].BrakeDiscALowerYAxis,
            BrakeDiscAAvgXAxis: response.data[0].BrakeDiscAAvgXAxis,
            BrakeDiscAAvgYAxis: response.data[0].BrakeDiscAAvgYAxis,
            BrakeDiscBABoreSize: response.data[0].BrakeDiscBABoreSize,
            BrakeDiscBBBDSeatSize: response.data[0].BrakeDiscBBBDSeatSize,
            BrakeDiscBAllow: response.data[0].BrakeDiscBAllow,
            BrakeDiscBPressOnPressure: response.data[0].BrakeDiscBPressOnPressure,
            BrakeDiscBBDThickness: response.data[0].BrakeDiscBBDThickness,
            BrakeDiscBBrakeDiscParticulars: response.data[0].BrakeDiscBBrakeDiscParticulars,
            BrakeDiscBTopXAxis: response.data[0].BrakeDiscBTopXAxis,
            BrakeDiscBTopYAxis: response.data[0].BrakeDiscBTopYAxis,
            BrakeDiscBMiddleXAxis: response.data[0].BrakeDiscBMiddleXAxis,
            BrakeDiscBMiddleYAxis: response.data[0].BrakeDiscBMiddleYAxis,
            BrakeDiscBLowerXAxis: response.data[0].BrakeDiscBLowerXAxis,
            BrakeDiscBLowerYAxis: response.data[0].BrakeDiscBLowerYAxis,
            BrakeDiscBAvgXAxis: response.data[0].BrakeDiscBAvgXAxis,
            BrakeDiscBAvgYAxis: response.data[0].BrakeDiscBAvgYAxis,
            MCNo: response.data[0].MCNo,
            OperatorNameFinal: response.data[0].OperatorNameFinal,
            InspectorName: response.data[0].InspectorName,
            OperatorNo: response.data[0].OperatorNo,
            InspectorNo: response.data[0].InspectorNo,
            WheelActivities: response.data[0].WheelActivities,
            AxleWheelSeatSize: response.data[0].AxleWheelSeatSize,
            WheelDiscBoreSize: response.data[0].WheelDiscBoreSize,
            wheelDiscStampingParticulars: response.data[0].wheelDiscStampingParticulars,
            PressOnNumber: response.data[0].PressOnNumber,
            WheelActivityBDThickness: response.data[0].WheelActivityBDThickness,
            WheelActivityBDMake: response.data[0].WheelActivityBDMake


          }));
          console.log("DiscParticularA:", response.data[0].DiscParticularA)
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [wheelid, setFormDataPressOnLHB]);

  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOnLHB((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
      console.log("WheelNo",WheelNo);
      console.log("wheelid",wheelid);
      
    }
  }, [WheelNo, wheelid, setFormDataPressOnLHB]);

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
    console.log(formDataPressOnLHB);
  };



  const handleCancel = () => {
    setFormDataPressOnLHB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parentedit/UpdateLHBPressOnForm/wheel_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/parentedit/UpdateLHBPressOnForm/wheelactivities_details");

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
        PRESS-ON OF LHB WHEEL FORM{" "}
      </h2>
      <h2>Wheel Details for PRESS-ON OF LHB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  Wheel No.:
                </label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataPressOnLHB.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No."
                />

              </div>
              <div>
                <label>
                  Axle No:
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOnLHB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No"
                />

              </div>
              <div>
                <label>
                  ATL No.:
                </label>
                <input
                  type="text"
                  name="ATLNo"
                  value={formDataPressOnLHB.ATLNo}
                  onChange={handleChange}
                  placeholder="Enter ATL No."
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Wheel Seat Size:
                </label>
                <input
                  type="text"
                  name="WheelSeatSize"
                  value={formDataPressOnLHB.WheelSeatSize}
                  onChange={handleChange}
                  placeholder="Enter Wheel Seat Size"
                />

              </div>
              <div>
                <label>
                  BD Seat Size:
                </label>
                <input
                  type="text"
                  name="BDSeatSize"
                  value={formDataPressOnLHB.BDSeatSize}
                  onChange={handleChange}
                  placeholder="Enter BD Seat Size"
                />

              </div>

              <div>
                <label>
                  RA Value(1.6 Max):
                </label>
                <input
                  type="text"
                  name="RAValue"
                  value={formDataPressOnLHB.RAValue}
                  onChange={handleChange}
                  placeholder="Enter RA Value"
                />

              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
                <label>
                  Operator Name:
                </label>
                <input
                  type="text"
                  name="OperatorName"
                  value={formDataPressOnLHB.OperatorName}
                  onChange={handleChange}
                  placeholder="Enter Operator Name"
                />

              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
            <div></div>
            <div></div>
            <div></div>
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

export default WheelDetails;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import "../../../resources/LHB/NewPreInspectionForm/newpreinspectionform.css";
import api from "../../Axios/AxiosConnection";

function Details({
  formDataVB,
  setFormDataVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
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
  const { WheelNo,WheelId } = location.state || {};


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (WheelId) {
          const response = await api.get(`/vbscheduledpreinspection/getdata/`+WheelId); // Assuming your API needs the WheelId in the endpoint
          console.log("vbscheduledpreinspection",response.data);
          
          // Assuming response.data contains the data you want to set in the form
          setFormDataVB((prevFormData) => ({
            ...prevFormData,
            ShopSrNumber: response.data[0].ShopSrNumber,
            AxleNumber: response.data[0].AxleNumber,
            ReceiveDate: response.data[0].ReceiveDate,
            AxleCondition: response.data[0].AxleCondition,
            CoachNumber: response.data[0].CoachNumber,
            CTRBDefectNameA: response.data[0].CTRBDefectNameA,
            CTRBDefectNameB: response.data[0].CTRBDefectNameB,
            CTRBStatusA: response.data[0].CTRBStatusA,
            CTRBStatusB: response.data[0].CTRBStatusB,
            BDThicknessA: response.data[0].BDThicknessA,
            BDThicknessB: response.data[0].BDThicknessB,
            DiameterINA: response.data[0].DiameterINA,
            DiameterINB: response.data[0].DiameterINB,
            BDDefect: response.data[0].BDDefect,
            BDMakeIN: response.data[0].BDMakeIN,
            RodGaugeIN: response.data[0].RodGaugeIN,
            SoundTestINA: response.data[0].SoundTestINA,
            SoundTestINB: response.data[0].SoundTestINB,
            TypeOfRepair: response.data[0].TypeOfRepair,
            MatungaRemark: response.data[0].MatungaRemark,
            DiscParticularA: response.data[0].DiscParticularA,
            DiscParticularB: response.data[0].DiscParticularB,
            CTRBNumberA: response.data[0].CTRBNumberA,
            CTRBNumberB: response.data[0].CTRBNumberB,
            CTRBMakeA: response.data[0].CTRBMakeA,
            CTRBMakeB: response.data[0].CTRBMakeB,
            RefurbishmentDetailsA: response.data[0].RefurbishmentDetailsA,
            RefurbishmentDetailsB: response.data[0].RefurbishmentDetailsB,
            CTRBDefectA: response.data[0].CTRBDefectA,
            CTRBDefectB: response.data[0].CTRBDefectB,
            CTRBRemarkA: response.data[0].CTRBRemarkA,
            CTRBRemarkB: response.data[0].CTRBRemarkB,
            FitmentDate: response.data[0].FitmentDate,
            CTRBRemainingLifeA: response.data[0].CTRBRemainingLifeA,
            CTRBRemainingLifeB: response.data[0].CTRBRemainingLifeB,
            InspectorName: response.data[0].InspectorName,
            InspectorTicketNo: response.data[0].InspectorTicketNo,
           
          }));
          console.log("DiscParticularA:",response.data[0].DiscParticularA)
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, [WheelId, setFormDataVB]);

  // Set the WheelNo in ShopSNo when the componentPreInspection loads
  useEffect(() => {
      if (WheelNo) {
        setFormDataVB((prevFormData) => ({
          ...prevFormData,
          ShopSrNumber: WheelNo,
          WheelId:WheelId,
          
        }));
        console.log("WheelNo",WheelNo);
        
        console.log("WheelID",WheelId);
  
      }
    }, [WheelNo,WheelId, setFormDataVB]);

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
    console.log(formDataVB);
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      isNaN(formDataVB.RodGaugeIN) ||
      formDataVB.RodGaugeIN < 1599 ||
      formDataVB.RodGaugeIN > 1602
    ) {
      newErrors.RodGaugeIN =
        "RodGaugeIN must be a number between 1599mm and 1602mm.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormDataVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 3,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBSchedulePreInspection/details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/parenteditvb/UpdateVBSchedulePreInspection/bdandcoach_details");
    }
  };

  return (
    <div className="componentPreInspection">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        VB PRE INSPECTION FORM
      </h2>
      <h2> Details for VB PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentLHB">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
                <label>Shop Sr. No. (Wheel No.):</label>
                <input
                  type="text"
                  name="ShopSrNumber"
                  value={formDataVB.ShopSrNumber}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr. No."
                />
              </div>
              <div>
                <label>Axle No:</label>
                <input
                  type="text"
                  name="AxleNumber"
                  value={formDataVB.AxleNumber}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                />
              </div>
              <div>
                <label>Receive Date:</label>
                <input
                  type="date"
                  name="ReceiveDate"
                  value={formDataVB.ReceiveDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="PreInspectionrow-2">
              <div>
                <label>Axle Condition:</label>
                <input
                  type="text"
                  name="AxleCondition"
                  value={formDataVB.AxleCondition}
                  onChange={handleChange}
                  placeholder="Enter Axle Condition"
                />
              </div>
              <div>
                <label>Disc Particular A:</label>
                <input
                  type="text"
                  name="DiscParticularA"
                  value={formDataVB.DiscParticularA}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular A"
                />
              </div>
              <div>
                <label>Disc Particular B:</label>
                <input
                  type="text"
                  name="DiscParticularB"
                  value={formDataVB.DiscParticularB}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular B"
                />
              </div>
            </div>
            <div className="PreInspectionrow-3">
              <div>
                <label>Rod Gauge IN:</label>
                <input
                  type="text"
                  name="RodGaugeIN"
                  value={formDataVB.RodGaugeIN}
                  onChange={handleChange}
                  placeholder="Enter Rod Gauge IN"
                />
                {errors.RodGaugeIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.RodGaugeIN}
                  </p>
                )}
              </div>
              <div>
                <label>Diameter IN A:</label>
                <input
                  type="text"
                  name="DiameterINA"
                  value={formDataVB.DiameterINA}
                  onChange={handleChange}
                  placeholder="Enter Diameter IN A"
                />
              </div>
              <div>
                <label>Diameter IN B:</label>
                <input
                  type="text"
                  name="DiameterINB"
                  value={formDataVB.DiameterINB}
                  onChange={handleChange}
                  placeholder="Enter Diameter IN B"
                />
              </div>
            </div>
            <div className="PreInspectionrow-3">
              <div>
                <label>Sound Test IN A:</label>
                <input
                  type="text"
                  name="SoundTestINA"
                  value={formDataVB.SoundTestINA}
                  onChange={handleChange}
                  placeholder="Enter Sound Test IN A"
                />
              </div>
              <div>
                <label>Sound Test IN B:</label>
                <input
                  type="text"
                  name="SoundTestINB"
                  value={formDataVB.SoundTestINB}
                  onChange={handleChange}
                  placeholder="Enter Sound Test IN B"
                />
              </div>
            </div>
            <div className="btn-containerPreInspection">
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

export default Details;

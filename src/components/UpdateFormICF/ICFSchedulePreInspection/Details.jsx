import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api from "../../Axios/AxiosConnection";

function Details({
  formDataScheduleICF,
  setFormDataScheduleICF,
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
  const { WheelNo, WheelId } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (WheelId) {
          const response = await api.get(`/icfscheduledpreinspection/getdata/`+ WheelId); // Assuming your API needs the WheelId in the endpoint
          console.log("scheduledpreinspection",response.data);
          
          // Assuming response.data contains the data you want to set in the form
          setFormDataScheduleICF((prevFormData) => ({
            ...prevFormData,
            WheelId: response.data[0].WheelId,
            ShopSrNumber: response.data[0].ShopSrNumber,
            AxleNumber: response.data[0].AxleNumber,
            ReceiveDate: response.data[0].ReceiveDate,
            AxleCondition: response.data[0].AxleCondition,
            CoachNumber: response.data[0].CoachNumber,
            // DiameterINA: response.data[0].DiameterINA,
            // DiameterINB: response.data[0].DiameterINB,
            BrgCodeA: response.data[0].BrgCodeA,
            BrgCodeB: response.data[0].BrgCodeB,
            BrgYearA: response.data[0].BrgYearA,
            BrgYearB: response.data[0].BrgYearB,
            BrgMakeA: response.data[0].BrgMakeA,
            BrgMakeB: response.data[0].BrgMakeB,
            FitmentDate: response.data[0].FitmentDate,
            BrgFitmentA: response.data[0].BrgFitmentA,
            BrgFitmentB: response.data[0].BrgFitmentB,
            BrgServiceA: response.data[0].BrgServiceA,
            BrgServiceB: response.data[0].BrgServiceB,
            MTNBrgSideA: response.data[0].MTNBrgSideA,
            MTNBrgSideB: response.data[0].MTNBrgSideB,
            WheelType: response.data[0].WheelType,
            Shift: response.data[0].Shift,
            GNameAside: response.data[0].GNameAside,
            GNameBside: response.data[0].GNameBside,
            RodGaugeIN: response.data[0].RodGaugeIN,
            // SoundTestINA: response.data[0].SoundTestINA,
            // SoundTestINB: response.data[0].SoundTestINB,
            TypeOfRepair: response.data[0].TypeOfRepair,
            MatungaRemark: response.data[0].MatungaRemark,
            InspectorName: response.data[0].InspectorName,
            InspectorTicketNo: response.data[0].InspectorTicketNo,
            DiscParticularA: response.data[0].DiscParticularA,
            DiscParticularB: response.data[0].DiscParticularB,
            // RCDMA: response.data[0].RCDMA,
            // RCDMB: response.data[0].RCDMB,
            // RCMA: response.data[0].RCMA,
            // RCMB: response.data[0].RCMB

           
          }));
          console.log("DiscParticularA:",response.data[0].DiscParticularA)
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, [WheelId, setFormDataScheduleICF]);
  

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo) {
      setFormDataScheduleICF((prevFormData) => ({
        ...prevFormData,
        ShopSrNumber: WheelNo,
      }));
    }
  }, [WheelNo, setFormDataScheduleICF]);

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
    console.log(formDataScheduleICF);
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      isNaN(formDataScheduleICF.RodGaugeIN) ||
      formDataScheduleICF.RodGaugeIN < 1599 ||
      formDataScheduleICF.RodGaugeIN > 1602
    ) {
      newErrors.RodGaugeIN =
        "RodGaugeIN must be a number between 1599mm and 1602mm.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormDataScheduleICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 2,
    }));
    onResetStep();
    navigate("/parentediticf/UpdateICFSchedulePreInspection/w1_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/parentediticf/UpdateICFSchedulePreInspection/w2_details");
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
        ICF PRE INSPECTION FORM
      </h2>
      <h2> Details for ICF PRE Inspection Form</h2>

      <div className="page-borderPreInspection">
        <div className="page-contentPreInspection">
          <div className="wheel-page-main-PreInspection-content">
            <div className="PreInspectionrow-1">
              <div>
                <label>Shop Sr. No. (Wheel No.):</label>
                <input
                  type="text"
                  name="ShopSrNumber"
                  value={formDataScheduleICF.ShopSrNumber}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr. No."
                />
              </div>
              <div>
                <label>Axle No:</label>
                <input
                  type="text"
                  name="AxleNumber"
                  value={formDataScheduleICF.AxleNumber}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                />
              </div>
              <div>
                <label>Receive Date:</label>
                <input
                  type="date"
                  name="ReceiveDate"
                  value={formDataScheduleICF.ReceiveDate}
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
                  value={formDataScheduleICF.AxleCondition}
                  onChange={handleChange}
                  placeholder="Enter Axle Condition"
                />
              </div>
              <div>
                <label>Disc Particular A:</label>
                <input
                  type="text"
                  name="DiscParticularA"
                  value={formDataScheduleICF.DiscParticularA}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular A"
                />
              </div>
              <div>
                <label>Disc Particular B:</label>
                <input
                  type="text"
                  name="DiscParticularB"
                  value={formDataScheduleICF.DiscParticularB}
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
                  value={formDataScheduleICF.RodGaugeIN}
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
                  value={formDataScheduleICF.DiameterINA}
                  onChange={handleChange}
                  placeholder="Enter Diameter IN A"
                />
              </div>
              <div>
                <label>Diameter IN B:</label>
                <input
                  type="text"
                  name="DiameterINB"
                  value={formDataScheduleICF.DiameterINB}
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
                  value={formDataScheduleICF.SoundTestINA}
                  onChange={handleChange}
                  placeholder="Enter Sound Test IN A"
                />
              </div>
              <div>
                <label>Sound Test IN B:</label>
                <input
                  type="text"
                  name="SoundTestINB"
                  value={formDataScheduleICF.SoundTestINB}
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

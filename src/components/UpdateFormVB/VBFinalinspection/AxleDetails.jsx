import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import api from "../../Axios/AxiosConnection";
import "../../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function AxleDetails({
  formDataFinalVB,
  setFormDataFinalVB,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null); // Single file state
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Manually validate if the file is an image
      if (file && file.type.startsWith("image/")) {
        setFile(file); // Set the single file to state
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (wheelid) {
          const response = await api.get(`/vbfinalinspection/getdata/` + wheelid); // Assuming your API needs the wheelid in the endpoint
          console.log("vbfinalinspection", response.data);

          // Assuming response.data contains the data you want to set in the form
          setFormDataFinalVB((prevFormData) => ({
            ...prevFormData,
            AxleNo: response.data[0].AxleNo,
            WheelNo: response.data[0].WheelNo,
            DiscParticularA: response.data[0].DiscParticularA,
            DiscParticularB: response.data[0].DiscParticularB,
            RefurbishmentDetailsA: response.data[0].RefurbishmentDetailsA,
            RefurbishmentDetailsB: response.data[0].RefurbishmentDetailsB,
            CTRBDefectA: response.data[0].CTRBDefectA,
            CTRBDefectB: response.data[0].CTRBDefectB,
            CTRBDefectNameA: response.data[0].CTRBDefectNameA,
            CTRBDefectNameB: response.data[0].CTRBDefectNameB,
            Shift: response.data[0].Shift,
            WheelDiaA: response.data[0].WheelDiaA,
            WheelDiaB: response.data[0].WheelDiaB,
            WheelRG: response.data[0].WheelRG,
            WheelFLG: response.data[0].WheelFLG,
            SizeA: response.data[0].SizeA,
            SizeB: response.data[0].SizeB,
            OvalA: response.data[0].OvalA,
            OvalB: response.data[0].OvalB,
            TapA: response.data[0].TapA,
            TapB: response.data[0].TapB,
            ShoulderSizeA: response.data[0].ShoulderSizeA,
            ShoulderSizeB: response.data[0].ShoulderSizeB,
            JrWaivinessA: response.data[0].JrWaivinessA,
            JrWaivinessB: response.data[0].JrWaivinessB,
            BDMake: response.data[0].BDMake,
            BDSizeA: response.data[0].BDSizeA,
            BDSizeB: response.data[0].BDSizeB,
            EndHoleA: response.data[0].EndHoleA,
            EndHoleB: response.data[0].EndHoleB,
            CTRBRefurbishmentDetailsA: response.data[0].CTRBRefurbishmentDetailsA,
            CTRBRefurbishmentDetailsB: response.data[0].CTRBRefurbishmentDetailsB,
            CTRBRemainingLifeA: response.data[0].CTRBRemainingLifeA,
            CTRBRemainingLifeB: response.data[0].CTRBRemainingLifeB,
            CTRBNumberA: response.data[0].CTRBNumberA,
            CTRBNumberB: response.data[0].CTRBNumberB,
            CTRBMakeA: response.data[0].CTRBMakeA,
            CTRBMakeB: response.data[0].CTRBMakeB,
            CTRBStatusA: response.data[0].CTRBStatusA,
            CTRBStatusB: response.data[0].CTRBStatusB,
            CTRBRemarkA: response.data[0].CTRBRemarkA,
            CTRBRemarkB: response.data[0].CTRBRemarkB,
            InspectorTicketNo: response.data[0].InspectorTicketNo,
            InspectorName: response.data[0].InspectorName,
            WheelTreadUST: response.data[0].WheelTreadUST,
            MEPA: response.data[0].MEPA,
            MEPB: response.data[0].MEPB,
            USTName: response.data[0].USTName,
            FittingDt: response.data[0].FittingDt,
            ECATest: response.data[0].ECATest


          }));
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [wheelid, setFormDataFinalVB]);

  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataFinalVB((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [wheelid, WheelNo]);

  // Set the WheelNo in ShopSNo when the componentFinal loads
  
  const removeFile = () => {
    setFile(null); // Remove the file from state
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
    // console.log(formData);
  };

  const handleCancel = () => {
    setFormDataFinalVB((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 4,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/parenteditvb/UpdateVBfinalinspection/axle_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    onNextStep();
    navigate("/parenteditvb/UpdateVBfinalinspection/wheel_details");
  };

  return (
    <div className="componentFinal">
      {/* dropdown here */}
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        VB FINAL INSPECTION FORM
      </h2>
      <h2>Axle Details for VB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              <div>
                <label>Wheel No:</label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataFinalVB.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel Number"
                />
              </div>
              <div>
                <label>Axle No:</label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataFinalVB.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                />
              </div>
              <div>
                <label>Shift:</label>
                <select
                  id="dropdown"
                  name="Shift"
                  value={formDataFinalVB.Shift}
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
            <div className="Finalrow-2">
              <div></div>
              <div></div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="Finalrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerFinal">
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

export default AxleDetails;

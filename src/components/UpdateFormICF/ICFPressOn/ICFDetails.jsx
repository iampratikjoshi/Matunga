import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api from "../../Axios/AxiosConnection";


function ICFPressOnDetails({
  formDataProceedSubmitPressOnICF,
  setformDataProceedSubmitPressOnICF,
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
    const fetchICFData = async () => {
      try {
        if (wheelid) {
          const response = await api.get(`/icfpresson/getdata/`+wheelid);
          console.log("icfpresson", response.data);
          
          // Update the form data with the fetched values
          setformDataProceedSubmitPressOnICF((prevFormData) => ({
            ...prevFormData,
            wheelid: response.data[0].wheelid,
            SectionId: response.data[0].SectionId,
            DepartmentId: response.data[0].DepartmentId,
            WheeltypeId: response.data[0].WheeltypeId,
            WheelNo: response.data[0].WheelNo,
            WheelType: response.data[0].WheelType,
            AxleNo: response.data[0].AxleNo,
            ATLNo: response.data[0].ATLNo,
            AWheelSide: response.data[0].AWheelSide,
            BWheelSide: response.data[0].BWheelSide,
            ARASide: response.data[0].ARASide,
            BRASide: response.data[0].BRASide,
            OperatorNamePrimary: response.data[0].OperatorNamePrimary,
            VTLNo: response.data[0].VTLNo,
            BoreSize: response.data[0].BoreSize,
            RAValue: response.data[0].RAValue,
            OperatorNameA: response.data[0].OperatorNameA,
            TopX: response.data[0].TopX,
            TopY: response.data[0].TopY,
            MiddleX: response.data[0].MiddleX,
            MiddleY: response.data[0].MiddleY,
            LowerX: response.data[0].LowerX,
            LowerY: response.data[0].LowerY,
            AvgX: response.data[0].AvgX,
            AvgY: response.data[0].AvgY,
            BWheelSeatSize: response.data[0].BWheelSeatSize,
            CBAIntAllow: response.data[0].CBAIntAllow,
            PressureInTon: response.data[0].PressureInTon,
            RDNo: response.data[0].RDNo,
            WheelDiscAParticulars: response.data[0].WheelDiscAParticulars,
            VTLNoB: response.data[0].VTLNoB,
            BoreSizeB: response.data[0].BoreSizeB,
            RAValueB: response.data[0].RAValueB,
            OperatorNameB: response.data[0].OperatorNameB,
            BTopX: response.data[0].BTopX,
            BTopY: response.data[0].BTopY,
            BMiddleX: response.data[0].BMiddleX,
            BMiddleY: response.data[0].BMiddleY,
            BLowerX: response.data[0].BLowerX,
            BLowerY: response.data[0].BLowerY,
            BAvgX: response.data[0].BAvgX,
            BAvgY: response.data[0].BAvgY,
            BWheelSeatSizeB: response.data[0].BWheelSeatSizeB,
            CBAIntAllowB: response.data[0].CBAIntAllowB,
            PressureInTonB: response.data[0].PressureInTonB,
            RDNoB: response.data[0].RDNoB,
            WheelDiscAParticularsB: response.data[0].WheelDiscAParticularsB,
            MCNo: response.data[0].MCNo,
            OperatorNameFinal: response.data[0].OperatorNameFinal,
            InspectorNameFinal: response.data[0].InspectorNameFinal,
            
            // Adding new fields as per ICFPressOnDetails
            createdBy: prevFormData.createdBy || "ADMIN",
            SectionId: prevFormData.SectionId || 1,
            DepartmentId: prevFormData.DepartmentId || 3,
            WheeltypeId: prevFormData.WheeltypeId || 2
          }));
        }
      } catch (error) {
        console.error("Error fetching ICF data: ", error);
      }
    };

    fetchICFData();
  }, [wheelid, setformDataProceedSubmitPressOnICF]);

  useEffect(() => {
    if (wheelid && WheelNo) {
      setformDataProceedSubmitPressOnICF((prevFormData) => ({
        ...prevFormData,
        wheelid: wheelid,
        WheelNo: WheelNo,
      }));
    }
  }, [wheelid, WheelNo, setformDataProceedSubmitPressOnICF]);

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
    console.log(formDataProceedSubmitPressOnICF);
  };

 
  const handleCancel = () => {
    setformDataProceedSubmitPressOnICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 2,
    }));
    onResetStep();
    navigate("/parentediticf/UpdateICFPressOnForm/icf_details");
  };

  const saveandcontinue = () => {
    onNextStep();
    navigate("/parentediticf/UpdateICFPressOnForm/wheel_size");
  };

  const back = () => {
    navigate("/parentediticf/editicf");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await api.put("/icfpresson/editdata/", formDataProceedSubmitPressOnICF);
        console.log(response.AxleNumber);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setformDataProceedSubmitPressOnICF((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 3,
            WheeltypeId: 2,
          }));

          navigate("/parentediticf/UpdateICFPressOnForm/icf_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    
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
        PRESS-ON OF ICF WHEEL FORM
{" "}
      </h2>
      <h2>Operator Details for PRESS-ON OF ICF WHEEL FORM
</h2>

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
                  value={formDataProceedSubmitPressOnICF.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No"
                />
                
              </div>
              <div>
                <label>
                  Wheel Type
                </label>
                <input
                  type="text"
                  name="WheelType"
                  value={formDataProceedSubmitPressOnICF.WheelType}
                  onChange={handleChange}
                  placeholder="Enter Wheel Type"
                />
                
              </div>
              <div>
                <label>
                  Axle No.:
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataProceedSubmitPressOnICF.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No"
                />
                
              </div>
            </div>
            <div className="Pressonoffrow-3">
              <div>
                <label>
                  ATL No:
                </label>
                <input
                  type="text"
                  name="ATLNo"
                  value={formDataProceedSubmitPressOnICF.ATLNo}
                  onChange={handleChange}
                  placeholder="Enter ATL No"
                />
                
              </div>
              <div>
              {/* <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataProceedSubmitPressOnICF.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                /> */}
              </div>

              <div>
                
              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div className="file-container">
                {/* <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Upload Image:
                </span>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="upload-icon">
                    <IoCloudUploadOutline />
                  </span>
                  <span className="drag-drop">Drag & drop files</span>
                  <span className="drag-or">--------- or ---------</span>
                  <button className="browse-button">Browse</button>
                </div>
                <div className="uploading-section">
                  {file ? (
                    <div className="file-row">
                      <span>{file.name}</span>
                    </div>
                  ) : (
                    <span style={{ marginTop: "5px" }}>
                      No image uploaded yet.
                    </span>
                  )}
                </div> */}
              </div>
            </div>

            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerPressonoff">
              <div>
              <button onClick={back}>Back</button>
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button className="red_btn" onClick={handleCancel}>
                Cancel
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ICFPressOnDetails;

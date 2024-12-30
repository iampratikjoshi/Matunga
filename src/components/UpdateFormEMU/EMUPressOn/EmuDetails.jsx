import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api, { postData } from "../../Axios/AxiosConnection";

function EmuDetails({
  formDataProceedSubmitEMU,
  setformDataProceedSubmitEMU,
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
          const response = await api.get(`/emupresson/getdata/` + wheelid); // Assuming your API needs the wheelid in the endpoint
          console.log("emupresson", response.data);

          // Assuming response.data contains the data you want to set in the form
          setformDataProceedSubmitEMU((prevFormData) => ({
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


          }));
          console.log("DiscParticularA:", response.data[0].DiscParticularA)
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [wheelid, setformDataProceedSubmitEMU]);

  useEffect(() => {
    if (WheelNo && wheelid) {
      setformDataProceedSubmitEMU((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
      console.log("WheelNo", WheelNo);
      console.log("wheelid", wheelid);

    }
  }, [WheelNo, wheelid, setformDataProceedSubmitEMU]);

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
    console.log(formDataProceedSubmitEMU);
  };


  const handleCancel = () => {
    setformDataProceedSubmitEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 3,
      WheeltypeId: 4,
    }));
    onResetStep();
    navigate("/parentemuedit/UpdateEMUPressOn/emu_details");
  };

  const saveandcontinue = () => {
    onNextStep();
    navigate("/parentemuedit/UpdateEMUPressOn/wheel_size");
  };

  const back = () => {
    navigate("/parentemuedit/UpdateEMUPressOn/");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put("/emupresson/editdata/" + formDataProceedSubmitEMU.wheelid, formDataProceedSubmitEMU); // Use putData for updating

      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);

        // Reset the form
        setformDataProceedSubmitEMU((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 3,
          WheeltypeId: 4,
        }));

        // Navigate only after successful update
        navigate("/edit");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
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
        PRESS-ON OF EMU WHEEL FORM{" "}
      </h2>
      <h2>Operator Details for PRESS-ON OF EMU WHEEL FORM</h2>

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
                  value={formDataProceedSubmitEMU.WheelNo}
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
                  value={formDataProceedSubmitEMU.WheelType}
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
                  value={formDataProceedSubmitEMU.AxleNo}
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
                  value={formDataProceedSubmitEMU.ATLNo}
                  onChange={handleChange}
                  placeholder="Enter ATL No"
                />

              </div>
              <div>
                {/* <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataProceedSubmitEMU.EndHole}
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

export default EmuDetails;

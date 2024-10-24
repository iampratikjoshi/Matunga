import React, { useEffect,useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import api, { postData } from "../../Axios/AxiosConnection";

function ReportDetails({
  formDataDivision,
  setFormDataDivision,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [DivisionName, setDivisionName] = useState(
    formDataDivision.DivisionName
  ); // State for DivisionName dropdown
  const [otherDivisionName, setOtherDivisionName] = useState(""); // State for other DivisionName input
  const [divisionreport, setdivisionreport] = useState(
    formDataDivision.divisionreport
  ); // State for divisionreport dropdown
  const [otherDivisionReport, setotherDivisionReport] = useState(""); // State for other divisionreport input
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
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

 

  const handleDivisionNameChange = (event) => {
    const selectedRemark = event.target.value;
    setDivisionName(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(DivisionName);

      setFormDataDivision((prevData) => ({
        ...prevData,
        DivisionName: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataDivision((prevData) => ({
        ...prevData,
        DivisionName: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherDivisionNameChange = (event) => {
    const { value } = event.target;
    setOtherDivisionName(value);
    setFormDataDivision((prevData) => ({
      ...prevData,
      DivisionName: value,
    }));

    console.log(formDataDivision.DivisionName);
  };

  const handleDivisionReportChange = (event) => {
    const selectedRemark = event.target.value;
    setdivisionreport(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      // console.log(selectedRemark);
      // console.log(divisionreport);

      setFormDataDivision((prevData) => ({
        ...prevData,
        divisionreport: selectedRemark,
        // OtherRemark: "", // Clear out the OtherRemark field
      }));
    } else {
      setFormDataDivision((prevData) => ({
        ...prevData,
        divisionreport: "", // Clear out the Remark field
      }));
    }
  };

  const handleOtherDivisionReportChange = (event) => {
    const { value } = event.target;
    setotherDivisionReport(value);
    setFormDataDivision((prevData) => ({
      ...prevData,
      divisionreport: value,
    }));

    console.log(formDataDivision.divisionreport);
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
    // console.log(formDataDivision);
  };



  const handleCancel = () => {
    setFormDataDivision((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
    }));
    onResetStep();
    navigate("/parentedit/UpdateLHBDivisionPreInspectionForm/wheel_details");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.put("/division/editdata/" + formDataDivision.wheelid, formDataDivision); // Use putData for updating
      
      // Check if the request was successful (e.g., status 200 or 204)
      if (response.status === 200 || response.status === 204) {
        const data = await response.data; // Get the JSON or response data
        console.log("Form updated successfully:", data);
  
        // Reset the form
        setFormDataDivision((prevFormData) => ({
          ...Object.keys(prevFormData).reduce((acc, key) => {
            acc[key] = null;
            return acc;
          }, {}),
          createdBy: "ADMIN",
          SectionId: 1,
          DepartmentId: 2,
          WheeltypeId: 1,
        }));
  
        // Navigate only after successful update
        navigate("/parentedit/edit");
      } else {
        console.error("Error updating form:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    }
  };

  return (
    <div className="component">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        LHB DIVISION PRE INSPECTION FORM{" "}
      </h2>
      <h2>Report Details For LHB Division Pre Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  P.O.H Date:
                </label>
                <input
                  type="date"
                  name="POHDate"
                  value={formDataDivision.POHDate}
                  onChange={handleChange}
                />

              </div>
              <div>
                <label>
                  Division Name:

                </label>
                <select
                  name="DivisionName"
                  value={DivisionName}
                  onChange={handleDivisionNameChange}
                  required
                >
                  <option value="">Choose Divsion Name</option>
                  <option value="WB">WB</option>
                  <option value="LTT">LTT</option>
                  <option value="PA">PA</option>
                  <option value="SUR">SUR</option>
                  <option value="LUR">LUR</option>
                  <option value="NGP">NGP</option>
                  <option value="MMR">MMR</option>
                  <option value="BSL">BSL</option>
                  <option value="KYL">KYL</option>
                  <option value="SNPDCS">SNPDCS</option>
                  <option value="SNPDLOH">SNPDLOH</option>
                  <option value="CLA">CLA</option>
                  <option value="AGNI">AGNI</option>
                  <option value="KLVC">KLVC</option>
                  <option value="others">Others</option>
                </select>


              </div>
              {DivisionName === "others" && (
                <div>
                  <label>
                    Enter Specific Division Name:

                  </label>
                  <input
                    type="text"
                    name="DivisionName"
                    value={otherDivisionName}
                    onChange={handleOtherDivisionNameChange}
                    placeholder="Enter Specific Remark"
                  // Adjust spacing
                  />

                </div>
              )}
            </div>
            <div className="row-2">
              <div>
                <label>
                  Division Report:
                </label>
                <select
                  name="divisionreport"
                  value={divisionreport}
                  onChange={handleDivisionReportChange}
                  required
                >
                  <option value="">Choose Division Report</option>
                  <option value="ST">ST</option>
                  <option value="HEAT CHECK">HEAT CHECK</option>
                  <option value="RIM FLAW">RIM FLAW</option>
                  <option value="BEARING SOUND">BEARING SOUND</option>
                  <option value="HOT AXEL">HOT AXEL</option>
                  <option value="WHEEL SHEELING">WHEEL SHEELING</option>
                  <option value="SHATTERED RIM">SHATTERED RIM</option>
                  <option value="METAL CHIP OFF">METAL CHIP OFF</option>
                  <option value="SKIDDED">SKIDDED</option>
                  <option value="FLAT TYRE">FLAT TYRE</option>
                  <option value="SEAL DENT">SEAL DENT</option>
                  <option value="SEAL DAMAGE">SEAL DAMAGE</option>
                  <option value="BEARING JAM">BEARING JAM</option>
                  <option value="SPREAD RIM">SPREAD RIM</option>
                  <option value="GREASE OOZING">GREASE OOZING</option>
                  <option value="OMRS">OMRS</option>
                  <option value="WILD">WILD</option>
                  <option value="others">Others</option>
                </select>

              </div>
              {divisionreport === "others" && (
                <div>
                  <label>
                    Enter Specific Division Report:

                  </label>
                  <input
                    type="text"
                    name="divisionreport"
                    value={otherDivisionReport}
                    onChange={handleOtherDivisionReportChange}
                    placeholder="Enter Specific Remark"
                  // Adjust spacing
                  />

                </div>
              )}

              <div>
                <label>
                  Matunga Remark:
                </label>
                <input
                  type="text"
                  name="matungareport"
                  value={formDataDivision.matungareport}
                  onChange={handleChange}
                  placeholder="Enter Matunga Remark"
                />

              </div>
            </div>
            <div className="row-3">
              <div>
                <label>Remark:</label>
                <input
                  type="text"
                  name="Remark"
                  // value={formDataDivision.EndHole}
                  // onChange={handleChange}
                  placeholder="Enter Remark"
                />
              </div>
              <div className="file-container">
                <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Upload Image:
                </span>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <span className="upload-icon">
                    <IoCloudUploadOutline />
                  </span>
                  <span className="drag-drop">Drag & drop files</span>
                  <span className="drag-or">---------- or ----------</span>
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
                </div>
              </div>
            </div>
            <div className="row-4"></div>
            <div></div>
            <div></div>
            <div className="btn-container">
              <div>
                <button type="submit" onClick={handleSubmit}>
                  Next
                </button>
              </div>
              
              <div>
                <button
                  onClick={() => {
                    navigate("/parentedit/UpdateLHBDivisionPreInspectionForm/wheel_details");
                  }}
                >
                  Back
                </button>
              </div>
              <div>
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

export default ReportDetails;

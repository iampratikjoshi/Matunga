import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { postData } from "../Axios/AxiosConnection";

function WheelDetails({
  formDataProceedSubmitEMUWearingClearance ,
  setformDataProceedSubmitEMUWearingClearance ,
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
    console.log(formDataProceedSubmitEMUWearingClearance );
  };

 
  const handleCancel = () => {
    setformDataProceedSubmitEMUWearingClearance ((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
      DepartmentID: 3,
      WheeltypeID: 2,
    }));
    onResetStep();
    navigate("/wearingclearanceemu/wheel_details");
  };

  const saveandcontinue = () => {
    onNextStep();
    navigate("/wearingclearanceemu/clearance");
  };

  const back = () => {
    navigate("/wearingclearanceemu/");
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      try {
        const response = await postData("/wearingclremu/data", formDataProceedSubmitEMUWearingClearance );
        console.log(response.AxleNumber);
        if (response) {
          const data = await response; // Get JSON from the response
          console.log("Form submitted successfully:", data);
          setformDataProceedSubmitEMUWearingClearance ((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
              acc[key] = null;
              return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 2,
            WheeltypeId: 1,
          }));

          navigate("/wearingclearanceemu/wheel_details");
        } else {
          console.error("Error submitting form:", response.statusText);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
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
        Bearing Clearance Statement FORM
{" "}
      </h2>
      <h2>Wheel Details for Bearing Clearance Statement FORM
</h2>

<div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Wheel No.:
                </label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataProceedSubmitEMUWearingClearance .WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No"
                />
                
              </div>
              <div>
                <label>
                  Type :
                </label>
                <input
                  type="text"
                  name="WheelType"
                  value={formDataProceedSubmitEMUWearingClearance .WheelType}
                  onChange={handleChange}
                  placeholder="Enter Wheel Type"
                />
                
              </div>
              <div>
                <label>
                  Diameter :
                </label>
                <input
                  type="text"
                  name="WheelDiameter"
                  value={formDataProceedSubmitEMUWearingClearance .WheelDiameter}
                  onChange={handleChange}
                  placeholder="Enter Wheel Diameter"
                />
                
              </div>
            </div>
            <div className="row-3">
              <div>
              <label>
                  Axle No :
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataProceedSubmitEMUWearingClearance .AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No"
                />
                
              </div>
              <div>
              <label>
                  Axle Year :
                </label>
                <input
                  type="text"
                  name="AxleYear"
                  value={formDataProceedSubmitEMUWearingClearance .AxleYear}
                  onChange={handleChange}
                  placeholder="Enter Axle Year"
                />
              </div>

              <div>
              <label>Bearing Code No :</label>
                <input
                  type="text"
                  name="WearingCodeNo"
                  value={formDataProceedSubmitEMUWearingClearance .WearingCodeNo}
                  onChange={handleChange}
                  placeholder="Enter Bearing Code No"
                />
              </div>
            </div>
            <div className="row-2">
            <div>
            <label>Bearing Year :</label>
                <input
                  type="text"
                  name="WearingYear"
                  value={formDataProceedSubmitEMUWearingClearance .WearingYear}
                  onChange={handleChange}
                  placeholder="Enter Bearing Year"
                />
            </div>
              <div>
              <label> Matunga Bearing No :</label>
                <input
                  type="text"
                  name="MatungaWNo"
                  value={formDataProceedSubmitEMUWearingClearance .MatungaWNo}
                  onChange={handleChange}
                  placeholder="Enter Matunga Bearing No"
                />
              </div>
              <div>
              <label> V :</label>
                <input
                  type="text"
                  name="V"
                  value={formDataProceedSubmitEMUWearingClearance .V}
                  onChange={handleChange}
                  placeholder="Enter V No"
                />
              </div>
            </div>

            <div className="row-3">
              <div>
              <label> Make :</label>
                <input
                  type="text"
                  name="Make"
                  value={formDataProceedSubmitEMUWearingClearance .Make}
                  onChange={handleChange}
                  placeholder="Enter Make No"
                />
              </div>
              <div></div>
            </div>
            <div className="btn-container">
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

export default WheelDetails;

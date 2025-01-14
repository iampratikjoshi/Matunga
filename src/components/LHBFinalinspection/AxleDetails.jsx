import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import api from "../Axios/AxiosConnection";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function AxleDetails({
  formDataFinal,
  setFormDataFinal,
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
    if (WheelNo && wheelid) {
      setFormDataFinal((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [wheelid, WheelNo]);

  // Set the WheelNo in ShopSNo when the componentFinal loads
  useEffect(() => {
    if (wheelid) {
      // Fetch data from the Schedule Pre Inspection API using wheelid
      api
        .get("/prelhb/getdata/" + wheelid)
        .then((response) => {
          const data = response.data;
          console.log("Pre LHB Data", data);

          // Check the type of repair
          // if (data[0].TypeOfRepair === "NormalRepair") {
            // Update the common fields in formDataFinal for Normal Repair
            setFormDataFinal((prevFormData) => ({
              ...prevFormData,
              CTRBMakeA: data[0].CTRBMakeA,
              CTRBMakeB: data[0].CTRBMakeB,
              CTRBRemainingLifeA: data[0].CTRBRemainingLifeA,
              CTRBRemainingLifeB: data[0].CTRBRemainingLifeB,
              CTRBRemarkA: data[0].CTRBRemarkA,
              CTRBRemarkB: data[0].CTRBRemarkB,
            }));
          // } else {
          //   console.log(
          //     "TypeOfRepair is neither NormalRepair nor HeavyRepair."
          //   );
          // }
        })
        .catch((error) => {
          console.error("Error fetching Schedule Pre Inspection data", error);
        });
    }
  }, [wheelid]); // Updated dependency to wheelid

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
    setFormDataFinal((prevFormData) => ({
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
    navigate("/lhbfinalinspection/axle_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    onNextStep();
    navigate("/lhbfinalinspection/wheel_details");
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
        LHB FINAL INSPECTION FORM
      </h2>
      <h2>Axle Details for LHB Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              <div>
                <label>Wheel No:</label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataFinal.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel Number"
                />
              </div>
              <div>
                <label>Axle No:</label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataFinal.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                />
              </div>
              <div>
                <label>Shift:</label>
                <select
                  id="dropdown"
                  name="Shift"
                  value={formDataFinal.Shift}
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

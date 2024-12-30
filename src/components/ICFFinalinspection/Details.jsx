import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function Details({
  formDataFinalICF,
  setFormDataFinalICF,
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
    // console.log(formDataFinalICF);
  };

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataFinalICF((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [wheelid, WheelNo]);

  const handleCancel = () => {
    setFormDataFinalICF((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 4,
      WheeltypeId: 4,
    }));
    onResetStep();
    navigate("/icffinalinspection/wheel_details");
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};


    // if (isNaN(formDataFinalICF.WheelRG) || formDataFinalICF.WheelRG < 1599 || formDataFinalICF.WheelRG > 1602) {
    //   newErrors.WheelRG = "Wheel RG must be between 1599 and 1602.";
    // }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
   
      onNextStep();
      navigate("/icffinalinspection/collercondition_details");
    
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/icffinalinspection/Brg_detailsB");
  };

  

  const [TypeOfWheel, setCTRBMakeA] = useState(formDataFinalICF.TypeOfWheel); // State for TypeOfWheel dropdown
  const [OtherTypeOfWheel, setOtherCTRBMakeA] = useState(""); // State for other TypeOfWheel input

  const handleOtherTypeOfWheelChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormDataFinalICF((prevData) => ({
      ...prevData,
      TypeOfWheel: value,
    }));

    console.log(formDataFinalICF.TypeOfWheel);
  };

  const handleTypeOfWheelChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinalICF((prevData) => ({
        ...prevData,
        TypeOfWheel: selectedRemark,
      }));
    } else {
      setFormDataFinalICF((prevData) => ({
        ...prevData,
        TypeOfWheel: "", // Clear out the Remark field
      }));
    }
  };

  return (
    <div className="componentFinal">
      <h2
        style={{
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          opacity: 1,
        }}
      >
        ICF FINAL INSPECTION FORM{" "}
      </h2>
      <h2>BRG Details A for ICF Final Inspection Form</h2>

     <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
            <div>
                <label>Fitment Date:</label>
                <input
                  type="date"
                  name="FitmentDate"
                  value={formDataFinalICF.FitmentDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Shift</label>
                <input
                  type="text"
                  name="Shift"
                  value={formDataFinalICF.Shift}
                  onChange={handleChange}
                  placeholder="Enter Shift"
                />
              </div>
              <div>
                <label>Gang Name A</label>
                <input
                  type="text"
                  name="GangNameA"
                  value={formDataFinalICF.GangNameA}
                  onChange={handleChange}
                  placeholder="Enter Gang Name A"
                />
              </div>
              
            </div>
            <div className="Finalrow-2">
            <div>
                <label>Gang Name B</label>
                <input
                  type="text"
                  name="GangNameB"
                  value={formDataFinalICF.GangNameB}
                  onChange={handleChange}
                  placeholder="Enter Gang Name B"
                />
              </div>
            <div>
                <label>Inspector Name:</label>
                <input
                  type="text"
                  name="InspectorName"
                  value={formDataFinalICF.InspectorName}
                  onChange={handleChange}
                  placeholder="Enter Inspector Name"
                />
              </div>
            </div>
            <div className="Finalrow-3">
            
              <div> </div>
              <div> </div>
            </div>
            <div className="Finalrow-2">
              <div></div>
              <div></div>
            </div>


            <div className="btn-containerFinal">
              <button onClick={saveandcontinue}>Save & Continue</button>
              <button onClick={handleBack}>Back</button>
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

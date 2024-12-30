import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";

function BRGDetailsB({
  formDataFinalEMU,
  setFormDataFinalEMU,
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
    // console.log(formDataFinalEMU);
  };

  const location = useLocation();
  const { WheelNo, wheelid } = location.state || {};

  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataFinalEMU((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [wheelid, WheelNo]);

  const handleCancel = () => {
    setFormDataFinalEMU((prevFormData) => ({
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
    navigate("/parentemuedit/UpdateEMUFinalInspection/wheel_details");
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};


    // if (isNaN(formDataFinalEMU.WheelRG) || formDataFinalEMU.WheelRG < 1599 || formDataFinalEMU.WheelRG > 1602) {
    //   newErrors.WheelRG = "Wheel RG must be between 1599 and 1602.";
    // }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {
   
      onNextStep();
      navigate("/parentemuedit/UpdateEMUFinalInspection/details");
    
  };

  const handleBack = () => {
    // Set flag when navigating back
    navigate("/parentemuedit/UpdateEMUFinalInspection/Brg_detailsA");
  };

  

  const [TypeOfWheel, setCTRBMakeA] = useState(formDataFinalEMU.TypeOfWheel); // State for TypeOfWheel dropdown
  const [OtherTypeOfWheel, setOtherCTRBMakeA] = useState(""); // State for other TypeOfWheel input

  const handleOtherTypeOfWheelChange = (event) => {
    const { value } = event.target;
    setOtherCTRBMakeA(value);
    setFormDataFinalEMU((prevData) => ({
      ...prevData,
      TypeOfWheel: value,
    }));

    console.log(formDataFinalEMU.TypeOfWheel);
  };

  const handleTypeOfWheelChange = (event) => {
    const selectedRemark = event.target.value;
    setCTRBMakeA(selectedRemark);

    // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
    if (selectedRemark !== "others") {
      setFormDataFinalEMU((prevData) => ({
        ...prevData,
        TypeOfWheel: selectedRemark,
      }));
    } else {
      setFormDataFinalEMU((prevData) => ({
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
        EMU FINAL INSPECTION FORM{" "}
      </h2>
      <h2>BRG Details B for EMU Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
            <div>
                <label>Brg Code B</label>
                <input
                  type="text"
                  name="BrgCodeB"
                  value={formDataFinalEMU.BrgCodeB}
                  onChange={handleChange}
                  placeholder="Enter Brg Code B"
                />
              </div>
              <div>
                <label>Brg Year B</label>
                <input
                  type="text"
                  name="BrgYearB"
                  value={formDataFinalEMU.BrgYearB}
                  onChange={handleChange}
                  placeholder="Enter Brg Year B"
                />
              </div>
              <div>
                <label>MTN Brg No. B </label>
                <input
                  type="text"
                  name="MTNBrgNoB"
                  value={formDataFinalEMU.MTNBrgNoB}
                  onChange={handleChange}
                  placeholder="Enter MTN Brg No. B "
                />
              </div>
              
              
            </div>
            <div className="Finalrow-2">
            <div>
                <label>Brg Make B</label>
                <input
                  type="text"
                  name="BrgMakeB"
                  value={formDataFinalEMU.BrgMakeB}
                  onChange={handleChange}
                  placeholder="Enter Brg Make B"
                />
              </div>
            <div>
                <label>Radial Clearance in Dismounted Condition B</label>
                <input
                  type="text"
                  name="RadialClearanceDismountedB"
                  value={formDataFinalEMU.RadialClearanceDismountedB}
                  onChange={handleChange}
                  placeholder="Enter Radial Clearance in Dismounted Condition B"
                />
              </div>
            <div>
                <label>Radial Clearance in Mounted Condition B</label>
                <input
                  type="text"
                  name="RadialClearanceMountedB"
                  value={formDataFinalEMU.RadialClearanceMountedB}
                  onChange={handleChange}
                  placeholder="Enter Radial Clearance in Mounted Condition B"
                />
              </div>
              
            </div>
            <div className="Finalrow-3">
            <div>
                <label>Brg Initial Fitment Month B</label>
                <input
                  type="text"
                  name="BrgInitialFitmentMonthB"
                  value={formDataFinalEMU.BrgInitialFitmentMonthB}
                  onChange={handleChange}
                  placeholder="Enter Brg Initial Fitment Month B"
                />
              </div>
            <div>
                <label>Brg Service In Month B</label>
                <input
                  type="text"
                  name="BrgServiceInMonthB"
                  value={formDataFinalEMU.BrgServiceInMonthB}
                  onChange={handleChange}
                  placeholder="Enter Brg Service In Month B"
                />
              </div>
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

export default BRGDetailsB;

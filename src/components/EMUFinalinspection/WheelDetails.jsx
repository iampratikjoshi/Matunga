import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import api from "../Axios/AxiosConnection";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";

function Wheeldetails({
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
    if (wheelid) {
      // Fetch data from the Schedule Pre Inspection API using wheelid
      api
        .get("/emufinalinspection/getdata/" + wheelid)
        .then((response) => {
          const data = response.data;
          console.log("Pre EMU Data", data);

          // Check the type of repair
          // if (data[0].TypeOfRepair === "NormalRepair") {
          // Update the common fields in formDataFinal for Normal Repair
          setFormDataFinalEMU((prevFormData) => ({
            ...prevFormData,
            AxleNo: data[0].AxleNo,
            InspectorName: data[0].InspectorName,
            FitmentDate: data[0].FitmentDate,
            BrgCodeA: data[0].BrgCodeA,
            BrgYearA: data[0].BrgYearA,
            MTNBrgNoA: data[0].MTNBrgNoA,
            BrgMakeA: data[0].BrgMakeA,
            RadialClearanceDismountedA: data[0].RadialClearanceDismountedA,
            RadialClearanceMountedA: data[0].RadialClearanceMountedA,
            BrgInitialFitmentMonthA: data[0].BrgInitialFitmentMonthA,
            BrgServiceInMonthA: data[0].BrgServiceInMonthA,
            BrgCodeB: data[0].BrgCodeB,
            BrgYearB: data[0].BrgYearB,
            MTNBrgNoB: data[0].MTNBrgNoB,
            BrgMakeB: data[0].BrgMakeB,
            RadialClearanceDismountedB: data[0].RadialClearanceDismountedB,
            RadialClearanceMountedB: data[0].RadialClearanceMountedB,
            BrgInitialFitmentMonthB: data[0].BrgInitialFitmentMonthB,
            BrgServiceInMonthB: data[0].BrgServiceInMonthB,
            Shift: data[0].Shift,
            GangNameA: data[0].GangNameA,
            GangNameB: data[0].GangNameB,
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
    navigate("/emufinalinspection/wheel_details");
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};


    if (isNaN(formDataFinalEMU.WheelRG) || formDataFinalEMU.WheelRG < 1599 || formDataFinalEMU.WheelRG > 1602) {
      newErrors.WheelRG = "Wheel RG must be between 1599 and 1602.";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveandcontinue = () => {

    onNextStep();
    navigate("/emufinalinspection/journalA_details");

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
      <h2>Wheel Details for EMU Final Inspection Form</h2>

      <div className="page-borderFinal">
        <div className="page-contentFinal">
          <div className="wheel-page-main-final-content">
            <div className="Finalrow-1">
              <div>
                <label>Wheel No:</label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataFinalEMU.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel Number"
                />
              </div>
              <div>
                <label>Axle No:</label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataFinalEMU.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No"
                />
              </div>
              <div>
                <label>
                  Type Of Wheel:
                </label>
                <select
                  name="TypeOfWheel"
                  value={TypeOfWheel}
                  onChange={handleTypeOfWheelChange}
                  required
                >
                  <option value="">Choose Type Of Wheel</option>
                  <option value="HCCorTRL">HCC/TRL</option>
                  <option value="ICFOrTRL">ICF/TRL</option>
                  <option value="ACDCSiemens">ACDC Siemens</option>
                  <option value="ACBhel">AC BHEL</option>
                  <option value="ACDCBombardier">ACDC BOMBARDIER</option>
                  <option value="ACMC">ACMC</option>
                  <option value="ACDCMEDHA">ACDC MEDHA</option>
                  <option value="ACMEMU">AC MEMU</option>
                  <option value="others">Others</option>
                </select>


              </div>

            </div>
            <div className="Finalrow-2">
              {TypeOfWheel === "others" && (
                <div>
                  <label>
                    Enter Type Of Wheel:

                  </label>
                  <input
                    type="text"
                    name="OtherRemark"
                    value={OtherTypeOfWheel}
                    onChange={handleOtherTypeOfWheelChange}
                    placeholder="Enter Specific Type Of Wheel"
                  // Adjust spacing
                  />

                </div>
              )}
              <div> </div>
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

export default Wheeldetails;

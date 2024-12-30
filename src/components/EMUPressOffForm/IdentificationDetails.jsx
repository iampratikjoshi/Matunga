import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import api from "../Axios/AxiosConnection";

function IdentificationDetails({
  formDataPressOffEMU,
  setFormDataPressOffEMU,
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

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo && wheelid) {
      setFormDataPressOffEMU((prevFormData) => ({
        ...prevFormData,
        ShopSNo: WheelNo,
        wheelid: wheelid,
      }));
    }
  }, [WheelNo, wheelid, setFormDataPressOffEMU]);

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
    console.log(formDataPressOffEMU);
  };

  useEffect(() => {
    if (wheelid) {
      // Fetch data from the Schedule Pre Inspection API using wheelid
      api
        .get("/emupressoff/getdata/" + wheelid)
        .then((response) => {
          const data = response.data;
          // console.log("Pre ICF Data", data);

          // Check the type of repair
          // if (data[0].TypeOfRepair === "NormalRepair") {
          // Update the common fields in formDataFinal for Normal Repair
          setFormDataPressOffEMU((prevFormData) => ({
            ...prevFormData,
            AxleNo: data[0].AxleNo,
            InspectorName: data[0].InspectorName,
          }));
          // } else {
          //   console.log(
          //     "TypeOfRepair is neither NormalRepair nor HeavyRepair."
          //   );
          // }
        })
        .catch((error) => {
          console.error("Error fetching Press Off data", error);
        });
    }
  }, [wheelid]); // Updated dependency to wheelid


  const handleCancel = () => {
    setFormDataPressOffEMU((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionID: 1,
    DepartmentID: 5,
    WheeltypeID: 4,
    }));
    onResetStep();
    navigate("/emupressoffForm/identification_details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {

    onNextStep();
    navigate("/emupressoffForm/wheelcondition_details");

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
        PRESS-OFF OF EMU WHEEL FORM{" "}
      </h2>
      <h2> Wheel Details For PRESS-OFF OF EMU WHEEL FORM</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">
              <div>
                <label>
                  Shop Sr.No. (Wheel No.):

                </label>
                <input
                  type="text"
                  name="ShopSNo"
                  value={formDataPressOffEMU.ShopSNo}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr.No."
                />

              </div>
              <div>
                <label>
                  Axle No.:
                </label>
                <input
                  type="text"
                  name="AxleNo"
                  value={formDataPressOffEMU.AxleNo}
                  onChange={handleChange}
                  placeholder="Enter Axle No."
                />

              </div>
              <div>
                <label>
                  Disc Sr.No.:
                </label>
                <input
                  type="text"
                  name="DiscSrNo"
                  value={formDataPressOffEMU.DiscSrNo}
                  onChange={handleChange}
                  placeholder="Enter Disc Sr.No."
                />

              </div>
            </div>
            <div className="Pressonoffrow-2">
              <div>
                <label>
                  Date:
                </label>
                <input
                  type="date"
                  name="Date"
                  value={formDataPressOffEMU.Date}
                  onChange={handleChange}
                />

              </div>
              <div>
                <label>
                  Shift No.:
                </label>
                <select
                  id="dropdown"
                  name="ShiftNumber"
                  value={formDataPressOffEMU.ShiftNumber}
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
            <div className="Pressonoffrow-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-containerPressonoff">
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

export default IdentificationDetails;

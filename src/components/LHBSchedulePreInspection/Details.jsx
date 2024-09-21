import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function Details({
  formData,
  setFormData,
  onInputChange,
  onNextStep,
  onResetStep,
}) {
  const [fileName, setFileName] = useState("No file chosen");
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({}); // State for validation errors
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
  const { WheelNo } = location.state || {};

  // Set the WheelNo in ShopSNo when the component loads
  useEffect(() => {
    if (WheelNo) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ShopSrNumber: WheelNo,
      }));
    }
  }, [WheelNo, setFormData]);

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
    console.log(formData);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.RodGaugeIN) {
      newErrors.RodGaugeIN = "Rod Gauge IN is required.";
    } else if (
      isNaN(formData.RodGaugeIN) ||
      formData.RodGaugeIN < 1599 ||
      formData.RodGaugeIN > 1602
    ) {
      newErrors.RodGaugeIN =
        "RodGaugeIN must be a number between 1599mm and 1602mm.";
    }

    if (!formData.ShopSrNumber) {
      newErrors.ShopSrNumber = "Shop Sr. Number  is required.";
    }

    if (!formData.AxleNumber) {
      newErrors.AxleNumber = "Axle Number is required.";
    }

    if (!formData.ReceiveDate) {
      newErrors.ReceiveDate = "Receive Date is required.";
    }

    if (!formData.AxleCondition) {
      newErrors.AxleCondition = "Axle Condition is required.";
    }

    if (!formData.DiscParticularA) {
      newErrors.DiscParticularA = "Disc Particular A is required.";
    }

    if (!formData.DiscParticularB) {
      newErrors.DiscParticularB = "Disc Particular B is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setFormData((prevFormData) => ({
      ...Object.keys(prevFormData).reduce((acc, key) => {
        acc[key] = null;
        return acc;
      }, {}),
      createdBy: "ADMIN",
      SectionId: 1,
      DepartmentId: 2,
      WheeltypeId: 1,
    }));
    onResetStep();
    navigate("/LHBSchedulePreInspection/details");
  };

  const navigate = useNavigate();

  const saveandcontinue = () => {
    if (validateForm()) {
      onNextStep();
      navigate("/LHBSchedulePreInspection/bdandcoach_details");
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
        LHB PRE INSPECTION FORM
      </h2>
      <h2> Details for LHB PRE Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Shop Sr. No. (Wheel No.):
                  <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="ShopSrNumber"
                  value={formData.ShopSrNumber}
                  onChange={handleChange}
                  placeholder="Enter Shop Sr. No."
                />
                {errors.ShopSrNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ShopSrNumber}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Axle No:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="AxleNumber"
                  value={formData.AxleNumber}
                  onChange={handleChange}
                  placeholder="Enter Axle Number"
                />
                {errors.AxleNumber && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.AxleNumber}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Receive Date:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="date"
                  name="ReceiveDate"
                  value={formData.ReceiveDate}
                  onChange={handleChange}
                />
                {errors.ReceiveDate && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.ReceiveDate}
                  </p>
                )}
              </div>
            </div>
            <div className="row-2">
              <div>
                <label>
                  Axle Condition:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="AxleCondition"
                  value={formData.AxleCondition}
                  onChange={handleChange}
                  placeholder="Enter Axle Condition"
                />
                {errors.AxleCondition && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.AxleCondition}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Disc Particular A:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiscParticularA"
                  value={formData.DiscParticularA}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular A"
                />
                {errors.DiscParticularA && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiscParticularA}
                  </p>
                )}
              </div>
              <div>
                <label>
                  Disc Particular B:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="DiscParticularB"
                  value={formData.DiscParticularB}
                  onChange={handleChange}
                  placeholder="Enter Disc Particular B"
                />
                {errors.DiscParticularB && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.DiscParticularB}
                  </p>
                )}
              </div>
            </div>
            <div className="row-3">
              <div>
                <label>
                  Rod Gauge IN:<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="RodGaugeIN"
                  value={formData.RodGaugeIN}
                  onChange={handleChange}
                  placeholder="Enter Rod Gauge IN"
                />
                {errors.RodGaugeIN && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "small",
                      margin: 0,
                      marginTop: "2px",
                      marginLeft: "2px",
                    }}
                  >
                    {errors.RodGaugeIN}
                  </p>
                )}
              </div>
            </div>
            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="btn-container">
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

export default Details;

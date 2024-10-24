import React, { useEffect,useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import api from "../../Axios/AxiosConnection";

function WheelDetails({
  formDataDivision,
  setFormDataDivision,
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
    // console.log(formData);
  };

  const location = useLocation();
  const { WheelNo,wheelid } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (wheelid) {
          const response = await api.get(`/division/getdata/`+wheelid); // Assuming your API needs the wheelid in the endpoint
          console.log("division",response.data);
          
          // Assuming response.data contains the data you want to set in the form
          setFormDataDivision((prevFormData) => ({
            ...prevFormData,
            WheelNo: response.data[0].WheelNo,
            LooryNo: response.data[0].LooryNo,
            POHDate: response.data[0].POHDate,
            divisionreport: response.data[0].divisionreport,
            DivisionName: response.data[0].DivisionName,
            matungareport: response.data[0].matungareport,
           
          }));
          console.log("DiscParticularA:",response.data[0].DiscParticularA)
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData();
  }, [wheelid, setFormDataDivision]);

  

  useEffect(() => {
    if (WheelNo) {
      setFormDataDivision((prevFormData) => ({
        ...prevFormData,
        WheelNo: WheelNo,
        wheelid: wheelid,
        
      }));
      console.log("WheelNo",WheelNo);
      
      console.log("WheelID",wheelid);

    }
  }, [WheelNo,wheelid, setFormDataDivision]);

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

  const saveandcontinue = () => {
    
      onNextStep();
      navigate("/parentedit/UpdateLHBDivisionPreInspectionForm/report_details");
    
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
      <h2> Wheel Details For LHB Division Pre Inspection Form</h2>

      <div className="page-border">
        <div className="page-contentLHB">
          <div className="wheel-page-main-content">
            <div className="row-1">
              <div>
                <label>
                  Wheel No:
                </label>
                <input
                  type="text"
                  name="WheelNo"
                  value={formDataDivision.WheelNo}
                  onChange={handleChange}
                  placeholder="Enter Wheel No."
                />
                
              </div>

              <div>
                <label>
                  Loory No:
                </label>
                <input
                  type="text"
                  name="LooryNo"
                  value={formDataDivision.LooryNo}
                  onChange={handleChange}
                  placeholder="Enter Loory No."
                />
                
              </div>

              <div className="file-container">
                
              </div>
            </div>
            <div className="row-2">
              <div>
                
              </div>
            </div>

            <div className="row-3">
              <div></div>
              <div></div>
            </div>
            <div className="row-3"></div>
            <div className="row-3"></div>
            <div className="row-3"></div>
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

export default WheelDetails;
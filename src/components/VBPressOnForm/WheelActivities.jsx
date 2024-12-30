import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelActivities({
    formDataPressOnVB,
    setFormDataPressOnVB,
    onInputChange,
    onNextStep,
    onResetStep,
}) {

    const [WheelActivities, setWheelActivities] = useState(formDataPressOnVB.WheelActivities);
    const [AxleWheelSeatSize, setAxleWheelSeatSize] = useState(
        formDataPressOnVB.AxleWheelSeatSize
    );

    const [WheelDiscBoreSize, setWheelDiscBoreSize] = useState(
        formDataPressOnVB.WheelDiscBoreSize
    );


    const [wheelDiscStampingParticulars, setwheelDiscStampingParticulars] = useState(
        formDataPressOnVB.wheelDiscStampingParticulars
    );

    const [PressOnNumber, setPressOnNumber] = useState(
        formDataPressOnVB.PressOnNumber
    );

    const [WheelActivityBDThickness, setWheelActivityBDThickness] = useState(
        formDataPressOnVB.WheelActivityBDThickness
    );

    const [WheelActivityBDMake, setWheelActivityBDMake] = useState(
        formDataPressOnVB.WheelActivityBDMake
    );

    const [fileName, setFileName] = useState("No file chosen");
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null); // Single file state
    const [isBackNavigation, setIsBackNavigation] = useState(false); // State to track back navigation
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

    const handleWheelActivityBDMake = (event) => {
        const { value } = event.target;
        setWheelActivityBDMake(value);
        setFormDataPressOnVB((prevData) => ({
            ...prevData,
            WheelActivityBDMake: value,
        }));

        console.log(formDataPressOnVB.WheelActivityBDMake);
    };

    const handleWheelActivityBDThickness = (event) => {
        const { value } = event.target;
        setWheelActivityBDThickness(value);
        setFormDataPressOnVB((prevData) => ({
            ...prevData,
            WheelActivityBDThickness: value,
        }));

        console.log(formDataPressOnVB.WheelActivityBDThickness);
    };

    const handleWheelDiscBoreSize = (event) => {
        const { value } = event.target;
        setWheelDiscBoreSize(value);
        setFormDataPressOnVB((prevData) => ({
            ...prevData,
            WheelDiscBoreSize: value,
        }));

        console.log(formDataPressOnVB.WheelDiscBoreSize);
    };

    const handlewheelDiscStampingParticulars = (event) => {
        const { value } = event.target;
        setwheelDiscStampingParticulars(value);
        setFormDataPressOnVB((prevData) => ({
            ...prevData,
            wheelDiscStampingParticulars: value,
        }));

        console.log(formDataPressOnVB.wheelDiscStampingParticulars);
    };

    const handlePressOnNumber = (event) => {
        const { value } = event.target;
        setPressOnNumber(value);
        setFormDataPressOnVB((prevData) => ({
            ...prevData,
            PressOnNumber: value,
        }));

        console.log(formDataPressOnVB.PressOnNumber);
    };

    const handleWheelActivities = (event) => {
        const selectedRemark = event.target.value;
        setWheelActivities(selectedRemark);

        // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
        if (selectedRemark !== "others") {
            setFormDataPressOnVB((prevData) => ({
                ...prevData,
                WheelActivities: selectedRemark,
                // OtherRemark: "", // Clear out the OtherRemark field
            }));
        } else {
            setFormDataPressOnVB((prevData) => ({
                ...prevData,
                WheelActivities: "", // Clear out the Remark field
            }));
        }
    };

    const handleAxleWheelSeatSize = (event) => {
        const { value } = event.target;
        setAxleWheelSeatSize(value);
        setFormDataPressOnVB((prevData) => ({
            ...prevData,
            AxleWheelSeatSize: value,
        }));

        console.log(formDataPressOnVB.AxleWheelSeatSize);
    };




    const handleCancel = () => {
        setFormDataPressOnVB((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 3,
            WheeltypeId: 1,
        }));
        onResetStep();
        navigate("/VBPressOnForm/wheel_details");
    };

    const handleBack = () => {
        setIsBackNavigation(true); // Set flag when navigating back
        navigate("/VBPressOnForm/wheel_details");
    };

    const navigate = useNavigate();

    const saveandcontinue = () => {

        if (!isBackNavigation) {
            onNextStep();
            setIsBackNavigation(false);
        }
        // setIsBackNavigation(false); // Reset flag after proceeding to next step
        navigate("/VBPressOnForm/wheeldiscABoresize_details");
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
                PRESS-ON OF VB WHEEL FORM{" "}
            </h2>
            <h2>Wheel Activities Details for PRESS-ON OF VB WHEEL Form</h2>

      <div className="page-borderPressonoff">
        <div className="page-contentPressOnoff">
          <div className="wheel-page-main-pressonoff-content">
            <div className="Pressonoffrow-1">

                            <div>
                                <label>
                                    Wheel Activities:
                                </label>
                                <select
                                    name="WheelActivities"
                                    value={formDataPressOnVB.WheelActivities}
                                    onChange={handleWheelActivities}
                                    required
                                >
                                    <option value="">Choose Wheel Activities</option>
                                    <option value="RA">RA</option>
                                    <option value="RD">RD</option>
                                    <option value="NANDNBD">NANDNBD</option>
                                    <option value="NANDOBD">NANDOBD</option>
                                    <option value="OANDNBD">OANDNBD</option>
                                    <option value="OANDOBD">OANDOBD</option>
                                </select>


                            </div>
                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NANDNBD" || WheelActivities === "NANDOBD" || WheelActivities === "OANDNBD" || WheelActivities === "OANDOBD") && (
                                <div>
                                    <label>
                                        Axle Wheel Seat Size:

                                    </label>
                                    <input
                                        type="text"
                                        name="AxleWheelSeatSize"
                                        value={AxleWheelSeatSize}
                                        onChange={handleAxleWheelSeatSize}
                                        placeholder="Enter Axle Wheel Seat Size"
                                    />

                                </div>
                            )}

                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NANDNBD" || WheelActivities === "NANDOBD" || WheelActivities === "OANDNBD" || WheelActivities === "OANDOBD") && (
                                <div>
                                    <label>
                                        Wheel Disc Bore Size:

                                    </label>
                                    <input
                                        type="text"
                                        name="WheelDiscBoreSize"
                                        value={WheelDiscBoreSize}
                                        onChange={handleWheelDiscBoreSize}
                                        placeholder="Enter  Wheel Disc Bore Size"
                                    />

                                </div>
                            )}

                        </div>
                        <div className="row-2">

                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NANDNBD" || WheelActivities === "NANDOBD" || WheelActivities === "OANDNBD" || WheelActivities === "OANDOBD") && (
                                <div>
                                    <label>
                                        Wheel Disc Stamping Particulars:

                                    </label>
                                    <input
                                        type="text"
                                        name="wheelDiscStampingParticulars"
                                        value={wheelDiscStampingParticulars}
                                        onChange={handlewheelDiscStampingParticulars}
                                        placeholder="Enter Wheel Disc Stamping Particulars"
                                    />

                                </div>
                            )}

                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NANDNBD" || WheelActivities === "NANDOBD" || WheelActivities === "OANDNBD" || WheelActivities === "OANDOBD") && (
                                <div>
                                    <label>
                                        Press-On No.:

                                    </label>
                                    <input
                                        type="text"
                                        name="PressOnNumber"
                                        value={PressOnNumber}
                                        onChange={handlePressOnNumber}
                                        placeholder="Enter Press-On No."
                                    />

                                </div>
                            )}
                            {(WheelActivities === "NANDNBD" || WheelActivities === "NANDOBD" || WheelActivities === "OANDNBD" || WheelActivities === "OANDOBD") && (
                                <div>
                                    <label>
                                        BD Thickness:

                                    </label>
                                    <input
                                        type="text"
                                        name="WheelActivityBDThickness"
                                        value={WheelActivityBDThickness}
                                        onChange={handleWheelActivityBDThickness}
                                        placeholder="Enter BD Thickness"
                                    />

                                </div>
                            )}


                        </div>

                        <div className="Pressonoffrow-3">
                            {(WheelActivities === "NANDNBD" || WheelActivities === "NANDOBD" || WheelActivities === "OANDNBD" || WheelActivities === "OANDOBD") && (
                                <div>
                                    <label>
                                        BD Make:

                                    </label>
                                    <input
                                        type="text"
                                        name="WheelActivityBDMake"
                                        value={WheelActivityBDMake}
                                        onChange={handleWheelActivityBDMake}
                                        placeholder="Enter BD Make"
                                    />

                                </div>
                            )}

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        {/* <div className="Pressonoffrow-3">

                        </div> */}
                         <div></div>
                        <div></div>
                        <div></div>
                        <div className="btn-containerPressonoff">
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

export default WheelActivities;

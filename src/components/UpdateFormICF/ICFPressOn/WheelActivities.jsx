import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";

function WheelActivities({
    formDataProceedSubmitPressOnICF,
    setformDataProceedSubmitPressOnICF,
    onInputChange,
    onNextStep,
    onResetStep,
}) {

    const [WheelActivities, setWheelActivities] = useState(formDataProceedSubmitPressOnICF.WheelActivities);
    const [AxleWheelSeatSize, setAxleWheelSeatSize] = useState(
        formDataProceedSubmitPressOnICF.AxleWheelSeatSize
    );

    const [WheelDiscBoreSize, setWheelDiscBoreSize] = useState(
        formDataProceedSubmitPressOnICF.WheelDiscBoreSize
    );


    const [wheelDiscStampingParticulars, setwheelDiscStampingParticulars] = useState(
        formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars
    );

    const [PressOnNumber, setPressOnNumber] = useState(
        formDataProceedSubmitPressOnICF.PressOnNumber
    );

    const [InspectorNameActivities, setInspectorNameActivities] = useState(
        formDataProceedSubmitPressOnICF.InspectorNameActivities
    );

    const [TicketNo, setTicketNo] = useState(
        formDataProceedSubmitPressOnICF.TicketNo
    );

    const [OperatorNo, setOperatorNo] = useState(
        formDataProceedSubmitPressOnICF.OperatorNo
    );

    const [WheelActivityBDMake, setWheelActivityBDMake] = useState(
        formDataProceedSubmitPressOnICF.WheelActivityBDMake
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
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            WheelActivityBDMake: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.WheelActivityBDMake);
    };

    const handleInspectorNameActivities = (event) => {
        const { value } = event.target;
        setInspectorNameActivities(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            InspectorNameActivities: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.InspectorNameActivities);
    };

    const handleTicketNo = (event) => {
        const { value } = event.target;
        setTicketNo(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            TicketNo: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.TicketNo);
    };

    const handleOperatorNo = (event) => {
        const { value } = event.target;
        setOperatorNo(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            OperatorNo: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.OperatorNo);
    };

    const handleWheelDiscBoreSize = (event) => {
        const { value } = event.target;
        setWheelDiscBoreSize(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            WheelDiscBoreSize: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.WheelDiscBoreSize);
    };

    const handlewheelDiscStampingParticulars = (event) => {
        const { value } = event.target;
        setwheelDiscStampingParticulars(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            wheelDiscStampingParticulars: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.wheelDiscStampingParticulars);
    };

    const handlePressOnNumber = (event) => {
        const { value } = event.target;
        setPressOnNumber(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            PressOnNumber: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.PressOnNumber);
    };

    const handleWheelActivities = (event) => {
        const selectedRemark = event.target.value;
        setWheelActivities(selectedRemark);

        // If "Others" is selected, we use OtherRemark, otherwise, we set Remark
        if (selectedRemark !== "others") {
            setformDataProceedSubmitPressOnICF((prevData) => ({
                ...prevData,
                WheelActivities: selectedRemark,
                // OtherRemark: "", // Clear out the OtherRemark field
            }));
        } else {
            setformDataProceedSubmitPressOnICF((prevData) => ({
                ...prevData,
                WheelActivities: "", // Clear out the Remark field
            }));
        }
    };

    const handleAxleWheelSeatSize = (event) => {
        const { value } = event.target;
        setAxleWheelSeatSize(value);
        setformDataProceedSubmitPressOnICF((prevData) => ({
            ...prevData,
            AxleWheelSeatSize: value,
        }));

        console.log(formDataProceedSubmitPressOnICF.AxleWheelSeatSize);
    };




    const handleCancel = () => {
        setformDataProceedSubmitPressOnICF((prevFormData) => ({
            ...Object.keys(prevFormData).reduce((acc, key) => {
                acc[key] = null;
                return acc;
            }, {}),
            createdBy: "ADMIN",
            SectionId: 1,
            DepartmentId: 3,
            WheeltypeId: 2,
        }));
        onResetStep();
        navigate("/parentediticf/UpdateICFPressOnForm/icf_details");
    };

    const handleBack = () => {
        setIsBackNavigation(true); // Set flag when navigating back
        navigate("/parentediticf/UpdateICFPressOnForm/operator");
    };

    const navigate = useNavigate();

    const saveandcontinue = () => {

        if (!isBackNavigation) {
            onNextStep();
            setIsBackNavigation(false);
        }
        // setIsBackNavigation(false); // Reset flag after proceeding to next step
        navigate("/parentediticf/UpdateICFPressOnForm/wheel_a1_details");
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
                PRESS-ON OF ICF WHEEL FORM{" "}
            </h2>
            <h2>Wheel Activities Details for PRESS-ON OF ICF WHEEL Form</h2>

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
                                    value={formDataProceedSubmitPressOnICF.WheelActivities}
                                    onChange={handleWheelActivities}
                                    required
                                >
                                    <option value="">Choose Wheel Activities</option>
                                    <option value="RA">RA</option>
                                    <option value="RD">RD</option>
                                    <option value="NAND">New axle & new wheel disc (NAND)/RARD</option>
                                    <option value="OAOD">Old axle & Old wheel disc  (OAOD)</option>
                                    <option value="Shift">Shift No.</option>
                                    <option value="Machine">Machine No</option>
                                </select>


                            </div>
                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NAND" || WheelActivities === "OAOD") && (
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

                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NAND" || WheelActivities === "OAOD") && (
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
                        <div className="Pressonoffrow-2">

                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NAND" || WheelActivities === "OAOD") && (
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

                            {(WheelActivities === "RA" || WheelActivities === "RD" || WheelActivities === "NAND" || WheelActivities === "OAOD") && (
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
                            {(WheelActivities === "Shift") && (
                                <div>
                                    <label>
                                        Inspector Name:
                                    </label>
                                    <input
                                        type="text"
                                        name="InspectorNameActivities"
                                        value={InspectorNameActivities}
                                        onChange={handleInspectorNameActivities}
                                        placeholder="Enter Inspector Name"
                                    />

                                </div>
                                
                            )}

                            {(WheelActivities === "Shift" || WheelActivities === "Machine") && (
                                <div>
                                    <label>
                                        Ticket No:
                                    </label>
                                    <input
                                        type="text"
                                        name="TicketNo"
                                        value={TicketNo}
                                        onChange={handleTicketNo}
                                        placeholder="Enter Ticket No"
                                    />

                                </div>
                                
                            )}

                            {(WheelActivities === "Machine") && (
                                <div>
                                    <label>
                                        Operator No:
                                    </label>
                                    <input
                                        type="text"
                                        name="OperatorNo"
                                        value={OperatorNo}
                                        onChange={handleOperatorNo}
                                        placeholder="Enter Operator No"
                                    />

                                </div>
                                
                            )}


                        </div>

                        <div className="Pressonoffrow-3">
                        {/* {(WheelActivities === "Shift" || WheelActivities === "Machine") && (
                                <div>
                                    <label>
                                        Operator No:
                                    </label>
                                    <input
                                        type="text"
                                        name="OperatorNo"
                                        value={OperatorNo}
                                        onChange={handleOperatorNo}
                                        placeholder="Enter Operator No"
                                    />

                                </div>
                                
                            )} */}

                        </div>
                        <div className="Pressonoffrow-3">

                        </div>
                        <div className="Pressonoffrow-4">

                        </div>
                        <div className="Pressonoffrow-5">

                        </div>
                        <div className="Pressonoffrow-6">

                        </div>
                        <div className="Pressonoffrow-7">

                        </div>
                        <div className="Pressonoffrow-7">

                        </div>
                        
                        <div className="btn-containerPressonoff">
                        <div>
                        <button onClick={handleBack}>Back</button>
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

export default WheelActivities;

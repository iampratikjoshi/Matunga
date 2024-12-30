// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../resources/sidebar/sidebar.css";
// import { TbBrandGoogleHome } from "react-icons/tb";
// import { RiRecordCircleLine } from "react-icons/ri";
// import { HiMiniFolderMinus } from "react-icons/hi2";
// import { LuUserCircle2 } from "react-icons/lu";
// import { GoShieldLock } from "react-icons/go";
// import { TbCheckbox } from "react-icons/tb";
// import { MdHistory } from "react-icons/md";
// // import { PiFiles } from "react-icons/pi";
// // import { IoMdTime } from "react-icons/io";
// // import { PiSuitcaseSimple } from "react-icons/pi";
// import { LuSlidersHorizontal } from "react-icons/lu";
// import { CiMemoPad } from "react-icons/ci";
// import { FaTrain } from "react-icons/fa";
// import { TbSteeringWheel } from "react-icons/tb";
// import { CiLogin } from "react-icons/ci";
// import { CiLogout } from "react-icons/ci";
// import { RiLogoutCircleLine } from "react-icons/ri";
// import { useAuth } from "./AuthContext.jsx";
// import { MdEditDocument } from "react-icons/md";

// function Sidebar() {
//   const { logout } = useAuth();

//   const navigate = useNavigate();
//   return (
//     <div className="sidebar">
//       <div className="icons-container">
//         <TbBrandGoogleHome />
//         <CiMemoPad />
//         {/* <RiRecordCircleLine /> */}
//         <TbSteeringWheel />
//         <FaTrain />
//         <FaTrain />
//         <FaTrain />
//         <FaTrain />
//         <FaTrain />
//         <CiLogin />
//         <CiLogout />
//         <LuUserCircle2 />
//         {/* <IoMdTime /> */}
//         <LuSlidersHorizontal />
//         <TbCheckbox />
//         <MdEditDocument />
//         <MdHistory />
//         <RiLogoutCircleLine />
//       </div>
//       <div className="sidebar-content">
//         {/* <div> */}
//         <div>
//           <Link to="/dashboard">Dashboard</Link>
//         </div>
//         <div>Reports</div>
//         <div>
//           <Link to="/add_wheel">PreInspection</Link>
//         </div>
//         <div className="train">
//           <div>
//             <Link to="/LHBDivisionPreInspectionForm/wheel_details">
//               LHB Division
//             </Link>
//           </div>
//           <div>
//             <Link to="/LHBSchedulePreInspection/details">LHB Schedule</Link>
//           </div>
//           <div>ICF</div>
//           <div>EMU</div>
//           <div>VB</div>
//         </div>
//         <div>Inward</div>
//         <div>Outward</div>
//         <div>User Mngt</div>
//         <div>Settings</div>
//         <div>
//           <Link to="/pending_tasks">Pending Tasks</Link>
//         </div>
//         <div>
//           <Link to="/parentedit/edit">Edit LHB</Link>
//         </div>
//         <div>
//           <Link to="/search">Search</Link>
//         </div>
//         <div
//           onClick={() => {
//             logout();
//             navigate("/login");
//           }}
//         >
//           Log Out
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/sidebar/sidebar.css";
import { TbBrandGoogleHome } from "react-icons/tb";
import { CiMemoPad, CiLogin, CiLogout } from "react-icons/ci";
import { FaTrain } from "react-icons/fa";
import { LuUserCircle2, LuSlidersHorizontal } from "react-icons/lu";
import { TbCheckbox } from "react-icons/tb";
import { MdEditDocument, MdHistory } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "./AuthContext.jsx";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { TbReportSearch } from "react-icons/tb";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isAddWheelOpen, setIsAddWheelOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleAddWheelDropdown = () => {
    setIsAddWheelOpen(!isAddWheelOpen);
  };

  const toggleSubFields = (field) => {
    if (openDropdown === field) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(field);
    }
  };

  return (
    <div className="sidebar">
      {/* <div className="icons-container common-sidebar-styles">
        <TbBrandGoogleHome />
        <CiMemoPad />
        {isAddWheelOpen && (
          <div
            style={{
              height: openDropdown === null ? "110px" : "160px", // Adjust height values as needed
            }}
          >
            <div></div>
          </div>
        )}
        <CiLogin />
        <CiLogout />
        <LuUserCircle2 />
        <LuSlidersHorizontal />
        <TbCheckbox />
        <MdEditDocument />
        <MdHistory />
        <RiLogoutCircleLine />
      </div> */}

      <div className="sidebar-content common-sidebar-styles">
        <div className="sidebar_titles">
          <Link to="/dashboard">
            <TbBrandGoogleHome style={{ marginRight: "25px" }} />
            Dashboard
          </Link>
        </div>
        <div
          onClick={toggleAddWheelDropdown}
          className="dropdown-title sidebar_titles"
        >
          <CiMemoPad style={{ marginRight: "30px" }} />
          Add Wheel
          <span style={{ fontSize: "12px" }}>
            {isAddWheelOpen ? (
              "▼"
            ) : (
              <span className="location-arrow">
                <LiaLocationArrowSolid />
              </span>
            )}
          </span>
        </div>

        {isAddWheelOpen && (
          <div className="dropdown">
            <div
              onClick={() => toggleSubFields("lhb")}
              className="dropdown-item"
              style={{ marginLeft: "40px" }}
            >
              LHB
              {openDropdown === "lhb" ? (
                "  ▼"
              ) : (
                <span className="location-arrow">
                  <LiaLocationArrowSolid />
                </span>
              )}
            </div>
            {openDropdown === "lhb" && (
              <div className="subfields" style={{ marginLeft: "40px" }}>
                <Link to="/LHBDivisionPreInspectionForm/wheel_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Division
                </Link>
                <Link to="/LHBSchedulePreInspection/details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Schedule
                </Link>
              </div>
            )}
            <div
              onClick={() => toggleSubFields("icf")}
              className="dropdown-item"
              style={{ marginLeft: "40px" }}
            >
              ICF
              {openDropdown === "icf" ? (
                "  ▼"
              ) : (
                <span className="location-arrow">
                  <LiaLocationArrowSolid />
                </span>
              )}
            </div>
            {openDropdown === "icf" && (
              <div className="subfields" style={{ marginLeft: "40px" }}>
                <Link to="/icfdivisionpreinspectionform/wheel_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Division
                </Link>
                <Link to="/icfschedulepreinspectionform/w1_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Schedule
                </Link>
                <Link to="/wearingclearanceicf/wheel_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Bearing Clearance
                </Link>
                <Link to="/icfrejectionsheetform/bearing_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Rejection Sheet
                </Link>
              </div>
            )}
            <div
              onClick={() => toggleSubFields("emu")}
              className="dropdown-item"
              style={{ marginLeft: "40px" }}
            >
              EMU
              {openDropdown === "emu" ? (
                "  ▼"
              ) : (
                <span className="location-arrow">
                  <LiaLocationArrowSolid />
                </span>
              )}
            </div>
            {openDropdown === "emu" && (
              <div className="subfields" style={{ marginLeft: "40px" }}>
                <Link to="/emudivisionpreinspectionform/wheel_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Division
                </Link>
                <Link to="/emuschedulepreinspectionform/w1_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Schedule
                </Link>
                <Link to="/wearingclearanceemu/wheel_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Bearing Clearance
                </Link>
                <Link to="/emurejectionsheetform/bearing_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Rejection Sheet
                </Link>
              </div>
            )}
            <div
              onClick={() => toggleSubFields("vb")}
              className="dropdown-item"
              style={{ marginLeft: "40px" }}
            >
              VB{" "}
              {openDropdown === "vb" ? (
                "  ▼"
              ) : (
                <span className="location-arrow">
                  <LiaLocationArrowSolid />
                </span>
              )}
            </div>
            {openDropdown === "vb" && (
              <div className="subfields" style={{ marginLeft: "40px" }}>
                <Link to="/VBDivisionPreInspectionForm/wheel_details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Division
                </Link>
                <Link to="/VBSchedulePreInspection/details">
                  <span className="location-arrow">
                    <LiaLocationArrowSolid />
                  </span>
                  Schedule
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="sidebar_titles">
          <CiLogin style={{ marginRight: "30px" }} />
          <Link to="/difference_page">Difference Page</Link>
        </div>
        {/* <div className="sidebar_titles"><CiLogout style={{ marginRight: '30px' }}/>Outward</div> */}
        <div className="sidebar_titles">
          <LuUserCircle2 style={{ marginRight: "30px" }} />
          User Mngt
        </div>
        <div className="sidebar_titles">
          <Link to="/importdata">
            <LuSlidersHorizontal style={{ marginRight: "30px" }} />
            Import Data
          </Link>
        </div>
        <div className="sidebar_titles">
          <Link to="/pending_tasks">
            <TbCheckbox style={{ marginRight: "30px" }} />
            Pending Tasks
          </Link>
        </div>
        <div className="sidebar_titles">
          <Link to="/parentedit/edit">
            <MdEditDocument style={{ marginRight: "30px" }} />
            Edit Page
          </Link>
        </div>
        <div className="sidebar_titles">
          <Link to="/search">
            <MdHistory style={{ marginRight: "30px" }} />
            Joint Inspection
          </Link>
        </div>
        <div className="sidebar_titles">
          <Link to="/repeatedpage">
            <TbReportSearch style={{ marginRight: "30px" }} />
            RETT
          </Link>
        </div>
        <div
          className="sidebar_titles"
          onClick={() => {
            logout();
            navigate("/login");
          }}
          style={{
            fontSize: "16px",
            fontWeight: "bolder",
            cursor: "pointer",
            color: "white", // Dark red color
            transition: "color 0.3s", // Smooth color transition on hover
            backgroundColor: "red", // White background color
            padding: "10px 20px", // Padding (10px top and bottom, 20px left and right)
          }}
        >
          <RiLogoutCircleLine style={{ marginRight: "30px" }} /> Log Out
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

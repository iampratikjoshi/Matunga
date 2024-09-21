import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
// import "../../resources/LHB/finalInspectionform/finalinspectionform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB() {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Axle Details", link: "axle_details"},
    { title: "Wheel Details", link: "wheel_details"},
    { title: "Journal Details", link: "journal_details"},
    { title: "BD Details", link: "bd_details"},
    { title: "CTRB Details", link: "ctrb_details"},
    { title: "CTRB Remaining Life", link: "ctrbremaininglife_details"},
    { title: "BRG Details", link: "brg_details"},
    { title: "General Inspection", link: "general_details"},
  ];

  const handleLinkClick = (link,step) => {
    setActiveLink("/lhbfinalinspection/" +link);
    
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="sidebar1">
        <ul className="sidebarlist">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                onClick={() => handleLinkClick(val.link)}
                className={
                  activeLink === "/lhbfinalinspection/" + val.link
                    ? "active"
                    : "inactive"
                }
              >
                <Link to={val.link} className="sidebar-link">
                  <div>{val.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="vertical"></div>
      </div>
    </div>
  );
}

export default SidebarLHB;

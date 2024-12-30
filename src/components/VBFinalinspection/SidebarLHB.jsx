import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
// import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";
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
    { title: "CTRB A Details", link: "ctrba_details"},
    { title: "CTRB B Details", link: "ctrbb_details"},
    { title: "General Inspection", link: "general_details"},
  ];

  const handleLinkClick = (link,step) => {
    setActiveLink("/VBfinalinspection/" +link);
    
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="sidebar1Final">
        <ul className="sidebarlistFinal">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                onClick={() => handleLinkClick(val.link)}
                className={
                  activeLink === "/VBfinalinspection/" + val.link
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

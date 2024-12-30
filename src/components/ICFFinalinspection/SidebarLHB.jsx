import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import "../../resources/LHB/preInspectionform/preInspectionform.css";
import "../../resources/LHB/FinalInspectionForm/FinalInspection.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB() {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Wheel Details", link: "wheel_details"},
    { title: "Journal Details A", link: "journalA_details"},
    { title: "Journal Details B", link: "journalB_details"},
    { title: "BRG Details A", link: "Brg_detailsA"},
    { title: "BRG Details B", link: "Brg_detailsB"},
    { title: "Details", link: "details"},
    { title: "Coller Condition Details", link: "collercondition_details"},
  ];

  const handleLinkClick = (link,step) => {
    setActiveLink("/icffinalinspection/" +link);
    
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
                  activeLink === "/icffinalinspection/" + val.link
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

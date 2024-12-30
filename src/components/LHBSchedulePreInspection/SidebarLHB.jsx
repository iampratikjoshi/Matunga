import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/NewPreInspectionForm/newpreinspectionform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarLHB() {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Details", link: "details" },
    { title: "BD And Coach Details", link: "bdandcoach_details" },
    
    { title: "CTRB A Details", link: "ctrba_details" },
    { title: "CTRB B Details", link: "ctrbb_details" },
    { title: "Repair Details", link: "repair_details" },
    
  ];

  const handleLinkClick = (link) => {
    setActiveLink("/LHBSchedulePreInspection/" +link);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="sidebar1PreInspection">
        <ul className="sidebarlistPreInspection">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                onClick={() => handleLinkClick(val.link)}
                className={
                  activeLink === "/LHBSchedulePreInspection/" + val.link
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
      {/* <div className="sidebar_mobile">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [0,0] }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
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
          </motion.div>
        )}
      </div> */}
    </div>
  );
}

export default SidebarLHB;

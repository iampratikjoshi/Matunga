import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../resources/LHB/preInspectionform/preInspectionform.css";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

function SidebarICF() {
    const [toggle, setToggle] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const SidebarData = [
    { title: "Details", link: "icf_details" },
    { title: "Wheel Size", link: "wheel_size" },
    { title: "RA Value", link: "ra_value" },
    { title: "Operator", link: "operator" },
    { title: "Wheel Activities", link: "wheel_activities" },
    { title: "Wheel disc 'A' Side - 1", link: "wheel_a1_details" },
    { title: "Wheel disc 'A' Side - 2", link: "wheel_a2_details" },
    { title: "Wheel disc 'A' Side - 3", link: "wheel_a3_details" },
    { title: "Wheel disc 'B' Side - 1", link: "wheel_b1_details" },
    { title: "Wheel disc 'B' Side - 2", link: "wheel_b2_details" },
    { title: "Wheel disc 'B' Side - 3", link: "wheel_b3_details" },
    { title: "Operator Details", link: "operator_details" },
  ];

  const handleLinkClick = (link) => {
    setActiveLink("/icf_presson/" +link);
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div>
      <div className="sidebar1">
        <ul className="sidebarlistPressonoff">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                onClick={() => handleLinkClick(val.link)}
                className={
                  activeLink === "/icf_presson/" + val.link
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

export default SidebarICF;

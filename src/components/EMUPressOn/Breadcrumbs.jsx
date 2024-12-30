import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        // console.log(pathnames, breadcrumbPath);
       
        if (name == "emu_presson") {
          name = "EMU PressOn";
        }
        if (name == "emu_details") {
          name = "Details";
        }
        if (name == "wheel_size") {
          name = "Wheel Size";
        }
        if (name == "ra_value") {
          name = "RA Value";
        }

        if (name == "operator") {
          name = "Operator";
        }

        if (name == "wheel_a1_details") {
          name = "Wheel disc 'A' Side-1";
        }
        if (name == "wheel_a2_details") {
          name = "Wheel disc 'A' Side-2";
        }
        if (name == "wheel_a3_details") {
          name = "Wheel disc 'A' Side-3";
        }
        if (name == "wheel_b1_details") {
          name = "Wheel disc 'B' Side-1";
        }
        if (name == "wheel_b2_details") {
          name = "Wheel disc 'B' Side-2";
        }
        if (name == "wheel_b3_details") {
          name = "Wheel disc 'B' Side-3";
        }
        
        function formatName(name) {
          return name
            .split("_") // Split the string by underscores
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
            .join(" "); // Join the words with a space
        }

        if (name.includes("_")) {
          name = formatName(name);
        }

        return isLast ? (
          <span key={breadcrumbPath}>
            <MdKeyboardArrowRight /> {name}
          </span>
        ) : (
          <span key={breadcrumbPath}>
            <MdKeyboardArrowRight /> <Link to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

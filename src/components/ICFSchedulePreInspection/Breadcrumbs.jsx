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
       
        if (name == "icfschedulepreinspectionform") {
          name = "ICF Pre-Inspection";
        }
        if (name == "w1_details") {
          name = "Wheel Details-1";
        }
        if (name == "w2_details") {
          name = "Wheel Details-2";
        }
        if (name == "repair_details") {
          name = "Repair Details";
        }

        if (name == "brg_details") {
          name = "BRG Details";
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

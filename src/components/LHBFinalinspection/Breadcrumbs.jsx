import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  let breadcrumbPath = "";

  return (
    <div className="breadcrumbs">
      <Link to="/dashboard">Home</Link>
      {pathnames.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;
        // console.log(pathnames, breadcrumbPath);

        if (name == "lhbfinalinspection") {
          name = "LHB Final Inspection";
        }
        if (name == "ctrb_details") {
          name = "CTRB Details";
        }
        if (name == "ctrbremaininglife_details") {
          name = "CTRB Remaining Life";
        }

        function formatName(name) {
            return name
              .split('_')                        // Split the string by underscores
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))  // Capitalize the first letter of each word
              .join(' ');                        // Join the words with a space
        }

        if(name.includes("_")){
            name = formatName(name);
        }

        return isLast ? (
          <span key={breadcrumbPath}>
            {" "}
            <MdKeyboardArrowRight /> {name}
          </span>
        ) : (
          <span key={breadcrumbPath}>
            {" "}
            <MdKeyboardArrowRight /> <Link to={breadcrumbPath}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
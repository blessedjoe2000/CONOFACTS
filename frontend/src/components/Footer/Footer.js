import { Link } from "react-router-dom";
import "./footer.css";
import { useSelector } from "react-redux";

function Footer() {
  const mode = useSelector((state) => state?.mode?.mode);

  return (
    <div className="footer" id={mode === "dark" ? "dark-mode" : ""}>
      <Link to="/">
        <div className="logo">CONOFACTS</div>
      </Link>
      <p>All right reserved. 2023</p>
    </div>
  );
}

export default Footer;

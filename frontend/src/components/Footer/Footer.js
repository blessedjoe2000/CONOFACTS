import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <Link to="/">
          <div className="logo">CONOFACTS</div>
        </Link>
        <p>All right reserved. 2023</p>
      </div>
    </>
  );
}

export default Footer;

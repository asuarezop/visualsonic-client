import "./Header.scss";
import mainLogo from "../../assets/logo/VisualSonic Logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <main>
        <header className="header">
          <nav className="nav">
            <div className="nav-logo">
              <img
                className="nav-logo__main"
                src={mainLogo}
                alt="VisualSonic logo"
              />
            </div>
            <div className="nav-links">
              <Link to="/login">
                <p className="nav-links__link">Login</p>
              </Link>
              <Link to="/signup">
                <p className="nav-links__link">Sign Up</p>
              </Link>
              {/* <Link to="/about">
                <p className="nav-links__link nav-links__link--hidden">About</p>
              </Link> */}
            </div>
          </nav>
        </header>
      </main>
    </>
  );
}

export default Header;

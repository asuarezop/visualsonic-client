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
              {/* <Link className="nav-links__anchor" to="/login">
                <p className="nav-links__link">Login</p>
              </Link> */}
              <Link to="/signup">
                <button className="nav-links__link nav-links__link--cta">
                  Sign Up
                </button>
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

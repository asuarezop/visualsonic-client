import "./Footer.scss";
import facebookLogo from "../../assets/icons/logo-facebook.svg";
import instagramLogo from "../../assets/icons/logo-instagram.svg";
import twitterLogo from "../../assets/icons/logo-twitter.svg";
import youtubeLogo from "../../assets/icons/logo-youtube.svg";

function Footer() {
  return (
    <>
      <footer className="footer">
        <section className="learn-more">
          <h2 className="learn-more__title">Learn More</h2>
          <div className="more-info">
            <div className="more-info-credit">
              <h3 className="more-info-credit__sub-title">
                Inspiration/Special Thanks
              </h3>
              <p className="more-info-credit__sub-text">
                Colorful Coding and The Coding Train YT channels
              </p>
              <p className="more-info-credit__sub-text">
                Ed Baafi, Jajuan Burton, Anthony Quispe, Kyla Ester and the rest
                of the team at BrainStation for all the great resources and
                support.
              </p>
            </div>
            <div className="more-info-contact">
              <h3 className="more-info-contact__title">Contact</h3>
              <p className="more-info-contact__text">info@visualsonic.com</p>
            </div>
            <div className="more-info-socials">
              <h3 className="more-info-socials__title">Socials</h3>
              <div className="socials-box">
                <img
                  className="socials-box__icons"
                  src={facebookLogo}
                  alt="facebook logo"
                />
                <img
                  className="socials-box__icons"
                  src={instagramLogo}
                  alt="instagram logo"
                />
                <img
                  className="socials-box__icons"
                  src={twitterLogo}
                  alt="twitter logo"
                />
                <img
                  className="socials-box__icons"
                  src={youtubeLogo}
                  alt="youtube logo"
                />
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;

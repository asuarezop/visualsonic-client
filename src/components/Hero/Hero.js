import "./Hero.scss";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1 className="hero-text__headline">
            Elevate your music experience through our pre-built audio
            visualizers.
          </h1>
          <p className="hero-text__mission">
            Designed for the busy creator and audio enthusiast. We provide the
            tools to augment your music and your artist brand.
          </p>
          <Link to="/visualizer">
            <button className="hero-text__trynow hero-text__trynow--cta">
              Try for free
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Hero;

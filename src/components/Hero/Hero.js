import "./Hero.scss";

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
          <button className="hero-text__trynow">Try for free</button>
        </div>
      </section>
    </>
  );
}

export default Hero;

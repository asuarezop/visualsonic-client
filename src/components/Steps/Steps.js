import "./Steps.scss";
import mp3Icon from "../../assets/icons/file-audio-regular.svg";
import mouseClick from "../../assets/icons/iconmonstr-cursor-7.svg";
import imgIcon from "../../assets/icons/image-regular.svg";
import gearCog from "../../assets/icons/cog-outline.svg";

function Steps() {
  return (
    <>
      <section className="steps">
        <h2 className="steps__title">
          How to start using interactive audio visualizer
        </h2>
        <div className="steps-col">
          <div className="step">
            <img className="step__img" src={gearCog} alt="waveform icon" />
            <p className="step__text">
              1. On top-left corner, hit the Gear icon to load up custom
              settings
            </p>
          </div>
          <div className="step">
            <img className="step__img" src={mp3Icon} alt="mp3 file icon" />
            <p className="step__text">
              2. Select an mp3 file from your local computer to play with media
              (feature coming soon)
            </p>
          </div>
          <div className="step">
            <img
              className="step__img"
              src={imgIcon}
              alt="background img icon"
            />
            <p className="step__text">
              3. Pick a custom background-image to display alongside your track
              (feature coming soon)
            </p>
          </div>
          <div className="step">
            <img
              className="step__img"
              src={mouseClick}
              alt="mouse click icon"
            />
            <p className="step__text step__text--margin">
              4. Click Apply on the top-right corner to save settings and load
              your custom visualizer
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Steps;

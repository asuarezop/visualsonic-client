import "./Steps.scss";
import mp3Icon from "../../assets/icons/file-audio-regular.svg";
import mouseClick from "../../assets/icons/iconmonstr-cursor-7.svg";
import imgIcon from "../../assets/icons/image-regular.svg";
import waveIcon from "../../assets/icons/iconmonstr-sound-wave-4.svg";

function Steps() {
  return (
    <>
      <section className="steps">
        <h2 className="steps__title">Getting Started</h2>
        <div className="steps-col">
          <div className="step">
            <img className="step__img" src={waveIcon} alt="waveform icon" />
            <p className="step__text">
              1. Choose a visualizer style that best fits your needs
            </p>
          </div>
          <div className="step">
            <img className="step__img" src={mp3Icon} alt="mp3 file icon" />
            <p className="step__text">
              2. Select an mp3 file from your local computer to play with media
            </p>
          </div>
          <div className="step">
            <img
              className="step__img"
              src={imgIcon}
              alt="background img icon"
            />
            <p className="step__text">
              3. Pick a background image to display alongside your track (must
              be in JPEG format)
            </p>
          </div>
          <div className="step">
            <img
              className="step__img"
              src={mouseClick}
              alt="mouse click icon"
            />
            <p className="step__text">
              4. Click anywhere on the screen to sync track with visualizer
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Steps;

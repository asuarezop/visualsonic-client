import './VisualizerControls.scss';
import { useState } from 'react';
import gearIcon from '../../assets/icons/gear-solid.svg';
import VisualizerDropDown from '../VisualizerDropDown/VisualizerDropDown';

function VisualizerControls({ play, pause, restart, userSettings }) {
  //To toggle drop down menu and user sketch
  const [dropDown, setDropDown] = useState(false);

  //To apply user settings to visualizer
  // const handleApplyOptions = () => {
  //   const uploadedSettings = {
  //     ...userSettings,
  //     newAudio: audioFile,
  //     newImage: imageFile,
  //     newColor: selectedColor,
  //     newStyle: selectedStyle,
  //   };

  //   setUserSettings(uploadedSettings);

  //   // setRemoveCanvas(true);
  // };

  return (
    <div className="visualizer-panel">
      <div className="visualizer-controls">
        <div
          onClick={(e) => setDropDown(!dropDown)}
          className="visualizer-settings"
        >
          <img
            className="visualizer-settings__icon"
            src={gearIcon}
            alt="Gear cog icon"
          />
        </div>
        <div className="visualizer-playback">
          <button className="visualizer-playback__play" onClick={play}>
            Play
          </button>
          <button className="visualizer-playback__pause" onClick={pause}>
            Pause
          </button>
          <button className="visualizer-playback__restart" onClick={restart}>
            Restart
          </button>
        </div>
        <div className="visualizer-apply">
          <button
            // onClick={handleApplyOptions}
            className="visualizer-apply__btn"
          >
            Apply
          </button>
        </div>
      </div>

      <VisualizerDropDown isDropDown={dropDown} userSettings={userSettings} />
    </div>
  );
}

export default VisualizerControls;

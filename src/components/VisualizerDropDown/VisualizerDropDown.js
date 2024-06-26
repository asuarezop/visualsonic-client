import { useState } from 'react';
import { v4 } from 'uuid';
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uploadIcon from '../../assets/icons/upload-solid.svg';
import './VisualizerDropDown.scss';

function VisualizerDropDown({ isDropDown }) {
  //To store user input for audio, image, and color
  const [audioFile, setAudioFile] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  //To set state of file names
  const [audioName, setAudioName] = useState('');
  const [imageName, setImageName] = useState('');
  const [colorName, setColorName] = useState('');

  //To store file URL for reading back data
  const [audioURL, setAudioURL] = useState('');
  const [imageURL, setImageURL] = useState('');

  //Setting user song selection (ONLY USEFUL FOR CONFIRMATION)
  const handleAudioFile = async (e) => {
    try {
      const uploadedAudioFile = e.target.files[0];
      setAudioName(uploadedAudioFile.name);
      setAudioFile(uploadedAudioFile);

      console.log('New audio file loaded:', audioFile);
    } catch (err) {
      console.error(err);
    }
  };

  //Retrieving the uploaded audio file from Firebase Storage
  const handleAudioUpload = () => {
    if (audioFile == null) {
      return;
    }

    const audioRef = ref(storage, `audio/${audioFile.name + v4()}`);
    uploadBytes(audioRef, audioFile).then((snapshot) => {
      alert('New audio file uploaded');
      getDownloadURL(snapshot.ref).then((url) => {
        setAudioURL(url);
      });
    });
  };

  //Setting user image selection (ONLY USEFUL FOR CONFIRMATION)
  const handleImageFile = async (e) => {
    try {
      const uploadedImageFile = e.target.files[0];
      setImageName(uploadedImageFile.name);
      setImageFile(uploadedImageFile);

      console.log('New image file loaded:', uploadedImageFile);
    } catch (err) {
      console.error(err);
    }
  };

  //Retrieving the uploaded image file from Firebase Storage
  const handleImageUpload = () => {
    if (imageFile == null) {
      return;
    }

    const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    uploadBytes(imageRef, imageFile).then((snapshot) => {
      alert('New image file uploaded');
      getDownloadURL(snapshot.ref).then((url) => {
        setImageURL(url);
      });
    });
  };

  //Setting user visualizer color selection
  function handleColor(e) {
    const visualizerColor = e.target.value;
    setColorName(visualizerColor);
    setSelectedColor(visualizerColor);
    console.log('New visualizer color loaded:', e.target.value);
  }

  //Setting user visualizer style selection
  function handleStyleChange(e) {
    const visualizerStyle = e.target.value;
    setSelectedStyle(visualizerStyle);
    console.log('New visualizer style loaded:', visualizerStyle);
  }

  return (
    isDropDown && (
      <div className="upload-files">
        <span className="upload-files__title">
          Select a song, image, and color to generate your visualizer (song and
          image not yet available)
        </span>
        <div className="selected-audio">
          <input
            onChange={handleAudioFile}
            className="selected-audio__input"
            id="soundFile"
            type="file"
            name="soundFile"
            accept="audio/*"
          ></input>
          <label htmlFor="soundFile" className="selected-audio__placeholder">
            <img
              className="selected-audio__icon"
              src={uploadIcon}
              alt="upload icon"
            />
            &nbsp;Select audio file
          </label>
          <div className="upload-audio">
            <button
              onClick={handleAudioUpload}
              className="upload-audio__btn upload-audio__btn--hover"
            >
              Upload Audio
            </button>
          </div>
        </div>
        <span className="selected-file">
          <strong className="selected-file__text">Chosen file: </strong>
          <span id="file-name">{audioName}</span>
        </span>
        <div className="selected-image">
          <input
            onChange={handleImageFile}
            className="selected-image__input"
            id="imageFile"
            type="file"
            name="imageFile"
            accept="image/*"
          ></input>
          <label htmlFor="imageFile" className="selected-image__placeholder">
            <img
              className="selected-image__icon"
              src={uploadIcon}
              alt="upload icon"
            />
            &nbsp;Select image file
          </label>
          <div className="upload-image">
            <button
              onClick={handleImageUpload}
              className="upload-image__btn upload-image__btn--hover"
            >
              Upload Image
            </button>
          </div>
        </div>
        <span className="selected-file">
          <strong className="selected-file__text">Chosen file: </strong>
          <span id="file-name">{imageName}</span>
        </span>
        <div className="visualizer-color">
          <label htmlFor="visualizerColor" className="form-input__title">
            Visualizer Color:
            <input
              className="form-input__color"
              id="visualizerColor"
              type="color"
              name="visualizerColor"
              placeholder="Choose your visualizer color"
              onChange={handleColor}
            ></input>
          </label>
        </div>
        <div className="selected-style">
          <label htmlFor="visualizerListings" className="selected-style__title">
            Choose your visualizer style: (feature coming soon)
          </label>
          <select
            className="selected-style__options"
            id="visualizerListings"
            onChange={handleStyleChange}
            value={selectedStyle}
          >
            <option value="bar">Bar visualizer</option>
            <option value="simple">Simple line visualizer</option>
          </select>
        </div>
      </div>
    )
  );
}

export default VisualizerDropDown;

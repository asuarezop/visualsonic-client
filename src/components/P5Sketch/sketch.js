import React, { useEffect } from 'react';
import Sketch from 'react-p5';
import { useState } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
import './sketch.scss';
import { storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid';
// import UserSketch from '../UserSketch/UserSketch';
import songFile from '../../assets/sounds/81BPM_Massive_(Original Mix).mp3';
import imgFile from '../../assets/images/Home Screen Background.jpg';
import uploadIcon from '../../assets/icons/upload-solid.svg';
import gearIcon from '../../assets/icons/gear-solid.svg';
require('p5/lib/addons/p5.sound');

//REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)
//All variables used for below functions must be declared outside the component
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let song;
let img;
let fft;
let amp;
let particles = [];

function P5Sketch(props) {
  //To store user input for audio, image, and color
  const [audioFile, setAudioFile] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  //To store file URL for reading back data
  const [audioURL, setAudioURL] = useState(songFile);
  const [imageURL, setImageURL] = useState(imgFile);

  //To show progress bar of user uploaded files
  const [fileProgress, setFileProgress] = useState(0);

  //To update new user selections
  // const [userSettings, setUserSettings] = useState({
  //   newAudio: songFile,
  //   newImage: imgFile,
  //   newColor: '#000',
  //   newStyle: 'Circle',
  // });

  //To toggle drop down menu and user sketch
  const [dropDown, setDropDown] = useState(false);
  const [removeCanvas, setRemoveCanvas] = useState(false);

  //To set state of file names
  const [audioName, setAudioName] = useState('');
  const [imageName, setImageName] = useState('');
  const [colorName, setColorName] = useState('');

  useEffect(() => {
    if (imageURL !== null || audioURL !== null) {
      console.log('Updated image URL:', imageURL);
      console.log('Updated audio URL:', audioURL);
    }
  }, [imageURL, audioURL]);

  //Setting user song selection
  const handleAudioFile = async (e) => {
    try {
      const uploadedAudioFile = e.target.files[0];
      setAudioName(uploadedAudioFile.name);
      setAudioFile(uploadedAudioFile);

      console.log('New audio file loaded:', uploadedAudioFile);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAudioUpload = async () => {
    if (audioFile == null || !audioFile) {
      return;
    }

    const audioRef = ref(storage, `audio/${audioFile.name + v4()}`);
    try {
      const uploadTask = await uploadBytesResumable(audioRef, audioFile);
      alert('New audio file uploaded');

      const url = await getDownloadURL(uploadTask.task.snapshot.ref);
      setAudioURL(url);

      console.log('Old Audio URL:', audioURL);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  //Setting user image selection
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

  const handleImageUpload = async () => {
    if (imageFile == null || !imageFile) {
      return;
    }

    const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    try {
      const uploadTask = await uploadBytesResumable(imageRef, imageFile);
      alert('New image file uploaded');
      //To show progress of uploaded image file
      // uploadTask.task.on(
      //   'state_changed',
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     setFileProgress(progress);
      //   },
      //   (err) => console.log(err)
      // );

      const url = await getDownloadURL(uploadTask.task.snapshot.ref);
      setImageURL(url);

      console.log('Old Image URL:', imageURL);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  /* Need to figure out a way to make newly updated image URL
  be available to use for setup function inside p5
  -How can I trigger p5 to render things in setup() or preload() a 2nd time or when an event happens?
  -Can I do this without creating a new p5 instance and if I do, how can I do it properly without React throwing errors?
  -How can I turn remote URL into relative HTML path:
    The path to the image should be relative to the HTML file that links in your sketch.
    Loading an image from a URL or other remote location may be blocked due to your browser's built-in security.
  */

  //Setting user visualizer color selection
  // function handleColor(e) {
  //   const visualizerColor = e.target.value;
  //   setColorName(visualizerColor);
  //   setSelectedColor(visualizerColor);
  //   console.log('New visualizer color loaded:', e.target.value);
  // }

  // //Setting user visualizer style selection
  // function handleStyleChange(e) {
  //   const visualizerStyle = e.target.value;
  //   setSelectedStyle(visualizerStyle);
  //   console.log('New visualizer style loaded:', visualizerStyle);
  // }

  const preload = (p) => {
    // p.soundFormats('mp3', 'wav', 'm4a');
    img = p.loadImage(imageURL, imgLoaded);
  };

  function songLoaded(song) {
    songFile = song;
    console.log('Your song has succesfully loaded');
  }

  function imgLoaded(img) {
    imgFile = img;
    console.log('Your image has succesfully loaded');
  }

  const setup = (p, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    song = p.loadSound(audioURL, songLoaded);

    // song = p.loadSound(userSettings.newAudio, songLoaded);
    // img = p.loadImage(userSettings.newImage, imgLoaded);

    p.angleMode(p.DEGREES);
    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);

    fft = new window.p5.FFT(0.3);

    // img.filter(p.BLUR, 5);

    // p.noLoop();
  };

  const draw = (p) => {
    // if (removeCanvas) {
    //   p.remove();
    // }

    p.background(0);

    //Make changes to waveform stroke line here:
    p.stroke(selectedColor);
    p.noFill();

    // let wave = fft.waveform();

    p.translate(canvasWidth / 2, canvasHeight / 2);

    // fft.analyze();

    // amp = fft.getEnergy(20, 200);

    p.push();
    // if (amp > 242) {
    //   p.rotate(p.random(-0.2, 0.2));
    // }

    p.image(img, 0, 0, canvasWidth + 100, canvasHeight + 100);
    p.pop();

    // let alpha = p.map(amp, 0, 255, 180, 150);
    // p.fill(0, alpha);
    p.noStroke();
    p.rect(0, 0, canvasWidth, canvasHeight);

    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();

    // for (let t = -1; t <= 1; t += 2) {
    //   p.beginShape();

    //   for (let i = 0; i < 180; i += 0.5) {
    //     //Specifiying to use the audio of the waveform as index, must be converted to an integer
    //     let index = p.floor(p.map(i, 0, canvasWidth, 180, wave.length - 1));

    //     //r (radius) mapped to wave index, with minimum and maximum radians of circle in last two arguments
    //     let r = p.map(wave[index], -1, 1, 150, 350);

    //     //x position be equal to radius(r) times sin(), times (t) variable to create both sides of visualizer
    //     let x = r * p.sin(i) * t;
    //     //y position be equal to radius(r) times cos(), polar coordinates Y
    //     let y = r * p.cos(i);
    //     //change the line shape of waveform
    //     p.vertex(x, y);
    //   }
    //   p.endShape();
    // }

    // let particle = new Particle(p);
    // particles.push(particle);

    // for (let i = particles.length - 1; i >= 0; i--) {
    //   if (!particles[i].edges()) {
    //     particles[i].update(amp > 242, p);
    //     particles[i].show(p);
    //   } else {
    //     particles.splice(i, 1);
    //   }
    // }
  };

  //Visualizer controls
  const play = () => {
    if (!song) {
      return;
    }

    if (!song.isPlaying()) {
      song.play();
    }
  };

  const pause = () => {
    if (!song) {
      return;
    }
    song.pause();
  };

  const restart = () => {
    if (!song) {
      return;
    }
    if (song.isPaused()) {
      song.playMode('restart');
      song.play();
    } else {
      song.playMode('restart');
      song.play();
    }
  };

  // const handleApplyOptions = () => {
  //   const uploadedSettings = {
  //     ...userSettings,
  //     newAudio: audioFile,
  //     newImage: imageFile,
  //     newColor: selectedColor,
  //     newStyle: selectedStyle,
  //   };

  //   setUserSettings(uploadedSettings);

  //   setRemoveCanvas(true);
  // };

  // class Particle {
  //   constructor(p) {
  //     this.pos = p.constructor.Vector.random2D().mult(250);
  //     this.vel = p.createVector();
  //     this.acc = this.pos.copy().mult(p.random(0.0001, 0.00001));

  //     this.w = p.random(3, 5);
  //     this.color = [p.random(200, 255), p.random(200, 255), p.random(200, 255)];
  //   }
  //   update(condition) {
  //     this.vel.add(this.acc);
  //     this.pos.add(this.vel);

  //     if (condition) {
  //       this.pos.add(this.vel);
  //       this.pos.add(this.vel);
  //       this.pos.add(this.vel);
  //     }
  //   }
  //   edges() {
  //     if (
  //       this.pos.x < -canvasWidth / 2 ||
  //       this.pos.x > canvasWidth / 2 ||
  //       this.pos.y < -canvasHeight / 2 ||
  //       this.pos.y > canvasHeight / 2
  //     ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  //   show(p) {
  //     p.noStroke();
  //     p.fill(this.color);
  //     p.ellipse(this.pos.x, this.pos.y, this.w);
  //   }
  // }

  return (
    <>
      <main className="visualizer">
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
              <button
                className="visualizer-playback__restart"
                onClick={restart}
              >
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
          {dropDown && (
            <div className="upload-files">
              <span className="upload-files__title">
                Select a song, image, and color to generate your visualizer
                (song and image not yet available)
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
                <label
                  htmlFor="soundFile"
                  className="selected-audio__placeholder"
                >
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
                <label
                  htmlFor="imageFile"
                  className="selected-image__placeholder"
                >
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
              {fileProgress && (
                <span className="image-progress">
                  <strong className="image-progress__text">Uploading: %</strong>
                  <span id="file-progress">{fileProgress} </span>
                </span>
              )}
              <div className="visualizer-color">
                <label htmlFor="visualizerColor" className="form-input__title">
                  Visualizer Color:
                  <input
                    className="form-input__color"
                    id="visualizerColor"
                    type="color"
                    name="visualizerColor"
                    placeholder="Choose your visualizer color"
                    // onChange={handleColor}
                  ></input>
                </label>
              </div>
              <div className="selected-style">
                <label
                  htmlFor="visualizerListings"
                  className="selected-style__title"
                >
                  Choose your visualizer style: (coming soon feature)
                </label>
                <select
                  className="selected-style__options"
                  id="visualizerListings"
                  // onChange={handleStyleChange}
                  value={selectedStyle}
                >
                  <option value="bar">Bar visualizer</option>
                  <option value="simple">Simple line visualizer</option>
                </select>
              </div>
            </div>
          )}
        </div>
        {/* {removeCanvas ? (
          <UserSketch
            setup={setup}
            draw={draw}
            preload={preload}
            audioURL={audioURL}
            imageURL={imageURL}
          />
        ) : (
          <Sketch setup={setup} draw={draw} preload={preload} />
        )} */}
        <Sketch setup={setup} draw={draw} preload={preload} />
      </main>
    </>
  );
}

export default P5Sketch;

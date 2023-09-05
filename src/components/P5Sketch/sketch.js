import React, { useEffect } from "react";
import Sketch from "react-p5";
import { useState } from "react";
import "p5/lib/addons/p5.sound";
import "./sketch.scss";
import uploadIcon from "../../assets/icons/upload-solid.svg";
import gearIcon from "../../assets/icons/gear-solid.svg";
import p5 from "p5";
// import songFile from "../../assets/sounds/09 Underwater Echo.mp3";
// import imgFile from "../../assets/images/Home Screen Background.jpg";
// import menuIcon from "../../assets/icons/menu-outline.svg";

// //REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)

// //All variables used for below functions must be declared outside the component
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let song;
let img;
let fft;
let amp;
let particles = [];

function P5Sketch(props) {
  const [userAudio, setUserAudio] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [userSettings, setUserSettings] = useState({
    newAudio: "",
    newImage: "",
    newColor: "#000",
  });
  const [isLoading, setIsLoading] = useState(false);

  //Preload function
  const preload = (p) => {
    p.soundFormats("mp3", "wav");
    document.addEventListener("click", () => {
      p.getAudioContext()
        .resume()
        .then(() => {
          // console.log("Audio context resumed successfully");
        })
        .catch((error) => {
          // console.log("Failed to resume audio context:", error);
        });
    });
  };
  const setup = (p) => {
    p.createCanvas(canvasWidth, canvasHeight).parent("sketch-container");
    p.getAudioContext().suspend();

    if (userAudio) {
      loadAudioWrapper(p, userAudio);
    }

    if (userImage) {
      loadImageWrapper(p, userImage);
    }

    //Checking load time of sketch setup
    console.log(p.floor(p.millis()) + "milliseconds");

    p.angleMode(p.DEGREES);
    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);
    fft = new window.p5.FFT(0.3);
    // img.filter(p.BLUR, 5);
  };
  const draw = (p) => {
    //WORKS WITH NEW OBJECT CREATED
    p.background(userSettings.newColor);
  };

  // ----------------------- FUNCTIONS -----------------------------------

  //Setting user song selection
  function handleAudioFile(e) {
    const uploadedAudioFile = e.target.files[0];
    setUserAudio(uploadedAudioFile.name);
    console.log("New audio file loaded:", uploadedAudioFile);
  }

  //Setting user image selection
  function handleImageFile(e) {
    const uploadedImageFile = e.target.files[0];
    setUserImage(uploadedImageFile.name);
    console.log("New image file loaded:", uploadedImageFile);
  }

  //Setting user visualizer color selection
  function handleColor(e) {
    const visualizerColor = e.target.value;
    setSelectedColor(visualizerColor);
    console.log("New visualizer color loaded:", e.target.value);
  }

  //Applying user's selection to be used in sketch
  function handleApplyOptions(p) {
    const updatedSettings = {
      ...userSettings,
      newAudio: userAudio,
      newImage: userImage,
      newColor: selectedColor,
    };

    //Apply new settings to sketch after 5 seconds
    setTimeout(() => {
      setUserSettings(updatedSettings);
      loadingMedia(updatedSettings);
    }, 5000);

    console.log(userSettings.newAudio);
  }

  //WRAPPER FUNCTION TO LOAD IN USER AUDIO
  function loadAudioWrapper(p, audioFilePath) {
    if (audioFilePath) {
      p.loadSound(audioFilePath, (loadedSong) => {
        song = loadedSong;
        setIsAudioLoaded(true);
        console.log("Song loaded successfully", song);
        fft = new window.p5.FFT(0.3);
        //Starting the sketch loop, to keep user song selection persisting between re-renders
        song.loop();
      });
    }
  }

  //WRAPPER FUNCTION TO LOAD IN USER IMAGE
  function loadImageWrapper(p, imageFilePath) {
    if (imageFilePath) {
      p.loadImage(imageFilePath, (loadedImage) => {
        img = loadedImage;
        setIsImageLoaded(true);
        console.log("Image loaded successfully", img);
      });
    }
  }

  const loadingMedia = (settings) => {
    const { newAudio, newImage } = userSettings;
    loadAudioWrapper(newAudio);
    loadImageWrapper(newImage);
  };

  // //VISUALIZER RENDER
  // const draw = (p) => {
  //   //WORKS WITH NEW OBJECT CREATED
  //   p.background(userSettings.newColor);

  //   //Make changes to waveform stroke line here:
  //   // p.stroke(255);
  //   // p.noFill();
  //   // p.translate(canvasWidth / 2, canvasHeight / 2);
  //   // NOTE: Do not use setState in the draw function or in functions that are executed
  //   // in the draw function...
  //   // please use normal variables or class properties for these purposes
  //   // x++;
  //   // let wave = fft.waveform();
  //   // fft.analyze();
  //   // amp = fft.getEnergy(20, 200);
  //   // p.push();
  //   // if (amp > 240) {
  //   //   p.rotate(p.random(-0.5, 0.5));
  //   // }
  //   // p.image(img, 0, 0, canvasWidth + 100, canvasHeight + 100);
  //   // p.pop();
  //   // let alpha = p.map(amp, 0, 255, 180, 150);
  //   // p.fill(0, alpha);
  //   // p.noStroke();
  //   // p.rect(0, 0, canvasWidth, canvasHeight);
  //   // p.stroke(255);
  //   // p.strokeWeight(3);
  //   // p.noFill();
  //   // for (let t = -1; t <= 1; t += 2) {
  //   //   p.beginShape();
  //   //   for (let i = 0; i < 180; i += 0.5) {
  //   //     //Specifiying to use the audio of the waveform as index, must be converted to an integer
  //   //     let index = p.floor(p.map(i, 0, canvasWidth, 180, wave.length - 1));
  //   //     //r (radius) mapped to wave index, with minimum and maximum radians of circle in last two arguments
  //   //     let r = p.map(wave[index], -1, 1, 150, 350);
  //   //     //x position be equal to radius(r) times sin(), times (t) variable to create both sides of visualizer
  //   //     let x = r * p.sin(i) * t;
  //   //     //y position be equal to radius(r) times cos(), polar coordinates Y
  //   //     let y = r * p.cos(i);
  //   //     //change the line shape of waveform
  //   //     p.vertex(x, y);
  //   //   }
  //   //   p.endShape();
  //   // }
  //   // let particle = new Particle(p);
  //   // particles.push(particle);
  //   // for (let i = particles.length - 1; i >= 0; i--) {
  //   //   if (!particles[i].edges()) {
  //   //     particles[i].update(amp > 240, p);
  //   //     particles[i].show(p);
  //   //   } else {
  //   //     particles.splice(i, 1);
  //   //   }
  //   // }
  // };

  //Visualizer controls
  const play = () => {
    if (!song) {
      return;
    }
    if (song && song.isLoaded() && !song.isPlaying()) {
      song.setVolume(1.0);
      song.play();
      console.log("Starting song");
    }
  };

  const pause = () => {
    if (!song) {
      return;
    }
    if (song.isPlaying()) {
      song.pause();
    }
  };

  const restart = () => {
    if (!song) {
      return;
    }
    if (song.isPaused()) {
      song.playMode("restart");
      song.play();
    } else {
      song.playMode("restart");
      song.play();
    }
  };

  // function windowResized(p) {
  //   p.resizeCanvas(canvasWidth, canvasHeight);
  // }
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
                onClick={(p) => handleApplyOptions(p)}
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
                <span className="selected-file">
                  <strong className="selected-file__text">Chosen file: </strong>
                  <span id="file-name">{userAudio}</span>
                </span>
              </div>
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
                <span className="selected-file">
                  <strong className="selected-file__text">Chosen file: </strong>
                  <span onChange={handleImageFile} id="file-name">
                    {userImage}
                  </span>
                </span>
              </div>
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
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div id="sketch-container">
            <Sketch setup={setup} draw={draw} preload={preload} />
          </div>
        )}
      </main>
    </>
  );
}

export default P5Sketch;

import { ReactP5Wrapper } from '@p5-wrapper/react';
import { Howl, Howler } from 'howler';
import React, { useEffect, useState } from 'react';
import 'p5/lib/addons/p5.sound';
import { v4 } from 'uuid';
import { storage } from '../../config/firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import imgFile from '../../assets/images/Home Screen Background.jpg';
import songFile from '../../assets/sounds/81BPM_Massive_(Original Mix).mp3';
import uploadIcon from '../../assets/icons/upload-solid.svg';
import gearIcon from '../../assets/icons/gear-solid.svg';
import p5, { Amplitude, Color, FFT, File, Image, Vector } from 'p5';

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let song: Howl;
let img: Image;
let fft: FFT;
let amp: number;

//IDEAS FOR FUTURE UI UPDATES:
/* 
--Input sliders (2x) 
1. For controlling blur of background & size (on top left hand side of play button)
2. For controlling audio volume, muting, playback speeds (on top right hand side of restart button)
*/

//TYPE ANNOTATIONS
// class Howl extends MediaStream {}

function NewSketch() {
  const [rotation, setRotation] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [removeCanvas, setRemoveCanvas] = useState(false);
  const [fileProgress, setFileProgress] = useState(0);

  const [audioFile, setAudioFile] = useState<File>();
  const [imageFile, setImageFile] = useState<File>();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');

  const [audioURL, setAudioURL] = useState<string>(songFile);
  const [imageURL, setImageURL] = useState<string>(imgFile);

  const [audioName, setAudioName] = useState('');
  const [imageName, setImageName] = useState('');
  const [colorName, setColorName] = useState('');

  useEffect(() => {
    if (imageURL !== null || audioURL !== null) {
      console.log('Updated image URL:', imageURL);
      console.log('Updated audio URL:', audioURL);
    }
  }, [imageURL, audioURL]);

  function sketch(p5: p5) {
    function imgLoaded(loadedImg: Image) {
      img = loadedImg;
      console.log('Your image has succesfully loaded');
    }

    function songLoaded(loadedSong: Howl) {
      song = loadedSong;
      console.log('Your song has succesfully loaded');
    }

    //Getting data from our audio using Web Audio API
    // function createAudioAnalyser() {
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    // console.log(song._sounds[0]._node);
    const source = audioCtx.createMediaElementSource(song._sounds[0]._node);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 2048;

    //Buffer length is half of FFT size --> 1024
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    // }

    p5.preload = () => {
      p5.loadImage(imageURL, imgLoaded);

      song = new Howl({
        format: ['wav', 'm4a'],
        src: [audioURL],
        html5: true,
        // onload: createAudioAnalyser,
      });
    };

    p5.setup = () => {
      // let canvasDiv = document.getElementById('visualizer');
      p5.createCanvas(canvasWidth, canvasHeight).parent();
      // p5.loadSound(songFile, songLoaded);

      p5.angleMode(p5.DEGREES);
      p5.imageMode(p5.CENTER);
      p5.rectMode(p5.CENTER);

      //FEATURE: Potential user setting with a slider to control blur of background
      img.filter(p5.BLUR, 1);

      // fft = new window.p5.FFT(0.3);
    };

    p5.draw = () => {
      p5.background(0);
      p5.noFill();
      p5.translate(canvasWidth / 2, canvasHeight / 2);

      p5.image(img, 0, 0, canvasWidth + 100, canvasHeight + 100);
      p5.pop();

      // let wave = fft.waveform();
      let wave = analyser.getByteTimeDomainData(dataArray);

      // fft.analyze();
      // amp = analyser.getByteFrequencyData(dataArray);
      // amp = fft.getEnergy(20, 200);
      p5.push();
      // if (amp > 242) {
      //   p5.rotate(p5.random(-0.2, 0.2));
      // }

      // let alpha = p5.map(amp, 0, 255, 180, 150);
      // p5.fill(0, alpha);

      p5.noStroke();
      p5.rect(0, 0, canvasWidth, canvasHeight);

      p5.stroke(255);
      p5.strokeWeight(2);
      p5.noFill();

      // for (let t = -1; t <= 1; t += 2) {
      //   p5.beginShape();

      //   for (let i = 0; i < 180; i += 0.5) {
      //     //Specifiying to use the audio of the waveform as index, must be converted to an integer
      //     let index = p5.floor(p5.map(i, 0, canvasWidth, 180, wave.length - 1));

      //     //r (radius) mapped to wave index, with minimum and maximum radians of circle in last two arguments
      //     let r = p5.map(wave[index], -1, 1, 150, 350);

      //     //x position be equal to radius(r) times sin(), times (t) variable to create both sides of visualizer
      //     let x = r * p5.sin(i) * t;
      //     //y position be equal to radius(r) times cos(), polar coordinates Y
      //     let y = r * p5.cos(i);
      //     //change the line shape of waveform
      //     p5.vertex(x, y);
      //   }
      //   p5.endShape();
      // }

      let particle = new Particle(p5);
      let particles: Particle[] = [];
      particles.push(particle);

      for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].edges()) {
          particles[i].update(amp > 242);
          particles[i].show();
        } else {
          particles.splice(i, 1);
        }
      }
    };

    class Particle {
      pos: Vector;
      vel: Vector;
      acc: Vector;
      w: number;
      color: number[];

      constructor(p5: p5) {
        this.pos = Vector.random2D().mult(250);
        this.vel = p5.createVector();
        this.acc = this.pos.copy().mult(p5.random(0.0001, 0.00001));

        this.w = p5.random(3, 5);
        this.color = [
          p5.random(200, 255),
          p5.random(200, 255),
          p5.random(200, 255),
        ];
      }
      update(condition: boolean): void {
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        if (condition) {
          this.pos.add(this.vel);
          this.pos.add(this.vel);
          this.pos.add(this.vel);
        }
      }
      edges(): boolean {
        if (
          this.pos.x < -canvasWidth / 2 ||
          this.pos.x > canvasWidth / 2 ||
          this.pos.y < -canvasHeight / 2 ||
          this.pos.y > canvasHeight / 2
        ) {
          return true;
        } else {
          return false;
        }
      }
      show(): void {
        p5.noStroke();
        p5.fill(this.color);
        p5.ellipse(this.pos.x, this.pos.y, this.w);
      }
    }
  }

  //Setting user song selection
  const handleAudioFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const uploadedAudioFile = e.target.files?.[0];

      // if (typeof uploadedAudioFile === 'File') {
      setAudioName(uploadedAudioFile!.name);
      // setAudioFile(uploadedAudioFile);
      console.log('New audio file loaded:', uploadedAudioFile);
      // }
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
      // const uploadTask = await uploadBytesResumable(audioRef, audioFile);
      alert('New audio file uploaded');

      // const url = await getDownloadURL(uploadTask.task.snapshot.ref);
      // setAudioURL(url);
      console.log('Old Audio URL:', audioURL);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  //Setting user image selection
  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const uploadedImageFile = e.target.files?.[0];

      // if (typeof uploadedImageFile === 'File') {
      setImageName(uploadedImageFile!.name);
      // setImageFile(uploadedImageFile);
      console.log('New image file loaded:', uploadedImageFile);
      // }
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
      // const uploadTask = await uploadBytesResumable(imageRef, imageFile);

      //To show progress of uploaded image file (doesn't work right now)
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

      alert('New image file uploaded');
      // const url = await getDownloadURL(uploadTask.task.snapshot.ref);
      // setImageURL(url);

      console.log('Old Image URL:', imageURL);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };

  //Visualizer controls
  const play = () => {
    if (!song) {
      return;
    }

    if (!song.playing()) {
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

    if (song.pause()) {
      song.stop();
      song.unload();
      song.play();
    } else {
      song.stop();
      song.play();
    }
  };

  return (
    <>
      <main id="visualizer" className="visualizer">
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
            <div id="visualizer-playback" className="visualizer-playback">
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
              {/* {fileProgress && (
                <span className="image-progress">
                  <strong className="image-progress__text">Uploading: %</strong>
                  <span id="file-progress">{fileProgress} </span>
                </span>
              )} */}
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
                  // value={selectedStyle}
                >
                  <option value="bar">Bar visualizer</option>
                  <option value="simple">Simple line visualizer</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </main>

      <ReactP5Wrapper sketch={sketch} rotation={rotation} />
    </>
  );
}

export default NewSketch;

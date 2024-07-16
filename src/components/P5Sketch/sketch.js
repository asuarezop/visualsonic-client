import React, { useEffect } from 'react';
import Sketch from 'react-p5';
import { useState } from 'react';
import 'p5/lib/addons/p5.sound';
import p5 from 'react-p5';
import './sketch.scss';
import UserSketch from '../UserSketch/UserSketch';
import VisualizerControls from '../VisualizerControls/VisualizerControls';
import songFile from '../../assets/sounds/81BPM_Massive_(Original Mix).mp3';
import imgFile from '../../assets/images/Home Screen Background.jpg';

//REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)
//All variables used for below functions must be declared outside the component

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let song;
let img;
let fft;
let amp;
let particles = [];

function P5Sketch(props) {
  //To store user input for color
  const [selectedColor, setSelectedColor] = useState('');

  //Visualizer default settings
  const [defaultVisualizerSettings, setDefaultVisualizerSettings] = useState({
    defaultAudio: songFile,
    defaultImage: imgFile,
    defaultColor: '#000',
    defaultStyle: 'Circle',
  });

  //To toggle drop down menu and user sketch
  // const [removeCanvas, setRemoveCanvas] = useState(false);

  const preload = (p) => {
    p.soundFormats('mp3', 'wav', 'm4a');
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

    song = p.loadSound(defaultVisualizerSettings.defaultAudio, songLoaded);
    img = p.loadImage(defaultVisualizerSettings.defaultImage, imgLoaded);

    p.angleMode(p.DEGREES);

    p.imageMode(p.CENTER);

    p.rectMode(p.CENTER);

    fft = new window.p5.FFT(0.3);

    img?.filter(p.BLUR, 5);
  };

  const draw = (p) => {
    // if (removeCanvas) {
    //   p.remove();
    // }

    p.background(0);

    //Make changes to waveform stroke line here:
    p.stroke(selectedColor);

    p.noFill();

    let wave = fft?.waveform();

    p.translate(canvasWidth / 2, canvasHeight / 2);

    fft?.analyze();

    amp = fft?.getEnergy(20, 200);

    p.push();
    if (amp > 242) {
      p.rotate(p.random(-0.2, 0.2));
    }

    p.image(img, 0, 0, canvasWidth + 100, canvasHeight + 100);
    p.pop();

    let alpha = p.map(amp, 0, 255, 180, 150);
    p.fill(0, alpha);
    p.noStroke();
    p.rect(0, 0, canvasWidth, canvasHeight);

    p.stroke(255);
    p.strokeWeight(2);
    p.noFill();

    for (let t = -1; t <= 1; t += 2) {
      p.beginShape();

      for (let i = 0; i < 180; i += 0.5) {
        //Specifiying to use the audio of the waveform as index, must be converted to an integer
        let index = p.floor(p.map(i, 0, canvasWidth, 180, wave.length - 1));

        //r (radius) mapped to wave index, with minimum and maximum radians of circle in last two arguments
        let r = p.map(wave[index], -1, 1, 150, 350);

        //x position be equal to radius(r) times sin(), times (t) variable to create both sides of visualizer
        let x = r * p.sin(i) * t;
        //y position be equal to radius(r) times cos(), polar coordinates Y
        let y = r * p.cos(i);
        //change the line shape of waveform
        p.vertex(x, y);
      }
      p.endShape();
    }

    let particle = new Particle(p);
    particles.push(particle);

    for (let i = particles.length - 1; i >= 0; i--) {
      if (!particles[i].edges()) {
        particles[i].update(amp > 242, p);
        particles[i].show(p);
      } else {
        particles.splice(i, 1);
      }
    }
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

  class Particle {
    constructor(p) {
      this.pos = p.constructor.Vector.random2D().mult(250);
      this.vel = p.createVector();
      this.acc = this.pos.copy().mult(p.random(0.0001, 0.00001));

      this.w = p.random(3, 5);
      this.color = [p.random(200, 255), p.random(200, 255), p.random(200, 255)];
    }
    update(condition) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);

      if (condition) {
        this.pos.add(this.vel);
        this.pos.add(this.vel);
        this.pos.add(this.vel);
      }
    }
    edges() {
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
    show(p) {
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.pos.x, this.pos.y, this.w);
    }
  }

  return (
    <>
      <main className="visualizer">
        <div className="visualizer-panel">
          <VisualizerControls play={play} pause={pause} restart={restart} />
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

import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import songFile from "./assets/sounds/09 Underwater Echo.mp3";
import imgFile from "./assets/images/Home Screen Background.jpg";

//REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)

//All variables used for below functions must be declared outside the component

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let song;
let img;
let fft;

function P5Sketch(props) {
  const preload = (p) => {
    p.soundFormats("mp3");
    song = p.loadSound(songFile);
    // img = p.loadImage(imgFile);
  };

  const setup = (p, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    p.angleMode(p.DEGREES);

    fft = new window.p5.FFT();
  };

  const draw = (p) => {
    p.background(0);
    p.stroke(255);
    p.noFill();

    p.translate(canvasWidth / 2, canvasHeight / 2);

    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    // x++;

    fft.analyze();

    let wave = fft.waveform();

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
    // for (let i = 0; i < canvasWidth; i++) {
    //   let index = p.floor(p.map(i, 0, canvasWidth, 0, wave.length));

    //   let x = i;
    //   let y = wave[index] * 300 + canvasHeight / 2;
    //   p.point(x, y);
    // }
    // p.endShape();

    // if (fft) {
    //   let waveform = fft.waveform();

    //   p5.beginShape();
    //   for (let i = 0; i < waveform.length; i++) {
    //     let x = p5.map(i, 0, waveform.length, 0, canvasWidth);
    //     let y = p5.map(waveform[i], 0, 1, 0, canvasHeight);

    //     p5.vertex(x, y);
    //   }
    //   p5.endShape();
    // }
  };

  const mouseClicked = () => {
    if (!song) {
      return;
    }

    if (!song.isPlaying()) {
      song.play();
    } else {
      song.pause();
    }
  };

  return (
    <Sketch
      preload={preload}
      setup={setup}
      draw={draw}
      mouseClicked={mouseClicked}
    />
  );
}

export default P5Sketch;

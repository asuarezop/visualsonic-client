import React from "react";
import Sketch from "react-p5";
import "p5/lib/addons/p5.sound";
import songFile from "./assets/sounds/09 Underwater Echo.mp3";
import imgFile from "./assets/images/Home Screen Background.jpg";

//REACT-P5 METHOD (WORKS WITH SOUND LIBRARY)

//All variables used for below functions must be declared outside the component
let x = 50;
let y = 50;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let song;
let img;
let fft;

function P5Sketch(props) {
  const preload = (p5) => {
    song = p5.loadSound(songFile);
    img = p5.loadImage(imgFile);
  };

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

    if (song.isLoaded()) {
      fft = new p5.constructor.FFT();
    }

    p5.noLoop();
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
    p5.ellipse(x, y, 70, 70);
    // p5.noFill();
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++;

    if (fft) {
      let wave = fft.waveform();

      for (let i = 0; i < canvasWidth; i++) {
        let index = p5.floor(p5.map(i, 0, canvasWidth, 0, wave.length));

        let x = i;
        let y = wave[index] * 300 + canvasHeight / 2;
        p5.point(x, y);
      }
    }
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

  const mouseClicked = (p5) => {
    if (!song.isPlaying() && song.isLoaded()) {
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
